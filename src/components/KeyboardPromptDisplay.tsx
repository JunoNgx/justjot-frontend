import KbdMod from "./misc/KbdMod";
import { useContext } from "react";
import { ItemsContext } from "@/contexts/ItemsContext";
import { canConvertItemToTodo, canMoveItem, canRestoreItem, computeItemActionString } from "@/utils/itemUtils";
import { useHotkeys, useLocalStorage } from "@mantine/hooks";
import {IconSquareChevronDown, IconSquareChevronUp } from "@tabler/icons-react";
import useIconProps from "@/hooks/useIconProps";
import useItemActions from "@/hooks/useItemActions";
import KbdAlt from "./misc/KbdAlt";
import IconButton from "@/libs/components/IconButton";

import "./KeyboardPromptDisplay.scss";

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
    const canConvertToTodo = selectedItem && canConvertItemToTodo(selectedItem);

    const expandedContent = 
        <div className="KeyboardPrompt__List"
            aria-hidden={!isExpanded}
        >
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
                prompt={["mod", "↵"]}
                desc={`Primary action: ${primaryActionStr}`}
                shouldDisplay={hasSelectedWithKeyboard}
            />
            <KeyboardPromptItem
                prompt={["mod", "Shift", "C"]}
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
                shouldDisplay={hasSelectedWithKeyboard
                    && selectedItem
                    && canMoveItem(selectedItem)
                }
            />
            <KeyboardPromptItem
                prompt={["mod", "alt", "R"]}
                desc="Restore item"
                shouldDisplay={hasSelectedWithKeyboard
                    && selectedItem
                    && canRestoreItem(selectedItem)
                }
            />
            <KeyboardPromptItem
                prompt={["mod", "Shift", "BkSp"]}
                desc={selectedItem?.isTrashed ? "Delete item" : "Trash item"}
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
            /> */}
            <KeyboardPromptItem
                prompt={["mod", "Alt", "6"]}
                desc="Convert item to Todo"
                shouldDisplay={hasSelectedWithKeyboard && canConvertToTodo}
            />
            {/* <KeyboardPromptItem
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

            <div className="KeyboardPrompt__Divider" />

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
        </div>

    const expandButton = <IconButton
        className="KeyboardPrompt__ToggleDisplayButton"
        onClick={() => setIsExpanded(true)}
        title="Show keyboard prompts"
    >
        <IconSquareChevronUp {...keyboardPromptIconProps} />
    </IconButton>

    const collapseButton = <IconButton
        className="KeyboardPrompt__ToggleDisplayButton"
        onClick={() => setIsExpanded(false)}
        title="Hide keyboard prompts"
    >
        <IconSquareChevronDown {...keyboardPromptIconProps} />
    </IconButton>

    return <div className="KeyboardPrompt">
        {isExpanded && expandedContent}

        <div className="KeyboardPrompt__BtnContainer">
            {isExpanded ? collapseButton : expandButton}
        </div>
    </div>
}

// const CustomKeyboardPromptItem = (
//     {leftSection, desc, shouldDisplay = true}: CustomKeyboardPromptItemOptions
// ) => {
//     if (!shouldDisplay)
//         return "";

//     return <Group
//         justify="space-between"
//     >
//         <Box className="KeyboardPrompt__Prompt">{leftSection}</Box>
//         <Text className="KeyboardPrompt__Desc">{desc}</Text>
//     </Group>
// }

const KeyboardPromptItem = (
    {prompt, desc, shouldDisplay = true}: KeyboardPromptItemOptions
) => {
    if (!shouldDisplay)
        return "";

    return <div className="KeyboardPrompt__Item">
        <SingleKeyboardPrompt prompt={prompt} />
        <p className="KeyboardPrompt__Desc">{desc}</p>
    </div>
};

const SingleKeyboardPrompt = (
    {prompt}: {prompt: KeyboardPrompt}
) => {

    // Process and unify param into single type
    const promptList: Hotkey[] = (prompt[0] instanceof Array)
        ? prompt as Hotkey[]
        : [prompt as Hotkey];

    return <div className="KeyboardPrompt__Prompt">
        {promptList.map((prompt, index) => {
            const isLastItem = index === promptList.length - 1;

            return <span key={index}>
                <CombinationBtn btnLabelList={prompt} />
                {/* Separator for each combination option */}
                {!isLastItem && <span> / </span>}
            </span>
        })}
    </div>
};

const CombinationBtn = ({btnLabelList}: {btnLabelList: Hotkey}) => {
    return <>
        {btnLabelList.map((btnLabel, index) => {
            const isLastItem = index === btnLabelList.length - 1;

            return <span key={index}>
                <SingleBtn btnLabel={btnLabel}/>
                {/* White space to separate each key */}
                {!isLastItem && <span> </span>}
            </span>
        }
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
        return <kbd>{btnLabel}</kbd>;
    }
};