import { Container, Group } from "@mantine/core";
import HeaderLeftSide from "./HeaderLeftSide";
import HeaderRightSide from "./HeaderRightSide";
import "./header.scss";

function Header() {
    return <Container className="header" pl={0} pr={5}>
        <Group className="header__flex-wrapper"
            justify="space-between"
        >
            <HeaderLeftSide/>
            <HeaderRightSide/>
        </Group>
    </Container>
}

export default Header;