import { BackendClientContext } from "@/contexts/BackendClientContext";
import { DbTable, User } from "@/types";
import { TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { ClientResponseError, RecordModel } from "pocketbase";
import { useContext, useState } from "react";
import ErrorResponseDisplay from "../ErrorResponseDisplay";
import ButtonWithLoader from "@/libs/components/ButtonWithLoader";

import "./Profile.scss";

export default function ProfileChangeDisplayName() {

    const { user, setUser, pbClient } = useContext(BackendClientContext);
    const form = useForm({
        initialValues: {
            displayName: "",
        }
    });
    const [hasAttempted, setHasAttempted] = useState(false);
    const [isSuccessful, setIsSuccessful] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errRes, setErrRes] = useState<ClientResponseError | null>(null);

    const handleSubmission = async (
        { displayName }:
        { displayName: string }
    ) => {
        setIsLoading(true);
        setHasAttempted(true);
        setIsSuccessful(false);
        setErrRes(null);

        await pbClient.collection(DbTable.USERS)
            .update(user!.id, {
                displayName
            })
            .then((record: RecordModel) => {
                setUser(record as User);
                setIsSuccessful(true);
                form.setFieldValue("displayName", "");
            })
            .catch((err: ClientResponseError) => {
                setIsSuccessful(false);
                setErrRes(err)
            });
        setIsLoading(false);
    };

    return <section className="Profile">
        <form onSubmit={form.onSubmit(handleSubmission)}>
            <h3 className="Profile__Title">
                Change display name
            </h3>

            {user!.displayName
                ? <p>Your current display name is: <em>{user!.displayName}</em></p>
                : <p>You account currently does not have a display name.</p>
            }

            <TextInput mt="md"
                label="New display name"
                description="How you would like to display yourself, as an alternative to your username. Can be blank."
                type="text"
                {...form.getInputProps('displayName')}
            />

            <div className="Profile__BtnContainer">
                <ButtonWithLoader
                    type="submit"
                    isLoading={isLoading}
                >
                    Submit
                </ButtonWithLoader>
            </div>
        </form>

        {(hasAttempted && isSuccessful) &&
            <p className="Profile_SuccessNotice">
                Display name updated successfully.
            </p>
        }

        {(hasAttempted && !isSuccessful) &&
            <ErrorResponseDisplay errRes={errRes} />
        }
    </section>
}
