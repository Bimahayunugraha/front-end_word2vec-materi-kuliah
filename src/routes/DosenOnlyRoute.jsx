import { Navigate, Outlet } from "react-router-dom";
import Auth from "../utils/auth";

export default function DosenOnlyRoute() {
  let userInfo = Auth.getUser();
  const user = JSON.parse(userInfo);

  if (user.role !== "dosen") {
    return <Navigate to="/dashboard" replace />;
  }
  return <Outlet />;
}
