import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"

export default defineConfig({
    root: path.resolve(__dirname, "."), // la raíz del ejemplo
    base: "/", // usa raíz absoluta para que funcione en dev y build
    plugins: [react()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "../src"), // alias a tu librería
        },
    },
    publicDir: path.resolve(__dirname, "../public"), // donde está config.yml
    server: {
        port: 5173,
        open: true,
    },
    build: {
        outDir: path.resolve(__dirname, "../dist"),
        emptyOutDir: true,
    },
})
