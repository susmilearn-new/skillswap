
import api from "./axios";

export const getUsers = () =>
  api.get("/users");

export const getProfile = () =>
  api.get("/users/profile");

export const updateProfile = (data) =>
  api.put("/users/profile", data);
