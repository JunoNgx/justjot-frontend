import { useForm } from '@mantine/form';
import { Paper, TextInput, Button, Title, Group, Text, Box, Anchor } from "@mantine/core";
import { BackendClientContext } from '@/contexts/BackendClientContext';
import { useContext, useEffect, useState } from 'react';
import { DbTable, RequestPageType } from '@/types'
import { NavLink } from 'react-router-dom';
import ErrorResponseDisplay from '@/components/ErrorResponseDisplay';
import { ClientResponseError } from 'pocketbase';
import { APP_NAME } from '@/utils/constants';

export default function Request(
    { pageType }: { pageType: RequestPageType }
) {

    const { pbClient } = useContext(BackendClientContext);
    const form = useForm({
        initialValues: {
            email: "",
        }
    });

    useEffect(() => {
        document.title = computePageTitle(pageType);
    }, []);

    const [hasAttempted, setHasAttempted] = useState(false);
    const [isSuccessful, setIsSuccessful] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errRes, setErrRes] = useState<ClientResponseError | null>(null);

    const handleSubmission = async (formData: { email: string }) => {
        setIsLoading(true);
        setHasAttempted(true);
        setIsSuccessful(false);
        setErrRes(null);

        try {
            const userCollection = pbClient.collection(DbTable.USERS);
            const isSuccessful = pageType === RequestPageType.EMAIL_VERIFY
                ? await userCollection.requestVerification(formData.email)
                : await userCollection.requestPasswordReset(formData.email);

            setIsSuccessful(isSuccessful);
        } catch (err) {
            setIsSuccessful(false);
            setErrRes(err as ClientResponseError);
        }

        setIsLoading(false);
    }

    const successNotice = <Box mt="lg" p="none">
        <Text>{computeSuccessNoticeFirstLine(pageType)}</Text>
        <Text mt="md">Please check your email inbox for the verification link.</Text>
        <Text mt="lg">Proceed to <Anchor component={NavLink} to="login">Login</Anchor>.</Text>
    </Box>

    const resetRequestForm = <>
            <Text mt="lg">{computeCardInitialNotice(pageType)}</Text>

            <form onSubmit={form.onSubmit(handleSubmission)}>
            <TextInput mt="md"
                autoFocus
                label="Email address"
                description={computeInputDesc(pageType)}
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

    return <Paper className="cardlike cardlike--reset">
        <Title className="cardlike__title"
            order={2}
        >
            {computeCardTitle(pageType)}
        </Title>

        {(hasAttempted && isSuccessful)
            ? successNotice
            : resetRequestForm
        }
    </Paper>
}

const computePageTitle = (pageType: RequestPageType) => {
    switch (pageType) {
        case (RequestPageType.EMAIL_VERIFY):
            return `Verify email — ${APP_NAME}`;
        case (RequestPageType.PASSWORD_CHANGE):
        default:
            return `Reset password — ${APP_NAME}`;
    }
}

const computeCardInitialNotice = (pageType: RequestPageType) => {
    switch (pageType) {
        case (RequestPageType.EMAIL_VERIFY):
            return "In the unfortunate event that you did not receive the email verification link, please re-request."
        case (RequestPageType.PASSWORD_CHANGE):
        default:
            return "You are here for either inconvenient forgetfulness, or deliberate security enhancement."
    }
}

const computeInputDesc = (pageType: RequestPageType) => {
    switch (pageType) {
        case (RequestPageType.EMAIL_VERIFY):
            return "The one that needs verification."
        case (RequestPageType.PASSWORD_CHANGE):
        default:
            return "Of the account that needs a password change."
    }
}

const computeCardTitle = (pageType: RequestPageType) => {
    switch (pageType) {
        case (RequestPageType.EMAIL_VERIFY):
            return "Request email verification"
        case (RequestPageType.PASSWORD_CHANGE):
        default:
            return "Request password change"
    }
}

const computeSuccessNoticeFirstLine = (pageType: RequestPageType) => {
    switch (pageType) {
        case (RequestPageType.EMAIL_VERIFY):
            return "Email verification request has been made successfully."
        case (RequestPageType.PASSWORD_CHANGE):
        default:
            return "Password change request has been made successfully."
    }
}
