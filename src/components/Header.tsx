import { useContext } from "react";
import { ActionIcon, Anchor, Container, Group, Menu, Text, Title, UnstyledButton } from "@mantine/core";
import { ThemeModeContext } from "../contexts/ThemeModeContext";
import { ThemeMode } from "../types";
import { BackendClientContext } from "../contexts/BackendClientContext";
import { NavLink, useNavigate } from "react-router-dom";
import { IconChevronDown, IconLogout, IconMoon, IconSettings, IconSettingsCog, IconSun } from "@tabler/icons-react";

function Header() {

    const { themeMode, setThemeMode } = useContext(ThemeModeContext);
    const { logout, isLoggedIn, setIsLoggedIn, user } = useContext(BackendClientContext);
    const navigate = useNavigate()

    const isThemeModeLight = () => themeMode === ThemeMode.LIGHT;
    const isThemeModeDark = () => themeMode === ThemeMode.DARK;
    const isThemeModeAuto = () => themeMode === ThemeMode.AUTO;

    const attemptLogout = () => {
        logout();
        setIsLoggedIn(false);
        navigate("/", { replace: true});
    };

    const username = user?.displayName || user?.username;

    const LoginRegisterLinks = <Group>
        <Anchor component={NavLink} to="login">Login</Anchor>
        <Text>/</Text>
        <Anchor component={NavLink} to="register">Register</Anchor>
    </Group>

    const usernameDropdownMenu = <Menu
        position="bottom-end"
    >
        <Menu.Target>
            <UnstyledButton>
                <Group gap={6}>
                    <Text>{username}</Text>
                    <IconChevronDown size={14}/>
                </Group>
            </UnstyledButton>
        </Menu.Target>

        <Menu.Dropdown>
            <Menu.Item leftSection={<IconSettings size={14}/>}>User settings</Menu.Item>
            <Menu.Item
                leftSection={<IconLogout size={14}/>}
                onClick={attemptLogout}
            >
                Logout
            </Menu.Item>
        </Menu.Dropdown>
    </Menu>

    return <Container>
        <Group
            className="header"
            justify="space-between"
        >
            <div className="header__left-side">
                <Title
                    order={1}
                >
                    JJ
                </Title>
            </div>

            <Group
                className="header__right-side"
                gap="md"
                justify="flex-end"
            >
                <Group className="header__theme-mode-container"
                    gap="sm"
                >
                    <ActionIcon
                        variant={isThemeModeAuto() ? "outline" : "subtle"}
                        radius="xl"
                        className="header__theme-mode-option"
                        onClick={() => {setThemeMode(ThemeMode.AUTO)}}
                    >
                        <IconSettingsCog size={18}/>
                    </ActionIcon>
                    <ActionIcon
                        variant={isThemeModeLight() ? "outline" : "subtle"}
                        radius="xl"
                        className="header__theme-mode-option"
                        onClick={() => {setThemeMode(ThemeMode.LIGHT)}}
                    >
                        <IconSun size={18}/>
                    </ActionIcon>
                    <ActionIcon
                        variant={isThemeModeDark() ? "outline" : "subtle"}
                        radius="xl"
                        className="header__theme-mode-option"
                        onClick={() => {setThemeMode(ThemeMode.DARK)}}
                    >
                        <IconMoon size={18}/>
                    </ActionIcon>
                </Group>


                {isLoggedIn
                    ? usernameDropdownMenu
                    : LoginRegisterLinks
                }
            </Group>

        </Group>
    </Container>
}

export default Header;