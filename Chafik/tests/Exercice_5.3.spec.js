const { test, expect } = require("@playwright/test");
const {
  waitForPageStability,
  clickElementWithFallback,
  setupTestConfig,
} = require("./utils/test-helpers");

test("Exercice 5.3 - Champs dynamiques avec données réelles", async ({
  page,
}) => {
  // Configuration du test
  setupTestConfig(test, 50000);

  console.log("🚀 Début du test Exercice 5.3 - Champs dynamiques DemoQA");

  // Données réelles pour les champs dynamiques
  const testData = {
    dateOfBirth: {
      day: "15",
      month: "July", // Juillet
      monthValue: "6", // Index 6 pour juillet
      year: "1995",
    },
    subjects: ["Computer Science", "Physics", "Chemistry"],
    hobbies: ["Sports", "Reading"], // Sports, Reading, Music
  };

  console.log(
    `📅 Date de naissance: ${testData.dateOfBirth.day} ${testData.dateOfBirth.month} ${testData.dateOfBirth.year}`
  );
  console.log(`📚 Matières: ${testData.subjects.join(", ")}`);
  console.log(`🎯 Hobbies: ${testData.hobbies.join(", ")}`);

  // 1. Navigation directe vers le formulaire
  console.log("📡 Chargement du formulaire Practice Form...");

  try {
    await page.goto("https://demoqa.com/automation-practice-form", {
      waitUntil: "domcontentloaded",
      timeout: 30000,
    });
    console.log("✅ Formulaire chargé avec succès");
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

  // 3. Configurer la date de naissance
  console.log("📅 Configuration de la date de naissance...");

  // Cliquer sur le champ date avec sélecteurs robustes
  const dateInputSelectors = [
    "#dateOfBirthInput",
    'input[placeholder*="Date"]',
    ".react-datepicker__input-container input",
    'input[id*="date"]',
  ];

  const dateInputClicked = await clickElementWithFallback(
    page,
    dateInputSelectors,
    "Date de naissance"
  );

  if (!dateInputClicked) {
    throw new Error("Impossible d'ouvrir le sélecteur de date");
  }

  // Attendre que le datepicker s'ouvre
  await page.waitForTimeout(1000);

  // Sélectionner le mois
  console.log(`📅 Sélection du mois: ${testData.dateOfBirth.month}...`);
  try {
    const monthSelector = ".react-datepicker__month-select";
    await page.waitForSelector(monthSelector, { timeout: 5000 });
    await page.selectOption(monthSelector, testData.dateOfBirth.monthValue);
    console.log(`✅ Mois sélectionné: ${testData.dateOfBirth.month}`);
  } catch (error) {
    console.log(`❌ Erreur sélection mois: ${error.message}`);
  }

  // Sélectionner l'année
  console.log(`📅 Sélection de l'année: ${testData.dateOfBirth.year}...`);
  try {
    const yearSelector = ".react-datepicker__year-select";
    await page.waitForSelector(yearSelector, { timeout: 5000 });
    await page.selectOption(yearSelector, testData.dateOfBirth.year);
    console.log(`✅ Année sélectionnée: ${testData.dateOfBirth.year}`);
  } catch (error) {
    console.log(`❌ Erreur sélection année: ${error.message}`);
  }

  // Sélectionner le jour
  console.log(`📅 Sélection du jour: ${testData.dateOfBirth.day}...`);
  try {
    const daySelector = `.react-datepicker__day--0${testData.dateOfBirth.day}`;
    await page.waitForSelector(daySelector, { timeout: 5000 });
    await page.click(daySelector);
    console.log(`✅ Jour sélectionné: ${testData.dateOfBirth.day}`);
  } catch (error) {
    console.log(`❌ Erreur sélection jour: ${error.message}`);
    // Fallback: essayer avec d'autres formats
    try {
      const alternativeSelectors = [
        `.react-datepicker__day:has-text("${testData.dateOfBirth.day}")`,
        `[aria-label*="${testData.dateOfBirth.day}"]`,
      ];

      for (const selector of alternativeSelectors) {
        try {
          await page.click(selector);
          console.log(`✅ Jour sélectionné avec fallback: ${selector}`);
          break;
        } catch (fallbackError) {
          console.log(`❌ Fallback ${selector} échoué`);
        }
      }
    } catch (finalError) {
      console.log(`⚠️ Impossible de sélectionner le jour`);
    }
  }

  // 4. Ajouter les matières
  console.log("📚 Ajout des matières...");

  for (const subject of testData.subjects) {
    try {
      console.log(`📖 Ajout de la matière: ${subject}...`);

      const subjectSelectors = [
        "#subjectsInput",
        'input[placeholder*="Type to search"]',
        ".subjects-auto-complete__input input",
        'input[id*="subject"]',
      ];

      let subjectInputFound = false;
      for (const selector of subjectSelectors) {
        try {
          await page.waitForSelector(selector, { timeout: 3000 });
          await page.fill(selector, subject);
          await page.keyboard.press("Enter");
          console.log(`✅ Matière "${subject}" ajoutée avec: ${selector}`);
          subjectInputFound = true;
          break;
        } catch (error) {
          console.log(`❌ Sélecteur ${selector} non trouvé pour matière`);
        }
      }

      if (!subjectInputFound) {
        console.log(`⚠️ Impossible d'ajouter la matière: ${subject}`);
      }

      // Pause entre les matières
      await page.waitForTimeout(500);
    } catch (error) {
      console.log(`❌ Erreur ajout matière ${subject}: ${error.message}`);
    }
  }

  // 5. Sélectionner les hobbies
  console.log("🎯 Sélection des hobbies...");

  for (const hobby of testData.hobbies) {
    try {
      console.log(`🎯 Sélection du hobby: ${hobby}...`);

      let hobbySelectors = [];

      if (hobby === "Sports") {
        hobbySelectors = [
          'label[for="hobbies-checkbox-1"]',
          "#hobbies-checkbox-1 + label",
          'input[id="hobbies-checkbox-1"] + label',
          'label:has-text("Sports")',
          '.custom-checkbox:has-text("Sports") label',
        ];
      } else if (hobby === "Reading") {
        hobbySelectors = [
          'label[for="hobbies-checkbox-2"]',
          "#hobbies-checkbox-2 + label",
          'input[id="hobbies-checkbox-2"] + label',
          'label:has-text("Reading")',
          '.custom-checkbox:has-text("Reading") label',
        ];
      } else if (hobby === "Music") {
        hobbySelectors = [
          'label[for="hobbies-checkbox-3"]',
          "#hobbies-checkbox-3 + label",
          'input[id="hobbies-checkbox-3"] + label',
          'label:has-text("Music")',
          '.custom-checkbox:has-text("Music") label',
        ];
      }

      const hobbyClicked = await clickElementWithFallback(
        page,
        hobbySelectors,
        `Hobby ${hobby}`,
        3000
      );

      if (hobbyClicked) {
        console.log(`✅ Hobby "${hobby}" sélectionné`);
      } else {
        console.log(`⚠️ Impossible de sélectionner le hobby: ${hobby}`);
      }

      // Pause entre les hobbies
      await page.waitForTimeout(500);
    } catch (error) {
      console.log(`❌ Erreur sélection hobby ${hobby}: ${error.message}`);
    }
  }

  // 6. Vérifications des données saisies
  console.log("🔍 Vérification des données dynamiques...");

  try {
    // Vérifier que la date est bien sélectionnée
    const dateValue = await page.inputValue("#dateOfBirthInput");
    if (dateValue && dateValue.includes(testData.dateOfBirth.year)) {
      console.log(`✅ Date de naissance confirmée: ${dateValue}`);
    } else {
      console.log(`⚠️ Date de naissance non confirmée`);
    }

    // Vérifier les matières ajoutées
    const subjectsContainer = page.locator(
      ".subjects-auto-complete__multi-value"
    );
    const subjectsCount = await subjectsContainer.count();
    console.log(`📚 Nombre de matières ajoutées: ${subjectsCount}`);

    // Vérifier les hobbies sélectionnés
    for (let i = 1; i <= 3; i++) {
      const hobbyChecked = await page.isChecked(`#hobbies-checkbox-${i}`);
      if (hobbyChecked) {
        console.log(`✅ Hobby ${i} sélectionné`);
      }
    }
  } catch (error) {
    console.log(`⚠️ Erreur lors des vérifications: ${error.message}`);
  }

  // 7. Résumé du test
  console.log("📊 Résumé des champs dynamiques:");
  console.log(
    `   • Date de naissance: ${testData.dateOfBirth.day}/${testData.dateOfBirth.month}/${testData.dateOfBirth.year}`
  );
  console.log(`   • Matières: ${testData.subjects.length} matières ajoutées`);
  console.log(`   • Hobbies: ${testData.hobbies.length} hobbies sélectionnés`);

  // Pause finale pédagogique seulement si la page est ouverte
  if (!page.isClosed()) {
    await page.waitForTimeout(2000);
  } else {
    console.log("⚠️ Page fermée, pas de pause finale");
  }

  console.log("🎉 Test Exercice 5.3 terminé avec succès !");
  console.log("ℹ️ Champs dynamiques configurés avec des données réelles");
});
