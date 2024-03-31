import { BackendClientContext } from "@/contexts/BackendClientContext";
import { CurrentCollectionContext } from "@/contexts/CurrentCollectionContext";
import { ItemsContext } from "@/contexts/ItemsContext";
import { CreateItemOptions, MoveItemOptions, DbTable, Item, UpdateItemTitleOptions, UpdateItemContentOptions, UpdateItemTitleAndContentOptions, ApiRequestCallbackOptions } from "@/types";
import { useContext } from "react";

export default function useItemApiCalls() {

    const { pbClient, user } = useContext(BackendClientContext);
    const { currCollection } = useContext(CurrentCollectionContext);
    const { fetchItems } = useContext(ItemsContext);

    const createItem = async (
        { title, content,
            successfulCallback, errorCallback, setLoadingState
        }: CreateItemOptions
    ) => {
        setLoadingState?.(true);
        pbClient.collection(DbTable.ITEMS)
        .create({
            owner: user!.id,
            collection: currCollection!.id,
            title,
            content,
        }, { requestKey: null })
        .then((record: Item) => {
            successfulCallback?.(record);
        })
        .catch(err => {
            errorCallback?.(err);
        });
        setLoadingState?.(false);
    };

    const moveItem = async (
        { itemId, collectionId,
            successfulCallback, errorCallback, setLoadingState,
        }: MoveItemOptions
    ) => {
        setLoadingState?.(true);
        pbClient
        .collection(DbTable.ITEMS)
        .update(itemId,
            { collection: collectionId },
            { requestKey: "item-move"},
        )
        .then((record: Item) => {
            successfulCallback?.(record);
        })
        .catch(err => {
            errorCallback?.(err);
        });
        setLoadingState?.(false);
    };

    const updateItemTitle = async (
        { itemId, title,
            successfulCallback, errorCallback, setLoadingState
        }: UpdateItemTitleOptions
    ) => {
        setLoadingState?.(true);
        pbClient.collection(DbTable.ITEMS)
        .update(itemId, { title })
        .then((record: Item) => {
            successfulCallback?.(record);
        })
        .catch(err => {
            errorCallback?.(err);
        });
        setLoadingState?.(false);
    };

    const updateItemContent = async (
        { itemId, content,
            successfulCallback, errorCallback, setLoadingState
        }: UpdateItemContentOptions
    ) => {
        setLoadingState?.(true);
        pbClient.collection(DbTable.ITEMS)
        .update(itemId, { content })
        .then((_record: Item) => {
            successfulCallback?.();
        })
        .catch(err => {
            errorCallback?.();
            console.error(err);
            if (!err.isAbort) {
                console.warn("Non cancellation error")
            }

        });
        setLoadingState?.(false);
    };

    const updateItemTitleAndContent = async (
        { itemId, title, content,
            successfulCallback, errorCallback, setLoadingState
        }: UpdateItemTitleAndContentOptions
    ) => {
        setLoadingState?.(true);
        pbClient
        .collection(DbTable.ITEMS)
        .update(itemId,
            { title, content },
            { requestKey: "item-update-both" }
        )
        .then((record: Item) => {
            successfulCallback?.(record);
        })
        .catch(err => {
            errorCallback?.(err);
        });
        setLoadingState?.(false);
    };

    const deleteItem = async ({
        item, successfulCallback, errorCallback, setLoadingState
    }: {item: Item,} & ApiRequestCallbackOptions) => {

        setLoadingState?.(true);
        await pbClient.collection(DbTable.ITEMS)
        .delete(item.id)
        .then((_isSuccessful: boolean) => {
            successfulCallback?.();
        })
        .catch(err => {
            errorCallback?.(err);
        });
        setLoadingState?.(false);
    };

    const refetchLinkTitleAndFavicon = async (
        { item, successfulCallback, errorCallback, setLoadingState }:
        { item: Item } & ApiRequestCallbackOptions
    ) => {
        setLoadingState?.(true);
        await fetch(`${import.meta.env.VITE_BACKEND_URL}refetch/${user!.id}/${item!.id}`, {
            method: "PATCH",
            headers: {
                authorization: pbClient.authStore.token
            },
        })
        .then((record) => {
            successfulCallback?.(record);
            // TODO: read from response
            fetchItems(currCollection);
        })
        .catch(err => {
            errorCallback?.(err);
        });
        setLoadingState?.(false);
    };

    return {
        createItem,
        moveItem,
        updateItemTitle,
        updateItemContent,
        updateItemTitleAndContent,
        deleteItem,
        refetchLinkTitleAndFavicon,
    }
}