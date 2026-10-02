import { Link } from "react-router-dom";
import Seo from "../components/market/Seo";
import { IMAGES } from "../data/marketing/images";
import { FOUNDER, FOUNDER_PROOF, SITE, waLink } from "../data/site";

export default function About() {
  return (
    <>
      <Seo
        title="About HunarStack | Jamshoro"
        description="HunarStack is a practical technology and freelancing academy in Jamshoro, founded by software engineer Ghulam Mujtaba."
        path="/about"
      />
      <header className="hs-hero-mini">
        <div className="hs-wrap">
          <p className="hs-crumbs"><Link to="/">Home</Link> <span>/</span> <span>About</span></p>
          <p className="hs-kicker">About</p>
          <h1>A skill academy for people who want to build.</h1>
          <p className="hs-lead">HunarStack teaches programming, AI, design and freelancing in Jamshoro. Students practise on real projects, then learn how profiles, proposals and client conversations work. The work is the point — not a lecture, and not a promise of income.</p>
        </div>
      </header>
      <main id="main" className="hs-page">
        <div className="hs-wrap" style={{ display: "grid", gap: 28 }}>
          <section className="hs-founder">
            <figure className="hs-founder-photo">
              <img src={IMAGES.founderStanding2} alt="Ghulam Mujtaba, founder of HunarStack" width="800" height="1400" />
            </figure>
            <div className="hs-founder-copy">
              <p className="hs-kicker">The founder</p>
              <h2>{FOUNDER.name}</h2>
              <p>Learn from someone who has actually worked with international clients. He is a {FOUNDER.role.toLowerCase()}, with a Computer Science background from the University of Sindh and more than ten years of professional software development.</p>
              <p>Top Rated on Upwork. 100% Job Success. $20K+ in his own freelancing earnings. 17 Upwork jobs, 781 hours, and 70+ apps for international clients. Those numbers describe his career. They are not a forecast for students.</p>
              <div className="hs-chips">{FOUNDER.skills.map((skill) => <span className="hs-chip" key={skill}>{skill}</span>)}</div>
              <div className="hs-actions" style={{ marginTop: 16 }}>
                <Link className="hs-btn hs-btn-primary" to="/journey">Read My Freelancing Journey →</Link>
                <a className="hs-btn hs-btn-green" href={waLink("Hi HunarStack, I would like to know more about the academy.")}>Talk on WhatsApp</a>
              </div>
            </div>
          </section>

          <section className="hs-proof" aria-label="Founder record">
            {FOUNDER_PROOF.map(([value, label]) => (
              <div key={label}><b>{value}</b><span>{label}</span></div>
            ))}
          </section>

          <section>
            <div className="hs-head">
              <div>
                <p className="hs-kicker">How we teach</p>
                <h2>Learn. Build. Earn — in that order.</h2>
              </div>
            </div>
            <div className="hs-grid-3">
              <article className="hs-card"><h3>Learn</h3><p>Programming, AI, design and freelancing, taught through practice. Beginners start with one skill. People who already code go deeper.</p></article>
              <article className="hs-card"><h3>Build</h3><p>Lessons turn into projects you can open and show: apps, sites, designs and a portfolio that matches the work.</p></article>
              <article className="hs-card"><h3>Earn</h3><p>Profiles, proposals, client calls and platforms such as Upwork and Fiverr. Opportunity comes after the skill. Income is never guaranteed.</p></article>
            </div>
          </section>

          <section>
            <div className="hs-head">
              <div>
                <p className="hs-kicker">Who it is for</p>
                <h2>Start from where you are.</h2>
                <p>Girls and women are welcome. Separate female instructor support can be available.</p>
              </div>
            </div>
            <div className="hs-grid-3">
              <article className="hs-card"><h3>Beginners</h3><p>You can start without a technical background. Curiosity and steady practice are enough.</p></article>
              <article className="hs-card"><h3>Already technical</h3><p>If you already code or design, use the time for portfolio projects, freelancing workflows and AI tools.</p></article>
              <article className="hs-card"><h3>Jamshoro</h3><p>{SITE.address}. Visit the academy, or start the conversation on WhatsApp.</p></article>
            </div>
          </section>

          <section className="hs-grid-2">
            <article className="hs-card">
              <h2>What the name means</h2>
              <p><b>Hunar</b> means skill. A stack is how modern software is built. Together they describe the academy: a useful skill, practised with current tools, aimed at a project you can show.</p>
            </article>
            <article className="hs-card">
              <h2>What we will not say</h2>
              <p>We do not promise clients, jobs, views or income. We teach you to learn, build, create a portfolio, understand platforms and look for opportunities.</p>
            </article>
          </section>

          <div className="hs-final">
            <h2>Come and see the work.</h2>
            <p>{SITE.address}</p>
            <div className="hs-actions">
              <Link className="hs-btn hs-btn-gold" to="/enrol">Enroll Now →</Link>
              <Link className="hs-btn hs-btn-light" to="/contact">Book a Visit</Link>
              <a className="hs-btn hs-btn-light" href={SITE.whatsapp}>Talk on WhatsApp</a>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
