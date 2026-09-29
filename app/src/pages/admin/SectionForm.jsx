import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import ImageField from "../../components/ImageField";
import { useData } from "../../context/DataContext";

const KINDS = [
  ["steps", "Steps / cards"],
  ["journey", "Journey path"],
  ["mosaic", "Photo mosaic"],
  ["eco", "Ecosystem"],
  ["people", "People"],
  ["sell", "Services"],
  ["skills", "Skill tracks"],
  ["platforms", "Platforms"],
  ["projects", "Projects"],
  ["laptop", "Laptop split"],
  ["ai", "AI band"],
  ["cta", "Call to action"],
];

const EMPTY_SECTION = {
  id: "",
  visible: true,
  kind: "steps",
  tone: "",
  kicker: "",
  title: "",
  text: "",
  note: "",
  image: "",
  imageAlt: "",
  cta1Label: "",
  cta1To: "",
  cta2Label: "",
  cta2To: "",
  items: [],
};

const EMPTY_HERO = {
  visible: true,
  kicker: "",
  titleBefore: "",
  titleHighlight: "",
  titleAfter: "",
  lead: "",
  image: "",
  imageAlt: "",
  cta1Label: "",
  cta1To: "",
  cta2Label: "",
  cta2To: "",
  rail: [],
};

const EMPTY_CONTACT = { name: "", email: "", phone: "", address: "", hours: "" };

const EMPTY_ITEM = {
  id: "",
  title: "",
  text: "",
  tag: "",
  mark: "",
  tags: "",
  to: "",
  image: "",
  imageAlt: "",
  steps: [],
};

function slug(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 24);
}

