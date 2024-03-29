// Courtesy of Sunyatasattva
// https://stackoverflow.com/a/66089276

import { useCallback, useRef } from "react";

// function preventDefault(e: Event) {
//     if (!isTouchEvent(e)) return;

//     if (e.touches.length < 2 && e.preventDefault) {
//         e.preventDefault();
//     }
// };

// export function isTouchEvent(e: Event): e is TouchEvent {
//     return e && "touches" in e;
// };

interface PressHandlers {
    onLongPress: (e: React.MouseEvent | React.TouchEvent) => void,
    onClick: (e: React.MouseEvent | React.TouchEvent) => void,
}

interface Options {
    delay?: number,
    // shouldPreventDefault?: boolean
}

export default function useLongPress(
    { onClick, onLongPress }: PressHandlers,
    { delay = 300 } : Options = {},
) {
    // const [longPressTriggered, setLongPressTriggered] = useState(false);
    const timeout = useRef<number>();
    // const target = useRef<EventTarget>();

    const start = useCallback(
        (e: React.MouseEvent | React.TouchEvent) => {
            // console.log("start")
            /**
             * Juno's note:
             * Remove the use of `e.persist()` and the use of cloned events
             * for two reasons:
             * - This is no-op since React v17
             * - `mantine-contextmenu` needs to `preventDefault` on its own.
             * Preferrably: I should fork it and add an optional chaining opterator.
             */
            // e.persist();
            // const clonedEvent = { ...e };

            // if (shouldPreventDefault && e.target) {
            //     e.target.addEventListener(
            //         "touchend",
            //         preventDefault,
            //         { passive: false }
            //     );
            //     target.current = e.target;
            // }

            // Prevent right mouse click/contextmenu interference
            if (("button" in e) && e.button === 2) {
                return;
            }

            timeout.current = setTimeout(() => {
                // clear(e, false);
                // onLongPress(e);
                handleContextMenu(e)
                // setLongPressTriggered(true);
            }, delay);
        },
        // [onLongPress, delay, shouldPreventDefault]
        [onLongPress, delay]
    );

    const clear = useCallback((
        e: React.MouseEvent | React.TouchEvent,
        // shouldTriggerClick = true
    ) => {
        // console.log("clear", shouldTriggerClick)
        timeout.current && clearTimeout(timeout.current);

        // Prevent right mouse click/contextmenu interference
        if (("button" in e) && e.button === 2) {
            return;
        }

        // shouldTriggerClick && !longPressTriggered && onClick?.(e);

        // setLongPressTriggered(false);

        // if (shouldPreventDefault && target.current) {
        //     target.current.removeEventListener("touchend", preventDefault);
        // }
    },
        // [shouldPreventDefault, onClick, longPressTriggered]
        [onClick]
    );

    const handleContextMenu = (
        e: React.MouseEvent | React.TouchEvent
    ) => {
        onLongPress(e);
        e.preventDefault();
    };

    return {
        onClick: (e: React.MouseEvent | React.TouchEvent) => onClick(e),
        onContextMenu: (e: React.MouseEvent | React.TouchEvent) => onLongPress(e),

        onTouchStart: (e: React.TouchEvent) => start(e),
        onTouchEnd: (e: React.TouchEvent) => clear(e),
        onTouchMove: (e: React.TouchEvent) => clear(e),
        onTouchCancel: (e: React.TouchEvent) => clear(e),

        onMouseDown: (e: React.MouseEvent) => start(e),
        onMouseUp: (e: React.MouseEvent) => clear(e),
        onMouseMove: (e: React.MouseEvent) => clear(e),
        onMouseLeave: (e: React.MouseEvent) => clear(e),
    };
};