import { ItemsContext } from "@/contexts/ItemsContext";
import useIconPropsFromTheme from "@/hooks/useIconPropsFromTheme";
import { CREATE_TEXT_WITH_TITLE_PREFIX, CREATE_TODO_PREFIX } from "@/utils/constants";
import { Box, Menu } from "@mantine/core";
import { IconCheckbox, IconChevronDown, IconClipboardPlus, IconLayoutNavbar } from "@tabler/icons-react";
import { useContext } from "react";

export default function MainInputExtendedMenu() {

    const iconProps = useIconPropsFromTheme();
    const { setInputVal } = useContext(ItemsContext);

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
            >
                from clipboard
            </Menu.Item>
        </Menu.Dropdown>
    </Menu>
};
