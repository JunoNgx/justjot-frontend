import { clamp } from "@mantine/hooks";
import { SetStateAction, createContext, useContext, useState } from "react";
import { ItemsContext } from "./ItemsContext";

interface MainViewContextType {
    inputVal: string,
    setInputVal: React.Dispatch<SetStateAction<string>>,
    selectedIndex: number,
    setSelectedIndex: React.Dispatch<SetStateAction<number>>,
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
};

export const MainViewContext = createContext<MainViewContextType>({} as MainViewContextType);

export default function MainViewContextProvider(
    {children}: {children: React.ReactNode}
) {
    const { items } = useContext(ItemsContext);
    const [inputVal, setInputVal] = useState("");
    const [selectedIndex, setSelectedIndex] = useState(-1);

    const focusOnMainInput = (mainInputRef: React.RefObject<HTMLInputElement>) => {
        mainInputRef.current?.focus();
    }

    const blurMainInput = () => {
        const mainInputEl = document.querySelector<HTMLInputElement>("#main-input");
        mainInputEl?.blur();
        setSelectedIndex(-1);
    };

    const selectItem = (index: number) => {
        const clampedIndex = clamp(index, 0, items.length - 1);
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
        selectItem(items.length - 1);
    }

    return <MainViewContext.Provider value={{
        inputVal,
        setInputVal,
        selectedIndex,
        setSelectedIndex,
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
    }}>
        {children}
    </MainViewContext.Provider>
}