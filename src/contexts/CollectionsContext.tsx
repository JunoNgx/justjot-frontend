import { ReactNode, createContext, useCallback, useContext, useEffect, useState } from 'react';
import { ApiRequestCallbackOptions, DbTable, ItemCollection } from '@/types';
import { BackendClientContext } from '@/contexts/BackendClientContext';
import { ClientResponseError } from 'pocketbase';
import useGenerateTrashBinCollection from '@/hooks/useGenerateTrashBinCollection';

type CollectionsContextType = {
    collections: ItemCollection[],
    setCollections: React.Dispatch<React.SetStateAction<ItemCollection[]>>,
    currCollection: ItemCollection | undefined,
    setCurrCollection: React.Dispatch<React.SetStateAction<ItemCollection | undefined>>,
    collSelectedIndex: number,
    fetchCollections: ({successfulCallback, errorCallback}?: ApiRequestCallbackOptions) => void,
};

export const CollectionsContext = createContext<CollectionsContextType>({} as CollectionsContextType);

export default function CollectionsContextProvider({ children }: { children: ReactNode }) {
    const { isLoggedIn, pbClient, user } = useContext(BackendClientContext);
    const [collections, setCollections] = useState<ItemCollection[]>([]);
    const [currCollection, setCurrCollection] = useState<ItemCollection>();

    useEffect(() => {
        if (!isLoggedIn) return;
        fetchCollections();
    }, [user]);

    // // @ts-expect-error
    // const removeLoginStatusListener = pbClient.authStore.onChange((token, model) => {
    //     if (pbClient.authStore.isValid) {
    //         pbClient.authStore.save(token, model);
    //         setUser(model as User);
    //         fetchCollections();
    //         return;
    //     }

    //     setUser(null);
    // });

    const fetchCollections = useCallback(async (
        {successfulCallback, errorCallback}: ApiRequestCallbackOptions = {}
    ) => {
        if (!isLoggedIn) return;

        await pbClient
            .cancelRequest("collection-get-all")
            .collection(DbTable.COLLECTIONS)
            .getFullList({
                sort: "sortOrder",
                requestKey: "collection-get-all",
            })
            .then((records: ItemCollection[]) => {
                successfulCallback?.();
                setCollections(collectionListWithAppendedTrashBin(records));
            })
            .catch((err: ClientResponseError) => {
                errorCallback?.();
                if (!err.isAbort) {
                    console.warn("Non cancellation error");
                }
            });
    }, [isLoggedIn]);

    const collectionListWithAppendedTrashBin = (
        curr: ItemCollection[]
    ) => {
        return [...curr, useGenerateTrashBinCollection(user)];
    };

    const collSelectedIndex = collections.findIndex(c => c.id === currCollection?.id);

    return <CollectionsContext.Provider value=
        {{
            collections,
            setCollections,
            currCollection,
            setCurrCollection,

            collSelectedIndex,
            fetchCollections
        }}
    >
        {children}
    </CollectionsContext.Provider>
}