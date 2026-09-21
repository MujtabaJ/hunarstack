import { Link } from "react-router-dom";
import { useData } from "../context/DataContext";
import CourseCard from "../components/CourseCard";
import MockupStrip from "../components/MockupStrip";
import Marquee from "../components/Marquee";
import PlatformLogo, { hasPlatformLogo } from "../components/PlatformLogo";
import { PLATFORM_META, MOCK_KIND, coverFor } from "../data/visuals";

const TONE = {
  soft: "section-soft",
  mint: "section-mint",
  blue: "section-blue",
  warm: "section-warm",
  navy: "section-navy",
};

function itemPath(sectionId, item) {
  return item.to || `/explore/${sectionId}/${item.id}`;
}

export default function Home() {
  const { site, skillCourses, platformCourses } = useData();
  const hero = site.hero;
  const sections = (site.sections || []).filter((s) => s.visible !== false);

  return (
    <>
      {hero.visible !== false && (
        <section className="hero-home" id="top">
          <div className="wrap hero-grid">
            <div className="hero-copy">
              <p className="kicker">{hero.kicker}</p>
              <h1>{hero.titleBefore}<span className="grad">{hero.titleHighlight}</span>{hero.titleAfter}</h1>
              <p className="lead">{hero.lead}</p>
              <div className="btns">
                <Link className="btn btn-main" to={hero.cta1To || "/courses"}>{hero.cta1Label}</Link>
                <Link className="btn btn-on-dark" to={hero.cta2To || "/register"}>{hero.cta2Label}</Link>
              </div>
              <ol className="hero-rail" aria-label="The HunarStack path">
                {(hero.rail || []).map((label, i, arr) => (
                  <li key={label}>
                    <Link to={`/explore/journey/${label.toLowerCase()}`}><span>{label}</span></Link>
                    {i < arr.length - 1 && <i aria-hidden="true">→</i>}
                  </li>
                ))}
              </ol>
            </div>
            <div className="hero-stage">
              <span className="orb o1">AI</span>
              <span className="orb o2">&lt;/&gt; CODE</span>
              <span className="orb o3">PROJECT</span>
              <span className="orb o4">FREELANCE</span>
              <span className="orb o5">PORTFOLIO</span>
              <span className="orb o6">APPS</span>
              <span className="orb o7">GLOBAL</span>
              <Link className="hero-photo" to="/explore/stories">
                <img src={hero.image} width="1000" height="1200" alt={hero.imageAlt || ""} />
              </Link>
            </div>
          </div>
        </section>
      )}

      <main id="main">
        {sections.map((section) => (
          <HomeSection key={section.id} section={section} skillCourses={skillCourses} platformCourses={platformCourses} />
        ))}
      </main>
    </>
  );
}

