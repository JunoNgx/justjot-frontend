import { useContext, useEffect } from "react"
import { BackendClientContext } from "../contexts/BackendClientContext";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
    const { pbClient, isLoggedIn } = useContext(BackendClientContext);

    useEffect(() => {
        if (isLoggedIn) navigate(`/${pbClient.authStore.model?.username}`, {
            replace: true
        });
    }, []);

    const navigate = useNavigate();

    return <h1>LandingPage</h1>
}
