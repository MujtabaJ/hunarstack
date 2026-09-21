import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useData } from "../../context/DataContext";

export default function ReviewForm() {
  const { id } = useParams();
  const nav = useNavigate();
  const { allSubmissions, saveSubmission, deleteSubmission, review, getCourse, users } = useData();
  const existing = allSubmissions.find((s) => s.id === id);
  const [draft, setDraft] = useState(null);
  const [ok, setOk] = useState("");
  const student = users.find((u) => u.id === existing?.userId);

  useEffect(() => {
    if (existing) setDraft({ ...existing });
  }, [existing]);

  if (!existing) return <Navigate to="/app/reviews" replace />;
  if (!draft) return null;

  function set(field, value) {
    setDraft((d) => ({ ...d, [field]: value }));
    setOk("");
  }

  function onSubmit(e) {
    e.preventDefault();
    saveSubmission(draft);
    setOk("Saved.");
  }

  function decide(status) {
    review(existing.id, status, draft.feedback || (status === "approved" ? "Approved — keep going." : "Please revise."));
    setOk(`Marked ${status}.`);
  }

  function remove() {
    if (!confirm(`Delete “${existing.title}”?`)) return;
    deleteSubmission(existing.id);
    nav("/app/reviews");
  }

  return (
    <>
      <div className="dash-top">
        <div>
          <p className="kicker">Feedback</p>
          <h1>Edit submission</h1>
          <p>{draft.studentName || student?.name || "Student"} · {getCourse(draft.courseId)?.name} · Week {draft.week}</p>
        </div>
        <Link className="btn btn-ghost" to="/app/reviews">All submissions</Link>
      </div>
      {ok && <p className="form-ok">{ok}</p>}
      <form className="panel" onSubmit={onSubmit}>
        <label>Title<input value={draft.title || ""} onChange={(e) => set("title", e.target.value)} /></label>
        <label>What they built<textarea value={draft.note || ""} onChange={(e) => set("note", e.target.value)} /></label>
        <label>Status
          <select value={draft.status || "review"} onChange={(e) => set("status", e.target.value)}>
            <option value="review">in review</option>
            <option value="approved">approved</option>
            <option value="needs work">needs work</option>
          </select>
        </label>
        <label>Feedback<textarea value={draft.feedback || ""} onChange={(e) => set("feedback", e.target.value)} /></label>
        <p className="btns">
          <button className="btn btn-main" type="submit">Save changes</button>
          {draft.status === "review" && (
            <>
              <button className="btn btn-ghost" type="button" onClick={() => decide("approved")}>Approve</button>
              <button className="btn btn-ghost" type="button" onClick={() => decide("needs work")}>Needs work</button>
            </>
          )}
          <button className="btn btn-danger" type="button" onClick={remove}>Delete</button>
        </p>
      </form>
    </>
  );
}
