import { NavLink, Outlet, Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useData } from "../context/DataContext";
import { useReveal } from "../hooks/useReveal";

const NAV = {
  student: [
    ["/app", "Dashboard"],
    ["/app/learn", "Learn"],
    ["/app/projects", "Projects"],
    ["/app/freelance", "Freelance kit"],
    ["/app/applications", "Applications"],
    ["/app/fees", "Fees"],
    ["/app/profile", "Profile"],
  ],
  instructor: [
    ["/app", "Classroom"],
    ["/app/reviews", "Reviews"],
    ["/app/profile", "Profile"],
  ],
  admin: [
    ["/app", "Dashboard"],
    ["/app/learn", "Learn"],
    ["/app/site", "Homepage"],
    ["/app/photos", "Pictures"],
    ["/app/catalog", "Courses"],
    ["/app/fees", "Fees"],
    ["/app/users", "Users"],
    ["/app/applications", "Applications"],
    ["/app/reviews", "Reviews"],
    ["/app/inbox", "Inbox"],
    ["/app/profile", "Profile"],
  ],
};

export default function AppShell() {
  const { user, logout } = useAuth();
  const { unread, pendingCount, newMessageCount, myApplications, dueFees, invoices, reviewCount } = useData();
  const loc = useLocation();
  useReveal(loc.pathname);
  const links = NAV[user.role] || NAV.student;
  const myPending = myApplications.filter((a) => a.status === "pending").length;

  function badge(to, label) {
    if (label === "Dashboard" && unread) return unread;
    if (label === "Fees" && user.role === "admin") {
      return invoices.filter((i) => i.status === "due" || i.status === "partial").length;
    }
    if (label === "Fees" && dueFees) return 1;
    if (label === "Applications" && user.role === "admin" && pendingCount) return pendingCount;
    if (label === "Applications" && user.role === "student" && myPending) return myPending;
    if (label === "Inbox" && newMessageCount) return newMessageCount;
    if (label === "Reviews" && reviewCount) return reviewCount;
    return 0;
  }

  return (
    <div className="app-shell">
      <aside className="side">
        <Link className="logo" to="/">
          <img src="/logo-mark.svg" width="32" height="32" alt="" />
          hunar<b>stack</b>
        </Link>
        <div className="side-user">
          <strong>{user.name}</strong>
          <div className={`role-pill ${user.role}`}>{user.role}</div>
        </div>
        <nav>
          {links.map(([to, label]) => {
            const count = badge(to, label);
            return (
              <NavLink key={to} to={to} end={to === "/app"}>
                <span>{label}</span>
                {count ? <span className="nav-badge">{count}</span> : null}
              </NavLink>
            );
          })}
        </nav>
        <div className="grow">
          <Link to="/courses">Browse courses</Link>
          {user.role === "student" && <Link to="/enrol">Apply for a seat</Link>}
          <button className="linkish" type="button" onClick={logout}>
            Log out
          </button>
        </div>
      </aside>
      <div className="dash">
        {loc.pathname !== "/app" && (
          <Link className="dash-back" to="/app">← Back to dashboard</Link>
        )}
        <Outlet />
      </div>
    </div>
  );
}
