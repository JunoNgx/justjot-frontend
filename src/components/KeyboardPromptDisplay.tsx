import { ActionIcon, Box, Divider, Group, Kbd, Paper, Stack, Text } from "@mantine/core";
import KbdMod from "./misc/KbdMod";
import { useContext } from "react";
import { ItemsContext } from "@/contexts/ItemsContext";
import { ItemType } from "@/types";
import { canConvertItemToTodo } from "@/utils/itemUtils";
import { useHotkeys, useLocalStorage } from "@mantine/hooks";
import { IconLayoutBottombarCollapse, IconLayoutBottombarExpand } from "@tabler/icons-react";
import useIconProps from "@/hooks/useIconProps";

type Hotkey = string[];
type KeyboardPrompt = Hotkey | Hotkey[];
type KeyboardPromptItemOptions = {
    prompt: KeyboardPrompt,
    desc: string,
    shouldDisplay?: boolean,
};
type CustomKeyboardPromptItemOptions = {
    leftSection: React.ReactNode,
    desc: string,
    shouldDisplay?: boolean,
};

export default function KeyboardPromptDisplay() {

    const {
        isMainInputFocused,
        selectedIndex,
        selectedItem,
    } = useContext(ItemsContext);
    const { keyboardPromptIconProps } = useIconProps();

    const [isExpanded, setIsExpanded] = useLocalStorage({
        key: "shouldDisplayKeyboardPrompt",
        defaultValue: true,
    });

    useHotkeys([
        ["Shift+Slash", () => setIsExpanded(curr => !curr), { preventDefault: true }],
    ], []);

    const hasSelectedItem = selectedIndex > -1;
    const hasSelectedWithKeyboard = isMainInputFocused && hasSelectedItem;
    const isLink = selectedItem?.type === ItemType.LINK;
    const canConvertToTodo = selectedItem && canConvertItemToTodo(selectedItem);

    const expandedContent = <>
        <KeyboardPromptItem
            prompt={["mod", "F"]}
            desc="Focus on Main Input"
            shouldDisplay={!isMainInputFocused}
        />
        <KeyboardPromptItem
            prompt={[["↑"], ["↓"]]}
            desc="Select item"
            shouldDisplay={isMainInputFocused}
        />
        <KeyboardPromptItem
            prompt={["mod", "Enter"]}
            desc="Perform primary action"
            shouldDisplay={hasSelectedWithKeyboard}
        />
        <KeyboardPromptItem
            prompt={["mod", "C"]}
            desc="Copy item content"
            shouldDisplay={hasSelectedWithKeyboard}
        />
        <KeyboardPromptItem
            prompt={["mod", "E"]}
            desc="Edit item"
            shouldDisplay={hasSelectedWithKeyboard}
        />
        <KeyboardPromptItem
            prompt={["mod", "M"]}
            desc="Move item"
            shouldDisplay={hasSelectedWithKeyboard}
        />
        <KeyboardPromptItem
            prompt={["mod", "Shift", "Backspace"]}
            desc="Delete item"
            shouldDisplay={hasSelectedWithKeyboard}
        />
        <KeyboardPromptItem
            prompt={["mod", "Alt", "4"]}
            desc="Toggle copy as primary action"
            shouldDisplay={hasSelectedWithKeyboard}
        />
        <KeyboardPromptItem
            prompt={["mod", "Alt", "5"]}
            desc="Refetch link metadata"
            shouldDisplay={hasSelectedWithKeyboard && isLink}
        />
        <KeyboardPromptItem
            prompt={["mod", "Alt", "6"]}
            desc="Convert item to Todo"
            shouldDisplay={hasSelectedWithKeyboard && canConvertToTodo}
        />
        <KeyboardPromptItem
            prompt={[["Shift", "↑"], ["Shift", "↓"]]}
            desc="Move by 5 items"
            shouldDisplay={isMainInputFocused}
        />
        <KeyboardPromptItem
            prompt={[["Mod", "Shift", "↑"], ["Mod", "Shift", "↓"]]}
            desc="Move to top/bottom"
            shouldDisplay={isMainInputFocused}
        />
        <KeyboardPromptItem
            prompt={["Esc"]}
            desc="Unfocus Main Input"
            shouldDisplay={isMainInputFocused}
        />

        <Divider />

        <CustomKeyboardPromptItem
            leftSection={<><Kbd>1</Kbd>...<Kbd>0</Kbd></>}
            desc="Switch to Collection"
            shouldDisplay={!isMainInputFocused}
        />
        <KeyboardPromptItem
            prompt={[["←"], ["→"]]}
            desc="Prev/Next Collection"
            shouldDisplay={!isMainInputFocused}
        />
        <KeyboardPromptItem
            prompt={[["mod", "K"], ["mod", "P"]]}
            desc="Spotlight"
        />
        <KeyboardPromptItem
            prompt={[["Shift", "/"]]}
            desc="Toggle keyboard prompts display"
        />
    </>

    const collapsedContent = <>
    </>
    
    const expandButton = <ActionIcon
        variant="subtle"
        onClick={() => setIsExpanded(true)}
        title="Show keyboard prompts"
    >
        <IconLayoutBottombarExpand {...keyboardPromptIconProps} />
    </ActionIcon>

    const collapseButton = <ActionIcon
        variant="subtle"
        onClick={() => setIsExpanded(false)}
        title="Hide keyboard prompts"
    >
        <IconLayoutBottombarCollapse {...keyboardPromptIconProps} />
    </ActionIcon>

    return <Paper className="keyboard-prompt-display dropdown-menu"
        // withBorder
        p="xs"
    >
        <Group justify="flex-end">
            {isExpanded ? collapseButton : expandButton}
        </Group>
        <Stack>
            {isExpanded
                ? expandedContent
                : collapsedContent
            }
        </Stack>
    </Paper>
};

