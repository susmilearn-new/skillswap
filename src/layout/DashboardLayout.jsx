import React, { useState, useRef, useEffect } from "react";
import { Outlet, Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Bookmark, User, LogOut, ChevronDown } from "lucide-react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useAuthStore } from "../store/authStore";

const DashboardLayout = () => {
  const { currentUser, savedUserIds, logout } = useAuthStore();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // UI States
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Ref to detect clicks outside dropdown
  const dropdownRef = useRef(null);

  const isSavedActive = searchParams.get("saved") === "true";

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getNavLinkClass = (isActive) =>
    `px-5 py-2 rounded-full text-sm font-medium transition ${
      isActive
        ? "bg-white text-[#26105f] shadow-sm"
        : "text-[#6b6290] hover:text-[#26105f]"
    }`;

  const name =
    currentUser?.firstName || currentUser?.fullName || currentUser?.name || "User";

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

  const handleConfirmLogout = () => {
    if (typeof logout === "function") {
      logout();
    }
    setShowLogoutModal(false);
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#f8f7f4]">
      {/* Dashboard Header */}
      <header className="border-b border-[#e5e1dc] bg-[#f8f7f4] relative z-20">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link to="/dashboard" className="text-2xl font-bold text-[#26105f]">
              SkillSwap
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden items-center bg-[#eee9f8] rounded-full p-1 lg:flex">
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

            {/* Desktop Actions */}
            <div className="hidden items-center gap-4 lg:flex">
              <button
                onClick={handleSavedClick}
                className={`flex items-center gap-2 border rounded-full px-4 py-2 text-sm font-medium transition ${
                  isSavedActive
                    ? "border-orange-500 bg-orange-50 text-orange-600"
                    : "border-[#ddd7d0] text-[#6b6290] bg-white hover:border-[#26105f]"
                }`}
              >
                <Bookmark
                  size={16}
                  className={isSavedActive ? "fill-orange-500" : ""}
                />
                <span>Saved</span>

                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-orange-500 text-white text-xs font-bold">
                  {savedUserIds?.length || 0}
                </span>
              </button>

              {/* Avatar & Dropdown Menu */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen((prev) => !prev)}
                  className="flex items-center gap-1.5 focus:outline-none group"
                >
                  <div className="w-10 h-10 rounded-full bg-[#7839ed] text-white flex items-center justify-center text-sm font-semibold shadow-sm group-hover:opacity-90 transition">
                    {initials}
                  </div>
                  <ChevronDown
                    size={16}
                    className={`text-[#6b6290] transition-transform duration-200 ${
                      isDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Dropdown Card */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-lg border border-[#e5e1dc] py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="px-4 py-2 border-b border-[#f0ebf8]">
                      <p className="text-sm font-bold text-[#26105f] truncate">
                        {name}
                      </p>
                      <p className="text-xs text-[#6b6290] truncate">
                        {currentUser?.email || "user@skillswap.com"}
                      </p>
                    </div>

                    <Link
                      to="/profile"
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-[#26105f] hover:bg-[#f0ebf8] transition font-medium"
                    >
                      <User size={16} className="text-[#7839ed]" />
                      Edit Profile
                    </Link>

                    <button
                      onClick={() => {
                        setIsDropdownOpen(false);
                        setShowLogoutModal(true);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition font-medium"
                    >
                      <LogOut size={16} className="text-red-500" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-lg p-2 text-[#26105f] lg:hidden focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Mobile Menu Drawer */}
          {mobileMenuOpen && (
            <div className="border-t border-[#e5e1dc] py-5 lg:hidden animate-in fade-in duration-150">
              {/* User Info Header on Mobile */}
              <div className="flex items-center gap-3 px-2 pb-4 mb-3 border-b border-[#e5e1dc]">
                <div className="w-10 h-10 rounded-full bg-[#7839ed] text-white flex items-center justify-center text-sm font-semibold shadow-sm shrink-0">
                  {initials}
                </div>
                <div className="truncate">
                  <p className="text-sm font-bold text-[#26105f] truncate">
                    {name}
                  </p>
                  <p className="text-xs text-[#6b6290] truncate">
                    {currentUser?.email || "user@skillswap.com"}
                  </p>
                </div>
              </div>

              {/* Mobile Navigation Links */}
              <div className="flex flex-col gap-2">
                <Link
                  to="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-medium transition ${
                    location.pathname === "/dashboard" && !isSavedActive
                      ? "bg-[#eee9f8] text-[#26105f]"
                      : "text-[#6b6290] hover:bg-gray-100"
                  }`}
                >
                  Browse
                </Link>

                <Link
                  to="/matches"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-medium transition ${
                    location.pathname === "/matches"
                      ? "bg-[#eee9f8] text-[#26105f]"
                      : "text-[#6b6290] hover:bg-gray-100"
                  }`}
                >
                  Matches
                </Link>

                <Link
                  to="/trends"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-medium transition ${
                    location.pathname === "/trends"
                      ? "bg-[#eee9f8] text-[#26105f]"
                      : "text-[#6b6290] hover:bg-gray-100"
                  }`}
                >
                  Trends
                </Link>

                {/* Saved Action */}
                <button
                  onClick={() => {
                    handleSavedClick();
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium transition ${
                    isSavedActive
                      ? "bg-orange-50 text-orange-600 border border-orange-200"
                      : "text-[#6b6290] hover:bg-gray-100"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Bookmark
                      size={16}
                      className={isSavedActive ? "fill-orange-500 text-orange-500" : ""}
                    />
                    <span>Saved Items</span>
                  </div>
                  <span className="flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full bg-orange-500 text-white text-xs font-bold">
                    {savedUserIds?.length || 0}
                  </span>
                </button>

                {/* Profile & Logout Links */}
                <div className="border-t border-[#e5e1dc] pt-2 mt-1 flex flex-col gap-1">
                  <Link
                    to="/profile"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-[#26105f] hover:bg-[#f0ebf8] rounded-xl transition"
                  >
                    <User size={16} className="text-[#7839ed]" />
                    Edit Profile
                  </Link>

                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setShowLogoutModal(true);
                    }}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-xl transition w-full text-left"
                  >
                    <LogOut size={16} className="text-red-500" />
                    Logout
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Dashboard content */}
      <main>
        <Outlet />
      </main>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl border border-[#e5e1dc] space-y-4">
            <h3 className="text-lg font-bold text-[#26105f]">
              Confirm Logout
            </h3>
            <p className="text-sm text-[#6b6290]">
              Are you sure you want to log out of your account?
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 rounded-full border border-[#ddd7d0] text-sm font-medium text-[#6b6290] hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmLogout}
                className="px-4 py-2 rounded-full bg-red-600 text-white text-sm font-medium hover:bg-red-700 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;