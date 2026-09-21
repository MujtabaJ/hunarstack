import { createContext, useContext, useMemo, useState } from "react";
import { findUser, getState, registerUser, updateUser } from "../lib/store";

const SESSION = "hunarstack_session_v1";
const AuthContext = createContext(null);

function readSession() {
  const id = localStorage.getItem(SESSION);
  if (!id) return null;
  return getState().users.find((u) => u.id === id) || null;
}

function publicUser(user) {
  if (!user) return null;
  const { password, ...safe } = user;
  return safe;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => publicUser(readSession()));

  const api = useMemo(
    () => ({
      user,
      login(email, password) {
        const found = findUser(email);
        if (!found || found.password !== password) {
          throw new Error("Email or password is incorrect.");
        }
        localStorage.setItem(SESSION, found.id);
        setUser(publicUser(found));
        return publicUser(found);
      },
      register(payload) {
        const created = registerUser({ ...payload, role: "student" });
        localStorage.setItem(SESSION, created.id);
        setUser(publicUser(created));
        return publicUser(created);
      },
      logout() {
        localStorage.removeItem(SESSION);
        setUser(null);
      },
      refresh() {
        setUser(publicUser(readSession()));
      },
      saveProfile(patch) {
        if (!user) throw new Error("Not signed in.");
        const next = updateUser(user.id, patch);
        setUser(publicUser(next));
        return publicUser(next);
      },
    }),
    [user]
  );

  return <AuthContext.Provider value={api}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
