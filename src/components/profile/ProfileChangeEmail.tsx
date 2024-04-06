import { BackendClientContext } from "@/contexts/BackendClientContext";
import { DbTable } from "@/types";
import { Button, Group, Paper, Text, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useContext, useState } from "react";
import ErrorResponseDisplay from "@/components/ErrorResponseDisplay";
import { ClientResponseError } from "pocketbase";

export default function ProfileChangeEmail() {

    const { pbClient } = useContext(BackendClientContext);
    const form = useForm({
        initialValues: {
            newEmail: "",
        }
    });
    const [hasAttempted, setHasAttempted] = useState(false);
    const [isSuccessful, setIsSuccessful] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorRes, setErrorRes] = useState<ClientResponseError | null>(null);
    const handleSubmission = async (
        { newEmail }:
        { newEmail: string }
    ) => {
        setIsLoading(true);
        setHasAttempted(true);
        setIsSuccessful(false);
        setErrorRes(null);

        await pbClient.collection(DbTable.USERS)
            .requestEmailChange(newEmail)
            .then((_isSuccessful: boolean) => {
                setIsSuccessful(true);
            })
            .catch((err: ClientResponseError) => {
                setIsSuccessful(false);
                setErrorRes(err);
            });
        setIsLoading(false);
    };

    return <Paper className="account-route-modal"
        withBorder p="md"
    >
        <form onSubmit={form.onSubmit(handleSubmission)}>
            <Title order={3}>Change email</Title>

            <TextInput mt="md"
                label="New email"
                description="Must be unique."
                required
                type="email"
                {...form.getInputProps('newEmail')}
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

        {(hasAttempted && isSuccessful) &&
            <Text c="green" mt="xs">
                Request successful. Please check the inbox of your new email address for a confirmation link.
            </Text>
        }

        {(hasAttempted && !isSuccessful) &&
            <ErrorResponseDisplay errRes={errorRes} />
        }

    </Paper>
}