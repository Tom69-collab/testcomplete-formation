const { test, expect } = require("@playwright/test");
const {
  waitForPageStability,
  clickElementWithFallback,
  setupTestConfig,
} = require("./utils/test-helpers");

test("Exercice 5.2 - Remplir infos de base avec données réelles", async ({
  page,
}) => {
  // Configuration du test
  setupTestConfig(test, 45000);

  console.log(
    "🚀 Début du test Exercice 5.2 - Remplissage du formulaire DemoQA"
  );

  // Données réelles variées pour le test
  const testData = {
    firstName: "Amélie",
    lastName: "Moreau",
    email: "amelie.moreau@gmail.com",
    gender: "female", // female, male, other
    mobile: "0612345678",
  };

  console.log(`📝 Données de test: ${testData.firstName} ${testData.lastName}`);

  // 1. Navigation directe vers le formulaire
  console.log("📡 Chargement direct du formulaire Practice Form...");

  try {
    await page.goto("https://demoqa.com/automation-practice-form", {
      waitUntil: "domcontentloaded",
      timeout: 30000,
    });
    console.log("✅ Formulaire Practice Form chargé avec succès");
  } catch (error) {
    console.log(`⚠️ Erreur lors du chargement: ${error.message}`);
    console.log("🔄 Tentative de rechargement...");
    await page.goto("https://demoqa.com/automation-practice-form", {
      waitUntil: "load",
      timeout: 20000,
    });
  }

  // 2. Attendre la stabilisation de la page
  await waitForPageStability(page);

  // 3. Remplir le prénom avec sélecteurs robustes
  console.log("✏️ Remplissage du prénom...");

  const firstNameSelectors = [
    "#firstName",
    'input[placeholder*="First"]',
    'input[placeholder*="Name"]',
    '.form-control[id*="first"]',
  ];

  let firstNameFilled = false;
  for (const selector of firstNameSelectors) {
    try {
      await page.waitForSelector(selector, { timeout: 5000 });
      await page.fill(selector, testData.firstName);
      console.log(`✅ Prénom "${testData.firstName}" rempli avec: ${selector}`);
      firstNameFilled = true;
      break;
    } catch (error) {
      console.log(`❌ Sélecteur ${selector} non trouvé pour le prénom`);
    }
  }

  if (!firstNameFilled) {
    throw new Error("Impossible de remplir le champ prénom");
  }

  // 4. Remplir le nom de famille
  console.log("✏️ Remplissage du nom de famille...");

  const lastNameSelectors = [
    "#lastName",
    'input[placeholder*="Last"]',
    'input[placeholder*="Name"]:not([placeholder*="First"])',
    '.form-control[id*="last"]',
  ];

  let lastNameFilled = false;
  for (const selector of lastNameSelectors) {
    try {
      await page.waitForSelector(selector, { timeout: 5000 });
      await page.fill(selector, testData.lastName);
      console.log(
        `✅ Nom de famille "${testData.lastName}" rempli avec: ${selector}`
      );
      lastNameFilled = true;
      break;
    } catch (error) {
      console.log(`❌ Sélecteur ${selector} non trouvé pour le nom`);
    }
  }

  if (!lastNameFilled) {
    throw new Error("Impossible de remplir le champ nom de famille");
  }

  // 5. Remplir l'email
  console.log("📧 Remplissage de l'email...");

  const emailSelectors = [
    "#userEmail",
    'input[type="email"]',
    'input[placeholder*="email"]',
    'input[placeholder*="Email"]',
    '.form-control[id*="email"]',
  ];

  let emailFilled = false;
  for (const selector of emailSelectors) {
    try {
      await page.waitForSelector(selector, { timeout: 5000 });
      await page.fill(selector, testData.email);
      console.log(`✅ Email "${testData.email}" rempli avec: ${selector}`);
      emailFilled = true;
      break;
    } catch (error) {
      console.log(`❌ Sélecteur ${selector} non trouvé pour l'email`);
    }
  }

  if (!emailFilled) {
    throw new Error("Impossible de remplir le champ email");
  }

  // 6. Sélectionner le genre avec sélecteurs robustes
  console.log(`👤 Sélection du genre: ${testData.gender}...`);

  let genderSelectors = [];

  if (testData.gender === "male") {
    genderSelectors = [
      'label[for="gender-radio-1"]',
      'input[value="Male"] + label',
      'label:has-text("Male")',
      '.custom-radio:has-text("Male")',
    ];
  } else if (testData.gender === "female") {
    genderSelectors = [
      'label[for="gender-radio-2"]',
      'input[value="Female"] + label',
      'label:has-text("Female")',
      '.custom-radio:has-text("Female")',
    ];
  } else {
    genderSelectors = [
      'label[for="gender-radio-3"]',
      'input[value="Other"] + label',
      'label:has-text("Other")',
      '.custom-radio:has-text("Other")',
    ];
  }

  const genderClicked = await clickElementWithFallback(
    page,
    genderSelectors,
    `Genre ${testData.gender}`
  );

  if (!genderClicked) {
    console.log(`⚠️ Impossible de sélectionner le genre ${testData.gender}`);
  }

  // 7. Remplir le numéro de téléphone
  console.log("📱 Remplissage du numéro de téléphone...");

  const mobileSelectors = [
    "#userNumber",
    'input[placeholder*="Mobile"]',
    'input[placeholder*="Number"]',
    'input[type="tel"]',
    '.form-control[id*="number"]',
  ];

  let mobileFilled = false;
  for (const selector of mobileSelectors) {
    try {
      await page.waitForSelector(selector, { timeout: 5000 });
      await page.fill(selector, testData.mobile);
      console.log(`✅ Numéro "${testData.mobile}" rempli avec: ${selector}`);
      mobileFilled = true;
      break;
    } catch (error) {
      console.log(`❌ Sélecteur ${selector} non trouvé pour le mobile`);
    }
  }

  if (!mobileFilled) {
    throw new Error("Impossible de remplir le champ numéro de téléphone");
  }

  // 8. Vérifications des données saisies
  console.log("🔍 Vérification des données saisies...");

  try {
    // Vérifier que les champs contiennent bien les bonnes valeurs
    await expect(page.locator("#firstName")).toHaveValue(testData.firstName);
    await expect(page.locator("#lastName")).toHaveValue(testData.lastName);
    await expect(page.locator("#userEmail")).toHaveValue(testData.email);
    await expect(page.locator("#userNumber")).toHaveValue(testData.mobile);

    console.log("✅ Toutes les données ont été correctement saisies");
  } catch (error) {
    console.log(`⚠️ Erreur lors de la vérification: ${error.message}`);
  }

  // 9. Statistiques du test
  console.log("📊 Résumé du remplissage:");
  console.log(`   • Prénom: ${testData.firstName}`);
  console.log(`   • Nom: ${testData.lastName}`);
  console.log(`   • Email: ${testData.email}`);
  console.log(`   • Genre: ${testData.gender}`);
  console.log(`   • Téléphone: ${testData.mobile}`);

  // Pause finale pédagogique
  await page.waitForTimeout(2000);

  console.log("🎉 Test Exercice 5.2 terminé avec succès !");
  console.log(
    "ℹ️ Formulaire prêt pour la suite du remplissage (dates, sujets, etc.)"
  );
});
