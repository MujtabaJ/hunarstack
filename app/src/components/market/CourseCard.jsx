import { Link } from "react-router-dom";

export default function CourseCard({ course }) {
  return (
    <article className="hs-card hs-course">
      <img src={course.image} alt="" width="1200" height="675" loading="lazy" />
      <div>
        <h3>{course.title}</h3>
        <p>{course.subtitle}</p>
        <p>{course.description}</p>
        <div className="hs-meta">
          <span>{course.level}</span>
          <span>{course.duration}</span>
          <span>{course.price}</span>
        </div>
        <p><b>Who should join:</b> {course.audience}</p>
        <p><b>Tools:</b> {course.tools.join(", ")}</p>
        <Link className="hs-btn hs-btn-primary" to={`/courses/${course.slug}`}>View Course →</Link>
      </div>
    </article>
  );
}
