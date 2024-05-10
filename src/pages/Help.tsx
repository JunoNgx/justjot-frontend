import KbdAlt from "@/components/misc/KbdAlt";
import KbdMod from "@/components/misc/KbdMod";
import { CollectionsContext } from "@/contexts/CollectionsContext";
import { APP_NAME } from "@/utils/constants";
import { Anchor, Code, Paper, Text, Title } from "@mantine/core";
import { useContext, useEffect } from "react";
import "./Pages.scss";

export default function Help() {
    const { setCurrCollection } = useContext(CollectionsContext);

    useEffect(() => {
        setCurrCollection(undefined);
        document.title = `User Manual — ${APP_NAME}`;
    });

    return <Paper className="Cardlike Cardlike--LongDoc"
        p="md"
    >
        <Title order={2}>User Manual</Title>

        <section className="Cardlike__HelpSection">
            <Title order={3}>System requirement</Title>
            <Text>This application should run on any computing device with a W3C-compliant web browser and a stable internet connection, including mobile devices. For the best experience, a keyboard-equipped desktop environment is recommended.</Text>
        </section>

        <section className="Cardlike__HelpSection">

            <Title order={3}>Keyboard shortcuts</Title>
            <Title order={4}>Operating systems</Title>
            <Text>This application takes your operating system into account; <kbd>Mod</kbd> is appropriately assigned and displayed as either <kbd>Ctrl</kbd> or <kbd>Cmd</kbd>, depending on whether your are on Windows or Linux, or a Mac-based OS. Similarly for <kbd>Alt</kbd> and <kbd>Opt</kbd>. This is applicable to any contexual prompt display throughout the app, including this document.</Text>

            <Title order={4}>Everywhere</Title>
            <ul>
                <li><Text><KbdMod/> <kbd>K</kbd> or <KbdMod/> <kbd>P</kbd> to open Spotlight.</Text></li>
                <li> <Text><KbdMod/> <kbd>/</kbd> to toggle display of contextual keyboard prompts.</Text></li>
            </ul>

            <Title order={4}>Main Input is out of focus</Title>
            <ul>
                <li><Text><kbd>1</kbd>...<kbd>0</kbd> to switch to the corresponding ordered collection.</Text></li>
                <li><Text><kbd>←</kbd> <kbd>→</kbd> to switch to the adjacent collections.</Text></li>
                <li><Text><KbdMod/> <kbd>F</kbd> to focus on the Main Input.</Text></li>
            </ul>

            <Title order={4}>Main Input is focused</Title>
            <ul>
                <li><Text><kbd>↑</kbd> <kbd>↓</kbd> to select items.</Text></li>
                <li><Text><kbd>Shift</kbd> <kbd>↑</kbd> / <kbd>Shift</kbd> <kbd>↓</kbd> to select items in an increment of five.</Text></li>
                <li><Text><KbdMod/> <kbd>Shift</kbd> <kbd>↑</kbd> to scroll to the top of the list.</Text></li>
                <li><Text><KbdMod/> <kbd>Shift</kbd> <kbd>↓</kbd> to scroll to the bottom of the list.</Text></li>
                <li><Text><kbd>Esc</kbd> to exit Main Input focus.</Text></li>
            </ul>

            <Title order={4}>Selected item actions</Title>
            <ul>
                <li><Text><KbdMod/> <kbd>↵</kbd> to perform the primary action.</Text></li>
                <li><Text><KbdMod/> <kbd>Shift</kbd> <kbd>C</kbd> to copy item content.</Text></li>
                <li><Text><KbdMod/> <kbd>E</kbd> to edit.</Text></li>
                <li><Text><KbdMod/> <kbd>M</kbd> to move item to another collection.</Text></li>
                <li><Text><KbdMod/> <kbd>Shift</kbd> <kbd>BkSp</kbd> to move an item to the trash bin, or permanently delete a trashed item.</Text></li>
                <li><Text><KbdMod/> <KbdAlt/> <kbd>R</kbd> to restore a trashed item.</Text></li>
                <li><Text><KbdMod/> <KbdAlt/> <kbd>4</kbd> to toggle copying content as item's primary action.</Text></li>
                <li><Text><KbdMod/> <KbdAlt/> <kbd>5</kbd> to refetch a link's metadata.</Text></li>
                <li><Text><KbdMod/> <KbdAlt/> <kbd>6</kbd> to convert a title-less text note to a todo item.</Text></li>
            </ul>
        </section>

        <section className="Cardlike__HelpSection">
            <Title order={3}>Collection</Title>
            <Text>Collate notes, bookmarks, and todos for different categories under your collections. Access them from the dropdown menu, numeric keys <kbd>1</kbd>...<kbd>0</kbd>, or <kbd>←</kbd> <kbd>→</kbd>. You must have at least one collection in your account.</Text>
        </section>

        <section className="Cardlike__HelpSection">
            <Title order={3}>Main Input</Title>
            <Text>Serves both as a search bar and the interface for new item creation. To create new item, input your content and press <kbd>↵</kbd>.</Text>
            <Text>Prefix syntaxes are available to quickly create item with options. Helpers for syntaxes are accessible from the dropdown menu on right side the input.</Text>
        </section>

        <section className="Cardlike__HelpSection">
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
        </section>

        <section className="Cardlike__HelpSection">
            <Title order={3}>Item Type</Title>

            <Title order={4}>Text note</Title>
            <Text>Contains simple plain text data. An item is a note by default.</Text>

            <Title order={4}>Link/Bookmark</Title>
            <Text>If your entered input is detected as a url, it will be stored as a link. Links also contain metadata (page title and favicon), and attempts are always made to retrieve them.</Text>

            <Title order={4}>Todo</Title>
            <Text>A todo item can be marked as completed. A text item without title can be converted into a todo item (this is a semi-destructive operation, due the title length limit, and is not reversible). To quickly create a todo action from the Main Input, use the <Code>:td:</Code> prefix.</Text>

            <Title order={4}>Hex colour code</Title>
            <Text>As a special subtype of note, a hex colour code, when detected, will be accompanied by a corresponding icon. The logic validates the last seven characters in the item's content. As a lifehack, append a hex colour code to your text note to notate it in your own way.</Text>
        </section>

        <section className="Cardlike__HelpSection">
            <Title order={3}>Item actions</Title>
            <Text>There are two ways to perform item actions:</Text>
            <ul>
                <li>Context menu — right-clicking on your mouse or long-pressing on your touchscreen.</li>
                <li>Keypresses — prompts are contextually displayed on the lower right corner of the screen (which requires a minimum viewport width of 1280px to be displayed). A more complete list can also be found on top of this document.</li>
            </ul>

            <Title order={4}>Item edit</Title>
            <Text>Your changes are autosaved (with a short interval) during item edit. The autosave feature is unique to this user interface. Pressing <kbd>Esc</kbd> or <KbdMod/> <kbd>S</kbd> will pro-actively save progress, without waiting for the autosave interval, and close the modal.</Text>
        </section>

        <section className="Cardlike__HelpSection">
            <Title order={3}>Primary action</Title>
            <Text>An item's primary action is executed by clicking on it or pressing <kbd>Shift</kbd> <kbd>↵</kbd> while it is selected. This action varies depending on the item's type and settings:</Text>
            <ul>
                <li>Note — edit.</li>
                <li>Link — open in a new tab.</li>
                <li>Todo — toggle completed status.</li>
            </ul>
            <Text>You can also toggle the primary action of notes between edit and copy, and likewise for links between open and copy, from the context menu.</Text>
        </section>

        <section className="Cardlike__HelpSection">
            <Title order={3}>Spotlight</Title>
            <Text>Accessed by pressing <KbdMod/> <kbd>K</kbd> or <KbdMod/> <kbd>P</kbd> anywhere within the app, or from the Main Input extended menu.</Text>
            <Text>It serves as the global navigation menu. Use it to search for actions and collections quickly. For easy references:</Text>
            <ul>
                <li><Text>Navigation actions start with the slash character <Code>/</Code>.</Text></li>
                <li><Text>Performative actions start with the period <Code>.</Code>.</Text></li>
            </ul>
        </section>

        <section className="Cardlike__HelpSection">
            <Title order={3}>Frequently asked questions</Title>

            <Title order={4}>Why are my items not loaded?</Title>
            <Text>The most frequent cause for this is expired authentication token. Try logging out and re-logging in.</Text>

            <Title order={4}>Why can't I create item from clipboard?</Title>
            <Text>The clipboard usually contains your highly personal data and can be occasionally sensitive (e.g. passwords). As such, browsers take measures to make sure that your data is not wrongfully accessed by bad actors.</Text>
            <Text>Please check your browser's current settings to ensure that permission to access clipboard is provided.</Text>
            <Text>As of time of writing, the <Code>navigator.clipboard.readText</Code> interface is not supported in Firefox, and I have decided to not further complicate the codebase with any workaround.</Text>

            <Title order={4}>Why are your keyboard shortcuts so strange and unintuitive?</Title>
            <Text>Outside of tackling a relatively uncharted matter of keyboard-first design, JustJot is also burdened to accommodate the wide range of operating systems that can access the web, including, but not limited to: Windows, Android, MacOS, iOS, and distributions of Linux. While certain keys appear available on your current setup, they might not be on other users' systems. The keyboard shortcuts for item actions are also designed strictly to not interfere with the main input typing operations.</Text>
            <Text>The following keyboard shortcuts are known conflicts that we have eliminated during the development:</Text>
            <ul>
                <li><Text><kbd>Cmd</kbd> <kbd>C</kbd> [iOS] Copy highlighted text.</Text></li>
                <li><Text><kbd>Cmd</kbd> <kbd>BkSp</kbd> [iOS] Delete whole line.</Text></li>
                <li><Text><kbd>Ctrl</kbd> <kbd>BkSp</kbd> [Linux/Windows] Delete whole word.</Text></li>
                <li><Text><kbd>Shift</kbd> <kbd>Any letter key</kbd> [All] Capitalised letter.</Text></li>
                <li><Text><kbd>Opt</kbd> <kbd>Any letter key</kbd> [iOS/MacOS] Insert special character.</Text></li>
                <li><Text><kbd>Opt</kbd> <kbd>BkSp</kbd> [iOS] Delete whole word.</Text></li>
            </ul>
            <Text>The current arrangement is what we believe the be the most inclusive and functional possible state. Custom and user-assigned hotkeys might be looked into in the future, though this will be a massive undertaking.</Text>

            <Title order={4}>Why is the scrollbar so buggy on mobile?</Title>
            <Text>As per system requirement, it is recommended to use JustJot on a keyboard-equipped desktop. All design choices are optimised for this setup, which unfortunately means that compromises had to be made on other devices. That being said, the issues on mobile devices are known and a solution would be deployed as soon as possible when found.</Text>

        </section>

        <section className="Cardlike__HelpSection">
            <Title order={3}>Features road map</Title>
            <Text>The following features are under consideration for future developments, in descending order of priority:</Text>
            <ul>
                <li><Text>Development unit tests.</Text></li>
                <li><Text>User data export to JSON format.</Text></li>
                <li><Text>Self-serving user account deletion.</Text></li>
                <li><Text>Offline operations.</Text></li>
                <li><Text>Syntax highlighting and advance keybindings with Monaco Editor.</Text></li>
            </ul>
        </section>

        <section className="Cardlike__HelpSection">
            <Title order={3}>Contributions</Title>
            <Text>JustJot is fully open-source:</Text>
            <ul>
                <li><Anchor href="https://github.com/JunoNgx/justjot-frontend" target='_blank' rel='noopener noreferrer'>Frontend repository</Anchor></li>
                <li><Anchor href="https://github.com/JunoNgx/justjot-backend" target='_blank' rel='noopener noreferrer'>Backend repository</Anchor></li>
            </ul>
            <Text>While we welcome contributions, JustJot is also extremely opinionated and personal, and as such, we are selective about what should be added and developed.</Text>
            <Text>The best channel to start a conversation is via the GitHub issues, in either one of the two repositories (when in doubt, please post in the frontend repository).</Text>
        </section>

        <section className="Cardlike__HelpSection">
            <Title order={3}>Acknowledgement</Title>
            <Text>
                JustJot was made possible thanks to the plethora of wonderful works from the open-source communities:
            </Text>
            <ul className="Cardlike__acknowledgement-ul">
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
        </section>

    </Paper>
}
