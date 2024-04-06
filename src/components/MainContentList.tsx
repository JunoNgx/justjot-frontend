import { Item } from "@/types";
import ItemSkeleton from "./itemComponent/ItemSkeleton";
import { Text } from "@mantine/core";
import ItemComponent from "./itemComponent/ItemComponent";

export default function MainContentList(
    { isLoading, filteredItems }:
    { isLoading: boolean, filteredItems: Item[] }
) {

    const skeletonList = Array(7).fill(null).map((_, index) => 
        <ItemSkeleton key={index}/>
    );

    const displayedItemList = filteredItems.map((item, index) =>
        <ItemComponent
            key={item.id}
            item={item}
            index={index}
        />
    );

    const emptyNotice = <Text ta="center" mt="xl">
        There is nothing to display.
    </Text>

    const loadedContent = displayedItemList.length
        ? displayedItemList
        : emptyNotice;

    return isLoading
        ? skeletonList
        : loadedContent;
};
