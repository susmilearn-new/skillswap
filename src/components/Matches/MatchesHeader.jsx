const MatchesHeader = ({
  currentUserName,
  matchesCount,
}) => {
  return (
    <div className="mb-8">
      <h1 className="mb-1 font-fraunces text-3xl font-bold text-[#26105f]">
        Your Skill Matches
      </h1>

      <p className="text-sm text-[#6b6290]">
        Matched as{" "}
        <span className="font-bold text-[#26105f]">
          {currentUserName}
        </span>{" "}
        — showing {matchesCount} matching peers.
      </p>
    </div>
  );
};

export default MatchesHeader;