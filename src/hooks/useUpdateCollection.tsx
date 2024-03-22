import { useContext, useState } from "react";
import { BackendClientContext } from "src/contexts/BackendClientContext";
import { DbTable, ItemCollection, CreateUpdateCollectionOptions, RequestCallbackOptions } from "src/types";
import { notifications } from "@mantine/notifications";
import { AUTO_CLOSE_ERROR_TOAST } from "src/utils/constants";
import { CurrentCollectionContext } from "src/contexts/CurrentCollectionContext";

type useUpdateCollectionReturnType = [
    ({ name, slug }: CreateUpdateCollectionOptions) => Promise<void>,
    boolean,
    boolean,
];

export default function useUpdateCollection({
    successfulCallback, errorCallback }: RequestCallbackOptions = {}
): useUpdateCollectionReturnType {

    const {pbClient, user} = useContext(BackendClientContext);
    const { currCollection } = useContext(CurrentCollectionContext);
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
                    autoClose: AUTO_CLOSE_ERROR_TOAST,
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
