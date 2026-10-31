import api from "./axios";

export const getMatches = () => api.get("/matches");