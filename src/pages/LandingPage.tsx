import { useContext, useEffect } from "react"
import { BackendClientContext } from "@/contexts/BackendClientContext";
import { NavLink, useNavigate } from "react-router-dom";
import { Anchor, Box, Button, Center, Group, Paper, Text, Title } from "@mantine/core";
import { JustJotIcon } from "@/components/misc/JustJotIcon";
import { APP_NAME } from "@/utils/constants";

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

        document.title = `${APP_NAME} — A keyboard-first note taking app`;
    }, []);

    const navigate = useNavigate();

    return <Box className="landing-page" mb="xl">
        <Box component="section" className="landing-page__section">
            <Group gap="xl">
                <JustJotIcon size={72} stroke={"0.1"}/>
                <Box>
                    <Title order={2}>jot</Title>
                    <Text fs="italic">/dʒɒt/</Text>
                    <Text>(verb)</Text>
                    <Text>write (something) quickly</Text>
                </Box>
            </Group>
        </Box>

        <Box component="section" className="landing-page__section">
            <Title order={1}>JustJot</Title>
            <Text>A keyboard-first note-taking Progressive Web App, tailored for swift information-recording operations.</Text>
        </Box>

        <Box component="section" className="landing-page__section">
            <Paper className="landing-page__demo-box"
                withBorder p="md"
            >
                <Text ta="center">Just want to take a look?</Text>
                <Text ta="center">Account-free live demo available</Text>
                <Center mt="md">
                    <Button component={NavLink} to="/demo-login">
                        Try now
                    </Button>
                </Center>
            </Paper>
        </Box>

        <Box component="section" className="landing-page__section">
            <Title order={2}>Keyboard-first</Title>
            <Text>JustJot prioritises keyboard interactions; most actions can be performed solely on a keyboard. While fully operable with pointer-based devices (mouse or touchscreen), users are recommended to spend time on learning to perform operations the optimal way.</Text>

            <Text mt="md">Due to the unconventional approach, consulting <Anchor component={NavLink} to="/help">the manual</Anchor> is highly recommended for new users.</Text>
        </Box>

        <Box component="section" className="landing-page__section">
            <Title order={2}>Your omnipotent notebook</Title>
            <Text>Outside of handling plain-text notes, this app is also capable of:</Text>
            <ul>
                <li>Storing bookmarks</li>
                <li>Managing todo items</li>
                <li>Displaying hex colour code preview</li>
            </ul>
        </Box>
        
        <Box component="section" className="landing-page__section">
            <Title order={2}>Average FOSS software</Title>
            <Text>JustJot was made with personal use and personal preferences first and foremost. It is as barebone and small as it can and should be. It has minimal development roadmap, no monetisation, no advertisement, no tracking, and is fully open-source. Technical support is limited and not guaranteed (I'll try as much as I can).</Text>
        </Box>

        <Box component="section" className="landing-page__section">
            <Title order={2}>Get started</Title>
            <Text><Anchor component={NavLink} to="/register">Register</Anchor> a new account or <Anchor component={NavLink} to="/login">login</Anchor> to your existing one.</Text>
            <Text mt="md">Also, you don't need to sign up just to see what this is all about. There is a <Anchor component={NavLink} to="/demo-login">live demo</Anchor> using a test account, obligation-free.</Text>
            <Text mt="md">While we are at that, drop by to see <Anchor component={NavLink} to="/terms">things you should know about</Anchor> and <Anchor component={NavLink} to="/help">the manual</Anchor> before using JustJot.</Text>
        </Box>

        <Box component="section" className="landing-page__section">
            <Title order={2}>Authors</Title>
            <Text>JustJot is developed by <Anchor href="https://www.junongx.com/" target='_blank' rel='noopener noreferrer'>Juno Nguyen</Anchor> with curiosity, compulsion, and tons of design input from <Anchor href="https://caseykwokdinata.webflow.io/" target='_blank' rel='noopener noreferrer'>Casey Kwokdinata</Anchor>.</Text>
        </Box>
    </Box>
}
