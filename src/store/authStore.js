import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      currentUser: null,
      isAuthenticated: false,

      login: (user) =>
        set({
          currentUser: user,
          isAuthenticated: true,
        }),

      logout: () =>
        set({
          currentUser: null,
          isAuthenticated: false,
        }),

      updateUser: (updatedUser) =>
        set({
          currentUser: updatedUser,
        }),
    }),
    {
      name: "auth-storage",
    }
  )
);