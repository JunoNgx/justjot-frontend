import { useContext, useState } from "react";
import { BackendClientContext } from "../contexts/BackendClientContext";
import { DbTable, ItemCollection, CreateUpdateCollectionOptions, RequestCallbackOptions } from "../types";
import { notifications } from "@mantine/notifications";

type useCreateCollectionReturnType = [
    ({ name, slug }: CreateUpdateCollectionOptions) => Promise<void>,
    boolean,
    boolean,
];

export default function useCreateCollection(
    { successfulCallback, errorCallback }: RequestCallbackOptions = {}
): useCreateCollectionReturnType {

    const { pbClient, user } = useContext(BackendClientContext);
    const [isSuccessful, setIsSuccessful] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const createCollection = async ({ name, slug }: CreateUpdateCollectionOptions) => {
        setIsLoading(true);
        await pbClient.collection(DbTable.COLLECTIONS)
            .create({ name, slug, owner: user!.id })
            .then((_record: ItemCollection) => {
                setIsSuccessful(true);
                successfulCallback?.();
            })
            .catch(err => {
                errorCallback?.();
                console.error(err);
                notifications.show({
                    message: "Error creating new Collection",
                    color: "red",
                    autoClose: false,
                    withCloseButton: true,
                });
            });
        
        setIsLoading(false);
    };

    return [
        createCollection,
        isLoading,
        isSuccessful,
    ];
};
