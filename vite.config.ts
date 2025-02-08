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
         "@": "/src"
      },
   },
})
