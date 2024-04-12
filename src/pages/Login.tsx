import { useForm } from '@mantine/form';
import { Paper, TextInput, Button, Title, Group, Text, PasswordInput, Anchor } from "@mantine/core";
import { NavLink, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { BackendClientContext } from '@/contexts/BackendClientContext';
import { DbTable, User } from '@/types';
import { ClientResponseError } from 'pocketbase';
import ErrorResponseDisplay from '@/components/ErrorResponseDisplay';
import { APP_NAME, TEST_ACC_PASSWORD, TEST_ACC_USERNAME } from '@/utils/constants';

type LoginFormData = {email: string, password: string};

export default function Login(
    {isDemoMode}: {isDemoMode?: boolean}
) {
    const { pbClient, setUser, isLoggedIn } = useContext(BackendClientContext);
    const form = useForm({
        initialValues: {
            email: isDemoMode ? TEST_ACC_USERNAME : "",
            password: isDemoMode ? TEST_ACC_PASSWORD : ""
        }
    });

    useEffect(() => {
        if (isLoggedIn) {
            navigateToMainView();
            return;
        }

        document.title = `Login — ${APP_NAME}`;
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

    const normalNotice = <Text>
        Don't have an account? <Anchor component={NavLink} to="/register">Register</Anchor>
    </Text>

    const demoNotice = <>
        <Text>Try using the test account</Text>
        <Text><code>{TEST_ACC_USERNAME}</code> / <code>{TEST_ACC_PASSWORD}</code></Text>
    </>

    return <Paper className="cardlike cardlike--login">
        <Title className="cardlike__title"
            order={2}
        >
            Login
        </Title>

        {isDemoMode
            ? demoNotice
            : normalNotice
        }

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
        <Text mt="xs">
            Not yet verified? <Anchor component={NavLink} to="/verify">Request verification</Anchor>
        </Text>
    </Paper>
}
