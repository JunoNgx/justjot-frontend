import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { MantineProvider } from '@mantine/core'

import { justJotTheme } from './theme.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <MantineProvider theme={justJotTheme}>
            <React.StrictMode>
                <App />
            </React.StrictMode>
        </MantineProvider>
    </BrowserRouter>
)
