const { expect } = require("@playwright/test");

/**
 * Utilitaires réutilisables pour les tests Playwright
 */

/**
 * Navigation robuste vers IT Akademy avec retry et gestion d'erreurs
 * @param {Page} page - La page Playwright
 * @param {string} url - URL à charger (par défaut IT Akademy)
 * @param {number} timeout - Timeout en ms
 */
async function navigateToITAkademy(
  page,
  url = "https://www.it-akademy.fr",
  timeout = 30000
) {
  console.log(`📡 Chargement de ${url}...`);

  try {
    await page.goto(url, {
      waitUntil: "domcontentloaded",
      timeout,
    });
    console.log("✅ Page chargée avec succès");
  } catch (error) {
    console.log(`⚠️ Erreur lors du chargement initial: ${error.message}`);
    console.log("🔄 Tentative de rechargement...");
    await page.goto(url, {
      waitUntil: "load",
      timeout: timeout - 10000,
    });
  }
}

/**
 * Attendre que la page soit stable (éviter "Just a moment...")
 * @param {Page} page - La page Playwright
 */
async function waitForPageStability(page) {
  console.log("⏳ Attente de la stabilisation de la page...");

  try {
    // Stratégie 1: Attendre que le titre change de "Just a moment..."
    await page.waitForFunction(
      () => document.title !== "Just a moment..." && document.title.length > 0,
      { timeout: 15000 }
    );
    console.log("✅ Titre de la page stabilisé");
  } catch (error) {
    console.log(
      "⚠️ Timeout sur l'attente du titre, passage en mode alternatif"
    );

    // Stratégie 2: Attendre des éléments spécifiques
    try {
      await page.waitForSelector("body", { timeout: 10000 });
      await page.waitForTimeout(2000); // Attente fixe de sécurité
    } catch (fallbackError) {
      console.log("⚠️ Stratégie de fallback utilisée");
    }
  }
}

/**
 * Vérifier le titre avec plusieurs patterns flexibles
 * @param {Page} page - La page Playwright
 * @param {Array} customPatterns - Patterns personnalisés (optionnel)
 */
async function verifyTitle(page, customPatterns = []) {
  console.log("🔍 Vérification du titre de la page...");

  const currentTitle = await page.title();
  console.log(`📄 Titre actuel: "${currentTitle}"`);

  // Patterns par défaut + patterns personnalisés
  const defaultPatterns = [
    /IT.*Akademy/i,
    /IT.Akademy/i,
    /Akademy/i,
    /formation/i,
    /école/i,
    /academy/i,
  ];

  const allPatterns = [...customPatterns, ...defaultPatterns];

  let titleMatched = false;
  for (const pattern of allPatterns) {
    try {
      await expect(page).toHaveTitle(pattern, { timeout: 5000 });
      console.log(`✅ Titre validé avec le pattern: ${pattern}`);
      titleMatched = true;
      break;
    } catch (error) {
      console.log(`❌ Pattern ${pattern} ne correspond pas`);
    }
  }

  if (!titleMatched) {
    console.log(
      `❌ Aucun pattern de titre ne correspond. Titre actuel: "${currentTitle}"`
    );
    await performPageHealthCheck(page);
  }

  return titleMatched;
}

/**
 * Vérifier la santé de la page (URL, contenu, erreurs)
 * @param {Page} page - La page Playwright
 */
async function performPageHealthCheck(page) {
  const url = page.url();
  console.log(`🔗 URL actuelle: ${url}`);

  // Vérifier si la page est bien chargée
  try {
    await expect(page.locator("body")).toBeVisible({ timeout: 5000 });
    console.log("✅ Page semble chargée (body visible)");

    if (url.includes("it-akademy.fr")) {
      console.log("✅ Domaine correct confirmé");
    } else {
      console.log(`⚠️ Domaine inattendu: ${url}`);
    }
  } catch (error) {
    console.log(`❌ Problème de chargement de la page: ${error.message}`);
    throw error;
  }

  // Vérifier le contenu de la page
  const bodyText = await page.textContent("body");
  if (bodyText && bodyText.includes("Just a moment")) {
    console.log("⚠️ Page encore en chargement avec Cloudflare");
  } else if (bodyText && bodyText.includes("error")) {
    console.log("⚠️ Page d'erreur détectée");
  } else {
    console.log("✅ Contenu de la page semble normal");
  }
}

