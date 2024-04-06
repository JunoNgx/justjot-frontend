import { BackendClientContext } from "@/contexts/BackendClientContext";
import { Button, Group, Paper, Text, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useContext, useState } from "react";

export default function ProfileChangeDisplayName() {

    const { user } = useContext(BackendClientContext);
    const form = useForm({
        initialValues: {
            displayName: "",
        }
    });
    const [isLoading, setIsLoading] = useState(false);
    const handleSubmission = (
        { displayName }:
        { displayName: string }
    ) => {
        console.log(displayName)
    };

    return <Paper className="account-route-modal"
        withBorder p="md"
    >
        <form onSubmit={form.onSubmit(handleSubmission)}>
            <Title order={3}>Change display name</Title>

            {user!.displayName
                ? <Text>Your current display name is: <em>{user!.displayName}</em></Text>
                : <Text>You account currently does not have a display name.</Text>
            }

            <TextInput mt="md"
                label="Display name"
                description="How you would like to display yourself, as an alternative to your username. Can be blank."
                type="text"
                {...form.getInputProps('displayName')}
            />

            <Group
                mt="md"
                justify="flex-end"
            >
                <Button type="submit"
                    loading={isLoading}
                >
                    Submit
                </Button>
            </Group>
        </form>
    </Paper>
};
