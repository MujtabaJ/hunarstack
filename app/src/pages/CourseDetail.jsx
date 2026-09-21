import { Link, Navigate, useParams, useSearchParams } from "react-router-dom";
import { PageHero } from "../components/CourseCard";
import Crumbs, { Trail } from "../components/Crumbs";
import { useAuth } from "../context/AuthContext";
import { useData } from "../context/DataContext";
import PlatformLogo, { hasPlatformLogo } from "../components/PlatformLogo";
import { money } from "../data/catalog";

export default function CourseDetail() {
  const { id } = useParams();
  const [params] = useSearchParams();
  const { user } = useAuth();
  const { myEnrollments, enrol, getCourse, liveCourses } = useData();
  const course = getCourse(id);

  if (!course) return <Navigate to="/courses" replace />;

  const enrolled = myEnrollments.some((e) => e.courseId === course.id);
  const group = params.get("group") || course.group;
  const listHref = `/courses?group=${group}`;
  const siblings = liveCourses.filter((c) => c.group === course.group && c.id !== course.id);

  return (
    <>
      <PageHero
        kicker={course.group === "platform" ? "Platform course" : "Skill track"}
        title={
          <span className="title-with-logo">
            {hasPlatformLogo(course.id) && <PlatformLogo id={course.id} size={42} />}
            {course.group === "platform" ? course.name : `${course.icon} ${course.name}`}
          </span>
        }
        text={course.blurb}
      />
      <main id="main">
        <div className="wrap">
          <Crumbs
            items={[
              { label: "Home", to: "/" },
              { label: "Courses", to: "/courses" },
              { label: course.group === "platform" ? "Platforms" : "Skill tracks", to: listHref },
              { label: course.name },
            ]}
          />
          <Trail
            backTo={listHref}
            backLabel="← Back to this list"
            extra={
              <>
                <Link className="btn btn-ghost" to="/courses">Change path</Link>
                <Link className="btn btn-ghost" to={listHref}>Change track</Link>
              </>
            }
          />
          <p className="meta-row">
            {(course.meta || []).map((m) => <span key={m}>{m}</span>)}
            {course.fee != null && <span>{money(course.fee, course.currency)} {course.billing === "one-time" ? "one-time" : course.billing === "monthly" ? "monthly" : "per cohort"}</span>}
          </p>
          <div className="grid grid-2" style={{ margin: "22px 0" }}>
            <div className="card"><h3>Learn</h3><p>{course.learn}</p></div>
            <div className="card"><h3>Build</h3><p>{course.build}</p></div>
            <div className="card"><h3>Path</h3><p>{course.path}</p></div>
            <div className="card"><h3>Format</h3><p>{course.format || course.duration}</p></div>
          </div>
          {course.ai && <p className="note"><b>AI as assistant:</b> {course.ai}</p>}
          {course.earn && <p className="note"><b>Earning, honestly:</b> {course.earn}</p>}
          <h2>Modules</h2>
          <div className="grid auto-grid">
            {(course.modules || []).map((m) => (
              <article className="card" key={m.title}>
                <h3>{m.title}</h3>
                <p>{m.text}</p>
                {m.build && <p className="fact"><b>Build:</b> {m.build}</p>}
              </article>
            ))}
          </div>
          {(course.weeks || []).length > 0 && (
            <>
              <h2>Week by week</h2>
              <ol className="weeks">
                {course.weeks.map((w) => (
                  <li key={w.week}>
                    <span className="wn">W{w.week}</span>
                    <div>
                      <h4>{w.title}</h4>
                      <p>{w.learn}</p>
                      {w.build && <p className="pr"><b>Build:</b> {w.build}</p>}
                    </div>
                  </li>
                ))}
              </ol>
            </>
          )}
          <p className="btns" style={{ marginTop: 28 }}>
            {enrolled ? (
              <Link className="btn btn-main" to={`/app/learn/${course.id}`}>Continue in classroom</Link>
            ) : (
              <>
                {user?.role === "student" && (
                  <button className="btn btn-ghost" type="button" onClick={() => enrol(user.id, course.id)}>Join this track (demo)</button>
                )}
                <Link className="btn btn-main" to={`/enrol?track=${encodeURIComponent(course.id)}`}>Apply for a seat</Link>
              </>
            )}
            <Link className="btn btn-ghost" to={`/syllabi/${course.id}`}>Full syllabus</Link>
          </p>
          {siblings.length > 0 && (
            <>
              <h2>Change to another {course.group === "platform" ? "platform" : "skill"}</h2>
              <div className="chip-row">
                {siblings.map((c) => (
                  <Link key={c.id} className="btn btn-ghost" to={`/courses/${c.id}?group=${c.group}`}>{c.icon} {c.name}</Link>
                ))}
              </div>
            </>
          )}
          <p className="note">Joining in this demo adds the course to your dashboard and issues a seat fee. An admin records payment — cards are not charged online. Clients and income are never guaranteed.</p>
        </div>
      </main>
    </>
  );
}
