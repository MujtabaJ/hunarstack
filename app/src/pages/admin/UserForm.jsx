import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useData } from "../../context/DataContext";

const EMPTY = { id: "", name: "", email: "", password: "", role: "student", city: "", bio: "" };

export default function UserForm() {
  const { id } = useParams();
  const isNew = id === "new";
  const nav = useNavigate();
  const { user } = useAuth();
  const { users, saveUser, deleteUser, enrollments, courses, getCourse, enrol, unenrol } = useData();
  const existing = isNew ? null : users.find((u) => u.id === id);
  const [draft, setDraft] = useState(EMPTY);
  const [ok, setOk] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (existing) setDraft({ ...EMPTY, ...existing, password: "" });
    else if (isNew) setDraft(EMPTY);
  }, [existing, isNew, id]);

  if (!isNew && !existing) return <Navigate to="/app/users" replace />;

  function set(field, value) {
    setDraft((d) => ({ ...d, [field]: value }));
    setOk("");
  }

  function onSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      const saved = saveUser({
        ...draft,
        id: isNew ? undefined : existing.id,
        password: draft.password || undefined,
      });
      setOk("Saved.");
      if (isNew) nav(`/app/users/${saved.id}`, { replace: true });
    } catch (err) {
      setError(err.message);
    }
  }

  function remove() {
    if (!existing) return;
    if (existing.id === user.id) {
      setError("You cannot delete the account you are signed in with.");
      return;
    }
    if (!confirm(`Delete “${existing.name}”?`)) return;
    try {
      deleteUser(existing.id);
      nav("/app/users");
    } catch (err) {
      setError(err.message);
    }
  }

  const tracks = existing ? enrollments.filter((e) => e.userId === existing.id && e.status === "active") : [];

  return (
    <>
      <div className="dash-top">
        <div>
          <p className="kicker">Directory</p>
          <h1>{isNew ? "New user" : `Edit ${draft.name || "user"}`}</h1>
          <p>{isNew ? "Create a student, instructor or admin account." : "Leave password blank to keep the current one."}</p>
        </div>
        <Link className="btn btn-ghost" to="/app/users">All users</Link>
      </div>
      {ok && <p className="form-ok">{ok}</p>}
      {error && <p className="form-error">{error}</p>}
      <form className="panel" onSubmit={onSubmit}>
        <div className="g2">
          <label>Name<input value={draft.name} onChange={(e) => set("name", e.target.value)} required /></label>
          <label>Email<input type="email" value={draft.email} onChange={(e) => set("email", e.target.value)} required /></label>
          <label>{isNew ? "Password" : "New password"}
            <input type="password" value={draft.password} onChange={(e) => set("password", e.target.value)} required={isNew} placeholder={isNew ? "" : "Leave blank to keep"} />
          </label>
          <label>Role
            <select value={draft.role} onChange={(e) => set("role", e.target.value)}>
              <option value="student">student</option>
              <option value="instructor">instructor</option>
              <option value="admin">admin</option>
            </select>
          </label>
        </div>
        <label>City<input value={draft.city || ""} onChange={(e) => set("city", e.target.value)} /></label>
        <label>Bio<textarea value={draft.bio || ""} onChange={(e) => set("bio", e.target.value)} /></label>
        {existing && (
          <div>
            <h2>Enrolled tracks</h2>
            {tracks.length === 0 && <p>None yet.</p>}
            <div className="chip-row">
              {tracks.map((e) => (
                <span className="info-chip" key={e.id}>
                  {getCourse(e.courseId)?.name || e.courseId}
                  <button className="chip-x" type="button" onClick={() => unenrol(existing.id, e.courseId)}>Remove</button>
                </span>
              ))}
            </div>
            <label>Add track
              <select defaultValue="" onChange={(e) => { if (e.target.value) enrol(existing.id, e.target.value); e.target.value = ""; }}>
                <option value="">Choose a course</option>
                {courses.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </label>
          </div>
        )}
        <p className="btns">
          <button className="btn btn-main" type="submit">{isNew ? "Create user" : "Save changes"}</button>
          {!isNew && <button className="btn btn-danger" type="button" onClick={remove}>Delete user</button>}
        </p>
      </form>
    </>
  );
}
