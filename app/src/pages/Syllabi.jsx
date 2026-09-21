import { Link, useParams } from "react-router-dom";
import { useData } from "../context/DataContext";
import { PageHero } from "../components/CourseCard";
import Crumbs, { Trail } from "../components/Crumbs";

export default function Syllabi() {
  const { id } = useParams();
  const { liveCourses, getCourse } = useData();
  const selected = id ? getCourse(id) : null;
  const list = selected ? [selected] : liveCourses;

  return (
    <>
      <PageHero
        kicker="Week-by-week plans"
        title="See exactly what you will do."
        text="Every track has a duration, tools, outcomes and weekly learn/build rhythm. Open a course to work through it in your dashboard."
      />
      <main id="main">
        <div className="wrap">
          <Crumbs items={[{ label: "Home", to: "/" }, { label: "Syllabi", to: selected ? "/syllabi" : undefined }, selected && { label: selected.name }]} />
          {selected && <Trail backTo="/syllabi" backLabel="← All syllabi" extra={<Link className="btn btn-ghost" to="/courses">Change course</Link>} />}
          {!selected && (
            <div className="chip-row" style={{ marginBottom: 24 }}>
              {liveCourses.map((c) => (
                <Link key={c.id} className="btn btn-ghost" to={`/syllabi/${c.id}`}>{c.icon} {c.name}</Link>
              ))}
            </div>
          )}
          {list.map((c) => (
            <article className="panel" key={c.id} id={c.id}>
              <p className="kicker">{c.group === "platform" ? "Platform" : "Skill"}</p>
              <h2>{c.icon} {c.name}</h2>
              <p>{c.duration} · {c.format}</p>
              <p><b>Prerequisites:</b> {c.prereq || "See course page."}</p>
              <p><b>Tools:</b> {c.tools || "Shown in class."}</p>
              {c.outcomes?.length > 0 && (
                <>
                  <h3>Outcomes</h3>
                  <ul>{c.outcomes.map((o) => <li key={o}>{o}</li>)}</ul>
                </>
              )}
              <ol className="weeks">
                {(c.weeks || []).map((w) => (
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
              {c.assessment && <p className="note">{c.assessment}</p>}
              <p className="btns">
                <Link className="btn btn-main" to={`/courses/${c.id}`}>Open course</Link>
                <Link className="btn btn-ghost" to={`/enrol?track=${encodeURIComponent(c.id)}`}>Apply</Link>
              </p>
            </article>
          ))}
        </div>
      </main>
    </>
  );
}
