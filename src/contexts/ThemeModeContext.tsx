import { createContext, ReactNode, useEffect } from "react";

import { ThemeMode } from "@/types";
import { useMantineColorScheme } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";

type ThemeModeContextType = {
    themeMode: ThemeMode,
    setThemeMode: React.Dispatch<React.SetStateAction<ThemeMode>>
}

export const ThemeModeContext = createContext<ThemeModeContextType>({
    themeMode: ThemeMode.AUTO,
    setThemeMode: () => {}
});

export default function ThemeModeContextProvider({children}: {children: ReactNode}) {
    const [themeMode, setThemeMode] = useLocalStorage<ThemeMode>({
        key: "color-scheme",
        defaultValue: ThemeMode.AUTO,
    });

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
