import { useForm } from '@mantine/form';
import { Stack, Paper, TextInput, Button, Title, Group, Text } from "@mantine/core";
import { Link } from 'react-router-dom';

type RegisterFormData = {
    email: string,
    name: string,
    password: string,
    passwordConfirm: string
};

export default function Register() {
    // TODO: if isLoggedIn Navigate to /:username
    const form = useForm({
        initialValues: {
            email: "",
            name: "",
            password: "",
            passwordConfirm: "",
        }
    });

    const attemptRegister = (data: RegisterFormData) => {

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
                Register
            </Title>

            <Text>
                Already have an account? <Link to="/login">Login</Link>
            </Text>

            <form onSubmit={form.onSubmit(attemptRegister)}>
                <TextInput
                    mt="md"
                    required
                    label="Email"
                    placeholder="don.h@creo.com"
                    type="email"
                    {...form.getInputProps('email')}
                />
                <TextInput
                    mt="md"
                    label="Display name"
                    placeholder="Irina Beckett"
                    name="name"
                    type="text"
                    {...form.getInputProps('name')}
                />
                <Text mt="xs">
                    This can be empty and changed later.
                </Text>

                <TextInput
                    mt="md"
                    required
                    label="Password"
                    placeholder="IronMaus123"
                    type="password"
                    {...form.getInputProps('password')}
                />
                <Text mt="xs">
                    The length must be between 8 and 72 characters.
                </Text>

                <TextInput
                    mt="md"
                    required
                    label="Password confirm"
                    placeholder="IronMaus123"
                    type="password"
                    {...form.getInputProps('passwordConfirm')}
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
