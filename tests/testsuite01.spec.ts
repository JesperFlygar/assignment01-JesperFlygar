import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/login-page';
import { DashboardPage } from './pages/dashboard-page';
import { ViewRoomPage } from './pages/views/viewrooms-page'
import { CreateRoomPage } from './pages/create/createrooms.page'
import { faker } from '@faker-js/faker';

// const randomName = faker.person.fullName();

test.describe('Test suite 01', () => {
  test('Test case 01', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page); 
    const viewRoomPage = new ViewRoomPage(page);
    const createRoomPage = new CreateRoomPage(page); 

    await loginPage.goto(); 
    await loginPage.preformLogin(`${process.env.TEST_USERNAME}`, (`${process.env.TEST_PASSWORD}`))
    await expect(page.getByRole('heading', { name: 'Tester Hotel Overview' })).toBeVisible();

    await viewRoomPage.performClickViewRoom();
    await expect(page.getByRole('link', { name: 'Create Room' })).toBeVisible(); 

    await createRoomPage.performCreateRoom();
    await expect(page.getByText('New Room')).toBeVisible();

    //create one for every view and create? do i fill in the fields with faker? or 
    
    dashboardPage.performLogout(); 
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible(); 
    await page.waitForTimeout(5000);
  });
})