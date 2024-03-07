import { createContext, useContext, useState, ReactNode, useEffect } from "react";

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

// const ThemeModeUpdateContext = createContext();

// export function ThemeModeContextProvider({children}: {children: ReactNode}) {
//     const [themeMode, setThemeMode] = useState(ThemeMode.DARK);
//     const {
//         setColorScheme: setMantineColorScheme,
//         clearColorScheme: clearMantineColorScheme
//     } = useMantineColorScheme();

//     useEffect(() => {
//         setMantineColorScheme(themeMode);
//     }, [themeMode]);

//     return <ThemeModeContext.Provider value={ [themeMode, setThemeMode] }>
//         {children}
//     </ThemeModeContext.Provider>
// }

// export default function ThemeModeContext() {
//     const [themeMode, setThemeMode] = useState(ThemeMode.DARK)

//     return <ThemeModeContext.Provider value={themeMode}>
//         {children}
//     </ThemeModeContext.Provider>
// }