export default function SectionForm() {
  const { id } = useParams();
  const isNew = id === "new";
  const isHero = id === "hero";
  const isContact = id === "contact";
  const nav = useNavigate();
  const { site, saveSection, deleteSection, patchHero, patchContact } = useData();
  const existing = isNew || isHero || isContact ? null : (site.sections || []).find((s) => s.id === id);
  const [draft, setDraft] = useState(isHero ? EMPTY_HERO : isContact ? EMPTY_CONTACT : EMPTY_SECTION);
  const [ok, setOk] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (isHero) setDraft({ ...EMPTY_HERO, ...site.hero, rail: site.hero?.rail || [] });
    else if (isContact) setDraft({ ...EMPTY_CONTACT, ...site.contact });
    else if (existing) setDraft({ ...EMPTY_SECTION, ...existing, items: (existing.items || []).map((it) => ({ ...EMPTY_ITEM, ...it, steps: it.steps || [] })) });
    else if (isNew) setDraft(EMPTY_SECTION);
  }, [existing, isHero, isContact, isNew, id, site.hero, site.contact]);

  if (!isNew && !isHero && !isContact && !existing) return <Navigate to="/app/site" replace />;

  function set(field, value) {
    setDraft((d) => ({ ...d, [field]: value }));
    setOk("");
  }

  function setItem(index, field, value) {
    setDraft((d) => {
      const items = [...(d.items || [])];
      items[index] = { ...items[index], [field]: value };
      return { ...d, items };
    });
    setOk("");
  }

  function addItem() {
    setDraft((d) => ({
      ...d,
      items: [...(d.items || []), { ...EMPTY_ITEM, id: `item-${(d.items || []).length + 1}` }],
    }));
  }

  function removeItem(index) {
    setDraft((d) => ({ ...d, items: (d.items || []).filter((_, i) => i !== index) }));
  }

  function onSubmit(e) {
    e.preventDefault();
    setError("");
    if (isHero) {
      patchHero({
        ...draft,
        rail: Array.isArray(draft.rail) ? draft.rail : String(draft.rail || "").split(",").map((s) => s.trim()).filter(Boolean),
      });
      setOk("Saved.");
      return;
    }
    if (isContact) {
      patchContact(draft);
      setOk("Saved.");
      return;
    }
    const sectionId = isNew ? slug(draft.id || draft.title) : existing.id;
    if (!sectionId || !draft.title) {
      setError("Title is required.");
      return;
    }
    if (isNew && (site.sections || []).some((s) => s.id === sectionId)) {
      setError("That section id already exists.");
      return;
    }
    saveSection({
      ...draft,
      id: sectionId,
      items: (draft.items || []).map((it, i) => ({
        ...it,
        id: slug(it.id || it.title) || `item-${i + 1}`,
        steps: Array.isArray(it.steps) ? it.steps.filter(Boolean) : String(it.steps || "").split("\n").filter(Boolean),
      })),
    });
    setOk("Saved.");
    if (isNew) nav(`/app/site/${sectionId}`, { replace: true });
  }

  function remove() {
    if (isHero || !existing) return;
    if (!confirm(`Delete “${existing.title || existing.id}”?`)) return;
    deleteSection(existing.id);
    nav("/app/site");
  }

  return (
    <>
      <div className="dash-top">
        <div>
          <p className="kicker">CMS</p>
          <h1>{isHero ? "Edit hero" : isContact ? "Academy contact" : isNew ? "New section" : `Edit ${draft.title || "section"}`}</h1>
          <p>Changes go live on the public homepage after you save.</p>
        </div>
        <Link className="btn btn-ghost" to="/app/site">All sections</Link>
      </div>
      {ok && <p className="form-ok">{ok}</p>}
      {error && <p className="form-error">{error}</p>}
      <form className="panel" onSubmit={onSubmit}>
        {isHero ? (
          <>
            <label className="chk">
              <input type="checkbox" checked={draft.visible !== false} onChange={(e) => set("visible", e.target.checked)} />
              Visible on homepage
            </label>
            <label>Kicker<input value={draft.kicker || ""} onChange={(e) => set("kicker", e.target.value)} /></label>
            <div className="g2">
              <label>Title before highlight<input value={draft.titleBefore || ""} onChange={(e) => set("titleBefore", e.target.value)} /></label>
              <label>Highlight word<input value={draft.titleHighlight || ""} onChange={(e) => set("titleHighlight", e.target.value)} /></label>
              <label>Title after<input value={draft.titleAfter || ""} onChange={(e) => set("titleAfter", e.target.value)} /></label>
            </div>
            <label>Lead<textarea value={draft.lead || ""} onChange={(e) => set("lead", e.target.value)} /></label>
            <div className="g2">
              <label>Primary button<input value={draft.cta1Label || ""} onChange={(e) => set("cta1Label", e.target.value)} /></label>
              <label>Primary link<input value={draft.cta1To || ""} onChange={(e) => set("cta1To", e.target.value)} /></label>
              <label>Secondary button<input value={draft.cta2Label || ""} onChange={(e) => set("cta2Label", e.target.value)} /></label>
              <label>Secondary link<input value={draft.cta2To || ""} onChange={(e) => set("cta2To", e.target.value)} /></label>
            </div>
            <label>Path pills (comma separated)<input value={Array.isArray(draft.rail) ? draft.rail.join(", ") : draft.rail || ""} onChange={(e) => set("rail", e.target.value.split(",").map((s) => s.trim()).filter(Boolean))} /></label>
            <ImageField label="Hero photo" value={draft.image || ""} alt={draft.imageAlt} onChange={(image) => set("image", image)} onAlt={(imageAlt) => set("imageAlt", imageAlt)} />
          </>
        ) : isContact ? (
          <>
            <label>Name<input value={draft.name || ""} onChange={(e) => set("name", e.target.value)} /></label>
            <label>Email<input type="email" value={draft.email || ""} onChange={(e) => set("email", e.target.value)} /></label>
            <label>Phone / WhatsApp<input value={draft.phone || ""} onChange={(e) => set("phone", e.target.value)} /></label>
            <label>Office address<input value={draft.address || ""} onChange={(e) => set("address", e.target.value)} /></label>
            <label>Hours<input value={draft.hours || ""} onChange={(e) => set("hours", e.target.value)} /></label>
          </>
        ) : (
          <>
            <div className="g2">
              <label>Title<input value={draft.title || ""} onChange={(e) => set("title", e.target.value)} required /></label>
              {isNew ? (
                <label>Id (optional slug)<input value={draft.id} onChange={(e) => set("id", e.target.value)} placeholder="auto from title" /></label>
              ) : (
                <label>Id<input value={draft.id} disabled /></label>
              )}
              <label>Type
                <select value={draft.kind || "steps"} onChange={(e) => set("kind", e.target.value)}>
                  {KINDS.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                </select>
              </label>
              <label>Tone
                <select value={draft.tone || ""} onChange={(e) => set("tone", e.target.value)}>
                  <option value="">Default</option>
                  <option value="soft">Soft</option>
                  <option value="mint">Mint</option>
                  <option value="blue">Blue</option>
                  <option value="warm">Warm</option>
                  <option value="navy">Navy</option>
                </select>
              </label>
            </div>
            <label className="chk">
              <input type="checkbox" checked={draft.visible !== false} onChange={(e) => set("visible", e.target.checked)} />
              Show on homepage
            </label>
            <label>Kicker<input value={draft.kicker || ""} onChange={(e) => set("kicker", e.target.value)} /></label>
            <label>Text<textarea value={draft.text || ""} onChange={(e) => set("text", e.target.value)} /></label>
            <label>Note<input value={draft.note || ""} onChange={(e) => set("note", e.target.value)} /></label>
            {draft.kind === "cta" && (
              <div className="g2">
                <label>Primary button<input value={draft.cta1Label || ""} onChange={(e) => set("cta1Label", e.target.value)} /></label>
                <label>Primary link<input value={draft.cta1To || ""} onChange={(e) => set("cta1To", e.target.value)} /></label>
                <label>Secondary button<input value={draft.cta2Label || ""} onChange={(e) => set("cta2Label", e.target.value)} /></label>
                <label>Secondary link<input value={draft.cta2To || ""} onChange={(e) => set("cta2To", e.target.value)} /></label>
              </div>
            )}
            {["laptop", "ai", "mosaic"].includes(draft.kind) || draft.image ? (
              <ImageField label="Section photo" value={draft.image || ""} alt={draft.imageAlt} onChange={(image) => set("image", image)} onAlt={(imageAlt) => set("imageAlt", imageAlt)} />
            ) : null}
            <div className="dash-top" style={{ marginTop: 18 }}>
              <h2>Cards in this section</h2>
              <button className="btn btn-ghost" type="button" onClick={addItem}>Add card</button>
            </div>
            {(draft.items || []).map((item, index) => (
              <div className="mini-card" key={item.id || index} style={{ marginBottom: 10 }}>
                <div className="dash-top">
                  <h3>{item.title || `Card ${index + 1}`}</h3>
                  <button className="btn btn-danger" type="button" onClick={() => removeItem(index)}>Delete</button>
                </div>
                <div className="g2">
                  <label>Title<input value={item.title || ""} onChange={(e) => setItem(index, "title", e.target.value)} /></label>
                  <label>Id<input value={item.id || ""} onChange={(e) => setItem(index, "id", e.target.value)} /></label>
                  <label>Tag<input value={item.tag || ""} onChange={(e) => setItem(index, "tag", e.target.value)} /></label>
                  <label>Mark<input value={item.mark || ""} onChange={(e) => setItem(index, "mark", e.target.value)} /></label>
                </div>
                <label>Text<textarea value={item.text || ""} onChange={(e) => setItem(index, "text", e.target.value)} /></label>
                <label>Tags line<input value={item.tags || ""} onChange={(e) => setItem(index, "tags", e.target.value)} /></label>
                <label>Link<input value={item.to || ""} onChange={(e) => setItem(index, "to", e.target.value)} /></label>
                <label>Steps (one per line)
                  <textarea value={Array.isArray(item.steps) ? item.steps.join("\n") : item.steps || ""} onChange={(e) => setItem(index, "steps", e.target.value.split("\n"))} />
                </label>
                <ImageField value={item.image || ""} alt={item.imageAlt} onChange={(image) => setItem(index, "image", image)} onAlt={(imageAlt) => setItem(index, "imageAlt", imageAlt)} />
              </div>
            ))}
          </>
        )}
        <p className="btns">
          <button className="btn btn-main" type="submit">{isNew ? "Create section" : "Save changes"}</button>
          {!isNew && !isHero && !isContact && <button className="btn btn-danger" type="button" onClick={remove}>Delete section</button>}
        </p>
      </form>
    </>
  );
}
