import { useForm } from '@mantine/form';
import { Paper, TextInput, Button, Title, Group, Text, Box, Anchor } from "@mantine/core";
import { BackendClientContext } from '@/contexts/BackendClientContext';
import { useContext, useState } from 'react';
import { DbTable } from '@/types'
import { NavLink } from 'react-router-dom';
import ErrorResponseDisplay from '@/components/ErrorResponseDisplay';
import { ClientResponseError } from 'pocketbase';

export default function Reset() {

    const { pbClient } = useContext(BackendClientContext);
    const form = useForm({
        initialValues: {
            email: "",
        }
    });

    const [hasAttempted, setHasAttempted] = useState(false);
    const [isSuccessful, setIsSuccessful] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errRes, setErrRes] = useState<ClientResponseError | null>(null);

    const handleSubmission = async (formData: { email: string }) => {
        setIsLoading(true);
        setHasAttempted(true);
        setIsSuccessful(false);
        setErrRes(null);

        await pbClient.collection(DbTable.USERS)
            .requestPasswordReset(formData.email)
            .then(() => {
                setIsSuccessful(true);
            })
            .catch((err: ClientResponseError) => {
                setIsSuccessful(false);
                setErrRes(err);
            });

        setIsLoading(false);
    }

    const successNotice = <Box mt="lg" p="none">
        <Text>Password change request has been made successfully.</Text>
        <Text mt="md">Please check your email inbox for the verification link.</Text>
        <Text mt="lg">Proceed to <Anchor component={NavLink} to="login">Login</Anchor>.</Text>
    </Box>

    const resetRequestForm = <>
            <Text mt="lg">You are here for either inconvenient forgetfulness, or deliberate security enhancement.</Text>

            <form onSubmit={form.onSubmit(handleSubmission)}>
            <TextInput mt="md"
                autoFocus
                label="Email address"
                description="Of the account that needs a password change."
                required
                placeholder="isaac@darkcrusader.org"
                type="email"
                {...form.getInputProps('email')}
            />

            <Group
                mt="md"
                justify="flex-end"
            >
                <Button
                    type="submit"
                    loading={isLoading}
                >
                    Request
                </Button>
            </Group>
        </form>

        {(hasAttempted && !isSuccessful) &&
            <ErrorResponseDisplay errRes={errRes} />
        }

        <Text mt="lg">
            Just in case you want to <Anchor component={NavLink} to="login">Login</Anchor>.
        </Text>
    </>

    return <Paper className="account-modal account-modal--reset">
        <Title className="account-modal__title"
            order={2}
        >
            Request password reset
        </Title>

        {(hasAttempted && isSuccessful)
            ? successNotice
            : resetRequestForm
        }
    </Paper>
}
