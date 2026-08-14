import { Link } from "react-router-dom";
import {
  Bookmark,
  LogOut,
  User,
} from "lucide-react";
import {
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const MobileMenu = ({
  open,
  setOpen,
  name,
  email,
  initials,
  savedCount,
  pathname,
  isSavedActive,
  onSavedClick,
  onLogout,
}) => {
  const getMobileLinkClass = (active) =>
    `rounded-xl px-4 py-2.5 text-sm font-medium transition ${
      active
        ? "bg-[#eee9f8] text-[#26105f]"
        : "text-[#6b6290] hover:bg-gray-100"
    }`;

  return (
    <div className="lg:hidden">

      {/* Menu button */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="rounded-lg p-2 text-[#26105f] focus:outline-none"
        aria-label="Toggle menu"
      >
        {open ? (
          <XMarkIcon className="h-6 w-6" />
        ) : (
          <Bars3Icon className="h-6 w-6" />
        )}
      </button>

      {/* Menu */}
      {open && (
        <div className="absolute left-0 right-0 top-16 border-t border-[#e5e1dc] bg-[#f8f7f4] px-6 py-5 animate-in fade-in duration-150">

          {/* User */}
          <div className="mb-3 flex items-center gap-3 border-b border-[#e5e1dc] px-2 pb-4">

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#7839ed] text-sm font-semibold text-white shadow-sm">
              {initials}
            </div>

            <div className="truncate">
              <p className="truncate text-sm font-bold text-[#26105f]">
                {name}
              </p>

              <p className="truncate text-xs text-[#6b6290]">
                {email}
              </p>
            </div>

          </div>

          {/* Navigation */}
          <div className="flex flex-col gap-2">

            <Link
              to="/dashboard"
              onClick={() => setOpen(false)}
              className={getMobileLinkClass(
                pathname === "/dashboard" &&
                !isSavedActive
              )}
            >
              Browse
            </Link>

            <Link
              to="/matches"
              onClick={() => setOpen(false)}
              className={getMobileLinkClass(
                pathname === "/matches"
              )}
            >
              Matches
            </Link>

            <Link
              to="/trends"
              onClick={() => setOpen(false)}
              className={getMobileLinkClass(
                pathname === "/trends"
              )}
            >
              Trends
            </Link>

            {/* Saved */}
            <button
              onClick={() => {
                onSavedClick();
                setOpen(false);
              }}
              className={`flex items-center justify-between rounded-xl px-4 py-2.5 text-sm font-medium transition ${
                isSavedActive
                  ? "border border-orange-200 bg-orange-50 text-orange-600"
                  : "text-[#6b6290] hover:bg-gray-100"
              }`}
            >
              <div className="flex items-center gap-2">
                <Bookmark
                  size={16}
                  className={
                    isSavedActive
                      ? "fill-orange-500 text-orange-500"
                      : ""
                  }
                />

                Saved Items
              </div>

              <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-orange-500 px-1.5 text-xs font-bold text-white">
                {savedCount}
              </span>
            </button>

            {/* Profile + Logout */}
            <div className="mt-1 flex flex-col gap-1 border-t border-[#e5e1dc] pt-2">

              <Link
                to="/profile"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-[#26105f] transition hover:bg-[#f0ebf8]"
              >
                <User
                  size={16}
                  className="text-[#7839ed]"
                />

                Edit Profile
              </Link>

              <button
                onClick={() => {
                  setOpen(false);
                  onLogout();
                }}
                className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-left text-sm font-medium text-red-600 transition hover:bg-red-50"
              >
                <LogOut
                  size={16}
                  className="text-red-500"
                />

                Logout
              </button>

            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default MobileMenu;