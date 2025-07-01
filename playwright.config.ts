import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  reporter: [
    ['html', { open: 'never' }],
    ['allure-playwright']
  ],
    use: {
    baseURL: 'https://apiv2-test.coordinadora.com/guias/cm-guias-ms',
    extraHTTPHeaders: {
      'Content-Type': 'application/json'
    }
  }
});