import { clamp } from "@mantine/hooks";
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
    inputVal: string,
    setInputVal: React.Dispatch<SetStateAction<string>>,
    selectedIndex: number,
    setSelectedIndex: React.Dispatch<SetStateAction<number>>,

    fetchItems: (
        currCollection: ItemCollection | undefined,
        setLoadingState?: React.Dispatch<React.SetStateAction<boolean>>,
    )  => void,
    focusOnMainInput: (_mainInputRef: React.RefObject<HTMLInputElement>) => void,
    blurMainInput: () => void,
    selectItem: (_index: number) => void,
    selectNextItem: (_e?: KeyboardEvent, distance?: number) => void,
    selectPrevItem: (_e?: KeyboardEvent, distance?: number) => void,
    selectNextItemFarther: (e: KeyboardEvent) => void,
    selectPrevItemFarther: (e: KeyboardEvent) => void,
    clickOnSelectedItem: () => void,
    scrollToTop: () => void,
    scrollToBottom: () => void,
    filteredItems: Item[],
    updateQueue: UpdateQueueItem[],
    setUpdateQueue: React.Dispatch<SetStateAction<UpdateQueueItem[]>>,
};

export const ItemsContext = createContext<ItemsContextType>(
    {} as ItemsContextType
);

export default function ItemsContextProvider({ children }: { children: ReactNode }) {
    const { pbClient } = useContext(BackendClientContext);
    const [ items, setItems ] = useState<Item[]>([]);
    const [ inputVal, setInputVal ] = useState("");
    const [ selectedIndex, setSelectedIndex ] = useState(-1);
    const [ updateQueue, setUpdateQueue ] = useState<UpdateQueueItem[]>([]);

    const fetchItems = useCallback(async(
        currCollection: ItemCollection | undefined,
        setLoadingState?: React.Dispatch<React.SetStateAction<boolean>>,
    ) => {
        if (!currCollection) return;
        setLoadingState?.(true);

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

    const focusOnMainInput = (mainInputRef: React.RefObject<HTMLInputElement>) => {
        mainInputRef.current?.focus();
    }

    const blurMainInput = () => {
        const mainInputEl = document.querySelector<HTMLInputElement>("#main-input");
        mainInputEl?.blur();
        setSelectedIndex(-1);
    };

    const selectItem = (index: number) => {
        const clampedIndex = clamp(index, 0, filteredItems.length - 1);
        setSelectedIndex(clampedIndex);
    }

    const selectNextItem = (_e?: KeyboardEvent, distance: number = 1) => {
        selectItem(selectedIndex + distance);
    }

    const selectPrevItem = (_e?: KeyboardEvent, distance: number = 1) => {
        selectItem(selectedIndex - distance);
    }

    const selectNextItemFarther = (e: KeyboardEvent) => {
        selectNextItem(e, 5);
    }

    const selectPrevItemFarther = (e: KeyboardEvent) => {
        selectPrevItem(e, 5);
    }

    const clickOnSelectedItem = () => {
        const itemListWrapper = document.querySelector("#displayed-list");
        const currSelectedItem = itemListWrapper?.querySelector<HTMLBaseElement>(".item--is-selected");
        currSelectedItem?.click();
    }

    const scrollToTop = () => {
        window.scrollTo(0, 0);
        selectItem(0);
    }

    const scrollToBottom = () => {
        window.scrollTo(0, document.body.scrollHeight);
        selectItem(filteredItems.length - 1);
    }

    return <ItemsContext.Provider value=
        {{
            items,
            setItems,
            inputVal,
            setInputVal,
            selectedIndex,
            setSelectedIndex,

            fetchItems,
            focusOnMainInput,
            blurMainInput,
            selectItem,
            selectNextItem,
            selectPrevItem,
            selectNextItemFarther,
            selectPrevItemFarther,
            clickOnSelectedItem,
            scrollToTop,
            scrollToBottom,
            filteredItems,
            updateQueue,
            setUpdateQueue,
        }}
    >
        {children}
    </ItemsContext.Provider>
}