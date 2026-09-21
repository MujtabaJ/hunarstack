import { Link } from "react-router-dom";
import { PageHero } from "../components/CourseCard";

export default function NotFound() {
  return (
    <>
      <PageHero
        kicker="404"
        title="That page is not here."
        text="The link may be old, or the course was unpublished. Start from Home or the course list."
      />
      <main id="main">
        <div className="wrap narrow">
          <p className="btns">
            <Link className="btn btn-main" to="/">Home</Link>
            <Link className="btn btn-ghost" to="/courses">Browse courses</Link>
          </p>
        </div>
      </main>
    </>
  );
}
