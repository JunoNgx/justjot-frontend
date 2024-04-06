import { BackendClientContext } from "@/contexts/BackendClientContext";
import { DbTable, User } from "@/types";
import { Button, Group, Paper, Text, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useContext, useState } from "react";

export default function ProfileChangeDisplayName() {

    const { user, setUser, pbClient } = useContext(BackendClientContext);
    const form = useForm({
        initialValues: {
            displayName: "",
        }
    });
    const [hasAttempted, setHasAttempted] = useState(false);
    const [isSuccessful, setIsSuccessful] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const handleSubmission = (
        { displayName }:
        { displayName: string }
    ) => {
        setIsLoading(true);
        setHasAttempted(true);
        pbClient.collection(DbTable.USERS)
            .update(user!.id, {
                displayName
            })
            .then((record: User) => {
                setUser(record);
                setIsSuccessful(true);
            })
            .catch(err => {
                setIsSuccessful(false);
                setErrorMsg(err)
            });
        setIsLoading(false);
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
                label="New display name"
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

        {(hasAttempted && !isSuccessful) &&
            <Text mt="lg" c="red">
                {errorMsg}
            </Text>
        }
    </Paper>
};
