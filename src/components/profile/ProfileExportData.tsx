import { useContext, useState } from "react";
import { ClientResponseError } from "pocketbase";

import ButtonWithLoader from "@/libs/components/ButtonWithLoader";
import ErrorResponseDisplay from "../ErrorResponseDisplay";
import { BackendClientContext } from "@/contexts/BackendClientContext";

export default function ProfileExportData() {
    const { user, pbClient } = useContext(BackendClientContext);

    const [hasAttempted, setHasAttempted] = useState(false);
    const [isSuccessful, setIsSuccessful] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errRes, setErrRes] = useState<ClientResponseError | null>(null);

    const handleExportData = async () => {
        setIsLoading(true);
        setHasAttempted(true);
        setIsSuccessful(false);
        setErrRes(null);

        await pbClient
            .send(`export/${user!.id}`, {
                method: "GET",
                authorization: pbClient.authStore.token,
            })
            .then((exportedData) => {
                const date = new Date().toISOString().split("T")[0];
                const json = JSON.stringify(exportedData, null, 2);
                const blob = new Blob([json], {
                    type: "application/json",
                });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `justjot-export-${date}.json`;
                a.click();
                URL.revokeObjectURL(url);

                console.log("scuss")

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
            <h3 className="Profile__Title">Export data</h3>

            <p>
                Export all of your data to JSON format
            </p>

            <div className="Profile__BtnContainer">
                <ButtonWithLoader
                    isLoading={isLoading}
                    onClick={handleExportData}
                >
                    Request export
                </ButtonWithLoader>
            </div>

            {hasAttempted && isSuccessful && (
                <p className="Profile_SuccessNotice">
                    Export successful and data is now stored on your device
                </p>
            )}

            {hasAttempted && !isSuccessful && (
                <ErrorResponseDisplay errRes={errRes} />
            )}
        </section>
    );
}
