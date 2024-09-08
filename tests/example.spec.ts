import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
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
});

/*import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});*/
