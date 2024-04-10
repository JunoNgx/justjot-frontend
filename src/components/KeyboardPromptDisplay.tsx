import { Box, Group, Kbd, Paper, Stack, Text } from "@mantine/core";
import KbdMod from "./misc/KbdMod";

type Hotkey = string[];
type KeyboardPrompt = Hotkey | Hotkey[];
type KeyboardPromptItemOptions = {
    prompt: KeyboardPrompt,
    desc: string,
};

export default function KeyboardPromptDisplay() {
    return <Paper className="keyboard-prompt-display"
        // withBorder
        p="md"
    >
        <Stack>
            <KeyboardPromptItem
                prompt={[["mod", "K"], ["mod", "P"]]}
                desc="Spotlight"
            />
            <KeyboardPromptItem
                prompt={["mod", "F"]}
                desc="Main Input"
            />
        </Stack>
    </Paper>
};

const KeyboardPromptItem = (
    {prompt, desc}: KeyboardPromptItemOptions
) => {

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

    const promptContent = prompt.map((p, index) => {
        const isLastItem = index === prompt.length - 1;

        if (typeof p ==="string")
            return <SingleBtn key={index} btnLabel={p} />
        else return <>
            <CombinationBtn btnLabelList={p}/>
            {/* Separator for each combination option */}
            {!isLastItem && <span> / </span>}
        </>
    });

    return <Box>
        {promptContent}
    </Box>
};

const CombinationBtn = ({btnLabelList}: {btnLabelList: string[]}) => {
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