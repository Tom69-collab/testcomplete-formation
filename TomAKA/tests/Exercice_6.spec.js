const { test, expect } = require('@playwright/test');

test('Exercice_3', async ({ page, context }) => {
  // Ouvrir le site et accéder au formulaire
  await page.goto('https://demoqa.com');
  await page.click('text=Forms');
  await page.click('text=Practice Form');

  // Remplir les champs principaux
  await page.fill('#firstName', 'Juste');
  await page.fill('#lastName', 'Leblanc');
  await page.fill('#userEmail', 'jean@leblanc.fr');
  await page.click('label[for="gender-radio-1"]'); // Male
  await page.fill('#userNumber', '1234567890');

  // Date de naissance
  await page.click('#dateOfBirthInput');
  await page.selectOption('.react-datepicker__month-select', '4'); // Mai
  await page.selectOption('.react-datepicker__year-select', '1990');
  await page.click('.react-datepicker__day--015');

  // Matière et hobbies
  await page.fill('#subjectsInput', 'Maths');
  await page.keyboard.press('Enter');
  await page.locator('label[for="hobbies-checkbox-1"]').scrollIntoViewIfNeeded();
  await page.click('label[for="hobbies-checkbox-1"]', { force: true });

  // Adresse
  await page.fill('#currentAddress', '149, rue barreyre 33300 Bordeaux');

    // 8. Re-supprimer les pubs (elles peuvent revenir dynamiquement)
  await page.evaluate(() => {
    document.querySelectorAll('#fixedban, .ads').forEach(el => el.remove());
  });

  // Soumettre (dernier clic)
  await page.click('#submit');

  // Vérifier que la modale de récapitulation est visible
  await expect(page.locator('.modal-content')).toBeVisible();

  // Fermer directement tout le navigateur 
await context.browser().close();
});


