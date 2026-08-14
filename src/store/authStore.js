import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set, get) => ({
      currentUser: null,
      isAuthenticated: false,

      registeredUsers: [],

      savedUserIds: [],

      // Register new user
      register: (user) => {
        const users = get().registeredUsers;

        const existingUser = users.find(
          (existingUser) => existingUser.email === user.email
        );

        if (existingUser) {
          return false;
        }

        set({
          registeredUsers: [...users, user],
        });

        return true;
      },

      login: (user) =>
        set({
          currentUser: user,
          isAuthenticated: true,
        }),

      logout: () =>
        set({
          currentUser: null,
          isAuthenticated: false,
          savedUserIds: [],
        }),

      updateUser: (updatedUser) =>
        set({
          currentUser: updatedUser,
        }),

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