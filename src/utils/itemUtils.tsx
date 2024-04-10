import { Item, ItemAction, ItemType } from "@/types";
// import { isDatetimeMoreThanOneYearOld } from "./misc";
// import { DateTime } from "luxon";

// export const calculatePriText = (item: Item): string => {
//     const isTodoItem = item.type === ItemType.TODO;
//     return isTodoItem
//         ? item.content
//         : item.title;
// };

export const isValidHexColourCode = (str: string): boolean => {
    const hexColourCodeRegEx = /(^#[A-Fa-f0-9]{6}$)/;
    return hexColourCodeRegEx.test(str);
}

export const findIndexById = (id: string, itemList: Item[]) => {
    return itemList.findIndex(item => item.id === id);
};

export const canToggleItemShouldCopyOnClick = (item: Item) => {
    return item.type === ItemType.TEXT
        || item.type === ItemType.LINK;
}

export const canRefetchItem = (item: Item) => {
    return item.type === ItemType.LINK;
};

export const canConvertItemToTodo = (item: Item) => {
    return !item.title
        && item.content
        && item.type === ItemType.TEXT;
}

export const computeItemActionString = (
    itemAction: ItemAction
): string => {
    switch(itemAction) {
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
}



// export const calculateDatetimeStr = (item: Item): string => {
//     const datetimeDataToUse = item.updated || item.created;
//     const dateTimeInstance = new Date(datetimeDataToUse);

//     const isMoreThanAYear = isDatetimeMoreThanOneYearOld(dateTimeInstance);
//     const formatOptions: Intl.DateTimeFormatOptions = {
//         day: "numeric",
//         month: "short",
//         year: isMoreThanAYear
//             ? "2-digit"
//             : undefined,
//     };

//     return Intl.DateTimeFormat("en-US", formatOptions)
//         .format(dateTimeInstance);
// };

// type ItemDatetimeProcessOutput = {
//     relativeDatetime: string | null,
//     fullDatetime: string,
// }

// export const processDatetime =(item: Item): ItemDatetimeProcessOutput  => {
//     const datetimeDataToUse = item.updated || item.created;
//     // Luxon can't parse this for some reason
//     const itemDatetime = DateTime.fromJSDate(new Date(datetimeDataToUse));
    
//     const relativeDatetime = itemDatetime.toRelative();
//     const fullDatetime = itemDatetime.toLocaleString(DateTime.DATETIME_FULL);

//     return { relativeDatetime, fullDatetime };
// }