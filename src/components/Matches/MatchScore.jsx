const MatchScore = ({ score }) => {
  return (
    <div className="mb-6 flex items-center justify-between">
      <span className="text-[11px] font-bold uppercase tracking-wider text-[#6b6290]">
        Match Score
      </span>

      <span className="rounded-full bg-[#fef3c7] px-3 py-1 text-xs font-semibold text-[#92400e]">
        {score}
      </span>
    </div>
  );
};

export default MatchScore;