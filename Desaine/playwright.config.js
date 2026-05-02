import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  reporter: 'list',
  use: {
    baseURL: 'http://127.0.0.1:4187',
    browserName: 'chromium',
    colorScheme: 'dark',
    locale: 'ru-RU',
    screenshot: 'only-on-failure',
    serviceWorkers: 'block',
  },
  webServer: {
    command: 'npm run preview -- --host 127.0.0.1 --port 4187',
    port: 4187,
    reuseExistingServer: false,
    timeout: 120000,
  },
})
