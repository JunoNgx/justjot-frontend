import { useContext } from "react";
import { Button, Group, Text, Title } from "@mantine/core";
import { ThemeModeContext } from "../contexts/ThemeModeContext";
import { ThemeMode } from "../types";

function Header() {

    const { setThemeMode } = useContext(ThemeModeContext);

    return <Group
        className="header"
        justify="space-between"
    >
        <div className="header__left-side">
            <Title
                order={1}
            >
                JustJot
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
            <Text>
                Login / Register
            </Text>
        </Group>
    </Group>
}

export default Header;