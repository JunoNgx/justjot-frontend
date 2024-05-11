import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { useListState } from "@mantine/hooks";
import { useContext, useEffect, useRef } from "react";
import { CollectionsContext } from "@/contexts/CollectionsContext";
import { AUTO_CLOSE_DEFAULT, AUTO_CLOSE_ERROR_TOAST, COLLECTION_SORT_ORDER_MAG } from "@/utils/constants";
import { ItemCollection } from "@/types";
import useCollectionApiCalls from "@/hooks/useCollectionApiCalls";
import { notifications } from "@mantine/notifications";

export default function CollectionsSortModal() {

    const { collections, fetchCollections } = useContext(CollectionsContext);
    const [state, itemsHandlers] = useListState(collections);
    const { sortCollection } = useCollectionApiCalls();
    const hasChanged = useRef(false);

    useEffect(() => {
        return () => {
            if (hasChanged.current) {
                fetchCollections();
            }
        };
    }, []);

    const handleDragEnd = ({ destination, source }: DropResult) => {
        itemsHandlers.reorder({
            from: source.index,
            to: destination?.index || 0
        });

        if (collections.length === 0) return;
        if (destination?.index === undefined
            || destination?.index === null
            || destination?.index < 0
        ) return;

        if (source.index === destination!.index) {
            return;
        }

        /**
         * This implementation displays outcomme optimistically.
         * All displayed data comes from the immediate manipulated
         * `listState`, not from the actual real changes.
         */

        const movedCollection = state[source.index];

        if (destination!.index === 0) {
            const firstCollection = state[0];
            const newSortOrderValue = firstCollection.sortOrder
                - COLLECTION_SORT_ORDER_MAG;
            processUpdateCollectionSortOrder(
                movedCollection, destination!.index, newSortOrderValue);
            return;
        }

        if (destination!.index === state.length - 1) {
            const lastCollection = state[state.length - 1];
            const newSortOrderValue = lastCollection.sortOrder
                + COLLECTION_SORT_ORDER_MAG;
            processUpdateCollectionSortOrder(
                movedCollection, destination!.index, newSortOrderValue);
            return;
        }

        const prevCollection = state[destination!.index - 1];
        const nextCollection = state[destination!.index];
        const newSortOrderValue = (prevCollection.sortOrder + nextCollection.sortOrder) / 2
        processUpdateCollectionSortOrder(
            movedCollection, destination!.index, newSortOrderValue);
    };

    const processUpdateCollectionSortOrder = async (
        movedCollection: ItemCollection, newIndex: number, newSortOrderValue: number
    ) => {
        itemsHandlers.setItem(
            newIndex,
            { ...movedCollection, sortOrder: newSortOrderValue }
        );
        sortCollection({
            collectionId: movedCollection.id,
            newSortOrderValue,
            successfulCallback: () => {
                notifications.show({
                    message: "Collections sorting updated",
                    color: "none",
                    autoClose: AUTO_CLOSE_DEFAULT,
                    withCloseButton: true,
                });
            },
            errorCallback: () => {
                notifications.show({
                    message: "Error sorting collection",
                    color: "red",
                    autoClose: AUTO_CLOSE_ERROR_TOAST,
                    withCloseButton: true,
                });
            }
        });
        hasChanged.current = true;
    }

    const draggableItemList = (
        state.filter(collection => !collection.isTrashBin)
            .map((collection, index) => <Draggable
                key={collection.id}
                index={index}
                draggableId={collection.id}
            >
                {(provided, _snapshot) => {
                    if (_snapshot.isDragging) {
                        // Hackfix: https://github.com/atlassian/react-beautiful-dnd/issues/1881
                        // @ts-expect-error: Manually fix offset caused by modal positioning
                        provided.draggableProps.style.left = provided.draggableProps.style.offsetLeft;
                        // @ts-expect-error: Manually fix offset caused by modal positioning
                        provided.draggableProps.style.top = provided.draggableProps.style.offsetTop;
                    }

                    return <div className="Modal__CollectionItem"
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                    >
                        <p className="Modal__CollectionName">{collection.name}</p>
                    </div>
                }}

            </Draggable>
        )
    )

    const draggableArea = (
        <DragDropContext
            onDragEnd={handleDragEnd}
        >
            <Droppable
                droppableId="collection-list"
                direction="vertical"
            >
                {provided => (
                    <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >
                        {draggableItemList}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    )

    return (
        <div className="Modal--IsCollectionSort">
            <div className="Modal__SortCollectionList">
                <div className="Modal__LeftSide">
                    {draggableArea}
                </div>
            </div>
        </div>
    )
}