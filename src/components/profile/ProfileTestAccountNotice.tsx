import { Paper, Text, Title } from "@mantine/core";

export default function ProfileTestAccountNotice() {
    return <Paper className="cardlike"
        withBorder
        p="md"
    >
        <Title className="cardlike__title"
            order={2}
        >
            Test account notice
        </Title>
        
        <Text>Several functionalities are limited and/or not displayed for the test account.</Text>
    </Paper>
}
