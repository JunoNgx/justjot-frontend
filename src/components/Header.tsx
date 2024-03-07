import { Button, Group, Text, Title } from "@mantine/core";

function Header() {
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
                >
                    Auto
                </Button>
                <Button
                    className="header__theme-mode-option"
                >
                    Light
                </Button>
                <Button
                    className="header__theme-mode-option"
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