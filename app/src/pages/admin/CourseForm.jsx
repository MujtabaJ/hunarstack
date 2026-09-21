import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useData } from "../../context/DataContext";
import { defaultFeeFor } from "../../data/catalog";

const EMPTY = {
  id: "",
  name: "",
  icon: "📘",
  group: "skill",
  published: true,
  duration: "8 weeks",
  format: "",
  blurb: "",
  learn: "",
  path: "",
  build: "",
  ai: "",
  earn: "",
  prereq: "",
  tools: "",
  assessment: "",
  fee: 35000,
  currency: "PKR",
  billing: "cohort",
  meta: [],
  modules: [],
  weeks: [],
};

function slug(name) {
  return String(name || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 24);
}

export default function CourseForm() {
  const { id } = useParams();
  const isNew = id === "new";
  const nav = useNavigate();
  const { courses, saveCourse, deleteCourse } = useData();
  const existing = isNew ? null : courses.find((c) => c.id === id);
  const [draft, setDraft] = useState(EMPTY);
  const [ok, setOk] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (existing) {
      setDraft({
        ...EMPTY,
        ...existing,
        meta: existing.meta || [],
        modules: existing.modules || [],
        weeks: existing.weeks || [],
        published: existing.published !== false,
      });
    } else if (isNew) {
      setDraft(EMPTY);
    }
  }, [existing, isNew, id]);

  if (!isNew && !existing) return <Navigate to="/app/catalog" replace />;

  function set(field, value) {
    setDraft((d) => ({ ...d, [field]: value }));
    setOk("");
  }

  function onSubmit(e) {
    e.preventDefault();
    setError("");
    const courseId = isNew ? slug(draft.id || draft.name) : existing.id;
    if (!courseId || !draft.name) {
      setError("Name is required.");
      return;
    }
    if (isNew && courses.some((c) => c.id === courseId)) {
      setError("That course id already exists. Change the name or id.");
      return;
    }
    saveCourse({
      ...draft,
      id: courseId,
      query: draft.query || draft.name,
      fee: Number(draft.fee) || 0,
      meta: Array.isArray(draft.meta) ? draft.meta : String(draft.meta || "").split(",").map((s) => s.trim()).filter(Boolean),
      modules: (draft.modules || []).filter((m) => m.title || m.text),
      weeks: (draft.weeks || []).map((w, i) => ({ ...w, week: i + 1 })),
    });
    setOk("Saved.");
    if (isNew) nav(`/app/catalog/${courseId}`, { replace: true });
  }

  function remove() {
    if (!existing) return;
    if (!confirm(`Delete “${existing.name}”?`)) return;
    deleteCourse(existing.id);
    nav("/app/catalog");
  }

  return (
    <>
      <div className="dash-top">
        <div>
          <p className="kicker">Catalogue</p>
          <h1>{isNew ? "New course" : `Edit ${draft.name || "course"}`}</h1>
          <p>Update the public catalogue. Fee changes apply to new invoices, not invoices already issued.</p>
        </div>
        <Link className="btn btn-ghost" to="/app/catalog">All courses</Link>
      </div>
      {ok && <p className="form-ok">{ok}</p>}
      {error && <p className="form-error">{error}</p>}
      <form className="panel" onSubmit={onSubmit}>
        <div className="g2">
          <label>Name<input value={draft.name} onChange={(e) => set("name", e.target.value)} required /></label>
          {isNew ? (
            <label>Id (optional slug)<input value={draft.id} onChange={(e) => set("id", e.target.value)} placeholder="auto from name" /></label>
          ) : (
            <label>Id<input value={draft.id} disabled /></label>
          )}
          <label>Icon or emoji<input value={draft.icon || ""} onChange={(e) => set("icon", e.target.value)} /></label>
          <label>Type
            <select value={draft.group || "skill"} onChange={(e) => {
              const group = e.target.value;
              setDraft((d) => ({
                ...d,
                group,
                billing: group === "platform" ? "one-time" : "cohort",
                fee: d.fee || defaultFeeFor({ ...d, group }),
              }));
            }}>
              <option value="skill">Skill track</option>
              <option value="platform">Platform course</option>
            </select>
          </label>
          <label>Duration<input value={draft.duration || ""} onChange={(e) => set("duration", e.target.value)} placeholder="12 weeks" /></label>
          <label>Format<input value={draft.format || ""} onChange={(e) => set("format", e.target.value)} /></label>
        </div>
        <div className="g2">
          <label>Fee amount
            <input type="number" min="0" step="500" value={draft.fee ?? 0} onChange={(e) => set("fee", e.target.value)} />
          </label>
          <label>Currency<input value={draft.currency || "PKR"} onChange={(e) => set("currency", e.target.value)} /></label>
          <label>Billing
            <select value={draft.billing || "cohort"} onChange={(e) => set("billing", e.target.value)}>
              <option value="cohort">Per cohort</option>
              <option value="one-time">One-time</option>
              <option value="monthly">Monthly</option>
            </select>
          </label>
          <label className="chk" style={{ alignSelf: "end" }}>
            <input type="checkbox" checked={draft.published !== false} onChange={(e) => set("published", e.target.checked)} />
            Published on the public site
          </label>
        </div>
        <label>Short description<textarea value={draft.blurb || ""} onChange={(e) => set("blurb", e.target.value)} /></label>
        <label>Learn<textarea value={draft.learn || ""} onChange={(e) => set("learn", e.target.value)} /></label>
        <label>Build<textarea value={draft.build || ""} onChange={(e) => set("build", e.target.value)} /></label>
        <label>Path / explore<textarea value={draft.path || ""} onChange={(e) => set("path", e.target.value)} /></label>
        <div className="g2">
          <label>AI note<textarea value={draft.ai || ""} onChange={(e) => set("ai", e.target.value)} /></label>
          <label>Earning note<textarea value={draft.earn || ""} onChange={(e) => set("earn", e.target.value)} /></label>
        </div>
        <label>Prerequisites<input value={draft.prereq || ""} onChange={(e) => set("prereq", e.target.value)} /></label>
        <label>Tools<input value={draft.tools || ""} onChange={(e) => set("tools", e.target.value)} /></label>
        <label>Meta chips (comma separated)<input value={Array.isArray(draft.meta) ? draft.meta.join(", ") : draft.meta || ""} onChange={(e) => set("meta", e.target.value.split(",").map((s) => s.trim()).filter(Boolean))} /></label>
        <label>Assessment note<textarea value={draft.assessment || ""} onChange={(e) => set("assessment", e.target.value)} /></label>
        <div className="dash-top" style={{ marginTop: 18 }}>
          <h2>Modules</h2>
          <button className="btn btn-ghost" type="button" onClick={() => setDraft((d) => ({ ...d, modules: [...(d.modules || []), { title: "", text: "", build: "" }] }))}>Add module</button>
        </div>
        {(draft.modules || []).map((mod, index) => (
          <div className="mini-card" key={`mod-${index}`} style={{ marginBottom: 10 }}>
            <div className="dash-top">
              <h3>{mod.title || `Module ${index + 1}`}</h3>
              <button className="btn btn-danger" type="button" onClick={() => setDraft((d) => ({ ...d, modules: d.modules.filter((_, i) => i !== index) }))}>Delete</button>
            </div>
            <label>Title<input value={mod.title || ""} onChange={(e) => setDraft((d) => { const modules = [...d.modules]; modules[index] = { ...modules[index], title: e.target.value }; return { ...d, modules }; })} /></label>
            <label>Text<textarea value={mod.text || ""} onChange={(e) => setDraft((d) => { const modules = [...d.modules]; modules[index] = { ...modules[index], text: e.target.value }; return { ...d, modules }; })} /></label>
            <label>Build<input value={mod.build || ""} onChange={(e) => setDraft((d) => { const modules = [...d.modules]; modules[index] = { ...modules[index], build: e.target.value }; return { ...d, modules }; })} /></label>
          </div>
        ))}
        <div className="dash-top" style={{ marginTop: 18 }}>
          <h2>Week by week</h2>
          <button className="btn btn-ghost" type="button" onClick={() => setDraft((d) => ({ ...d, weeks: [...(d.weeks || []), { week: (d.weeks || []).length + 1, title: "", learn: "", build: "" }] }))}>Add week</button>
        </div>
        {(draft.weeks || []).map((w, index) => (
          <div className="mini-card" key={`week-${index}`} style={{ marginBottom: 10 }}>
            <div className="dash-top">
              <h3>Week {index + 1}</h3>
              <button className="btn btn-danger" type="button" onClick={() => setDraft((d) => ({ ...d, weeks: d.weeks.filter((_, i) => i !== index).map((row, i) => ({ ...row, week: i + 1 })) }))}>Delete</button>
            </div>
            <label>Title<input value={w.title || ""} onChange={(e) => setDraft((d) => { const weeks = [...d.weeks]; weeks[index] = { ...weeks[index], title: e.target.value }; return { ...d, weeks }; })} /></label>
            <label>Learn<textarea value={w.learn || ""} onChange={(e) => setDraft((d) => { const weeks = [...d.weeks]; weeks[index] = { ...weeks[index], learn: e.target.value }; return { ...d, weeks }; })} /></label>
            <label>Build<textarea value={w.build || ""} onChange={(e) => setDraft((d) => { const weeks = [...d.weeks]; weeks[index] = { ...weeks[index], build: e.target.value }; return { ...d, weeks }; })} /></label>
          </div>
        ))}
        <p className="btns">
          <button className="btn btn-main" type="submit">{isNew ? "Create course" : "Save changes"}</button>
          {!isNew && <button className="btn btn-danger" type="button" onClick={remove}>Delete course</button>}
        </p>
      </form>
    </>
  );
}
