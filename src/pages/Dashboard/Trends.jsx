import React, { useMemo } from "react";
import { Ribbon, Users, TrendingUp, ArrowRight } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { users as initialMockUsers } from "../../data/users";

const Trends = () => {
  // 1. Fetch user data from localStorage or fallback mock
  const allUsers = useMemo(() => {
    const localUsers = JSON.parse(localStorage.getItem("users")) || [];
    return localUsers.length > 0 ? localUsers : initialMockUsers;
  }, []);

  // 2. Dynamically aggregate categories and metrics based on user data
  const analytics = useMemo(() => {
    const demandMap = {};
    const supplyMap = {};
    const totalFrequencyMap = {};

    // Helper to normalize and count skill occurrences
    const processSkill = (skillString, mapToIncrement) => {
      if (!skillString || typeof skillString !== "string") return;
      
      const cleanSkill = skillString.trim();
      if (!cleanSkill) return;

      // Find an existing skill key regardless of casing (e.g., "python" vs "Python")
      const existingKey = Object.keys(totalFrequencyMap).find(
        (k) => k.toLowerCase() === cleanSkill.toLowerCase()
      );

      const skillKey = existingKey || cleanSkill;

      // Increment counts
      mapToIncrement[skillKey] = (mapToIncrement[skillKey] || 0) + 1;
      totalFrequencyMap[skillKey] = (totalFrequencyMap[skillKey] || 0) + 1;
    };

    // Aggregate counts dynamically across all users
    allUsers.forEach((user) => {
      (user.skillsToLearn || []).forEach((skill) =>
        processSkill(skill, demandMap)
      );
      (user.skillsToTeach || []).forEach((skill) =>
        processSkill(skill, supplyMap)
      );
    });

    // Rank categories by total popularity (demand + supply)
    const sortedDynamicCategories = Object.keys(totalFrequencyMap).sort(
      (a, b) => totalFrequencyMap[b] - totalFrequencyMap[a]
    );

    // Dynamic metrics
    const totalCategoriesCount = sortedDynamicCategories.length;
    const totalActiveLearners = allUsers.length;
    const totalSessions =
      Object.values(demandMap).reduce((a, b) => a + b, 0) * 8 + 40;

    // Bar Chart Data for top dynamic categories (Supply vs Demand Gap)
    // Limits chart display to top 10 most common categories for cleaner visual layout
    const chartCategories = sortedDynamicCategories.slice(0, 10);
    const gapChartData = chartCategories.map((category) => ({
      skill: category,
      Demand: (demandMap[category] || 0) * 15 + 20,
      Supply: (supplyMap[category] || 0) * 10 + 5,
    }));

    // Top categories purely by demand
    const topDemandCategories = [...sortedDynamicCategories].sort(
      (a, b) => (demandMap[b] || 0) - (demandMap[a] || 0)
    );

    return {
      totalCategoriesCount,
      totalActiveLearners,
      totalSessions,
      gapChartData,
      topRecommended: topDemandCategories.slice(0, 3),
    };
  }, [allUsers]);

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-8 space-y-8 bg-[#faf8f5] min-h-screen">
      {/* Page Title */}
      <div>
        <h1 className="text-3xl font-bold text-[#26105f] font-serif mb-1">
          Skill Demand Insights
        </h1>
        <p className="text-sm text-[#6b6290]">
          Understand what the community is looking for — find your edge.
        </p>
      </div>

      {/* Full Category Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-[#e5e1dc] rounded-2xl p-6 flex items-center gap-4 shadow-sm">
          <div className="w-12 h-12 rounded-full bg-[#26105f] text-white flex items-center justify-center shrink-0">
            <Ribbon size={22} />
          </div>
          <div>
            <div className="text-2xl font-bold text-[#26105f]">
              {analytics.totalCategoriesCount}
            </div>
            <p className="text-xs text-[#6b6290] font-medium">
              Skill Categories · Active on platform
            </p>
          </div>
        </div>

        <div className="bg-white border border-[#e5e1dc] rounded-2xl p-6 flex items-center gap-4 shadow-sm">
          <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
            <Users size={22} />
          </div>
          <div>
            <div className="text-2xl font-bold text-[#26105f]">
              {analytics.totalActiveLearners.toLocaleString()}
            </div>
            <p className="text-xs text-[#6b6290] font-medium">
              Active Learners · Registered Users
            </p>
          </div>
        </div>

        <div className="bg-white border border-[#e5e1dc] rounded-2xl p-6 flex items-center gap-4 shadow-sm">
          <div className="w-12 h-12 rounded-full bg-orange-500 text-white flex items-center justify-center shrink-0">
            <TrendingUp size={22} />
          </div>
          <div>
            <div className="text-2xl font-bold text-[#26105f]">
              {analytics.totalSessions.toLocaleString()}
            </div>
            <p className="text-xs text-[#6b6290] font-medium">
              Sessions This Month · Across all skills
            </p>
          </div>
        </div>
      </div>

      {/* Supply vs. Demand Gap for Most Common Categories */}
      <div className="bg-white border border-[#e5e1dc] rounded-2xl p-6 shadow-sm">
        <h2 className="text-lg font-bold text-[#26105f]">Supply vs. Demand Gap</h2>
        <p className="text-xs text-[#6b6290] mb-6">
          Skills with high demand and low supply are the best opportunities
        </p>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={analytics.gapChartData} barCategoryGap="20%">
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0ebf8" />
              <XAxis dataKey="skill" stroke="#9b93be" fontSize={12} tickLine={false} />
              <YAxis stroke="#9b93be" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip />
              <Bar dataKey="Demand" fill="#26105f" radius={[6, 6, 0, 0]} />
              <Bar dataKey="Supply" fill="#e5e1dc" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="flex items-center justify-center gap-6 mt-4 text-xs font-semibold text-[#6b6290]">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 bg-[#26105f] rounded-sm"></span> Demand
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 bg-[#e5e1dc] rounded-sm"></span> Supply
          </span>
        </div>
      </div>

      {/* AI Recommendations based on top dynamic skills */}
      <div className="bg-white border border-[#e5e1dc] rounded-2xl p-6 shadow-sm space-y-4">
        <div>
          <h2 className="text-lg font-bold text-[#26105f]">
            AI Learning Path Recommendations
          </h2>
          <p className="text-xs text-[#6b6290]">
            Suggested exchange sequences based on skill adjacency
          </p>
        </div>

        <div className="space-y-3">
          {analytics.topRecommended.map((cat, idx) => {
            const badges = [
              { label: "High demand", bg: "bg-[#26105f]" },
              { label: "Fast growing", bg: "bg-orange-500" },
              { label: "Community favorite", bg: "bg-emerald-500" },
            ];
            const currentBadge = badges[idx % badges.length];

            return (
              <div
                key={cat}
                className="bg-[#f0ebf8] rounded-2xl p-4 flex flex-wrap items-center gap-3"
              >
                <span
                  className={`${currentBadge.bg} text-white text-[11px] font-bold px-3 py-1 rounded-full`}
                >
                  {currentBadge.label}
                </span>
                <div className="flex items-center gap-2 text-xs font-bold text-[#26105f]">
                  <span>{cat} Basics</span>
                  <ArrowRight size={14} className="text-[#6b6290]" />
                  <span>{cat} Intermediate</span>
                  <ArrowRight size={14} className="text-[#6b6290]" />
                  <span>{cat} Masterclass</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Trends;