import { Outlet, Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Bookmark } from "lucide-react";
import { useAuthStore } from "../store/authStore";

const DashboardLayout = () => {
  const { currentUser, savedUserIds } = useAuthStore();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const isSavedActive = searchParams.get("saved") === "true";

  const getNavLinkClass = (isActive) =>
    `px-5 py-2 rounded-full text-sm font-medium transition ${isActive
      ? "bg-white text-[#26105f] shadow-sm"
      : "text-[#6b6290] hover:text-[#26105f]"
    }`;

  const name = currentUser?.firstName || currentUser?.fullName || currentUser?.name || "User";

  const initials = name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const handleSavedClick = () => {
    if (isSavedActive) {
      navigate("/dashboard");
    } else {
      navigate("/dashboard?saved=true");
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f7f4]">
      {/* Dashboard Header */}
      <header className="border-b border-[#e5e1dc] bg-[#f8f7f4]">
        <div className="max-w-[1400px] mx-auto px-6 py-3 flex items-center justify-between">
          {/* Logo */}
          <Link to="/dashboard" className="text-2xl font-bold text-[#26105f]">
            SkillSwap
          </Link>

          {/* Navigation */}
          <nav className="flex items-center bg-[#eee9f8] rounded-full p-1">
            <Link
              to="/dashboard"
              className={getNavLinkClass(
                location.pathname === "/dashboard" && !isSavedActive
              )}
            >
              Browse
            </Link>

            <Link
              to="/matches"
              className={getNavLinkClass(location.pathname === "/matches")}
            >
              Matches
            </Link>

            <Link
              to="/trends"
              className={getNavLinkClass(location.pathname === "/trends")}
            >
              Trends
            </Link>
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-4">
            <button
              onClick={handleSavedClick}
              className={`flex items-center gap-2 border rounded-full px-4 py-2 text-sm font-medium transition ${isSavedActive
                ? "border-orange-500 bg-orange-50 text-orange-600"
                : "border-[#ddd7d0] text-[#6b6290] bg-white hover:border-[#26105f]"
                }`}
            >
              <Bookmark size={16} className={isSavedActive ? "fill-orange-500" : ""} />
              <span>Saved</span>

              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-orange-500 text-white text-xs font-bold">
                {savedUserIds.length}
              </span>
            </button>

            {/* Avatar */}
            <div className="w-10 h-10 rounded-full bg-[#7839ed] text-white flex items-center justify-center text-sm font-semibold">
              {initials}
            </div>
          </div>
        </div>
      </header>

      {/* Dashboard content */}
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;