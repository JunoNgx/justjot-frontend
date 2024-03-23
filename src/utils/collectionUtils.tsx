import { ItemCollection } from "@/types";

export const getCurrHighestCollectionSortOrder = (collections: ItemCollection[] | undefined) => {
    if (!collections) return null;

    const collectionCount = collections?.length;
    const lastCollectionIndex = collectionCount - 1;

    return collections[lastCollectionIndex].sortOrder;
}
