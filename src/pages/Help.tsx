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
            <Text>This application takes your operating system into account; <Kbd>Mod</Kbd> is appropriately assigned and displayed as either <Kbd>Ctrl</Kbd> or <Kbd>Cmd</Kbd>, depending on whether your are on Linux/Windows/Android or iOS/MacOS. Similarly for <Kbd>Alt</Kbd> and <Kbd>Opt</Kbd>. This is applicable to any contexual prompt display throughout the app, including this document.</Text>

            <Title order={4}>Everywhere</Title>
            <ul>
                <li><Text><KbdMod/> <Kbd>K</Kbd> or <KbdMod/> <Kbd>P</Kbd> to open Spotlight.</Text></li>
                <li> <Text><Kbd>Shift</Kbd> <Kbd>/</Kbd> to toggle display of contextual keyboard prompts.</Text></li>
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
                <li><Text><KbdAlt/> <Kbd>BkSp</Kbd> to delete item.</Text></li>
                <li><Text><KbdMod/> <KbdAlt/> <Kbd>4</Kbd> to toggle copying content as item's primary action.</Text></li>
                <li><Text><KbdMod/> <KbdAlt/> <Kbd>5</Kbd> to refetch a link's metadata.</Text></li>
                <li><Text><KbdMod/> <KbdAlt/> <Kbd>6</Kbd> to convert a title-less text note to a todo item.</Text></li>
            </ul>
        </Box>

        <Box className="cardlike__man-section"
            component="section"
        >
            <Title order={3}>Collection</Title>
            <Text>Collate notes, bookmarks, and todos for different categories under your collections. Access them from the dropdown menu, numeric keys <Kbd>1</Kbd>...<Kbd>0</Kbd>, or <Kbd>←</Kbd> <Kbd>→</Kbd>. You always must have at least one collection in your account.</Text>
        </Box>

        <Box className="cardlike__man-section"
            component="section"
        >
            <Title order={3}>Main Input</Title>
            <Text>The main input serves both as a search bar and the interface for new item creation. To create new item, input your content and press <Kbd>↵</Kbd>.</Text>
            <Text>Prefix syntaxes are available to quickly create item with options. Helpers for syntaxes are accessible from the dropdown menu on right side the input.</Text>
        </Box>

        <Box className="cardlike__man-section"
            component="section"
        >
            <Title order={3}>Prefix syntaxes</Title>
            <Text>These always start and end with the colon character (two vertical dots):</Text>
            <ul>
                <li><code>:t:</code> or <code>:l:</code> — create a text note with title.</li>
                <li><code>:td:</code> — create a todo item.</li>
            </ul>
            As examples:
            <ul>
                <li>Entering `:t: Email draft 2` will open the item create dialog, whose title input is pre-filled as "Email draft 2", allowing you to conveniently continue working on the content.</li>
                <li>Entering `:td: Buy groceries` will create a todo item with content "Buy groceries".</li>
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
            <Text>A todo item can be marked as completed. A text item without title can be converted into a todo item (this is a semi-destructive operation, due the title length limit, and is not reversible). To quickly create a todo action from the main input, use the <code>:td:</code> prefix.</Text>

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

    </Paper>
}
