import { Box, Divider, Group, Kbd, Paper, Stack, Text } from "@mantine/core";
import KbdMod from "./misc/KbdMod";

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
    return <Paper className="keyboard-prompt-display"
        // withBorder
        p="xs"
    >
        <Stack>
            <KeyboardPromptItem
                prompt={["mod", "F"]}
                desc="Main Input"
            />

            <Divider />

            <CustomKeyboardPromptItem
                leftSection={<Box><Kbd>1</Kbd>...<Kbd>0</Kbd></Box>}
                desc="Switch to Collection"
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