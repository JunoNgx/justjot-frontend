// import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Routes, Route } from "react-router-dom";

import { AppShell, Center } from '@mantine/core';

import Header from "./components/Header";

import LandingPage from "./pages/LandingPage";
import Help from "./pages/Help";
import GroupView from "./pages/GroupView";
import Redirect from "./pages/Redirect";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";

import "./styles/main.scss";

import ThemeModeContextProvider from "./contexts/ThemeModeContext";
import BackendClientContextProvider from "./contexts/BackendClientContext";

function App() {

    return <AppShell
        header={{ height: 50}}
        padding="none"
    >

        <ThemeModeContextProvider>
            <BackendClientContextProvider>

                <AppShell.Header>
                    <Header/>
                </AppShell.Header>

                <AppShell.Main>
                    <Center
                        className="center-container"
                    >
                        <Routes>
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

            </BackendClientContextProvider>
        </ThemeModeContextProvider>

    </AppShell>
}

export default App;