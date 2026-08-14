import { Link } from "react-router-dom";

const DesktopNav = ({ pathname, isSavedActive }) => {

  const getNavLinkClass = (isActive) =>
    `px-5 py-2 rounded-full text-sm font-medium transition ${
      isActive
        ? "bg-white text-[#26105f] shadow-sm"
        : "text-[#6b6290] hover:text-[#26105f]"
    }`;

  return (
    <nav className="hidden items-center rounded-full bg-[#eee9f8] p-1 lg:flex">

      <Link
        to="/dashboard"
        className={getNavLinkClass(
          pathname === "/dashboard" && !isSavedActive
        )}
      >
        Browse
      </Link>

      <Link
        to="/matches"
        className={getNavLinkClass(
          pathname === "/matches"
        )}
      >
        Matches
      </Link>

      <Link
        to="/trends"
        className={getNavLinkClass(
          pathname === "/trends"
        )}
      >
        Trends
      </Link>

    </nav>
  );
};

export default DesktopNav;