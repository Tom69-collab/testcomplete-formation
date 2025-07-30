const { test, expect } = require('@playwright/test');

test('Étape 3 - Champs dynamiques', async ({ page }) => {
  await page.goto('https://demoqa.com/automation-practice-form');
  await page.click('#dateOfBirthInput');
  await page.selectOption('.react-datepicker__month-select', '4');
  await page.selectOption('.react-datepicker__year-select', '1990');
  await page.click('.react-datepicker__day--015');
  await page.fill('#subjectsInput', 'Maths');
  await page.keyboard.press('Enter');
  await page.click('label[for="hobbies-checkbox-1"]', { force: true });
});