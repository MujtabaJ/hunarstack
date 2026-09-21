import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Protected({ allow }) {
  const { user } = useAuth();
  const loc = useLocation();
  if (!user) return <Navigate to="/login" replace state={{ from: loc.pathname }} />;
  if (allow && !allow.includes(user.role)) return <Navigate to="/app" replace />;
  return <Outlet />;
}

export function Role({ allow, children }) {
  const { user } = useAuth();
  if (!allow.includes(user.role)) return <Navigate to="/app" replace />;
  return children;
}
