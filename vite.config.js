import { sites } from "@openai/sites-vite-plugin";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [sites()],
  build: {
    target: "es2022",
    ssr: "server.js",
    outDir: "dist/server",
    rollupOptions: {
      output: {
        entryFileNames: "index.js",
        format: "es",
        inlineDynamicImports: true
      }
    }
  }
});
