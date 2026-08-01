import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      // Forward API calls to the local Express backend during `npm run dev`
      // so the frontend can just call fetch("/api/evaluate").
      "/api": {
        target: "http://localhost:8787",
        changeOrigin: true,
      },
    },
  },
});
