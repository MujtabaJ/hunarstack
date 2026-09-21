import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useData } from "../../context/DataContext";

const EMPTY = { userId: "", courseId: "", amount: 0, paid: 0, currency: "PKR", status: "due", method: "", note: "" };

export default function InvoiceForm() {
  const { id } = useParams();
  const isNew = id === "new";
  const nav = useNavigate();
  const { invoices, users, courses, saveInvoice, deleteInvoice, recordPayment } = useData();
  const existing = isNew ? null : invoices.find((i) => i.id === id);
  const [draft, setDraft] = useState(EMPTY);
  const [pay, setPay] = useState("");
  const [ok, setOk] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (existing) setDraft({ ...EMPTY, ...existing });
    else if (isNew) setDraft(EMPTY);
  }, [existing, isNew, id]);

  if (!isNew && !existing) return <Navigate to="/app/fees" replace />;

  function set(field, value) {
    setDraft((d) => ({ ...d, [field]: value }));
    setOk("");
  }

  function onSubmit(e) {
    e.preventDefault();
    setError("");
    if (!draft.userId || !draft.courseId) {
      setError("Student and course are required.");
      return;
    }
    saveInvoice({ ...draft, id: isNew ? undefined : existing.id, amount: Number(draft.amount) || 0, paid: Number(draft.paid) || 0 });
    setOk("Saved.");
    if (isNew) nav("/app/fees");
  }

  function takePayment() {
    setError("");
    try {
      recordPayment(existing.id, pay || Math.max(0, Number(draft.amount) - Number(draft.paid || 0)), draft.method || "cash");
      setPay("");
      setOk("Payment recorded.");
    } catch (err) {
      setError(err.message);
    }
  }

  function remove() {
    if (!existing) return;
    if (!confirm("Delete this invoice?")) return;
    deleteInvoice(existing.id);
    nav("/app/fees");
  }

  return (
    <>
      <div className="dash-top">
        <div>
          <p className="kicker">Finance</p>
          <h1>{isNew ? "New invoice" : "Edit invoice"}</h1>
          <p>Seat fees are recorded by an admin. This demo does not charge cards.</p>
        </div>
        <Link className="btn btn-ghost" to="/app/fees">All fees</Link>
      </div>
      {ok && <p className="form-ok">{ok}</p>}
      {error && <p className="form-error">{error}</p>}
      <form className="panel" onSubmit={onSubmit}>
        <div className="g2">
          <label>Student
            <select value={draft.userId} onChange={(e) => set("userId", e.target.value)} required>
              <option value="">Choose a student</option>
              {users.filter((u) => u.role === "student").map((u) => <option key={u.id} value={u.id}>{u.name} · {u.email}</option>)}
            </select>
          </label>
          <label>Course
            <select value={draft.courseId} onChange={(e) => set("courseId", e.target.value)} required>
              <option value="">Choose a course</option>
              {courses.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </label>
          <label>Amount<input type="number" min="0" value={draft.amount} onChange={(e) => set("amount", e.target.value)} /></label>
          <label>Paid<input type="number" min="0" value={draft.paid} onChange={(e) => set("paid", e.target.value)} /></label>
          <label>Currency<input value={draft.currency || "PKR"} onChange={(e) => set("currency", e.target.value)} /></label>
          <label>Status
            <select value={draft.status} onChange={(e) => set("status", e.target.value)}>
              <option value="due">due</option>
              <option value="partial">partial</option>
              <option value="paid">paid</option>
              <option value="waived">waived</option>
              <option value="cancelled">cancelled</option>
            </select>
          </label>
          <label>Method
            <select value={draft.method || ""} onChange={(e) => set("method", e.target.value)}>
              <option value="">Not set</option>
              <option value="cash">Cash</option>
              <option value="bank">Bank</option>
              <option value="jazzcash">JazzCash</option>
              <option value="easypaisa">Easypaisa</option>
            </select>
          </label>
        </div>
        <label>Note<input value={draft.note || ""} onChange={(e) => set("note", e.target.value)} /></label>
        {!isNew && (
          <div className="pay-row" style={{ margin: "12px 0" }}>
            <input type="number" min="1" placeholder="Payment amount" value={pay} onChange={(e) => setPay(e.target.value)} />
            <button className="btn btn-ghost" type="button" onClick={takePayment}>Record payment</button>
          </div>
        )}
        <p className="btns">
          <button className="btn btn-main" type="submit">{isNew ? "Create invoice" : "Save changes"}</button>
          {!isNew && <button className="btn btn-danger" type="button" onClick={remove}>Delete invoice</button>}
        </p>
      </form>
    </>
  );
}
