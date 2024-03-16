import { useContext, useState } from "react";
import { BackendClientContext } from "../contexts/BackendClientContext";
import { DbTable, RequestCallbackOptions } from "../types";
import { notifications } from "@mantine/notifications";
import { SHOULD_AUTO_CLOSE_ERROR_TOAST } from "../utils/constants";

type useDeleteCollectionReturnType = [
    () => Promise<void>,
    boolean,
    boolean,
];

export default function useDeleteCollection({
    successfulCallback, errorCallback }: RequestCallbackOptions = {}
): useDeleteCollectionReturnType {

    const {pbClient, currCollection} = useContext(BackendClientContext);
    const [isSuccessful, setIsSuccessful] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const deleteCollection = async () => {
        setIsLoading(true);
        await pbClient.collection(DbTable.COLLECTIONS)
            .delete(currCollection!.id)
            .then((_isSuccessful) => {
                setIsSuccessful(true);
                successfulCallback?.();
            })
            .catch(err => {
                errorCallback?.();
                console.error(err, { currCollection });
                notifications.show({
                    message: "Error deleting collection",
                    color: "red",
                    autoClose: SHOULD_AUTO_CLOSE_ERROR_TOAST,
                    withCloseButton: true,
                });
            });
        
        setIsLoading(false);
    };

    return [
        deleteCollection,
        isLoading,
        isSuccessful,
    ];
};