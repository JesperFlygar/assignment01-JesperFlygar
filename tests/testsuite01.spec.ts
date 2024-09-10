import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

// const randomName = faker.person.fullName();

test.describe('Test suite 01', () => {
  test('Test case 01', async ({ page }) => {
    await page.goto(`${process.env.BASE_URL}`);
    await expect(page.getByRole('link', { name: 'Tester Hotel' })).toBeVisible();
    
    await page.locator('input[type="text"]').fill(`${process.env.TEST_USERNAME}`);
    await page.locator('input[type="password"]').fill(`${process.env.TEST_PASSWORD}`);
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByRole('heading', { name: 'Tester Hotel Overview' })).toBeVisible();

    await page.getByRole('button', { name: 'Logout' }).click();
    await expect(page.getByRole('link', { name: 'Tester Hotel' })).toBeVisible();
    await page.waitForTimeout(2000); 
  });
});







/*test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/'); 
  await page.goto('http://localhost:3000/login');
  await page.locator('input[type="text"]').click();
  await page.locator('input[type="text"]').fill('tester01');
  await page.locator('input[type="password"]').click();
  await page.locator('input[type="password"]').fill('GteteqbQQgSr88SwNExUQv2ydb7xuf8c');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.locator('div').filter({ hasText: /^RoomsNumber: 3View$/ }).getByRole('link').click();
  await page.getByRole('link', { name: 'Create Room' }).click();
  await page.getByRole('combobox').selectOption('single');
  await page.locator('div').filter({ hasText: /^Number$/ }).getByRole('spinbutton').click();
  await page.locator('div').filter({ hasText: /^Number$/ }).getByRole('spinbutton').fill('');
  await page.locator('div').filter({ hasText: /^Floor$/ }).getByRole('spinbutton').click();
  await page.locator('div').filter({ hasText: /^Floor$/ }).getByRole('spinbutton').fill('2');
  await page.locator('.checkbox').click();
  await page.locator('div').filter({ hasText: /^Price$/ }).getByRole('spinbutton').click();
  await page.locator('div').filter({ hasText: /^Price$/ }).getByRole('spinbutton').fill('70000');
  await page.getByRole('listbox').selectOption('balcony');
  await page.getByText('Save').click();
  await page.getByRole('link', { name: 'Back' }).click();
  await page.locator('div').filter({ hasText: /^ClientsNumber: 2View$/ }).getByRole('link').click();
  await page.getByRole('link', { name: 'Back' }).click();
  await page.locator('div').filter({ hasText: /^BillsTotal: 1 \(4500kr\)Paid: 0 \(0kr\)View$/ }).getByRole('link').click();
  await page.getByRole('link', { name: 'Back' }).click();
  await page.locator('div').filter({ hasText: /^ReservationsTotal: 1Current: 0View$/ }).getByRole('link').click();
  await page.getByRole('link', { name: 'Back' }).click();
  await page.getByRole('button', { name: 'Logout' }).click();
});*/
