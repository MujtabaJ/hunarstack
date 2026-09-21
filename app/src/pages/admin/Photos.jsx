import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useData } from "../../context/DataContext";

export default function Photos() {
  const { photos, deletePhoto } = useData();
  const [q, setQ] = useState("");

  const rows = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return photos.filter((p) => {
      if (!needle) return true;
      return `${p.label} ${p.key} ${p.alt || ""}`.toLowerCase().includes(needle);
    });
  }, [photos, q]);

  function remove(photo) {
    if (!confirm(`Remove “${photo.label}”? The homepage block will have no photo until you add another.`)) return;
    deletePhoto(photo.key);
  }

  return (
    <>
      <div className="dash-top">
        <div>
          <p className="kicker">CMS</p>
          <h1>All pictures</h1>
          <p>Every homepage photo. Edit opens a form to replace the image. Delete clears it from that block.</p>
        </div>
      </div>
      <div className="filter-bar panel">
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search pictures…" />
      </div>
      <div className="table-wrap panel">
        <table className="data">
          <thead>
            <tr>
              <th>Preview</th>
              <th>Picture</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((p) => (
              <tr key={p.key}>
                <td>
                  {p.src ? <img src={p.src} alt="" className="table-thumb" /> : <span className="note">No image</span>}
                </td>
                <td>
                  <b>{p.label}</b><br />
                  <small>{p.key}</small>
                </td>
                <td>
                  <p className="row-actions">
                    <Link className="btn btn-ghost" to={`/app/photos/${encodeURIComponent(p.key)}`}>Edit</Link>
                    <button className="btn btn-danger" type="button" onClick={() => remove(p)}>Delete</button>
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {rows.length === 0 && <p className="empty-panel">No pictures in this view.</p>}
      </div>
    </>
  );
}
