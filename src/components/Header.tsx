import { useContext, useEffect } from "react";
import { Button, Container, Group, Text, Title } from "@mantine/core";
import { ThemeModeContext } from "../contexts/ThemeModeContext";
import { ThemeMode } from "../types";
import { BackendClientContext } from "../contexts/BackendClientContext";
import { NavLink } from "react-router-dom";

function Header() {

    const { setThemeMode } = useContext(ThemeModeContext);
    const pbClient = useContext(BackendClientContext);

    // useEffect(() => {
    //     console.log(pbClient)
    // }, []);

    // const rightCorner = () => pbClient.authStore.isValid
    //     ? LoginRegisterLink
    //     : UsernameDropdown
    
    const LoginRegisterLink = <Group>
        <NavLink to="login">Login</NavLink>
        <Text>/</Text>
        <NavLink to="register">Register</NavLink>
    </Group>

    const usernameDropdownMenu = <Group>
        Username
    </Group>

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

                {LoginRegisterLink}
                {/* {usernameDropdownMenu} */}

            </Group>
        </Group>
    </Container>
}

export default Header;