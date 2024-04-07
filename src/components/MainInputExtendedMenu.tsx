import { ItemsContext } from "@/contexts/ItemsContext";
import useIconPropsFromTheme from "@/hooks/useIconPropsFromTheme";
import useItemNavActions from "@/hooks/useItemNavActions";
import { AUTO_CLOSE_DEFAULT, AUTO_CLOSE_ERROR_TOAST, CREATE_TEXT_WITH_TITLE_PREFIX, CREATE_TODO_PREFIX } from "@/utils/constants";
import { Box, Menu } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconCheckbox, IconChevronDown, IconClipboardPlus, IconLayoutNavbar, IconX } from "@tabler/icons-react";
import { useContext } from "react";

type MainInputExtendedMenuOptions = {
    processMainInput: (input: string) => void,
    mainInputRef: React.ForwardedRef<HTMLInputElement>,
}

export default function MainInputExtendedMenu(
    {processMainInput, mainInputRef}: MainInputExtendedMenuOptions
) {

    const iconProps = useIconPropsFromTheme();
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
            <Box className="main-input__menu-btn"
                w={64}
            >
                <IconChevronDown
                    {...iconProps}
                />
            </Box>
        </Menu.Target>

        <Menu.Dropdown className="dropdown-menu">
            <Menu.Item
                leftSection={<IconLayoutNavbar {...iconProps} />}
                onClick={() => {
                    setInputVal(curr => `${CREATE_TEXT_WITH_TITLE_PREFIX} ${curr}`);
                    focusOnMainInput(mainInputRef as React.RefObject<HTMLInputElement>);
                }}
            >
                with title
            </Menu.Item>
            <Menu.Item
                leftSection={<IconCheckbox {...iconProps} />}
                onClick={() => {
                    setInputVal(curr => `${CREATE_TODO_PREFIX} ${curr}`);
                    focusOnMainInput(mainInputRef as React.RefObject<HTMLInputElement>);
                }}
            >
                as todo
            </Menu.Item>
            <Menu.Item
                leftSection={<IconClipboardPlus {...iconProps} />}
                onClick={enterFromClipboard}
            >
                from clipboard
            </Menu.Item>

            <Menu.Item
                leftSection={<IconX {...iconProps} />}
                onClick={() => {
                    setInputVal("");
                    focusOnMainInput(mainInputRef as React.RefObject<HTMLInputElement>);
                }}
            >
                clear input
            </Menu.Item>
        </Menu.Dropdown>
    </Menu>
};
