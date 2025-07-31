const { test, expect } = require('@playwright/test');

test('Exercice 1 - Ouverture du site IT Akademy', async ({ page }) => {
  // Ouvrir la page du site IT Akademy
  await page.goto('https://www.it-akademy.fr');
  
  // Attendre que la page soit complètement chargée (pas juste "Just a moment...")
  await page.waitForLoadState('networkidle');
  
  // Vérifier que le titre de la page contient "IT Akademy"
  await expect(page).toHaveTitle(/IT-Akademy/, { timeout: 10000 });

});

