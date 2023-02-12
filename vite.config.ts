import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "node:path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@data": path.resolve(__dirname, "./src/data"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@types": path.resolve(__dirname, "./src/types/index.d.ts"),
    },
  },
  base: "",
  root: "",
  build: {
    outDir: "./docs",
    emptyOutDir: true,
  },
});
