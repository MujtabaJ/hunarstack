import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useData } from "../../context/DataContext";

const EMPTY = { name: "", email: "", phone: "", topic: "", message: "", status: "new" };

export default function MessageForm() {
  const { id } = useParams();
  const isNew = id === "new";
  const nav = useNavigate();
  const { messages, saveMessage, deleteMessage } = useData();
  const existing = isNew ? null : messages.find((m) => m.id === id);
  const [draft, setDraft] = useState(EMPTY);
  const [ok, setOk] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (existing) setDraft({ ...EMPTY, ...existing });
    else if (isNew) setDraft(EMPTY);
  }, [existing, isNew, id]);

  if (!isNew && !existing) return <Navigate to="/app/inbox" replace />;

  function set(field, value) {
    setDraft((d) => ({ ...d, [field]: value }));
    setOk("");
  }

  function onSubmit(e) {
    e.preventDefault();
    setError("");
    if (!draft.name || !draft.email || !draft.message) {
      setError("Name, email and message are required.");
      return;
    }
    saveMessage({ ...draft, id: isNew ? undefined : existing.id });
    setOk("Saved.");
    if (isNew) nav("/app/inbox");
  }

  function remove() {
    if (!existing) return;
    if (!confirm(`Delete the message from ${existing.name}?`)) return;
    deleteMessage(existing.id);
    nav("/app/inbox");
  }

  return (
    <>
      <div className="dash-top">
        <div>
          <p className="kicker">Inbox</p>
          <h1>{isNew ? "New message" : `Edit ${draft.topic || draft.name || "message"}`}</h1>
        </div>
        <Link className="btn btn-ghost" to="/app/inbox">All messages</Link>
      </div>
      {ok && <p className="form-ok">{ok}</p>}
      {error && <p className="form-error">{error}</p>}
      <form className="panel" onSubmit={onSubmit}>
        <div className="g2">
          <label>Name<input value={draft.name} onChange={(e) => set("name", e.target.value)} required /></label>
          <label>Email<input type="email" value={draft.email} onChange={(e) => set("email", e.target.value)} required /></label>
          <label>Phone<input value={draft.phone || ""} onChange={(e) => set("phone", e.target.value)} /></label>
          <label>Topic<input value={draft.topic || ""} onChange={(e) => set("topic", e.target.value)} /></label>
          <label>Status
            <select value={draft.status || "new"} onChange={(e) => set("status", e.target.value)}>
              <option value="new">new</option>
              <option value="read">read</option>
              <option value="done">done</option>
            </select>
          </label>
        </div>
        <label>Message<textarea value={draft.message || ""} onChange={(e) => set("message", e.target.value)} required /></label>
        <p className="btns">
          <button className="btn btn-main" type="submit">{isNew ? "Create message" : "Save changes"}</button>
          {!isNew && <button className="btn btn-danger" type="button" onClick={remove}>Delete</button>}
        </p>
      </form>
    </>
  );
}
