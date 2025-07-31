import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

//@ts-ignore
import * as path from "path";

declare var __dirname: any;

// https://vite.dev/config/
export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: [
            { find: "@ui", replacement: path.resolve(__dirname, "src/ui") },
            { find: "@app", replacement: path.resolve(__dirname, "src/app") },
        ],
    },
});
