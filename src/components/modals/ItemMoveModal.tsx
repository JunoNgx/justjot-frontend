import { useContext } from "react";
import { Box, Button, Group, Loader, Stack } from "@mantine/core";
import { modals } from "@mantine/modals";
import { Item, ItemCollection } from "@/types";

import useMoveItem from "@/hooks/apiCalls/useMoveItem";
import { notifications } from "@mantine/notifications";
import { AUTO_CLOSE_DEFAULT } from "@/utils/constants";
import CollectionHotkey from "@/components//misc/CollectionHotkey";
import { ItemsContext } from "@/contexts/ItemsContext";
import { CurrentCollectionContext } from "@/contexts/CurrentCollectionContext";

type ItemMoveModal = {
    item: Item,
    collectionList: ItemCollection[]
};

export default function ItemMoveModal({ item, collectionList}: ItemMoveModal) {

    const { fetchItems } = useContext(ItemsContext);
    const { currCollection } = useContext(CurrentCollectionContext);

    const [moveItemToCollection, isLoading] = useMoveItem({
        successfulCallback: () =>{
            modals.closeAll();
            fetchItems(currCollection);
            notifications.show({
                message: "Item moved",
                color: "none",
                autoClose: AUTO_CLOSE_DEFAULT,
                withCloseButton: true,
            });
        }
    });

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

        {isLoading && <Group justify="flex-end">
            <Loader type="bars"/>
        </Group>}
    </Stack>
};