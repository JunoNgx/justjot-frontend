import { useForm } from '@mantine/form';
import { Stack, Paper, TextInput, Button, Title, Group } from "@mantine/core";

type LoginFormData = {email: string, password: string};

export default function Login() {
    // TODO: if isLoggedIn Navigate to /:username

    const form = useForm({
        initialValues: {
            email: "",
            password: ""
        }
    });

    const attemptLogin = (data: LoginFormData) => {
        console.log(data)
        // TODO submit to backend
    }

    return <Stack
        align="center"
        justify="center"
    >
        <Paper
            withBorder
            shadow="xs"
            p="xl"
        >
            <Title order={1}>
                Login
            </Title>

            <form onSubmit={form.onSubmit(attemptLogin)}>
                <TextInput
                    mt="md"
                    required
                    label="Email"
                    placeholder="casey@domain.com"
                    type="email"
                    {...form.getInputProps('email')}
                />
                <TextInput
                    mt="md"
                    required
                    label="Password"
                    placeholder="BearSeekSeekLest"
                    type="password"
                    {...form.getInputProps('password')}
                />

                <Group
                    mt="md"
                    justify="flex-end"
                >
                    <Button
                        variant="filled"
                        type="submit"
                    >
                        Submit
                    </Button>
                </Group>

            </form>
        </Paper>
    </Stack>
}
