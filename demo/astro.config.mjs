import vercel from "@astrojs/vercel/serverless";
import decapCmsOauth from "decap-cms-oauth-astro";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
    site: "https://decap-cms-oauth-astro.vercel.app",
    integrations: [decapCmsOauth()],
    output: "server",
    adapter: vercel({ functionPerRoute: false }),
});