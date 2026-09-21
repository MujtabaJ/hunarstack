import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import StatusPill from "../../components/StatusPill";
import { useData } from "../../context/DataContext";

const ORDER = { pending: 0, waitlist: 1, accepted: 2, declined: 3 };

export default function Applications() {
  const { applications, decideApplication, getCourse, users, deleteApplication } = useData();
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("all");
  const [track, setTrack] = useState("");

  const tracks = useMemo(
    () => [...new Set(applications.map((a) => a.track).filter(Boolean))],
    [applications]
  );

  const counts = useMemo(() => ({
    all: applications.length,
    pending: applications.filter((a) => a.status === "pending").length,
    waitlist: applications.filter((a) => a.status === "waitlist").length,
    accepted: applications.filter((a) => a.status === "accepted").length,
    declined: applications.filter((a) => a.status === "declined").length,
  }), [applications]);

  const rows = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return [...applications]
      .filter((a) => (status === "all" ? true : a.status === status))
      .filter((a) => (track ? a.track === track : true))
      .filter((a) => {
        if (!needle) return true;
        return [a.name, a.email, a.phone, a.city, a.track, a.goal, a.source]
          .join(" ")
          .toLowerCase()
          .includes(needle);
      })
      .sort((a, b) => {
        const rank = (ORDER[a.status] ?? 9) - (ORDER[b.status] ?? 9);
        if (rank) return rank;
        return String(b.createdAtFull || b.createdAt).localeCompare(String(a.createdAtFull || a.createdAt));
      });
  }, [applications, q, status, track]);

  function remove(app) {
    if (!confirm(`Delete the application from ${app.name}?`)) return;
    deleteApplication(app.id);
  }

  return (
    <>
      <div className="dash-top">
        <div>
          <p className="kicker">Admissions</p>
          <h1>All applications</h1>
          <p>Every Enrol form lands here. Edit opens the full request. Accepting enrols a matching login.</p>
        </div>
        <Link className="btn btn-main" to="/app/applications/new">Add application</Link>
      </div>

      <div className="stat-grid">
        <button className={`stat clickable ${status === "all" ? "is-on" : ""}`} type="button" onClick={() => setStatus("all")}>
          <b>{counts.all}</b> all
        </button>
        <button className={`stat clickable ${status === "pending" ? "is-on" : ""}`} type="button" onClick={() => setStatus("pending")}>
          <b>{counts.pending}</b> pending
        </button>
        <button className={`stat clickable ${status === "waitlist" ? "is-on" : ""}`} type="button" onClick={() => setStatus("waitlist")}>
          <b>{counts.waitlist}</b> waitlist
        </button>
        <button className={`stat clickable ${status === "accepted" ? "is-on" : ""}`} type="button" onClick={() => setStatus("accepted")}>
          <b>{counts.accepted}</b> accepted
        </button>
      </div>

      <div className="filter-bar panel">
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search name, email, city, goal…" />
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="all">All statuses</option>
          <option value="pending">Pending</option>
          <option value="waitlist">Waitlist</option>
          <option value="accepted">Accepted</option>
          <option value="declined">Declined</option>
        </select>
        <select value={track} onChange={(e) => setTrack(e.target.value)}>
          <option value="">All tracks</option>
          {tracks.map((t) => <option key={t}>{t}</option>)}
        </select>
      </div>

      <div className="table-wrap panel">
        <table className="data">
          <thead>
            <tr>
              <th>Applicant</th>
              <th>Track</th>
              <th>Status</th>
              <th>Submitted</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((a) => {
              const course = getCourse(a.courseId || a.track);
              const account = users.find((u) => String(u.email).toLowerCase() === String(a.email).toLowerCase());
              return (
                <tr key={a.id}>
                  <td>
                    <b>{a.name}</b><br />
                    <small>{a.email}{account ? ` · ${account.role}` : " · no login"}</small>
                  </td>
                  <td>{course?.icon} {a.track || "—"}</td>
                  <td><StatusPill status={a.status} /></td>
                  <td>{a.createdAt}</td>
                  <td>
                    <p className="row-actions">
                      <Link className="btn btn-ghost" to={`/app/applications/${a.id}`}>Edit</Link>
                      {a.status === "pending" && (
                        <button className="btn btn-main" type="button" onClick={() => decideApplication(a.id, "accepted", a.courseId || course?.id, a.note)}>Accept</button>
                      )}
                      <button className="btn btn-danger" type="button" onClick={() => remove(a)}>Delete</button>
                    </p>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {rows.length === 0 && <p className="empty-panel">No applications in this view.</p>}
      </div>
    </>
  );
}
