import { useForm } from '@mantine/form';
import { Stack, Paper, TextInput, Button, Title, Group, Text, PasswordInput, Box, Anchor } from "@mantine/core";
import { NavLink } from 'react-router-dom';
import { BackendClientContext } from '@/contexts/BackendClientContext';
import { useContext, useState } from 'react';
import { UserType, DbTable } from '@/types'
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
    const [hasRequested, setHasRequested] = useState(false);
    const [isSuccessful, setIsSuccessful] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

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

        setIsLoading(true);
        await pbClient.collection(DbTable.USERS)
        .create(submissionData)
        .then(async (_record) => {
            setErrorList([]);
            setIsSuccessful(true);

            // TODO: backendLogic
            // await pbClient.collection(DbTable.USERS)
            //     .requestVerification(submissionData.email)
            //     .catch(displayError)
        })
        .catch(displayError);
        setIsLoading(false);
        setHasRequested(true);
    }

    const displayError = (error: ClientResponseError) => {
        setIsSuccessful(false);
        setErrorList(["Your submission encountered a problem."]);
        if (error.response.data) {
            Object.entries(error.response.data).forEach((keyValArr, _index) => {
                const value = keyValArr[1] as {code: string, message: string};
                const errorMsg = value.message;
                setErrorList(errList => [...errList, errorMsg])
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
                autoFocus
                label="Email"
                description="Must be unique."
                required
                placeholder="don.h@creo.com"
                type="email"
                {...form.getInputProps('email')}
            />
            <TextInput mt="md"
                label="Username"
                description="Must be unique and between 3 and 150 characters."
                required
                placeholder="BlackCerberus1337"
                type="name"
                minLength={3}
                maxLength={150}
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
                description="Must be between 8 and 72 characters."
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
                    type="submit"
                    loading={isLoading}
                >
                    Register
                </Button>
            </Group>

            {(hasRequested && !isSuccessful)
                ? <Stack className="register__error-list" mt="md">
                    {errorList?.map(error =>
                        <Text c="red">
                            {error}
                        </Text>
                    )}
                </Stack>
                : ""
            }
        </form>
    </>

    return <Paper className="account-route-modal account-route-modal--login">
        <Title order={2}>
            Register
        </Title>

        {(hasRequested && isSuccessful)
            ? successNotice
            : registrationForm
        }

    </Paper>
}
