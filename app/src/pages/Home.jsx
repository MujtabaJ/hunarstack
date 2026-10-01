import { Link } from "react-router-dom";
import Seo from "../components/market/Seo";
import AcademyMap from "../components/market/AcademyMap";
import CourseCard from "../components/market/CourseCard";
import FaqList from "../components/market/FaqList";
import { FEATURED, CATEGORIES } from "../data/courses";
import { TESTIMONIALS } from "../data/testimonials";
import { IMAGES } from "../data/marketing/images";
import {
  AI_TOOLS, AI_USES, DIFFERENCE, EARN_CARDS, FAQS, FOUNDER, PATHS, PLATFORMS,
  PROOF_STATS, PROPOSAL_FLOW, PRO_PLAN, SCHOOL_PLANS, SITE, TRUST, waLink,
} from "../data/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["EducationalOrganization", "LocalBusiness"],
      name: "HunarStack",
      description: SITE.description,
      url: SITE.url,
      email: SITE.email,
      telephone: SITE.phoneTel,
      address: {
        "@type": "PostalAddress",
        streetAddress: "A-132 Phase 1, Society",
        addressLocality: "Jamshoro",
        addressRegion: "Sindh",
        addressCountry: "PK",
      },
      areaServed: "Jamshoro",
      geo: { "@type": "GeoCoordinates", latitude: SITE.lat, longitude: SITE.lng },
    },
    {
      "@type": "FAQPage",
      mainEntity: FAQS.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
  ],
};

