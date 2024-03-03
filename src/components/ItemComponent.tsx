// import styled from 'styled-components';

import { Item, ItemType } from "../types";
import { calculatePriText, calculateDatetimeStr } from "../utils/itemUtils";

export default function ItemComponent({ item }: { item: Item }) {

    // return <div>
    //     title: {item.title} | content: {item.content} | type: {item.type}
    // </div>

    const isTodoItem = item.type === ItemType.TODO;

    return <div className="item">
        <div className="item__left-side">
            <div className="item__icon">icon</div>
            <div className="item__primary-text">{calculatePriText(item)}</div>
            {!isTodoItem &&
                <div className="item__secondary-text">{item.content}</div>}
        </div>
        <div className="item__right-side">
            <div className="item__datetime">{calculateDatetimeStr(item)}</div>
        </div>
    </div>
};
