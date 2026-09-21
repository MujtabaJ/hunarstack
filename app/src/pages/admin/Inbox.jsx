import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import StatusPill from "../../components/StatusPill";
import { useData } from "../../context/DataContext";

export default function Inbox() {
  const { messages, setMessageStatus, deleteMessage } = useData();
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("all");

  const counts = useMemo(() => ({
    all: messages.length,
    new: messages.filter((m) => (m.status || "new") === "new").length,
    read: messages.filter((m) => m.status === "read").length,
    done: messages.filter((m) => m.status === "done").length,
  }), [messages]);

  const rows = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return messages.filter((m) => {
      const st = m.status || "new";
      if (status !== "all" && st !== status) return false;
      if (!needle) return true;
      return [m.name, m.email, m.phone, m.topic, m.message].join(" ").toLowerCase().includes(needle);
    });
  }, [messages, q, status]);

  function remove(msg) {
    if (!confirm(`Delete the message from ${msg.name}?`)) return;
    deleteMessage(msg.id);
  }

  return (
    <>
      <div className="dash-top">
        <div>
          <p className="kicker">Inbox</p>
          <h1>All messages</h1>
          <p>Contact forms land here. Edit opens the full message. Delete removes it from the academy inbox.</p>
        </div>
        <Link className="btn btn-main" to="/app/inbox/new">Add message</Link>
      </div>

      <div className="stat-grid">
        <button className={`stat clickable ${status === "all" ? "is-on" : ""}`} type="button" onClick={() => setStatus("all")}>
          <b>{counts.all}</b> all
        </button>
        <button className={`stat clickable ${status === "new" ? "is-on" : ""}`} type="button" onClick={() => setStatus("new")}>
          <b>{counts.new}</b> new
        </button>
        <button className={`stat clickable ${status === "read" ? "is-on" : ""}`} type="button" onClick={() => setStatus("read")}>
          <b>{counts.read}</b> read
        </button>
        <button className={`stat clickable ${status === "done" ? "is-on" : ""}`} type="button" onClick={() => setStatus("done")}>
          <b>{counts.done}</b> done
        </button>
      </div>

      <div className="filter-bar panel">
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search sender, topic, message…" />
      </div>

      <div className="table-wrap panel">
        <table className="data">
          <thead>
            <tr>
              <th>From</th>
              <th>Topic</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((m) => (
              <tr key={m.id}>
                <td>
                  <b>{m.name}</b><br />
                  <small>{m.email}</small>
                </td>
                <td>{m.topic || "Message"}</td>
                <td><StatusPill status={m.status || "new"} /></td>
                <td>{m.createdAt}</td>
                <td>
                  <p className="row-actions">
                    <Link className="btn btn-ghost" to={`/app/inbox/${m.id}`}>Edit</Link>
                    {(m.status || "new") === "new" && (
                      <button className="btn btn-ghost" type="button" onClick={() => setMessageStatus(m.id, "read")}>Mark read</button>
                    )}
                    <button className="btn btn-danger" type="button" onClick={() => remove(m)}>Delete</button>
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {rows.length === 0 && <p className="empty-panel">Nothing in this view.</p>}
      </div>
    </>
  );
}
