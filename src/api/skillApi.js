
import api from "./axios";

// Get all skills
export const getSkills = (params = {}) =>
  api.get("/skills", { params });

// Get one skill
export const getSkillById = (id) =>
  api.get(`/skills/${id}`);

// Create skill
export const createSkill = (data) =>
  api.post("/skills", data);

// Update skill
export const updateSkill = (id, data) =>
  api.put(`/skills/${id}`, data);

// Delete skill
export const deleteSkill = (id) =>
  api.delete(`/skills/${id}`);
