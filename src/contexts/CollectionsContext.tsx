import { ReactNode, createContext, useCallback, useContext, useState } from 'react';
import { DbTable, ItemCollection } from '../types';
import { BackendClientContext } from './BackendClientContext';

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
            // .cancelAllRequests()
            .collection(DbTable.COLLECTIONS)
            .getFullList({
                sort: "sortOrder"
            })
            .then((records: ItemCollection[]) => {
                setCollections(records);
            })
            .catch(error => {
                console.error(error)
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