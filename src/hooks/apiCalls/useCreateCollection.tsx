import { useContext, useState } from "react";
import { BackendClientContext } from "@/contexts/BackendClientContext";
import { DbTable, ItemCollection, CreateUpdateCollectionOptions, RequestCallbackOptions } from "@/types";
import { notifications } from "@mantine/notifications";
import { AUTO_CLOSE_ERROR_TOAST, SORT_ORDER_INCREMENT_COLLECTION } from "@/utils/constants";

type useCreateCollectionReturnType = [
    (
        { name, slug }: CreateUpdateCollectionOptions,
        currHighestSortOrder?: number
    ) => Promise<void>,
    boolean,
    boolean,
];

export default function useCreateCollection(
    { successfulCallback, errorCallback }: RequestCallbackOptions = {}
): useCreateCollectionReturnType {

    const { pbClient, user } = useContext(BackendClientContext);
    const [isSuccessful, setIsSuccessful] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const createCollection = async ({ name, slug }: CreateUpdateCollectionOptions, currHighestSortOrder?: number) => {

        const newSortOrderVal: number = currHighestSortOrder
            ? currHighestSortOrder + SORT_ORDER_INCREMENT_COLLECTION
            : 0;

        setIsLoading(true);
        await pbClient.collection(DbTable.COLLECTIONS)
            .create({
                name,
                slug,
                owner: user!.id,
                sortOrder: newSortOrderVal
            })
            .then((_record: ItemCollection) => {
                setIsSuccessful(true);
                successfulCallback?.();
            })
            .catch(err => {
                errorCallback?.();
                console.error(err);
                notifications.show({
                    message: "Error creating new collection",
                    color: "red",
                    autoClose: AUTO_CLOSE_ERROR_TOAST,
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
