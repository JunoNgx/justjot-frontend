import { ItemsContext } from "@/contexts/ItemsContext";
import { useContext, useRef } from "react";

import "./SelectIndicator.scss";

const ITEM_HEIGHT_IN_PX = 42;
const ITEM_GAP_IN_REM = 0.25;

export default function SelectIndicator() {

    const { selectedIndex } = useContext(ItemsContext);
    const prevOffset = useRef<number>(0);

    const rem = parseFloat(
        getComputedStyle(document.documentElement).fontSize);
    
    const isSelecting = selectedIndex > -1;
    if (isSelecting)
        prevOffset.current =
            (ITEM_HEIGHT_IN_PX + rem * ITEM_GAP_IN_REM) * selectedIndex;

    return <div className="SelectIndicator"
        aria-hidden={true}
        style={{
            opacity: isSelecting ? 1 : 0,
            top: `${prevOffset.current}px`,
        }}
    />
}