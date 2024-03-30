import { useContext, useState } from "react";
import { BackendClientContext } from "@/contexts/BackendClientContext";
import { DbTable, ItemCollection, CreateUpdateCollectionOptions, ApiRequestCallbackOptions } from "@/types";
import { notifications } from "@mantine/notifications";
import { AUTO_CLOSE_DEFAULT, AUTO_CLOSE_ERROR_TOAST } from "@/utils/constants";
import { CurrentCollectionContext } from "@/contexts/CurrentCollectionContext";

type useUpdateCollectionReturnType = [
    ({ name, slug }: CreateUpdateCollectionOptions) => Promise<void>,
    ({ collectionId, newSortOrderValue }: UpdateCollectionSortOrderParams) => Promise<void>,
    boolean,
    boolean,
];

type UpdateCollectionSortOrderParams = {
    collectionId: string,
    newSortOrderValue: number,
};

export default function useUpdateCollection({
    successfulCallback, errorCallback }: ApiRequestCallbackOptions = {}
): useUpdateCollectionReturnType {

    const {pbClient} = useContext(BackendClientContext);
    const { currCollection } = useContext(CurrentCollectionContext);
    const [isSuccessful, setIsSuccessful] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const updateCollection = async ({ name, slug }: CreateUpdateCollectionOptions) => {
        setIsLoading(true);
        await pbClient.collection(DbTable.COLLECTIONS)
            .update(currCollection!.id,
                {
                    name,
                    slug,
                })
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

    const updateCollectionSortOrder = async (
        { collectionId, newSortOrderValue }: UpdateCollectionSortOrderParams
    ) => {
        await pbClient.collection(DbTable.COLLECTIONS)
            .update(collectionId,
                { sortOrder: newSortOrderValue },
                { requestKey: "collection-sort"}
            )
            .then((_record: ItemCollection) => {
                // setIsSuccessful(true);
                // successfulCallback?.();

                notifications.show({
                    message: "Collections sort updated",
                    color: "none",
                    autoClose: AUTO_CLOSE_DEFAULT,
                    withCloseButton: true,
                });
            })
            .catch(err => {
                errorCallback?.();
                console.error(err);

                if (!err.isAbort) {
                    console.warn("Non cancellation error")
                }
                notifications.show({
                    message: "Error sorting collection",
                    color: "red",
                    autoClose: AUTO_CLOSE_ERROR_TOAST,
                    withCloseButton: true,
                });
            });
    }


    return [
        updateCollection,
        updateCollectionSortOrder,
        isLoading,
        isSuccessful,
    ];
};
