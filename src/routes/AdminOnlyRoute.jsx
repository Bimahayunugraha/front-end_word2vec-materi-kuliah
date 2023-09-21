import { Navigate, Outlet } from "react-router-dom";
import Auth from "../utils/auth";

export default function AdminOnlyRoute() {
  const user = JSON.parse(Auth.getUser());
  if (user.role !== "admin") {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
}
