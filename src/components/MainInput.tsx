import { forwardRef, useContext, useState } from "react";
import { Input, InputProps, Loader } from "@mantine/core";
import { getHotkeyHandler } from "@mantine/hooks";
import { IconCircleTriangle } from "@tabler/icons-react";

import { justJotTheme } from "@/theme";
import useCreateItem from "@/hooks/apiCalls/useCreateItem";
import { ItemsContext } from "@/contexts/ItemsContext";
import { CurrentCollectionContext } from "@/contexts/CurrentCollectionContext";
import { MainViewContext } from "@/contexts/MainViewContext";
import useItemContextMenuActions from "@/hooks/useItemContextMenuActions";
import { CollectionsContext } from "@/contexts/CollectionsContext";
import { ItemType } from "@/types";
import { isValidIndex } from "@/utils/miscUtils";

const MainInput = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
    const { collections } = useContext(CollectionsContext);
    const { currCollection } = useContext(CurrentCollectionContext);
    const { items } = useContext(ItemsContext);
    const { fetchItems } = useContext(ItemsContext);
    const {
        selectedIndex,
        selectItem,
        deselectItem,
        selectPrevItem,
        selectNextItem,
        execPrimaryAction,
        blurMainInput,
        scrollToTop,
        scrollToBottom,
    } = useContext(MainViewContext);
    const {
        copyItemContent,
        openUpdateItemModal,
        deleteItemWithManipulation,
        openMoveItemModal,
        refetchTitleAndFavicon,
        toggleItemShouldCopyOnClick,
    } = useItemContextMenuActions();

    const [inputVal, setInputVal] = useState("");
    const [_createItem, createItemWithManipulation, isCreateItemLoading] = useCreateItem({
        successfulCallback: () => {
            fetchItems(currCollection);
        }
    });

    const handleEnter = () => {
        if (!inputVal) return;
        setInputVal("");
        createItemWithManipulation({ content: inputVal });
    };

    const getItemByIndex = (index: number) => {
        if (!items) return null;
        const targetItem = items[index];
        return targetItem;
    };

    const hotkeyCopyContent = () => {
        if (!isValidIndex(selectedIndex?.current)) return;
        const item = getItemByIndex(selectedIndex!.current);
        if (!item) return;
        copyItemContent(item);
    }

    const hotkeyOpenUpdateItemModal = () => {
        if (!isValidIndex(selectedIndex?.current)) return;
        const item = getItemByIndex(selectedIndex!.current);
        if (!item) return;
        openUpdateItemModal(item);
    }

    const hotkeyOpenMoveItemModal = () => {
        if (!isValidIndex(selectedIndex?.current)) return;
        const item = getItemByIndex(selectedIndex!.current);
        if (!item) return;
        openMoveItemModal({item, collectionList: collections});
    }

    const hotkeyDeleteItem = () => {
        if (!isValidIndex(selectedIndex?.current)) return;
        const item = getItemByIndex(selectedIndex!.current);
        if (!item) return;

        if (selectedIndex!.current === 0)
            deselectItem();
        else
            selectItem(selectedIndex!.current - 1);

        deleteItemWithManipulation(item);
    }

    const hotkeyRefetchTitleAndFavicon = () => {
        if (!isValidIndex(selectedIndex?.current)) return;
        const item = getItemByIndex(selectedIndex!.current);
        if (!item) return;
        if (item.type !== ItemType.LINK) return;
        refetchTitleAndFavicon(item);
    }

    const hotkeytoggleItemShouldCopyOnClick = () => {
        if (!isValidIndex(selectedIndex?.current)) return;
        const item = getItemByIndex(selectedIndex!.current);
        if (!item) return;
        toggleItemShouldCopyOnClick(item);
    }

    return <Input id="main-input" className="main-view__input"
        ref={ref}
        {...props}
        size="lg"
        leftSection={<IconCircleTriangle
            size={32}
            stroke={justJotTheme.other.iconStrokeWidth}
        />}
        rightSectionPointerEvents="all"
        rightSection={
            isCreateItemLoading && <Loader size="xs"/>
        }
        type="text"
        value={inputVal}
        onChange={(event) => setInputVal(event.currentTarget.value)}
        onKeyDown={getHotkeyHandler([
            ["ArrowUp", selectPrevItem],
            ["ArrowDown", selectNextItem],
            ["Enter", handleEnter],
            ["mod+Enter", execPrimaryAction],
            ["Escape", blurMainInput],
            ["Home", scrollToTop],
            ["End", scrollToBottom],
            ["mod+C", hotkeyCopyContent],
            ["mod+E", hotkeyOpenUpdateItemModal],
            ["mod+M", hotkeyOpenMoveItemModal],
            ["mod+Backspace", hotkeyDeleteItem],
            ["mod+shift+Q", hotkeyRefetchTitleAndFavicon],
            ["mod+shift+O", hotkeytoggleItemShouldCopyOnClick],
        ])}
    />
});

export default MainInput;