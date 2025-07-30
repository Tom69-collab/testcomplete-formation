const { test, expect } = require('@playwright/test');

test('Étape 4 - Soumission et affichage de la modale', async ({ page }) => {
  await page.goto('https://demoqa.com/automation-practice-form');

  // Remplir l'adresse avant la soumission
  await page.fill('#currentAddress', '123 rue des Tests, Paris');

  // Supprimer les pubs qui peuvent bloquer le clic
  await page.evaluate(() => {
    document.querySelectorAll('#fixedban, .ads').forEach(el => el.remove());
  });

  // Scroller jusqu'au bouton et cliquer
  await page.locator('#submit').scrollIntoViewIfNeeded();
  await page.click('#submit', { force: true });

  // Vérifier que la modale de confirmation est visible
  await expect(page.locator('.modal-content')).toBeVisible({ timeout: 15000 });
});
