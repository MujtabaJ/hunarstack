import { Link } from "react-router-dom";
import Seo from "../components/market/Seo";
import { IMAGES } from "../data/marketing/images";
import { FOUNDER, FOUNDER_PROOF, JOURNEY, JOURNEY_SCENES, PLATFORMS, PROPOSAL_FLOW, SITE } from "../data/site";

export default function Journey() {
  return (
    <>
      <Seo
        title="My Freelancing Journey | HunarStack"
        description="Ghulam Mujtaba’s path from learning skills in Sindh to working with international clients — and why HunarStack teaches that process."
        path="/journey"
      />
      <header className="hs-hero-mini">
        <div className="hs-wrap">
          <p className="hs-crumbs"><Link to="/">Home</Link> <span>/</span> <span>Freelancing Journey</span></p>
          <p className="hs-kicker">My Freelancing Journey</p>
          <h1>From a Small City to Global Opportunities</h1>
          <p className="hs-lead">HunarStack was built from real software and freelancing work. This page shows the process: learn a skill, build projects, understand platforms, and look for opportunities. The numbers are his. They are not a promise for you.</p>
        </div>
      </header>
      <main id="main" className="hs-page">
        <div className="hs-wrap" style={{ display: "grid", gap: 28 }}>
          <section className="hs-founder">
            <figure className="hs-founder-photo">
              <img src={IMAGES.founderStanding} alt="Ghulam Mujtaba, founder of HunarStack" width="800" height="1400" />
            </figure>
            <div className="hs-founder-copy">
              <p className="hs-kicker">See the process</p>
              <h2>{FOUNDER.name}</h2>
              <p>Learn from someone who has actually worked with international clients. He is a {FOUNDER.role.toLowerCase()}, with a Computer Science background from the University of Sindh and more than ten years of professional software development.</p>
              <p>Skills become projects. Projects become a portfolio. A portfolio creates a chance to talk to a client. That is the path below. It is a map, not a guarantee that the same numbers will follow.</p>
              <div className="hs-chips">{FOUNDER.skills.map((s) => <span className="hs-chip" key={s}>{s}</span>)}</div>
              <div className="hs-actions" style={{ marginTop: 16 }}>
                <Link className="hs-btn hs-btn-primary" to="/enrol">Enroll Now →</Link>
                <Link className="hs-btn hs-btn-ghost" to="/courses?category=freelancing">Freelancing courses</Link>
              </div>
            </div>
          </section>

          <section className="hs-proof" aria-label="Ghulam Mujtaba’s verified record">
            {FOUNDER_PROOF.map(([value, label]) => (
              <div key={label}><b>{value}</b><span>{label}</span></div>
            ))}
          </section>

          <section>
            <h2>The path</h2>
            <ol className="hs-timeline">
              {JOURNEY.map((step) => (
                <li key={step.n}>
                  <b>{step.n}</b>
                  <article className="hs-card">
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>
                  </article>
                </li>
              ))}
            </ol>
          </section>

          <section>
            <p className="hs-note">Illustrative Journey</p>
            <h2>Pictures of the story</h2>
            <p>Each picture walks through one part of Ghulam Mujtaba’s path. The founder’s verified record is the list above. The platform screens in these pictures are illustrated, not official Upwork, Freelancer, or Payoneer screenshots.</p>
            <div className="hs-grid-2">
              {JOURNEY_SCENES.map((scene) => (
                <figure className="hs-card" key={scene.id} style={{ padding: 10 }}>
                  <img src={IMAGES[scene.image]} alt={scene.alt} loading="lazy" style={{ width: "100%", borderRadius: 16, maxHeight: 280, objectFit: "cover" }} />
                  <figcaption style={{ padding: 8 }}><b>{scene.title}</b> · Illustrative Journey</figcaption>
                  <p style={{ padding: "0 8px 8px" }}>{scene.text}</p>
                </figure>
              ))}
            </div>
          </section>

          <section>
            <h2>From proposal to payment</h2>
            <ol className="hs-flow hs-flow-wide">
              {PROPOSAL_FLOW.map((step, i) => <li key={step}><i>{String(i + 1).padStart(2, "0")}</i>{step}</li>)}
            </ol>
          </section>

          <section>
            <h2>Platforms to prepare for</h2>
            <div className="hs-grid-3">
              {PLATFORMS.map((p) => (
                <article className="hs-card" key={p.id}>
                  <h3>{p.name}</h3>
                  <p><b>What it is.</b> {p.what}</p>
                  <p><b>Who it helps.</b> {p.who}</p>
                  <p><b>Skills.</b> {p.skills}</p>
                  <p><b>How to prepare.</b> {p.prepare}</p>
                  <Link to={p.href}>How students can prepare →</Link>
                </article>
              ))}
            </div>
          </section>

          <div className="hs-final">
            <h2>Walk the path with guidance.</h2>
            <p>Learn today. Build tomorrow. Earn online only when your skill and the market meet — never because a page promised it.</p>
            <div className="hs-actions">
              <Link className="hs-btn hs-btn-gold" to="/enrol">Enroll Now →</Link>
              <a className="hs-btn hs-btn-light" href={SITE.whatsapp}>Talk on WhatsApp</a>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
