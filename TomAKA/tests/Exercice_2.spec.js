const { test, expect } = require('@playwright/test');

test('Exercice 2 - Accès à la page E-Learning et LinkedIn', async ({ page, context }) => {
  // 1. Ouvrir l'URL principale
  await page.goto('https://www.it-akademy.fr');

  // 2. Cliquer sur le bouton "E-LEARNING"
  await page.click('text=E-LEARNING');

  // 3. Vérifier que la page E-learning est bien ouverte
  await expect(page).toHaveURL(/.*e-learning.*/);

  // 4. Cliquer sur l'icône LinkedIn (nouvel onglet)
  const [linkedInPage] = await Promise.all([
    context.waitForEvent('page'), // attendre un nouvel onglet
    page.click('a[href*="linkedin.com"]') // clique sur le lien LinkedIn
  ]);

  // 5. Vérifier que la page LinkedIn s'ouvre
  await linkedInPage.waitForLoadState();
  await expect(linkedInPage).toHaveURL(/linkedin\.com/);

  // 6. Fermer toutes les pages
  await linkedInPage.close();
  await page.close();
});