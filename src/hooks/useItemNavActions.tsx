import { ItemsContext } from "@/contexts/ItemsContext";
import { isElementInViewport } from "@/utils/miscUtils";
import { clamp } from "@mantine/hooks";
import { useContext, useEffect } from "react";

export default function useItemNavActions() {
    const {
        selectedIndex,
        setSelectedIndex,
        filteredItems,
    } = useContext(ItemsContext);

    useEffect(() => {
        const selectedItemEl = getSelectedItemElement();
        if (!selectedItemEl) return;
        if (!isElementInViewport(selectedItemEl)) {
            selectedItemEl?.scrollIntoView({block: "end"});
        }
    }, [selectedIndex]);

    const getSelectedItemElement = () => {
        return document.querySelector<HTMLElement>(
            "#displayed-list .item--is-selected");
    };

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
        getSelectedItemElement()?.click();
    }

    const scrollToTop = () => {
        window.scrollTo(0, 0);
        selectItem(0);
    }

    const scrollToBottom = () => {
        window.scrollTo(0, document.body.scrollHeight);
        selectItem(filteredItems.length - 1);
    }

    return {
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
    };
};