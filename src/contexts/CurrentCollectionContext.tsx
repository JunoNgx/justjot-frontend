import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { ItemCollection } from '../types';
import { CollectionsContext } from './CollectionsContext';

type CurrentCollectionContextType = {
    currCollection: ItemCollection | undefined,
    setCurrCollection: React.Dispatch<React.SetStateAction<ItemCollection | undefined>>,
};

export const CurrentCollectionContext = createContext<CurrentCollectionContextType>({
    currCollection: undefined,
    setCurrCollection: () => {},
});

export default function CurrentCollectionContextProvider({ children }: { children: ReactNode }) {
    const { collections } = useContext(CollectionsContext);
    const [currCollection, setCurrCollection] = useState<ItemCollection>();

    useEffect(() => {
        if (!collections) return;
        setCurrCollection(collections[0]);
    }, []);

    return <CurrentCollectionContext.Provider value=
        {{
            currCollection,
            setCurrCollection,
        }}
    >
        {children}
    </CurrentCollectionContext.Provider>
}