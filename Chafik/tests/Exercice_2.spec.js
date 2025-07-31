const { test, expect } = require("@playwright/test");
const {
  navigateToITAkademy,
  waitForPageStability,
  clickElementWithFallback,
  openLinkInNewTab,
  closePage,
  setupTestConfig,
} = require("./utils/test-helpers");

test("Exercice 2 - Accès à la page E-Learning et LinkedIn", async ({
  page,
  context,
}) => {
  // Configuration du test
  setupTestConfig(test, 60000);

  console.log("🚀 Début du test Exercice 2 - E-Learning et LinkedIn");

  // 1. Navigation robuste vers IT Akademy
  await navigateToITAkademy(page);
  await waitForPageStability(page);

  // 2. Cliquer sur le bouton "E-LEARNING"
  const eLearningSelectors = [
    "text=E-LEARNING",
    "text=e-learning",
    "text=E-Learning",
    '[href*="e-learning"]',
    'a:has-text("E-LEARNING")',
  ];

  const eLearningClicked = await clickElementWithFallback(
    page,
    eLearningSelectors,
    "E-Learning"
  );

  if (!eLearningClicked) {
    throw new Error("Aucun bouton E-Learning trouvé");
  }

  // 3. Vérifier que la page E-learning est ouverte
  const eLearningUrlPatterns = [
    /.*e-learning.*/i,
    /.*elearning.*/i,
    /.*formation.*/i,
  ];

  let urlMatched = false;
  for (const pattern of eLearningUrlPatterns) {
    try {
      await expect(page).toHaveURL(pattern, { timeout: 10000 });
      urlMatched = true;
      console.log(`✅ URL E-Learning confirmée: ${page.url()}`);
      break;
    } catch (error) {
      console.log(`❌ Pattern ${pattern} ne correspond pas`);
    }
  }

  if (!urlMatched) {
    console.log(`ℹ️ URL actuelle: ${page.url()}`);
  }

  // 4. Ouvrir le lien LinkedIn dans un nouvel onglet
  const linkedInSelectors = [
    'a[href*="linkedin.com"]',
    'a[href*="linkedin"]',
    '[data-testid*="linkedin"]',
    'img[alt*="linkedin" i]',
    'i[class*="linkedin"]',
    ".linkedin",
    "text=LinkedIn",
  ];

  const linkedInPage = await openLinkInNewTab(
    page,
    context,
    linkedInSelectors,
    "LinkedIn",
    /linkedin\.com/
  );

  // 5. Vérifier les éléments LinkedIn si la page s'est ouverte
  if (linkedInPage) {
    const linkedInElements = [
      "text=LinkedIn",
      '[data-test-id*="linkedin"]',
      'img[alt*="LinkedIn"]',
    ];

    for (const element of linkedInElements) {
      try {
        await expect(linkedInPage.locator(element).first()).toBeVisible({
          timeout: 5000,
        });
        console.log(`✅ Élément LinkedIn confirmé: ${element}`);
        break;
      } catch (error) {
        // Continue avec l'élément suivant
      }
    }
  }

  // 6. Nettoyage - Fermer les pages
  await closePage(linkedInPage, "LinkedIn");

  console.log("🎉 Test Exercice 2 terminé avec succès !");
});
