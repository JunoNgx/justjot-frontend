// import styled from 'styled-components';

import { Item, ItemType } from "../types";

export default function ItemComponent({ item }: { item: Item }) {

    // return <div>
    //     title: {item.title} | content: {item.content} | type: {item.type}
    // </div>

    const isTodoItem = item.type === ItemType.TODO;

    const datetimeDataToUse = item.updated || item.created;
    const dateTimeInstance = new Date(datetimeDataToUse);
    const formatOptions: Intl.DateTimeFormatOptions = {
        day: "numeric",
        month: "short",
        year: "2-digit",
    };
    // TODO; const isMoreThanOneYear
    const dateTimeStr = Intl.DateTimeFormat(
        "en-US", formatOptions).format(dateTimeInstance);
    

    return <div className="item">
        <div className="item__left-side">
            <div className="item__icon">icon</div>
            {!isTodoItem && <div className="item__primary-text">{item.title}</div>}
            <div className="item__secondary-text">{item.content}</div>
        </div>
        <div className="item__right-side">
            <div className="item__updated_date">{dateTimeStr}</div>
        </div>
    </div>
};
