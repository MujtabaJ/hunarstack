import { NavLink, Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const LINKS = [
  ["/", "Home"],
  ["/courses", "Courses"],
  ["/syllabi", "Syllabi"],
  ["/about", "About"],
  ["/contact", "Contact"],
];

export default function Header() {
  const { user, logout } = useAuth();
  const loc = useLocation();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
    document.body.classList.remove("nav-open");
  }, [loc.pathname]);

  function toggle() {
    setOpen((v) => {
      document.body.classList.toggle("nav-open", !v);
      return !v;
    });
  }

  return (
    <header className="site-header">
      <div className="wrap bar">
        <Link className="logo" to="/">
          <img src="/logo-mark.svg" width="38" height="38" alt="" />
          hunar<b>stack</b>
        </Link>
        <button
          className="nav-toggle"
          type="button"
          aria-expanded={open}
          aria-controls="nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={toggle}
        >
          <span></span>
        </button>
        <nav id="nav" className={open ? "is-open" : ""} aria-label="Main">
          {LINKS.map(([to, label]) => (
            <NavLink key={to} to={to} end={to === "/"}>
              {label}
            </NavLink>
          ))}
          {user ? (
            <>
              <NavLink to="/app">Dashboard</NavLink>
              <NavLink to="/enrol">Apply</NavLink>
              <button className="btn btn-ghost" type="button" onClick={logout}>
                Log out
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login">Log in</NavLink>
              <NavLink className="btn btn-main" to="/enrol">
                Start Learning
              </NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
