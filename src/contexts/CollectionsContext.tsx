import { ReactNode, createContext, useCallback, useContext, useEffect, useState } from 'react';
import { ApiRequestCallbackOptions, DbTable, ItemCollection, TrashBin } from '@/types';
import { BackendClientContext } from '@/contexts/BackendClientContext';
import { ClientResponseError } from 'pocketbase';

type CollectionsContextType = {
    collections: ItemCollection[],
    setCollections: React.Dispatch<React.SetStateAction<ItemCollection[]>>,
    currCollection: ItemCollection | undefined,
    setCurrCollection: React.Dispatch<React.SetStateAction<ItemCollection | undefined>>,
    trashBin: TrashBin | undefined,
    setTrashBin: React.Dispatch<React.SetStateAction<TrashBin | undefined>>,
    isTrashCollection: boolean,
    collSelectedIndex: number,
    fetchCollections: ({successfulCallback, errorCallback}?: ApiRequestCallbackOptions) => void,
};

export const CollectionsContext = createContext<CollectionsContextType>({} as CollectionsContextType);

export default function CollectionsContextProvider({ children }: { children: ReactNode }) {
    const { isLoggedIn, pbClient, user } = useContext(BackendClientContext);
    const [collections, setCollections] = useState<ItemCollection[]>([]);
    const [currCollection, setCurrCollection] = useState<ItemCollection>();
    const [trashBin, setTrashBin] = useState<TrashBin>();

    useEffect(() => {
        fetchTrashBin();
    }, [user]);

    useEffect(() => {
        fetchCollections();
    }, [trashBin]);

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

    const fetchTrashBin = useCallback(async (
        {successfulCallback, errorCallback}: ApiRequestCallbackOptions = {}
    ) => {
        if (!isLoggedIn) return;

        await pbClient
            .collection(DbTable.TRASH_BINS)
            .getFirstListItem(`owner="${user!.id}"`)
            .then((record) => {
                successfulCallback?.();
                setTrashBin({...record, isTrashBin: true});
            })
            .catch((err: ClientResponseError) => {
                errorCallback?.();
                if (!err.isAbort) {
                    console.warn("Non cancellation error");
                }
            });

    }, [isLoggedIn]);

    const fetchCollections = useCallback(async (
        {successfulCallback, errorCallback}: ApiRequestCallbackOptions = {}
    ) => {
        if (!isLoggedIn || !trashBin) return;

        await pbClient
            .cancelRequest("collection-get-all")
            .collection(DbTable.COLLECTIONS)
            .getFullList({
                sort: "sortOrder",
                requestKey: "collection-get-all",
            })
            .then((records: ItemCollection[]) => {
                successfulCallback?.();
                setCollections([...records, trashBin]);
            })
            .catch((err: ClientResponseError) => {
                errorCallback?.();
                if (!err.isAbort) {
                    console.warn("Non cancellation error");
                }
            });
    }, [trashBin]);

    const collSelectedIndex = collections.findIndex(c => c.id === currCollection?.id);
    const isTrashCollection = currCollection?.isTrashBin;

    return <CollectionsContext.Provider value=
        {{
            collections,
            setCollections,
            currCollection,
            setCurrCollection,
            trashBin,
            setTrashBin,

            collSelectedIndex,
            isTrashCollection,
            fetchCollections
        }}
    >
        {children}
    </CollectionsContext.Provider>
}