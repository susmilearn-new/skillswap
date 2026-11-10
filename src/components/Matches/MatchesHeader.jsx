const MatchesHeader = ({
  currentUserName,
  matchesCount,
}) => {
  return (
    <div className="mb-8">
      <h1 className="mb-1 font-fraunces text-3xl font-bold text-[#26105f]">
        Your Skill Matches
      </h1>

      <h2 className="mb-2 font-semibold text-[#32106f]">
        ✨ AI-Powered Matching
      </h2>

      <p className="mb-1 text-sm text-[#6b6290]">
        Our intelligent matching system analyses your teaching and learning
        interests to identify compatible members and meaningful skill-exchange opportunities.
      </p>

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