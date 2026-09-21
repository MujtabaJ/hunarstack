import { Link } from "react-router-dom";
import { useData } from "../../context/DataContext";

export default function Classroom() {
  const { users, enrollments, allSubmissions, notifications, unread, readNotes, getCourse, reviewCount } = useData();
  const students = users.filter((u) => u.role === "student");
  const active = enrollments.filter((e) => e.status === "active");

  return (
    <>
      <div className="dash-top">
        <div>
          <p className="kicker">Instructor</p>
          <h1>Classroom</h1>
          <p>See who is enrolled, what they submitted, and send them back to the work. You are not placing clients.</p>
        </div>
        <span className="role-pill instructor">instructor</span>
      </div>
      <div className="stat-grid">
        <div className="stat"><b>{students.length}</b> students</div>
        <div className="stat"><b>{active.length}</b> enrolments</div>
        <div className="stat"><b>{reviewCount || allSubmissions.filter((s) => s.status === "review").length}</b> awaiting review</div>
        <div className="stat"><b>{unread}</b> notes</div>
      </div>
      <div className="panel">
        <h2>Cohort</h2>
        <div className="table-wrap">
          <table className="data">
            <thead><tr><th>Student</th><th>Tracks</th><th>City</th><th>Actions</th></tr></thead>
            <tbody>
              {students.map((s) => (
                <tr key={s.id}>
                  <td>{s.name}<br /><small>{s.email}</small></td>
                  <td>{active.filter((e) => e.userId === s.id).map((e) => getCourse(e.courseId)?.name).filter(Boolean).join(", ") || "—"}</td>
                  <td>{s.city || "—"}</td>
                  <td>
                    <p className="row-actions">
                      <Link className="btn btn-ghost" to={`/app/reviews?student=${s.id}`}>Reviews</Link>
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="panel">
        <div className="dash-top">
          <h2>Notifications</h2>
          {unread > 0 && <button className="btn btn-ghost" type="button" onClick={readNotes}>Mark read</button>}
        </div>
        {notifications.slice(0, 8).map((n) => <div className={`note ${n.read ? "" : "unread"}`} key={n.id}>{n.text}</div>)}
        <p className="btns"><Link className="btn btn-main" to="/app/reviews">Open reviews</Link></p>
      </div>
    </>
  );
}
