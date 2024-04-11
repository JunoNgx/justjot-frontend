import KbdAlt from "@/components/misc/KbdAlt";
import KbdMod from "@/components/misc/KbdMod";
import { CollectionsContext } from "@/contexts/CollectionsContext";
import { APP_NAME } from "@/utils/constants";
import { Box, Kbd, Paper, Text, Title } from "@mantine/core";
import { useContext, useEffect } from "react";

export default function Help() {
    const { setCurrCollection } = useContext(CollectionsContext);

    useEffect(() => {
        setCurrCollection(undefined);
        document.title = `User Manual — ${APP_NAME}`;
    });

    return <Paper className="cardlike cardlike--long-doc">
        <Title order={2}>User Manual</Title>

        <Box className="cardlike__man-section"
            component="section"
            mb="xl"
        >
            <Title order={3}>Keyboard shortcuts</Title>
            <Title order={4}>Operating systems</Title>
            <Text>JustJot takes your operating system into account; <Kbd>Mod</Kbd> is appropriately assigned and displayed as either <Kbd>Ctrl</Kbd> or <Kbd>Cmd</Kbd>, depending on whether your are on Linux/Windows/Android or iOS/MacOS. Similarly for <Kbd>Alt</Kbd> and <Kbd>Opt</Kbd>. This is applicable to any contexual prompt display through out the app, including this document.</Text>

            <Title order={4}>Everywhere</Title>
            <ul>
                <li><Text><KbdMod/> <Kbd>K</Kbd> or <KbdMod/> <Kbd>P</Kbd> to open Spotlight.</Text></li>
                <li> <Text><Kbd>Shift</Kbd> <Kbd>/</Kbd> to toggle display of contextual keyboard prompts.</Text></li>
            </ul>

            <Title order={4}>Main Input is out of focus</Title>
            <ul>
                <li><Text><Kbd>1</Kbd>...<Kbd>0</Kbd> to switch to the corresponding ordered collection.</Text></li>
                <li><Text><Kbd>←</Kbd> <Kbd>→</Kbd> to switch to the previous/next collection.</Text></li>
                <li><Text><KbdMod/> <Kbd>F</Kbd> to focus on the Main Input.</Text></li>
            </ul>

            <Title order={4}>Main Input is focused</Title>
            <ul>
                <li><Text><Kbd>↑</Kbd> <Kbd>↓</Kbd> to select to the previous/next item.</Text></li>
                <li><Text><Kbd>Shift</Kbd> <Kbd>↑</Kbd> / <Kbd>Shift</Kbd> <Kbd>↓</Kbd> to select the previous/next items in increments of five.</Text></li>
                <li><Text><KbdMod/> <Kbd>Shift</Kbd> <Kbd>↑</Kbd> to scroll to top of the list.</Text></li>
                <li><Text><KbdMod/> <Kbd>Shift</Kbd> <Kbd>↓</Kbd> to scroll to bttom of the list.</Text></li>
                <li><Text><Kbd>Esc</Kbd> to exit Main Input focus.</Text></li>
            </ul>

            <Title order={4}>Selected item actions</Title>
            <ul>
                <li><Text><Kbd>Shift</Kbd> <Kbd>↵</Kbd> to perform the contextual primary action.</Text></li>
                <li><Text><KbdAlt/> <Kbd>C</Kbd> to copy item content.</Text></li>
                <li><Text><KbdAlt/> <Kbd>E</Kbd> to edit.</Text></li>
                <li><Text><KbdAlt/> <Kbd>M</Kbd> to move item to another collection.</Text></li>
                <li><Text><KbdAlt/> <Kbd>BkSp</Kbd> to delete item.</Text></li>
                <li><Text><KbdMod/> <KbdAlt/> <Kbd>4</Kbd> to toggle copying content as item's primary action.</Text></li>
                <li><Text><KbdMod/> <KbdAlt/> <Kbd>5</Kbd> to refetch a link's metadata.</Text></li>
                <li><Text><KbdMod/> <KbdAlt/> <Kbd>6</Kbd> to convert a text note to a todo item.</Text></li>
            </ul>
            

        </Box>
    </Paper>
}
