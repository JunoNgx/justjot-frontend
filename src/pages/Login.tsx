import { useForm } from '@mantine/form';
import { Stack, Paper, TextInput, Button, Title, Group, Text, PasswordInput } from "@mantine/core";
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { BackendClientContext } from '../contexts/BackendClientContext';
import { CollectionType } from '../types';

type LoginFormData = {email: string, password: string};

export default function Login() {
    const { pbClient, isLoggedIn, setIsLoggedIn } = useContext(BackendClientContext);

    useEffect(() => {
        if (isLoggedIn) navigateToMainView();
    }, []);

    const navigate = useNavigate();
    const navigateToMainView = () => {
        navigate(`/${pbClient.authStore.model?.username}`, {
            replace: true
        });
    }
    const [hasAttempted, setHasAttempted] = useState(false);
    const [isSuccessful, setIsSuccessful] = useState(false);
    const form = useForm({
        initialValues: {
            email: "",
            password: ""
        }
    });

    const attemptLogin = async (loginForm: LoginFormData) => {
        await pbClient.collection (CollectionType.USERS)
            .authWithPassword(
                loginForm.email,
                loginForm.password
            )
            .then(() => {
                setIsSuccessful(true);
                setIsLoggedIn(true);
                navigateToMainView();
            })
            .catch(() => {
                setIsSuccessful(false);
            });
        
        setHasAttempted(true);
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

            {hasAttempted && !isSuccessful
                ? <Text mt="lg" c="red">
                    Your login data is incorrect.
                </Text>
                : ""
            }

            <Text mt="lg">
                Forgot your password? <Link to="/forget">Request reset</Link>
            </Text>
        </Paper>
    </Stack>
}
