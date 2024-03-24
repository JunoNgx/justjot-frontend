import { ReactNode, createContext, useCallback, useContext, useState } from 'react';
import { DbTable, ItemCollection } from '@/types';
import { BackendClientContext } from '@/contexts/BackendClientContext';

type CollectionsContextType = {
    collections: ItemCollection[] | undefined,
    setCollections: React.Dispatch<React.SetStateAction<ItemCollection[] | undefined>>,
    fetchCollections: () => void,
};

export const CollectionsContext = createContext<CollectionsContextType>({
    collections: undefined,
    setCollections: () => {},
    fetchCollections: () => {},
});

export default function CollectionsContextProvider({ children }: { children: ReactNode }) {
    const { isLoggedIn, pbClient } = useContext(BackendClientContext);
    const [collections, setCollections] = useState<ItemCollection[]>();

    const fetchCollections = useCallback(async () => {
        if (!isLoggedIn) return;

        await pbClient
            .cancelRequest("collection-get-all")
            .collection(DbTable.COLLECTIONS)
            .getFullList({
                sort: "sortOrder",
                requestKey: "collection-get-all",
            })
            .then((records: ItemCollection[]) => {
                setCollections(records);
            })
            .catch(err => {
                console.error(err)
                if (!err.isAbort) {
                    console.warn("Non cancellation error")
                }
            });
    }, []);

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