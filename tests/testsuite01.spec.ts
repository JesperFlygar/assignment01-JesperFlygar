import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/login-page';
import { DashboardPage } from './pages/dashboard-page';

import { ViewRoomPage } from './pages/views/viewrooms-page';
import { ViewClientPage } from './pages/views/viewclients-page';
import { ViewBillPage } from './pages/views/viewbills-page';
import { ViewReservationPage } from './pages/views/viewreservations-page';

import { CreateRoomPage } from './pages/create/createrooms.page';
import { CreateClientPage } from './pages/create/createclients-page';
import { CreateBillPage } from './pages/create/createbills-page';
import { CreateReservationPage } from './pages/create/createreservations-page'; 

import { DeleteRoomPage } from './pages/Delete/deleterooms-page'; 
import { DeleteClientPage } from './pages/Delete/deleteclients-page';
import { DeleteBillPage } from './pages/Delete/deletebills-page';
import { DeleteReservationPage } from './pages/Delete/deletereservations-page';

import { EditClientPage } from './pages/Edit/editclients-page';
import { EditBillPage } from './pages/Edit/editbills-page';

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto(); 
  await loginPage.preformLogin(`${process.env.TEST_USERNAME}`, (`${process.env.TEST_PASSWORD}`))
  await expect(page.getByRole('heading', { name: 'Tester Hotel Overview' })).toBeVisible();
});

/*test.afterEach(async ({ page }) => {
    const dashboardPage = new DashboardPage(page); 
    dashboardPage.performLogout(); 
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible(); 
    await page.waitForTimeout(5000);
})*/

test.describe('Create', () => {
  test('Create Room', async ({ page }) => {
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

  test('Create Client', async ({ page }) => {
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

    test('Create Bill', async ({ page }) => {
    const dashboardPage = new DashboardPage(page); 
    const viewBillPage = new ViewBillPage(page);
    const createBillPage = new CreateBillPage(page); 

    await viewBillPage.performClickViewBill();
    await expect(page.getByRole('link', { name: 'Create Bill' })).toBeVisible(); 

    await createBillPage.performCreateBill();
    await expect(page.getByText('New Bill')).toBeVisible();

    await createBillPage.fillBillInformation();

    dashboardPage.performLogout(); 
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible(); 
    await page.waitForTimeout(5000);
  });

  test('Create Reservation', async ({ page }) => {
    const dashboardPage = new DashboardPage(page); 
    const viewReservationPage = new ViewReservationPage(page);
    const createReservationPage = new CreateReservationPage(page); 

    await viewReservationPage.performClickViewReservation();
    await expect(page.getByRole('link', { name: 'Create Reservation' })).toBeVisible(); 

    await createReservationPage.performCreateReservation();
    await expect(page.getByText('New Reservation')).toBeVisible();

    await createReservationPage.fillReservationInformation();

    dashboardPage.performLogout(); 
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible(); 
    await page.waitForTimeout(5000);
  });
})

test.describe('Delete', () => {
  test('Delete Room', async ({ page }) => {
    const dashboardPage = new DashboardPage(page); 
    const viewRoomPage = new ViewRoomPage(page);
    const deleteRoomPage = new DeleteRoomPage(page); 

    await viewRoomPage.performClickViewRoom();
    await expect(page.getByRole('link', { name: 'Create Room' })).toBeVisible(); 

    await deleteRoomPage.performDeleteRoom(); 

    dashboardPage.performLogout(); 
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible(); 
    await page.waitForTimeout(5000);
  });

  test('Delete Client', async ({ page }) => {
    const dashboardPage = new DashboardPage(page); 
    const viewClientPage = new ViewClientPage(page);
    const deleteClientPage = new DeleteClientPage(page); 

    await viewClientPage.performClickViewClient();
    await expect(page.getByRole('link', { name: 'Create Client' })).toBeVisible();

    await deleteClientPage.performDeleteClient(); 

    dashboardPage.performLogout(); 
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible(); 
    await page.waitForTimeout(5000);
  });

  test('Delete Bill', async ({ page }) => {
    const dashboardPage = new DashboardPage(page); 
    const viewBillPage = new ViewBillPage(page);
    const deleteBillPage = new DeleteBillPage(page); 

    await viewBillPage.performClickViewBill();
     await expect(page.getByRole('link', { name: 'Create Bill' })).toBeVisible(); 

    await deleteBillPage.performDeleteBill(); 

    dashboardPage.performLogout(); 
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible(); 
    await page.waitForTimeout(5000);
  });

  test('Delete Reservation', async ({ page }) => {
    const dashboardPage = new DashboardPage(page); 
    const viewReservationPage = new ViewReservationPage(page);
    const deleteReservationPage = new DeleteReservationPage(page); 

    await viewReservationPage.performClickViewReservation();
    await expect(page.getByRole('link', { name: 'Create Reservation' })).toBeVisible(); 

    await deleteReservationPage.performDeleteReservation(); 

    dashboardPage.performLogout(); 
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible(); 
    await page.waitForTimeout(5000);
  });
})

test.describe('Edit', () => {
  test('Edit Client', async ({ page }) => {
    const dashboardPage = new DashboardPage(page); 
    const viewRoomPage = new ViewClientPage(page);
    const editClientPage = new EditClientPage(page); 

    await viewRoomPage.performClickViewClient();
    await expect(page.getByRole('link', { name: 'Create Client' })).toBeVisible(); 

    await editClientPage.enterEditClient(); 
    await expect(page.getByText('Client:')).toBeVisible();
    
    await editClientPage.preformEditClient(); 
    await expect(page.getByText('Clients')).toBeVisible(); 

    dashboardPage.performLogout(); 
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible(); 
    await page.waitForTimeout(5000);
  });

  test('Edit Bill', async ({ page }) => {
    const dashboardPage = new DashboardPage(page); 
    const viewBillPage = new ViewBillPage(page);
    const editBillPage = new EditBillPage(page); 

    await viewBillPage.performClickViewBill();
    await expect(page.getByRole('link', { name: 'Create Bill' })).toBeVisible(); 

    await editBillPage.enterEditBill(); 
    await expect(page.getByText('Bill:')).toBeVisible();
    
    await editBillPage.preformEditBill(); 
    await expect(page.getByText('Bills')).toBeVisible(); 

    dashboardPage.performLogout(); 
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible(); 
    await page.waitForTimeout(5000);
  });
})