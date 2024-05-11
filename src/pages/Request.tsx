import { useForm } from '@mantine/form';
import { TextInput } from "@mantine/core";
import { BackendClientContext } from '@/contexts/BackendClientContext';
import { useContext, useEffect, useState } from 'react';
import { DbTable, RequestPageType } from '@/types'
import { NavLink } from 'react-router-dom';
import ErrorResponseDisplay from '@/components/ErrorResponseDisplay';
import { ClientResponseError } from 'pocketbase';
import { APP_NAME } from '@/utils/constants';
import ButtonWithLoader from '@/libs/components/ButtonWithLoader';

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

    const successNotice = <div className="Cardlike__SuccessNotice">
        <p>{computeSuccessNoticeFirstLine(pageType)}</p>
        <p>Please check your email inbox for the verification link.</p>
        <p>Proceed to <NavLink to="/login">Login</NavLink>.</p>
    </div>

    const resetRequestForm = <>
        <div className="Cardlike__Subtitle">
            <p>{computeSubtitle(pageType)}</p>
        </div>

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

            <div className="Cardlike__BtnContainer">
                <ButtonWithLoader
                    type="submit"
                    isLoading={isLoading}
                >
                    Request
                </ButtonWithLoader>
            </div>
        </form>

        {(hasAttempted && !isSuccessful) &&
            <ErrorResponseDisplay errRes={errRes} />
        }

        <div className="Cardlike__BottomTextContainer">
            <p>Just in case you want to <NavLink to="/login">Login</NavLink>.</p>
        </div>
    </>

    return <div className="Cardlike Cardlike--IsReset">
        <h2 className="Cardlike__Title">
            {computeCardTitle(pageType)}
        </h2>

        {(hasAttempted && isSuccessful)
            ? successNotice
            : resetRequestForm
        }
    </div>
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

const computeSubtitle = (pageType: RequestPageType) => {
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
