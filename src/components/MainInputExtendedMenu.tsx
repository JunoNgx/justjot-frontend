import { ItemsContext } from "@/contexts/ItemsContext";
import useIconPropsFromTheme from "@/hooks/useIconPropsFromTheme";
import { AUTO_CLOSE_DEFAULT, AUTO_CLOSE_ERROR_TOAST, CREATE_TEXT_WITH_TITLE_PREFIX, CREATE_TODO_PREFIX } from "@/utils/constants";
import { Box, Menu } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconCheckbox, IconChevronDown, IconClipboardPlus, IconLayoutNavbar, IconX } from "@tabler/icons-react";
import { useContext } from "react";

export default function MainInputExtendedMenu(
    {processMainInput}: {processMainInput: (input: string) => void}
) {

    const iconProps = useIconPropsFromTheme();
    const { setInputVal } = useContext(ItemsContext);

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
                console.error(err)
                notifications.show({
                    message: "Error retrieving clipboard content",
                    color: "red",
                    autoClose: AUTO_CLOSE_ERROR_TOAST,
                    withCloseButton: true,
                })
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
                onClick={() => setInputVal(curr => `${CREATE_TEXT_WITH_TITLE_PREFIX} ${curr}`)}
            >
                with title
            </Menu.Item>
            <Menu.Item
                leftSection={<IconCheckbox {...iconProps} />}
                onClick={() => setInputVal(curr => `${CREATE_TODO_PREFIX} ${curr}`)}
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
                onClick={() => {setInputVal("")}}
            >
                clear input
            </Menu.Item>
        </Menu.Dropdown>
    </Menu>
};