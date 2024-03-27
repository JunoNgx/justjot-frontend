import { ReactNode, createContext, useContext, useRef, useState } from 'react';
import { ItemCollection } from '@/types';

type CurrentCollectionContextType = {
    currCollection: ItemCollection | undefined,
    setCurrCollection: React.Dispatch<React.SetStateAction<ItemCollection | undefined>>,
    currentSelectedCollectionIndexRef: React.MutableRefObject<number> | null,
};

export const CurrentCollectionContext = createContext<CurrentCollectionContextType>({
    currCollection: undefined,
    setCurrCollection: () => {},
    currentSelectedCollectionIndexRef: null,
});

export default function CurrentCollectionContextProvider({ children }: { children: ReactNode }) {
    const [currCollection, setCurrCollection] = useState<ItemCollection>();
    const currentSelectedCollectionIndexRef = useRef(0);

    return <CurrentCollectionContext.Provider value=
        {{
            currCollection,
            setCurrCollection,
            currentSelectedCollectionIndexRef,
        }}
    >
        {children}
    </CurrentCollectionContext.Provider>
}