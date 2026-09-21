import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useData } from "../../context/DataContext";

export default function Users() {
  const { user } = useAuth();
  const { users, enrollments, changeRole, enrol, unenrol, courses, getCourse, deleteUser } = useData();
  const [q, setQ] = useState("");
  const [error, setError] = useState("");

  const rows = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return users.filter((u) => {
      if (!needle) return true;
      return `${u.name} ${u.email} ${u.role} ${u.city || ""}`.toLowerCase().includes(needle);
    });
  }, [users, q]);

  function remove(person) {
    setError("");
    if (person.id === user.id) {
      setError("You cannot delete the account you are signed in with.");
      return;
    }
    if (!confirm(`Delete “${person.name}”? Enrolments and unpaid invoices for this person will be removed.`)) return;
    try {
      deleteUser(person.id);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <>
      <div className="dash-top">
        <div>
          <p className="kicker">Directory</p>
          <h1>All users</h1>
          <p>Every account. Edit opens a full form. Delete removes the person from this academy.</p>
        </div>
        <Link className="btn btn-main" to="/app/users/new">Add user</Link>
      </div>
      {error && <p className="form-error">{error}</p>}
      <div className="stat-grid">
        <div className="stat"><b>{users.filter((u) => u.role === "student").length}</b> students</div>
        <div className="stat"><b>{users.filter((u) => u.role === "instructor").length}</b> instructors</div>
        <div className="stat"><b>{users.filter((u) => u.role === "admin").length}</b> admins</div>
        <div className="stat"><b>{users.length}</b> total</div>
      </div>
      <div className="filter-bar panel">
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search name, email, role…" />
      </div>
      <div className="table-wrap panel">
        <table className="data">
          <thead>
            <tr>
              <th>Person</th>
              <th>Role</th>
              <th>Tracks</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((u) => {
              const tracks = enrollments.filter((e) => e.userId === u.id && e.status === "active");
              return (
              <tr key={u.id}>
                <td>
                  <b>{u.name}</b><br />
                  <small>{u.email}</small>
                </td>
                <td>
                  <select value={u.role} onChange={(e) => changeRole(u.id, e.target.value)}>
                    <option value="student">student</option>
                    <option value="instructor">instructor</option>
                    <option value="admin">admin</option>
                  </select>
                </td>
                <td>
                  <div className="chip-row">
                    {tracks.length === 0 && "—"}
                    {tracks.map((e) => (
                      <span key={e.id} className="info-chip">
                        {getCourse(e.courseId)?.name || e.courseId}
                        <button className="chip-x" type="button" onClick={() => { if (confirm("Remove this track?")) unenrol(u.id, e.courseId); }} aria-label="Remove track">×</button>
                      </span>
                    ))}
                  </div>
                  <select defaultValue="" onChange={(e) => { if (e.target.value) enrol(u.id, e.target.value); e.target.value = ""; }}>
                    <option value="">Add track</option>
                    {courses.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </td>
                <td>
                  <p className="row-actions">
                    <Link className="btn btn-ghost" to={`/app/users/${u.id}`}>Edit</Link>
                    <button className="btn btn-danger" type="button" onClick={() => remove(u)}>Delete</button>
                  </p>
                </td>
              </tr>
              );
            })}
          </tbody>
        </table>
        {rows.length === 0 && <p className="empty-panel">No users in this view.</p>}
      </div>
    </>
  );
}
