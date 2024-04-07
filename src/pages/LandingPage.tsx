import { useContext, useEffect } from "react"
import { BackendClientContext } from "@/contexts/BackendClientContext";
import { NavLink, useNavigate } from "react-router-dom";
import { Anchor, Box, Group, Text, Title } from "@mantine/core";
import { JustJotIcon } from "@/components/misc/JustJotIcon";

export default function LandingPage() {
    const { pbClient, isLoggedIn } = useContext(BackendClientContext);

    useEffect(() => {
        if (isLoggedIn) {
            navigate(
                `/${pbClient.authStore.model?.username}`,
                { replace: true }
            );
            return;
        }
    }, []);

    const navigate = useNavigate();

    return <Box className="landing-page">
        <section className="landing-page__section">
            <Group gap="xl">
                <JustJotIcon size={72} stroke={"0.1"}/>
                <Box>
                    <Title order={2}>jot</Title>
                    <Text fs="italic">/dʒɒt/</Text>
                    <Text>(verb)</Text>
                    <Text>write (something) quickly</Text>
                </Box>
            </Group>

        </section>

        <section className="landing-page__section">
            <Title order={1}>JustJot</Title>
            <Text>A keyboard-first note-taking Progressive Web App, tailored for swift information-recording operations.</Text>
        </section>

        <section className="landing-page__section">
            <Title order={2}>Keyboard-first</Title>
            <Text>JustJot prioritises keyboard interactions; most actions can be performed solely on a keyboard. While fully operable with pointer-based devices (mouse or touchscreen), users are recommended to spent time on learning to perform operations the optimal way.</Text>

            <Text mt="md">Due to the unconventional approach, consulting <Anchor component={NavLink} to="/help">the manual</Anchor> is high recommended to new users.</Text>
        </section>

        <section className="landing-page__section">
            <Title order={2}>Your omnipotent notebook</Title>
            <Text>Outside of handling plain-text notes, this app is also capable of:</Text>
            <ul>
                <li>Storing bookmarks</li>
                <li>Managing todo items</li>
                <li>Displaying hex colour code preview</li>
            </ul>
        </section>
        
        <section className="landing-page__section">
            <Title order={2}>Average FOSS software</Title>
            <Text>JustJot was made with personal use and personal preferences first and foremost. It is as barebone and small as it can and should be. It has minimal development roadmap, no monetisation, no advertisement, no tracking, and is fully open-source. Technical support is limited and not guaranteed (I'll try as much as I could).</Text>
        </section>

        <section className="landing-page__section">
            <Title order={2}>Get started</Title>
            <Text><Anchor component={NavLink} to="/register">Register</Anchor> a new account or <Anchor component={NavLink} to="/login">login</Anchor> to your existing one.</Text>
        </section>
    </Box>
}
