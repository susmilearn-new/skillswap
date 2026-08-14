const ChartLegend = () => {
  return (
    <div className="mt-4 flex items-center justify-center gap-6 text-xs font-semibold text-[#6b6290]">

      <span className="flex items-center gap-1.5">
        <span className="h-3 w-3 rounded-sm bg-[#26105f]" />
        Demand
      </span>

      <span className="flex items-center gap-1.5">
        <span className="h-3 w-3 rounded-sm bg-[#e5e1dc]" />
        Supply
      </span>

    </div>
  );
};

export default ChartLegend;