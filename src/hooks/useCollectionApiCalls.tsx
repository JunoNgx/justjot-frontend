import { BackendClientContext } from "@/contexts/BackendClientContext";
import { ApiRequestCallbackOptions, DbTable, ItemCollection, TrashBin } from "@/types";
import { SORT_ORDER_INCREMENT_COLLECTION } from "@/utils/constants";
import { useContext } from "react";

type UpdateCollectionOptions = {
    collectionId: string,
    name: string,
    slug: string,
} & ApiRequestCallbackOptions;

type CreateCollectionOptions = {
    name: string,
    slug: string,
    currHighestSortOrder: number
} & ApiRequestCallbackOptions;

type DeleteCollectionOptions = {
    collection: ItemCollection
} & ApiRequestCallbackOptions;

type SortCollectionOptions = {
    collectionId: string,
    newSortOrderValue: number,
} & ApiRequestCallbackOptions;

export default function useCollectionApiCalls() {

    const { pbClient, user } = useContext(BackendClientContext);

    const createCollection = async (
        { name, slug, currHighestSortOrder,
            successfulCallback, errorCallback, setLoadingState
        }: CreateCollectionOptions
    ) => {
        const newSortOrderVal: number = currHighestSortOrder
            ? currHighestSortOrder + SORT_ORDER_INCREMENT_COLLECTION
            : 0;

        setLoadingState?.(true);
        await pbClient.collection(DbTable.COLLECTIONS)
            .create({
                name,
                slug,
                owner: user!.id,
                sortOrder: newSortOrderVal
            })
            .then((record: ItemCollection) => {
                successfulCallback?.(record);
            })
            .catch(err => {
                errorCallback?.(err);
            });
        setLoadingState?.(false);
    };

    const updateCollection = async (
        { collectionId, name, slug,
            successfulCallback, errorCallback, setLoadingState,
        }: UpdateCollectionOptions
    ) => {
        setLoadingState?.(true);
        await pbClient.collection(DbTable.COLLECTIONS)
            .update(collectionId,
                { name, slug, })
            .then((record: ItemCollection) => {
                successfulCallback?.(record);
            })
            .catch(err => {
                errorCallback?.(err);
            });
        setLoadingState?.(false);
    };

    const deleteCollection = async (
        { collection,
            successfulCallback, errorCallback, setLoadingState
        }: DeleteCollectionOptions
    ) => {
        setLoadingState?.(true);
        await pbClient.collection(DbTable.COLLECTIONS)
            .delete(collection.id)
            .then((_isSuccessful: boolean) => {
                successfulCallback?.();
            })
            .catch(err => {
                errorCallback?.(err);
            });
        setLoadingState?.(false);
    };

    const sortCollection = async (
        { collectionId, newSortOrderValue,
            successfulCallback, errorCallback, setLoadingState
        }: SortCollectionOptions
    ) => {
        setLoadingState?.(true);
        await pbClient.collection(DbTable.COLLECTIONS)
            .update(collectionId,
                { sortOrder: newSortOrderValue },
                // { requestKey: "collection-sort" }
                { requestKey: null } // Allow repeated request, no auto-cancelation
            )
            .then((record: ItemCollection) => {
                successfulCallback?.(record);
            })
            .catch(err => {
                errorCallback?.(err);
            });
        setLoadingState?.(false);
    }

    const updateTrashBin = async (
        { collectionId, name, slug,
            successfulCallback, errorCallback, setLoadingState,
        }: UpdateCollectionOptions
    ) => {
        setLoadingState?.(true);
        await pbClient.collection(DbTable.TRASH_BINS)
            .update(collectionId,
                { name, slug })
            .then((record: TrashBin) => {
                successfulCallback?.(record);
            })
            .catch(err => {
                errorCallback?.(err);
            });
        setLoadingState?.(false);
    };

    return {
        createCollection,
        deleteCollection,
        updateCollection,
        sortCollection,
        updateTrashBin,
    };
};