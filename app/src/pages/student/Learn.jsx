import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useData } from "../../context/DataContext";
import StatusPill from "../../components/StatusPill";

export default function Learn() {
  const { courseId } = useParams();
  const { user } = useAuth();
  const { myEnrollments, progress, toggleWeek, submitWork, submissions, getCourse, liveCourses } = useData();
  const tracks = user.role === "admin"
    ? liveCourses.map((c) => ({ courseId: c.id }))
    : myEnrollments;
  const first = courseId || tracks[0]?.courseId;
  const course = first ? getCourse(first) : null;
  const weeks = course?.weeks || [];
  const done = course ? progress[course.id] || [] : [];
  const [note, setNote] = useState("");
  const [week, setWeek] = useState(1);

  if (!course) {
    return (
      <div className="panel">
        <h1>No track yet</h1>
        <p>Join a course to open the weekly classroom.</p>
        <Link className="btn btn-main" to="/courses">Browse courses</Link>
      </div>
    );
  }

  function send(e) {
    e.preventDefault();
    const w = weeks.find((x) => x.week === Number(week));
    submitWork({
      courseId: course.id,
      week: Number(week),
      title: w ? `Week ${w.week}: ${w.build || w.title}` : `Week ${week}`,
      note,
    });
    setNote("");
  }

  const mine = submissions.filter((s) => s.userId === user.id && s.courseId === course.id);

  return (
    <>
      <div className="dash-top">
        <div>
          <p className="kicker">Learn</p>
          <h1>{course.icon} {course.name}</h1>
          <p>{weeks.length ? `${done.length} of ${weeks.length} weeks marked complete.` : "This track has no week plan yet. An admin can add weeks in Courses."}</p>
        </div>
      </div>
      <div className="trail" style={{ marginBottom: 16 }}>
        <Link className="btn btn-ghost" to="/app">← Dashboard</Link>
        <Link className="btn btn-ghost" to="/courses">Change track</Link>
      </div>
      <div className="chip-row" style={{ marginBottom: 16 }}>
        {tracks.map((e) => {
          const c = getCourse(e.courseId);
          return c ? <Link key={c.id} className={`btn ${c.id === course.id ? "btn-main" : "btn-ghost"}`} to={`/app/learn/${c.id}`}>{c.name}</Link> : null;
        })}
      </div>
      {weeks.length > 0 && (
        <>
          <div className="progress" style={{ marginBottom: 18 }}><span style={{ width: `${Math.round((done.length / Math.max(weeks.length, 1)) * 100)}%` }} /></div>
          <div className="week-list">
            {weeks.map((w) => {
              const on = done.includes(w.week);
              return (
                <article className="week-item" key={w.week}>
                  <input type="checkbox" checked={on} onChange={() => toggleWeek(course.id, w.week)} aria-label={`Complete week ${w.week}`} />
                  <div>
                    <b>Week {w.week}: {w.title}</b>
                    <p>{w.learn}</p>
                    {w.build && <p><b>Build:</b> {w.build}</p>}
                  </div>
                  <span className="role-pill">{on ? "done" : "todo"}</span>
                </article>
              );
            })}
          </div>
        </>
      )}
      <div className="panel">
        <h2>Submit this week’s work</h2>
        <p>Instructors see this in Reviews. Feedback is not a job offer.</p>
        <form onSubmit={send}>
          {weeks.length > 0 && (
            <label>Week
              <select value={week} onChange={(e) => setWeek(e.target.value)}>
                {weeks.map((w) => <option key={w.week} value={w.week}>Week {w.week}</option>)}
              </select>
            </label>
          )}
          <label>What did you build?<textarea value={note} onChange={(e) => setNote(e.target.value)} required placeholder="Link or short description" /></label>
          <button className="btn btn-main" type="submit">Send for review</button>
        </form>
        <h3>Your submissions</h3>
        {mine.length === 0 && <p>Nothing submitted on this track yet.</p>}
        <div className="queue-list">
          {mine.map((s) => (
            <div className="queue-row" key={s.id}>
              <div>
                <b>{s.title}</b>
                <p>{s.note}{s.feedback ? ` · ${s.feedback}` : ""}</p>
              </div>
              <StatusPill status={s.status} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
