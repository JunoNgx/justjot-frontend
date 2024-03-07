// import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import { AppShell, Center, useMantineColorScheme } from '@mantine/core';

import Header from "./components/Header";

import LandingPage from "./pages/LandingPage";
import Help from "./pages/Help";
import GroupView from "./pages/GroupView";
import Redirect from "./pages/Redirect";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";

import "./styles/main.scss";

import { ThemeModeContext } from "./contexts/ThemeModeContext";
import { ThemeMode } from "./types";

function App() {

    const [themeMode, setThemeMode] = useState(ThemeMode.DARK);
    const {
        setColorScheme: setMantineColorScheme,
        // clearColorScheme: _clearMantineColorScheme
    } = useMantineColorScheme();

    useEffect(() => {
        setMantineColorScheme(themeMode);
    }, [themeMode]);

    return <AppShell
        header={{ height: 50}}
        padding="none"
    >
        <ThemeModeContext.Provider value={ [themeMode, setThemeMode] }>

            <AppShell.Header>
                <Header/>
            </AppShell.Header>

            <AppShell.Main>
                <Center
                    className="center-container"
                >
                    <Routes>
                        // TODO: forget password
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/help" element={<Help />} />
                        <Route path="/:username">
                            <Route index element={<GroupView />} />
                            <Route path=":groupSlug" element={<GroupView />} />
                        </Route>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/reset" element={<ResetPassword />} />
                        <Route path="/*" element={<Redirect />} />
                    </Routes>
                </Center>
            </AppShell.Main>

        </ThemeModeContext.Provider>

    </AppShell>
}

export default App;