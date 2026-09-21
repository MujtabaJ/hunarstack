import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { PageHero } from "../components/CourseCard";

export default function Register() {
  const { user, register } = useAuth();
  const nav = useNavigate();
  const [error, setError] = useState("");

  if (user) return <Navigate to="/app" replace />;

  function onSubmit(e) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    if (data.password !== data.confirm) {
      setError("Passwords do not match.");
      return;
    }
    try {
      register({ name: data.name, email: data.email, password: data.password, city: data.city, bio: data.bio });
      nav("/enrol");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <>
      <PageHero
        kicker="Create your place"
        title="Open a student account"
        text="This is your login for the classroom. After you register, apply for a seat or join a demo track. Instructor and admin roles are assigned by the academy—not self-serve."
      />
      <main id="main" className="auth-screen">
        <div className="wrap">
          <div className="auth-card">
            {error && <p className="form-error">{error}</p>}
            <form onSubmit={onSubmit}>
              <label>Full name<input name="name" required /></label>
              <label>Email<input name="email" type="email" required /></label>
              <label>City<input name="city" placeholder="Islamabad, Pakistan" /></label>
              <label>Password<input name="password" type="password" minLength={6} required /></label>
              <label>Confirm password<input name="confirm" type="password" minLength={6} required /></label>
              <label>What do you want to learn?<textarea name="bio" placeholder="A skill, a portfolio, freelance practice…" /></label>
              <label className="chk"><input type="checkbox" required /> <span>I accept the <Link to="/terms">Terms</Link> and <Link to="/privacy">Privacy Policy</Link>.</span></label>
              <button className="btn btn-main" type="submit">Create account</button>
            </form>
            <p className="note">Already registered? <Link to="/login">Log in</Link>.</p>
          </div>
        </div>
      </main>
    </>
  );
}
