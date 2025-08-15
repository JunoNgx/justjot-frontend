import { ItemsContext } from "@/contexts/ItemsContext";
import useIconProps from "@/hooks/useIconProps";
import useItemNavActions from "@/hooks/useItemNavActions";
import {
    AUTO_CLOSE_DEFAULT,
    AUTO_CLOSE_ERROR_TOAST,
    CREATE_TEXT_WITH_TITLE_PREFIX,
    CREATE_TODO_PREFIX,
    FILTER_SYNTAX_INCOMPLETE_TODOS,
    FILTER_SYNTAX_LINKS,
    FILTER_SYNTAX_NOTES,
    FILTER_SYNTAX_TODOS,
} from "@/utils/constants";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { notifications } from "@mantine/notifications";
import { spotlight } from "@mantine/spotlight";
import {
    IconCheckbox,
    IconChevronDown,
    IconClipboardPlus,
    IconFileText,
    IconFocus,
    IconLayoutNavbar,
    IconList,
    IconListCheck,
    IconWorld,
    IconX,
} from "@tabler/icons-react";
import { useContext, useState } from "react";
import LabelWithIcon from "@/libs/components/LabelWithIcon";

import "./MainInput.scss";

type MainInputExtendedMenuOptions = {
    processMainInput: (input: string) => void;
    mainInputRef: React.RefObject<HTMLInputElement | null>;
};

