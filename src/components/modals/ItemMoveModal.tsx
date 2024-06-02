import { useContext, useState } from "react";
import { FocusTrap } from "@mantine/core";
import { modals } from "@mantine/modals";
import { Item, ItemCollection } from "@/types";
import { notifications } from "@mantine/notifications";
import { AUTO_CLOSE_ERROR_TOAST } from "@/utils/constants";
import CollectionHotkey from "@/components//misc/CollectionHotkey";
import { ItemsContext } from "@/contexts/ItemsContext";
import useItemApiCalls from "@/hooks/useItemApiCalls";
import { ClientResponseError } from "pocketbase";
import { findIndexById } from "@/utils/itemUtils";
import useManageListState from "@/libs/useManageListState";
import { getHotkeyHandler } from "@mantine/hooks";
import useNumericHotkeyUtils from "@/hooks/useNumericHotkeyUtils";
import { CollectionsContext } from "@/contexts/CollectionsContext";
import ButtonWithLoader from "@/libs/components/ButtonWithLoader";
import Loader from "@/libs/components/Loader";

import "./Modals.scss";

type ItemMoveModal = {
    item: Item,
    collectionList: ItemCollection[]
};

export default function ItemMoveModal({ item, collectionList}: ItemMoveModal) {

    const { currCollection } = useContext(CollectionsContext);
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
        <div className="Modal Modal--Stackbox Modal--ThickPadding"
            /**
             * Use this as initial focused element, so the numeric hotkeys
             * can work for keyboard users.
             */
            data-autofocus={true} 
            onKeyDown={getHotkeyHandler([...numericKeysHotkeyOptions])}
        >
            {collectionList?.map((collection, index) => <div
                className="Modal__MoveItemOption"
                key={index}
            >
                <ButtonWithLoader className="Modal__MoveItemBtn"
                    onClick={() => moveItemToCollection({
                        itemId: item.id, collectionId: collection.id})
                    }
                    isDisabled={isLoading || item?.collection === collection.id}
                >
                    {collection.name}    
                </ButtonWithLoader>

                <div className="Modal__CollectionHotkey">
                    <CollectionHotkey index={index}/>
                </div>
            </div>)}

            {isLoading && <div className="Modal__LoaderContainer">
                <Loader/>
            </div>}
        </div>
    </FocusTrap>  
}