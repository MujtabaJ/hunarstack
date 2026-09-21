import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

export default function Profile() {
  const { user, saveProfile } = useAuth();
  const [ok, setOk] = useState("");
  const [error, setError] = useState("");

  function onSubmit(e) {
    e.preventDefault();
    setError("");
    const data = Object.fromEntries(new FormData(e.target));
    if (data.password && data.password !== data.confirm) {
      setError("Passwords do not match.");
      return;
    }
    saveProfile({
      name: data.name,
      city: data.city,
      bio: data.bio,
      password: data.password || undefined,
    });
    e.target.password.value = "";
    e.target.confirm.value = "";
    setOk("Saved.");
  }

  return (
    <>
      <div className="dash-top">
        <div>
          <p className="kicker">Account</p>
          <h1>Your profile</h1>
        </div>
        <span className={`role-pill ${user.role}`}>{user.role}</span>
      </div>
      <div className="panel" style={{ maxWidth: 560 }}>
        {ok && <p className="form-ok">{ok}</p>}
        {error && <p className="form-error">{error}</p>}
        <form onSubmit={onSubmit}>
          <label>Name<input name="name" defaultValue={user.name} required /></label>
          <label>Email<input value={user.email} disabled /></label>
          <label>City<input name="city" defaultValue={user.city || ""} /></label>
          <label>Bio<textarea name="bio" defaultValue={user.bio || ""} /></label>
          <label>New password<input name="password" type="password" placeholder="Leave blank to keep" /></label>
          <label>Confirm password<input name="confirm" type="password" /></label>
          <button className="btn btn-main" type="submit">Save</button>
        </form>
      </div>
    </>
  );
}
