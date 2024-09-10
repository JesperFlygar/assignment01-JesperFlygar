import { test, expect } from '@playwright/test';
import {LoginPage} from './pages/login-page';
import { DashboardPage } from './pages/dashboard-page';
import { faker } from '@faker-js/faker';

// const randomName = faker.person.fullName();

test.describe('Test suite 01', () => {
  test('Test case 01', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page); 

    await loginPage.goto(); 
    await loginPage.preformLogin(`${process.env.TEST_USERNAME}`, (`${process.env.TEST_PASSWORD}`))
    await expect(page.getByRole('heading', { name: 'Tester Hotel Overview' })).toBeVisible();
    
    dashboardPage.performLogout(); 
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible(); 
    await page.waitForTimeout(5000);

    /*
    await page.goto(`${process.env.BASE_URL}`);
    await expect(page.getByRole('link', { name: 'Tester Hotel' })).toBeVisible();
    
    await page.locator('input[type="text"]').fill(`${process.env.TEST_USERNAME}`);
    await page.locator('input[type="password"]').fill(`${process.env.TEST_PASSWORD}`);
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByRole('heading', { name: 'Tester Hotel Overview' })).toBeVisible();

    await page.getByRole('button', { name: 'Logout' }).click();
    await expect(page.getByRole('link', { name: 'Tester Hotel' })).toBeVisible();
    await page.waitForTimeout(2000); */
  });
})