import { ItemsContext } from "@/contexts/ItemsContext";
import { useContext } from "react";

import "./SelectIndicator.scss";

const ITEM_HEIGHT_IN_PX = 42;
const ITEM_GAP_IN_REM = 0.25;

export default function SelectIndicator() {

    const { selectedIndex } = useContext(ItemsContext);

    const rem = parseFloat(
        getComputedStyle(document.documentElement).fontSize);
    const offset = (ITEM_HEIGHT_IN_PX + rem * ITEM_GAP_IN_REM)
        * selectedIndex;

    return <div className="SelectIndicator"
        style={{
            top: `${offset}px`,
        }}
    />
}