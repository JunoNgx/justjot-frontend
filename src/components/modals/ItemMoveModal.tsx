import { useContext, useState } from "react";
import { Box, Button, Group, Loader, Stack } from "@mantine/core";
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

type ItemMoveModal = {
    item: Item,
    collectionList: ItemCollection[]
};

export default function ItemMoveModal({ item, collectionList}: ItemMoveModal) {

    const { items, setItems } = useContext(ItemsContext);
    const itemsHandlers = useManageListState(setItems);
    const { moveItem } = useItemApiCalls();

    const [ isLoading, setIsLoading ] = useState(false);

    const moveItemToCollection = (
        { itemId, collectionId }: { itemId: string, collectionId: string }
    ) => {
        setIsLoading(true);
        moveItem({
            itemId,
            collectionId,
            // TODO: Figure out why this line breaks things
            // setLoadingState: setIsLoading,
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

        setIsLoading(false);
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

    return <Stack className="item-move-modal"
        p="lg"
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
};