import { Route, Routes } from "react-router-dom";

import MainLayout from "./layout/MainLayout";
import DashboardLayout from "./layout/DashboardLayout";

import LandingPage from "./pages/Landing/LandingPage";
import LoginPage from "./pages/Auth/LoginPage";
import RegisterPage from "./pages/Auth/RegisterPage";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import Dashboard from "./pages/Dashboard/Dashboard";

import ProtectedRoute from "./components/Common/ProtectedRoute";
import Matches from "./pages/Dashboard/Matches";
import Trends from "./pages/Dashboard/Trends";
import Profile from "./pages/Dashboard/Profile";

const AppRoutes = () => {
  return (
    <Routes>

      {/* Public */}
      <Route element={<MainLayout />}>
        <Route index element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Route>

      {/* Protected */}
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/matches" element={<Matches />} />
          <Route path="/trends" element={<Trends />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Route>

    </Routes>
  );
};

export default AppRoutes;