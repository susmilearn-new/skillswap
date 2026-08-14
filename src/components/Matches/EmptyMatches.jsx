const EmptyMatches = () => {
  return (
    <div className="rounded-2xl border border-[#e5e1dc] bg-white p-12 text-center">

      <p className="mb-1 text-lg font-bold text-[#26105f]">
        No matches found right now
      </p>

      <p className="text-sm text-[#6b6290]">
        Try adding more skills to your profile to find matching
        learning partners!
      </p>

    </div>
  );
};

export default EmptyMatches;