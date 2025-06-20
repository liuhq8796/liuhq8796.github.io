// @ts-check
import { defineConfig } from 'astro/config';

import preact from '@astrojs/preact';

// https://astro.build/config
export default defineConfig({
  integrations: [preact()],
  site: "https://lucasliu.netlify.app",
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  }
});