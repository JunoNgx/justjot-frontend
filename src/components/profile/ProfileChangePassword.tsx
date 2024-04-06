import { Anchor, Paper, Title } from "@mantine/core";
import { Link } from "react-router-dom";

export default function ProfileChangePassword() {
    return <Paper className="account-route-modal"
        withBorder p="md"
    >
        <Title order={3}>Change password</Title>
        
        For password change requests, please use the <Anchor component={Link} to="/reset">password rest form</Anchor>.
    </Paper>
};
