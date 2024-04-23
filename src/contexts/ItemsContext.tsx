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
    isMainInputFocused: boolean,
    setIsMainInputFocused: React.Dispatch<React.SetStateAction<boolean>>,
    inputVal: string,
    setInputVal: React.Dispatch<SetStateAction<string>>,
    selectedIndex: number,
    setSelectedIndex: React.Dispatch<SetStateAction<number>>,
    updateQueue: UpdateQueueItem[],
    setUpdateQueue: React.Dispatch<SetStateAction<UpdateQueueItem[]>>,
    fetchItems: (
        currCollection: ItemCollection | undefined,
        setLoadingState?: React.Dispatch<React.SetStateAction<boolean>>,
    )  => void,
    filteredItems: Item[],
    selectedItem: Item | undefined,
};

export const ItemsContext = createContext<ItemsContextType>(
    {} as ItemsContextType
);

export default function ItemsContextProvider({ children }: { children: ReactNode }) {
    const { pbClient } = useContext(BackendClientContext);
    const [ items, setItems ] = useState<Item[]>([]);
    const [ isMainInputFocused, setIsMainInputFocused ] = useState(false);
    const [ inputVal, setInputVal ] = useState("");
    const [ selectedIndex, setSelectedIndex ] = useState(-1);
    const [ updateQueue, setUpdateQueue ] = useState<UpdateQueueItem[]>([]);

    const fetchItems = useCallback(async(
        currCollection: ItemCollection | undefined,
        setLoadingState?: React.Dispatch<React.SetStateAction<boolean>>,
    ) => {
        if (!currCollection) return;
        setLoadingState?.(true);

        const normalItemsFetchOptions = {
            // Single relation can be used without specifying the id
            filter: `collection="${currCollection?.id}"`,
            sort: "-created",
            requestKey: "fetch-items",
        }

        await pbClient
            .cancelRequest("fetch-items")
            .collection(DbTable.ITEMS)
            .getFullList(normalItemsFetchOptions)
            .then((records: Item[]) => {
                setItems(records);
            })
            .catch(err => {
                if (!err.isAbort) {
                    console.error(err);
                }
            })

        setLoadingState?.(false);
    }, []);

    const filteredItems = items.filter(item => {

        const searchTerm = inputVal.toLocaleLowerCase();
        const hasTitleMatch = item.title?.toLowerCase()
            .indexOf(searchTerm) > -1;
        const hasContentMatch = item.content?.toLowerCase()
            .indexOf(searchTerm) > -1;

        return hasTitleMatch || hasContentMatch;
    });

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

    const selectedItem = filteredItems[selectedIndex];

    return <ItemsContext.Provider value={{
        items,
        setItems,
        isMainInputFocused,
        setIsMainInputFocused,
        inputVal,
        setInputVal,
        selectedIndex,
        setSelectedIndex,
        updateQueue,
        setUpdateQueue,

        fetchItems,
        filteredItems,
        selectedItem,
    }}>
        {children}
    </ItemsContext.Provider>
}