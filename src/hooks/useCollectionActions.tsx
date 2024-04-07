import CollectionCreateUpdateModal from "@/components/modals/CollectionCreateUpdateModal";
import CollectionsSortModal from "@/components/modals/CollectionsSortModal";
import { modals } from "@mantine/modals";

export default function useCollectionActions() {
    const openCreateCollectionModal = () => {
        modals.open({
            centered: true,
            title: "Create New Collection",
            children: (<CollectionCreateUpdateModal isEditMode={false}/>)
        });
    };

    const openUpdateCollectionModal = () => {
        modals.open({
            centered: true,
            title: "Edit Collection",
            children: (<CollectionCreateUpdateModal isEditMode={true}/>)
        });
    };

    const openSortCollectionModal = () => {
         modals.open({
            size: "35rem",
            centered: true,
            title: "Sort Collections",
            children: <CollectionsSortModal/>
        });
    };

    return {
        openCreateCollectionModal,
        openUpdateCollectionModal,
        openSortCollectionModal,
    };
};