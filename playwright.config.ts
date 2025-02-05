import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    baseURL: 'https://www.rijksmuseum.nl/api/en',
    extraHTTPHeaders: {
      'Content-Type': 'application/json',
    },
  },
});
