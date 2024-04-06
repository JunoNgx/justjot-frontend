import { useForm } from '@mantine/form';
import { Paper, TextInput, Button, Title, Group, Text, PasswordInput, Anchor } from "@mantine/core";
import { NavLink, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { BackendClientContext } from '@/contexts/BackendClientContext';
import { DbTable, User } from '@/types';
import { ClientResponseError } from 'pocketbase';
import ErrorResponseDisplay from '@/components/ErrorResponseDisplay';

type LoginFormData = {email: string, password: string};

export default function Login() {
    const { pbClient, setUser, isLoggedIn } = useContext(BackendClientContext);
    const form = useForm({
        initialValues: {
            email: "",
            password: ""
        }
    });

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
    const [isLoading, setIsLoading] = useState(false);
    const [errRes, setErrRes] = useState<ClientResponseError | null>(null);

    const attemptLogin = async (loginForm: LoginFormData) => {
        setIsLoading(true);
        setHasAttempted(true);
        setIsSuccessful(false);
        setErrRes(null);
        await pbClient.collection (DbTable.USERS)
            .authWithPassword( // works for both email AND username
                loginForm.email,
                loginForm.password
            )
            .then((res: {token: string, record: User}) => {
                setUser(res?.record)
                setIsSuccessful(true);
                navigateToMainView();
            })
            .catch((err: ClientResponseError) => {
                setIsSuccessful(false);
                setErrRes(err);
            });
        setIsLoading(false);
    }

    return <Paper className="account-route-modal account-route-modal--login">
        <Title order={2}>
            Login
        </Title>

        <Text>
            Don't have an account? <Anchor component={NavLink} to="/register">Register</Anchor>
        </Text>

        <form onSubmit={form.onSubmit(attemptLogin)}>
            <TextInput
                autoFocus
                mt="md"
                required
                label="Email or Username"
                description="Either email or username is accepted."
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
                    type="submit"
                    loading={isLoading}
                >
                    Login
                </Button>
            </Group>

        </form>

        {(hasAttempted && !isSuccessful) &&
            <ErrorResponseDisplay errRes={errRes} />
        }

        <Text mt="lg">
            Forgot your password? <Anchor component={NavLink} to="/reset">Request reset</Anchor>
        </Text>
    </Paper>
}
