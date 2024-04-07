import { BackendClientContext } from "@/contexts/BackendClientContext";
import { CollectionsContext } from "@/contexts/CollectionsContext";
import { CreateItemOptions, MoveItemOptions, DbTable, Item, UpdateItemTitleOptions, UpdateItemContentOptions, UpdateItemTitleAndContentOptions, ApiRequestCallbackOptions, ItemType } from "@/types";
import { MAX_TITLE_LENGTH } from "@/utils/constants";
import { useContext } from "react";

export default function useItemApiCalls() {

    const { pbClient, user } = useContext(BackendClientContext);
    const { currCollection } = useContext(CollectionsContext);

    const createItem = async (
        { title, content,
            successfulCallback, errorCallback, setLoadingState
        }: CreateItemOptions
    ) => {
        setLoadingState?.(true);
        await pbClient.collection(DbTable.ITEMS)
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
        await pbClient
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
        await pbClient.collection(DbTable.ITEMS)
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
        await pbClient.collection(DbTable.ITEMS)
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
        await pbClient
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
        await pbClient.send(`refetch/${user!.id}/${item!.id}`, {
            method: "PATCH",
            authorization: pbClient.authStore.token
        })
            .then((record) => {
                successfulCallback?.(record);
            })
            .catch(err => {
                errorCallback?.(err);
            });
        setLoadingState?.(false);
    };

    const toggleItemShouldCopyOnClick = async (
        { item, shouldCopyOnClick, successfulCallback, errorCallback, setLoadingState }:
        { item: Item, shouldCopyOnClick: boolean } & ApiRequestCallbackOptions
    ) => {
        setLoadingState?.(true);
        await pbClient.collection(DbTable.ITEMS)
            .update(item.id,
                {shouldCopyOnClick},
                {requestKey: null},
            )
            .then((record) => {
                successfulCallback?.(record);
            })
            .catch(err => {
                errorCallback?.(err);
            });
        setLoadingState?.(false);
    };

    const toggleItemIsTodoDone = async (
        { item, isTodoDone, successfulCallback, errorCallback, setLoadingState }:
        { item: Item, isTodoDone: boolean } & ApiRequestCallbackOptions
    ) => {
        setLoadingState?.(true);
        await pbClient.collection(DbTable.ITEMS)
            .update(item.id,
                {isTodoDone: isTodoDone},
                {requestKey: null},
            )
            .then((record) => {
                successfulCallback?.(record);
            })
            .catch(err => {
                errorCallback?.(err);
            });
        setLoadingState?.(false);
    };

    const convertItemToTodo = async (
        { item, successfulCallback, errorCallback, setLoadingState }:
        { item: Item } & ApiRequestCallbackOptions
    ) => {
        setLoadingState?.(true);
        await pbClient.collection(DbTable.ITEMS)
            .update(item.id,
                {
                    title: item.content.slice(0, MAX_TITLE_LENGTH),
                    content: "",
                    type: ItemType.TODO,
                    shouldCopyOnClick: false,
                },
                {requestKey: null},
            )
            .then((record) => {
                successfulCallback?.(record);
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
        toggleItemShouldCopyOnClick,
        toggleItemIsTodoDone,
        convertItemToTodo,
    }
}