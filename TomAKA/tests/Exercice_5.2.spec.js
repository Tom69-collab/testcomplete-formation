const { test, expect } = require('@playwright/test');

test('Étape 2 - Remplir infos de base', async ({ page }) => {
  await page.goto('https://demoqa.com/automation-practice-form');
  await page.fill('#firstName', 'Jean');
  await page.fill('#lastName', 'Dupont');
  await page.fill('#userEmail', 'jean.dupont@example.com');
  await page.click('label[for="gender-radio-1"]');
  await page.fill('#userNumber', '0601020304');
});
