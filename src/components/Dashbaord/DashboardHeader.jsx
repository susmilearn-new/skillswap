
import { useState } from "react";
import { useLocation } from "react-router-dom";

import { useAuthStore } from "../../store/authStore";

import DesktopNav from "./DesktopNav";
import DashboardActions from "./DashboardActions";
import MobileMenu from "./MobileMenu";

const DashboardHeader = ({
  isSavedActive,
  onSavedClick,
  onSwapRequestsClick,
  onLogout,
}) => {
  const { currentUser, savedUserIds } = useAuthStore();

  const location = useLocation();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const name =
    currentUser?.firstName ||
    currentUser?.fullName ||
    currentUser?.name ||
    "User";

  const email = currentUser?.email || "user@skillswap.com";

  const initials = name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <header className="relative z-20 border-b border-[#e5e1dc] bg-[#f8f7f4]">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="flex h-16 items-center justify-between">

          <a
            href="/dashboard"
            className="text-2xl font-bold text-[#26105f]"
          >
            SkillSwap
          </a>

          <DesktopNav
            pathname={location.pathname}
            isSavedActive={isSavedActive}
          />

          <DashboardActions
            name={name}
            email={email}
            initials={initials}
            savedCount={savedUserIds?.length || 0}
            isSavedActive={isSavedActive}
            onSavedClick={onSavedClick}
            onSwapRequestsClick={onSwapRequestsClick}
            onLogout={onLogout}
          />

          <MobileMenu
            open={mobileMenuOpen}
            setOpen={setMobileMenuOpen}
            name={name}
            email={email}
            initials={initials}
            savedCount={savedUserIds?.length || 0}
            pathname={location.pathname}
            isSavedActive={isSavedActive}
            onSavedClick={onSavedClick}
            onSwapRequestsClick={onSwapRequestsClick}
            onLogout={onLogout}
          />

        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
