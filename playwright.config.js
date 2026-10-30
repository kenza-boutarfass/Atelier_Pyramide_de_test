const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './e2e',
  reporter: 'list',
  use: {
    headless: true,
    baseURL: 'http://localhost:3000'
  }
});
