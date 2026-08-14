import RecommendationItem from "./RecommendationItem";

const LearningRecommendations = ({
  recommendations,
}) => {
  return (
    <div className="space-y-4 rounded-2xl border border-[#e5e1dc] bg-white p-6 shadow-sm">

      <div>
        <h2 className="text-lg font-bold text-[#26105f]">
          AI Learning Path Recommendations
        </h2>

        <p className="text-xs text-[#6b6290]">
          Suggested exchange sequences based on skill
          adjacency
        </p>
      </div>

      <div className="space-y-3">
        {recommendations.map(
          (skill, index) => (
            <RecommendationItem
              key={skill}
              skill={skill}
              index={index}
            />
          )
        )}
      </div>

    </div>
  );
};

export default LearningRecommendations;