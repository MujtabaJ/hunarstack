import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import StatusPill, { initials } from "../../components/StatusPill";
import { useData } from "../../context/DataContext";

const COPY = {
  pending: "In the admissions queue. A seat is not confirmed until an admin accepts it.",
  waitlist: "You are on the waitlist. We will write if a seat opens.",
  accepted: "Accepted. Open Learn to start the first week.",
  declined: "Not accepted this round. You can apply for another track.",
};

export default function StudentApplications() {
  const { myApplications, getCourse, withdrawApplication } = useData();
  const [params] = useSearchParams();
  const justSent = params.get("new") === "1";
  const [error, setError] = useState("");

  function withdraw(app) {
    setError("");
    if (!confirm(`Withdraw your application for ${app.track}?`)) return;
    try {
      withdrawApplication(app.id);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <>
      <div className="dash-top">
        <div>
          <p className="kicker">Admissions</p>
          <h1>Your applications</h1>
          <p>Status updates here when an admin decides. Applying does not guarantee a place, clients, or income.</p>
        </div>
        <Link className="btn btn-main" to="/enrol">Apply for a seat</Link>
      </div>

      {justSent && (
        <p className="form-ok">Application received. It is now in the academy queue — watch this page for a decision.</p>
      )}
      {error && <p className="form-error">{error}</p>}

      {myApplications.length === 0 && (
        <div className="panel empty-panel">
          <h3>No applications yet</h3>
          <p>Tell us which track you want. The academy will see it in Applications the moment you submit.</p>
          <p className="btns"><Link className="btn btn-main" to="/enrol">Apply now</Link></p>
        </div>
      )}

      <div className="app-grid">
        {myApplications.map((a) => {
          const course = getCourse(a.courseId || a.track);
          return (
            <article className="panel app-card" key={a.id}>
              <div className="app-card-head">
                <div className="app-person">
                  <div className="app-avatar" aria-hidden="true">{initials(a.track || a.name)}</div>
                  <div>
                    <h3>{course?.icon} {a.track}</h3>
                    <p className="app-meta">
                      <span>Submitted {a.createdAt}</span>
                      {a.level ? <span>{a.level}</span> : null}
                    </p>
                  </div>
                </div>
                <StatusPill status={a.status} />
              </div>
              <div className="app-goal">
                <p>{COPY[a.status] || COPY.pending}</p>
                {a.note ? <p><b>Note from academy:</b> {a.note}</p> : null}
                {a.goal ? <p><b>Your goal:</b> {a.goal}</p> : null}
              </div>
              <p className="btns">
                {a.status === "accepted" && course ? (
                  <Link className="btn btn-main" to={`/app/learn/${course.id}`}>Open Learn</Link>
                ) : (
                  <Link className="btn btn-ghost" to={`/enrol?track=${encodeURIComponent(a.courseId || a.track || "")}`}>Apply for another track</Link>
                )}
                {course ? <Link className="btn btn-ghost" to={`/courses/${course.id}`}>Syllabus</Link> : null}
                {(a.status === "pending" || a.status === "waitlist") && (
                  <button className="btn btn-danger" type="button" onClick={() => withdraw(a)}>Withdraw</button>
                )}
              </p>
            </article>
          );
        })}
      </div>
    </>
  );
}
