import api from "./axios";

// Get available catalogue skills
export const getCatalogueSkills = () =>
  api.get("/skill-catalogue");

// Admin: Add a skill
export const createCatalogueSkill = (data) =>
  api.post("/skill-catalogue", data);

// Admin: Update a skill
export const updateCatalogueSkill = (id, data) =>
  api.put(`/skill-catalogue/${id}`, data);

// Admin: Delete a skill
export const deleteCatalogueSkill = (id) =>
  api.delete(`/skill-catalogue/${id}`);