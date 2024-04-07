import { useContext } from "react";
import { Group, Menu, MenuDivider, Text, UnstyledButton } from "@mantine/core";
import { BackendClientContext } from "@/contexts/BackendClientContext";
import { useNavigate } from "react-router-dom";
import { IconChevronDown, IconHelp, IconLogout, IconUserCog } from "@tabler/icons-react";
import useIconPropsFromTheme from "@/hooks/useIconPropsFromTheme";

export default function HeaderUser() {

    const { logout, user } = useContext(BackendClientContext);
    const navigate = useNavigate()
    const username = user?.displayName || user?.username;

    const attemptLogout = () => {
        logout();
        navigate("/login", { replace: true});
    };

    const { menuIconProps } = useIconPropsFromTheme();

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
                onClick={() => navigate("/help")}
            >
                Help
            </Menu.Item>

            <MenuDivider/>

            <Menu.Item
                leftSection={<IconUserCog {...menuIconProps} />}
                onClick={() => navigate("/profile")}
            >
                Account
            </Menu.Item>
            <Menu.Item
                leftSection={<IconLogout {...menuIconProps} />}
                onClick={attemptLogout}
            >
                Logout
            </Menu.Item>
        </Menu.Dropdown>
    </Menu>
}