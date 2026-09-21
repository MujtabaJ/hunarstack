import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useData } from "../../context/DataContext";

const EMPTY = {
  name: "",
  email: "",
  phone: "",
  city: "",
  track: "",
  courseId: "",
  level: "",
  goal: "",
  source: "",
  status: "pending",
  note: "",
};

export default function ApplicationForm() {
  const { id } = useParams();
  const isNew = id === "new";
  const nav = useNavigate();
  const { applications, courses, saveApplication, deleteApplication, decideApplication, getCourse } = useData();
  const existing = isNew ? null : applications.find((a) => a.id === id);
  const [draft, setDraft] = useState(EMPTY);
  const [ok, setOk] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (existing) setDraft({ ...EMPTY, ...existing });
    else if (isNew) setDraft(EMPTY);
  }, [existing, isNew, id]);

  if (!isNew && !existing) return <Navigate to="/app/applications" replace />;

  function set(field, value) {
    setDraft((d) => ({ ...d, [field]: value }));
    setOk("");
  }

  function onSubmit(e) {
    e.preventDefault();
    setError("");
    if (!draft.name || !draft.email) {
      setError("Name and email are required.");
      return;
    }
    const course = getCourse(draft.courseId || draft.track);
    saveApplication({
      ...draft,
      id: isNew ? undefined : existing.id,
      courseId: course?.id || draft.courseId,
      track: course?.name || draft.track,
    });
    setOk("Saved.");
    if (isNew) nav("/app/applications");
  }

  function decide(status) {
    decideApplication(existing.id, status, draft.courseId || getCourse(draft.track)?.id, draft.note);
    setOk(`Marked ${status}.`);
  }

  function remove() {
    if (!existing) return;
    if (!confirm(`Delete the application from ${existing.name}?`)) return;
    deleteApplication(existing.id);
    nav("/app/applications");
  }

  return (
    <>
      <div className="dash-top">
        <div>
          <p className="kicker">Admissions</p>
          <h1>{isNew ? "New application" : `Edit ${draft.name || "application"}`}</h1>
          <p>Update the request, then accept, waitlist or decline. Accepting enrols a matching login.</p>
        </div>
        <Link className="btn btn-ghost" to="/app/applications">All applications</Link>
      </div>
      {ok && <p className="form-ok">{ok}</p>}
      {error && <p className="form-error">{error}</p>}
      <form className="panel" onSubmit={onSubmit}>
        <div className="g2">
          <label>Name<input value={draft.name} onChange={(e) => set("name", e.target.value)} required /></label>
          <label>Email<input type="email" value={draft.email} onChange={(e) => set("email", e.target.value)} required /></label>
          <label>Phone<input value={draft.phone || ""} onChange={(e) => set("phone", e.target.value)} /></label>
          <label>City<input value={draft.city || ""} onChange={(e) => set("city", e.target.value)} /></label>
          <label>Track
            <select value={draft.courseId || ""} onChange={(e) => {
              const course = courses.find((c) => c.id === e.target.value);
              setDraft((d) => ({ ...d, courseId: e.target.value, track: course?.name || d.track }));
              setOk("");
            }}>
              <option value="">Choose a course</option>
              {courses.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </label>
          <label>Level<input value={draft.level || ""} onChange={(e) => set("level", e.target.value)} /></label>
          <label>Source<input value={draft.source || ""} onChange={(e) => set("source", e.target.value)} /></label>
          <label>Status
            <select value={draft.status || "pending"} onChange={(e) => set("status", e.target.value)}>
              <option value="pending">pending</option>
              <option value="waitlist">waitlist</option>
              <option value="accepted">accepted</option>
              <option value="declined">declined</option>
            </select>
          </label>
        </div>
        <label>Goal<textarea value={draft.goal || ""} onChange={(e) => set("goal", e.target.value)} /></label>
        <label>Internal note<textarea value={draft.note || ""} onChange={(e) => set("note", e.target.value)} /></label>
        <p className="btns">
          <button className="btn btn-main" type="submit">{isNew ? "Create application" : "Save changes"}</button>
          {!isNew && draft.status === "pending" && (
            <>
              <button className="btn btn-ghost" type="button" onClick={() => decide("accepted")}>Accept & enrol</button>
              <button className="btn btn-ghost" type="button" onClick={() => decide("waitlist")}>Waitlist</button>
              <button className="btn btn-ghost" type="button" onClick={() => decide("declined")}>Decline</button>
            </>
          )}
          {!isNew && <button className="btn btn-danger" type="button" onClick={remove}>Delete</button>}
        </p>
      </form>
    </>
  );
}
