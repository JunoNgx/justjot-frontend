import { Container, Text, Title } from "@mantine/core";

function Header() {
    return <Container
        className="header"
    >
        <div className="header__left-side">
            <Title
                order={1}
            >
                JustJot
            </Title>
        </div>

        <div className="header__right-side">
            <Container>
                Dark mode switch
            </Container>
            <Text>
                Login / Register
            </Text>
        </div>
    </Container>
}

export default Header;