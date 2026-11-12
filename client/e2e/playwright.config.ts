import { defineConfig } from '@playwright/test';

export default defineConfig({
  projects: [
    {
      name: 'Chromium',
      use: { browserName: 'chromium' },
    },
    {
      name: 'Firefox',
      use: { browserName: 'firefox' },
    },
    // WebKit project removed or commented out
    // {
    //   name: 'WebKit',
    //   use: { browserName: 'webkit' },
    // },
  ],
});   