import { ItemCollection } from "@/types";

export const getCurrHighestCollectionSortOrder = (collections: ItemCollection[]) => {
    if (collections.length === 0) return null;

    const collectionCount = collections?.length;
    const lastCollectionIndex = collectionCount - 1;

    return collections[lastCollectionIndex].sortOrder;
}
