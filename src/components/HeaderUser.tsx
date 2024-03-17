import { useContext } from "react";
import { Group, Menu, Text, UnstyledButton } from "@mantine/core";
import { BackendClientContext } from "../contexts/BackendClientContext";
import { useNavigate } from "react-router-dom";
import { IconChevronDown, IconLogout, IconSettings } from "@tabler/icons-react";
import { justJotTheme } from "../theme";

export default function HeaderUser() {

    const { logout, setIsLoggedIn, user } = useContext(BackendClientContext);
    const navigate = useNavigate()
    const username = user?.displayName || user?.username;

    const attemptLogout = () => {
        logout();
        setIsLoggedIn(false);
        navigate("/", { replace: true});
    };

    return <Menu
        position="bottom-end"
        offset={20}
    >
        <Menu.Target>
            <UnstyledButton>
                <Group gap={6}>
                    <Text>{username}</Text>
                    <IconChevronDown
                        size={justJotTheme.other.iconSizeHeaderUser}
                        stroke={justJotTheme.other.iconStrokeWidth}
                    />
                </Group>
            </UnstyledButton>
        </Menu.Target>

        <Menu.Dropdown className="dropdown-menu">
            <Menu.Item leftSection={<IconSettings
                    size={justJotTheme.other.iconSizeMenu}
                    stroke={justJotTheme.other.iconStrokeWidth}
                />}
            >
                User settings
            </Menu.Item>
            <Menu.Item
                leftSection={<IconLogout
                    size={justJotTheme.other.iconSizeMenu}
                    stroke={justJotTheme.other.iconStrokeWidth}
                />}
                onClick={attemptLogout}
            >
                Logout
            </Menu.Item>
        </Menu.Dropdown>
    </Menu>
}