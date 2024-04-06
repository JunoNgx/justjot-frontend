import { useContext } from "react";
import { Group, Menu, Text, UnstyledButton } from "@mantine/core";
import { BackendClientContext } from "@/contexts/BackendClientContext";
import { useNavigate } from "react-router-dom";
import { IconChevronDown, IconLogout, IconSettings } from "@tabler/icons-react";
import useIconPropsFromTheme from "@/hooks/useIconPropsFromTheme";

export default function HeaderUser() {

    const { logout, user } = useContext(BackendClientContext);
    const navigate = useNavigate()
    const username = user?.displayName || user?.username;

    const attemptLogout = () => {
        logout();
        navigate("/", { replace: true});
    };

    const iconProps = useIconPropsFromTheme();

    return <Menu
        position="bottom-end"
        offset={15}
    >
        <Menu.Target>
            <UnstyledButton>
                <Group gap={6}>
                    <Text>{username}</Text>
                    <IconChevronDown {...iconProps} />
                </Group>
            </UnstyledButton>
        </Menu.Target>

        <Menu.Dropdown className="dropdown-menu">
            <Menu.Item
                leftSection={<IconSettings {...iconProps} />}
                onClick={() => navigate("/profile")}
            >
                User settings
            </Menu.Item>
            <Menu.Item
                leftSection={<IconLogout {...iconProps} />}
                onClick={attemptLogout}
            >
                Logout
            </Menu.Item>
        </Menu.Dropdown>
    </Menu>
}