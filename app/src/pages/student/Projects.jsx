import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useData } from "../../context/DataContext";
import MockupStrip from "../../components/MockupStrip";
import StatusPill from "../../components/StatusPill";
import { coverFor, MOCK_KIND } from "../../data/visuals";

export default function Projects() {
  const { user } = useAuth();
  const { myEnrollments, submissions, getCourse } = useData();
  const builds = myEnrollments.map((e) => getCourse(e.courseId)).filter(Boolean);
  const mine = submissions.filter((s) => s.userId === user.id);

  return (
    <>
      <div className="dash-top">
        <div>
          <p className="kicker">Portfolio studio</p>
          <h1>Projects you can show.</h1>
          <p>Each track has a capstone. Ship it, write a short case study, then keep going. These are practice products—not client placements.</p>
        </div>
      </div>

      <p className="whisper" style={{ marginBottom: 10 }}>Mockups drift right to left — hover a device to pause.</p>
      <MockupStrip />

      <div className="grid grid-2" style={{ marginTop: 22 }}>
        {builds.map((c) => (
          <article className="panel project-card lift-card" key={c.id}>
            <div className="project-thumb">
              <img src={coverFor(c.id)} alt="" width="720" height="420" />
              <div className={`mock mock-${MOCK_KIND[c.id] || "web"}`} aria-hidden="true" />
            </div>
            <h2>{c.icon} {c.name}</h2>
            <p><b>Build:</b> {c.build}</p>
            <p>{c.path}</p>
            <Link className="btn btn-main" to={`/app/learn/${c.id}`}>Work this week</Link>
          </article>
        ))}
      </div>
      {builds.length === 0 && (
        <div className="panel empty-panel">
          <h3>Enrol in a track to unlock its project brief</h3>
          <p>The mockups above are examples of the kind of work each skill produces.</p>
          <p className="btns"><Link className="btn btn-main" to="/courses">Browse courses</Link></p>
        </div>
      )}
      <div className="panel">
        <h2>Submitted work</h2>
        {mine.length === 0 && <p>Nothing submitted yet. Open Learn, finish a week, then send it for review.</p>}
        {mine.map((s) => (
          <div className="queue-row" key={s.id}>
            <div>
              <b>{s.title}</b>
              <p>{s.note}{s.feedback ? ` · Feedback: ${s.feedback}` : ""}</p>
            </div>
            <StatusPill status={s.status} />
          </div>
        ))}
      </div>
    </>
  );
}
