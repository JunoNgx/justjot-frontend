import { Box, Checkbox, Paper, Text, Title } from "@mantine/core";
import { useContext } from "react";
import { ThemeModeContext } from "@/contexts/ThemeModeContext";

export default function ProfileFaviconCookies() {

    const { isFaviconEnabled, setIsFaviconEnabled } = useContext(ThemeModeContext);

    return <Paper className="cardlike"
        withBorder
        p="md"
    >
        <Title className="cardlike__title"
            order={2}
        >
            Favicons and third-party cookies
        </Title>

        <Box mb="md">
            <Text>Checking this setting will enable:</Text>
            <ul>
                <li>Display favicon icons for your bookmark items.</li>
                <li>Third-party cookies from these sites.</li>
            </ul>
            <Text>These two matters are unforunately not separable at the current time. Cookies are a complicated matter, but you should be informed of the facts.</Text>
        </Box>

        <Checkbox
            checked={isFaviconEnabled}
            onChange={(event) => setIsFaviconEnabled(event.currentTarget.checked)}
            label="I would like to enable the display of favicons and related third-party cookies for this device"
        />
    </Paper>
};
