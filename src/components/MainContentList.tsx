import { Item } from "@/types";
import ItemSkeleton from "./itemComponent/ItemSkeleton";
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

    return isLoading
        ? skeletonList
        : displayedItemList;
};
