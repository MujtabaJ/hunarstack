import { Link } from "react-router-dom";

export default function Crumbs({ items }) {
  return (
    <nav className="crumbs" aria-label="Breadcrumb">
      {items.filter(Boolean).map((c, i) => (
        <span key={`${c.label}-${i}`}>
          {i > 0 && <i aria-hidden="true">›</i>}
          {c.to ? <Link to={c.to}>{c.label}</Link> : <b>{c.label}</b>}
        </span>
      ))}
    </nav>
  );
}

export function Trail({ backTo, backLabel = "Back", extra }) {
  return (
    <div className="trail">
      {backTo && <Link className="btn btn-ghost" to={backTo}>{backLabel}</Link>}
      {extra}
    </div>
  );
}
