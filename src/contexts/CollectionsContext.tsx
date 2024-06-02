import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { ApiRequestCallbackOptions, DbTable, ItemCollection, TrashBin } from '@/types';
import { BackendClientContext } from '@/contexts/BackendClientContext';
import { ClientResponseError } from 'pocketbase';

type CollectionsContextType = {
    initCollections: ItemCollection[],
    setInitCollections: React.Dispatch<React.SetStateAction<ItemCollection[]>>,
    collectionList: (ItemCollection | undefined)[],
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
    // Initial collection without Trash Bin
    const [initCollections, setInitCollections] = useState<ItemCollection[]>([]);
    const [currCollection, setCurrCollection] = useState<ItemCollection>();
    const [trashBin, setTrashBin] = useState<TrashBin>();

    useEffect(() => {
        const fetchData = async () => {
            await fetchCollections();
            await fetchTrashBin();
        }

        fetchData();
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

    const fetchTrashBin = async (
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

    };

    const fetchCollections = async (
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
                setInitCollections(records);
            })
            .catch((err: ClientResponseError) => {
                errorCallback?.();
                if (!err.isAbort) {
                    console.warn("Non cancellation error");
                }
            });
    };

    const collectionList = [...initCollections, trashBin];
    const collSelectedIndex = collectionList.findIndex(c => c?.id === currCollection?.id);
    const isTrashCollection = currCollection?.isTrashBin;

    return <CollectionsContext.Provider value=
        {{
            initCollections,
            setInitCollections,
            collectionList,
            currCollection,
            setCurrCollection,
            trashBin,
            setTrashBin,

            collSelectedIndex,
            isTrashCollection,
            fetchCollections,
        }}
    >
        {children}
    </CollectionsContext.Provider>
}