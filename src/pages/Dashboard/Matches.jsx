
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import { getMatches } from "../../api/matchApi";
import { useAuthStore } from "../../store/authStore";

import MatchesHeader from "../../components/Matches/MatchesHeader";
import MatchCard from "../../components/Matches/MatchCard";
import EmptyMatches from "../../components/Matches/EmptyMatches";
import RequestModal from "../../components/Matches/RequestModal";

const Matches = () => {
    const currentUser = useAuthStore((state) => state.currentUser);

    const currentUserName = currentUser?.name || "User";

    const userFirstName = currentUserName.split(" ")[0];

    const currentUserInitials = currentUserName
        .split(" ")
        .map((word) => word[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);

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

    // Fetch matches from backend
    useEffect(() => {
        const fetchMatches = async () => {
            try {
                setLoading(true);

                const response = await getMatches();

                const backendMatches = response.data.matches || [];

                const formattedMatches = backendMatches.map((user) => {
                    const name = user.name || "User";

                    const initials = name
                        .split(" ")
                        .map((word) => word[0])
                        .join("")
                        .slice(0, 2)
                        .toUpperCase();

                    const percentage = user.matchPercentage || 0;
                    const scoreLabel = user.scoreLabel || "Good";

                    return {
                        id: user.id,
                        name,
                        place: user.place,
                        description: user.description,
                        category: user.category,
                        skillsToTeach: user.skillsToTeach || [],
                        skillsToLearn: user.skillsToLearn || [],
                        initials,
                        avatarBg: getAvatarBg(name),
                        matchScore: `${scoreLabel} — ${percentage}%`,
                        scoreValue: percentage,
                        userTeaches: user.userTeaches || [],
                        matchTeaches: user.matchTeaches || [],
                        totalMatches: user.totalMatches || 0,
                    };
                });

                setMatches(formattedMatches);
            } catch (error) {
                toast.error(
                    error.response?.data?.message ||
                    "Failed to load matches"
                );
            } finally {
                setLoading(false);
            }
        };

        fetchMatches();
    }, []);

    const handleSendRequest = (matchId) => {
        setRequestSentIds((prev) => [...prev, String(matchId)]);
        setActiveModalMatch(null);
    };

    if (loading) {
        return (
            <div className="mx-auto max-w-[1400px] px-6 py-8">
                <p className="text-center text-gray-500">
                    Loading matches...
                </p>
            </div>
        );
    }

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
                            isRequestSent={requestSentIds.includes(
                                String(match.id)
                            )}
                            onSendRequest={() =>
                                setActiveModalMatch(match)
                            }
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
