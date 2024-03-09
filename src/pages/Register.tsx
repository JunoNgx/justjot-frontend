import { useForm } from '@mantine/form';
import { Stack, Paper, TextInput, Button, Title, Group, Text, PasswordInput, Box, Anchor } from "@mantine/core";
import { NavLink } from 'react-router-dom';
import { BackendClientContext } from '../contexts/BackendClientContext';
import { useContext, useState } from 'react';
import { UserType, CollectionType } from '../types'
import { ClientResponseError } from 'pocketbase';

type RegisterFormData = {
    email: string,
    username: string,
    displayName: string,
    password: string,
    passwordConfirm: string
};

type RegisterSubmission = {
    email: string,
    username: string,
    password: string,
    passwordConfirm: string,
    displayName?: string,
    emailVisibility?: boolean,
    userType?: UserType,
};

export default function Register() {
    // TODO: if isLoggedIn Navigate to /:username
    const [hasRequested, setHasRequested] = useState(false);

    const { pbClient } = useContext(BackendClientContext);
    const [errorList, setErrorList] = useState<string[]>([]);
    const form = useForm({
        initialValues: {
            email: "",
            username: "",
            displayName: "",
            password: "",
            passwordConfirm: "",
        },
        validate: {
            passwordConfirm: (passwordConfirmVal, formData: RegisterFormData) =>
                formData.password !== passwordConfirmVal
                    ? "Password confirmation does not match"
                    : null
        }
    });

    const attemptRegister = async (formData: RegisterFormData) => {
        const submissionData: RegisterSubmission = { ...formData };
        // Workaround the username requirement
        submissionData.emailVisibility = false;
        submissionData.userType = UserType.USER;

        await pbClient.collection(CollectionType.USERS)
            .create(submissionData)
            .then(async (_record) => {
                setErrorList([]);

                await pbClient.collection(CollectionType.USERS)
                    .requestVerification(submissionData.email)
                    .then((_record) => {
                        setHasRequested(true)
                    })
                    .catch(displayError)
            })
            .catch(displayError);
    }

    const displayError = (error: ClientResponseError) => {
        if (error.response.data) {
            // for (const [_key, value] of Object.entries(error.response.data)) {
            Object.entries(error.response.data).forEach((_key, value: any) => {
                setErrorList(errList => [...errList, value.message])
            });
        };
    };

    const successNotice = <Box mt="lg" p="none">
        <Text>Registration request has been made.</Text>
        <Text>Please check your inbox for the verification email.</Text>
        <Text mt="lg">Proceed to <Anchor component={NavLink} to="login">Login</Anchor></Text>
    </Box>


    const registrationForm = <>
        <Text>
            Already have an account? <Anchor component={NavLink} to="login">Login</Anchor>
        </Text>

        <form onSubmit={form.onSubmit(attemptRegister)}>
            <TextInput mt="md"
                label="Email"
                description="Must be unique."
                required
                placeholder="don.h@creo.com"
                type="email"
                {...form.getInputProps('email')}
            />
            <TextInput mt="md"
                label="Username"
                description="Must be unique, too."
                required
                placeholder="BlackCerberus1337"
                type="email"
                {...form.getInputProps('username')}
            />
            <TextInput mt="md"
                label="Display name"
                description="How to preferrably display you (optional)."
                placeholder="Irina Beckett"
                name="name"
                type="text"
                {...form.getInputProps('displayName')}
            />
            <PasswordInput mt="md"
                label="Password"
                description="The length must be between 8 and 72 characters."
                required
                placeholder="IronMaus123"
                type="password"
                minLength={8}
                maxLength={72}
                {...form.getInputProps('password')}
            />
            <PasswordInput mt="md"
                label="Password confirm"
                required
                placeholder="IronMaus123"
                type="password"
                minLength={8}
                maxLength={72}
                {...form.getInputProps('passwordConfirm')}
            />

            <Group mt="md"
                justify="flex-end"
            >
                <Button
                    variant="filled"
                    type="submit"
                >
                    Register
                </Button>
            </Group>

            <Stack className="register__error-list" mt="md">
                {errorList?.map(error =>
                    <Text>
                        {error}
                    </Text>
                )}
            </Stack>
        </form>
    </>

    return <Stack
        className="register"
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

            {hasRequested
                ? successNotice
                : registrationForm
            }

        </Paper>
    </Stack>
}
