import { BackendClientContext } from "@/contexts/BackendClientContext";
import { DbTable } from "@/types";
import { AUTO_CLOSE_DEFAULT } from "@/utils/constants";
import { Button, Group, Paper, Text, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useContext, useState } from "react";

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
    const [errorMsg, setErrorMsg] = useState("");
    const handleSubmission = async (
        { newEmail }:
        { newEmail: string }
    ) => {
        setIsLoading(true);
        setHasAttempted(true);
        await pbClient.collection(DbTable.USERS)
            .requestEmailChange(newEmail)
            .then((_isSuccessful: boolean) => {
                setIsSuccessful(true);
            })
            .catch(err => {
                setIsSuccessful(false);
                setErrorMsg(err.response?.message)
                notifications.show({
                    message: "Error requesting email change",
                    color: "none",
                    autoClose: AUTO_CLOSE_DEFAULT,
                    withCloseButton: true,
                });
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

        {(hasAttempted && !isSuccessful) &&
            <Text c="red">
                {errorMsg}
            </Text>
        }
    </Paper>
}