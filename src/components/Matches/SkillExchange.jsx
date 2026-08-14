const SkillBox = ({
  title,
  skills,
  type = "purple",
}) => {
  const isPurple = type === "purple";

  return (
    <div
      className={`min-h-[72px] rounded-xl p-3 ${
        isPurple
          ? "bg-[#f0ebf8]"
          : "bg-[#fffbeb]"
      }`}
    >
      <span
        className={`mb-1 block text-xs font-semibold ${
          isPurple
            ? "text-[#26105f]"
            : "text-[#92400e]"
        }`}
      >
        {title}
      </span>

      {skills.length > 0 ? (
        skills.map((skill, index) => (
          <span
            key={`${skill}-${index}`}
            className={`block text-xs ${
              isPurple
                ? "text-[#6b6290]"
                : "text-[#b45309]"
            }`}
          >
            → {skill}
          </span>
        ))
      ) : (
        <span
          className={`text-xs italic ${
            isPurple
              ? "text-[#9b93be]"
              : "text-[#d97706]/60"
          }`}
        >
          —
        </span>
      )}
    </div>
  );
};

const SkillExchange = ({
  userFirstName,
  matchFirstName,
  userTeaches,
  matchTeaches,
}) => {
  return (
    <div className="mb-6 grid grid-cols-2 gap-3">

      <SkillBox
        title={`${userFirstName} teaches:`}
        skills={userTeaches}
        type="purple"
      />

      <SkillBox
        title={`${matchFirstName} teaches:`}
        skills={matchTeaches}
        type="orange"
      />

    </div>
  );
};

export default SkillExchange;