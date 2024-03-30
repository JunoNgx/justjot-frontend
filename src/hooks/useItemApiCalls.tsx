import { BackendClientContext } from "@/contexts/BackendClientContext";
import { CurrentCollectionContext } from "@/contexts/CurrentCollectionContext";
import { CreateItemOptions, MoveItemOptions, DbTable, Item } from "@/types";
import { useContext } from "react";

export default function useItemApiCalls() {

    const { pbClient, user } = useContext(BackendClientContext);
    const { currCollection } = useContext(CurrentCollectionContext);

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

    return {
        createItem,
        moveItem,
    }
}