// Courtesy of Sunyatasattva
// https://stackoverflow.com/a/66089276

import { useCallback, useRef } from "react";

interface PressHandlers {
    onClick: (e: React.MouseEvent | React.TouchEvent) => void,
    onLongPress: (e: React.MouseEvent | React.TouchEvent) => void,
};

interface Options {
    delay?: number,
};

export default function useHandleContextMenuWithLongPress(
    { onClick, onLongPress }: PressHandlers,
    { delay = 300 } : Options = {},
) {
    const timeout = useRef<number>();

    const start = useCallback((
        e: React.MouseEvent | React.TouchEvent
    ) => {
        // Prevent right mouse click/native contextmenu interference
        if (("button" in e) && e.button === 2) {
            return;
        }

        timeout.current = setTimeout(() => {
            handleContextMenu(e)
        }, delay);
    }, [onLongPress, delay]);

    const clear = useCallback((
        _e: React.MouseEvent | React.TouchEvent,
    ) => {
        timeout.current && clearTimeout(timeout.current);
    }, [onClick]);

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