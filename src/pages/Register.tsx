import { useForm } from '@mantine/form';
import { TextInput, Button, PasswordInput } from "@mantine/core";
import { NavLink } from 'react-router-dom';
import { BackendClientContext } from '@/contexts/BackendClientContext';
import { useContext, useEffect, useState } from 'react';
import { UserType, DbTable } from '@/types'
import { ClientResponseError } from 'pocketbase';
import ErrorResponseDisplay from '@/components/ErrorResponseDisplay';
import useNavigateRoutes from '@/hooks/useNavigateRoutes';
import { APP_NAME } from '@/utils/constants';

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
    const { isLoggedIn, pbClient } = useContext(BackendClientContext);

    const { navigateToMainView } = useNavigateRoutes();
    useEffect(() => {
        if (isLoggedIn) {
            navigateToMainView();
            return;
        }

        document.title = `Register — ${APP_NAME}`;
    }, []);

    const [hasAttempted, setHasAttempted] = useState(false);
    const [isSuccessful, setIsSuccessful] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errRes, setErrRes] = useState<ClientResponseError | null>(null);

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
        submissionData.emailVisibility = false;
        submissionData.userType = UserType.USER;

        setIsLoading(true);
        setHasAttempted(true);
        setIsSuccessful(false);
        setErrRes(null);

        await pbClient.collection(DbTable.USERS)
            .create(submissionData)
            .then(() => {
                setIsSuccessful(true);
            })
            .catch((err: ClientResponseError) => {
                setIsSuccessful(false);
                setErrRes(err);
            });

        setIsLoading(false);
    }

    const successNotice = <div className="Cardlike__SuccessNotice">
        <p>Registration request has been made.</p>
        <p>Please check your inbox for the verification email.</p>
        <p>Proceed to <NavLink to="login">Login</NavLink></p>
    </div>

    const registrationForm = <>
        <div className="Cardlike__Subtitle">
            <p>Already have an account? <NavLink to="login">Login</NavLink></p>
        </div>

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

            <div className='Cardlike__BottomTextContainer'>
                <p>By registering, you acknowledge and agree to the <a href="/terms" target='_blank'>terms and conditions</a>.</p>
            </div>

            <div className="Cardlike__BtnContainer">
                <Button
                    type="submit"
                    loading={isLoading}
                >
                    Register
                </Button>
            </div>

            {(hasAttempted && !isSuccessful) &&
                <ErrorResponseDisplay errRes={errRes} />
            }
        </form>
    </>

    return <div className="Cardlike Cardlike--IsLogin">
        <h2 className="Cardlike__Title">
            Register
        </h2>

        {(hasAttempted && isSuccessful)
            ? successNotice
            : registrationForm
        }
    </div>
}
