import { ReactNode, createContext, useCallback, useContext, useState } from 'react';
import { DbTable, Item, ItemCollection } from '@/types';
import { BackendClientContext } from '@/contexts/BackendClientContext';

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
    const { pbClient } = useContext(BackendClientContext);
    const [ items, setItems ] = useState<Item[]>();

    const fetchItems = useCallback(async (currCollection: ItemCollection | undefined) => {
        if (!currCollection) return;

        await pbClient
            .cancelRequest("fetch-items")
            .collection(DbTable.ITEMS)
            .getFullList({
                // Single relation can be used without specifying the id
                filter: `collection="${currCollection?.id}"`,
                sort: "-created",
                requestKey: "fetch-items",
            }, )
            .then((records: Item[]) => {
                setItems(records);
            })
            .catch(err => {
                if (!err.isAbort) {
                    console.error(err);
                }
            })
    }, []);


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