export default function MainInputExtendedMenu({
    processMainInput,
    mainInputRef,
}: MainInputExtendedMenuOptions) {
    const { menuIconProps } = useIconProps();
    const { setInputVal } = useContext(ItemsContext);
    const { focusOnMainInput } = useItemNavActions();
    const [shouldFocusOnMainInput, setShouldFocusOnMainInput] = useState(false);

    const enterFromClipboard = () => {
        if (!navigator.clipboard.readText) {
            notifications.show({
                message: "Clipboard access is not provided by the browser",
                color: "none",
                autoClose: AUTO_CLOSE_DEFAULT,
                withCloseButton: true,
            });
            return;
        }

        navigator.clipboard
            .readText()
            .then((clipboardContent: string) => {
                processMainInput(clipboardContent);
            })
            .catch((err) => {
                console.error(err);
                notifications.show({
                    message: "Error retrieving clipboard content",
                    color: "red",
                    autoClose: AUTO_CLOSE_ERROR_TOAST,
                    withCloseButton: true,
                });
            });
    };

    type prependSyntaxOptions = {
        content: string;
        hasSpace?: boolean;
        shouldRefocus?: boolean;
    };

    const prependSyntax = ({
        content,
        hasSpace = false,
        shouldRefocus = false,
    }: prependSyntaxOptions) => {
        setInputVal((curr) =>
            hasSpace ? `${content} ${curr}` : `${content}${curr}`
        );
        if (shouldRefocus) setShouldFocusOnMainInput(true);
    };

    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger className="MainInputDropdown__Btn">
                <div
                    className="MainInputDropdown__BtnLabel"
                    title="Main input extended options"
                    aria-label="Extra functions and options for main input"
                >
                    <IconChevronDown {...menuIconProps} />
                </div>
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
                <DropdownMenu.Content
                    className="MainInputDropdown"
                    align="end"
                    sideOffset={10}
                    // alignOffset={0}
                    onCloseAutoFocus={(e) => {
                        if (shouldFocusOnMainInput) {
                            e.preventDefault();
                            focusOnMainInput(mainInputRef);
                            setShouldFocusOnMainInput(false);
                        }
                    }}
                >
                    <DropdownMenu.Label className="MainInputDropdown__GroupLabel">
                        New item
                    </DropdownMenu.Label>

                    <DropdownMenu.Item
                        className="MainInputDropdown__Item"
                        onClick={() =>
                            prependSyntax({
                                content: CREATE_TEXT_WITH_TITLE_PREFIX,
                                hasSpace: true,
                                shouldRefocus: true,
                            })
                        }
                    >
                        <LabelWithIcon
                            leftSection={
                                <IconLayoutNavbar {...menuIconProps} />
                            }
                        >
                            with title
                        </LabelWithIcon>
                    </DropdownMenu.Item>

                    <DropdownMenu.Item
                        className="MainInputDropdown__Item"
                        onClick={() =>
                            prependSyntax({
                                content: CREATE_TODO_PREFIX,
                                hasSpace: true,
                                shouldRefocus: true,
                            })
                        }
                    >
                        <LabelWithIcon
                            leftSection={<IconCheckbox {...menuIconProps} />}
                        >
                            as todo
                        </LabelWithIcon>
                    </DropdownMenu.Item>

                    <DropdownMenu.Item
                        className="MainInputDropdown__Item"
                        onClick={enterFromClipboard}
                    >
                        <LabelWithIcon
                            leftSection={
                                <IconClipboardPlus {...menuIconProps} />
                            }
                        >
                            from clipboard
                        </LabelWithIcon>
                    </DropdownMenu.Item>

                    <DropdownMenu.Separator className="MainInputDropdown__Separator" />

                    <DropdownMenu.Label className="MainInputDropdown__GroupLabel">
                        Filters
                    </DropdownMenu.Label>

                    <DropdownMenu.Item
                        className="MainInputDropdown__Item"
                        onClick={() =>
                            prependSyntax({ content: FILTER_SYNTAX_NOTES })
                        }
                    >
                        <LabelWithIcon
                            leftSection={<IconFileText {...menuIconProps} />}
                        >
                            notes
                        </LabelWithIcon>
                    </DropdownMenu.Item>

                    <DropdownMenu.Item
                        className="MainInputDropdown__Item"
                        onClick={() =>
                            prependSyntax({ content: FILTER_SYNTAX_LINKS })
                        }
                    >
                        <LabelWithIcon
                            leftSection={<IconWorld {...menuIconProps} />}
                        >
                            links
                        </LabelWithIcon>
                    </DropdownMenu.Item>

                    <DropdownMenu.Item
                        className="MainInputDropdown__Item"
                        onClick={() =>
                            prependSyntax({ content: FILTER_SYNTAX_TODOS })
                        }
                    >
                        <LabelWithIcon
                            leftSection={<IconListCheck {...menuIconProps} />}
                        >
                            all todos
                        </LabelWithIcon>
                    </DropdownMenu.Item>

                    <DropdownMenu.Item
                        className="MainInputDropdown__Item"
                        onClick={() =>
                            prependSyntax({
                                content: FILTER_SYNTAX_INCOMPLETE_TODOS,
                            })
                        }
                    >
                        <LabelWithIcon
                            leftSection={<IconList {...menuIconProps} />}
                        >
                            incomplete todos
                        </LabelWithIcon>
                    </DropdownMenu.Item>

                    <DropdownMenu.Separator className="MainInputDropdown__Separator" />

                    <DropdownMenu.Label className="MainInputDropdown__GroupLabel">
                        Misc
                    </DropdownMenu.Label>

                    <DropdownMenu.Item
                        className="MainInputDropdown__Item"
                        onClick={() => {
                            setInputVal("");
                            setShouldFocusOnMainInput(true);
                        }}
                    >
                        <LabelWithIcon
                            leftSection={<IconX {...menuIconProps} />}
                        >
                            clear input
                        </LabelWithIcon>
                    </DropdownMenu.Item>

                    <DropdownMenu.Item
                        className="MainInputDropdown__Item"
                        onClick={() => {
                            spotlight.open();
                        }}
                    >
                        <LabelWithIcon
                            leftSection={<IconFocus {...menuIconProps} />}
                        >
                            open spotlight
                        </LabelWithIcon>
                    </DropdownMenu.Item>
                </DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
    );
}
