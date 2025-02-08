import { useForm } from '@mantine/form';
import { TextInput, PasswordInput } from "@mantine/core";
import { NavLink } from 'react-router-dom';
import useNavigateRoutes from '@/hooks/useNavigateRoutes';
import { useContext, useEffect, useState } from 'react';
import { BackendClientContext } from '@/contexts/BackendClientContext';
import { DbTable, User } from '@/types';
import { ClientResponseError, RecordAuthResponse, RecordModel } from 'pocketbase';
import ErrorResponseDisplay from '@/components/ErrorResponseDisplay';
import { APP_NAME, TEST_ACC_PASSWORD, TEST_ACC_USERNAME } from '@/utils/constants';
import ButtonWithLoader from '@/libs/components/ButtonWithLoader';

import "./Pages.scss";

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

    const { navigateToMainView } = useNavigateRoutes();
    useEffect(() => {
        if (isLoggedIn) {
            navigateToMainView();
            return;
        }
    }, []);

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
            .then((res: RecordAuthResponse<RecordModel>) => {
                setUser(res?.record as User)
                setIsSuccessful(true);
                navigateToMainView();
            })
            .catch((err: ClientResponseError) => {
                setIsSuccessful(false);
                setErrRes(err);
            });
        setIsLoading(false);
    }

    const normalNotice = <p>
        Don't have an account? <NavLink to="/register">Register</NavLink>
    </p>

    const demoNotice = <>
        <p>Try using the test account</p>
        <p><code>{TEST_ACC_USERNAME}</code> / <code>{TEST_ACC_PASSWORD}</code></p>
    </>

    return <div className="Cardlike Cardlike--IsLogin">
        <title>{`Login — ${APP_NAME}`}</title>
        
        <h2 className="Cardlike__Title">Login</h2>
        <div className="Cardlike__Subtitle">
            {isDemoMode
                ? demoNotice
                : normalNotice
            }
        </div>

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

            <div className="Cardlike__BtnContainer">
                <ButtonWithLoader
                    type="submit"
                    isLoading={isLoading}
                >
                    Login
                </ButtonWithLoader>
            </div>

        </form>

        {(hasAttempted && !isSuccessful) &&
            <ErrorResponseDisplay errRes={errRes} />
        }

        <div className='Cardlike__BottomTextContainer'>
            <p>Forgot your password? <NavLink to="/reset">Request reset</NavLink></p>
            <p>Not yet verified? <NavLink to="/verify">Request verification</NavLink></p>
        </div>
    </div>
}
