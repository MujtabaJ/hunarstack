import { useEffect, useMemo, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { IMAGES } from "../../data/marketing/images";
import { NAV, SITE } from "../../data/site";
import { searchCourses } from "../../data/courses";

export default function Header() {
  const { user, logout } = useAuth();
  const loc = useLocation();
  const nav = useNavigate();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState(false);
  const [q, setQ] = useState("");

  useEffect(() => {
    setOpen(false);
    setSearch(false);
    document.body.classList.remove("nav-open");
  }, [loc.pathname]);

  const hits = useMemo(() => (q.trim() ? searchCourses(q).slice(0, 8) : []), [q]);

  function toggle() {
    setOpen((v) => {
      document.body.classList.toggle("nav-open", !v);
      return !v;
    });
  }

  function onSearch(e) {
    e.preventDefault();
    const query = new FormData(e.target).get("q");
    setSearch(false);
    nav(`/courses?q=${encodeURIComponent(query || "")}`);
  }

  return (
    <header className="hs-header">
      <div className="hs-bar">
        <Link className="hs-logo" to="/" aria-label="HunarStack home">
          <img src={IMAGES.logo} alt="HunarStack — Learn · Build · Earn" />
        </Link>
        <nav id="nav" className={open ? "hs-nav is-open" : "hs-nav"} aria-label="Main">
          {NAV.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.to === "/"}>
              {item.label}
            </NavLink>
          ))}
          {user ? (
            <NavLink to="/app">Dashboard</NavLink>
          ) : (
            <NavLink to="/login">Log in</NavLink>
          )}
          {user ? (
            <button className="hs-btn hs-btn-ghost hs-menu-account" type="button" onClick={logout}>Log out</button>
          ) : (
            <Link className="hs-btn hs-btn-primary hs-mobile-cta" to="/enrol">Enroll Now</Link>
          )}
        </nav>
        <div className="hs-tools">
          <button className="hs-icon" type="button" aria-label="Search courses" onClick={() => setSearch(true)}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
              <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
          <a className="hs-wa-link" href={SITE.whatsapp}>WhatsApp</a>
          {user ? (
            <>
              <Link className="hs-btn hs-btn-primary" to="/app">Dashboard</Link>
              <button className="hs-btn hs-btn-ghost hs-logout" type="button" onClick={logout}>Log out</button>
            </>
          ) : (
            <>
              <Link className="hs-btn hs-btn-ghost hs-login" to="/login">Log in</Link>
              <Link className="hs-btn hs-btn-primary" to="/enrol">Enroll Now</Link>
            </>
          )}
          <button className="hs-icon hs-burger" type="button" aria-expanded={open} aria-controls="nav" aria-label={open ? "Close menu" : "Open menu"} onClick={toggle}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>
      {search && (
        <div className="hs-search" role="dialog" aria-modal="true" aria-label="Search courses">
          <form onSubmit={onSearch}>
            <label htmlFor="course-search">Search courses</label>
            <input id="course-search" name="q" value={q} onChange={(e) => setQ(e.target.value)} autoFocus placeholder="Try Upwork, Flutter, AI…" />
            <div className="hs-actions" style={{ marginTop: 10 }}>
              <button className="hs-btn hs-btn-primary" type="submit">Search</button>
              <button className="hs-btn hs-btn-ghost" type="button" onClick={() => setSearch(false)}>Close</button>
            </div>
            {hits.length > 0 && (
              <ul>
                {hits.map((c) => (
                  <li key={c.slug}><Link to={`/courses/${c.slug}`} onClick={() => setSearch(false)}>{c.title}</Link></li>
                ))}
              </ul>
            )}
          </form>
        </div>
      )}
    </header>
  );
}
