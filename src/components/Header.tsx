import { useContext } from "react";
import { ActionIcon, Anchor, Box, Container, Group, Menu, Text, UnstyledButton, getThemeColor, useComputedColorScheme } from "@mantine/core";
import { ThemeModeContext } from "../contexts/ThemeModeContext";
import { ThemeMode, ComputedThemeMode } from "../types";
import { BackendClientContext } from "../contexts/BackendClientContext";
import { NavLink, useNavigate } from "react-router-dom";
import { IconChevronDown, IconLogout, IconMoon, IconNotebook, IconSettings, IconSettingsCog, IconSun } from "@tabler/icons-react";
import { justJotTheme } from "../theme";

function Header() {

    const { themeMode, setThemeMode } = useContext(ThemeModeContext);
    const { logout, isLoggedIn, setIsLoggedIn, user } = useContext(BackendClientContext);
    const computedThemeMode = useComputedColorScheme(ComputedThemeMode.LIGHT);
    const navigate = useNavigate()

    const isThemeModeLight = () => themeMode === ThemeMode.LIGHT;
    const isThemeModeDark = () => themeMode === ThemeMode.DARK;
    const isThemeModeAuto = () => themeMode === ThemeMode.AUTO;

    const attemptLogout = () => {
        logout();
        setIsLoggedIn(false);
        navigate("/", { replace: true});
    };

    const themeModeBtnColour = computedThemeMode === ComputedThemeMode.LIGHT
        ? justJotTheme.other.colText
        : justJotTheme.other.colTextDark;
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
            <Box className="header__left-side">
                <ActionIcon
                    variant="transparent"
                    component={NavLink} to="/"
                >
                    <IconNotebook size={40} stroke={1.5}/>
                </ActionIcon>
            </Box>

            <Group className="header__right-side"
                gap="md"
                justify="flex-end"
            >
                <Group className="header__theme-mode-container"
                    gap="sm"
                >
                    <ActionIcon className="header__theme-mode-btn"
                        variant={isThemeModeAuto() ? "outline" : "subtle"}
                        color={themeModeBtnColour}
                        radius="xl"
                        onClick={() => {setThemeMode(ThemeMode.AUTO)}}
                    >
                        <IconSettingsCog size={18}/>
                    </ActionIcon>
                    <ActionIcon className="header__theme-mode-btn"
                        variant={isThemeModeLight() ? "outline" : "subtle"}
                        color={themeModeBtnColour}
                        radius="xl"
                        onClick={() => {setThemeMode(ThemeMode.LIGHT)}}
                    >
                        <IconSun size={18}/>
                    </ActionIcon>
                    <ActionIcon className="header__theme-mode-btn"
                        variant={isThemeModeDark() ? "outline" : "subtle"}
                        color={themeModeBtnColour}
                        radius="xl"
                        onClick={() => {setThemeMode(ThemeMode.DARK)}}
                    >
                        <IconMoon size={18}/>
                    </ActionIcon>
                </Group>

                <Box className="header__user-corner">
                    {isLoggedIn
                        ? usernameDropdownMenu
                        : LoginRegisterLinks
                    }
                </Box>
            </Group>

        </Group>
    </Container>
}

export default Header;