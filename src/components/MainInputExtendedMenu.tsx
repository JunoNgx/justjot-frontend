import useIconPropsFromTheme from "@/hooks/useIconPropsFromTheme";
import { Box, Menu } from "@mantine/core";
import { IconCheckbox, IconChevronDown, IconClipboardPlus, IconLayoutNavbar } from "@tabler/icons-react";

export default function MainInputExtendedMenu() {

    const iconProps = useIconPropsFromTheme();

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
            >
                with title
            </Menu.Item>
            <Menu.Item
                leftSection={<IconCheckbox {...iconProps} />}
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
