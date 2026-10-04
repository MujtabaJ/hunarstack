import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useData } from "../../context/DataContext";
import { money } from "../../data/catalog";
import PlatformLogo, { hasPlatformLogo } from "../../components/PlatformLogo";

export default function CatalogEditor() {
  const { courses, deleteCourse, setCoursePublished } = useData();
  const [q, setQ] = useState("");
  const [group, setGroup] = useState("all");
  const [selectedId, setSelectedId] = useState("");

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

  useEffect(() => {
    if (!rows.some((c) => c.id === selectedId)) setSelectedId(rows[0]?.id || "");
  }, [rows, selectedId]);

  const selected = rows.find((c) => c.id === selectedId) || null;

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

      {rows.length === 0 && <p className="panel">No courses in this view.</p>}
      {selected && (
        <div className="pick-layout">
          <aside className="panel pick-col">
            <h2>Courses</h2>
            <div className="pick-list" role="listbox" aria-label="Courses">
              {rows.map((c) => (
                <button key={c.id} type="button" className={`pick-item ${c.id === selected.id ? "is-on" : ""}`} onClick={() => setSelectedId(c.id)} aria-selected={c.id === selected.id}>
                  <b>{hasPlatformLogo(c.id) ? c.name : `${c.icon} ${c.name}`}</b>
                  <small>{c.group === "platform" ? "Platform" : "Skill"} · {c.published === false ? "Hidden" : "Live"}</small>
                </button>
              ))}
            </div>
          </aside>
          <div className="panel pick-detail">
            <div className="dash-top">
              <div>
                <p className="kicker">{selected.group === "platform" ? "Platform" : "Skill track"}</p>
                <h2>{hasPlatformLogo(selected.id) ? <PlatformLogo id={selected.id} size={28} /> : selected.icon} {selected.name}</h2>
                <p>{selected.blurb}</p>
              </div>
              <span className={`role-pill ${selected.published === false ? "" : "admin"}`}>{selected.published === false ? "Hidden" : "Live"}</span>
            </div>
            <p><b>Duration.</b> {selected.duration || selected.meta?.[0] || "—"}</p>
            <p><b>Fee.</b> {money(selected.fee, selected.currency)} / {selected.billing === "one-time" ? "one-time" : "cohort"}</p>
            {selected.learn && <p><b>You will learn.</b> {selected.learn}</p>}
            {selected.path && <p><b>Where it leads.</b> {selected.path}</p>}
            {selected.tools && <p><b>Tools.</b> {selected.tools}</p>}
            {selected.weeks?.length > 0 && (
              <>
                <h3>Weeks</h3>
                <div className="queue-list">
                  {selected.weeks.map((w) => (
                    <div className="queue-row" key={w.week}>
                      <div>
                        <b>Week {w.week}: {w.title}</b>
                        <p>{w.learn}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
            <p className="btns" style={{ marginTop: 16 }}>
              <Link className="btn btn-main" to={`/app/catalog/${selected.id}`}>Edit</Link>
              <button className="btn btn-ghost" type="button" onClick={() => setCoursePublished(selected.id, selected.published === false)}>
                {selected.published === false ? "Publish" : "Hide"}
              </button>
              <button className="btn btn-danger" type="button" onClick={() => remove(selected)}>Delete</button>
            </p>
          </div>
        </div>
      )}
    </>
  );
}
