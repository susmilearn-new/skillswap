import { ArrowRight } from "lucide-react";

const badges = [
  {
    label: "High demand",
    bg: "bg-[#26105f]",
  },
  {
    label: "Fast growing",
    bg: "bg-orange-500",
  },
  {
    label: "Community favorite",
    bg: "bg-emerald-500",
  },
];

const RecommendationItem = ({
  skill,
  index,
}) => {
  const badge =
    badges[index % badges.length];

  return (
    <div className="flex flex-wrap items-center gap-3 rounded-2xl bg-[#f0ebf8] p-4">

      <span
        className={`${badge.bg} rounded-full px-3 py-1 text-[11px] font-bold text-white`}
      >
        {badge.label}
      </span>

      <div className="flex items-center gap-2 text-xs font-bold text-[#26105f]">

        <span>
          {skill} Basics
        </span>

        <ArrowRight
          size={14}
          className="text-[#6b6290]"
        />

        <span>
          {skill} Intermediate
        </span>

        <ArrowRight
          size={14}
          className="text-[#6b6290]"
        />

        <span>
          {skill} Masterclass
        </span>

      </div>

    </div>
  );
};

export default RecommendationItem;