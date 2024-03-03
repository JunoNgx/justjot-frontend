import { Item, ItemType } from "../types";

export const calculatePriText = (item: Item): string => {
    const isTodoItem = item.type === ItemType.TODO;
    return isTodoItem
        ? item.content
        : item.title;
};

export const calculateDatetimeStr = (item: Item): string => {
    const datetimeDataToUse = item.updated || item.created;
    const dateTimeInstance = new Date(datetimeDataToUse);
    const formatOptions: Intl.DateTimeFormatOptions = {
        day: "numeric",
        month: "short",
        year: "2-digit",
    };
    // TODO; const isMoreThanOneYear
    return Intl.DateTimeFormat("en-US", formatOptions)
        .format(dateTimeInstance);
};