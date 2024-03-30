import { BackendClientContext } from "@/contexts/BackendClientContext";
import { ApiRequestCallbackOptions, DbTable, ItemCollection } from "@/types";
import { SORT_ORDER_INCREMENT_COLLECTION } from "@/utils/constants";
import { useContext } from "react";

type CreateUpdateCollectionOptions = {
    name: string,
    slug: string
};

type CollectionApiCallsCommonOptions = {
    setLoadingState?: React.Dispatch<React.SetStateAction<boolean>>
} & ApiRequestCallbackOptions;

type createCollectionParams = {
    currHighestSortOrder: number
} & CreateUpdateCollectionOptions
& CollectionApiCallsCommonOptions;
    
export default function useCollectionApiCalls() {

    const { pbClient, user } = useContext(BackendClientContext);

    const createCollection = async (
        {name, slug, currHighestSortOrder,
            successfulCallback, errorCallback, setLoadingState
        }: createCollectionParams    
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
            .then((_record: ItemCollection) => {
                successfulCallback?.(_record);
            })
            .catch(err => {
                errorCallback?.(err);
                console.error(err);
            });
        setLoadingState?.(false);
    };

    return {
        createCollection
    };
};