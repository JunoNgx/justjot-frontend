import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

// https://vitejs.dev/config/
export default defineConfig({
   plugins: [react()],
   css: {
      // preprocessorOptions: {
      //    scss: {
      //       // TODO: create PR to update Mantine doc, Usage with Sass
      //       additionalData: `@use "./src/styles/_sassMantine" as mantine;`,
      //    }
      // }
      preprocessorOptions: {
         scss: {
           api: 'modern-compiler',
           additionalData: `@use "${path.join(process.cwd(), 'src/_mantine').replace(/\\/g, '/')}" as mantine;`,
         },
       },   
   },
   resolve: {
      alias: {
         "@": "/src",
         /**
          * Work around for: https://github.com/tabler/tabler-icons/issues/1233#issuecomment-2428245119
          */
         "@tabler/icons-react": "@tabler/icons-react/dist/esm/icons/index.mjs",
      },
   },
})
