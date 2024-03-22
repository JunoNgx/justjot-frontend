// import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { AppShell } from '@mantine/core';
import { ContextMenuProvider } from 'mantine-contextmenu';
import { ModalsProvider } from '@mantine/modals';

import ThemeModeContextProvider from "src/contexts/ThemeModeContext";
import BackendClientContextProvider from "src/contexts/BackendClientContext";
import CollectionsContextProvider from "src/contexts/CollectionsContext";
import CurrentCollectionContextProvider from "src/contexts/CurrentCollectionContext";
import ItemsContextProvider from "src/contexts/ItemsContext";
import CurrentItemContextProvider from "src/contexts/CurrentItemContext";

import Header from "src/components/header/Header";
import LandingPage from "src/pages/LandingPage";
import Help from "src/pages/Help";
import MainView from "src/pages/MainView";
import Redirect from "src/pages/Redirect";
import Login from "src/pages/Login";
import Register from "src/pages/Register";
import Reset from "src/pages/Reset";

import "@mantine/core/styles.css";
import '@mantine/notifications/styles.css';
import "mantine-contextmenu/styles.css";

import '@mantine/core/styles.layer.css';
import 'mantine-contextmenu/styles.layer.css';
import 'src/styles/layers.css';

import "src/styles/main.scss";
import InfoModal from "src/components/modals/InfoModal";

function App() {

    return <AppShell
        header={{ height: 50}}
        padding="none"
    >
        <ThemeModeContextProvider>

            <BackendClientContextProvider>
                <CollectionsContextProvider>
                    <CurrentCollectionContextProvider>
                        <ItemsContextProvider>
                            <CurrentItemContextProvider>

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

                            </CurrentItemContextProvider>
                        </ItemsContextProvider>
                    </CurrentCollectionContextProvider>
                </CollectionsContextProvider>
            </BackendClientContextProvider>

        </ThemeModeContextProvider>
    </AppShell>
}

export default App;