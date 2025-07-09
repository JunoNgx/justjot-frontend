import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    css: {
        preprocessorOptions: {
            scss: {
                api: "modern-compiler",
                additionalData: `@use "${path.join(process.cwd(), "src/styles/_sassMantine").replace(/\\/g, "/")}" as mantine;`,
            },
        },
    },
    resolve: {
        alias: {
            "@": "/src",
            /**
             * Work around for: https://github.com/tabler/tabler-icons/issues/1233#issuecomment-2428245119
             */
            "@tabler/icons-react":
                "@tabler/icons-react/dist/esm/icons/index.mjs",
        },
    },
});
