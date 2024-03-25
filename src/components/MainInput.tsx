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

const MainInput = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
    const { collections } = useContext(CollectionsContext);
    const { currCollection } = useContext(CurrentCollectionContext);
    const { items } = useContext(ItemsContext);
    const { fetchItems } = useContext(ItemsContext);
    const {
        selectedIndex,
        selectItem,
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
        deleteWithManipulation,
        openMoveItemModal,
        refetchTitleAndFavicon,
        switchShouldOpenOnClick,
    } = useItemContextMenuActions();

    const [inputVal, setInputVal] = useState("");
    const [createItem, isCreateItemLoading] = useCreateItem({
        successfulCallback: () => {
            setInputVal("");
            fetchItems(currCollection);
        }
    });

    const handleEnter = () => {
        if (!inputVal) return;
        createItem({ content: inputVal });
    };

    const getItemByIndex = (index: number) => {
        if (!items) return null;
        const targetItem = items[index];
        return targetItem;
    };

    const hotkeyCopyContent = () => {
        if (!selectedIndex?.current) return;
        const item = getItemByIndex(selectedIndex?.current);
        if (!item) return;
        copyItemContent(item);
    }

    const hotkeyOpenUpdateItemModal = () => {
        if (!selectedIndex?.current) return;
        const item = getItemByIndex(selectedIndex?.current);
        if (!item) return;
        openUpdateItemModal(item);
    }

    const hotkeyOpenMoveItemModal = () => {
        if (!selectedIndex?.current) return;
        const item = getItemByIndex(selectedIndex?.current);
        if (!item) return;
        openMoveItemModal({item, collectionList: collections});
    }

    const hotkeyDeleteItem = () => {
        if (!selectedIndex?.current) return;
        const item = getItemByIndex(selectedIndex?.current);
        if (!item) return;

        selectItem(selectedIndex?.current + 1);
        deleteWithManipulation(item);
    }

    const hotkeyRefetchTitleAndFavicon = () => {
        if (!selectedIndex?.current) return;
        const item = getItemByIndex(selectedIndex?.current);
        if (!item) return;
        if (item.type !== ItemType.LINK) return;
        refetchTitleAndFavicon(item);
    }

    const hotkeySwitchShouldOpenOnClick = () => {
        if (!selectedIndex?.current) return;
        const item = getItemByIndex(selectedIndex?.current);
        if (!item) return;
        switchShouldOpenOnClick(item);
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
            ["mod+Delete", hotkeyDeleteItem],
            ["mod+shift+Q", hotkeyRefetchTitleAndFavicon],
            ["mod+shift+O", hotkeySwitchShouldOpenOnClick],
        ])}
    />
});

export default MainInput;