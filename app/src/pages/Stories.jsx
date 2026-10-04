import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Seo from "../components/market/Seo";
import { TESTIMONIALS } from "../data/testimonials";
import { useData } from "../context/DataContext";
import { COURSES } from "../data/courses";

export default function Stories() {
  const { sendMessage } = useData();
  const nav = useNavigate();
  const [error, setError] = useState("");

  function onSubmit(e) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    if (!data.name || !data.message) {
      setError("Please add your name and story.");
      return;
    }
    sendMessage({
      name: data.name,
      email: data.email || "story@hunarstack.local",
      phone: data.city,
      topic: "Student story",
      message: `${data.course} — ${data.city}\nBefore: ${data.before}\nAfter: ${data.after}\nProject: ${data.project}\n\n${data.message}`,
    });
    nav("/thanks?kind=contact");
  }

  return (
    <>
      <Seo
        title="Classroom Stories | HunarStack"
        description="Classroom samples for Sara Ali, Hassan Raza and Amina Khan. These follow the demo class records and are not published testimonials."
        path="/stories"
      />
      <header className="hs-hero-mini">
        <div className="hs-wrap">
          <p className="hs-crumbs"><Link to="/">Home</Link> <span>/</span> <span>Success Stories</span></p>
          <p className="hs-kicker">Classroom stories</p>
          <h1>Sara, Hassan and Amina.</h1>
          <p className="hs-lead">These three cards follow the demo class. Sara is enrolled. Hassan has applied and is waiting for a seat. Amina teaches Web and UI/UX and reviews the practice work. They are classroom samples, not published testimonials.</p>
        </div>
      </header>
      <main id="main" className="hs-page">
        <div className="hs-wrap" style={{ display: "grid", gap: 22 }}>
          <div className="hs-grid-3">
            {TESTIMONIALS.map((t) => (
              <article className={`hs-card hs-quote${t.sample ? " is-sample" : ""}`} key={t.id}>
                <div className="hs-story-mark" aria-hidden="true">{t.name.split(" ").map((part) => part[0]).join("")}</div>
                <p className="hs-kicker">{t.role}</p>
                <blockquote>“{t.quote}”</blockquote>
                <p><b>Name:</b> {t.name}</p>
                <p><b>City:</b> {t.city}</p>
                <p><b>Course:</b> {t.course}</p>
                <p><b>Before:</b> {t.before}</p>
                <p><b>After:</b> {t.after}</p>
                <p><b>Project:</b> {t.project}</p>
                {t.sample && <p className="hs-ph">Classroom sample. Not a published testimonial.</p>}
              </article>
            ))}
          </div>
          <section className="hs-card" id="submit">
            <h2>Submit Your Story</h2>
            <p>Share what you learned and what you built. We will only publish it with your permission.</p>
            {error && <p className="hs-error">{error}</p>}
            <form className="hs-form" onSubmit={onSubmit}>
              <div className="row">
                <label>Name<input name="name" required /></label>
                <label>Email<input name="email" type="email" required /></label>
                <label>City<input name="city" /></label>
                <label>Course
                  <select name="course" defaultValue={COURSES[0].title}>
                    {COURSES.map((c) => <option key={c.slug}>{c.title}</option>)}
                  </select>
                </label>
              </div>
              <label>Before<textarea name="before" /></label>
              <label>After<textarea name="after" /></label>
              <label>Project<textarea name="project" /></label>
              <label>Your words<textarea name="message" required /></label>
              <button className="hs-btn hs-btn-primary" type="submit">Submit Your Story</button>
            </form>
          </section>
        </div>
      </main>
    </>
  );
}
