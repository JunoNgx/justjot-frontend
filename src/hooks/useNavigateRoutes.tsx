import { BackendClientContext } from "@/contexts/BackendClientContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

export default function useNavigateRoutes() {

    const { user, logout } = useContext(BackendClientContext);

    const navigate = useNavigate();
    const navigateToMainView = () => {
        navigate(`/${user?.username}`, {
            replace: true
        });
    };

    const navigateToHelp = () => {
        navigate("/help");
    };

    const navigateToProfile = () => {
        navigate("/profile");
    };

    const navigateToReset = () => {
        navigate("/reset");
    };

    const logoutAndNavigateToLogin = () => {
        logout();
        navigate("/login", { replace: true});
    };

    return {
        navigateToHelp,
        navigateToProfile,
        navigateToReset,
        logoutAndNavigateToLogin,
        navigateToMainView,
    }
};