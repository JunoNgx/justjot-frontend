import { useContext, useEffect } from "react"
import { BackendClientContext } from "../contexts/BackendClientContext";
import { NavLink, useNavigate } from "react-router-dom";
import { Anchor, Box, Text, Title } from "@mantine/core";

export default function LandingPage() {
    const { pbClient, isLoggedIn } = useContext(BackendClientContext);

    useEffect(() => {
        if (isLoggedIn) navigate(`/${pbClient.authStore.model?.username}`, {
            replace: true
        });
    }, []);

    const navigate = useNavigate();

    return <Box className="landing-page">
        <Title order={1}>Welcome to JustJot</Title>

        <section className="landing-page__section">
            <Title order={2}>jot</Title>
            <Text fs="italic">/dʒɒt/</Text>
            <Text>(verb) write (something) quickly</Text>
        </section>

        <section className="landing-page__section">
            <Title order={2}>JustJot</Title>
            <Text>A keyboard-first note-taking Progressive Web App, tailored for fast information-recording operation.</Text>
        </section>

        <section className="landing-page__section">
            <Title order={2}>Keyboard-first</Title>
            <Text>JustJot prioritises keyboard interactions. Most actions can be performed solely on a keyboard. While fully operable with pointer-based devices (for mobile access), users are recommended to spent time on learning to perform operations the optimal way. TODO: link to help page.</Text>
        </section>

        <section className="landing-page__section">
            <Title order={2}>Your omnipotent notebook</Title>
            <Text>While mainly created to handle to handle plain-text notes, this app also:</Text>
            <ul>
                <li>Stores bookmarks</li>
                <li>Manages todo lists</li>
                <li>Displays hex colour codes preview</li>
            </ul>
        </section>
        
        <section className="landing-page__section">
            <Title order={2}>Average FOSS software</Title>
            <Text>JustJot was made with personal use and personal preferences first and foremost. It's barebone and as small as it can be. It has no roadmap, no monetisation, advertisement, and no tracking. I try to provide as much as I can, though it would certainly be limited and diffcult. It's also fully open-source.</Text>
        </section>

        <section className="landing-page__section">
            <Title order={2}>Get started</Title>
            <Text><Anchor component={NavLink} to="/login">Login</Anchor> to your existing account or <Anchor component={NavLink} to="/register">register</Anchor> a new one.</Text>
        </section>
    </Box>
}
