import { createContext, useState } from "react";

type ContextMenuContextType = {
    isContextMenuOpened: boolean,
    setIsContextMenuOpened: React.Dispatch<React.SetStateAction<boolean>>,
    handleContextMenu: React.MouseEventHandler<HTMLDivElement>,
};

export const ContextMenuContext = createContext<ContextMenuContextType>({
    isContextMenuOpened: false,
    setIsContextMenuOpened: () => {},
    handleContextMenu: () => {},
})

export default function ContextMenuContextProvider(
    {children}: {children: React.ReactNode}
) {
    const [ isContextMenuOpened, setIsContextMenuOpened ] = useState(false);

    const handleContextMenu: React.MouseEventHandler<HTMLDivElement> =
        (event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        console.log("handleContextMenu")
        event.preventDefault();
        setIsContextMenuOpened(true);
    };

    return <ContextMenuContext.Provider value={{
        isContextMenuOpened,
        setIsContextMenuOpened,
        handleContextMenu,
    }}>
        {children}
    </ContextMenuContext.Provider>
}