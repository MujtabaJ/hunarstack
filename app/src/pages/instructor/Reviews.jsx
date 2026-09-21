import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import StatusPill from "../../components/StatusPill";
import { useData } from "../../context/DataContext";

export default function Reviews() {
  const { allSubmissions, review, deleteSubmission, getCourse, users } = useData();
  const [params] = useSearchParams();
  const studentId = params.get("student") || "";
  const [status, setStatus] = useState("review");
  const [q, setQ] = useState("");

  const counts = useMemo(() => ({
    all: allSubmissions.length,
    review: allSubmissions.filter((s) => s.status === "review").length,
    approved: allSubmissions.filter((s) => s.status === "approved").length,
    needs: allSubmissions.filter((s) => s.status === "needs work").length,
  }), [allSubmissions]);

  const rows = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return allSubmissions.filter((s) => {
      if (studentId && s.userId !== studentId) return false;
      if (status !== "all" && s.status !== status) return false;
      if (!needle) return true;
      return `${s.title} ${s.studentName} ${s.note} ${s.feedback || ""}`.toLowerCase().includes(needle);
    });
  }, [allSubmissions, q, status, studentId]);

  function remove(row) {
    if (!confirm(`Delete “${row.title}”?`)) return;
    deleteSubmission(row.id);
  }

  return (
    <>
      <div className="dash-top">
        <div>
          <p className="kicker">Feedback</p>
          <h1>All submissions</h1>
          <p>Mark work as needs work or approved. Approval is not a job offer.</p>
        </div>
        {studentId ? <Link className="btn btn-ghost" to="/app/reviews">Clear student filter</Link> : null}
      </div>
      {studentId && (
        <p className="note">Showing one student’s work. <Link to="/app/reviews">See everyone</Link>.</p>
      )}
      <div className="stat-grid">
        <button className={`stat clickable ${status === "all" ? "is-on" : ""}`} type="button" onClick={() => setStatus("all")}><b>{counts.all}</b> all</button>
        <button className={`stat clickable ${status === "review" ? "is-on" : ""}`} type="button" onClick={() => setStatus("review")}><b>{counts.review}</b> in review</button>
        <button className={`stat clickable ${status === "approved" ? "is-on" : ""}`} type="button" onClick={() => setStatus("approved")}><b>{counts.approved}</b> approved</button>
        <button className={`stat clickable ${status === "needs work" ? "is-on" : ""}`} type="button" onClick={() => setStatus("needs work")}><b>{counts.needs}</b> needs work</button>
      </div>
      <div className="filter-bar panel">
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search student, title, note…" />
      </div>
      <div className="table-wrap panel">
        <table className="data">
          <thead>
            <tr>
              <th>Work</th>
              <th>Student</th>
              <th>Course</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((s) => (
              <tr key={s.id}>
                <td>
                  <b>{s.title}</b><br />
                  <small>Week {s.week} · {s.createdAt}</small>
                </td>
                <td>{s.studentName || users.find((u) => u.id === s.userId)?.name || "Student"}</td>
                <td>{getCourse(s.courseId)?.name || s.courseId}</td>
                <td><StatusPill status={s.status} /></td>
                <td>
                  <p className="row-actions">
                    <Link className="btn btn-ghost" to={`/app/reviews/${s.id}`}>Edit</Link>
                    {s.status === "review" && (
                      <button className="btn btn-main" type="button" onClick={() => review(s.id, "approved", s.feedback || "Approved — keep going.")}>Approve</button>
                    )}
                    <button className="btn btn-danger" type="button" onClick={() => remove(s)}>Delete</button>
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {rows.length === 0 && <p className="empty-panel">No submissions in this view.</p>}
      </div>
    </>
  );
}
