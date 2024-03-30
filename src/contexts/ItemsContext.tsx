import { ReactNode, createContext, useCallback, useContext } from 'react';
import { DbTable, Item, ItemCollection } from '@/types';
import { BackendClientContext } from '@/contexts/BackendClientContext';
import { UseListStateHandlers, useListState } from '@mantine/hooks';

type ItemsContextType = {
    items: Item[],
    itemsHandlers: UseListStateHandlers<Item>,
    fetchItems: (currCollection: ItemCollection | undefined) => void,
};

export const ItemsContext = createContext<ItemsContextType>(
    {} as ItemsContextType
);

export default function ItemsContextProvider({ children }: { children: ReactNode }) {
    const { pbClient } = useContext(BackendClientContext);
    const [ items, itemsHandlers ] = useListState<Item>([]);

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
                itemsHandlers.setState(records);
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
            itemsHandlers,
            fetchItems
        }}
    >
        {children}
    </ItemsContext.Provider>
}