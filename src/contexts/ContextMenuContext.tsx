import { Position } from "@/types";
import { createContext, useState } from "react";

type ContextMenuContextType = {
    contextMenuPosition: Position,
    setContextMenuPosition: React.Dispatch<React.SetStateAction<Position>>,
    isContextMenuOpened: boolean,
    setIsContextMenuOpened: React.Dispatch<React.SetStateAction<boolean>>,
    handleContextMenu: React.MouseEventHandler<HTMLDivElement>,
};

export const ContextMenuContext = createContext<ContextMenuContextType>({
    contextMenuPosition: {x: 0, y: 0},
    setContextMenuPosition: () => {},
    isContextMenuOpened: false,
    setIsContextMenuOpened: () => {},
    handleContextMenu: () => {},
})

export default function ContextMenuContextProvider(
    {children}: {children: React.ReactNode}
) {
    const [ isContextMenuOpened, setIsContextMenuOpened ] = useState(false);
    const [ contextMenuPosition, setContextMenuPosition ] = useState({x: 0, y: 0});

    const handleContextMenu: React.MouseEventHandler<HTMLDivElement> =
        (event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        console.log("handleContextMenu")
        event.preventDefault();
        setContextMenuPosition({
            x: event.clientX,
            y: event.clientY
        });
        setIsContextMenuOpened(true);
    };

    return <ContextMenuContext.Provider value={{
        contextMenuPosition,
        setContextMenuPosition,
        isContextMenuOpened,
        setIsContextMenuOpened,
        handleContextMenu,
    }}>
        {children}
    </ContextMenuContext.Provider>
}