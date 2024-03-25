import { isElementInViewport } from "@/utils/miscUtils";
import { clamp } from "@mantine/hooks";
import { createContext, useRef } from "react";

interface MainViewContextType {
    selectedIndex: React.MutableRefObject<number> | null,
    focusOnMainInput: (_mainInputRef: React.RefObject<HTMLInputElement>) => void,
    blurMainInput: () => void,
    selectItem: (_index: number) => void,
    deselectItem: () => void,
    selectNextItem: () => void,
    selectPrevItem: () => void,
    execPrimaryAction: () => void,
    scrollToTop: () => void,
};

export const MainViewContext = createContext<MainViewContextType>({
    selectedIndex: null,
    focusOnMainInput: (_mainInputRef: React.RefObject<HTMLInputElement>) => {},
    blurMainInput: () => {},
    selectItem: (_index: number) => {},
    deselectItem: () => {},
    selectNextItem: () => {},
    selectPrevItem: () => {},
    execPrimaryAction: () => {},
    scrollToTop: () => {},
});

export default function MainViewContextProvider(
    {children}: {children: React.ReactNode}
) {
    const selectedIndex = useRef(-1);

    const focusOnMainInput = (mainInputRef: React.RefObject<HTMLInputElement>) => {
        mainInputRef.current?.focus();
    }

    const blurMainInput = () => {
        const mainInputEl = document.querySelector<HTMLInputElement>("#main-input");
        mainInputEl?.blur();
    };

    const selectItem = (index: number) => {
        const itemListWrapper = document.querySelector(`#displayed-list`);
        const itemList = itemListWrapper?.querySelectorAll<HTMLBaseElement>("[data-is-item]") ?? [];
        const newSelectedIndex = clamp(index, 0, itemList.length - 1);

        const oldSelectedItem = itemListWrapper?.querySelector<HTMLBaseElement>("[data-is-selected]");
        oldSelectedItem?.removeAttribute("data-is-selected");

        const newSelectedItem = itemList[newSelectedIndex];
        if (!isElementInViewport(newSelectedItem)) {
            newSelectedItem.scrollIntoView({block: "end"});
        }
        newSelectedItem.setAttribute("data-is-selected", "true");

        selectedIndex.current = newSelectedIndex;
    }

    const deselectItem = () => {
        const itemListWrapper = document.querySelector("#displayed-list");
        const currSelectedItem = itemListWrapper?.querySelector<HTMLBaseElement>("[data-is-selected]");
        currSelectedItem?.removeAttribute("data-is-selected");

        selectedIndex.current = -1;
    }

    const selectNextItem = () => {
        selectItem(selectedIndex.current + 1);
    }

    const selectPrevItem = () => {
        selectItem(selectedIndex.current -1);
    }

    const execPrimaryAction = () => {
        const itemListWrapper = document.querySelector("#displayed-list");
        const currSelectedItem = itemListWrapper?.querySelector<HTMLBaseElement>("[data-is-selected]");
        currSelectedItem?.click();
    }

    const scrollToTop = () => {
        window.scrollTo(0, 0);
        selectItem(0);
    }

    return <MainViewContext.Provider value={{
        selectedIndex,
        focusOnMainInput,
        blurMainInput,
        selectItem,
        deselectItem,
        selectNextItem,
        selectPrevItem,
        execPrimaryAction,
        scrollToTop,
    }}>
        {children}
    </MainViewContext.Provider>
}