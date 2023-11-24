   import { fileURLToPath, URL } from "node:url";
   
   import { defineConfig } from "vite";
   import vue from "@vitejs/plugin-vue";

   const fs = require('fs');
   
   
   export default defineConfig({
     plugins: [vue()],
     define: {
       global: {},
     },
     server: {
      https: {
        key: fs.readFileSync('key.pem'),
        cert: fs.readFileSync('cert.pem'),
      },
     },
     resolve: {
       alias: {
         "@": fileURLToPath(new URL("./src", import.meta.url)),
       },
     },
   });
   


// https://vitejs.dev/config/
