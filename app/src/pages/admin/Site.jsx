import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useData } from "../../context/DataContext";

const KIND_LABEL = {
  journey: "Journey",
  hero: "Hero",
  contact: "Contact",
  steps: "Steps",
  mosaic: "Mosaic",
  eco: "Ecosystem",
  people: "People",
  sell: "Services",
  skills: "Skill tracks",
  platforms: "Platforms",
  projects: "Projects",
  laptop: "Laptop",
  ai: "AI band",
  cta: "Call to action",
};

export default function SiteEditor() {
  const { site, setSectionVisible, deleteSection, patchHero } = useData();
  const [q, setQ] = useState("");

  const rows = useMemo(() => {
    const needle = q.trim().toLowerCase();
    const hero = { id: "hero", kind: "hero", title: "Hero", kicker: site.hero?.kicker, visible: site.hero?.visible !== false, items: site.hero?.rail || [] };
    const contact = { id: "contact", kind: "contact", title: "Academy contact", kicker: site.contact?.email, visible: true, items: [] };
    const sections = (site.sections || []).map((s) => s);
    return [hero, contact, ...sections].filter((s) => {
      if (!needle) return true;
      return `${s.title} ${s.id} ${s.kind} ${s.kicker || ""}`.toLowerCase().includes(needle);
    });
  }, [site, q]);

  function remove(section) {
    if (section.id === "hero" || section.id === "contact") return;
    if (!confirm(`Delete homepage section “${section.title || section.id}”? It will disappear from the public site.`)) return;
    deleteSection(section.id);
  }

  return (
    <>
      <div className="dash-top">
        <div>
          <p className="kicker">CMS</p>
          <h1>All homepage sections</h1>
          <p>Every block on the public homepage. Edit opens a full form. Delete removes the section from the site.</p>
        </div>
        <Link className="btn btn-main" to="/app/site/new">Add section</Link>
      </div>

      <div className="stat-grid">
        <div className="stat"><b>{(site.sections || []).length + 2}</b> blocks</div>
        <div className="stat"><b>{(site.sections || []).filter((s) => s.visible !== false).length + (site.hero?.visible !== false ? 1 : 0)}</b> visible</div>
        <div className="stat"><b>{(site.sections || []).filter((s) => s.visible === false).length + (site.hero?.visible === false ? 1 : 0)}</b> hidden</div>
        <div className="stat"><b>{(site.sections || []).reduce((n, s) => n + (s.items?.length || 0), 0)}</b> cards</div>
      </div>

      <div className="filter-bar panel">
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search sections…" />
      </div>

      <div className="table-wrap panel">
        <table className="data">
          <thead>
            <tr>
              <th>Section</th>
              <th>Type</th>
              <th>Cards</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((s) => (
              <tr key={s.id}>
                <td>
                  <b>{s.title || s.id}</b><br />
                  <small>{s.id}{s.kicker ? ` · ${s.kicker}` : ""}</small>
                </td>
                <td>{KIND_LABEL[s.kind] || s.kind}</td>
                <td>{s.items?.length || 0}</td>
                <td>{s.visible === false ? "Hidden" : "Live"}</td>
                <td>
                  <p className="row-actions">
                    <Link className="btn btn-ghost" to={`/app/site/${s.id}`}>Edit</Link>
                    {s.id !== "contact" && (
                      <button
                        className="btn btn-ghost"
                        type="button"
                        onClick={() => (s.id === "hero" ? patchHero({ visible: s.visible === false }) : setSectionVisible(s.id, s.visible === false))}
                      >
                        {s.visible === false ? "Show" : "Hide"}
                      </button>
                    )}
                    {s.id !== "hero" && s.id !== "contact" && (
                      <button className="btn btn-danger" type="button" onClick={() => remove(s)}>Delete</button>
                    )}
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {rows.length === 0 && <p className="empty-panel">No sections in this view.</p>}
      </div>
    </>
  );
}
