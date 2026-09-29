import { Link } from "react-router-dom";
import Seo from "../components/market/Seo";
import FaqList from "../components/market/FaqList";
import { CATEGORIES, relatedCourses } from "../data/courses";
import { FOUNDER, SITE, waLink } from "../data/site";
import { IMAGES } from "../data/marketing/images";

export default function MarketingCourse({ course }) {
  const category = CATEGORIES.find((c) => c.id === course.category);
  const related = relatedCourses(course);
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Course",
        name: course.title,
        description: course.description,
        provider: { "@type": "Organization", name: "HunarStack", sameAs: SITE.url },
        offers: { "@type": "Offer", priceCurrency: "PKR", description: course.price, url: `${SITE.url}/courses/${course.slug}` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
          { "@type": "ListItem", position: 2, name: "Courses", item: `${SITE.url}/courses` },
          { "@type": "ListItem", position: 3, name: course.title, item: `${SITE.url}/courses/${course.slug}` },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: course.faqs.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
    ],
  };

  return (
    <>
      <Seo title={`${course.title} | HunarStack Jamshoro`} description={course.description} path={`/courses/${course.slug}`} jsonLd={jsonLd} />
      <header className="hs-hero-mini">
        <div className="hs-wrap">
          <p className="hs-crumbs">
            <Link to="/">Home</Link> <span>/</span> <Link to="/courses">Courses</Link> <span>/</span> <span>{course.title}</span>
          </p>
          <p className="hs-kicker">{category?.title}</p>
          <h1>{course.title}</h1>
          <p className="hs-urdu">{course.subtitle}</p>
          <p className="hs-lead">{course.description}</p>
          <div className="hs-actions">
            <Link className="hs-btn hs-btn-primary" to={`/enrol?track=${course.slug}`}>Enroll Now →</Link>
            <a className="hs-btn hs-btn-green" href={waLink(`Hi HunarStack, I want to ask about ${course.title}.`)}>Talk on WhatsApp</a>
            <Link className="hs-btn hs-btn-ghost" to="/contact">Ask About a Course</Link>
          </div>
        </div>
      </header>
      <main id="main" className="hs-page">
        <div className="hs-wrap" style={{ display: "grid", gap: 22 }}>
          <img className="hs-cover" src={course.image} alt="" width="1200" height="640" />
          <div className="hs-grid-3">
            <article className="hs-card"><h3>Level</h3><p>{course.level}</p></article>
            <article className="hs-card"><h3>Duration</h3><p>{course.duration}</p></article>
            <article className="hs-card"><h3>Fee</h3><p>{course.price}</p></article>
          </div>
          <section>
            <h2>Course overview</h2>
            <p>{course.description} Classes are practical. You leave with work you can explain, not only notes.</p>
          </section>
          <section className="hs-grid-2">
            <article className="hs-card"><h3>Who is this for?</h3><p>{course.audience}</p></article>
            <article className="hs-card">
              <h3>What you’ll learn</h3>
              <ul className="hs-list">{course.modules.map((mod) => <li key={mod.title}>{mod.title}</li>)}</ul>
            </article>
          </section>
          <section>
            <h2>Modules</h2>
            <div className="hs-grid-2">
              {course.modules.map((mod, i) => (
                <article className="hs-card" key={mod.title}>
                  <div className="hs-num">{String(i + 1).padStart(2, "0")}</div>
                  <h3>{mod.title}</h3>
                  <p>{mod.text}</p>
                </article>
              ))}
            </div>
          </section>
          <section className="hs-grid-2">
            <article className="hs-card">
              <h3>Tools</h3>
              <div className="hs-chips">{course.tools.map((tool) => <span className="hs-chip" key={tool}>{tool}</span>)}</div>
            </article>
            <article className="hs-card">
              <h3>Practical projects</h3>
              <ul className="hs-list">{course.projects.map((p) => <li key={p}>{p}</li>)}</ul>
            </article>
            <article className="hs-card">
              <h3>Assignments</h3>
              <ul className="hs-list">{course.assignments.map((p) => <li key={p}>{p}</li>)}</ul>
            </article>
            <article className="hs-card">
              <h3>Portfolio outcome</h3>
              <p>{course.portfolio}</p>
            </article>
          </section>
          <article className="hs-card">
            <h3>Freelancing opportunities</h3>
            <p>{course.opportunities}</p>
          </article>
          <section className="hs-split">
            <img src={IMAGES.founder} alt="Instructor Ghulam Mujtaba" width="640" height="800" loading="lazy" />
            <div>
              <p className="hs-kicker">Instructor</p>
              <h2>{FOUNDER.name}</h2>
              <p>Software engineer and mobile application developer. Learn from someone who has actually worked with international clients. His Upwork record and app work are context for the teaching — not a promise that students earn the same amount.</p>
              <Link className="hs-btn hs-btn-ghost" to="/journey">View My Journey →</Link>
            </div>
          </section>
          <section>
            <h2>FAQs</h2>
            <FaqList items={course.faqs} />
          </section>
          <div className="hs-final">
            <h2>Ready to start {course.title}?</h2>
            <p>{course.price} · {course.duration} · {SITE.address}</p>
            <div className="hs-actions">
              <Link className="hs-btn hs-btn-gold" to={`/enrol?track=${course.slug}`}>Enroll Now →</Link>
              <a className="hs-btn hs-btn-light" href={SITE.whatsapp}>Talk on WhatsApp</a>
            </div>
          </div>
          {related.length > 0 && (
            <section>
              <h2>Related courses</h2>
              <div className="hs-grid-3">
                {related.map((item) => (
                  <Link className="hs-card" key={item.slug} to={`/courses/${item.slug}`}>
                    <h3>{item.title}</h3>
                    <p>{item.subtitle}</p>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
    </>
  );
}
