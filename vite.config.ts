import { defaultOptions} from '@hono/vite-dev-server';
import adapter from "@hono/vite-dev-server/cloudflare";
import {
  vitePlugin as remix,
  cloudflareDevProxyVitePlugin as remixCloudflareDevProxy,
} from "@remix-run/dev";
import serverAdapter from "hono-remix-adapter/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

declare module "@remix-run/cloudflare" {
  interface Future {
    v3_singleFetch: true;
  }
}

export default defineConfig({
  publicDir: "public",
  plugins: [
    remixCloudflareDevProxy(),
    remix({
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
        v3_singleFetch: true,
        v3_lazyRouteDiscovery: true,
      },
    }),
    serverAdapter({
      adapter,
      entry: "./server/index.ts",
      exclude: [...defaultOptions.exclude, '/assets/**', '/app/**', "/public/**"],
    }),
    tsconfigPaths(),
  ],
});