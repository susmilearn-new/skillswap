
import { useState, useEffect, useMemo } from "react";

import { getUsers } from "../../api/userApi";
import {
  analyzeTrends,
  getLearningPath,
} from "../../api/trendsApi";

import TrendsHeader from "../../components/Trends/TrendsHeader";
import MetricCards from "../../components/Trends/MetricCards";
import SupplyDemandChart from "../../components/Trends/SupplyDemandChart";
import LearningRecommendations from "../../components/Trends/LearningRecommendations";

const Trends = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [aiInsights, setAiInsights] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);

  const [learningPath, setLearningPath] = useState(null);
  const [pathLoading, setPathLoading] = useState(false);

  // Fetch registered users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers();
        setAllUsers(response.data.users || []);
      } catch (error) {
        console.error("Failed to load trend data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Calculate community analytics
  const analytics = useMemo(() => {
    const demandMap = {};
    const supplyMap = {};
    const totalFrequencyMap = {};

    const processSkill = (skillString, mapToIncrement) => {
      if (!skillString || typeof skillString !== "string") return;

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

    allUsers.forEach((user) => {
      (user.skillsToLearn || []).forEach((skill) =>
        processSkill(skill, demandMap)
      );

      (user.skillsToTeach || []).forEach((skill) =>
        processSkill(skill, supplyMap)
      );
    });

    const sortedDynamicCategories = Object.keys(
      totalFrequencyMap
    ).sort(
      (a, b) =>
        totalFrequencyMap[b] - totalFrequencyMap[a]
    );

    const totalCategoriesCount = sortedDynamicCategories.length;
    const totalActiveLearners = allUsers.length;

    const totalSessions = allUsers.reduce(
      (total, user) => total + Number(user.sessions || 0),
      0
    );

    const chartCategories = sortedDynamicCategories.slice(0, 10);

    const gapChartData = chartCategories.map((category) => ({
      skill: category,
      Demand: demandMap[category] || 0,
      Supply: supplyMap[category] || 0,
      gap:
        (demandMap[category] || 0) -
        (supplyMap[category] || 0),
    }));

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

  // AI community trends analysis
  useEffect(() => {
    if (!analytics.gapChartData.length) return;

    const fetchAIInsights = async () => {
      try {
        setAiLoading(true);

        const response = await analyzeTrends(
          analytics.gapChartData
        );

        setAiInsights(response.data);
      } catch (error) {
        console.error("Failed to generate AI trend insights:", error);
      } finally {
        setAiLoading(false);
      }
    };

    fetchAIInsights();
  }, [analytics.gapChartData]);

  // AI personalised learning path
  useEffect(() => {
    const fetchLearningPath = async () => {
      try {
        setPathLoading(true);

        const response = await getLearningPath();

        setLearningPath(response.data);
      } catch (error) {
        console.error(
          "Failed to generate learning path:",
          error
        );
      } finally {
        setPathLoading(false);
      }
    };

    fetchLearningPath();
  }, []);

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
          recommendations={
            aiInsights?.recommendations ||
            analytics.topRecommended
          }
        />

        {/* AI Learning Path */}
        <div className="space-y-4 rounded-2xl border border-[#e5e1dc] bg-white p-6 shadow-sm">

          <div>
            <h2 className="text-lg font-bold text-[#26105f]">
              ✨ AI-Powered Learning Paths
            </h2>

            <p className="text-sm text-[#6b6290]">
              Personalised learning steps generated from your learning interests and existing skills.
            </p>
          </div>

          {pathLoading ? (
            <p className="text-sm text-gray-500">
              Generating your personalised learning path...
            </p>
          ) : learningPath?.learningPaths?.length > 0 ? (
            <div className="space-y-5">

              {learningPath.summary && (
                <p className="text-sm text-[#6b6290]">
                  {learningPath.summary}
                </p>
              )}

              {learningPath.learningPaths.map((path, index) => (
                <div
                  key={path.skill || index}
                  className="rounded-xl bg-[#f0ebf8] p-4"
                >
                  <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                    <h3 className="font-bold text-[#26105f]">
                      {path.skill}
                    </h3>

                    <span className="rounded-full bg-[#32106f] px-3 py-1 text-xs font-semibold text-white">
                      {path.level}
                    </span>
                  </div>

                  <div className="space-y-3">
                    {(path.steps || []).map((step, stepIndex) => (
                      <div
                        key={stepIndex}
                        className="border-l-2 border-[#32106f] pl-3"
                      >
                        <p className="text-sm font-semibold text-[#26105f]">
                          {stepIndex + 1}. {step.title}
                        </p>

                        <p className="text-xs text-[#6b6290]">
                          {step.description}
                        </p>

                        {step.activity && (
                          <p className="mt-1 text-xs text-[#32106f]">
                            <span className="font-semibold">
                              Practice:
                            </span>{" "}
                            {step.activity}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">
              Add skills to your learning interests in your profile to generate a personalised learning path.
            </p>
          )}
        </div>

      </div>
    </div>
  );
};

export default Trends;
