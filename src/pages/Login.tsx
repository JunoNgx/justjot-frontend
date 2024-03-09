import { useForm } from '@mantine/form';
import { Stack, Paper, TextInput, Button, Title, Group, Text, PasswordInput, Anchor } from "@mantine/core";
import { NavLink, useNavigate } from 'react-router-dom';
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
            .authWithPassword( // works for both email AND username
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
        className="account-modal account-modal--login"
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
                Don't have an account? <Anchor component={NavLink} to="/register">Register</Anchor>
            </Text>

            <form onSubmit={form.onSubmit(attemptLogin)}>
                <TextInput
                    mt="md"
                    required
                    label="Email or Username"
                    description="Both email and username are accepted"
                    placeholder="lucatiel@mirrah.com"
                    type="text"
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
                Forgot your password? <Anchor component={NavLink} to="/forget">Request reset</Anchor>
            </Text>
        </Paper>
    </Stack>
}
