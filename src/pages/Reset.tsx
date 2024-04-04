import { useForm } from '@mantine/form';
import { Paper, TextInput, Button, Title, Group, Text, Box, Anchor } from "@mantine/core";
import { BackendClientContext } from '@/contexts/BackendClientContext';
import { useContext, useState } from 'react';
import { DbTable } from '@/types'
import { NavLink } from 'react-router-dom';

export default function Reset() {

    const [hasRequested, setHasRequested] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const { pbClient } = useContext(BackendClientContext);
    const form = useForm({
        initialValues: {
            email: "",
        }
    });

    const attemptRequestResetPassword = async (formData: { email: string }) => {
        setIsLoading(true);

        await pbClient.collection(DbTable.USERS)
        .requestPasswordReset(formData.email)
        .then(() => {
            setHasRequested(true);
        })
        .catch(error => {
            console.log(error);
        });
        
        setIsLoading(false);
    }

    const successNotice = <Box mt="lg" p="none">
        <Text>Password reset request has been made.</Text>
        <Text>Please check your inbox for the reset hyperlink.</Text>
        <Text mt="lg">Proceed to <Anchor component={NavLink} to="login">Login</Anchor>.</Text>
    </Box>

    const resetRequestForm =
        <form onSubmit={form.onSubmit(attemptRequestResetPassword)}>
            <TextInput mt="md"
                autoFocus
                label="Email"
                description="Enter email address to request password reset"
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

    return <Paper className="account-route-modal account-route-modal--reset">
        <Title order={2}>
            Request password reset
        </Title>
        
        <Text mt="lg">Well, that is inconvenient.</Text>

        {hasRequested
            ? successNotice
            : resetRequestForm
        }

        <Text mt="lg">
            Memory retrieved? <Anchor component={NavLink} to="login">Login</Anchor>
        </Text>
    </Paper>
}
