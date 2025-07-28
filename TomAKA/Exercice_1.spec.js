const { test, expect } = require('@playwright/test');

test('Exercice 1 - Ouverture du site IT Akademy', async ({ page }) => {
  // Ouvrir la page du site IT Akademy
  await page.goto('https://www.it-akademy.fr');
});