import { ReactNode, createContext, useCallback, useContext, useState } from 'react';
import { DbTable, Item, ItemCollection } from 'src/types';
import { BackendClientContext } from 'src/contexts/BackendClientContext';

type ItemsContextType = {
    items: Item[] | undefined,
    setItems: React.Dispatch<React.SetStateAction<Item[] | undefined>>,
    fetchItems: (currCollection: ItemCollection | undefined) => void,
};

export const ItemsContext = createContext<ItemsContextType>({
    items: undefined,
    setItems: () => {},
    fetchItems: () => {},
});

export default function ItemsContextProvider({ children }: { children: ReactNode }) {
    // const { isLoggedIn } = useContext(BackendClientContext);
    const { pbClient } = useContext(BackendClientContext);
    // const {  } = useContext(CurrentCollectionContext);
    const [ items, setItems ] = useState<Item[]>();

    const fetchItems = useCallback(async (currCollection: ItemCollection | undefined) => {
        if (!currCollection) return;

        await pbClient
            .cancelAllRequests()
            .collection(DbTable.ITEMS)
            .getFullList({
                // Single relation can be used without specifying the id
                filter: `collection="${currCollection?.id}"`,
                sort: "-created"
            })
            .then((records: Item[]) => {
                setItems(records);
            })
            .catch(error => {
                console.error(error);
            })
    }, []);

    // const fetchItems = () => {
    //     console.log("yo");
    // }

    return <ItemsContext.Provider value=
        {{
            items,
            setItems,
            fetchItems
        }}
    >
        {children}
    </ItemsContext.Provider>
}