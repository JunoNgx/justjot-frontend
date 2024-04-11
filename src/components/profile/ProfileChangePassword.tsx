import { Anchor, Paper, Text, Title } from "@mantine/core";
import { Link } from "react-router-dom";

export default function ProfileChangePassword() {
    return <Paper className="cardlike"
        withBorder p="md"
    >
        <Title className="cardlike__title"
            order={2}
        >
            Change password
        </Title>
        
        <Text>For password changes, please use the <Anchor component={Link} to="/reset">password reset form</Anchor>.</Text>
    </Paper>
};
