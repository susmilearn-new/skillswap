import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set, get) => ({
      currentUser: null,
      isAuthenticated: false,
      savedUserIds: [], // Track saved user IDs globally

      login: (user) =>
        set({
          currentUser: user,
          isAuthenticated: true,
        }),

      logout: () =>
        set({
          currentUser: null,
          isAuthenticated: false,
          savedUserIds: [], // Clears saved profiles on logout
        }),

      updateUser: (updatedUser) =>
        set({
          currentUser: updatedUser,
        }),

      // Merges partial or full profile updates into the current user object
      updateUserProfile: (updatedFields) => {
        const currentUser = get().currentUser;
        if (!currentUser) return;

        set({
          currentUser: {
            ...currentUser,
            ...updatedFields,
          },
        });
      },

      // Toggle bookmark status for a user ID
      toggleSaveUser: (userId) => {
        const currentSaved = get().savedUserIds;
        const isAlreadySaved = currentSaved.includes(userId);

        set({
          savedUserIds: isAlreadySaved
            ? currentSaved.filter((id) => id !== userId)
            : [...currentSaved, userId],
        });
      },
    }),
    {
      name: "auth-storage",
    }
  )
);