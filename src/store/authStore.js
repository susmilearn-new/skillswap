
import { create } from "zustand";
import {
    getSavedUsers,
    saveUser,
    removeSavedUser,
} from "../api/savedUserApi";

export const useAuthStore = create((set, get) => ({
    currentUser: null,
    isAuthenticated: false,
    savedUserIds: [],

    // Fetch saved profiles from MongoDB
    fetchSavedUsers: async () => {
        try {
            const response = await getSavedUsers();

            const savedIds = response.data.users.map(
                (user) => String(user._id)
            );

            set({ savedUserIds: savedIds });
        } catch (error) {
            console.error("Failed to fetch saved profiles:", error);
        }
    },

    // Store the user returned by the login API
    login: (user) => {
        set({
            currentUser: user,
            isAuthenticated: true,
        });

        get().fetchSavedUsers();
    },

    // Logout
    logout: () =>
        set({
            currentUser: null,
            isAuthenticated: false,
            savedUserIds: [],
        }),

    // Update the current user
    updateUser: (updatedUser) =>
        set({
            currentUser: updatedUser,
        }),

    // Update only supplied profile fields
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

    // Save or remove a profile in MongoDB
    toggleSaveUser: async (userId) => {
        const id = String(userId);
        const currentSaved = get().savedUserIds;

        const isAlreadySaved = currentSaved.includes(id);

        try {
            if (isAlreadySaved) {
                await removeSavedUser(id);

                set({
                    savedUserIds: currentSaved.filter(
                        (savedId) => savedId !== id
                    ),
                });
            } else {
                await saveUser(id);

                set({
                    savedUserIds: [...currentSaved, id],
                });
            }
        } catch (error) {
            console.error("Failed to update saved profile:", error);
            throw error;
        }
    },

    // Restore user from backend cookie session
    setCurrentUser: (user) => {
        set({
            currentUser: user,
            isAuthenticated: Boolean(user),
            savedUserIds: user ? get().savedUserIds : [],
        });

        if (user) {
            get().fetchSavedUsers();
        }
    },

    // Clear authentication
    clearAuth: () =>
        set({
            currentUser: null,
            isAuthenticated: false,
            savedUserIds: [],
        }),
}));
