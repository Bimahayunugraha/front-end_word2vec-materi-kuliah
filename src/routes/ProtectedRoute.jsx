import { Navigate, Outlet } from "react-router-dom";
import Auth from "../utils/auth";

export default function ProtectedRoute() {
  const auth = Auth.isAuthorization();

  const userInfo = Auth.getUser();

  if (auth) {
    const user = JSON.parse(userInfo);
    if (user.role === "admin") {
      return <Navigate to="/dashboard" replace />;
    } else {
      return <Navigate to="/" replace />;
    }
  }
  return <Outlet />;
}
