// import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Routes, Route } from "react-router-dom";

import { AppShell, Center } from '@mantine/core';

import Header from "./components/Header";

import LandingPage from "./pages/LandingPage";
import Help from "./pages/Help";
import MainView from "./pages/MainView";
import Redirect from "./pages/Redirect";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgetPassword from "./pages/ForgetPassword";

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
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/help" element={<Help />} />
                        <Route path="/:username">
                            <Route index element={<MainView />} />
                            <Route path=":groupSlug" element={<MainView />} />
                        </Route>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/forget" element={<ForgetPassword />} />
                        <Route path="/*" element={<Redirect />} />
                    </Routes>
                </AppShell.Main>

            </BackendClientContextProvider>
        </ThemeModeContextProvider>

    </AppShell>
}

export default App;