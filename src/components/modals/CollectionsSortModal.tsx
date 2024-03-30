import { Center, Group, Paper, Text } from "@mantine/core";
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { useListState } from "@mantine/hooks";
import { useContext, useEffect, useRef } from "react";
import { CollectionsContext } from "@/contexts/CollectionsContext";
import { COLLECTION_SORT_ORDER_MAG } from "@/utils/constants";
import useUpdateCollection from "@/hooks/apiCalls/useUpdateCollection";
import { ItemCollection } from "@/types";
import CollectionHotkey from "../misc/CollectionHotkey";
import { isValidIndex } from "@/utils/miscUtils";

export default function CollectionsSortModal() {

    const { collections, fetchCollections } = useContext(CollectionsContext);
    const [state, handlers] = useListState(collections);
    const [_, updateCollectionSortOrder] = useUpdateCollection();
    const hasChanged = useRef(false);

    useEffect(() => {
        return () => {
            if (hasChanged.current) {
                fetchCollections();
            }
        };
    }, []);

    const handleDragEnd = ({ destination, source }: DropResult) => {
        handlers.reorder({
            from: source.index,
            to: destination?.index || 0
        });

        if (collections.length === 0) return;
        if (!isValidIndex(destination?.index)) return;

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
        handlers.setItem(
            newIndex,
            { ...movedCollection, sortOrder: newSortOrderValue }
        );
        updateCollectionSortOrder({
            collectionId: movedCollection.id, newSortOrderValue
        });
        hasChanged.current = true;
    }

    const draggableItemList = (
        state.map((collection, index) => <Draggable
            key={collection.id}
            index={index}
            draggableId={collection.id}
        >
            {(provided, _snapshot) => {
                if (_snapshot.isDragging) {
                    // Hackfix: https://github.com/atlassian/react-beautiful-dnd/issues/1881
                    // @ts-expect-error
                    provided.draggableProps.style.left = provided.draggableProps.style.offsetLeft;
                    // @ts-expect-error
                    provided.draggableProps.style.top = provided.draggableProps.style.offsetTop;
                }

                return <div className="collections-sort-modal__collection-item"
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    <Paper withBorder m="xs" p="xs">
                        {/* <Center> */}
                            <Group
                                justify="space-between"
                            >
                                <Text>{collection.name} (value: {collection.sortOrder})</Text>
                                <CollectionHotkey index={index}/>
                            </Group>
                        {/* </Center> */}
                    </Paper>

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
        <div className="collections-sort-modal"
        >
            <Center>
                <div className="collections-sort-modal__left-side"
                >
                    {draggableArea}
                </div>
            </Center>
            {/* <div className="collections-sort-modal__right-side"
            >
                {collections?.map((_, index) =>
                    <div className="collections-sort-modal__number-item">
                        <CollectionHotkey index={index}/>
                    </div>
                )}
            </div> */}
        </div>
    )
}