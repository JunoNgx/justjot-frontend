import { ReactNode, createContext, useState } from 'react';
import { ItemCollection } from '@/types';

type CurrentCollectionContextType = {
    currCollection: ItemCollection | undefined,
    setCurrCollection: React.Dispatch<React.SetStateAction<ItemCollection | undefined>>,
    currSelectedCollectionIndex: number,
    setCurrSelectedCollectionIndex: React.Dispatch<React.SetStateAction<number>>
};

export const CurrentCollectionContext = createContext<CurrentCollectionContextType>({
    currCollection: undefined,
    setCurrCollection: () => {},
    currSelectedCollectionIndex: 0,
    setCurrSelectedCollectionIndex: () => {},
});

export default function CurrentCollectionContextProvider({ children }: { children: ReactNode }) {
    const [currCollection, setCurrCollection] = useState<ItemCollection>();
    const [currSelectedCollectionIndex, setCurrSelectedCollectionIndex] = useState<number>(0);

    return <CurrentCollectionContext.Provider value=
        {{
            currCollection,
            setCurrCollection,
            currSelectedCollectionIndex,
            setCurrSelectedCollectionIndex,
        }}
    >
        {children}
    </CurrentCollectionContext.Provider>
}