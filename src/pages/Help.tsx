import KbdAlt from "@/components/misc/KbdAlt";
import KbdMod from "@/components/misc/KbdMod";
import { CollectionsContext } from "@/contexts/CollectionsContext";
import { APP_NAME } from "@/utils/constants";
import { useContext, useEffect } from "react";
import "./Pages.scss";

export default function Help() {
    const { setCurrCollection } = useContext(CollectionsContext);

    useEffect(() => {
        setCurrCollection(undefined);
        document.title = `User Manual — ${APP_NAME}`;
    });

    return <div className="Cardlike Cardlike--LongDoc">
        <h2>User Manual</h2>

        <section className="Cardlike__HelpSection"
            id="SystemRequirement"
        >
            <h3>System requirement</h3>
            <p>This application should run on any computing device with a W3C-compliant web browser and a stable internet connection, including mobile devices. For the best experience, a keyboard-equipped desktop environment is recommended.</p>
        </section>

        <section className="Cardlike__HelpSection"
            id="KeyboardShortcuts"
        >

            <h3>Keyboard shortcuts</h3>
            <h4>Operating systems</h4>
            <p>This application takes your operating system into account; <kbd>Mod</kbd> is appropriately assigned and displayed as either <kbd>Ctrl</kbd> or <kbd>Cmd</kbd>, depending on whether your are on Windows or Linux, or a Mac-based OS. Similarly for <kbd>Alt</kbd> and <kbd>Opt</kbd>. This is applicable to any contexual prompt display throughout the app, including this document.</p>

            <h4>Everywhere</h4>
            <ul>
                <li><p><KbdMod/> <kbd>K</kbd> or <KbdMod/> <kbd>P</kbd> to open Spotlight.</p></li>
                <li> <p><KbdMod/> <kbd>/</kbd> to toggle display of contextual keyboard prompts.</p></li>
            </ul>

            <h4>Main Input is out of focus</h4>
            <ul>
                <li><p><kbd>1</kbd>...<kbd>0</kbd> to switch to the corresponding ordered collection.</p></li>
                <li><p><kbd>←</kbd> <kbd>→</kbd> to switch to the adjacent collections.</p></li>
                <li><p><KbdMod/> <kbd>F</kbd> to focus on the Main Input.</p></li>
            </ul>

            <h4>Main Input is focused</h4>
            <ul>
                <li><p><kbd>↑</kbd> <kbd>↓</kbd> to select items.</p></li>
                <li><p><kbd>Shift</kbd> <kbd>↑</kbd> / <kbd>Shift</kbd> <kbd>↓</kbd> to select items in an increment of five.</p></li>
                <li><p><KbdMod/> <kbd>Shift</kbd> <kbd>↑</kbd> to scroll to the top of the list.</p></li>
                <li><p><KbdMod/> <kbd>Shift</kbd> <kbd>↓</kbd> to scroll to the bottom of the list.</p></li>
                <li><p><kbd>Esc</kbd> to exit Main Input focus.</p></li>
            </ul>

            <h4>Selected item actions</h4>
            <ul>
                <li><p><KbdMod/> <kbd>↵</kbd> to perform the primary action.</p></li>
                <li><p><KbdMod/> <kbd>Shift</kbd> <kbd>C</kbd> to copy item content.</p></li>
                <li><p><KbdMod/> <kbd>E</kbd> to edit.</p></li>
                <li><p><KbdMod/> <kbd>M</kbd> to move item to another collection.</p></li>
                <li><p><KbdMod/> <kbd>Shift</kbd> <kbd>BkSp</kbd> to move an item to the trash bin, or permanently delete a trashed item.</p></li>
                <li><p><KbdMod/> <KbdAlt/> <kbd>R</kbd> to restore a trashed item.</p></li>
                <li><p><KbdMod/> <KbdAlt/> <kbd>4</kbd> to toggle copying content as item's primary action.</p></li>
                <li><p><KbdMod/> <KbdAlt/> <kbd>5</kbd> to refetch a link's metadata.</p></li>
                <li><p><KbdMod/> <KbdAlt/> <kbd>6</kbd> to convert a title-less text note to a todo item.</p></li>
            </ul>
        </section>

        <section className="Cardlike__HelpSection"
            id="Collections"
        >
            <h3>Collection</h3>
            <p>Collate notes, bookmarks, and todos for different categories under your collections. Access them from the dropdown menu, numeric keys <kbd>1</kbd>...<kbd>0</kbd>, or <kbd>←</kbd> <kbd>→</kbd>. You must have at least one collection in your account.</p>
        </section>

        <section className="Cardlike__HelpSection"
            id="MainInput"
        >
            <h3>Main Input</h3>
            <p>Serves both as a search bar and the interface for new item creation. To create new item, input your content and press <kbd>↵</kbd>.</p>
            <p>Prefix syntaxes are available to quickly create item with options. Helpers for syntaxes are accessible from the dropdown menu on right side the input.</p>
        </section>

        <section className="Cardlike__HelpSection"
            id="PrefixSyntaxes"
        >
            <h3>Prefix syntaxes</h3>
            <p>These always start and end with the colon character:</p>
            <ul>
                <li><code>:t:</code> or <code>:l:</code> — create a text note with title ("t" for title; "l" for long).</li>
                <li><code>:td:</code> — create a todo item.</li>
            </ul>
            As examples:
            <ul>
                <li>Entering <code>:t: Email draft 2</code> will open the item create dialog, whose title input is pre-filled as "Email draft 2", allowing you to conveniently continue working on the content.</li>
                <li>Entering <code>:td: Buy groceries</code> will create a todo item with content "Buy groceries".</li>
            </ul>
            <p>Leading and trailing whitespaces are always trimmed; the spaces between the prefix and your input do not matter.</p>
        </section>

        <section className="Cardlike__HelpSection"
            id="FilterIncompleteTodos"
        >
            <h3>Filter incomplete todo tasks only</h3>
            <p>To display only incomplete todo tasks, type <code>::itd::</code> into the Main Input:</p>
            <ul>
                <li>Without entering.</li>
                <li>Without any leading or trailing whitespace.</li>
                <li>Without any other content.</li>
            </ul>
            <p>A shorthand for this is also accessible from the Main Input extended menu.</p>
            <p>As a side effect, this special search parameter will unfortunately negate the ability to search for this particular string, if you happen to use such content.</p>
        </section>

        <section className="Cardlike__HelpSection"
            id="ItemTypes"
        >
            <h3>Item Type</h3>

            <h4>Text note</h4>
            <p>Contains simple plain text data. An item is a note by default.</p>

            <h4>Link/Bookmark</h4>
            <p>If your entered input is detected as a url, it will be stored as a link. Links also contain metadata (page title and favicon), and attempts are always made to retrieve them.</p>

            <h4>Todo</h4>
            <p>A todo item can be marked as completed. A text item without title can be converted into a todo item (this is a semi-destructive operation, due the title length limit, and is not reversible). To quickly create a todo action from the Main Input, use the <code>:td:</code> prefix.</p>

            <h4>Hex colour code</h4>
            <p>As a special subtype of note, a hex colour code, when detected, will be accompanied by a corresponding icon. The logic validates the last seven characters in the item's content. As a lifehack, append a hex colour code to your text note to notate it in your own way.</p>
        </section>

        <section className="Cardlike__HelpSection"
            id="ItemActions"
        >
            <h3>Item actions</h3>
            <p>There are two ways to perform item actions:</p>
            <ul>
                <li>Context menu — right-clicking on your mouse or long-pressing on your touchscreen.</li>
                <li>Keypresses — prompts are contextually displayed on the lower right corner of the screen (which requires a minimum viewport width of 1280px to be displayed). A more complete list can also be found on top of this document.</li>
            </ul>

            <h4>Item edit</h4>
            <p>Your changes are autosaved (with a short interval) during item edit. The autosave feature is unique to this user interface. Pressing <kbd>Esc</kbd> or <KbdMod/> <kbd>S</kbd> will pro-actively save progress, without waiting for the autosave interval, and close the modal.</p>
        </section>

        <section className="Cardlike__HelpSection"
            id="PrimaryActions"
        >
            <h3>Primary action</h3>
            <p>An item's primary action is executed by clicking on it or pressing <kbd>Shift</kbd> <kbd>↵</kbd> while it is selected. This action varies depending on the item's type and settings:</p>
            <ul>
                <li>Note — edit.</li>
                <li>Link — open in a new tab.</li>
                <li>Todo — toggle completed status.</li>
            </ul>
            <p>You can also toggle the primary action of notes between edit and copy, and likewise for links between open and copy, from the context menu.</p>
        </section>

        <section className="Cardlike__HelpSection"
            id="Spotlight"
        >
            <h3>Spotlight</h3>
            <p>Accessed by pressing <KbdMod/> <kbd>K</kbd> or <KbdMod/> <kbd>P</kbd> anywhere within the app, or from the Main Input extended menu.</p>
            <p>It serves as the global navigation menu. Use it to search for actions and collections quickly. For easy references:</p>
            <ul>
                <li><p>Navigation actions start with the slash character <code>/</code>.</p></li>
                <li><p>Performative actions start with the period <code>.</code>.</p></li>
            </ul>
        </section>

        <section className="Cardlike__HelpSection"
            id="faq"
        >
            <h3>Frequently asked questions</h3>

            <h4>Why are my items not loaded?</h4>
            <p>The most frequent cause for this is expired authentication token. Try logging out and re-logging in.</p>

            <h4>Why can't I create item from clipboard?</h4>
            <p>The clipboard usually contains your highly personal data and can be occasionally sensitive (e.g. passwords). As such, browsers take measures to make sure that your data is not wrongfully accessed by bad actors.</p>
            <p>Please check your browser's current settings to ensure that permission to access clipboard is provided.</p>
            <p>As of time of writing, the <code>navigator.clipboard.readText</code> interface is not supported in Firefox, and I have decided to not further complicate the codebase with any workaround.</p>

            <h4>Why are your keyboard shortcuts so strange and unintuitive?</h4>
            <p>Outside of tackling a relatively uncharted matter of keyboard-first design, JustJot is also burdened to accommodate the wide range of operating systems that can access the web, including, but not limited to: Windows, Android, MacOS, iOS, and distributions of Linux. While certain keys appear available on your current setup, they might not be on other users' systems. The keyboard shortcuts for item actions are also designed strictly to not interfere with the main input typing operations.</p>
            <p>The following keyboard shortcuts are known conflicts that we have eliminated during the development:</p>
            <ul>
                <li><p><kbd>Cmd</kbd> <kbd>C</kbd> [iOS] Copy highlighted text.</p></li>
                <li><p><kbd>Cmd</kbd> <kbd>BkSp</kbd> [iOS] Delete whole line.</p></li>
                <li><p><kbd>Ctrl</kbd> <kbd>BkSp</kbd> [Linux/Windows] Delete whole word.</p></li>
                <li><p><kbd>Shift</kbd> <kbd>Any letter key</kbd> [All] Capitalised letter.</p></li>
                <li><p><kbd>Opt</kbd> <kbd>Any letter key</kbd> [iOS/MacOS] Insert special character.</p></li>
                <li><p><kbd>Opt</kbd> <kbd>BkSp</kbd> [iOS] Delete whole word.</p></li>
            </ul>
            <p>The current arrangement is what we believe the be the most inclusive and functional possible state. Custom and user-assigned hotkeys might be looked into in the future, though this will be a massive undertaking.</p>

            <h4>Why is the scrollbar so buggy on mobile?</h4>
            <p>As per system requirement, it is recommended to use JustJot on a keyboard-equipped desktop. All design choices are optimised for this setup, which unfortunately means that compromises had to be made on other devices. That being said, the issues on mobile devices are known and a solution would be deployed as soon as possible when found.</p>

        </section>

        <section className="Cardlike__HelpSection"
            id="RoadMap"
        >
            <h3>Features road map</h3>
            <p>The following features are under consideration for future developments, in descending order of priority:</p>
            <ul>
                <li><p>Development unit tests.</p></li>
                <li><p>User data export to JSON format.</p></li>
                <li><p>Self-serving user account deletion.</p></li>
                <li><p>Offline operations.</p></li>
                <li><p>Syntax highlighting and advance keybindings with Monaco Editor.</p></li>
            </ul>
        </section>

        <section className="Cardlike__HelpSection"
            id="Contributions"
        >
            <h3>Contributions</h3>
            <p>JustJot is fully open-source:</p>
            <ul>
                <li><a href="https://github.com/JunoNgx/justjot-frontend" target='_blank' rel='noopener noreferrer'>Frontend repository</a></li>
                <li><a href="https://github.com/JunoNgx/justjot-backend" target='_blank' rel='noopener noreferrer'>Backend repository</a></li>
            </ul>
            <p>While we welcome contributions, JustJot is also extremely opinionated and personal, and as such, we are selective about what should be added and developed.</p>
            <p>The best channel to start a conversation is via the GitHub issues, in either one of the two repositories (when in doubt, please post in the frontend repository).</p>
        </section>

        <section className="Cardlike__HelpSection"
            id="Acknowledgement"
        >
            <h3>Acknowledgement</h3>
            <p>
                JustJot was made possible thanks to the plethora of wonderful works from the open-source communities:
            </p>
            <ul className="Cardlike__acknowledgement-ul">
                <li>
                    <a href="https://react.dev/" target='_blank' rel='noopener noreferrer'>React</a>
                </li>
                <li>
                    <a href="https://www.typescriptlang.org/" target='_blank' rel='noopener noreferrer'>TypeScript</a>
                </li>
                <li>
                    <a href="https://pocketbase.io/" target='_blank' rel='noopener noreferrer'>PocketBase</a>
                </li>
                <li>
                    <a href="https://pockethost.io/" target='_blank' rel='noopener noreferrer'>PocketHost</a>
                </li>
                <li>
                    <a href="https://mantine.dev/" target='_blank' rel='noopener noreferrer'>Mantine UI Library</a></li>
                <li>
                    <a href="https://icflorescu.github.io/mantine-contextmenu/" target='_blank' rel='noopener noreferrer'>Mantine ContextMenu (no longer used)</a>
                </li>
                <li>
                    <a href="https://sass-lang.com/" target='_blank' rel='noopener noreferrer'>Sass</a>
                </li>
                <li>
                    <a href="https://www.radix-ui.com/primitives" target='_blank' rel='noopener noreferrer'>Radix Primitives</a>
                </li>
            </ul>
            <p>
                Very special thanks to <a href="https://caseykwokdinata.webflow.io/" target='_blank' rel='noopener noreferrer'>Casey Kwokdinata</a> for the design knowledge and support throughout the course of development.
            </p>
            <p>
                The brilliant <a href="https://bmrks.com/" target='_blank' rel='noopener noreferrer'>bmrks</a> heavily inspired the creation of JustJot.
            </p>
        </section>

    </div>
}
