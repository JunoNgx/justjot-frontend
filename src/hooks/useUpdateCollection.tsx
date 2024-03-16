import { useContext, useState } from "react";
import { BackendClientContext } from "../contexts/BackendClientContext";
import { DbTable, ItemCollection, CreateUpdateCollectionOptions, RequestCallbackOptions } from "../types";
import { notifications } from "@mantine/notifications";

type useUpdateCollectionReturnType = [
    ({ name, slug }: CreateUpdateCollectionOptions) => Promise<void>,
    boolean,
    boolean,
];

export default function useUpdateCollection({
    successfulCallback, errorCallback }: RequestCallbackOptions = {}
): useUpdateCollectionReturnType {

    const {pbClient, currCollection, user} = useContext(BackendClientContext);
    const [isSuccessful, setIsSuccessful] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const updateCollection = async ({ name, slug }: CreateUpdateCollectionOptions) => {
        setIsLoading(true);
        await pbClient.collection(DbTable.COLLECTIONS)
            .update(currCollection!.id, { name, slug, owner: user!.id })
            .then((_record: ItemCollection) => {
                setIsSuccessful(true);
                successfulCallback?.();
            })
            .catch(err => {
                errorCallback?.();
                console.error(err, { currCollection });
                notifications.show({
                    message: "Error updating collection",
                    color: "red",
                    autoClose: false,
                    withCloseButton: true,
                });
            });
        
        setIsLoading(false);
    };

    return [
        updateCollection,
        isLoading,
        isSuccessful,
    ];
};
