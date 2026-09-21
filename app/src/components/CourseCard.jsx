import { Link } from "react-router-dom";
import PlatformLogo, { hasPlatformLogo } from "./PlatformLogo";

export default function CourseCard({ course, cta = "View track", to }) {
  const href = to || `/courses/${course.id}?group=${course.group}`;
  const logo = hasPlatformLogo(course.id);
  return (
    <article className={`card course-card reveal ${logo ? "is-platform" : ""}`}>
      <Link className="block-link" to={href}>
        <div className="icon float-item" aria-hidden="true">
          {logo ? <PlatformLogo id={course.id} size={40} /> : course.icon}
        </div>
        <h3>{course.name}</h3>
        <div className="meta-row">
          {(course.meta || []).slice(0, 2).map((m) => (
            <span key={m}>{m}</span>
          ))}
        </div>
        <ul className="path-flow">
          <li><b>Learn</b> {course.learn}</li>
          <li><b>Build</b> {course.build}</li>
          <li><b>Explore</b> {course.path}</li>
        </ul>
      </Link>
      <Link className="btn btn-main" to={href}>{cta}</Link>
    </article>
  );
}

export function TrackOptions() {
  return (
    <>
      <option value="">Choose one</option>
      <optgroup label="Skill tracks">
        <option>AI & Generative AI</option>
        <option>Software Development</option>
        <option>Mobile App Development</option>
        <option>Web Development</option>
        <option>UI/UX</option>
        <option>Cloud & APIs</option>
        <option>AI Tools & Automation</option>
        <option>Freelancing</option>
        <option>Remote Work & Global Clients</option>
        <option>Real-world Projects</option>
      </optgroup>
      <optgroup label="Digital platforms (AI-assisted)">
        <option>Upwork</option>
        <option>Fiverr</option>
        <option>Freelancer.com</option>
        <option>LinkedIn</option>
        <option>TikTok</option>
        <option>YouTube</option>
        <option>Facebook</option>
      </optgroup>
    </>
  );
}

export function PageHero({ kicker, title, text, children }) {
  return (
    <div className="page-hero">
      <div className="wrap">
        {kicker && <p className="kicker">{kicker}</p>}
        <h1>{title}</h1>
        {text && <p>{text}</p>}
        {children}
      </div>
    </div>
  );
}
