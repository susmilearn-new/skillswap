
import api from "./axios";

export const getUsers = () =>
  api.get("/users");

export const getProfile = () =>
  api.get("/users/profile");

export const updateProfile = (data) =>
  api.put("/users/profile", data);

export const getCommunityUsers = () =>
  api.get("/users/community");

export const getCommunityStats = () =>
  api.get("/users/stats");
