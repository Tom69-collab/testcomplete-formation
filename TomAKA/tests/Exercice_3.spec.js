const { test, expect } = require('@playwright/test');

test('Exercice 2bis - E-Learning + LinkedIn avec Delay', async ({ page, context }) => {
  // 1. Ouvrir l'URL principale
  await page.goto('https://www.it-akademy.fr');

  // 2. Cliquer sur le bouton "E-LEARNING"
  await page.click('text=E-LEARNING');

  // 3. Vérifier que la page E-learning est bien ouverte
  await expect(page).toHaveURL(/.*e-learning.*/);

  // 4. Delay manuel de 10 secondes avant la dernière action
  await page.waitForTimeout(10000);

  // 5. Cliquer sur l'icône LinkedIn (ouvre un nouvel onglet)
  const [linkedInPage] = await Promise.all([
    context.waitForEvent('page'),
    page.click('a[href*="linkedin.com"]')
  ]);

  // 6. Vérifier l’ouverture de LinkedIn
  await linkedInPage.waitForLoadState();
  await expect(linkedInPage).toHaveURL(/linkedin\.com/);

  // 7. Fermer toutes les pages
  await linkedInPage.close();
  await page.close();
});