import { Code, Paper, Text, Title } from "@mantine/core";

export default function ProfileAccountDeletion() {
    return <Paper className="account-modal"
        withBorder p="md"
    >
        <Title order={3}>Account deletion</Title>
        
        <Text>For account deletion (which will also result in the permanent and irreversible destruction of your data), please send an email request:</Text>
        <ul>
            <li>From the email address associated with the account to be deleted, as verification.</li>
            <li>To the developer email address.</li>
            <li>With the email subject:</li>
        </ul>

        <Code>[JustJot] Account deletion request</Code>

    </Paper>
};
