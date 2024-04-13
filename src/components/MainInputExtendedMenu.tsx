import { ItemsContext } from "@/contexts/ItemsContext";
import useIconProps from "@/hooks/useIconProps";
import useItemNavActions from "@/hooks/useItemNavActions";
import { AUTO_CLOSE_DEFAULT, AUTO_CLOSE_ERROR_TOAST, CREATE_TEXT_WITH_TITLE_PREFIX, CREATE_TODO_PREFIX } from "@/utils/constants";
import { ActionIcon, Menu, MenuDivider } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { spotlight } from "@mantine/spotlight";
import { IconCheckbox, IconChevronDown, IconClipboardPlus, IconFocus, IconLayoutNavbar, IconX } from "@tabler/icons-react";
import { useContext } from "react";

type MainInputExtendedMenuOptions = {
    processMainInput: (input: string) => void,
    mainInputRef: React.ForwardedRef<HTMLInputElement>,
}

export default function MainInputExtendedMenu(
    {processMainInput, mainInputRef}: MainInputExtendedMenuOptions
) {

    const { menuIconProps } = useIconProps();
    const { setInputVal } = useContext(ItemsContext);
    const { focusOnMainInput } = useItemNavActions();
    // const mainInputInnerRef = useRef<HTMLInputElement>(null);

    // useEffect(() => {
    //     if (!mainInputRef) return;
    //     if (typeof mainInputRef === "function") {
    //         mainInputRef(mainInputInnerRef.current);
    //         return;
    //     }

    //     mainInputRef.current = mainInputInnerRef.current;
    // });

    const enterFromClipboard = () => {
        if (!navigator.clipboard.readText) {
            notifications.show({
                message: "Clipboard access is not provided by the browser",
                color: "none",
                autoClose: AUTO_CLOSE_DEFAULT,
                withCloseButton: true,
            })
            return;
        }

        navigator.clipboard
            .readText()
            .then((clipboardContent: string) => {
                processMainInput(clipboardContent);
            })
            .catch(err => {
                console.error(err);
                notifications.show({
                    message: "Error retrieving clipboard content",
                    color: "red",
                    autoClose: AUTO_CLOSE_ERROR_TOAST,
                    withCloseButton: true,
                });
            });
    }

    return <Menu 
        position="bottom-end"
        offset={18}
    >
        <Menu.Target>
            <ActionIcon variant="transparent"
                className="main-input__menu-btn"
                title="Main input extended options"
                aria-label="Extra functions and options for main input"
                w={64}
            >
                <IconChevronDown
                    {...menuIconProps}
                />
            </ActionIcon>
        </Menu.Target>

        <Menu.Dropdown className="dropdown-menu">
            <Menu.Item
                leftSection={<IconLayoutNavbar {...menuIconProps} />}
                onClick={() => {
                    setInputVal(curr => `${CREATE_TEXT_WITH_TITLE_PREFIX} ${curr}`);
                    focusOnMainInput(mainInputRef as React.RefObject<HTMLInputElement>);
                }}
            >
                with title
            </Menu.Item>
            <Menu.Item
                leftSection={<IconCheckbox {...menuIconProps} />}
                onClick={() => {
                    setInputVal(curr => `${CREATE_TODO_PREFIX} ${curr}`);
                    focusOnMainInput(mainInputRef as React.RefObject<HTMLInputElement>);
                }}
            >
                as todo
            </Menu.Item>
            <Menu.Item
                leftSection={<IconClipboardPlus {...menuIconProps} />}
                onClick={enterFromClipboard}
            >
                from clipboard
            </Menu.Item>

            <Menu.Item
                leftSection={<IconX {...menuIconProps} />}
                onClick={() => {
                    setInputVal("");
                    focusOnMainInput(mainInputRef as React.RefObject<HTMLInputElement>);
                }}
            >
                clear input
            </Menu.Item>

            <MenuDivider/>

            <Menu.Item
                leftSection={<IconFocus {...menuIconProps} />}
                onClick={() => {spotlight.open()}}
            >
                spotlight
            </Menu.Item>
        </Menu.Dropdown>
    </Menu>
};
