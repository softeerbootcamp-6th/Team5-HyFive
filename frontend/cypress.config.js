import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:5173",
  },
  viewportWidth: 1920,
  viewportHeight: 1200,
});
