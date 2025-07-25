import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  use: {
    baseURL: "http://localhost:8081", // or the correct URL your app runs on
    browserName: "chromium",
    headless: false,
  },
});
