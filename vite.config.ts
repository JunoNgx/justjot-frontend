import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
   plugins: [react()],
   css: {
      preprocessorOptions: {
         scss: {
            // TODO: create PR to update Mantine doc, Usage with Sass
            additionalData: `@use "./src/styles/_mantine" as mantine;`,
         }
      }
   },
   resolve: {
      alias: {
         "@": "/src"
      },
   },
})
