import { Item } from "../types";

export default function ItemComponent({ item }: { item: Item }) {

    // return <div>
    //     title: {item.title} | content: {item.content} | type: {item.type}
    // </div>

    return <div className="item">
        <div className="item__icon">icon</div>
        <div className="item__primary-text">{item.title}</div>
        <div className="item__secondary-text">{item.content}</div>
        <div className="item__updated_date">{item.updated}</div>
    </div>
};
