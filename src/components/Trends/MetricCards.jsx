import {
  Ribbon,
  Users,
  TrendingUp,
} from "lucide-react";

import MetricCard from "./MetricCard";

const MetricCards = ({
  totalCategories,
  totalLearners,
  totalSessions,
}) => {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">

      <MetricCard
        icon={Ribbon}
        iconBg="bg-[#26105f]"
        value={totalCategories}
        description="Skill Categories · Active on platform"
      />

      <MetricCard
        icon={Users}
        iconBg="bg-emerald-500"
        value={totalLearners.toLocaleString()}
        description="Active Learners · Registered Users"
      />

      <MetricCard
        icon={TrendingUp}
        iconBg="bg-orange-500"
        value={totalSessions.toLocaleString()}
        description="Sessions This Month · Across all skills"
      />

    </div>
  );
};

export default MetricCards;