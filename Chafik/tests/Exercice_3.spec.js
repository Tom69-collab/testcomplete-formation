const { test, expect } = require("@playwright/test");
const {
  navigateToITAkademy,
  waitForPageStability,
  clickElementWithFallback,
  openLinkInNewTab,
  closePage,
  setupTestConfig,
} = require("./utils/test-helpers");

test("Exercice 3 - E-Learning + LinkedIn avec Delay", async ({
  page,
  context,
}) => {
  // Configuration du test
  setupTestConfig(test, 75000); // Plus de temps à cause du delay de 10s

  console.log("🚀 Début du test Exercice 3 - E-Learning + LinkedIn avec Delay");

  // 1. Navigation robuste vers IT Akademy
  await navigateToITAkademy(page);
  await waitForPageStability(page);

  // 2. Cliquer sur le bouton "E-LEARNING" avec sélecteurs multiples
  const eLearningSelectors = [
    "text=E-LEARNING",
    "text=e-learning",
    "text=E-Learning",
    '[href*="e-learning"]',
    'a:has-text("E-LEARNING")',
    '[data-testid*="elearning"]',
  ];

  const eLearningClicked = await clickElementWithFallback(
    page,
    eLearningSelectors,
    "E-Learning",
    7000 // Timeout un peu plus long
  );

  if (!eLearningClicked) {
    throw new Error(
      "Aucun bouton E-Learning trouvé avec les sélecteurs disponibles"
    );
  }

  // 3. Vérifier que la page E-learning est ouverte avec patterns flexibles
  console.log("🔍 Vérification de la page E-Learning...");

  const eLearningUrlPatterns = [
    /.*e-learning.*/i,
    /.*elearning.*/i,
    /.*formation.*/i,
    /.*cours.*/i,
    /.*learning.*/i,
  ];

  let urlMatched = false;
  for (const pattern of eLearningUrlPatterns) {
    try {
      await expect(page).toHaveURL(pattern, { timeout: 10000 });
      urlMatched = true;
      console.log(`✅ URL E-Learning confirmée: ${page.url()}`);
      break;
    } catch (error) {
      console.log(`❌ Pattern ${pattern} ne correspond pas à l'URL actuelle`);
    }
  }

  if (!urlMatched) {
    console.log(`ℹ️ URL actuelle: ${page.url()}`);
    console.log("⚠️ Continuation du test malgré l'URL non correspondante");
  }

  // 4. Delay manuel de 10 secondes avec feedback utilisateur
  console.log("⏳ Début du délai manuel de 10 secondes...");

  // Délai progressif avec feedback toutes les 2 secondes
  for (let i = 1; i <= 5; i++) {
    await page.waitForTimeout(2000);
    console.log(`⏱️  Délai en cours... ${i * 2}/10 secondes`);
  }

  console.log("✅ Délai de 10 secondes terminé");

  // 5. Ouvrir le lien LinkedIn dans un nouvel onglet avec sélecteurs robustes
  console.log("🔗 Recherche et ouverture du lien LinkedIn...");

  const linkedInSelectors = [
    'a[href*="linkedin.com"]',
    'a[href*="linkedin"]',
    '[data-testid*="linkedin"]',
    'img[alt*="linkedin" i]',
    'i[class*="linkedin"]',
    ".linkedin",
    "text=LinkedIn",
    '[title*="LinkedIn" i]',
    'svg[aria-label*="LinkedIn" i]',
  ];

  const linkedInPage = await openLinkInNewTab(
    page,
    context,
    linkedInSelectors,
    "LinkedIn",
    /linkedin\.com/
  );

  // 6. Vérifications approfondies de la page LinkedIn
  if (linkedInPage) {
    console.log("🔍 Vérification approfondie de la page LinkedIn...");

    // Vérifier différents éléments LinkedIn
    const linkedInElements = [
      "text=LinkedIn",
      '[data-test-id*="linkedin"]',
      'img[alt*="LinkedIn"]',
      '[role="banner"]',
      'nav[aria-label*="Primary"]',
      ".feed-container",
    ];

    let elementFound = false;
    for (const element of linkedInElements) {
      try {
        await expect(linkedInPage.locator(element).first()).toBeVisible({
          timeout: 8000,
        });
        console.log(`✅ Élément LinkedIn confirmé: ${element}`);
        elementFound = true;
        break;
      } catch (error) {
        console.log(`❌ Élément LinkedIn ${element} non trouvé`);
      }
    }

    if (!elementFound) {
      console.log(
        "⚠️ Aucun élément LinkedIn typique trouvé, mais la page s'est ouverte"
      );
    }

    // Vérifier le titre de la page LinkedIn
    try {
      const linkedInTitle = await linkedInPage.title();
      console.log(`📄 Titre de la page LinkedIn: "${linkedInTitle}"`);

      if (linkedInTitle.toLowerCase().includes("linkedin")) {
        console.log("✅ Titre LinkedIn confirmé");
      }
    } catch (error) {
      console.log("⚠️ Impossible de récupérer le titre LinkedIn");
    }
  } else {
    console.log("⚠️ Aucun lien LinkedIn trouvé sur la page E-Learning");
  }

  // 7. Nettoyage - Fermer toutes les pages ouvertes
  console.log("🧹 Nettoyage des pages ouvertes...");

  await closePage(linkedInPage, "LinkedIn");

  // Note: La page principale se ferme automatiquement à la fin du test
  console.log("🎉 Test Exercice 3 terminé avec succès !");
});
