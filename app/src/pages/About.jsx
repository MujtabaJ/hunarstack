import { Link } from "react-router-dom";
import { PageHero } from "../components/CourseCard";

export default function About() {
  return (
    <>
      <PageHero
        kicker="About us"
        title="Learn skills. Build your future."
        text="HunarStack is a tech academy and a software house. We train students in practical digital skills, and we build web, mobile and AI products for clients. Students learn on the same standards we use for that work. Your skills can take you further—without a guaranteed job at the end."
      />
      <main id="main">
        <div className="wrap narrow">
          <h2>Our name</h2>
          <div className="meaning" style={{ margin: "16px 0 24px" }}>
            <div className="u">هنر</div>
            <p><b>Hunar</b> (هنر) means skill and craftsmanship in Urdu. A <b>stack</b> is what developers build with. Together they describe what we believe: real skill, applied with modern technology, can open doors anywhere in the world.</p>
          </div>
          <h2>Our mission</h2>
          <p>To give people a clear path from learning to earning—learn a skill, build something real, create a portfolio, understand freelancing, and pursue opportunities. For clients, to deliver dependable software built by well-trained teams.</p>
          <p>We do not guarantee jobs, clients or income. We promise a practical pathway and honest teaching.</p>
          <h2>What we do</h2>
          <div className="grid auto-grid">
            <div className="card"><h3>Academy</h3><p>Practical skill tracks, plus separate courses for earning on digital platforms—using AI as an assistant, not a shortcut that skips the work.</p></div>
            <div className="card"><h3>Real projects</h3><p>Students practise on live briefs. The best graduates may join client work—never automatically.</p></div>
            <div className="card"><h3>Software house</h3><p>AI solutions, web and mobile apps, and dedicated developers for international clients.</p></div>
          </div>
          <h2>What we value</h2>
          <ul>
            <li><b>Skill first.</b> We teach what is used in real work, not only theory.</li>
            <li><b>Clarity.</b> Written scopes, honest timelines and plain language.</li>
            <li><b>Craft.</b> Clean code and careful design, every time.</li>
            <li><b>Opportunity.</b> We measure success by what our students and clients achieve—not by slogans.</li>
          </ul>
          <p className="btns">
            <Link className="btn btn-main" to="/enrol">Apply to study</Link>
            <Link className="btn btn-ghost" to="/contact">Start a project</Link>
          </p>
        </div>
      </main>
    </>
  );
}
