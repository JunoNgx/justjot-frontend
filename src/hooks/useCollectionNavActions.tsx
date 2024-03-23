import { useContext } from "react";
import { CollectionsContext } from "@/contexts/CollectionsContext";
import { CurrentCollectionContext } from "@/contexts/CurrentCollectionContext";

export default function useCollectionMenuActions() {
    const { collections,  } = useContext(CollectionsContext);
    const { setCurrCollection } = useContext(CurrentCollectionContext);

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

    const switchToCollectionByNumricKey = (inputNumber: number) => {
        let transcribedIndex;
        if (inputNumber < 0 || inputNumber > 9) return;
        else if (inputNumber === 0) transcribedIndex = 9;
        else transcribedIndex = inputNumber - 1;

        const targetCollection = collections?.[transcribedIndex];
        if (!targetCollection) return;
        setCurrCollection(targetCollection);
    };

    return {
        switchToCollectionById,
        switchToCollectionBySlug,
        switchToCollectionByNumricKey,
    }
};