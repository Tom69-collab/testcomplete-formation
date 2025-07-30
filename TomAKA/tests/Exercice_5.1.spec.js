const { test, expect } = require('@playwright/test');

test('Étape 1 - Ouverture formulaire', async ({ page }) => {
  await page.goto('https://demoqa.com');
  await page.click('text=Forms');
  await page.click('text=Practice Form');
  await expect(page).toHaveURL(/automation-practice-form/);




  
});
