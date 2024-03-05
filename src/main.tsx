import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'

import {
    createTheme,
    DEFAULT_THEME,
    mergeMantineTheme,
    MantineProvider,
} from '@mantine/core';

import '@mantine/core/styles.css';

const overrideTheme = createTheme({
    primaryColor: "teal",
    // fontFamily: "",
    // fontFamilyMonospace: "",
    defaultRadius: 0,
});
const mergedTheme = mergeMantineTheme(DEFAULT_THEME, overrideTheme);


ReactDOM.createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <MantineProvider theme={mergedTheme}>
            <React.StrictMode>
                <App />
            </React.StrictMode>
        </MantineProvider>
    </BrowserRouter>
)
