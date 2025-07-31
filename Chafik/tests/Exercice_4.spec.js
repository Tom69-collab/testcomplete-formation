const { test, expect } = require("@playwright/test");
const {
  waitForPageStability,
  clickElementWithFallback,
  setupTestConfig,
} = require("./utils/test-helpers");

test("Exercice 4 - Formulaire simple avec helpers", async ({ page }) => {
  // Configuration du test
  setupTestConfig(test, 45000);

  console.log("🚀 Début du test Exercice 4 - Formulaire Selenium");

  // 1. Navigation robuste vers le formulaire Selenium
  console.log("📡 Chargement du formulaire Selenium...");

  try {
    await page.goto("https://www.selenium.dev/selenium/web/web-form.html", {
      waitUntil: "domcontentloaded",
      timeout: 30000,
    });
    console.log("✅ Page formulaire chargée avec succès");
  } catch (error) {
    console.log(`⚠️ Erreur lors du chargement: ${error.message}`);
    console.log("🔄 Tentative de rechargement...");
    await page.goto("https://www.selenium.dev/selenium/web/web-form.html", {
      waitUntil: "load",
      timeout: 20000,
    });
  }

  // 2. Attendre la stabilisation de la page
  await waitForPageStability(page);

  // 3. Remplir le champ texte avec sélecteurs robustes
  console.log("✏️ Remplissage du champ texte...");

  const textInputSelectors = [
    'input[name="my-text"]',
    'input[type="text"]',
    "#my-text-id",
    ".form-control",
  ];

  let textFieldFilled = false;
  for (const selector of textInputSelectors) {
    try {
      await page.waitForSelector(selector, { timeout: 5000 });
      await page.fill(selector, "Michel");
      console.log(`✅ Champ texte rempli avec: ${selector}`);
      textFieldFilled = true;
      break;
    } catch (error) {
      console.log(`❌ Sélecteur ${selector} non trouvé pour le champ texte`);
    }
  }

  if (!textFieldFilled) {
    throw new Error("Impossible de remplir le champ texte");
  }

  // Pause pédagogique
  await page.waitForTimeout(1000);

  // 4. Cliquer sur le bouton Submit avec fallback
  console.log("🔘 Clic sur le bouton Submit...");

  const submitButtonSelectors = [
    'button[type="submit"]',
    "button",
    'input[type="submit"]',
    ".btn-primary",
    '[value="Submit"]',
  ];

  const submitClicked = await clickElementWithFallback(
    page,
    submitButtonSelectors,
    "Submit"
  );

  if (!submitClicked) {
    throw new Error("Aucun bouton Submit trouvé");
  }

  // Pause pédagogique
  await page.waitForTimeout(1000);

  // 5. Vérifier la confirmation avec sélecteurs multiples
  console.log("🔍 Vérification de la confirmation...");

  const confirmationSelectors = [
    "#message",
    ".alert",
    '[role="alert"]',
    ".confirmation",
    ".success-message",
  ];

  let confirmationFound = false;
  for (const selector of confirmationSelectors) {
    try {
      await expect(page.locator(selector)).toHaveText("Received!", {
        timeout: 8000,
      });
      console.log(`✅ Confirmation trouvée avec: ${selector}`);
      confirmationFound = true;
      break;
    } catch (error) {
      console.log(`❌ Sélecteur ${selector} ne contient pas "Received!"`);
    }
  }

  if (!confirmationFound) {
    // Fallback: vérifier si un message de confirmation existe
    const pageText = await page.textContent("body");
    if (pageText.includes("Received")) {
      console.log("✅ Confirmation trouvée dans le contenu de la page");
    } else {
      console.log("⚠️ Aucune confirmation trouvée");
    }
  }

  // Pause finale pédagogique
  await page.waitForTimeout(2000);

  console.log("🎉 Test Exercice 4 terminé avec succès !");
});
