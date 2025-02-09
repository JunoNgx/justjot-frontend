import { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { CollectionsContext } from "@/contexts/CollectionsContext";
import { BackendClientContext } from "@/contexts/BackendClientContext";

import useNavigateRoutes from "./useNavigateRoutes";

export default function useHandleNavigation() {

    const location = useLocation();
    const navigate = useNavigate();

    const { pbClient, isLoggedIn } = useContext(BackendClientContext);
    const { setCurrCollection } = useContext(CollectionsContext);

    const { navigateToMainView } = useNavigateRoutes();

    useEffect(() => {
        const pathname = location.pathname;
        const username = pbClient.authStore.record?.username;

        const redirectIfNotLoggedIn = () => {
            if (!isLoggedIn) {
                navigate(`/login`, { replace: true });
            }
        }

        switch (pathname) {
        case ("/"):
        case ("/login"):
        case ("/demo-login"):
        case ("/register"):
            if (isLoggedIn) {
                navigateToMainView();
            }
            return;

        case ("/profile"):
            redirectIfNotLoggedIn();
            setCurrCollection(undefined);
            return;
        
        case ("/terms"):
        case ("/help"):
            setCurrCollection(undefined);
            return;

        case ("/request"):
        case ("/verify"):
            return;

        default:
            // Main view
            if (pathname.startsWith(`/${username}`)) {
                redirectIfNotLoggedIn();
            }

        }

    }, [location]);
};
