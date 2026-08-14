import { useState, useMemo } from "react";
import { users } from "../../data/users";
import { useAuthStore } from "../../store/authStore";

import MatchesHeader from "../../components/Matches/MatchesHeader";
import MatchCard from "../../components/Matches/MatchCard";
import EmptyMatches from "../../components/Matches/EmptyMatches";
import RequestModal from "../../components/Matches/RequestModal";

const Matches = () => {
  const { currentUser } = useAuthStore();

  const currentUserId = currentUser?.id;

  const currentUserName =
    currentUser?.firstName ||
    currentUser?.fullName ||
    currentUser?.name ||
    "User";

  const userFirstName = currentUserName.split(" ")[0];

  const currentUserInitials = currentUserName
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

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

  const matches = useMemo(() => {
    const mySkillsToTeach = currentUser?.skillsToTeach || [];
    const mySkillsToLearn = currentUser?.skillsToLearn || [];

    if (!mySkillsToTeach.length && !mySkillsToLearn.length) {
      return [];
    }

    return users
      .filter((user) => user.id !== currentUserId)
      .map((user) => {
        const userTeaches = mySkillsToTeach.filter((skill) =>
          (user.skillsToLearn || []).some(
            (s) => s.toLowerCase() === skill.toLowerCase()
          )
        );

        const matchTeaches = (user.skillsToTeach || []).filter((skill) =>
          mySkillsToLearn.some(
            (s) => s.toLowerCase() === skill.toLowerCase()
          )
        );

        const totalMatches =
          userTeaches.length + matchTeaches.length;

        let matchPercentage = 50;
        let scoreLabel = "Good";

        if (totalMatches >= 2) {
          matchPercentage = 85;
          scoreLabel = "Great";
        } else if (totalMatches === 1) {
          matchPercentage = 60;
          scoreLabel = "Good";
        }

        const initials = (user.name || "User")
          .split(" ")
          .map((word) => word[0])
          .join("")
          .slice(0, 2)
          .toUpperCase();

        return {
          id: user.id,
          name: user.name,
          initials,
          avatarBg: getAvatarBg(user.name || "User"),
          matchScore: `${scoreLabel} — ${matchPercentage}%`,
          scoreValue: matchPercentage,
          userTeaches,
          matchTeaches,
          totalMatches,
        };
      })
      .filter((match) => match.totalMatches > 0)
      .sort((a, b) => b.scoreValue - a.scoreValue);
  }, [currentUser, currentUserId]);

  const handleSendRequest = (matchId) => {
    setRequestSentIds((prev) => [...prev, matchId]);
    setActiveModalMatch(null);
  };

  return (
    <div className="mx-auto max-w-[1400px] px-6 py-8">

      <MatchesHeader
        currentUserName={currentUserName}
        matchesCount={matches.length}
      />

      {matches.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {matches.map((match) => (
            <MatchCard
              key={match.id}
              match={match}
              currentUserName={currentUserName}
              currentUserInitials={currentUserInitials}
              userFirstName={userFirstName}
              isRequestSent={requestSentIds.includes(match.id)}
              onSendRequest={() => setActiveModalMatch(match)}
            />
          ))}
        </div>
      ) : (
        <EmptyMatches />
      )}

      {activeModalMatch && (
        <RequestModal
          match={activeModalMatch}
          onCancel={() => setActiveModalMatch(null)}
          onConfirm={() =>
            handleSendRequest(activeModalMatch.id)
          }
        />
      )}
    </div>
  );
};

export default Matches;