
import RecommendationItem from "./RecommendationItem";

const LearningRecommendations = ({ recommendations = [] }) => {
  return (
    <div className="space-y-4 rounded-2xl border border-[#e5e1dc] bg-white p-6 shadow-sm">
      <div>
        <h2 className="text-lg font-bold text-[#26105f]">
          Top In-Demand Skills
        </h2>

        <p className="text-xs text-[#6b6290]">
          AI-powered recommendations based on community learning demand
        </p>
      </div>

      <div className="space-y-3">
        {recommendations.slice(0, 3).map((item, index) => {
          const skill =
            typeof item === "string" ? item : item.skill;

          return (
            <RecommendationItem
              key={skill || index}
              skill={skill}
              index={index}
            />
          );
        })}
      </div>
    </div>
  );
};

export default LearningRecommendations;
