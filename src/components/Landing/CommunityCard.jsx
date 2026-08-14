const CommunityCard = ({ person, index }) => {
  return (
    <div className="rounded-2xl border border-[#e4e0e8] bg-white px-6 py-6 shadow-sm">
      
      {/* User information */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">

          {/* Avatar */}
          <div
            className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-lg font-semibold text-white ${
              index === 0
                ? "bg-[#7138e8]"
                : index === 1
                ? "bg-[#ff7214]"
                : "bg-[#13b987]"
            }`}
          >
            {person.name
              .split(" ")
              .map((name) => name[0])
              .join("")
              .slice(0, 2)}
          </div>

          {/* Name + location */}
          <div>
            <h3 className="font-semibold text-[#24105c]">
              {person.name}
            </h3>

            <p className="text-sm text-[#6b5aa6]">
              {person.place}
            </p>
          </div>

        </div>
      </div>

      {/* Skills */}
      <div className="mt-5 flex flex-wrap gap-2">

        {/* Skills they teach */}
        {person.skillsToTeach.slice(0, 2).map((skill) => (
          <span
            key={`teach-${skill}`}
            className="rounded-full bg-[#eee8ff] px-3 py-1 text-xs font-medium text-[#32106f]"
          >
            ↑ {skill}
          </span>
        ))}

        {/* Skill they want to learn */}
        {person.skillsToLearn.slice(0, 1).map((skill) => (
          <span
            key={`learn-${skill}`}
            className="rounded-full border border-[#ffbd83] bg-[#fffaf5] px-3 py-1 text-xs font-medium text-[#e85d04]"
          >
            ↓ {skill}
          </span>
        ))}

      </div>

      {/* Rating + Sessions */}
      <div className="mt-5 flex items-center gap-2 text-sm">
        <span className="text-[#ffab00]">★</span>

        <span className="font-medium text-[#24105c]">
          {person.rating}
        </span>

        <span className="text-[#6b5aa6]">·</span>

        <span className="text-[#6b5aa6]">
          {person.sessions} sessions
        </span>
      </div>

    </div>
  );
};

export default CommunityCard;