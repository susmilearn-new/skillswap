
import { useEffect, useState } from "react";
import { getProfile } from "../api/userApi";
import { useAuthStore } from "../store/authStore";

const AuthInitializer = ({ children }) => {
    const [checkingAuth, setCheckingAuth] = useState(true);
    const setCurrentUser = useAuthStore(
        (state) => state.setCurrentUser
    );
    const clearAuth = useAuthStore((state) => state.clearAuth);

    useEffect(() => {
        const checkSession = async () => {
            try {
                const response = await getProfile();
                setCurrentUser(response.data.user);
            } catch {
                clearAuth();
            } finally {
                setCheckingAuth(false);
            }
        };

        checkSession();
    }, [setCurrentUser, clearAuth]);

    if (checkingAuth) {
        return <p className="p-6">Checking authentication...</p>;
    }

    return children;
};

export default AuthInitializer;
