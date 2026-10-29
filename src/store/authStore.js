
import { create } from "zustand";

export const useAuthStore = create((set, get) => ({
    currentUser: null,
    isAuthenticated: false,
    savedUserIds: [],

    // Store the user returned by the login API
    login: (user) =>
        set({
            currentUser: user,
            isAuthenticated: true,
        }),

    // Clear frontend authentication state
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

    // Update only the supplied profile fields
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

    // Toggle saved users in frontend state
    toggleSaveUser: (userId) => {
        const currentSaved = get().savedUserIds;
        const id = String(userId);

        const isAlreadySaved = currentSaved.some(
            (savedId) => String(savedId) === id
        );

        set({
            savedUserIds: isAlreadySaved
                ? currentSaved.filter(
                    (savedId) => String(savedId) !== id
                )
                : [...currentSaved, id],
        });
    },

    // Restore the user from the backend cookie session
    setCurrentUser: (user) =>
        set({
            currentUser: user,
            isAuthenticated: Boolean(user),
        }),

    // Clear the user when the backend session is invalid
    clearAuth: () =>
        set({
            currentUser: null,
            isAuthenticated: false,
        }),
}));
