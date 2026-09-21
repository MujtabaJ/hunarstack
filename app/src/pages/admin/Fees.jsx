import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import StatusPill from "../../components/StatusPill";
import { useAuth } from "../../context/AuthContext";
import { useData } from "../../context/DataContext";
import { money } from "../../data/catalog";

function StudentFees() {
  const { myInvoices, dueFees, getCourse } = useData();

  return (
    <>
      <div className="dash-top">
        <div>
          <p className="kicker">Your account</p>
          <h1>Fees</h1>
          <p>Seat fees for tracks you are enrolled in. An academy admin records cash, bank or wallet payments — this demo does not charge cards. Freelance income is never part of this.</p>
        </div>
      </div>
      <div className="stat-grid">
        <div className="stat"><b>{money(dueFees)}</b> still due</div>
        <div className="stat"><b>{money(myInvoices.reduce((s, i) => s + Number(i.paid || 0), 0))}</b> recorded as paid</div>
        <div className="stat"><b>{myInvoices.length}</b> invoices</div>
        <div className="stat"><b>{myInvoices.filter((i) => i.status === "paid" || i.status === "waived").length}</b> settled</div>
      </div>
      <div className="panel">
        <h2>Your invoices</h2>
        {myInvoices.length === 0 ? (
          <p>No seat fees yet. When you are enrolled or an application is accepted, the course fee appears here.</p>
        ) : (
          <div className="table-wrap">
            <table className="data">
              <thead>
                <tr><th>Course</th><th>Fee</th><th>Paid</th><th>Balance</th><th>Status</th></tr>
              </thead>
              <tbody>
                {myInvoices.map((inv) => {
                  const course = getCourse(inv.courseId);
                  const balance = Math.max(0, Number(inv.amount) - Number(inv.paid || 0));
                  return (
                    <tr key={inv.id}>
                      <td><b>{course?.icon} {course?.name || inv.courseId}</b><br /><small>{inv.note}</small></td>
                      <td>{money(inv.amount, inv.currency)}</td>
                      <td>{money(inv.paid || 0, inv.currency)}</td>
                      <td>{money(balance, inv.currency)}</td>
                      <td><StatusPill status={inv.status} /></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}

function AdminFees() {
  const { courses, invoices, users, saveCourse, recordPayment, setInvoiceStatus, getCourse, deleteInvoice } = useData();
  const [pay, setPay] = useState({});
  const [method, setMethod] = useState({});
  const [error, setError] = useState("");
  const [ok, setOk] = useState("");

  const liveInvoices = invoices.filter((i) => i.status !== "cancelled");
  const due = liveInvoices.filter((i) => i.status === "due" || i.status === "partial");
  const collected = liveInvoices.reduce((s, i) => s + Number(i.paid || 0), 0);
  const outstanding = due.reduce((s, i) => s + Math.max(0, Number(i.amount) - Number(i.paid || 0)), 0);
  const people = useMemo(() => Object.fromEntries(users.map((u) => [u.id, u])), [users]);

  function takePayment(inv) {
    setError("");
    setOk("");
    try {
      recordPayment(inv.id, pay[inv.id] || Math.max(0, Number(inv.amount) - Number(inv.paid || 0)), method[inv.id] || "cash");
      setPay((p) => ({ ...p, [inv.id]: "" }));
      setOk("Payment recorded.");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <>
      <div className="dash-top">
        <div>
          <p className="kicker">Finance</p>
          <h1>Fees management</h1>
          <p>Set the seat fee for each course, then record what students have paid. This demo does not charge cards — an admin records cash, bank or wallet payments. A seat is listed as due until it is paid or waived. Income from freelance work is never part of this.</p>
        </div>
        <Link className="btn btn-main" to="/app/fees/new">Add invoice</Link>
      </div>

      {ok && <p className="form-ok">{ok}</p>}
      {error && <p className="form-error">{error}</p>}

      <div className="stat-grid">
        <div className="stat"><b>{money(collected)}</b> collected</div>
        <div className="stat"><b>{money(outstanding)}</b> outstanding</div>
        <div className="stat"><b>{due.length}</b> open invoices</div>
        <div className="stat"><b>{liveInvoices.filter((i) => i.status === "paid" || i.status === "waived").length}</b> settled</div>
      </div>

      <div className="panel">
        <h2>Course fees</h2>
        <p>Changing a fee here updates the catalogue. Existing invoices keep the amount they were issued at.</p>
        <div className="table-wrap">
          <table className="data">
            <thead>
              <tr><th>Course</th><th>Billing</th><th>Fee (PKR)</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {courses.map((c) => (
                <tr key={c.id}>
                  <td><b>{c.icon} {c.name}</b></td>
                  <td>
                    <select value={c.billing || "cohort"} onChange={(e) => saveCourse({ ...c, billing: e.target.value })}>
                      <option value="cohort">Per cohort</option>
                      <option value="one-time">One-time</option>
                      <option value="monthly">Monthly</option>
                    </select>
                  </td>
                  <td>
                    <input
                      type="number"
                      min="0"
                      step="500"
                      defaultValue={c.fee ?? 0}
                      key={`${c.id}-${c.fee}`}
                      onBlur={(e) => {
                        const fee = Number(e.target.value) || 0;
                        if (fee !== Number(c.fee)) saveCourse({ ...c, fee });
                      }}
                    />
                  </td>
                  <td>
                    <p className="row-actions">
                      <Link className="btn btn-ghost" to={`/app/catalog/${c.id}`}>Edit</Link>
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="panel">
        <h2>Student invoices</h2>
        <p>An invoice is created when a student is enrolled or an application is accepted.</p>
        <div className="table-wrap">
          <table className="data">
            <thead>
              <tr><th>Student</th><th>Course</th><th>Fee</th><th>Paid</th><th>Status</th><th>Record payment</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {liveInvoices.map((inv) => {
                const person = people[inv.userId];
                const course = getCourse(inv.courseId);
                const remaining = Math.max(0, Number(inv.amount) - Number(inv.paid || 0));
                return (
                  <tr key={inv.id}>
                    <td>
                      <b>{person?.name || "Unknown"}</b><br />
                      <small>{person?.email || inv.userId}</small>
                    </td>
                    <td>{course?.icon} {course?.name || inv.courseId}</td>
                    <td>{money(inv.amount, inv.currency)}</td>
                    <td>{money(inv.paid || 0, inv.currency)}</td>
                    <td><StatusPill status={inv.status} /></td>
                    <td>
                      {remaining > 0 && inv.status !== "waived" ? (
                        <div className="pay-row">
                          <input
                            type="number"
                            min="1"
                            placeholder={String(remaining)}
                            value={pay[inv.id] ?? ""}
                            onChange={(e) => setPay((p) => ({ ...p, [inv.id]: e.target.value }))}
                          />
                          <select value={method[inv.id] || "cash"} onChange={(e) => setMethod((m) => ({ ...m, [inv.id]: e.target.value }))}>
                            <option value="cash">Cash</option>
                            <option value="bank">Bank</option>
                            <option value="jazzcash">JazzCash</option>
                            <option value="easypaisa">Easypaisa</option>
                          </select>
                          <button className="btn btn-main" type="button" onClick={() => takePayment(inv)}>Record</button>
                          <button className="btn btn-ghost" type="button" onClick={() => setInvoiceStatus(inv.id, "waived", "Fee waived by academy.")}>Waive</button>
                        </div>
                      ) : (
                        <span className="note">{inv.method ? `via ${inv.method}` : inv.note || "Settled"}</span>
                      )}
                    </td>
                    <td>
                      <p className="row-actions">
                        <Link className="btn btn-ghost" to={`/app/fees/${inv.id}`}>Edit</Link>
                        <button className="btn btn-danger" type="button" onClick={() => { if (confirm("Delete this invoice?")) deleteInvoice(inv.id); }}>Delete</button>
                      </p>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {liveInvoices.length === 0 && <p>No invoices yet. Accept an application or enrol a student to issue a seat fee.</p>}
      </div>
    </>
  );
}

export default function Fees() {
  const { user } = useAuth();
  return user.role === "admin" ? <AdminFees /> : <StudentFees />;
}
