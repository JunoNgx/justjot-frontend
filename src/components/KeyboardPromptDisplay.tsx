import { Box, Group, Kbd, Paper, Text } from "@mantine/core";
import KbdMod from "./misc/KbdMod";

type Hotkey = string[];
type KeyboardPromptItemOptions = {
    prompt: Hotkey | Hotkey[],
    desc: string,
};

export default function KeyboardPromptDisplay() {
    return <Paper className="keyboard-prompt-display"
        // withBorder
        p="md"
    >
        <PromptItem
            prompt={[["mod", "K"], ["mod", "P"]]}
            desc="Spotlight"
        />
    </Paper>
};

const PromptItem = (
    {prompt, desc}: KeyboardPromptItemOptions
) => {

    const promptDisplay = prompt.map((p, index) => {
        const isLastItem = index === prompt.length - 1;

        if (typeof p ==="string")
            return <SingleBtn key={index} btnLabel={p} />
        else return <>
            <CombinationBtn btnLabelList={p}/>
            {/* Separator for each combination option */}
            {!isLastItem && <span> / </span>}
        </>
    });

    return <Group
        justify="space-between"
    >
        <Box>{promptDisplay}</Box>
        <Text>{desc}</Text>
    </Group>
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