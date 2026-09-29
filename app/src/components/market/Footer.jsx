import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { FOOTER_COURSES, NAV, SITE, SOCIAL } from "../../data/site";

export default function Footer() {
  const { user } = useAuth();
  return (
    <footer className="hs-footer">
      <div className="hs-wrap hs-foot-grid">
        <div>
          <p className="hs-word">Hunar<span>Stack</span></p>
          <p>{SITE.tagline}</p>
          <p>A practical technology and freelancing academy in Jamshoro. We teach skills, projects and professional habits. We do not promise clients or income.</p>
          <p className="hs-actions">
            {SOCIAL.map((s) => (
              <a key={s.id} href={s.href}>{s.label}</a>
            ))}
          </p>
        </div>
        <div>
          <h3>Quick Links</h3>
          <ul>
            {NAV.map((item) => (
              <li key={item.to}><Link to={item.to}>{item.label}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h3>Courses</h3>
          <ul>
            {FOOTER_COURSES.map((item) => (
              <li key={item.label}><Link to={item.to}>{item.label}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h3>Contact</h3>
          <ul>
            <li>{SITE.address}</li>
            <li><a href={`tel:${SITE.phoneTel}`}>{SITE.phone}</a></li>
            <li><a href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
            <li><a href={SITE.whatsapp}>WhatsApp</a></li>
            <li><Link to="/privacy">Privacy</Link></li>
            <li><Link to="/terms">Terms</Link></li>
            <li>{user ? <Link to="/app">Dashboard</Link> : <Link to="/login">Log in</Link>}</li>
            {!user && <li><Link to="/register">Create account</Link></li>}
          </ul>
        </div>
      </div>
      <div className="hs-wrap hs-foot-copy">© HunarStack — Learn · Build · Earn</div>
    </footer>
  );
}
