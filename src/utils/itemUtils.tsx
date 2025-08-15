import { Item, ItemAction, ItemType } from "@/types";

export const isValidHexColourCode = (str: string): boolean => {
    const hexColourCodeRegEx = /(^#[A-Fa-f0-9]{6}$)/;
    return hexColourCodeRegEx.test(str);
};

export const findIndexById = (id: string, itemList: Item[]) => {
    return itemList.findIndex((item) => item.id === id);
};

export const canToggleItemShouldCopyOnClick = (item: Item) => {
    return item.type === ItemType.TEXT || item.type === ItemType.LINK;
};

export const canMoveItem = (item: Item) => {
    return !item.isTrashed;
};

export const canRefetchItem = (item: Item) => {
    return item.type === ItemType.LINK;
};

export const canConvertItemToTodo = (item: Item) => {
    return !item.title && item.content && item.type === ItemType.TEXT;
};

export const canTrashItem = (item: Item) => {
    return !item.isTrashed;
};

export const canRestoreItem = (item: Item) => {
    return item.isTrashed;
};

export const canDeleteItem = (item: Item) => {
    return item.isTrashed;
};

export const computeItemActionString = (itemAction: ItemAction): string => {
    switch (itemAction) {
        case ItemAction.COPY:
            return "copy";
        case ItemAction.TOGGLE_IS_DONE:
            return "toggle completed";
        case ItemAction.OPEN_LINK:
            return "open link";
        case ItemAction.EDIT:
        default:
            return "edit";
    }
};
