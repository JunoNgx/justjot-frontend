import KbdAlt from "@/components/misc/KbdAlt";
import KbdMod from "@/components/misc/KbdMod";
import { CollectionsContext } from "@/contexts/CollectionsContext";
import { APP_NAME } from "@/utils/constants";
import { Anchor, Box, Code, Kbd, Paper, Text, Title } from "@mantine/core";
import { useContext, useEffect } from "react";

export default function Help() {
    const { setCurrCollection } = useContext(CollectionsContext);

    useEffect(() => {
        setCurrCollection(undefined);
        document.title = `User Manual — ${APP_NAME}`;
    });

    return <Paper className="cardlike cardlike--long-doc"
        p="md"
    >
        <Title order={2}>User Manual</Title>

        <Box className="cardlike__man-section"
            component="section"
            mb="xl"
        >
            <Title order={3}>Keyboard shortcuts</Title>
            <Title order={4}>Operating systems</Title>
            <Text>This application takes your operating system into account; <Kbd>Mod</Kbd> is appropriately assigned and displayed as either <Kbd>Ctrl</Kbd> or <Kbd>Cmd</Kbd>, depending on whether your are on Linux/Windows/Android or iOS/MacOS. Similarly for <Kbd>Alt</Kbd> and <Kbd>Opt</Kbd>. This is applicable to any contexual prompt display throughout the app, including this document.</Text>

            <Title order={4}>Everywhere</Title>
            <ul>
                <li><Text><KbdMod/> <Kbd>K</Kbd> or <KbdMod/> <Kbd>P</Kbd> to open Spotlight.</Text></li>
                <li> <Text><KbdMod/> <Kbd>/</Kbd> to toggle display of contextual keyboard prompts.</Text></li>
            </ul>

            <Title order={4}>Main Input is out of focus</Title>
            <ul>
                <li><Text><Kbd>1</Kbd>...<Kbd>0</Kbd> to switch to the corresponding ordered collection.</Text></li>
                <li><Text><Kbd>←</Kbd> <Kbd>→</Kbd> to switch to the adjacent collections.</Text></li>
                <li><Text><KbdMod/> <Kbd>F</Kbd> to focus on the Main Input.</Text></li>
            </ul>

            <Title order={4}>Main Input is focused</Title>
            <ul>
                <li><Text><Kbd>↑</Kbd> <Kbd>↓</Kbd> to select items.</Text></li>
                <li><Text><Kbd>Shift</Kbd> <Kbd>↑</Kbd> / <Kbd>Shift</Kbd> <Kbd>↓</Kbd> to select items in an increment of five.</Text></li>
                <li><Text><KbdMod/> <Kbd>Shift</Kbd> <Kbd>↑</Kbd> to scroll to the top of the list.</Text></li>
                <li><Text><KbdMod/> <Kbd>Shift</Kbd> <Kbd>↓</Kbd> to scroll to the bottom of the list.</Text></li>
                <li><Text><Kbd>Esc</Kbd> to exit Main Input focus.</Text></li>
            </ul>

            <Title order={4}>Selected item actions</Title>
            <ul>
                <li><Text><Kbd>Shift</Kbd> <Kbd>↵</Kbd> to perform the primary action.</Text></li>
                <li><Text><KbdAlt/> <Kbd>C</Kbd> to copy item content.</Text></li>
                <li><Text><KbdAlt/> <Kbd>E</Kbd> to edit.</Text></li>
                <li><Text><KbdAlt/> <Kbd>M</Kbd> to move item to another collection.</Text></li>
                <li><Text><Kbd>Shift</Kbd> <Kbd>BkSp</Kbd> to delete item.</Text></li>
                <li><Text><KbdMod/> <KbdAlt/> <Kbd>4</Kbd> to toggle copying content as item's primary action.</Text></li>
                <li><Text><KbdMod/> <KbdAlt/> <Kbd>5</Kbd> to refetch a link's metadata.</Text></li>
                <li><Text><KbdMod/> <KbdAlt/> <Kbd>6</Kbd> to convert a title-less text note to a todo item.</Text></li>
            </ul>
        </Box>

        <Box className="cardlike__man-section"
            component="section"
        >
            <Title order={3}>Collection</Title>
            <Text>Collate notes, bookmarks, and todos for different categories under your collections. Access them from the dropdown menu, numeric keys <Kbd>1</Kbd>...<Kbd>0</Kbd>, or <Kbd>←</Kbd> <Kbd>→</Kbd>. You must have at least one collection in your account.</Text>
        </Box>

        <Box className="cardlike__man-section"
            component="section"
        >
            <Title order={3}>Main Input</Title>
            <Text>Serves both as a search bar and the interface for new item creation. To create new item, input your content and press <Kbd>↵</Kbd>.</Text>
            <Text>Prefix syntaxes are available to quickly create item with options. Helpers for syntaxes are accessible from the dropdown menu on right side the input.</Text>
        </Box>

        <Box className="cardlike__man-section"
            component="section"
        >
            <Title order={3}>Prefix syntaxes</Title>
            <Text>These always start and end with the colon character:</Text>
            <ul>
                <li><Code>:t:</Code> or <Code>:l:</Code> — create a text note with title ("t" for title; "l" for long).</li>
                <li><Code>:td:</Code> — create a todo item.</li>
            </ul>
            As examples:
            <ul>
                <li>Entering <Code>:t: Email draft 2</Code> will open the item create dialog, whose title input is pre-filled as "Email draft 2", allowing you to conveniently continue working on the content.</li>
                <li>Entering <Code>:td: Buy groceries</Code> will create a todo item with content "Buy groceries".</li>
            </ul>
            <Text>Leading and trailing whitespaces are always trimmed; the spaces between the prefix and your input do not matter.</Text>
        </Box>

        <Box className="cardlike__man-section"
            component="section"
        >
            <Title order={3}>Item Type</Title>

            <Title order={4}>Text note</Title>
            <Text>Contains simple plain text data. An item is a note by default.</Text>

            <Title order={4}>Link/Bookmark</Title>
            <Text>If your entered input is detected as a url, it will be stored as a link. Links also contain metadata (page title and favicon), and attempts are always made to retrieve them.</Text>

            <Title order={4}>Todo</Title>
            <Text>A todo item can be marked as completed. A text item without title can be converted into a todo item (this is a semi-destructive operation, due the title length limit, and is not reversible). To quickly create a todo action from the Main Input, use the <Code>:td:</Code> prefix.</Text>

            <Title order={4}>Hex colour code</Title>
            <Text>As a special subtype of note, a hex colour code, when detected, will be accompanied by a corresponding icon. The logic validates the last seven characters in the item's content. As a lifehack, append a hex colour code to your text note to notate it in your own way.</Text>
        </Box>

        <Box className="cardlike__man-section"
            component="section"
        >
            <Title order={3}>Item actions</Title>
            <Text>There are two ways to perform item actions:</Text>
            <ul>
                <li>Context menu — right-clicking on your mouse or long-pressing on your touchscreen.</li>
                <li>Keypresses — prompts are contextually displayed on the lower right corner of the screen (which requires a minimum viewport width of 1280px to be displayed). A more complete list can also be found on top of this document.</li>
            </ul>
        </Box>

        <Box className="cardlike__man-section"
            component="section"
        >
            <Title order={3}>Primary action</Title>
            <Text>An item's primary action is executed by clicking on it or pressing <Kbd>Shift</Kbd> <Kbd>↵</Kbd> while it is selected. This action varies depending on the item's type and settings:</Text>
            <ul>
                <li>Note — edit.</li>
                <li>Link — open in a new tab.</li>
                <li>Todo — toggle completed status.</li>
            </ul>
            <Text>You can also toggle the primary action of notes between edit and copy, and likewise for links between open and copy, from the context menu.</Text>
        </Box>

        <Box className="cardlike__man-section"
            component="section"
        >
            <Title order={3}>Spotlight</Title>
            <Text>Accessed by pressing <KbdMod/> <Kbd>K</Kbd> or <KbdMod/> <Kbd>P</Kbd> anywhere within the app, or from the Main Input extended menu.</Text>
            <Text>It serves as the global navigation menu. Use it to search for actions and collections quickly.</Text>
        </Box>

        <Box className="cardlike__man-section"
            component="section"
        >
            <Title order={3}>Frequently asked questions</Title>

            <Title order={4}>Why are my items not loaded?</Title>
            <Text>The most frequent cause for this is expired authentication token. Try logging out and re-logging in.</Text>

            <Title order={4}>Why can't I create item from clipboard?</Title>
            <Text>The clipboard usually contains your highly personal data and can be occasionally sensitive (e.g. passwords). As such, browsers take measures to make sure that your data is not wrongfully accessed by bad actors.</Text>
            <Text>Please check your browser's current settings to ensure that permission to access clipboard is provided.</Text>
            <Text>As of time of writing, the <Code>navigator.clipboard.readText</Code> interface is not supported in Firefox, and I have decided to not further complicate the codebase with any workaround.</Text>

            <Title order={4}>Why are your keyboard shortcut so strange and unintuitive?</Title>
            <Text>Outside of tackling a relatively uncharted matter of keyboard-first design, JustJot is also burdened to accommodate the wide range of operating systems that can access the web, including, but not limited to: distributions of Linux, Windows, Android, MacOS, and iOS. While certain keys appear available on your current setup, they might not be on other users' systems. The keyboard shortcuts for item actions are also designed strictly to not interfere with the main input typing operations.</Text>
            <Text>The following keyboard shortcuts are known conflicts that we have eliminated during the development:</Text>
            <ul>
                <li><Text><Kbd>Cmd</Kbd> <Kbd>C</Kbd> [iOS] Copy highlighted text.</Text></li>
                <li><Text><Kbd>Cmd</Kbd> <Kbd>BkSp</Kbd> [iOS] Delete whole line.</Text></li>
                <li><Text><Kbd>Ctrl</Kbd> <Kbd>BkSp</Kbd> [Linux/Windows] Delete whole word.</Text></li>
                <li><Text><Kbd>Shift</Kbd> <Kbd>Any letter key</Kbd> [All] Capitalised letter.</Text></li>
                <li><Text><Kbd>Opt</Kbd> <Kbd>Any letter key</Kbd> [iOS/MacOS] Insert special character.</Text></li>
                <li><Text><Kbd>Opt</Kbd> <Kbd>BkSp</Kbd> [iOS] Delete whole word.</Text></li>
            </ul>
            <Text>The current arrangement is what we believe the be the most inclusive and functional possible state. Custom and user-assigned hotkeys might be looked into in the future, though this will be a massive undertaking.</Text>

            <Title order={4}>Why is the scrollbar so buggy on mobile?</Title>
            <Text>As per system requirement, it is recommended to use JustJot on a keyboard-equipped desktop. All design choices are optimised for this setup, which unfortunately means that compromises had to be made on other devices. That being said, the issues on mobile devices are known and a solution would be deployed as soon as possible when found.</Text>

        </Box>

        <Box className="cardlike__man-section"
            component="section"
        >
            <Title order={3}>Acknowledgement</Title>
            <Text>
                JustJot was made possible thanks to the plethora of wonderful works from the open-source communities:
            </Text>
            <ul className="cardlike__acknowledgement-ul">
                <li>
                    <Anchor href="https://react.dev/" target='_blank' rel='noopener noreferrer'>React</Anchor>
                </li>
                <li>
                    <Anchor href="https://www.typescriptlang.org/" target='_blank' rel='noopener noreferrer'>TypeScript</Anchor>
                </li>
                <li>
                    <Anchor href="https://pocketbase.io/" target='_blank' rel='noopener noreferrer'>PocketBase</Anchor>
                </li>
                <li>
                    <Anchor href="https://pockethost.io/" target='_blank' rel='noopener noreferrer'>PocketHost</Anchor>
                </li>
                <li>
                    <Anchor href="https://mantine.dev/" target='_blank' rel='noopener noreferrer'>Mantine UI Library</Anchor></li>
                <li>
                    <Anchor href="https://icflorescu.github.io/mantine-contextmenu/" target='_blank' rel='noopener noreferrer'>Mantine ContextMenu</Anchor>
                </li>
                <li>
                    <Anchor href="https://sass-lang.com/" target='_blank' rel='noopener noreferrer'>Sass</Anchor>
                </li>
            </ul>
            <Text mt="md">
                Very special thanks to <Anchor href="https://caseykwokdinata.webflow.io/" target='_blank' rel='noopener noreferrer'>Casey Kwokdinata</Anchor> for the design knowledge and support throughout the course of development.
            </Text>
            <Text mt="md">
                The brilliant <Anchor href="https://bmrks.com/" target='_blank' rel='noopener noreferrer'>bmrks</Anchor> heavily inspired the creation of JustJot.
            </Text>
        </Box>

    </Paper>
}
