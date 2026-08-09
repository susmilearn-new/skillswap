import { useState, useMemo } from "react";
import { Zap, CheckCircle2, X } from "lucide-react";
import { users } from "../../data/users";
import { useAuthStore } from "../../store/authStore";

const Matches = () => {
  const { currentUser } = useAuthStore();

  const currentUserId = currentUser?.id;
  const currentUserName =
    currentUser?.firstName ||
    currentUser?.fullName ||
    currentUser?.name ||
    "Sarah Chen";

  const userSkillsToTeach = currentUser?.skillsToTeach || ["Python", "React"];
  const userSkillsToLearn = currentUser?.skillsToLearn || ["Guitar", "UI Design"];

  const currentUserInitials = currentUserName
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const userFirstName = currentUserName.split(" ")[0];

  const [requestSentIds, setRequestSentIds] = useState([]);
  const [activeModalMatch, setActiveModalMatch] = useState(null);

  const getAvatarBg = (name) => {
    const colors = [
      "bg-orange-500",
      "bg-emerald-500",
      "bg-pink-500",
      "bg-blue-500",
      "bg-purple-600",
      "bg-teal-500",
    ];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  // Filter ONLY users who have a valid skill match
  const matches = useMemo(() => {
    return users
      .filter((user) => user.id !== currentUserId) // Exclude current user
      .map((user) => {
        // 1. What current user teaches that target user wants to learn
        const userTeaches = userSkillsToTeach.filter((skill) =>
          user.skillsToLearn.some(
            (s) => s.toLowerCase() === skill.toLowerCase()
          )
        );

        // 2. What target user teaches that current user wants to learn
        const matchTeaches = user.skillsToTeach.filter((skill) =>
          userSkillsToLearn.some(
            (s) => s.toLowerCase() === skill.toLowerCase()
          )
        );

        const totalMatches = userTeaches.length + matchTeaches.length;

        let matchPercentage = 50;
        let scoreLabel = "Good";

        if (totalMatches >= 2) {
          matchPercentage = 85;
          scoreLabel = "Great";
        } else if (totalMatches === 1) {
          matchPercentage = 60;
          scoreLabel = "Good";
        }

        const initials = user.name
          .split(" ")
          .map((w) => w[0])
          .join("")
          .slice(0, 2)
          .toUpperCase();

        return {
          id: user.id,
          name: user.name,
          initials,
          avatarBg: getAvatarBg(user.name),
          matchScore: `${scoreLabel} — ${matchPercentage}%`,
          scoreValue: matchPercentage,
          userTeaches,
          matchTeaches,
          totalMatches,
        };
      })
      // CRITICAL STEP: Keep ONLY users with at least 1 skill overlap
      .filter((match) => match.totalMatches > 0)
      .sort((a, b) => b.scoreValue - a.scoreValue);
  }, [currentUserId, userSkillsToTeach, userSkillsToLearn]);

  const handleSendRequest = (matchId) => {
    setRequestSentIds((prev) => [...prev, matchId]);
    setActiveModalMatch(null);
  };

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#26105f] font-fraunces mb-1">
          Your Skill Matches
        </h1>
        <p className="text-sm text-[#6b6290]">
          Matched as <span className="font-bold text-[#26105f]">{currentUserName}</span> — showing {matches.length} matching peers.
        </p>
      </div>

      {/* Render Matches or Empty State */}
      {matches.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {matches.map((match) => {
            const isRequestSent = requestSentIds.includes(match.id);
            const matchFirstName = match.name.split(" ")[0];

            return (
              <div
                key={match.id}
                className="bg-white border border-[#e5e1dc] rounded-2xl p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow"
              >
                <div>
                  {/* Score Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-[11px] font-bold text-[#6b6290] tracking-wider uppercase">
                      Match Score
                    </span>
                    <span className="bg-[#fef3c7] text-[#92400e] text-xs font-semibold px-3 py-1 rounded-full">
                      {match.matchScore}
                    </span>
                  </div>

                  {/* Avatar Comparison */}
                  <div className="flex items-center justify-between px-4 mb-6">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-14 h-14 rounded-full bg-[#7839ed] text-white font-bold flex items-center justify-center text-lg shadow-sm">
                        {currentUserInitials}
                      </div>
                      <span className="text-xs font-bold text-[#26105f]">
                        {currentUserName}
                      </span>
                    </div>

                    <div className="flex items-center justify-center text-orange-400">
                      <Zap size={20} className="fill-orange-400" />
                    </div>

                    <div className="flex flex-col items-center gap-2">
                      <div className={`w-14 h-14 rounded-full ${match.avatarBg} text-white font-bold flex items-center justify-center text-lg shadow-sm`}>
                        {match.initials}
                      </div>
                      <span className="text-xs font-bold text-[#26105f]">
                        {match.name}
                      </span>
                    </div>
                  </div>

                  {/* Exchange Boxes */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="bg-[#f0ebf8] rounded-xl p-3 min-h-[72px] flex flex-col justify-start">
                      <span className="text-xs font-semibold text-[#26105f] mb-1">
                        {userFirstName} teaches:
                      </span>
                      {match.userTeaches.length > 0 ? (
                        match.userTeaches.map((skill, i) => (
                          <span key={i} className="text-xs text-[#6b6290]">
                            → {skill}
                          </span>
                        ))
                      ) : (
                        <span className="text-xs text-[#9b93be] italic">—</span>
                      )}
                    </div>

                    <div className="bg-[#fffbeb] rounded-xl p-3 min-h-[72px] flex flex-col justify-start">
                      <span className="text-xs font-semibold text-[#92400e] mb-1">
                        {matchFirstName} teaches:
                      </span>
                      {match.matchTeaches.length > 0 ? (
                        match.matchTeaches.map((skill, i) => (
                          <span key={i} className="text-xs text-[#b45309]">
                            → {skill}
                          </span>
                        ))
                      ) : (
                        <span className="text-xs text-[#d97706]/60 italic">—</span>
                      )}
                    </div>
                  </div>
                </div>

                <button
                  disabled={isRequestSent}
                  onClick={() => setActiveModalMatch(match)}
                  className={`w-full py-3 rounded-xl text-xs font-semibold transition-all ${
                    isRequestSent
                      ? "bg-emerald-50 text-emerald-600 border border-emerald-200 cursor-default flex items-center justify-center gap-1.5"
                      : "bg-[#26105f] text-white hover:bg-[#32106f] shadow-sm"
                  }`}
                >
                  {isRequestSent ? (
                    <>
                      <CheckCircle2 size={14} /> Request Sent
                    </>
                  ) : (
                    "Send Exchange Request"
                  )}
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty state when no matches exist */
        <div className="bg-white border border-[#e5e1dc] rounded-2xl p-12 text-center">
          <p className="text-[#26105f] font-bold text-lg mb-1">
            No matches found right now
          </p>
          <p className="text-[#6b6290] text-sm">
            Try adding more skills to your profile to find matching learning partners!
          </p>
        </div>
      )}

      {/* Confirmation Modal */}
      {activeModalMatch && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setActiveModalMatch(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1 rounded-full"
            >
              <X size={18} />
            </button>
            <h3 className="text-lg font-bold text-[#26105f] mb-2">
              Send Exchange Request
            </h3>
            <p className="text-xs text-[#6b6290] mb-6">
              Send a skill swap request to <span className="font-semibold text-[#26105f]">{activeModalMatch.name}</span>?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setActiveModalMatch(null)}
                className="flex-1 py-2.5 border border-[#e5e1dc] rounded-xl text-xs font-semibold text-[#6b6290] hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleSendRequest(activeModalMatch.id)}
                className="flex-1 py-2.5 bg-[#26105f] text-white rounded-xl text-xs font-semibold hover:bg-[#32106f]"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Matches;