import { BackendClientContext } from "@/contexts/BackendClientContext";
import { DbTable } from "@/types";
import { Button, Group, Paper, Stack, Text, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
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
    const [errorList, setErrorList] = useState<string[]>([]);
    const handleSubmission = async (
        { newEmail }:
        { newEmail: string }
    ) => {
        setIsLoading(true);
        setHasAttempted(true);
        setErrorList([]);
        await pbClient.collection(DbTable.USERS)
            .requestEmailChange(newEmail)
            .then((_isSuccessful: boolean) => {
                setIsSuccessful(true);
            })
            .catch(err => {
                setIsSuccessful(false);

                if (err.response.data) {
                    Object.entries(err.response.data).forEach((keyValArr, _index) => {
                        const value = keyValArr[1] as {code: string, message: string};
                        const errorMsg = value.message;
                        setErrorList(errList => [...errList, errorMsg])
                    });
                };
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
            <Stack mt="xs">
                {errorList?.map(error =>
                    <Text c="red">{error}</Text>
                )}
            </Stack>
        }
    </Paper>
}