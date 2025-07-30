const { test, expect } = require('@playwright/test');

test('Exercice C - Formulaire simple avec pauses pédagogiques', async ({ page }) => {
  // 1. Ouvrir la page (Chrome est déjà configuré via vos paramètres Playwright)
  await page.goto('https://www.selenium.dev/selenium/web/web-form.html');
  await page.waitForTimeout(1000); 

  // 2. Remplir un champ texte
  await page.fill('input[name="my-text"]', 'Michel');
  await page.waitForTimeout(1000); 

  // 3. Cliquer sur le bouton Submit
  await page.click('button');
  await page.waitForTimeout(1000); 

  // 4. Vérifier la confirmation
  await expect(page.locator('#message')).toHaveText('Received!');
  await page.waitForTimeout(2000); 
});
