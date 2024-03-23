import { isElementInViewport } from "@/utils/miscUtils";
import { clamp } from "@mantine/hooks";
import { createContext, useRef } from "react";

export const MainViewContext = createContext({
    focusOnMainInput: (_mainInputRef: React.RefObject<HTMLInputElement>) => {},
    selectItem: (_index: number) => {},
    deselectItem: () => {},
    selectNextItem: () => {},
    selectPrevItem: () => {},
    execPrimaryAction: () => {},
})

export default function MainViewContextProvider(
    {children}: {children: React.ReactNode}
) {
    const selectedIndex = useRef(-1);

    const focusOnMainInput = (mainInputRef: React.RefObject<HTMLInputElement>) => {
        mainInputRef.current?.focus();
    }

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

    return <MainViewContext.Provider value={{
        focusOnMainInput,
        selectItem,
        deselectItem,
        selectNextItem,
        selectPrevItem,
        execPrimaryAction,
    }}>
        {children}
    </MainViewContext.Provider>
}