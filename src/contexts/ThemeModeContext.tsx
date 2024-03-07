import { createContext, useContext, useState, ReactNode, useEffect } from "react";

import { ThemeMode } from "../types";
import { useMantineColorScheme } from "@mantine/core";

export const ThemeModeContext = createContext(ThemeMode.DARK);
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


