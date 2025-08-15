import { BackendClientContext } from "@/contexts/BackendClientContext";
import { DbTable } from "@/types";
import { TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useContext, useState } from "react";
import ErrorResponseDisplay from "@/components/ErrorResponseDisplay";
import { ClientResponseError } from "pocketbase";

import "./Profile.scss";
import ButtonWithLoader from "@/libs/components/ButtonWithLoader";

export default function ProfileChangeEmail() {
    const { pbClient } = useContext(BackendClientContext);
    const form = useForm({
        initialValues: {
            newEmail: "",
        },
    });
    const [hasAttempted, setHasAttempted] = useState(false);
    const [isSuccessful, setIsSuccessful] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errRes, setErrRes] = useState<ClientResponseError | null>(null);

    const handleSubmission = async ({ newEmail }: { newEmail: string }) => {
        setIsLoading(true);
        setHasAttempted(true);
        setIsSuccessful(false);
        setErrRes(null);

        await pbClient
            .collection(DbTable.USERS)
            .requestEmailChange(newEmail)
            .then((_isSuccessful: boolean) => {
                setIsSuccessful(true);
            })
            .catch((err: ClientResponseError) => {
                setIsSuccessful(false);
                setErrRes(err);
            });
        setIsLoading(false);
    };

    return (
        <section className="Profile">
            <form onSubmit={form.onSubmit(handleSubmission)}>
                <h3 className="Profile__Title">Change email</h3>

                <p>
                    Email change is only confirmed upon email verification with
                    password.
                </p>

                <TextInput
                    mt="md"
                    label="New email"
                    description="Must be unique."
                    required
                    type="email"
                    {...form.getInputProps("newEmail")}
                />

                <div className="Profile__BtnContainer">
                    <ButtonWithLoader type="submit" isLoading={isLoading}>
                        Submit
                    </ButtonWithLoader>
                </div>
            </form>

            {hasAttempted && isSuccessful && (
                <p className="Profile_SuccessNotice">
                    Request successful. Please check the inbox of your new email
                    address for a confirmation link.
                </p>
            )}

            {hasAttempted && !isSuccessful && (
                <ErrorResponseDisplay errRes={errRes} />
            )}
        </section>
    );
}
