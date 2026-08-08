import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const currentUser = JSON.parse(
    localStorage.getItem("currentUser")
  );

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute