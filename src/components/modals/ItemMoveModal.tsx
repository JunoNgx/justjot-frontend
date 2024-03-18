import { Button, Group, Loader, Stack } from "@mantine/core";
import { Item, ItemCollection } from "../../types";
import { useContext } from "react";
import useMoveItem from "../../hooks/useMoveItem";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { AUTO_CLOSE_DEFAULT, AUTO_CLOSE_ERROR_TOAST } from "../../utils/constants";
import CollectionHotkey from "../CollectionHotkey";
import { ItemsContext } from "../../contexts/ItemsContext";
import { CurrentCollectionContext } from "../../contexts/CurrentCollectionContext";

type ItemMoveModalOptions = {
    item: Item | undefined,
    collectionList: ItemCollection[] | undefined
};

export default function ItemMoveModal({ item, collectionList}: ItemMoveModalOptions) {

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

    const moveItem = (itemId?: string, collectionId?: string) => {
        if (!itemId || !collectionId) {
            notifications.show({
                message: "Requested moving item, but received missing data",
                color: "red",
                autoClose: AUTO_CLOSE_ERROR_TOAST,
                withCloseButton: true,
            });
            return;
        }

        moveItemToCollection({itemId, collectionId});
    };

    return <Stack className="item-update-modal"
        p="lg"
    >
        {collectionList?.map((collection, index) => <Group
            justify="space-between"
            // pl="xl" pr="xl"
        >
            <Button
                w="70%"
                // variant="outline"
                onClick={() => moveItem(item?.id, collection.id)}
                disabled={isLoading || item?.collection === collection.id}
            >
                {/* {item?.collection === collection.id && <Text>[Current]</Text>} */}
                {collection.name}    
            </Button>

            <CollectionHotkey index={index}/>
        </Group>)}

        {isLoading && <Group justify="flex-end">
            <Loader type="bars"/>
        </Group>}
    </Stack>
};