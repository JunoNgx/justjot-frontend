import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { MantineProvider } from '@mantine/core'
import { ContextMenuProvider } from 'mantine-contextmenu';

import "@mantine/core/styles.css";
import "mantine-contextmenu/styles.css";

import '@mantine/core/styles.layer.css';
import 'mantine-contextmenu/styles.layer.css';
import './styles/layers.css';

import { justJotTheme } from './theme.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <MantineProvider theme={justJotTheme}>
            <ContextMenuProvider>
                <React.StrictMode>
                    <App />
                </React.StrictMode>
            </ContextMenuProvider>
        </MantineProvider>
    </BrowserRouter>
)