export default function Home() {
  return (
    <>
      <Seo title={SITE.title} description={SITE.description} path="/" jsonLd={jsonLd} />
      <section className="hs-hero">
        <div className="hs-wrap-l hs-hero-grid">
          <div>
            <p className="hs-badge"><i /> TECH + FREELANCING + AI ACADEMY</p>
            <h1>Learn Skills. Build Projects. <span className="hs-grad">Earn Online.</span></h1>
            <p className="hs-urdu">AI se Sekho or Kamao</p>
            <p className="hs-lead">Practical courses in freelancing, programming, mobile app development, AI tools, digital marketing, design and online earning — designed to help you build useful skills and real project experience.</p>
            <div className="hs-actions">
              <Link className="hs-btn hs-btn-primary" to="/courses">Explore Courses →</Link>
              <Link className="hs-btn hs-btn-ghost" to="/journey">Start Your Journey</Link>
              <a className="hs-btn hs-btn-green" href={SITE.whatsapp}>Talk on WhatsApp</a>
            </div>
          </div>
          <div className="hs-stage">
            <div className="hs-map" aria-hidden="true" />
            <figure className="hs-portrait">
              <img src={IMAGES.founder} alt="Ghulam Mujtaba, founder of HunarStack" width="800" height="1000" />
              <figcaption>Ghulam Mujtaba · Founder</figcaption>
            </figure>
            <div className="hs-floats">
              <p className="hs-float a"><b>Top Rated on Upwork</b><span>Founder result</span></p>
              <p className="hs-float b"><b>100% Job Success</b><span>Upwork record</span></p>
              <p className="hs-float c"><b>$20K+ Freelancing Earnings</b><span>Founder’s own total</span></p>
              <p className="hs-float d"><b>70+ Apps Delivered</b><span>Professional work</span></p>
            </div>
          </div>
        </div>
        <div className="hs-wrap hs-bridge reveal">
          <div>
            <p className="hs-kicker">Founder story</p>
            <h2>From a Small City to Global Opportunities</h2>
            <p>HunarStack was built from real experience in software development and freelancing. The goal is simple: help students learn useful skills, build real projects, understand online platforms and discover opportunities beyond traditional careers.</p>
          </div>
          <Link className="hs-btn hs-btn-primary" to="/journey">Read My Freelancing Journey →</Link>
        </div>
      </section>

      <section className="hs-section hs-plain" id="main" aria-label="Trust">
        <div className="hs-wrap hs-trust">
          {TRUST.map((item) => (
            <article key={item.label}><strong>{item.value}</strong><span>{item.label}</span></article>
          ))}
        </div>
        <p className="hs-wrap hs-ph">These figures describe Ghulam Mujtaba’s professional work. They are not a prediction of student earnings.</p>
      </section>

      <section className="hs-section hs-soft" id="why">
        <div className="hs-wrap">
          <div className="hs-head">
            <div>
              <p className="hs-kicker">Why HunarStack</p>
              <h2>Practical, not just theory.</h2>
              <p>Your skills can change your future when you learn them by building.</p>
            </div>
          </div>
          <div className="hs-grid-3">
            {DIFFERENCE.map((item, i) => (
              <article className="hs-card" key={item.title}>
                <div className="hs-num">{String(i + 1).padStart(2, "0")}</div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="hs-section hs-mist" id="courses">
        <div className="hs-wrap">
          <div className="hs-head">
            <div>
              <p className="hs-kicker">Popular courses</p>
              <h2>Learn a skill. Build a portfolio.</h2>
              <p>A marketplace of practical courses. Open a category when you know the direction.</p>
            </div>
            <Link className="hs-btn hs-btn-ghost" to="/courses">View Courses</Link>
          </div>
          <div className="hs-tabs" aria-label="Course categories">
            {CATEGORIES.map((cat) => (
              <Link key={cat.id} to={`/courses?category=${cat.id}`}>{cat.title}</Link>
            ))}
          </div>
          <div className="hs-grid-3">
            {FEATURED.slice(0, 6).map((course) => <CourseCard key={course.slug} course={course} />)}
          </div>
        </div>
      </section>

      <section className="hs-section hs-soft" id="paths">
        <div className="hs-wrap">
          <div className="hs-head">
            <div>
              <p className="hs-kicker">Learning paths</p>
              <h2>Start where you are.</h2>
              <p>HunarStack is suitable for beginners and for people who already have some technical knowledge. Beginners get the foundations. Experienced students move into projects sooner.</p>
            </div>
          </div>
          <div className="hs-paths">
            {PATHS.map((path) => (
              <Link className="hs-card" key={path.id} to={path.href}>
                <h3>{path.title}</h3>
                <p>{path.text}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="hs-section hs-plain" id="founder">
        <div className="hs-wrap hs-split hs-split-match">
          <div className="hs-split-photo">
            <img src={IMAGES.realProjects} alt="Ghulam Mujtaba" width="800" height="1200" loading="lazy" />
          </div>
          <div>
            <p className="hs-kicker">Who is teaching</p>
            <h2>Learn from someone who has worked with international clients.</h2>
            <p>{FOUNDER.name} is a software engineer and mobile application developer. University of Sindh. {FOUNDER.role}.</p>
            <p>See the process behind real freelancing. Learn how skills become projects, projects become portfolios, and portfolios create opportunities. His results are his own — not a promise that you will earn the same.</p>
            <div className="hs-stats">
              {PROOF_STATS.map(([a, b]) => <div key={a}><b>{a}</b><span>{b}</span></div>)}
            </div>
            <div className="hs-chips">{FOUNDER.skills.slice(0, 8).map((s) => <span className="hs-chip" key={s}>{s}</span>)}</div>
            <p className="hs-actions" style={{ marginTop: 14 }}>
              <Link className="hs-btn hs-btn-primary" to="/journey">View My Journey →</Link>
              <Link className="hs-btn hs-btn-ghost" to="/about">About HunarStack</Link>
            </p>
          </div>
        </div>
      </section>

      <section className="hs-section hs-soft" id="proof">
        <div className="hs-wrap">
          <div className="hs-head">
            <div>
              <p className="hs-kicker">Real work. Real platforms. Real learning.</p>
              <h2>From proposal to payment.</h2>
              <p>This is the professional sequence. Every step can be learned. None of them is guaranteed.</p>
            </div>
          </div>
          <ol className="hs-flow">
            {PROPOSAL_FLOW.map((step) => <li key={step}><i>↓</i>{step}</li>)}
          </ol>
          <div className="hs-grid-2" style={{ marginTop: 18 }}>
            {[
              [IMAGES.journey, "Freelancing journey", "Illustrative Journey"],
              [IMAGES.proposals, "Proposals to payments", "Illustrative Journey"],
              [IMAGES.realProjects, "Projects and platforms", "Illustrative Journey"],
              [IMAGES.struggles, "The long path", "Illustrative Journey"],
            ].map(([src, alt, label]) => (
              <figure className="hs-card" key={alt} style={{ padding: 10 }}>
                <img src={src} alt={alt} loading="lazy" style={{ borderRadius: 16, width: "100%", height: 220, objectFit: "cover" }} />
                <figcaption className="hs-note" style={{ margin: "10px 8px 6px" }}>{label}</figcaption>
                <p style={{ padding: "0 8px 8px" }}>Promotional illustration. Not an official Upwork, Freelancer or Payoneer screenshot.</p>
              </figure>
            ))}
          </div>
          <div className="hs-head" style={{ marginTop: 28 }}>
            <div>
              <h2>Platforms you can prepare for.</h2>
              <p>Upwork, Fiverr, Freelancer and LinkedIn are places to learn. They do not guarantee income.</p>
            </div>
          </div>
          <div className="hs-grid-3">
            {PLATFORMS.map((p) => (
              <article className="hs-card" key={p.id}>
                <h3>{p.name}</h3>
                <p><b>What it is.</b> {p.what}</p>
                <p><b>Who it is for.</b> {p.who}</p>
                <p><b>Skills.</b> {p.skills}</p>
                <p><b>How to prepare.</b> {p.prepare}</p>
                <Link to={p.href}>How students can prepare →</Link>
              </article>
            ))}
          </div>
          <article className="hs-card" style={{ marginTop: 16 }}>
            <p className="hs-kicker">Owner’s verified results</p>
            <h3>Ghulam Mujtaba</h3>
            <div className="hs-stats">
              <div><b>Top Rated</b><span>on Upwork</span></div>
              <div><b>100%</b><span>Job Success</span></div>
              <div><b>$20K+</b><span>Total freelancing earnings</span></div>
              <div><b>17</b><span>Upwork jobs</span></div>
              <div><b>781</b><span>Hours</span></div>
              <div><b>70+</b><span>Apps delivered</span></div>
              <div><b>10+ years</b><span>Professional experience</span></div>
              <div><b>Global</b><span>Client experience</span></div>
            </div>
            <Link className="hs-btn hs-btn-primary" to="/journey">View My Journey →</Link>
          </article>
        </div>
      </section>

      <section className="hs-section hs-mist" id="ai">
        <div className="hs-wrap">
          <div className="hs-head">
            <div>
              <p className="hs-kicker">AI</p>
              <h2>AI is changing the way we work.</h2>
              <p>Use the tools. Keep the judgment. AI drafts. You still check, build and deliver.</p>
            </div>
            <Link className="hs-btn hs-btn-primary" to="/courses?category=ai">Explore AI Courses →</Link>
          </div>
          <div className="hs-chips" style={{ marginBottom: 16 }}>
            {AI_TOOLS.map((tool) => <span className="hs-tool" key={tool}>{tool}</span>)}
          </div>
          <div className="hs-grid-3">
            {AI_USES.map((item) => (
              <article className="hs-card" key={item.title}><h3>{item.title}</h3><p>{item.text}</p></article>
            ))}
          </div>
        </div>
      </section>

      <section className="hs-section hs-soft" id="stories">
        <div className="hs-wrap">
          <div className="hs-head">
            <div>
              <p className="hs-kicker">Success stories</p>
              <h2>Student stories will live here.</h2>
              <p>We do not invent testimonials. When a student shares a real story, it will replace these placeholders.</p>
            </div>
            <Link className="hs-btn hs-btn-ghost" to="/stories">Submit Your Story</Link>
          </div>
          <div className="hs-grid-3">
            {TESTIMONIALS.map((story) => (
              <article className="hs-card hs-quote" key={story.id}>
                <blockquote>“{story.quote}”</blockquote>
                <p className="hs-ph">{story.name} · {story.city} · {story.course}</p>
                <p><b>Before:</b> {story.before}</p>
                <p><b>After:</b> {story.after}</p>
                <p><b>Project:</b> {story.project}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="hs-section hs-plain" id="why-freelance">
        <div className="hs-wrap">
          <div className="hs-head">
            <div>
              <p className="hs-kicker">Why freelancing</p>
              <h2>Your laptop can become more than a screen.</h2>
              <p>Don’t chase shortcuts. Build useful skills.</p>
            </div>
          </div>
          <div className="hs-grid-3">
            {EARN_CARDS.map((card) => (
              <article className="hs-card" key={card.title}><h3>{card.title}</h3><p>{card.text}</p></article>
            ))}
          </div>
        </div>
      </section>

      <section className="hs-section hs-soft" id="pricing">
        <div className="hs-wrap">
          <div className="hs-head">
            <div>
              <p className="hs-kicker">Fees</p>
              <h2>Choose a path you can continue.</h2>
              <p>Clear monthly fees. No invented discounts and no fake seat counts.</p>
            </div>
          </div>
          <div className="hs-price-grid">
            <div className="hs-price">
              <p className="hs-kicker">For school students</p>
              <h3>Computer skills, creativity and a first look at AI.</h3>
              <div className="hs-plans">
                {SCHOOL_PLANS.map((plan) => (
                  <article key={plan.name}>
                    <h3>{plan.name}</h3>
                    <strong>{plan.price}</strong><span>{plan.period}</span>
                    <ul>{plan.items.map((item) => <li key={item}>{item}</li>)}</ul>
                  </article>
                ))}
              </div>
            </div>
            <div className="hs-price hs-pro">
              <p className="hs-kicker" style={{ color: "#fde68a" }}>For freelancing & professional students</p>
              <h3>{PRO_PLAN.price}{PRO_PLAN.period}</h3>
              <ul>{PRO_PLAN.items.map((item) => <li key={item}>{item}</li>)}</ul>
              <Link className="hs-btn hs-btn-gold" to="/courses">Choose Your Path →</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="hs-section hs-plain" id="everyone">
        <div className="hs-wrap">
          <div className="hs-everyone">
            <div>
              <p className="hs-kicker">Skills for everyone</p>
              <h2>Girls and women are welcome.</h2>
              <p>HunarStack welcomes girls and women who want to learn technology, freelancing, AI and digital skills. The classroom is shared in spirit: practical, professional and respectful.</p>
              <p>Separate female instructor or support can be available for girls.</p>
              <div className="hs-actions">
                <a className="hs-btn hs-btn-primary" href={waLink("Hi HunarStack, I would like to ask about classes for girls.")}>Talk on WhatsApp</a>
                <Link className="hs-btn hs-btn-ghost" to="/contact">Book a Visit</Link>
              </div>
            </div>
            <div className="hs-card">
              <h3>Same standard of work</h3>
              <p>Learn a skill. Build a project. Understand how freelancing works. Create opportunities at your own pace.</p>
              <p>Same laptop. Same skills. Global opportunities — without a promise of income.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="hs-section hs-soft" id="faq">
        <div className="hs-wrap">
          <div className="hs-head">
            <div>
              <p className="hs-kicker">FAQ</p>
              <h2>Questions before you join.</h2>
            </div>
            <Link className="hs-btn hs-btn-ghost" to="/faq">All questions</Link>
          </div>
          <FaqList />
        </div>
      </section>

      <section className="hs-section hs-plain" id="visit">
        <div className="hs-wrap hs-visit">
          <div>
            <p className="hs-kicker">Visit HunarStack in Jamshoro</p>
            <h2>Come and see the academy.</h2>
            <p>{SITE.address}</p>
            <p><a href={`tel:${SITE.phoneTel}`}>{SITE.phone}</a><br /><a href={`mailto:${SITE.email}`}>{SITE.email}</a></p>
            <div className="hs-actions">
              <a className="hs-btn hs-btn-green" href={SITE.whatsapp}>Talk on WhatsApp</a>
              <a className="hs-btn hs-btn-ghost" href={SITE.maps} target="_blank" rel="noreferrer">Get Directions</a>
              <Link className="hs-btn hs-btn-primary" to="/contact">Contact</Link>
            </div>
          </div>
          <div className="hs-card">
            <h3>Hours</h3>
            <p>{SITE.hours}</p>
            <p>Ask about a course, book a visit, or enroll. We reply on WhatsApp and email.</p>
            <Link className="hs-btn hs-btn-primary" to="/enrol">Enroll Now →</Link>
          </div>
        </div>
        <div className="hs-wrap" style={{ marginTop: 16 }}>
          <AcademyMap />
        </div>
      </section>

      <section className="hs-section">
        <div className="hs-wrap">
          <div className="hs-final">
            <p className="hs-kicker" style={{ color: "#fde68a" }}>Learn · Build · Earn</p>
            <h2>Learn today. Build tomorrow.</h2>
            <p>From learning to building. From building to freelancing. From freelancing to growth. Don’t chase shortcuts. Build useful skills.</p>
            <div className="hs-actions">
              <Link className="hs-btn hs-btn-gold" to="/enrol">Enroll Now →</Link>
              <a className="hs-btn hs-btn-light" href={SITE.whatsapp}>Talk on WhatsApp</a>
              <Link className="hs-btn hs-btn-light" to="/courses">View Courses</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
