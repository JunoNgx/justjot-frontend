import { createContext, useState, ReactNode, useEffect } from "react";

import { ThemeMode } from "../types";
import { useMantineColorScheme } from "@mantine/core";

type ThemeModeContextType = {
    themeMode: ThemeMode,
    setThemeMode: React.Dispatch<React.SetStateAction<ThemeMode>>
}

export const ThemeModeContext = createContext<ThemeModeContextType>({
    themeMode: ThemeMode.DARK,
    setThemeMode: () => {}
});

export default function ThemeModeContextProvider({children}: {children: ReactNode}) {
    const [themeMode, setThemeMode] = useState(ThemeMode.DARK);
    const {
        setColorScheme: setMantineColorScheme,
        // clearColorScheme: _clearMantineColorScheme
    } = useMantineColorScheme();

    useEffect(() => {
        setMantineColorScheme(themeMode);
    }, [themeMode]);

    return <ThemeModeContext.Provider value={ { themeMode, setThemeMode } }>
        {children}
    </ThemeModeContext.Provider>
}
