import { ItemCollection } from "@/types";

export const getCurrHighestCollectionSortOrder = (collections: ItemCollection[]) => {
    if (collections.length === 0) return null;

    const filteredCollectionList = collections.filter(c => !c.isTrashBin);

    const collectionCount = filteredCollectionList?.length;
    const lastNonTrashCollectionIndex = collectionCount - 1;

    return filteredCollectionList[lastNonTrashCollectionIndex].sortOrder;
}
