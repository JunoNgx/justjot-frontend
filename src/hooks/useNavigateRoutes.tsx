import { BackendClientContext } from "@/contexts/BackendClientContext";
import { CollectionsContext } from "@/contexts/CollectionsContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

export default function useNavigateRoutes() {

    const { user, logout } = useContext(BackendClientContext);
    const { setCurrCollection } = useContext(CollectionsContext);

    const navigate = useNavigate();
    const navigateToMainView = () => {
        navigate(`/${user?.username}`, {
            replace: true
        });
    };

    const navigateToHelp = () => {
        navigate("/help");
    };

    const navigateToTerms = () => {
        navigate("/terms");
    }

    const navigateToProfile = () => {
        navigate("/profile");
    };

    const navigateToReset = () => {
        navigate("/reset");
    };

    const logoutAndNavigateToLogin = () => {
        setCurrCollection(undefined)
        logout();
        navigate("/login", { replace: true});
    };

    // For non-logged in status only
    const navigateToHome = () => {
        navigate("/");
    }

    const navigateToLogin = () => {
        navigate("/login");
    }

    const navigateToRegister = () => {
        navigate("/register");
    }

    const navigateToVerify = () => {
        navigate("/verify");
    }

    const navigateToDemoLogin = () => {
        navigate("/demo-login");
    }

    return {
        navigateToHelp,
        navigateToTerms,
        navigateToProfile,
        navigateToReset,
        logoutAndNavigateToLogin,
        navigateToMainView,

        navigateToHome,
        navigateToLogin,
        navigateToRegister,
        navigateToVerify,
        navigateToDemoLogin,
    }
};