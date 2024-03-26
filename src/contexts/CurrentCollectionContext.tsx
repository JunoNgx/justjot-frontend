import { ReactNode, createContext, useState } from 'react';
import { ItemCollection } from '@/types';

type CurrentCollectionContextType = {
    currCollection: ItemCollection | undefined,
    setCurrCollection: React.Dispatch<React.SetStateAction<ItemCollection | undefined>>,
};

export const CurrentCollectionContext = createContext<CurrentCollectionContextType>({
    currCollection: undefined,
    setCurrCollection: () => {},
});

export default function CurrentCollectionContextProvider({ children }: { children: ReactNode }) {
    const [currCollection, setCurrCollection] = useState<ItemCollection>();

    return <CurrentCollectionContext.Provider value=
        {{
            currCollection,
            setCurrCollection,
        }}
    >
        {children}
    </CurrentCollectionContext.Provider>
}