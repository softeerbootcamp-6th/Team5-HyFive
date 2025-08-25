import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:5173",
    setupNodeEvents(on, config) {
      config.env.API_BASE = process.env.API_BASE || config.env.API_BASE;
      return config;
    },
  },
  viewportWidth: 1920,
  viewportHeight: 1200,
});