function HomeSection({ section, skillCourses, platformCourses }) {
  const cls = `section ${TONE[section.tone] || ""}`.trim();
  const more = `/explore/${section.id}`;

  if (section.kind === "journey") {
    return (
      <section className={cls} id={section.id}>
        <div className="wrap">
          <SectionHead section={section} to={more} />
          <ol className="journey-map reveal">
            {section.items?.map((item) => (
              <li key={item.id}>
                <Link className="block-link" to={itemPath(section.id, item)}>
                  <span className="jm-num">{item.num}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </Link>
              </li>
            ))}
          </ol>
          {section.note && <p className="whisper reveal">{section.note}</p>}
        </div>
      </section>
    );
  }

  if (section.kind === "steps") {
    return (
      <section className={cls} id={section.id}>
        <div className="wrap">
          <SectionHead section={section} to={more} />
          <ol className="zero-path reveal">
            {section.items?.map((item) => (
              <li key={item.id}>
                <Link to={itemPath(section.id, item)}><span>{item.title}</span></Link>
              </li>
            ))}
          </ol>
          {section.note && <p className="zero-note reveal">{section.note}</p>}
        </div>
      </section>
    );
  }

  if (section.kind === "mosaic") {
    return (
      <section className={cls} id={section.id}>
        <div className="wrap">
          <SectionHead section={section} to={more} />
          <div className="story-mosaic reveal">
            {section.items?.map((item) => (
              <Link key={item.id} to={itemPath(section.id, item)}>
                <figure>
                  <img src={item.image} width="1100" height="800" alt={item.imageAlt || item.title} loading="lazy" />
                  <figcaption>{item.title}</figcaption>
                </figure>
              </Link>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (section.kind === "eco") {
    return (
      <section className={cls} id={section.id}>
        <div className="wrap">
          <SectionHead section={section} to={more} />
          <div className="eco-grid reveal">
            {section.items?.map((item) => (
              <Link className="eco-card block-link" key={item.id} to={itemPath(section.id, item)}>
                <div className={`mark float-item ${hasPlatformLogo(item.id) ? "has-logo" : ""}`}>
                  {hasPlatformLogo(item.id) ? <PlatformLogo id={item.id} size={28} /> : item.mark}
                </div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (section.kind === "people") {
    return (
      <section className={cls} id={section.id}>
        <div className="wrap">
          <SectionHead section={section} to={more} />
          <div className="people-grid">
            {section.items?.map((item) => (
              <Link className="person-card reveal block-link" key={item.id} to={itemPath(section.id, item)}>
                <img src={item.image} width="800" height="960" alt={item.imageAlt || item.title} loading="lazy" />
                <div className="body">
                  <span className="tag">{item.tag}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </Link>
            ))}
          </div>
          {section.note && <p className="photo-note reveal">{section.note}</p>}
        </div>
      </section>
    );
  }

  if (section.kind === "sell") {
    return (
      <section className={cls} id={section.id}>
        <div className="wrap">
          <SectionHead section={section} to={more} />
          <div className="sell-grid">
            {section.items?.map((item) => (
              <Link className="sell-card reveal block-link" key={item.id} to={itemPath(section.id, item)}>
                <h3>{item.title}</h3>
                <p className="tags">{item.tags}</p>
                <ol className="flow-chain">
                  {(item.steps || []).map((s) => <li key={s}>{s}</li>)}
                </ol>
              </Link>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (section.kind === "skills") {
    return (
      <section className={cls} id={section.id}>
        <div className="wrap">
          <SectionHead section={section} to="/courses?group=skill" />
          <div className="grid grid-2">
            {skillCourses.map((c) => <CourseCard key={c.id} course={c} cta="Start Learning" />)}
          </div>
        </div>
      </section>
    );
  }

  if (section.kind === "platforms") {
    return (
      <section className={cls} id={section.id}>
        <div className="wrap">
          <SectionHead section={section} to="/courses?group=platform" />
          <div className="logo-ribbon reveal">
            <Marquee speed={28}>
              {PLATFORM_META.map((p) => (
                <Link className="logo-chip" to={`/courses/${p.id}`} key={p.id}>
                  <PlatformLogo id={p.id} size={28} />
                  <span>{p.name}</span>
                </Link>
              ))}
            </Marquee>
          </div>
          <div className="grid grid-2">
            {platformCourses.map((c) => <CourseCard key={c.id} course={c} />)}
          </div>
        </div>
      </section>
    );
  }

  if (section.kind === "projects") {
    return (
      <section className={cls} id={section.id}>
        <div className="wrap">
          <SectionHead section={section} to={more} />
          <MockupStrip />
          <div className="grid grid-3">
            {skillCourses.slice(0, 6).map((c, i) => (
              <Link className="card project-card reveal block-link" key={c.id} to={`/courses/${c.id}?from=projects`}>
                <div className="project-thumb">
                  <img src={coverFor(c.id)} alt="" width="640" height="400" loading="lazy" />
                  <div className={`mock mock-${MOCK_KIND[c.id] || "web"}`} aria-hidden="true" />
                </div>
                <p className="proj-label">Project {String(i + 1).padStart(2, "0")} — {c.name}</p>
                <h3>{c.build}</h3>
                <p>{c.learn}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (section.kind === "laptop") {
    return (
      <section className={`${cls}`.trim()} id={section.id}>
        <Link className="wrap laptop-split block-link" to={more} style={{ display: "grid" }}>
          <div className="reveal">
            <p className="kicker">{section.kicker}</p>
            <h2>{section.title}</h2>
            <ul className="story-lines">
              {section.items?.map((item) => <li key={item.id}>{item.title}</li>)}
            </ul>
          </div>
          <div className="hero-stage mini-laptop reveal">
            <figure className="frame-photo">
              <img src={section.image} width="1100" height="800" alt={section.imageAlt || ""} loading="lazy" />
            </figure>
          </div>
        </Link>
      </section>
    );
  }

  if (section.kind === "ai") {
    return (
      <section className={cls} id={section.id}>
        <div className="wrap">
          <Link className="ai-band reveal block-link" to={more}>
            <p className="kicker">{section.kicker}</p>
            <h2>{section.title}</h2>
            <p>{section.text}</p>
          </Link>
        </div>
      </section>
    );
  }

  if (section.kind === "cta") {
    return (
      <section className={cls} id={section.id}>
        <div className="wrap">
          <div className="cta-band reveal">
            <h2>{section.title}</h2>
            <p>{section.text}</p>
            <div className="btns">
              <Link className="btn btn-main" to={section.cta1To || "/register"}>{section.cta1Label}</Link>
              <Link className="btn btn-on-dark" to={section.cta2To || "/login"}>{section.cta2Label}</Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={cls} id={section.id}>
      <div className="wrap">
        <SectionHead section={section} to={more} />
      </div>
    </section>
  );
}

function SectionHead({ section, to }) {
  return (
    <div className="section-head reveal">
      {section.kicker && <p className="kicker">{section.kicker}</p>}
      <h2><Link className="title-link" to={to}>{section.title}</Link></h2>
      {section.text && <p>{section.text}</p>}
      <p><Link className="open-link" to={to}>Open details →</Link></p>
    </div>
  );
}
