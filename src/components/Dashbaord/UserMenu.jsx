import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronDown,
  LogOut,
  User,
} from "lucide-react";

const UserMenu = ({
  name,
  email,
  initials,
  onLogout,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  return (
    <div
      className="relative"
      ref={dropdownRef}
    >
      {/* Avatar Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="group flex items-center gap-1.5 focus:outline-none"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#7839ed] text-sm font-semibold text-white shadow-sm transition group-hover:opacity-90">
          {initials}
        </div>

        <ChevronDown
          size={16}
          className={`text-[#6b6290] transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 z-50 mt-2 w-56 rounded-2xl border border-[#e5e1dc] bg-white py-2 shadow-lg">

          {/* User information */}
          <div className="border-b border-[#f0ebf8] px-4 py-2">
            <p className="truncate text-sm font-bold text-[#26105f]">
              {name}
            </p>

            <p className="truncate text-xs text-[#6b6290]">
              {email}
            </p>
          </div>

          {/* Profile */}
          <Link
            to="/profile"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-[#26105f] transition hover:bg-[#f0ebf8]"
          >
            <User
              size={16}
              className="text-[#7839ed]"
            />

            Edit Profile
          </Link>

          {/* Logout */}
          <button
            onClick={() => {
              setIsOpen(false);
              onLogout();
            }}
            className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm font-medium text-red-600 transition hover:bg-red-50"
          >
            <LogOut
              size={16}
              className="text-red-500"
            />

            Logout
          </button>

        </div>
      )}
    </div>
  );
};

export default UserMenu;