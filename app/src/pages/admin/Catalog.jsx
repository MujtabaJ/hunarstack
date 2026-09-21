import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useData } from "../../context/DataContext";
import { money } from "../../data/catalog";
import PlatformLogo, { hasPlatformLogo } from "../../components/PlatformLogo";

export default function CatalogEditor() {
  const { courses, deleteCourse, setCoursePublished } = useData();
  const [q, setQ] = useState("");
  const [group, setGroup] = useState("all");

  const rows = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return courses.filter((c) => {
      if (group === "skill" && c.group !== "skill") return false;
      if (group === "platform" && c.group !== "platform") return false;
      if (group === "hidden" && c.published !== false) return false;
      if (!needle) return true;
      return `${c.name} ${c.blurb} ${c.id}`.toLowerCase().includes(needle);
    });
  }, [courses, q, group]);

  function remove(course) {
    if (!confirm(`Delete “${course.name}”? Students enrolled in this track will lose it. Paid invoices stay on record.`)) return;
    deleteCourse(course.id);
  }

  return (
    <>
      <div className="dash-top">
        <div>
          <p className="kicker">Catalogue</p>
          <h1>All courses</h1>
          <p>Every skill track and platform course. Edit opens a full form. Delete removes it from the public catalogue.</p>
        </div>
        <Link className="btn btn-main" to="/app/catalog/new">Add course</Link>
      </div>

      <div className="stat-grid">
        <div className="stat"><b>{courses.length}</b> total</div>
        <div className="stat"><b>{courses.filter((c) => c.group !== "platform").length}</b> skill tracks</div>
        <div className="stat"><b>{courses.filter((c) => c.group === "platform").length}</b> platforms</div>
        <div className="stat"><b>{courses.filter((c) => c.published === false).length}</b> hidden</div>
      </div>

      <div className="filter-bar panel">
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search courses…" />
        <select value={group} onChange={(e) => setGroup(e.target.value)}>
          <option value="all">All courses</option>
          <option value="skill">Skill tracks</option>
          <option value="platform">Platforms</option>
          <option value="hidden">Hidden</option>
        </select>
      </div>

      <div className="table-wrap panel">
        <table className="data">
          <thead>
            <tr>
              <th>Course</th>
              <th>Type</th>
              <th>Duration</th>
              <th>Fee</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((c) => (
              <tr key={c.id}>
                <td>
                  <div className="course-cell">
                    {hasPlatformLogo(c.id) ? <PlatformLogo id={c.id} size={28} /> : <span className="cell-icon">{c.icon}</span>}
                    <div>
                      <b>{c.name}</b><br />
                      <small>{c.id}</small>
                    </div>
                  </div>
                </td>
                <td>{c.group === "platform" ? "Platform" : "Skill"}</td>
                <td>{c.duration || c.meta?.[0] || "—"}</td>
                <td>{money(c.fee, c.currency)} <small>/{c.billing === "one-time" ? "one-time" : "cohort"}</small></td>
                <td>{c.published === false ? "Hidden" : "Live"}</td>
                <td>
                  <p className="row-actions">
                    <Link className="btn btn-ghost" to={`/app/catalog/${c.id}`}>Edit</Link>
                    <button className="btn btn-ghost" type="button" onClick={() => setCoursePublished(c.id, c.published === false)}>
                      {c.published === false ? "Publish" : "Hide"}
                    </button>
                    <button className="btn btn-danger" type="button" onClick={() => remove(c)}>Delete</button>
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {rows.length === 0 && <p className="empty-panel">No courses in this view.</p>}
      </div>
    </>
  );
}
