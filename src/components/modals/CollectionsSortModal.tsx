import {  Paper, Stack } from "@mantine/core";
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { useListState } from "@mantine/hooks";
import { useContext } from "react";
import { CollectionsContext } from "@/contexts/CollectionsContext";
import { COLLECTION_SORT_ORDER_MAG } from "@/utils/constants";

export default function CollectionsSortModal() {

    const {collections} = useContext(CollectionsContext);
    const [state, handlers] = useListState(collections);

    const handleDragEnd = ({destination, source}: DropResult) => {
        handlers.reorder({
            from: source.index,
            to: destination?.index || 0
        });

        if (!collections) return;

        if (!destination
            || destination.index === null
            || destination.index === undefined
        ) return;

        if (source.index === destination.index) {
            return;
        }

        const sourceCollection = collections[source.index];

        if (destination.index === 0) {
            console.log("move to top", source)
            const firstCollection = collections[0];
            const newSortOrderValue = firstCollection.sortOrder - COLLECTION_SORT_ORDER_MAG;
            processUpdateCollectionSortOrder(
                sourceCollection.id, newSortOrderValue);
            return;
        }

        if (destination.index === collections?.length! - 1) {
            console.log("move to bottom")
            return;
        }

        // TODO: calculate new sort order
        // TODO: updateSortOrder
    };

    const processUpdateCollectionSortOrder = (
        collectionId: string, newSortOrderValue: number
    ) => {
        console.log("processUpdateCollectionSortOrder", collectionId, newSortOrderValue)
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

                    return <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                    >
                        <Paper withBorder m="sm" p="sm">{collection.name}</Paper>

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
        <Stack className="collections-sort-modal" p="xl">
            {draggableArea}
        </Stack>
    )
}