import { useState } from "react";
import { Outlet, useNavigate, useSearchParams } from "react-router-dom";

import { useAuthStore } from "../store/authStore";

import DashboardHeader from "../components/Dashbaord/DashboardHeader";
import LogoutModal from "../components/Dashbaord/LogoutModal";

const DashboardLayout = () => {
  const { logout } = useAuthStore();

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const isSavedActive = searchParams.get("saved") === "true";

  const handleSavedClick = () => {
    if (isSavedActive) {
      navigate("/dashboard");
    } else {
      navigate("/dashboard?saved=true");
    }
  };

  const handleConfirmLogout = () => {
    logout();

    setShowLogoutModal(false);

    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#f8f7f4]">

      <DashboardHeader
        isSavedActive={isSavedActive}
        onSavedClick={handleSavedClick}
        onLogout={() => setShowLogoutModal(true)}
      />

      <main>
        <Outlet />
      </main>

      {showLogoutModal && (
        <LogoutModal
          onCancel={() => setShowLogoutModal(false)}
          onConfirm={handleConfirmLogout}
        />
      )}

    </div>
  );
};

export default DashboardLayout;