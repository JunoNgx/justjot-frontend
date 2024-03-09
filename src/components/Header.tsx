import { useContext, useEffect } from "react";
import { Box, Button, Container, Group, Menu, Text, Title, UnstyledButton } from "@mantine/core";
import { ThemeModeContext } from "../contexts/ThemeModeContext";
import { ThemeMode } from "../types";
import { BackendClientContext } from "../contexts/BackendClientContext";
import { NavLink, useNavigate } from "react-router-dom";
import { IconChevronDown, IconLogout, IconSettings } from "@tabler/icons-react";

function Header() {

    const { setThemeMode } = useContext(ThemeModeContext);
    const { logout, isLoggedIn, setIsLoggedIn, user } = useContext(BackendClientContext);
    const navigate = useNavigate()

    const attemptLogout = () => {
        logout();
        setIsLoggedIn(false);
        navigate("/", { replace: true});
    };

    const username = user?.username || "User"
    
    const LoginRegisterLink = <Group>
        <NavLink to="login">Login</NavLink>
        <Text>/</Text>
        <NavLink to="register">Register</NavLink>
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
            >
                <Group className="header__theme-mode-container"
                    gap="sm"
                >
                    <Button
                        className="header__theme-mode-option"
                        onClick={() => {setThemeMode(ThemeMode.AUTO)}}
                    >
                        Auto
                    </Button>
                    <Button
                        className="header__theme-mode-option"
                        onClick={() => {setThemeMode(ThemeMode.LIGHT)}}
                    >
                        Light
                    </Button>
                    <Button
                        className="header__theme-mode-option"
                        onClick={() => {setThemeMode(ThemeMode.DARK)}}
                    >
                        Dark
                    </Button>
                </Group>
                {/* <Button onClick={attemptLogout}>Logout</Button> */}

                {isLoggedIn
                    ? usernameDropdownMenu
                    : LoginRegisterLink
                }

            </Group>
        </Group>
    </Container>
}

export default Header;