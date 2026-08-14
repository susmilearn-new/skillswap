import MatchScore from "./MatchScore";
import MatchUsers from "./MatchUsers";
import SkillExchange from "./SkillExchange";
import RequestButton from "./RequestButton";

const MatchCard = ({
  match,
  currentUserName,
  currentUserInitials,
  userFirstName,
  isRequestSent,
  onSendRequest,
}) => {
  const matchFirstName = match.name.split(" ")[0];

  return (
    <div className="flex flex-col justify-between rounded-2xl border border-[#e5e1dc] bg-white p-6 shadow-sm transition-shadow hover:shadow-md">

      <div>

        <MatchScore score={match.matchScore} />

        <MatchUsers
          currentUserName={currentUserName}
          currentUserInitials={currentUserInitials}
          match={match}
        />

        <SkillExchange
          userFirstName={userFirstName}
          matchFirstName={matchFirstName}
          userTeaches={match.userTeaches}
          matchTeaches={match.matchTeaches}
        />

      </div>

      <RequestButton
        isRequestSent={isRequestSent}
        onClick={onSendRequest}
      />

    </div>
  );
};

export default MatchCard;