const CustomKeyboardPromptItem = (
    {leftSection, desc, shouldDisplay = true}: CustomKeyboardPromptItemOptions
) => {
    if (!shouldDisplay)
        return "";

    return <Group
        justify="space-between"
    >
        <Box className="keyboard-prompt-display__prompt">{leftSection}</Box>
        <Text className="keyboard-prompt-display__desc">{desc}</Text>
    </Group>
}

const KeyboardPromptItem = (
    {prompt, desc, shouldDisplay = true}: KeyboardPromptItemOptions
) => {
    if (!shouldDisplay)
        return "";

    return <Group
        justify="space-between"
    >
        <SingleKeyboardPrompt prompt={prompt} />
        <Text className="keyboard-prompt-display__desc">{desc}</Text>
    </Group>
};

const SingleKeyboardPrompt = (
    {prompt}: {prompt: KeyboardPrompt}
) => {

    // Process and unify param into single type
    const promptList: Hotkey[] = (prompt[0] instanceof Array)
        ? prompt as Hotkey[]
        : [prompt as Hotkey];

    return <Box className="keyboard-prompt-display__prompt">
        {promptList.map((prompt, index) => {
            const isLastItem = index === promptList.length - 1;

            return <>
                <CombinationBtn btnLabelList={prompt} key={index} />
                {/* Separator for each combination option */}
                {!isLastItem && <span> / </span>}
            </>
        })}
    </Box>
};

const CombinationBtn = ({btnLabelList}: {btnLabelList: Hotkey}) => {
    return <>
        {btnLabelList.map((btnLabel, index) =>
            <>
                <SingleBtn key={index} btnLabel={btnLabel}/>
                {/* White space to separate each key */}
                <span> </span>
            </>
        )}
    </>
}

const SingleBtn = ({btnLabel}: {btnLabel: string}) => {
    return btnLabel==="mod"
        ? <KbdMod/>
        : <Kbd>{btnLabel}</Kbd>
};