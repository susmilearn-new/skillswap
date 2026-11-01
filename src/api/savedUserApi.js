import api from "./axios";

export const getSavedUsers = () => api.get("/users/saved");

export const saveUser = (userId) =>
  api.post(`/users/saved/${userId}`);

export const removeSavedUser = (userId) =>
  api.delete(`/users/saved/${userId}`);