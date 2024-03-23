import {  Paper, Stack } from "@mantine/core";
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { useListState } from "@mantine/hooks";
import { useContext } from "react";
import { CollectionsContext } from "@/contexts/CollectionsContext";

// type CollectionsSortModalParam = {
//     collectionList: ItemCollection[] | undefined
// };

// type DraggableCollection = ItemCollection & {
//     index: number
// };

// type DraggableCollectionEvent = {
//     source: DraggableCollection,
//     destination: DraggableCollection,
// };

// const dummyCollection = [
//     {
//         id: "1",
//         name: "1"
//     },
//     {
//         id: "2",
//         name: "2"
//     },
//     {
//         id: "3",
//         name: "3"
//     },
//     {
//         id: "4",
//         name: "4"
//     },
//     {
//         id: "5",
//         name: "5"
//     },
//     {
//         id: "6",
//         name: "6"
//     },
// ]

export default function CollectionsSortModal() {

    const {collections} = useContext(CollectionsContext);
    // const dummyCollection = collections.map(c => c);
    // const [state, handlers] = useListState(dummyCollection);
    const [state, handlers] = useListState(collections);

    const handleDragEnd = ({destination, source}: DropResult) => {
        console.log(source, destination)
        // if (!destination) return;

        handlers.reorder({
            from: source.index,
            to: destination?.index || 0
        });

        // TODO: calculate new sort order
        // TODO: updateSortOrder
    };

    // <Group className="collections-sort-modal__row-container">
    // </Group>
    //                     <CollectionHotkey index={index}/>


    const draggableItemList = (
        state.map((collection, index) => <Draggable
                key={collection.id}
                index={index}
                draggableId={collection.id}
            >
                {(provided, _snapshot) =>
                    <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                    >
                        <Paper withBorder m="sm" p="sm">{collection.name}</Paper>

                    </div>
                }
                
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