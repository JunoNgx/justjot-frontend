// import styled from 'styled-components';

import { Item, ItemType } from "../types";

export default function ItemComponent({ item }: { item: Item }) {

    // return <div>
    //     title: {item.title} | content: {item.content} | type: {item.type}
    // </div>

    const isTodoItem = item.type === ItemType.TODO;

    const calculatePriText = (): string => {
        return isTodoItem
            ? item.content
            : item.title;
    };

    const calculateDatetimeStr = (): string => {
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

    return <div className="item">
        <div className="item__left-side">
            <div className="item__icon">icon</div>
            <div className="item__primary-text">{calculatePriText()}</div>
            {!isTodoItem &&
                <div className="item__secondary-text">{item.content}</div>}
        </div>
        <div className="item__right-side">
            <div className="item__datetime">{calculateDatetimeStr()}</div>
        </div>
    </div>
};
