import { useRef, useState } from "react";
import { fileToDataUrl } from "../lib/media";

export default function ImageField({ label, value, alt, onChange, onAlt }) {
  const input = useRef(null);
  const [err, setErr] = useState("");

  async function onFile(e) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    try {
      setErr("");
      onChange(await fileToDataUrl(file));
    } catch (ex) {
      setErr(ex.message);
    }
  }

  return (
    <div className="img-field">
      {label && <p><b>{label}</b></p>}
      {value ? <img src={value} alt="" className="img-preview" /> : null}
      <label>
        Image URL
        <input
          value={value?.startsWith("data:") ? "" : value || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={value?.startsWith("data:") ? "Uploaded file is saved in this browser" : "/photos/… or https://…"}
        />
      </label>
      <p className="btns">
        <button className="btn btn-ghost" type="button" onClick={() => input.current?.click()}>Upload photo</button>
        {value ? <button className="btn btn-ghost" type="button" onClick={() => onChange("")}>Remove</button> : null}
      </p>
      <input ref={input} type="file" accept="image/*" hidden onChange={onFile} />
      {onAlt ? <label>Alt text<input value={alt || ""} onChange={(e) => onAlt(e.target.value)} /></label> : null}
      {err ? <p className="form-error">{err}</p> : null}
    </div>
  );
}
