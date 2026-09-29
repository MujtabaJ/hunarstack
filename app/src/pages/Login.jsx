import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { PageHero } from "../components/CourseCard";

const DEMOS = [
  ["student@hunarstack.com", "student123", "Student — Sara, enrolled in AI and Web"],
  ["instructor@hunarstack.com", "teach123", "Instructor — Amina, reviews submissions"],
  ["admin@hunarstack.com", "admin123", "Admin — users, applications, inbox"],
];

export default function Login() {
  const { user, login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (user) return <Navigate to="/app" replace />;

  function submit(e) {
    e.preventDefault();
    try {
      login(email, password);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <>
      <PageHero kicker="Classroom" title="Log in to HunarStack" text="Students track lessons and projects. Instructors review work. Admins manage people, applications, courses, fees and messages." />
      <main id="main" className="auth-screen">
        <div className="wrap">
          <div className="auth-card">
            <div className="demo-box">
              <p><b>Try a role instantly</b></p>
              {DEMOS.map(([em, pw, label]) => (
                <button key={em} type="button" onClick={() => {
                  try {
                    login(em, pw);
                  } catch (err) {
                    setEmail(em);
                    setPassword(pw);
                    setError(err.message);
                  }
                }}>
                  {label}
                </button>
              ))}
            </div>
            {error && <p className="form-error">{error}</p>}
            <form onSubmit={submit}>
              <label>Email<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /></label>
              <label>Password<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required /></label>
              <button className="btn btn-main" type="submit">Log in</button>
            </form>
            <p className="note">New here? <Link to="/register">Create a student account</Link>.</p>
          </div>
        </div>
      </main>
    </>
  );
}
