
import { useState, useEffect, useMemo } from "react";

import { getUsers } from "../../api/userApi";

import TrendsHeader from "../../components/Trends/TrendsHeader";
import MetricCards from "../../components/Trends/MetricCards";
import SupplyDemandChart from "../../components/Trends/SupplyDemandChart";
import LearningRecommendations from "../../components/Trends/LearningRecommendations";

const Trends = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch registered users from MongoDB
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers();

        const users = response.data.users || [];

        setAllUsers(users);
      } catch (error) {
        console.error("Failed to load trend data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Calculate analytics using backend data
  const analytics = useMemo(() => {
    const demandMap = {};
    const supplyMap = {};
    const totalFrequencyMap = {};

    const processSkill = (skillString, mapToIncrement) => {
      if (!skillString || typeof skillString !== "string") {
        return;
      }

      const cleanSkill = skillString.trim();

      if (!cleanSkill) return;

      const existingKey = Object.keys(totalFrequencyMap).find(
        (key) => key.toLowerCase() === cleanSkill.toLowerCase()
      );

      const skillKey = existingKey || cleanSkill;

      mapToIncrement[skillKey] =
        (mapToIncrement[skillKey] || 0) + 1;

      totalFrequencyMap[skillKey] =
        (totalFrequencyMap[skillKey] || 0) + 1;
    };

    // Process all registered users
    allUsers.forEach((user) => {
      (user.skillsToLearn || []).forEach((skill) =>
        processSkill(skill, demandMap)
      );

      (user.skillsToTeach || []).forEach((skill) =>
        processSkill(skill, supplyMap)
      );
    });

    // Sort skills by total frequency
    const sortedDynamicCategories = Object.keys(
      totalFrequencyMap
    ).sort(
      (a, b) =>
        totalFrequencyMap[b] - totalFrequencyMap[a]
    );

    const totalCategoriesCount =
      sortedDynamicCategories.length;

    const totalActiveLearners = allUsers.length;

    // Sum actual session counts stored in user profiles
    const totalSessions = allUsers.reduce(
      (total, user) => total + Number(user.sessions || 0),
      0
    );

    // Chart data using actual demand and supply counts
    const chartCategories =
      sortedDynamicCategories.slice(0, 10);

    const gapChartData = chartCategories.map((category) => ({
      skill: category,
      Demand: demandMap[category] || 0,
      Supply: supplyMap[category] || 0,
    }));

    // Top in-demand skills
    const topDemandCategories = [...sortedDynamicCategories].sort(
      (a, b) =>
        (demandMap[b] || 0) - (demandMap[a] || 0)
    );

    return {
      totalCategoriesCount,
      totalActiveLearners,
      totalSessions,
      gapChartData,
      topRecommended: topDemandCategories.slice(0, 3),
    };
  }, [allUsers]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#faf8f5] px-6 py-8 text-center text-gray-500">
        Loading skill trends...
      </div>
    );
  }

  return (
    <div className="min-h-screen space-y-8 bg-[#faf8f5] px-6 py-8">
      <div className="mx-auto max-w-[1400px] space-y-8">
        <TrendsHeader />

        <MetricCards
          totalCategories={analytics.totalCategoriesCount}
          totalLearners={analytics.totalActiveLearners}
          totalSessions={analytics.totalSessions}
        />

        <SupplyDemandChart data={analytics.gapChartData} />

        <LearningRecommendations
          recommendations={analytics.topRecommended}
        />
      </div>
    </div>
  );
};

export default Trends;
