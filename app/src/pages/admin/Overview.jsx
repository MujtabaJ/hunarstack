import { Link } from "react-router-dom";
import StatusPill from "../../components/StatusPill";
import { useData } from "../../context/DataContext";
import { money } from "../../data/catalog";

export default function AdminHome() {
  const { users, enrollments, applications, messages, reset, liveCourses, pendingCount, newMessageCount, getCourse, invoices, courses, reviewCount } = useData();
  const collected = (invoices || []).reduce((s, i) => s + Number(i.paid || 0), 0);
  const outstanding = (invoices || [])
    .filter((i) => i.status === "due" || i.status === "partial")
    .reduce((s, i) => s + Math.max(0, Number(i.amount) - Number(i.paid || 0)), 0);
  const recent = [...applications]
    .sort((a, b) => String(b.createdAtFull || b.createdAt).localeCompare(String(a.createdAtFull || a.createdAt)))
    .slice(0, 5);

  return (
    <>
      <div className="dash-top">
        <div>
          <p className="kicker">Admin</p>
          <h1>Dashboard</h1>
          <p>Users, courses, applications, fees and inbox. Demo data lives in this browser until you reset it.</p>
        </div>
        <span className="role-pill admin">admin</span>
      </div>
      <div className="stat-grid">
        <div className="stat"><b>{users.filter((u) => u.role === "student").length}</b> students</div>
        <div className="stat"><b>{users.filter((u) => u.role === "instructor").length}</b> instructors</div>
        <div className="stat"><b>{courses.length}</b> courses</div>
        <div className="stat"><b>{money(outstanding)}</b> fees outstanding</div>
      </div>
      <div className="panel">
        <h2>Shortcuts</h2>
        <p className="btns">
          <Link className="btn btn-main" to="/app/applications">Applications{pendingCount ? ` (${pendingCount})` : ""}</Link>
          <Link className="btn btn-ghost" to="/app/inbox">Inbox{newMessageCount ? ` (${newMessageCount})` : ""}</Link>
          <Link className="btn btn-ghost" to="/app/site">Edit homepage</Link>
          <Link className="btn btn-ghost" to="/app/photos">Pictures</Link>
          <Link className="btn btn-ghost" to="/app/catalog">Courses</Link>
          <Link className="btn btn-ghost" to="/app/fees">Fees</Link>
          <Link className="btn btn-ghost" to="/app/reviews">Reviews{reviewCount ? ` (${reviewCount})` : ""}</Link>
          <Link className="btn btn-ghost" to="/app/users">Users</Link>
        </p>
      </div>
      <div className="panel">
        <div className="dash-top">
          <h2>Latest applications</h2>
          <Link className="btn btn-ghost" to="/app/applications">Open queue</Link>
        </div>
        {recent.length === 0 && <p>No applications yet. They appear here the moment a student submits Enrol.</p>}
        <div className="queue-list">
          {recent.map((a) => (
            <div className="queue-row" key={a.id}>
              <div>
                <b>{a.name}</b>
                <p>{getCourse(a.courseId || a.track)?.icon} {a.track} · {a.email} · {a.createdAt}</p>
              </div>
              <StatusPill status={a.status} />
            </div>
          ))}
        </div>
      </div>
      <div className="panel">
        <h2>Catalogue</h2>
        <p>{liveCourses.length} live courses · {enrollments.filter((e) => e.status === "active").length} active enrolments · {messages.length} inbox messages · {money(collected)} collected</p>
        <button className="btn btn-ghost" type="button" onClick={() => { if (confirm("Reset all demo data in this browser?")) reset(); }}>
          Reset demo data
        </button>
      </div>
    </>
  );
}
