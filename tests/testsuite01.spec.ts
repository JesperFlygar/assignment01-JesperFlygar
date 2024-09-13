import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/login-page';
import { DashboardPage } from './pages/dashboard-page';

import { ViewRoomPage } from './pages/views/viewrooms-page';
import { ViewClientPage } from './pages/views/viewclients-page';
//import { ViewBillPage } from './pages/views/viewbills-page';
//import { ViewReservationPage } from './pages/views/viewreservations-page';

import { CreateRoomPage } from './pages/create/createrooms.page';
import { CreateClientPage } from './pages/create/createclients-page';
//import { CreateBillPage } from './pages/create/createbills-page';
//import { CreateReservationPage } from './pages/create/createreservations-page'; 


// const randomName = faker.person.fullName();

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto(); 
  await loginPage.preformLogin(`${process.env.TEST_USERNAME}`, (`${process.env.TEST_PASSWORD}`))
  await expect(page.getByRole('heading', { name: 'Tester Hotel Overview' })).toBeVisible();
});

test.describe('Test suite 01', () => {
  test('Test case 01', async ({ page }) => {
    const dashboardPage = new DashboardPage(page); 
    const viewRoomPage = new ViewRoomPage(page);
    const createRoomPage = new CreateRoomPage(page); 

    await viewRoomPage.performClickViewRoom();
    await expect(page.getByRole('link', { name: 'Create Room' })).toBeVisible(); 

    await createRoomPage.performCreateRoom();
    await expect(page.getByText('New Room')).toBeVisible();

    await createRoomPage.fillRoomInformation(); 
    
    dashboardPage.performLogout(); 
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible(); 
    await page.waitForTimeout(5000);
  });

  test('Test case 02', async ({ page }) => {
    const dashboardPage = new DashboardPage(page); 
    const viewClientPage = new ViewClientPage(page);
    const createClientPage = new CreateClientPage(page); 

    await viewClientPage.performClickViewClient();
    await expect(page.getByRole('link', { name: 'Create Client' })).toBeVisible(); 

    await createClientPage.performCreateClient();
    await expect(page.getByText('New Client')).toBeVisible();

    await createClientPage.fillClientInformation();
    
    dashboardPage.performLogout(); 
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible(); 
    await page.waitForTimeout(5000);
  });

  /*test('Test case 03', async ({ page }) => {
    const dashboardPage = new DashboardPage(page); 
    const viewBillPage = new ViewBillPage(page);
    const createClientPage = new CreateBillPage(page); 

    await viewBillPage.performClickViewClient();
    await expect(page.getByRole('link', { name: 'Create Client' })).toBeVisible(); 

    await createBillPage.performCreateBill();
    await expect(page.getByText('New Client')).toBeVisible();

    await createClientPage.fillBillInformation();
    
    dashboardPage.performLogout(); 
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible(); 
    await page.waitForTimeout(5000);
  });*/

})

/*test.describe('Test suite 02', () => {
  test('Test case x', async ({ page }) => {
    
    
  });
})*/

/*test.describe('Test suite 01', () => {
  test('Test case 01', async ({ page }) => {
    
    
  });
})*/