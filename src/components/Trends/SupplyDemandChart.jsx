import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import ChartLegend from "./ChartLegend";

const SupplyDemandChart = ({ data }) => {
  return (
    <div className="rounded-2xl border border-[#e5e1dc] bg-white p-6 shadow-sm">

      <h2 className="text-lg font-bold text-[#26105f]">
        Supply vs. Demand Gap
      </h2>

      <p className="mb-6 text-xs text-[#6b6290]">
        Skills with high demand and low supply are the
        best opportunities
      </p>

      <div className="h-64 w-full">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <BarChart
            data={data}
            barCategoryGap="20%"
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#f0ebf8"
            />

            <XAxis
              dataKey="skill"
              stroke="#9b93be"
              fontSize={12}
              tickLine={false}
            />

            <YAxis
              stroke="#9b93be"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />

            <Tooltip />

            <Bar
              dataKey="Demand"
              fill="#26105f"
              radius={[6, 6, 0, 0]}
            />

            <Bar
              dataKey="Supply"
              fill="#e5e1dc"
              radius={[6, 6, 0, 0]}
            />

          </BarChart>
        </ResponsiveContainer>
      </div>

      <ChartLegend />

    </div>
  );
};

export default SupplyDemandChart;