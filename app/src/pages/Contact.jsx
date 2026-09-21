import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PageHero } from "../components/CourseCard";
import { useData } from "../context/DataContext";
import { useAuth } from "../context/AuthContext";

export default function Contact() {
  const { sendMessage, site } = useData();
  const { user } = useAuth();
  const nav = useNavigate();
  const [error, setError] = useState("");

  function onSubmit(e) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    if (!data.name || !data.email || !data.message) {
      setError("Please complete the required fields.");
      return;
    }
    sendMessage(data);
    nav("/thanks?kind=contact");
  }

  return (
    <>
      <PageHero
        kicker="We’re here"
        title="Contact us"
        text="Ask about a course, a project or a partnership. Messages land in the academy inbox. If you already know which skill you want, apply for a seat instead."
      />
      <main id="main">
        <div className="wrap">
          <div className="grid auto-grid" style={{ marginBottom: 26 }}>
            <div className="card"><h3>Email</h3><p><a href={`mailto:${site.contact?.email || "hello@hunarstack.com"}`}>{site.contact?.email || "hello@hunarstack.com"}</a></p></div>
            <div className="card"><h3>WhatsApp</h3><p>{site.contact?.phone || "Add a number in Homepage → Academy contact"}</p></div>
            <div className="card"><h3>Office</h3><p>{site.contact?.address || "Add an address in the admin CMS"}</p></div>
            <div className="card"><h3>Hours</h3><p>{site.contact?.hours || "Set hours in the admin CMS"}</p></div>
          </div>
          <div className="narrow">
            {error && <p className="form-error">{error}</p>}
            <form onSubmit={onSubmit}>
              <div className="g2">
                <label>Your name<input name="name" defaultValue={user?.name || ""} required /></label>
                <label>Email<input name="email" type="email" defaultValue={user?.email || ""} required /></label>
                <label>Phone or WhatsApp (optional)<input name="phone" /></label>
                <label>Topic
                  <select name="topic" required defaultValue="">
                    <option value="">Choose one</option>
                    <option>Course question</option>
                    <option>Software project</option>
                    <option>Partnership</option>
                    <option>Teaching or careers</option>
                    <option>Other</option>
                  </select>
                </label>
              </div>
              <label>Message<textarea name="message" required /></label>
              <label className="chk"><input type="checkbox" name="consent" required /> <span>I agree that HunarStack may contact me about this message.</span></label>
              <button className="btn btn-main" type="submit">Send message</button>
            </form>
            <p className="note">Prefer to join a class? <Link to="/enrol">Apply for a seat</Link>.</p>
          </div>
        </div>
      </main>
    </>
  );
}
