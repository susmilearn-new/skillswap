import { useAuthStore } from "../../store/authStore";

const DashboardHeader = ({ user }) => {

  const { currentUser } = useAuthStore();

  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <p>{formattedDate}</p>

        <h2 className="text-3xl font-bold">
          Welcome back, {currentUser?.firstName}
        </h2>
      </div>

      <input
        type="text"
        placeholder="Search..."
        className="border rounded-lg px-4 py-2"
      />
    </div>
  );
};

export default DashboardHeader