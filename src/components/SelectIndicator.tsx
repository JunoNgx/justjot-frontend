import { ItemsContext } from "@/contexts/ItemsContext";
import { useContext, useRef } from "react";

import "./SelectIndicator.scss";

const ITEM_HEIGHT_IN_PX = 42;
const ITEM_GAP_IN_REM = 0.25;

/**
 * Component is unused due to performance issue.
 *
 * To use this, use this item as the first item in the Item list, and remove
 * the `border-color` in `.Item--IsSelected` state.
 */
export default function SelectIndicator() {
    const { selectedIndex } = useContext(ItemsContext);
    const prevOffset = useRef<number>(0);

    const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);

    const isSelecting = selectedIndex > -1;
    if (isSelecting)
        prevOffset.current =
            (ITEM_HEIGHT_IN_PX + rem * ITEM_GAP_IN_REM) * selectedIndex;

    return (
        <div
            className="SelectIndicator"
            aria-hidden={true}
            style={{
                opacity: isSelecting ? 1 : 0,
                transform: `translateY(${prevOffset.current}px)`,
            }}
        />
    );
}
