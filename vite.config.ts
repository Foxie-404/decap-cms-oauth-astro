import path from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";


export default defineConfig({
    build: {
        lib: {
            entry: path.resolve(import.meta.dirname, "src/main.ts"),
            name: "DecapCMSOAuthAstro",
            fileName: "decap-cms-oauth-astro",
        },
        ssr: true,
    },
    plugins: [dts({ rollupTypes: true })],
});