import { Link } from "react-router-dom";
import { useData } from "../context/DataContext";

export default function Footer() {
  const { site } = useData();
  const email = site?.contact?.email || "hello@hunarstack.com";

  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="foot-grid">
          <div>
            <Link className="logo" to="/">
              <img src="/logo-mark.svg" width="38" height="38" alt="" />
              hunar<b>stack</b>
            </Link>
            <p style={{ marginTop: 12 }}>Learn. Build. Freelance. Earn.</p>
            <p>Your skills can take you further.</p>
          </div>
          <div>
            <h3>Learn</h3>
            <ul>
              <li><Link to="/courses">Courses</Link></li>
              <li><Link to="/syllabi">Syllabi</Link></li>
              <li><Link to="/enrol">Apply for a seat</Link></li>
              <li><Link to="/register">Create account</Link></li>
            </ul>
          </div>
          <div>
            <h3>HunarStack</h3>
            <ul>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><a href={`mailto:${email}`}>{email}</a></li>
              {site?.contact?.phone ? <li>{site.contact.phone}</li> : null}
              {site?.contact?.hours ? <li>{site.contact.hours}</li> : null}
            </ul>
          </div>
          <div>
            <h3>Legal</h3>
            <ul>
              <li><Link to="/privacy">Privacy Policy</Link></li>
              <li><Link to="/terms">Terms and Conditions</Link></li>
              <li><Link to="/login">Student login</Link></li>
            </ul>
          </div>
        </div>
        <div className="foot-copy">
          <span>© HunarStack. Learn skills. Build your future.</span>
          <span>Story photos from Unsplash. No guaranteed income, clients or jobs—only a practical path.</span>
        </div>
      </div>
    </footer>
  );
}
