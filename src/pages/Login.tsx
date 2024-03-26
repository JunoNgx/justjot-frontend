import { useForm } from '@mantine/form';
import { Paper, TextInput, Button, Title, Group, Text, PasswordInput, Anchor } from "@mantine/core";
import { NavLink, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { BackendClientContext } from '@/contexts/BackendClientContext';
import { DbTable } from '@/types';

type LoginFormData = {email: string, password: string};

export default function Login() {
    const { pbClient, isLoggedIn } = useContext(BackendClientContext);

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
    const [errorMsg, setErrorMsg] = useState("");
    const form = useForm({
        initialValues: {
            email: "",
            password: ""
        }
    });

    const attemptLogin = async (loginForm: LoginFormData) => {
        setIsLoading(true);
        await pbClient.collection (DbTable.USERS)
            .authWithPassword( // works for both email AND username
                loginForm.email,
                loginForm.password
            )
            .then(() => {
                setIsSuccessful(true);
                navigateToMainView();
            })
            .catch((error) => {
                setIsSuccessful(false);
                setErrorMsg(error.response.message)
            });
        
        setIsLoading(false);
        setHasAttempted(true);
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
                    variant="filled"
                    type="submit"
                    loading={isLoading}
                >
                    Login
                </Button>
            </Group>

        </form>

        {hasAttempted && !isSuccessful
            ? <Text mt="lg" c="red">
                {errorMsg}
            </Text>
            : ""
        }

        <Text mt="lg">
            Forgot your password? <Anchor component={NavLink} to="/reset">Request reset</Anchor>
        </Text>
    </Paper>
}
