import api from "./axios";

export const analyzeTrends = (trends) =>
  api.post("/trends/analyze", { trends });

export const getLearningPath = () =>
  api.get("/trends/learning-path");