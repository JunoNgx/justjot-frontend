/// <reference types="vitest" />
import { configDefaults, defineConfig } from 'vitest/config'

export default defineConfig({
    resolve: {
        alias: {
            "@": "/src"
        },
    },
    test: {
        environment: 'happy-dom',
        exclude: [
            ...configDefaults.exclude,
            '**/playwright-tests/**'
        ]
    },
});
