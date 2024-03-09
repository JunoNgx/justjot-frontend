import { useForm } from '@mantine/form';
import { Stack, Paper, Button, Title, Group, Text, Box, PasswordInput } from "@mantine/core";
import { NavLink } from 'react-router-dom';
import { BackendClientContext } from '../contexts/BackendClientContext';
import { useContext, useState } from 'react';
import { CollectionType } from '../types'
import { useParams } from "react-router-dom"

type PasswordResetFormData = {
    password: string,
    passwordConfirm: string
};

// This route is unused and handled by PocketBase
export default function ResetPassword() {

    const [hasRequested, setHasRequested] = useState(false);
    const [isSuccessful, setIsSuccessful] = useState(false);
    const { token } = useParams();

    const { pbClient } = useContext(BackendClientContext);
    const form = useForm({
        initialValues: {
            password: "",
            passwordConfirm: ""
        },
        validate: {
            passwordConfirm: (passwordConfirmVal, formData: PasswordResetFormData) => 
                formData.password !== passwordConfirmVal
                    ? "Password confirmation does not match"
                    : null
        }
    });

    const attemptPasswordReset = async (formData: PasswordResetFormData) => {
        await pbClient.collection(CollectionType.USERS)
            .confirmPasswordReset(
                token || "",
                formData.password,
                formData.passwordConfirm,
            )
            .then(() => {
                setIsSuccessful(true);
            })
            .catch(error => {
                console.log(error);
                setIsSuccessful(false);
            });

        setHasRequested(true);
    }

    const successNotice = <Box mt="lg" p="none">
        <Text>Your password has been successfully reset.</Text>
        <Text mt="lg">Proceed to <NavLink to="/login">Login</NavLink>.</Text>
    </Box>

    const failureNotice = <Box mt="lg" p="none">
        <Text>Your password reset has been denied.</Text>
        <Text mt="lg">Return to <NavLink to="/forget">Request password reset</NavLink>.</Text>
    </Box>

    const passwordResetForm =
        <form onSubmit={form.onSubmit(attemptPasswordReset)}>
            <PasswordInput mt="md"
                label="Password"
                description="The length must be between 8 and 72 characters."
                required
                type="password"
                minLength={8}
                maxLength={72}
                {...form.getInputProps('password')}
            />

            <PasswordInput mt="md"
                label="Password confirm"
                required
                type="password"
                minLength={8}
                maxLength={72}
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

    return <Stack
        className="Reset Password"
        align="center"
        justify="center"
    >
        <Paper
            withBorder
            shadow="xs"
            p="xl"
        >
            <Title order={2}>
                Reset password
            </Title>

                {hasRequested
                    ? isSuccessful
                        ? successNotice
                        : failureNotice
                    : passwordResetForm
                }

        </Paper>
    </Stack>
}

