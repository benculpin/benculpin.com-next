import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://www.benculpin.com",
  trailingSlash: "never",
  redirects: {
    "/home": "/photography",
    "/films": "/film",
    "/films/hold-back": "/film/hold-back",
    "/films/a-mothers-love": "/film/a-mothers-love",
    "/films/Sailing-4000-miles": "/film/Sailing-4000-miles",
    "/films/what-is-beauty": "/film/what-is-beauty",
    "/films/the-strangers-project": "/film/the-strangers-project",
    "/films/what-is-carnival": "/film/what-is-carnival",
  },
  vite: {
    server: { allowedHosts: true },
    preview: { allowedHosts: true },
  },
});
