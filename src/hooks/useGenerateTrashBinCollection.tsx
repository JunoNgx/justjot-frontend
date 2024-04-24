import { User } from "@/types";

export default function useGenerateTrashBinCollection(user: User) {
    return {
        id: `${user?.username}-trash-bin`,
        owner: `${user?.id}`,
        name: "Trash bin",
        slug: "trash",
        sortOrder: 0,
        created: "",
        updated: "",
        isTrashBin: true,
    }
};
