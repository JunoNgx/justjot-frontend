import { useContext, useState } from "react";
import { Box, Button, FocusTrap, Group, Loader, Stack } from "@mantine/core";
import { modals } from "@mantine/modals";
import { Item, ItemCollection } from "@/types";

import { notifications } from "@mantine/notifications";
import { AUTO_CLOSE_DEFAULT, AUTO_CLOSE_ERROR_TOAST } from "@/utils/constants";
import CollectionHotkey from "@/components//misc/CollectionHotkey";
import { ItemsContext } from "@/contexts/ItemsContext";
import useItemApiCalls from "@/hooks/useItemApiCalls";
import { ClientResponseError } from "pocketbase";
import { findIndexById } from "@/utils/itemUtils";
import useManageListState from "@/libs/useManageListState";
import { getHotkeyHandler } from "@mantine/hooks";
import useNumericHotkeyUtils from "@/hooks/useNumericHotkeyUtils";
import { CurrentCollectionContext } from "@/contexts/CurrentCollectionContext";

type ItemMoveModal = {
    item: Item,
    collectionList: ItemCollection[]
};

export default function ItemMoveModal({ item, collectionList}: ItemMoveModal) {

    const { currCollection } = useContext(CurrentCollectionContext);
    const { items, setItems } = useContext(ItemsContext);
    const itemsHandlers = useManageListState(setItems);
    const { moveItem } = useItemApiCalls();
    const {
        computeIndexFromNumericKey,
        generateNumericHotkeyHandlers,
    } = useNumericHotkeyUtils();

    const [ isLoading, setIsLoading ] = useState(false);
    const moveItemToCollectionByNumericKey = (inputNumber: number) => {
        const targetIndex = computeIndexFromNumericKey(inputNumber);
        if (targetIndex === -1) return;

        const targetCollection = collectionList[targetIndex];
        if (!targetCollection) return;

        if (targetCollection.id === currCollection?.id) return;

        moveItemToCollection({
            itemId: item.id,
            collectionId: targetCollection.id
        });
    };
    const numericKeysHotkeyOptions = generateNumericHotkeyHandlers({
        callback: moveItemToCollectionByNumericKey,
        preventDefault: true,
    });

    const moveItemToCollection = (
        { itemId, collectionId }: { itemId: string, collectionId: string }
    ) => {
        moveItem({
            itemId,
            collectionId,
            setLoadingState: setIsLoading,
            successfulCallback: handleSuccessfulMove,
            errorCallback: handleErroredMove
        });
    };

    const handleSuccessfulMove = (record: Item) => {
        const index = findIndexById(record.id, items);
        if (index === -1) return;

        itemsHandlers.remove(index);
        notifications.show({
            message: "Item moved successfully",
            color: "none",
            autoClose: AUTO_CLOSE_DEFAULT,
            withCloseButton: true,
        });

        modals.closeAll();
    };

    const handleErroredMove = (err: ClientResponseError) => {
        setIsLoading(true);

        console.error(err);
        notifications.show({
            message: "Error moving item",
            color: "red",
            autoClose: AUTO_CLOSE_ERROR_TOAST,
            withCloseButton: true,
        });
    };

    return <FocusTrap> 
        <Stack className="item-move-modal"
            p="lg"
            /**
             * Use this as initial focused element, so the numeric hotkeys
             * can work for keyboard users.
             */
            data-autofocus={true} 
            onKeyDown={getHotkeyHandler([...numericKeysHotkeyOptions])}
        >
            {collectionList?.map((collection, index) => <Group
                key={index}
                justify="center"
            >
                <Button className="item-move-modal__move-btn"
                    w="70%"
                    onClick={() => moveItemToCollection({
                        itemId: item.id, collectionId: collection.id})
                    }
                    disabled={isLoading || item?.collection === collection.id}
                >
                    {collection.name}    
                </Button>

                <Box className="item-move-modal__collection-hotkey">
                    <CollectionHotkey index={index}/>
                </Box>
            </Group>)}

            {isLoading && <Group mt="md" justify="center">
                <Loader type="bars"/>
            </Group>}
        </Stack>
    </FocusTrap>  
};