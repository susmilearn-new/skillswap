import { useMemo } from "react";
import { users as initialMockUsers } from "../../data/users";

import TrendsHeader from "../../components/Trends/TrendsHeader";
import MetricCards from "../../components/Trends/MetricCards";
import SupplyDemandChart from "../../components/Trends/SupplyDemandChart";
import LearningRecommendations from "../../components/Trends/LearningRecommendations";

const Trends = () => {
  // Get users
  const allUsers = useMemo(() => {
    const localUsers =
      JSON.parse(localStorage.getItem("users")) || [];

    return localUsers.length > 0
      ? localUsers
      : initialMockUsers;
  }, []);

  // Calculate analytics
  const analytics = useMemo(() => {
    const demandMap = {};
    const supplyMap = {};
    const totalFrequencyMap = {};

    const processSkill = (skillString, mapToIncrement) => {
      if (
        !skillString ||
        typeof skillString !== "string"
      ) {
        return;
      }

      const cleanSkill = skillString.trim();

      if (!cleanSkill) return;

      const existingKey = Object.keys(
        totalFrequencyMap
      ).find(
        (key) =>
          key.toLowerCase() ===
          cleanSkill.toLowerCase()
      );

      const skillKey =
        existingKey || cleanSkill;

      mapToIncrement[skillKey] =
        (mapToIncrement[skillKey] || 0) + 1;

      totalFrequencyMap[skillKey] =
        (totalFrequencyMap[skillKey] || 0) + 1;
    };

    // Process all users
    allUsers.forEach((user) => {
      (user.skillsToLearn || []).forEach((skill) =>
        processSkill(skill, demandMap)
      );

      (user.skillsToTeach || []).forEach((skill) =>
        processSkill(skill, supplyMap)
      );
    });

    // Sort skills by popularity
    const sortedDynamicCategories = Object.keys(
      totalFrequencyMap
    ).sort(
      (a, b) =>
        totalFrequencyMap[b] -
        totalFrequencyMap[a]
    );

    // Metrics
    const totalCategoriesCount =
      sortedDynamicCategories.length;

    const totalActiveLearners =
      allUsers.length;

    const totalSessions =
      Object.values(demandMap).reduce(
        (a, b) => a + b,
        0
      ) *
        8 +
      40;

    // Chart
    const chartCategories =
      sortedDynamicCategories.slice(0, 10);

    const gapChartData = chartCategories.map(
      (category) => ({
        skill: category,
        Demand:
          (demandMap[category] || 0) * 15 + 20,
        Supply:
          (supplyMap[category] || 0) * 10 + 5,
      })
    );

    // Recommendations
    const topDemandCategories = [
      ...sortedDynamicCategories,
    ].sort(
      (a, b) =>
        (demandMap[b] || 0) -
        (demandMap[a] || 0)
    );

    return {
      totalCategoriesCount,
      totalActiveLearners,
      totalSessions,
      gapChartData,
      topRecommended:
        topDemandCategories.slice(0, 3),
    };
  }, [allUsers]);

  return (
    <div className="min-h-screen space-y-8 bg-[#faf8f5] px-6 py-8">
      
      <div className="mx-auto max-w-[1400px] space-y-8">

        <TrendsHeader />

        <MetricCards
          totalCategories={
            analytics.totalCategoriesCount
          }
          totalLearners={
            analytics.totalActiveLearners
          }
          totalSessions={
            analytics.totalSessions
          }
        />

        <SupplyDemandChart
          data={analytics.gapChartData}
        />

        <LearningRecommendations
          recommendations={
            analytics.topRecommended
          }
        />

      </div>
    </div>
  );
};

export default Trends;