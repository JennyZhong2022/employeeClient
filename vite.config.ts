import { defineConfig } from "vitest/config"; // for typescript
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./config/vitest-setup.ts",
  },
});
