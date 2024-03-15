import { useContext } from "react";
import { ActionIcon, Anchor, Box, Container, Group, Menu, Text, UnstyledButton, useComputedColorScheme } from "@mantine/core";
import { ThemeModeContext } from "../contexts/ThemeModeContext";
import { ThemeMode, ComputedThemeMode } from "../types";
import { BackendClientContext } from "../contexts/BackendClientContext";
import { NavLink, useNavigate } from "react-router-dom";
import { IconChevronDown, IconLogout, IconMoon, IconNotebook, IconSettings, IconSettingsCog, IconSun } from "@tabler/icons-react";
import { justJotTheme } from "../theme";
import CollectionMenu from "./CollectionMenu";

function Header() {

    const { themeMode, setThemeMode } = useContext(ThemeModeContext);
    const { collections, currCollection } = useContext(BackendClientContext);
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

    const themeModeContainer = <Group className="header__theme-mode-container"
        gap="xs"
    >
        <ActionIcon className="header__theme-mode-btn"
            variant={isThemeModeAuto() ? "outline" : "subtle"}
            color={themeModeBtnColour}
            radius="xl"
            onClick={() => {setThemeMode(ThemeMode.AUTO)}}
        >
            <IconSettingsCog
                size={justJotTheme.other.iconSizeThemeMode}
                stroke={justJotTheme.other.iconStrokeWidth}
            />
        </ActionIcon>
        <ActionIcon className="header__theme-mode-btn"
            variant={isThemeModeLight() ? "outline" : "subtle"}
            color={themeModeBtnColour}
            radius="xl"
            onClick={() => {setThemeMode(ThemeMode.LIGHT)}}
        >
            <IconSun
                size={justJotTheme.other.iconSizeThemeMode}
                stroke={justJotTheme.other.iconStrokeWidth}
            />
        </ActionIcon>
        <ActionIcon className="header__theme-mode-btn"
            variant={isThemeModeDark() ? "outline" : "subtle"}
            color={themeModeBtnColour}
            radius="xl"
            onClick={() => {setThemeMode(ThemeMode.DARK)}}
        >
            <IconMoon
                size={justJotTheme.other.iconSizeThemeMode}
                stroke={justJotTheme.other.iconStrokeWidth}
            />
        </ActionIcon>
    </Group>

    const leftSideGroup = <Group className="header__left-side"
        gap="md"
    >
        <ActionIcon
            variant="transparent"
            component={NavLink} to="/"
            size="xl"
        >
            <IconNotebook
                color={justJotTheme.other.colLogo}
                size={justJotTheme.other.iconSizeHeaderLogo}
                stroke={justJotTheme.other.iconStrokeWidth}
            />
        </ActionIcon>
        <CollectionMenu
            currCollection={currCollection}
            collections={collections}
            isInHeader={true}
        />
    </Group>

    const rightSideGroup = <Group className="header__right-side"
        gap="md"
        justify="flex-end"
    >
        {themeModeContainer}

        <Box className="header__user-corner">
            {isLoggedIn
                ? usernameDropdownMenu
                : LoginRegisterLinks
            }
        </Box>
    </Group>

    return <Container className="header">
        <Group className="header__flex-wrapper"
            justify="space-between"
        >
            {leftSideGroup}
            {rightSideGroup}            
        </Group>
    </Container>
}

export default Header;