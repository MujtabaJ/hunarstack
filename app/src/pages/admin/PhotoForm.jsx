import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import ImageField from "../../components/ImageField";
import { useData } from "../../context/DataContext";

export default function PhotoForm() {
  const { key } = useParams();
  const decoded = decodeURIComponent(key || "");
  const nav = useNavigate();
  const { photos, setPhoto, deletePhoto } = useData();
  const existing = photos.find((p) => p.key === decoded);
  const [src, setSrc] = useState("");
  const [alt, setAlt] = useState("");
  const [ok, setOk] = useState("");

  useEffect(() => {
    if (existing) {
      setSrc(existing.src || "");
      setAlt(existing.alt || "");
    }
  }, [existing]);

  if (!existing) return <Navigate to="/app/photos" replace />;

  function onSubmit(e) {
    e.preventDefault();
    setPhoto(existing.key, src, alt);
    setOk("Saved.");
  }

  function remove() {
    if (!confirm(`Remove “${existing.label}”?`)) return;
    deletePhoto(existing.key);
    nav("/app/photos");
  }

  return (
    <>
      <div className="dash-top">
        <div>
          <p className="kicker">CMS</p>
          <h1>Edit {existing.label}</h1>
          <p>Upload a file or paste a URL. Keep files small in this browser demo.</p>
        </div>
        <Link className="btn btn-ghost" to="/app/photos">All pictures</Link>
      </div>
      {ok && <p className="form-ok">{ok}</p>}
      <form className="panel" onSubmit={onSubmit}>
        <ImageField label="Photo" value={src} alt={alt} onChange={setSrc} onAlt={setAlt} />
        <p className="btns">
          <button className="btn btn-main" type="submit">Save changes</button>
          <button className="btn btn-danger" type="button" onClick={remove}>Delete picture</button>
        </p>
      </form>
    </>
  );
}
