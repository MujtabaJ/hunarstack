import { Link, useSearchParams } from "react-router-dom";
import { PageHero } from "../components/CourseCard";
import { useAuth } from "../context/AuthContext";

const COPY = {
  apply: {
    kicker: "Application received",
    title: "Your seat request is in the queue.",
    text: "The academy can see it now in Applications. A place is not confirmed until an admin accepts it. We still do not promise clients or income.",
  },
  contact: {
    kicker: "Message received",
    title: "Thank you.",
    text: "Your note is in the academy inbox. You can also reach us on WhatsApp at 0300 3740708.",
  },
};

export default function Thanks() {
  const [params] = useSearchParams();
  const { user } = useAuth();
  const copy = COPY[params.get("kind")] || COPY.contact;
  const isApply = params.get("kind") === "apply";

  return (
    <>
      <PageHero kicker={copy.kicker} title={copy.title} text={copy.text} />
      <main id="main">
        <div className="wrap narrow">
          <p className="btns">
            {user ? (
              <Link className="btn btn-main" to={isApply && user.role === "student" ? "/app/applications" : "/app"}>
                Go to dashboard
              </Link>
            ) : (
              <Link className="btn btn-main" to="/login">Log in</Link>
            )}
            <Link className="btn btn-ghost" to="/courses">Explore courses</Link>
          </p>
        </div>
      </main>
    </>
  );
}
