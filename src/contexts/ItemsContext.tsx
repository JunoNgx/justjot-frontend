import { ReactNode, SetStateAction, createContext, useCallback, useContext, useEffect, useState } from 'react';
import { DbTable, Item, ItemCollection } from '@/types';
import { BackendClientContext } from '@/contexts/BackendClientContext';
import { findIndexById } from '@/utils/itemUtils';
import useManageListState from '@/libs/useManageListState';

type UpdateQueueItem = {
    tempId: string,
    item: Item,
};

type ItemsContextType = {
    items: Item[],
    setItems: React.Dispatch<SetStateAction<Item[]>>,
    fetchItems: (currCollection: ItemCollection | undefined) => void,
    updateQueue: UpdateQueueItem[],
    setUpdateQueue: React.Dispatch<SetStateAction<UpdateQueueItem[]>>,
};

export const ItemsContext = createContext<ItemsContextType>(
    {} as ItemsContextType
);

export default function ItemsContextProvider({ children }: { children: ReactNode }) {
    const { pbClient } = useContext(BackendClientContext);
    const [ items, setItems ] = useState<Item[]>([]);
    const [ updateQueue, setUpdateQueue ] = useState<UpdateQueueItem[]>([]);

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


    const itemsHandlers = useManageListState(setItems);
    const updateQueueHandlers = useManageListState(setUpdateQueue);

    /**
     * Attempt to track down temporary items, and replace them with
     * appropriate correct data
     */
    useEffect(() => {
        updateQueue.forEach((updateQueueItem, updateQueueIndex) => {
            const index = findIndexById(updateQueueItem.tempId, items);
            if (index === -1) return;

            itemsHandlers.replace(index, updateQueueItem.item);
            updateQueueHandlers.remove(updateQueueIndex);
        });
    }, [items, updateQueue])

    return <ItemsContext.Provider value=
        {{
            items,
            setItems,
            fetchItems,
            updateQueue,
            setUpdateQueue,
        }}
    >
        {children}
    </ItemsContext.Provider>
}