import { useForm } from '@mantine/form';
import { Stack, Paper, TextInput, Button, Title, Group, Text, Box } from "@mantine/core";
import { BackendClientContext } from '../contexts/BackendClientContext';
import { useContext, useState } from 'react';
import { CollectionType } from '../types'

export default function ForgetPassword() {

    const [hasRequested, setHasRequested] = useState(false);

    const pbClient = useContext(BackendClientContext);
    const form = useForm({
        initialValues: {
            email: "",
        }
    });

    const attemptRequestResetPassword = async (formData: { email: string }) => {
        await pbClient.collection(CollectionType.USERS)
            .requestPasswordReset(formData.email)
            .then(() => {
                setHasRequested(true);
            })
            .catch(error => {
                console.log(error);
            });
    }

    const successNotice = <Box mt="lg" p="none">
        <Text>Password reset request has been made.</Text>
        <Text>Please check your inbox for the reset hyperlink.</Text>
    </Box>

    const resetRequestForm =
        <form onSubmit={form.onSubmit(attemptRequestResetPassword)}>
            <TextInput mt="md"
                label="Email"
                description="Enter email address to request password reset"
                required
                placeholder="isaac@darkcrusader.org"
                type="email"
                {...form.getInputProps('email')}
            />

            <Group
                mt="md"
                justify="flex-end"
            >
                <Button
                    variant="filled"
                    type="submit"
                >
                    Request reset
                </Button>
            </Group>
        </form>

    return <Stack
        align="center"
        justify="center"
    >
        <Paper
            withBorder
            shadow="xs"
            p="xl"
        >
            <Title order={2}>
                Forget password
            </Title>

                {hasRequested
                    ? successNotice
                    : resetRequestForm
                }

        </Paper>
    </Stack>
}
