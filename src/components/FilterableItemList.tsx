import { ItemsContext } from "@/contexts/ItemsContext";
import { MainViewContext } from "@/contexts/MainViewContext"
import { useContext } from "react"
import ItemComponent from "./itemComponent/ItemComponent";

export default function FilterableItemList() {

    const { items } = useContext(ItemsContext);
    const { inputVal } = useContext(MainViewContext);

    const searchTerm = inputVal.toLocaleLowerCase();

    const filteredList = items.filter(item => {

        const hasTitleMatch = item.title?.toLowerCase()
            .indexOf(searchTerm) > -1;
        const hasContentMatch = item.content?.toLowerCase()
            .indexOf(searchTerm) > -1;
        
        return hasTitleMatch || hasContentMatch;
    });

    return <>
        {filteredList?.map((item, index) =>
            <ItemComponent
                key={item.id}
                item={item}
                index={index}
            />
        )}
    </>
};