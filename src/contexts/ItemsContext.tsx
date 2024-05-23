import { ReactNode, SetStateAction, createContext, useContext, useEffect, useState } from 'react';
import { DbTable, Item, ItemCollection, ItemType } from '@/types';
import { BackendClientContext } from '@/contexts/BackendClientContext';
import { findIndexById } from '@/utils/itemUtils';
import useManageListState from '@/libs/useManageListState';
import { FILTER_SYNTAX_INCOMPLETE_TODOS, FILTER_SYNTAX_LINKS, FILTER_SYNTAX_NOTES, FILTER_SYNTAX_TODOS } from '@/utils/constants';

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

    const fetchItems = async (
        currCollection: ItemCollection | undefined,
        setLoadingState?: React.Dispatch<React.SetStateAction<boolean>>,
    ) => {
        if (!currCollection) return;
        setLoadingState?.(true);

        const normalItemsFetchOptions = {
            // Single relation can be used without specifying the id
            filter: `collection="${currCollection?.id}" && isTrashed=false`,
            sort: "-created",
            requestKey: "fetch-items",
        }

        const trashedItemsFetchOptions = {
            // Single relation can be used without specifying the id
            filter: `isTrashed=true`,
            sort: "-trashedDateTime",
            requestKey: "fetch-trashed-items",
        }

        const fetchOptionsToUse = currCollection.isTrashBin
            ? trashedItemsFetchOptions
            : normalItemsFetchOptions;

        await pbClient
            .cancelRequest("fetch-items")
            .collection(DbTable.ITEMS)
            .getFullList(fetchOptionsToUse)
            .then((records: Item[]) => {
                setItems(records);
            })
            .catch(err => {
                if (!err.isAbort) {
                    console.error(err);
                }
            })

        setLoadingState?.(false);
    };

    const filteredItems = items.filter(item => {

        const searchTerm = inputVal.toLocaleLowerCase();

        switch (searchTerm) {

        case FILTER_SYNTAX_NOTES:
            return item.type === ItemType.TEXT;
        
        case FILTER_SYNTAX_LINKS:
            return item.type === ItemType.LINK;

        case FILTER_SYNTAX_TODOS:
            return item.type === ItemType.TODO;

        case FILTER_SYNTAX_INCOMPLETE_TODOS:
            return item.type === ItemType.TODO
                && !item.isTodoDone;

        default:
            const hasTitleMatch = item.title?.toLowerCase()
                .indexOf(searchTerm) > -1;
            const hasContentMatch = item.content?.toLowerCase()
                .indexOf(searchTerm) > -1;

            return hasTitleMatch || hasContentMatch;
        }
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