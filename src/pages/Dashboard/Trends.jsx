import React, { useMemo } from "react";
import { Ribbon, Users, TrendingUp, ArrowRight } from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { users as initialMockUsers } from "../../data/users";

// Predefined master list of all categories available on the platform
// (You can also import this from your constants or categories file: import { categories } from "../../data/categories")
const MASTER_CATEGORIES = [
  "Python",
  "UI/UX",
  "Spanish",
  "Guitar",
  "Cooking",
  "Yoga",
  "French",
  "Drawing",
  "Music",
  "Data Science",
];

const CATEGORY_COLORS = ["#7839ed", "#f97316", "#10b981", "#a855f7"];

const Trends = () => {
  // 1. Fetch user data from localStorage or fallback mock
  const allUsers = useMemo(() => {
    const localUsers = JSON.parse(localStorage.getItem("users")) || [];
    return localUsers.length > 0 ? localUsers : initialMockUsers;
  }, []);

  // 2. Aggregate counts across ALL predefined master categories
  const analytics = useMemo(() => {
    // Initialize every master category with 0 count
    const demandMap = {};
    const supplyMap = {};

    MASTER_CATEGORIES.forEach((cat) => {
      demandMap[cat] = 0;
      supplyMap[cat] = 0;
    });

    // Populate user counts against master categories
    allUsers.forEach((user) => {
      (user.skillsToLearn || []).forEach((skill) => {
        const match = MASTER_CATEGORIES.find(
          (cat) => cat.toLowerCase() === skill.trim().toLowerCase()
        );
        if (match) {
          demandMap[match] += 1;
        } else if (skill.trim()) {
          // Dynamic fallback for any user skill outside the initial master list
          demandMap[skill] = (demandMap[skill] || 0) + 1;
        }
      });

      (user.skillsToTeach || []).forEach((skill) => {
        const match = MASTER_CATEGORIES.find(
          (cat) => cat.toLowerCase() === skill.trim().toLowerCase()
        );
        if (match) {
          supplyMap[match] += 1;
        } else if (skill.trim()) {
          supplyMap[skill] = (supplyMap[skill] || 0) + 1;
        }
      });
    });

    const activeCategoriesList = Array.from(
      new Set([...MASTER_CATEGORIES, ...Object.keys(demandMap)])
    );

    // Total master category count
    const totalCategoriesCount = activeCategoriesList.length;
    const totalActiveLearners = allUsers.length;
    const totalSessions = Object.values(demandMap).reduce((a, b) => a + b, 0) * 8 + 40;

    // Bar Chart Data for full category spectrum (Supply vs Demand Gap)
    const gapChartData = activeCategoriesList.map((category) => ({
      skill: category,
      Demand: (demandMap[category] || 0) * 15 + 20, // Scaled for chart representation
      Supply: (supplyMap[category] || 0) * 10 + 5,
    }));

    // Top 4 categories by overall platform demand
    const sortedCategories = [...activeCategoriesList].sort(
      (a, b) => (demandMap[b] || 0) - (demandMap[a] || 0)
    );
    const top4Categories = sortedCategories.slice(0, 4);

    // Monthly Trend Chart based on top categories
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];
    const trendChartData = months.map((month, idx) => {
      const monthData = { month };
      const factor = (idx + 1) / months.length;
      top4Categories.forEach((cat) => {
        const baseDemand = (demandMap[cat] || 1) + 1;
        monthData[cat] = Math.round(baseDemand * 25 * (0.5 + factor * 0.5));
      });
      return monthData;
    });

    return {
      totalCategoriesCount,
      totalActiveLearners,
      totalSessions,
      gapChartData,
      top4Categories,
      trendChartData,
      topRecommended: sortedCategories.slice(0, 3),
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

      {/* Skill Demand Trends (Monthly Area Chart) */}
      <div className="bg-white border border-[#e5e1dc] rounded-2xl p-6 shadow-sm">
        <h2 className="text-lg font-bold text-[#26105f]">Skill Demand Trends</h2>
        <p className="text-xs text-[#6b6290] mb-6">
          Monthly learner interest by top platform categories — last 7 months
        </p>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={analytics.trendChartData}>
              <defs>
                {analytics.top4Categories.map((cat, index) => (
                  <linearGradient
                    key={cat}
                    id={`gradient-${index}`}
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor={CATEGORY_COLORS[index % CATEGORY_COLORS.length]}
                      stopOpacity={0.25}
                    />
                    <stop
                      offset="95%"
                      stopColor={CATEGORY_COLORS[index % CATEGORY_COLORS.length]}
                      stopOpacity={0}
                    />
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0ebf8" />
              <XAxis dataKey="month" stroke="#9b93be" fontSize={12} tickLine={false} />
              <YAxis stroke="#9b93be" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-white border border-[#e5e1dc] p-3 rounded-xl shadow-md text-xs space-y-1">
                        <p className="font-bold text-[#26105f] mb-1">{label}</p>
                        {payload.map((item, idx) => (
                          <p key={idx} style={{ color: item.color }} className="font-medium">
                            {item.name} : {item.value}
                          </p>
                        ))}
                      </div>
                    );
                  }
                  return null;
                }}
              />
              {analytics.top4Categories.map((cat, index) => (
                <Area
                  key={cat}
                  type="monotone"
                  dataKey={cat}
                  stroke={CATEGORY_COLORS[index % CATEGORY_COLORS.length]}
                  strokeWidth={2}
                  fillOpacity={1}
                  fill={`url(#gradient-${index})`}
                />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Dynamic Category Legend */}
        <div className="flex flex-wrap items-center justify-center gap-6 mt-4 text-xs font-semibold text-[#6b6290]">
          {analytics.top4Categories.map((cat, index) => (
            <span key={cat} className="flex items-center gap-1.5">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: CATEGORY_COLORS[index % CATEGORY_COLORS.length] }}
              ></span>
              {cat}
            </span>
          ))}
        </div>
      </div>

      {/* Supply vs. Demand Gap for ALL Categories */}
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

      {/* AI Learning Path Recommendations based on Full Category set */}
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