/**
 * Cliquer sur un élément avec plusieurs sélecteurs de fallback
 * @param {Page} page - La page Playwright
 * @param {Array} selectors - Liste des sélecteurs à essayer
 * @param {string} elementName - Nom de l'élément pour les logs
 * @param {number} timeout - Timeout pour chaque sélecteur
 */
async function clickElementWithFallback(
  page,
  selectors,
  elementName,
  timeout = 5000
) {
  console.log(`🔍 Recherche de l'élément: ${elementName}`);

  for (const selector of selectors) {
    try {
      await page.waitForSelector(selector, { timeout });
      await page.click(selector);
      console.log(`✅ ${elementName} trouvé et cliqué avec: ${selector}`);
      return true;
    } catch (error) {
      console.log(`❌ Sélecteur ${selector} non trouvé pour ${elementName}`);
    }
  }

  console.log(`❌ Aucun sélecteur trouvé pour ${elementName}`);
  return false;
}

/**
 * Ouvrir un lien dans un nouvel onglet avec gestion d'erreurs
 * @param {Page} page - La page Playwright
 * @param {BrowserContext} context - Le contexte du navigateur
 * @param {Array} selectors - Sélecteurs pour le lien
 * @param {string} linkName - Nom du lien pour les logs
 * @param {RegExp} expectedUrlPattern - Pattern attendu pour l'URL
 */
async function openLinkInNewTab(
  page,
  context,
  selectors,
  linkName,
  expectedUrlPattern
) {
  console.log(`🔍 Recherche du lien: ${linkName}`);

  for (const selector of selectors) {
    try {
      await page.waitForSelector(selector, { timeout: 5000 });

      const [newPage] = await Promise.all([
        context.waitForEvent("page", { timeout: 10000 }),
        page.click(selector),
      ]);

      console.log(`✅ Lien ${linkName} trouvé et cliqué avec: ${selector}`);

      // Vérifier la nouvelle page
      await newPage.waitForLoadState("domcontentloaded", { timeout: 15000 });

      if (expectedUrlPattern) {
        await expect(newPage).toHaveURL(expectedUrlPattern, { timeout: 10000 });
        console.log(`✅ ${linkName} ouvert: ${newPage.url()}`);
      }

      return newPage;
    } catch (error) {
      console.log(
        `❌ Erreur avec le sélecteur ${selector} pour ${linkName}: ${error.message}`
      );
    }
  }

  console.log(`❌ Impossible d'ouvrir le lien ${linkName}`);
  return null;
}

/**
 * Fermer proprement une page avec gestion d'erreurs
 * @param {Page} page - La page à fermer
 * @param {string} pageName - Nom de la page pour les logs
 */
async function closePage(page, pageName) {
  try {
    if (page && !page.isClosed()) {
      await page.close();
      console.log(`✅ Page ${pageName} fermée`);
    }
  } catch (error) {
    console.log(
      `⚠️ Erreur lors de la fermeture de ${pageName}: ${error.message}`
    );
  }
}

/**
 * Configuration de test standard avec timeout
 * @param {Test} test - Instance du test
 * @param {number} timeout - Timeout en ms
 */
function setupTestConfig(test, timeout = 45000) {
  test.setTimeout(timeout);
}

module.exports = {
  navigateToITAkademy,
  waitForPageStability,
  verifyTitle,
  performPageHealthCheck,
  clickElementWithFallback,
  openLinkInNewTab,
  closePage,
  setupTestConfig,
};
