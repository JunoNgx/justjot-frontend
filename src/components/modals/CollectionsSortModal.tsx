import {  Paper, Stack } from "@mantine/core";
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { useListState } from "@mantine/hooks";
import { useContext } from "react";
import { CollectionsContext } from "@/contexts/CollectionsContext";

export default function CollectionsSortModal() {

    const {collections} = useContext(CollectionsContext);
    const [state, handlers] = useListState(collections);

    const handleDragEnd = ({destination, source}: DropResult) => {
        handlers.reorder({
            from: source.index,
            to: destination?.index || 0
        });

        if (!destination?.index) return;

        if (source.index === destination.index) {
            console.log("not changed");
            return;
        }

        if (destination.index === 0) {
            console.log("move to top")
            return;
        }

        if (destination.index === collections?.length! - 1) {
            console.log("move to bottom")
            return;
        }

        // TODO: calculate new sort order
        // TODO: updateSortOrder
    };

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