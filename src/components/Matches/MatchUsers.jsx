import { Zap } from "lucide-react";

const MatchUsers = ({
  currentUserName,
  currentUserInitials,
  match,
}) => {
  return (
    <div className="mb-6 flex items-center justify-between px-4">

      {/* Current User */}
      <div className="flex flex-col items-center gap-2">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#7839ed] text-lg font-bold text-white shadow-sm">
          {currentUserInitials}
        </div>

        <span className="text-xs font-bold text-[#26105f]">
          {currentUserName}
        </span>
      </div>

      {/* Match Icon */}
      <div className="flex items-center justify-center text-orange-400">
        <Zap
          size={20}
          className="fill-orange-400"
        />
      </div>

      {/* Matched User */}
      <div className="flex flex-col items-center gap-2">
        <div
          className={`flex h-14 w-14 items-center justify-center rounded-full ${match.avatarBg} text-lg font-bold text-white shadow-sm`}
        >
          {match.initials}
        </div>

        <span className="text-xs font-bold text-[#26105f]">
          {match.name}
        </span>
      </div>

    </div>
  );
};

export default MatchUsers;