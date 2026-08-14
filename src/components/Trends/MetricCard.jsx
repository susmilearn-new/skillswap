const MetricCard = ({
  icon: Icon,
  iconBg,
  value,
  description,
}) => {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-[#e5e1dc] bg-white p-6 shadow-sm">

      <div
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${iconBg} text-white`}
      >
        <Icon size={22} />
      </div>

      <div>
        <div className="text-2xl font-bold text-[#26105f]">
          {value}
        </div>

        <p className="text-xs font-medium text-[#6b6290]">
          {description}
        </p>
      </div>

    </div>
  );
};

export default MetricCard;