import { ActionIcon, Box, Divider, Group, Kbd, Paper, Stack, Text } from "@mantine/core";
import KbdMod from "./misc/KbdMod";
import { useContext } from "react";
import { ItemsContext } from "@/contexts/ItemsContext";
import { computeItemActionString } from "@/utils/itemUtils";
import { useHotkeys, useLocalStorage } from "@mantine/hooks";
import {IconSquareChevronDown, IconSquareChevronUp } from "@tabler/icons-react";
import useIconProps from "@/hooks/useIconProps";
import useItemActions from "@/hooks/useItemActions";
import KbdAlt from "./misc/KbdAlt";

type Hotkey = string[];
type KeyboardPrompt = Hotkey | Hotkey[];
type KeyboardPromptItemOptions = {
    prompt: KeyboardPrompt,
    desc: string,
    shouldDisplay?: boolean,
};
// type CustomKeyboardPromptItemOptions = {
//     leftSection: React.ReactNode,
//     desc: string,
//     shouldDisplay?: boolean,
// };

export default function KeyboardPromptDisplay() {

    const {
        isMainInputFocused,
        selectedIndex,
        selectedItem,
    } = useContext(ItemsContext);
    const { computeItemPrimaryAction } = useItemActions();
    const { keyboardPromptIconProps } = useIconProps();

    const [isExpanded, setIsExpanded] = useLocalStorage({
        key: "shouldDisplayKeyboardPrompt",
        defaultValue: true,
    });

    useHotkeys([
        ["mod+Slash", () => setIsExpanded(curr => !curr), { preventDefault: true }],
    ], []);

    const hasSelectedItem = selectedIndex > -1;
    const hasSelectedWithKeyboard = isMainInputFocused && hasSelectedItem;
    const primaryAction = selectedItem && computeItemPrimaryAction(selectedItem);
    const primaryActionStr = primaryAction && computeItemActionString(primaryAction);

    const expandedContent = 
        <Stack className="keyboard-prompt-display__list">
            <KeyboardPromptItem
                prompt={["mod", "F"]}
                desc="Main Input"
                shouldDisplay={!isMainInputFocused}
            />
            <KeyboardPromptItem
                prompt={[["↑"], ["↓"]]}
                desc="Select item"
                shouldDisplay={isMainInputFocused}
            />
            <KeyboardPromptItem
                prompt={["Shift", "↵"]}
                desc={`Primary action: ${primaryActionStr}`}
                shouldDisplay={hasSelectedWithKeyboard}
            />
            <KeyboardPromptItem
                prompt={["alt", "C"]}
                desc="Copy item content"
                shouldDisplay={hasSelectedWithKeyboard}
            />
            <KeyboardPromptItem
                prompt={["alt", "E"]}
                desc="Edit item"
                shouldDisplay={hasSelectedWithKeyboard}
            />
            <KeyboardPromptItem
                prompt={["alt", "M"]}
                desc="Move item"
                shouldDisplay={hasSelectedWithKeyboard}
            />
            <KeyboardPromptItem
                prompt={["Shift", "BkSp"]}
                desc="Delete item"
                shouldDisplay={hasSelectedWithKeyboard}
            />
            {/* <KeyboardPromptItem
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
                prompt={[["mod", "Shift", "↑"], ["Mod", "Shift", "↓"]]}
                desc="Move to top/bottom"
                shouldDisplay={isMainInputFocused}
            />
            <KeyboardPromptItem
                prompt={["Esc"]}
                desc="Unfocus Main Input"
                shouldDisplay={isMainInputFocused}
            /> */}

            <Divider />

            {/* <CustomKeyboardPromptItem
                leftSection={<><Kbd>1</Kbd>...<Kbd>0</Kbd></>}
                desc="Switch to Collection"
                shouldDisplay={!isMainInputFocused}
            />
            <KeyboardPromptItem
                prompt={[["←"], ["→"]]}
                desc="Prev/Next Collection"
                shouldDisplay={!isMainInputFocused}
            /> */}
            <KeyboardPromptItem
                prompt={[["mod", "K"], ["mod", "P"]]}
                desc="Spotlight"
            />
            <KeyboardPromptItem
                prompt={[["mod", "/"]]}
                desc="Toggle keyboard prompts display"
            />
        </Stack>

    const expandButton = <ActionIcon
        className="keyboard-prompt-display__button"
        variant="subtle"
        onClick={() => setIsExpanded(true)}
        title="Show keyboard prompts"
    >
        <IconSquareChevronUp {...keyboardPromptIconProps} />
    </ActionIcon>

    const collapseButton = <ActionIcon
        className="keyboard-prompt-display__button"
        variant="subtle"
        onClick={() => setIsExpanded(false)}
        title="Hide keyboard prompts"
        mt="xs"
    >
        <IconSquareChevronDown {...keyboardPromptIconProps} />
    </ActionIcon>

    return <Paper className="keyboard-prompt-display dropdown-menu"
        // withBorder
        p="xs"
    >
        {isExpanded && expandedContent}

        <Group justify="flex-end">
            {isExpanded ? collapseButton : expandButton}
        </Group>
    </Paper>
};

// const CustomKeyboardPromptItem = (
//     {leftSection, desc, shouldDisplay = true}: CustomKeyboardPromptItemOptions
// ) => {
//     if (!shouldDisplay)
//         return "";

//     return <Group
//         justify="space-between"
//     >
//         <Box className="keyboard-prompt-display__prompt">{leftSection}</Box>
//         <Text className="keyboard-prompt-display__desc">{desc}</Text>
//     </Group>
// }

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
    switch (btnLabel) {
    case ("mod"):
        return <KbdMod/>;
    case ("alt"):
        return <KbdAlt/>;
    default:
        return <Kbd>{btnLabel}</Kbd>;
    }
};