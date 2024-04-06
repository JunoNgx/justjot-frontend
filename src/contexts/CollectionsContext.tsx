import { ReactNode, createContext, useCallback, useContext, useState } from 'react';
import { ApiRequestCallbackOptions, DbTable, ItemCollection, User } from '@/types';
import { BackendClientContext } from '@/contexts/BackendClientContext';

type CollectionsContextType = {
    collections: ItemCollection[],
    setCollections: React.Dispatch<React.SetStateAction<ItemCollection[]>>,
    fetchCollections: ({successfulCallback, errorCallback}?: ApiRequestCallbackOptions) => void,
};

export const CollectionsContext = createContext<CollectionsContextType>({} as CollectionsContextType);

export default function CollectionsContextProvider({ children }: { children: ReactNode }) {
    const { isLoggedIn, pbClient } = useContext(BackendClientContext);
    const [collections, setCollections] = useState<ItemCollection[]>([]);

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
            setCollections(records);
        })
        .catch(err => {
            errorCallback?.();
            if (!err.isAbort) {
                console.warn("Non cancellation error", err);
            }
        });
    }, [isLoggedIn]);

    return <CollectionsContext.Provider value=
        {{
            collections,
            setCollections,
            fetchCollections
        }}
    >
        {children}
    </CollectionsContext.Provider>
}