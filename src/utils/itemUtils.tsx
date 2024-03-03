import { Item, ItemType } from "../types";
import { isDatetimeMoreThanOneYearOld } from "./misc";

export const calculatePriText = (item: Item): string => {
    const isTodoItem = item.type === ItemType.TODO;
    return isTodoItem
        ? item.content
        : item.title;
};

export const calculateDatetimeStr = (item: Item): string => {
    const datetimeDataToUse = item.updated || item.created;
    const dateTimeInstance = new Date(datetimeDataToUse);

    const isMoreThanAYear = isDatetimeMoreThanOneYearOld(dateTimeInstance);
    const formatOptions: Intl.DateTimeFormatOptions = {
        day: "numeric",
        month: "short",
        year: isMoreThanAYear
            ? "2-digit"
            : undefined,
    };

    return Intl.DateTimeFormat("en-US", formatOptions)
        .format(dateTimeInstance);
};