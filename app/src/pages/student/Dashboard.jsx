import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useData } from "../../context/DataContext";
import StatusPill from "../../components/StatusPill";
import { money } from "../../data/catalog";

export default function StudentHome() {
  const { user } = useAuth();
  const { myEnrollments, progress, notifications, unread, readNotes, submissions, getCourse, liveCourses, myApplications, myInvoices, dueFees } = useData();

  const rows = myEnrollments.map((e) => {
    const course = getCourse(e.courseId);
    if (!course) return null;
    const done = (progress[e.courseId] || []).length;
    const total = course.weeks?.length || 1;
    return { ...e, course, pct: Math.round((done / total) * 100), done, total };
  }).filter(Boolean);

  return (
    <>
      <div className="dash-top">
        <div>
          <p className="kicker">Student classroom</p>
          <h1>Hello, {user.name.split(" ")[0]}.</h1>
          <p>Learn week by week. Build something you can show. We still do not promise clients or income.</p>
        </div>
        <span className="role-pill student">student</span>
      </div>
      <div className="stat-grid">
        <div className="stat"><b>{rows.length}</b> active tracks</div>
        <div className="stat"><b>{rows.reduce((s, r) => s + r.done, 0)}</b> weeks completed</div>
        <div className="stat"><b>{submissions.length}</b> submissions</div>
        <div className="stat"><b>{myApplications.filter((a) => a.status === "pending").length}</b> pending apps</div>
      </div>
      <div className="panel">
        <h2>Your tracks</h2>
        {rows.length === 0 && <p>You are not enrolled yet. <Link to="/courses">Browse courses</Link> and join a demo track, or <Link to="/enrol">apply for a seat</Link>.</p>}
          <div className="grid grid-2">
            {rows.map((r) => (
              <article className="mini-card lift-card" key={r.id}>
              <h3>{r.course?.icon} {r.course?.name}</h3>
              <p>{r.done} / {r.total} weeks</p>
              <div className="progress" aria-hidden="true"><span style={{ width: `${r.pct}%` }} /></div>
              <p className="btns">
                <Link className="btn btn-main" to={`/app/learn/${r.courseId}`}>Continue</Link>
                <Link className="btn btn-ghost" to={`/courses/${r.courseId}`}>Syllabus</Link>
              </p>
            </article>
          ))}
        </div>
      </div>
      <div className="panel">
        <div className="dash-top">
          <h2>Applications</h2>
          <Link className="btn btn-ghost" to="/app/applications">View all</Link>
        </div>
        {myApplications.length === 0 ? (
          <p>No seat requests yet. <Link to="/enrol">Apply for a track</Link> and it will show here and in the academy queue.</p>
        ) : (
          <div className="queue-list">
            {myApplications.slice(0, 4).map((a) => (
              <div className="queue-row" key={a.id}>
                <div>
                  <b>{getCourse(a.courseId || a.track)?.icon} {a.track}</b>
                  <p>Submitted {a.createdAt}</p>
                </div>
                <StatusPill status={a.status} />
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="panel">
        <div className="dash-top">
          <h2>Fees</h2>
          <Link className="btn btn-ghost" to="/app/fees">View all</Link>
        </div>
        {myInvoices.length === 0 ? (
          <p>No seat fees yet. When you enrol or an application is accepted, the course fee appears here. An admin records payment — cards are not charged online.</p>
        ) : (
          <div className="queue-list">
            {myInvoices.slice(0, 4).map((inv) => {
              const course = getCourse(inv.courseId);
              const balance = Math.max(0, Number(inv.amount) - Number(inv.paid || 0));
              return (
                <div className="queue-row" key={inv.id}>
                  <div>
                    <b>{course?.icon} {course?.name || inv.courseId}</b>
                    <p>{money(inv.paid || 0, inv.currency)} paid of {money(inv.amount, inv.currency)}{balance ? ` · ${money(balance, inv.currency)} due` : ""}</p>
                  </div>
                  <StatusPill status={inv.status} />
                </div>
              );
            })}
          </div>
        )}
        {dueFees > 0 && <p className="note">Outstanding: {money(dueFees)}. Bring this to the academy so an admin can record your payment.</p>}
      </div>
      <div className="panel">
        <div className="dash-top">
          <h2>Notifications</h2>
          {unread > 0 && <button className="btn btn-ghost" type="button" onClick={readNotes}>Mark read</button>}
        </div>
        <div className="notes">
          {notifications.slice(0, 8).map((n) => (
            <div className={`note ${n.read ? "" : "unread"}`} key={n.id}>{n.text}</div>
          ))}
        </div>
      </div>
      <div className="panel">
        <h2>Recommended next</h2>
        <p>After a skill, add a platform course. After a platform course, keep shipping work.</p>
        <div className="chip-row">
          {liveCourses.filter((c) => !myEnrollments.some((e) => e.courseId === c.id)).slice(0, 6).map((c) => (
            <Link className="btn btn-ghost" key={c.id} to={`/courses/${c.id}`}>{c.name}</Link>
          ))}
        </div>
      </div>
    </>
  );
}
