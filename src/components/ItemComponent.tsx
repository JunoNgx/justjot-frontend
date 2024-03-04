// import styled from 'styled-components';

import { useState } from "react";
import { Item, ItemType } from "../types";
import { calculatePriText, processDatetime } from "../utils/itemUtils";
// import { DateTime } from "luxon";

export default function ItemComponent({ item }: { item: Item }) {

    // return <div>
    //     title: {item.title} | content: {item.content} | type: {item.type}
    // </div>
    const [isFocused, setIsFocused] = useState(false);
    const isTodoItem = item.type === ItemType.TODO;
    // const setIsFocused = (val: boolean) => {
    //     console.log("set is focused", val)
    //     isFocused = val;
    // }

    const { relativeDatetime, fullDatetime } = processDatetime(item);

    return <div className={"item " + (isFocused ? "item--is-active" : "")}
        onMouseEnter={() => { setIsFocused(true) }}
        onMouseLeave={() => { setIsFocused(false) }}
    >
        <div className="item__left-side">
            {isFocused}
            <div className="item__icon">icon</div>
            <div className="item__primary-text">{calculatePriText(item)}</div>
            {!isTodoItem &&
                <div className="item__secondary-text">{item.content}</div>}
        </div>
        <div className="item__right-side">
            <div
                className="item__datetime"
                title={fullDatetime}
            >
                {relativeDatetime}
            </div>
        </div>
    </div>
};
