// import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { AppShell } from '@mantine/core';
import { ContextMenuProvider } from 'mantine-contextmenu';
import { ModalsProvider } from '@mantine/modals';

import ThemeModeContextProvider from "./contexts/ThemeModeContext";
import BackendClientContextProvider from "./contexts/BackendClientContext";

import Header from "./components/Header";
import LandingPage from "./pages/LandingPage";
import Help from "./pages/Help";
import MainView from "./pages/MainView";
import Redirect from "./pages/Redirect";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Reset from "./pages/Reset";

import "@mantine/core/styles.css";
import '@mantine/notifications/styles.css';
import "mantine-contextmenu/styles.css";

import '@mantine/core/styles.layer.css';
import 'mantine-contextmenu/styles.layer.css';
import './styles/layers.css';

import "./styles/main.scss";
import InfoModal from "./components/modals/InfoModal";

function App() {

    return <AppShell
        header={{ height: 50}}
        padding="none"
    >

        <ThemeModeContextProvider>
            <BackendClientContextProvider>
                <ModalsProvider
                    modals={{ infoModal: InfoModal}}
                >
                    <ContextMenuProvider>

                        <AppShell.Header>
                            <Header/>
                        </AppShell.Header>

                        <AppShell.Main className="appshell-main">
                            <Routes>
                                <Route path="/" element={<LandingPage />} />
                                <Route path="/help" element={<Help />} />
                                <Route path="/:username">
                                    <Route index element={<MainView />} />
                                    <Route path=":groupSlug" element={<MainView />} />
                                </Route>
                                <Route path="/login" element={<Login />} />
                                <Route path="/register" element={<Register />} />
                                <Route path="/reset" element={<Reset />} />
                                <Route path="/*" element={<Redirect />} />
                            </Routes>
                        </AppShell.Main>

                    </ContextMenuProvider>
                </ModalsProvider>
            </BackendClientContextProvider>
        </ThemeModeContextProvider>

    </AppShell>
}

export default App;