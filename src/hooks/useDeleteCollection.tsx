
import { useContext, useState } from "react";
import { BackendClientContext } from "src/contexts/BackendClientContext";
import { DbTable, RequestCallbackOptions } from "src/types";
import { notifications } from "@mantine/notifications";
import { AUTO_CLOSE_ERROR_TOAST } from "src/utils/constants";
import { CurrentCollectionContext } from "src/contexts/CurrentCollectionContext";

type useDeleteCollectionReturnType = [
    () => Promise<void>,
    boolean,
    boolean,
];

export default function useDeleteCollection({
    successfulCallback, errorCallback }: RequestCallbackOptions = {}
): useDeleteCollectionReturnType {

    const { pbClient } = useContext(BackendClientContext);
    const { currCollection } = useContext(CurrentCollectionContext);
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
                    autoClose: AUTO_CLOSE_ERROR_TOAST,
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
