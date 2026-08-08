import Sidebar from "../components/Layout/Sidebar";
import DashboardHeader from "../components/Layout/DashboardHeader";

const DashboardLayout = ({
  children,
  menuItems,
  user,
}) => {

 
  return (
    <div className="flex">

      <Sidebar menuItems={menuItems} />

      <main className="flex-1 p-8 bg-gray-100 min-h-screen">

        <DashboardHeader user={user} />

        {children}

      </main>

    </div>
  );
};

export default DashboardLayout;