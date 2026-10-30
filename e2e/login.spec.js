const { test, expect } = require('@playwright/test');

test('login page loads', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await expect(page.locator('h1')).toHaveText('Connexion');
});
