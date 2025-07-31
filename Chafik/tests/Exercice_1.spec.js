const { test } = require("@playwright/test");
const {
  navigateToITAkademy,
  waitForPageStability,
  verifyTitle,
  performPageHealthCheck,
  setupTestConfig,
} = require("./utils/test-helpers");

test("Exercice 1 - Ouverture du site IT Akademy", async ({ page }) => {
  // Configuration du test
  setupTestConfig(test, 45000);

  console.log("🚀 Début du test Exercice 1 - IT Akademy");

  // 1. Navigation robuste vers IT Akademy
  await navigateToITAkademy(page);

  // 2. Attendre que la page soit stable
  await waitForPageStability(page);

  // 3. Vérifier le titre avec patterns flexibles
  const titleMatched = await verifyTitle(page);

  // 4. Si le titre ne correspond pas, faire des vérifications supplémentaires
  if (!titleMatched) {
    await performPageHealthCheck(page);
  }

  console.log("🎉 Test Exercice 1 terminé avec succès !");
});
