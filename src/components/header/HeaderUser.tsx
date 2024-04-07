import { useContext } from "react";
import { Group, Menu, MenuDivider, Text, UnstyledButton } from "@mantine/core";
import { BackendClientContext } from "@/contexts/BackendClientContext";
import { IconChevronDown, IconHelp, IconLogout, IconUserCog } from "@tabler/icons-react";
import useIconProps from "@/hooks/useIconProps";
import useNavigateRoutes from "@/hooks/useNavigateRoutes";

export default function HeaderUser() {

    const { user } = useContext(BackendClientContext);
    const {
        navigateToHelp,
        navigateToProfile,
        logoutAndNavigateToLogin,
    } = useNavigateRoutes();
    const { menuIconProps } = useIconProps();
    
    const username = user?.displayName || user?.username;

    return <Menu
        position="bottom-end"
        offset={15}
    >
        <Menu.Target>
            <UnstyledButton mr="xs">
                <Group gap={6}>
                    <Text>{username}</Text>
                    <IconChevronDown {...menuIconProps} />
                </Group>
            </UnstyledButton>
        </Menu.Target>

        <Menu.Dropdown className="dropdown-menu">
            <Menu.Item
                leftSection={<IconHelp {...menuIconProps} />}
                onClick={navigateToHelp}
            >
                Help
            </Menu.Item>

            <MenuDivider/>

            <Menu.Item
                leftSection={<IconUserCog {...menuIconProps} />}
                onClick={navigateToProfile}
            >
                Account
            </Menu.Item>
            <Menu.Item
                leftSection={<IconLogout {...menuIconProps} />}
                onClick={logoutAndNavigateToLogin}
            >
                Logout
            </Menu.Item>
        </Menu.Dropdown>
    </Menu>
}