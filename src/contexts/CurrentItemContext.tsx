import { ReactNode, createContext, useState } from 'react';
import { Item } from 'src/types';

type CurrentItemContextType = {
    currItem: Item | undefined,
    setCurrItem: React.Dispatch<React.SetStateAction<Item | undefined>>,
};

export const CurrentItemContext = createContext<CurrentItemContextType>({
    currItem: undefined,
    setCurrItem: () => {},
});

export default function CurrentItemContextProvider({ children }: { children: ReactNode }) {
    const [ currItem, setCurrItem ] = useState<Item>();

    return <CurrentItemContext.Provider value=
        {{
            currItem,
            setCurrItem,
        }}
    >
        {children}
    </CurrentItemContext.Provider>
}