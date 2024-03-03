import { Item } from "../types";

export default function ItemComponent({ item }: { item: Item }) {

    return <div>
        title: {item.title} | content: {item.content} | type: {item.type}
    </div>
};
