import { Box, Divider, Group, Kbd, Paper, Stack, Text } from "@mantine/core";
import KbdMod from "./misc/KbdMod";
import { useContext } from "react";
import { ItemsContext } from "@/contexts/ItemsContext";

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

    const { isMainInputFocused, selectedIndex } = useContext(ItemsContext);
    const hasSelectedItem = selectedIndex > -1;

    return <Paper className="keyboard-prompt-display dropdown-menu"
        // withBorder
        p="xs"
    >
        <Stack>
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
                prompt={["mod", "Enter"]}
                desc="Perform primary action"
                shouldDisplay={isMainInputFocused && hasSelectedItem}
            />
            <KeyboardPromptItem
                prompt={["mod", "C"]}
                desc="Copy item content"
                shouldDisplay={isMainInputFocused && hasSelectedItem}
            />
            <KeyboardPromptItem
                prompt={["mod", "E"]}
                desc="Edit item"
                shouldDisplay={isMainInputFocused && hasSelectedItem}
            />
            <KeyboardPromptItem
                prompt={["mod", "M"]}
                desc="Move item"
                shouldDisplay={isMainInputFocused && hasSelectedItem}
            />
            <KeyboardPromptItem
                prompt={["mod", "Shift", "Backspace"]}
                desc="Delete item"
                shouldDisplay={isMainInputFocused && hasSelectedItem}
            />

            <Divider />

            <CustomKeyboardPromptItem
                leftSection={<Box><Kbd>1</Kbd>...<Kbd>0</Kbd></Box>}
                desc="Switch to Collection"
            />
            <KeyboardPromptItem
                prompt={[["←"], ["→"]]}
                desc="Prev/Next Collection"
            />
            <KeyboardPromptItem
                prompt={[["mod", "K"], ["mod", "P"]]}
                desc="Spotlight"
            />
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
        {leftSection}
        <Text>{desc}</Text>
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
        <Text>{desc}</Text>
    </Group>
};

const SingleKeyboardPrompt = (
    {prompt}: {prompt: KeyboardPrompt}
) => {

    // Process and unify param into single type
    const promptList: Hotkey[] = (prompt[0] instanceof Array)
        ? prompt as Hotkey[]
        : [prompt as Hotkey];

    return <Box>
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