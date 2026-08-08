import { NavLink } from "react-router-dom";

const Sidebar = ({ menuItems }) => {
  return (
    <aside className="w-64 min-h-screen bg-white border-r">
      <div className="p-6">
        <h2 className="text-2xl font-bold">SkillSwap</h2>
      </div>

      <nav className="px-4">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `block px-4 py-3 rounded-lg mb-2 ${
                isActive
                  ? "bg-indigo-600 text-white"
                  : "hover:bg-gray-100"
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar