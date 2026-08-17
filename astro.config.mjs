import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://www.benculpin.com",
  trailingSlash: "never",
  vite: {
    server: { allowedHosts: true },
    preview: { allowedHosts: true },
  },
});
