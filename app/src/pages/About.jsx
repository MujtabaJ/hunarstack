import { Link } from "react-router-dom";
import Seo from "../components/market/Seo";
import { IMAGES } from "../data/marketing/images";
import { FOUNDER, SITE } from "../data/site";

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
          <h1>Learn skills. Build projects. Earn online.</h1>
          <p className="hs-lead">HunarStack is a modern technology and freelancing academy in Jamshoro. It is not a traditional tuition centre. Students learn by making things.</p>
        </div>
      </header>
      <main id="main" className="hs-page">
        <div className="hs-wrap" style={{ display: "grid", gap: 22 }}>
          <section className="hs-split">
            <img src={IMAGES.founder} alt="Ghulam Mujtaba, founder of HunarStack" />
            <div>
              <h2>{FOUNDER.name}</h2>
              <p>Founder. Software engineer and experienced mobile application developer. Computer Science background from the University of Sindh, with more than ten years of professional software development.</p>
              <p>Top Rated on Upwork. 100% Job Success. $20K+ in his own freelancing earnings. 17 Upwork jobs. 781 hours. 70+ apps delivered for international clients, across iOS, Android, Flutter, React Native, AI/ML, Firebase, APIs, AWS, App Store, Google Play and RevenueCat.</p>
              <p>Learn from someone who has actually worked with international clients. Those numbers describe his career. They are not a forecast for students.</p>
              <Link className="hs-btn hs-btn-primary" to="/journey">Read My Freelancing Journey →</Link>
            </div>
          </section>
          <section className="hs-grid-3">
            <article className="hs-card"><h3>Beginners</h3><p>You can start without a technical background. Curiosity and steady practice are enough.</p></article>
            <article className="hs-card"><h3>Already technical</h3><p>If you already code or design, use the time for portfolio projects, freelancing workflows and AI tools.</p></article>
            <article className="hs-card"><h3>Jamshoro</h3><p>{SITE.address}. Visit the academy, or start on WhatsApp.</p></article>
          </section>
          <section className="hs-prose">
            <h2>What the name means</h2>
            <p><b>Hunar</b> means skill. A stack is how modern software is built. Together they describe the academy: useful skill, applied with current tools, aimed at real projects.</p>
            <h2>What we will not say</h2>
            <p>We do not promise clients, jobs, views or income. We teach you to learn, build, practise, create a portfolio, understand platforms and look for opportunities.</p>
          </section>
          <div className="hs-actions">
            <Link className="hs-btn hs-btn-primary" to="/enrol">Enroll Now →</Link>
            <Link className="hs-btn hs-btn-ghost" to="/contact">Book a Visit</Link>
            <a className="hs-btn hs-btn-green" href={SITE.whatsapp}>Talk on WhatsApp</a>
          </div>
        </div>
      </main>
    </>
  );
}
