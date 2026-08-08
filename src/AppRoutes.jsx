import { Route, Routes } from "react-router-dom";

import MainLayout from "./layout/MainLayout";

import LandingPage from "./pages/Landing/LandingPage";
import LoginPage from "./pages/Auth/LoginPage";
import RegisterPage from "./pages/Auth/RegisterPage";
import ForgotPassword from "./pages/Auth/ForgotPassword";

import Dashboard from "./pages/Dashboard/Dashboard";
import ProtectedRoute from "./components/Common/ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>

      {/* Public pages */}
      <Route element={<MainLayout />}>
        <Route index element={<LandingPage />} />

        <Route path="/login" element={<LoginPage />} />

        <Route path="/register" element={<RegisterPage />} />

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />
      </Route>


      {/* Protected pages */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>

    </Routes>
  );
};

export default AppRoutes