import { useForm } from '@mantine/form';
import { Stack, Paper, TextInput, Button, Title, Group, Text, PasswordInput } from "@mantine/core";
import { Link } from 'react-router-dom';

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
            <Title order={2}>
                Login
            </Title>

            <Text>
                Don't have an account? <Link to="/register">Register</Link>
            </Text>

            <form onSubmit={form.onSubmit(attemptLogin)}>
                <TextInput
                    mt="md"
                    required
                    label="Email"
                    placeholder="lucatiel@mirrah.com"
                    type="email"
                    {...form.getInputProps('email')}
                />
                <PasswordInput
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

            <Text mt="lg">
                Forgot your password? <Link to="/forget">Request reset</Link>
            </Text>
        </Paper>
    </Stack>
}
