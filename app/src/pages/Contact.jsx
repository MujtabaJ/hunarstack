import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Seo from "../components/market/Seo";
import AcademyMap from "../components/market/AcademyMap";
import { useData } from "../context/DataContext";
import { COURSES } from "../data/courses";
import { SITE } from "../data/site";

export default function Contact() {
  const { sendMessage } = useData();
  const nav = useNavigate();
  const [error, setError] = useState("");

  function onSubmit(e) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    if (!data.name || !data.email || !data.message) {
      setError("Please add your name, email and message.");
      return;
    }
    sendMessage({
      name: data.name,
      email: data.email,
      phone: data.phone,
      topic: data.course || "General",
      message: data.message,
    });
    nav("/thanks?kind=contact");
  }

  return (
    <>
      <Seo title="Contact HunarStack Jamshoro" description="Visit HunarStack at A-132 Phase 1, Society, Jamshoro, or message gm@hunarstack.com and 0300 3740708." path="/contact" />
      <header className="hs-hero-mini">
        <div className="hs-wrap">
          <p className="hs-crumbs"><Link to="/">Home</Link> <span>/</span> <span>Contact</span></p>
          <p className="hs-kicker">Contact</p>
          <h1>Visit HunarStack in Jamshoro.</h1>
        </div>
      </header>
      <main id="main" className="hs-page">
        <div className="hs-wrap" style={{ display: "grid", gap: 16 }}>
        <div className="hs-visit">
          <div>
            <h2>HunarStack</h2>
            <p>{SITE.address}</p>
            <p><a href={`tel:${SITE.phoneTel}`}>{SITE.phone}</a></p>
            <p><a href={`mailto:${SITE.email}`}>{SITE.email}</a></p>
            <p>{SITE.hours}</p>
            <div className="hs-actions">
              <a className="hs-btn hs-btn-green" href={SITE.whatsapp}>WhatsApp Us</a>
              <a className="hs-btn hs-btn-ghost" href={SITE.maps} target="_blank" rel="noreferrer">Get Directions</a>
            </div>
          </div>
          <form className="hs-form hs-card" onSubmit={onSubmit}>
            {error && <p className="hs-error">{error}</p>}
            <label>Name<input name="name" required autoComplete="name" /></label>
            <div className="row">
              <label>Phone<input name="phone" type="tel" autoComplete="tel" required /></label>
              <label>Email<input name="email" type="email" autoComplete="email" required /></label>
            </div>
            <label>Course interested in
              <select name="course" defaultValue="">
                <option value="">Choose a course</option>
                {COURSES.map((c) => <option key={c.slug} value={c.title}>{c.title}</option>)}
              </select>
            </label>
            <label>Message<textarea name="message" required /></label>
            <button className="hs-btn hs-btn-primary" type="submit">Send Message</button>
          </form>
        </div>
        <AcademyMap />
        </div>
      </main>
    </>
  );
}
