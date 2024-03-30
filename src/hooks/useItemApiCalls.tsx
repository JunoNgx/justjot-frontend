import { BackendClientContext } from "@/contexts/BackendClientContext";
import { CurrentCollectionContext } from "@/contexts/CurrentCollectionContext";
import { CreateItemOptions, DbTable, Item } from "@/types";
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

    return {
        createItem,
    }
}