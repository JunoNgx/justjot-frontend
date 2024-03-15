// import { Item, ItemCollection } from "../types"
import { BackendClientContext } from "../contexts/BackendClientContext";
import { useContext } from "react";

export default function useCollectionMenuActions() {
    const { collections, setCurrCollection } = useContext(BackendClientContext);

    const switchToCollectionById = (collectionId: string) => {
        const index = collections?.map(c => c.id)
            .indexOf(collectionId);

        if (index === -1) return;

        const targetCollection = collections?.[index!];
        setCurrCollection(targetCollection);
    };

    const switchToCollectionBySlug = (collectionSlug: string) => {
        const index = collections?.map(c => c.slug)
            .indexOf(collectionSlug);

        if (index === -1) return;

        const targetCollection = collections?.[index!];
        setCurrCollection(targetCollection);
    };

    const switchToCollectionByNumberKey = (inputNumber: number) => {
        let transcribedIndex;

        if (inputNumber < 0 || 9 > inputNumber) return;
        else if (inputNumber = 0) transcribedIndex = 9;
        else transcribedIndex = inputNumber - 1;

        const targetCollection = collections?.[transcribedIndex];
        setCurrCollection(targetCollection);
    };

    return {
        switchToCollectionById,
        switchToCollectionBySlug,
        switchToCollectionByNumberKey,
    }
};
