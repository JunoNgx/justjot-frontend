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
    const [errRes, setErrRes] = useState<ClientResponseError | null>(null);

    const handleSubmission = async (
        { newEmail }:
        { newEmail: string }
    ) => {
        setIsLoading(true);
        setHasAttempted(true);
        setIsSuccessful(false);
        setErrRes(null);

        await pbClient.collection(DbTable.USERS)
            .requestEmailChange(newEmail)
            .then((_isSuccessful: boolean) => {
                setIsSuccessful(true);
            })
            .catch((err: ClientResponseError) => {
                setIsSuccessful(false);
                setErrRes(err);
            });
        setIsLoading(false);
    };

    return <Paper className="cardlike"
        withBorder p="md"
    >
        <form onSubmit={form.onSubmit(handleSubmission)}>
            <Title className="cardlike__title"
                order={2}
            >
                Change email
            </Title>

            <Text>Email change is only confirmed upon email verification with password.</Text>

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
            <ErrorResponseDisplay errRes={errRes} />
        }

    </Paper>
}