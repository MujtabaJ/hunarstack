import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { PageHero } from "../components/CourseCard";
import { useAuth } from "../context/AuthContext";
import { useData } from "../context/DataContext";

export default function Enrol() {
  const { user } = useAuth();
  const { apply, getCourse, liveCourses } = useData();
  const nav = useNavigate();
  const [params] = useSearchParams();
  const preset = getCourse(params.get("track") || "")?.id || "";

  function onSubmit(e) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    const course = getCourse(data.courseId);
    apply({
      name: data.name,
      email: data.email,
      phone: data.whatsapp,
      city: data.location,
      courseId: data.courseId,
      track: course?.name || data.courseId,
      level: data.level,
      goal: data.goal,
      source: data.source,
      userId: user?.id,
    });
    if (user?.role === "student") nav("/app/applications?new=1");
    else nav("/thanks?kind=apply");
  }

  return (
    <>
      <PageHero
        kicker="Start your journey"
        title="Apply for a seat"
        text="Tell us a little about you. Your application appears in the academy Applications queue as soon as you send it. Applying does not guarantee a place until an admin accepts it."
      />
      <main id="main">
        <div className="wrap narrow">
          <form onSubmit={onSubmit}>
            <div className="g2">
              <label>Full name<input name="name" defaultValue={user?.name || ""} required /></label>
              <label>Email<input name="email" type="email" defaultValue={user?.email || ""} required /></label>
              <label>WhatsApp number<input name="whatsapp" type="tel" required /></label>
              <label>City and country<input name="location" defaultValue={user?.city || ""} required /></label>
            </div>
            <div className="g2">
              <label>Track you want to join
                <select name="courseId" required defaultValue={preset}>
                  <option value="">Choose one</option>
                  <optgroup label="Skill tracks">
                    {liveCourses.filter((c) => c.group === "skill").map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </optgroup>
                  <optgroup label="Digital platforms">
                    {liveCourses.filter((c) => c.group === "platform").map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </optgroup>
                </select>
              </label>
              <label>Your current level
                <select name="level" required defaultValue="">
                  <option value="">Choose one</option>
                  <option>Complete beginner</option>
                  <option>I know some basics</option>
                  <option>Working in tech</option>
                </select>
              </label>
            </div>
            <label>What do you want to achieve?<textarea name="goal" placeholder="A skill, a portfolio, freelance work, a career change…" /></label>
            <label>How did you hear about us?<input name="source" /></label>
            <label className="chk"><input type="checkbox" required /> <span>I agree that HunarStack may contact me about this application.</span></label>
            <button className="btn btn-main" type="submit">Send application</button>
          </form>
          {!user && <p className="note">Want a dashboard login first? <Link to="/register">Create an account</Link>.</p>}
        </div>
      </main>
    </>
  );
}
