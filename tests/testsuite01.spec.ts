import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/login-page';
import { DashboardPage } from './pages/dashboard-page';
import { ViewPage } from './pages/view-page'; 
import { CreatePage } from './pages/create-page'; 
import { DeletePage } from './pages/delete-page'; 
import { EditPage } from './pages/edit-page'; 

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto(); 
  await loginPage.preformLogin(`${process.env.TEST_USERNAME}`, (`${process.env.TEST_PASSWORD}`))
  await expect(page.getByRole('heading', { name: 'Tester Hotel Overview' })).toBeVisible();
});

test.afterEach(async ({ page }) => {
    const dashboardPage = new DashboardPage(page); 
    dashboardPage.performLogout(); 
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible(); 
    await page.waitForTimeout(5000);
})

test.describe('Create', () => {
  test('Create Room', async ({ page }) => {
    const viewPage = new ViewPage(page, /^RoomsNumber: 2View$/ );
    const createPage = new CreatePage(page, 'Create Room'); 

    await viewPage.performClickView();
    await expect(page.getByRole('link', { name: 'Create Room' })).toBeVisible(); 

    await createPage.performCreate();
    await expect(page.getByText('New Room')).toBeVisible();

    await createPage.fillRoomInformation(); 
  });

  test('Create Client', async ({ page }) => { 
    const viewPage = new ViewPage(page, /^ClientsNumber: 2View$/ );
    const createPage = new CreatePage(page, 'Create Client'); 

    await viewPage.performClickView();
    await expect(page.getByRole('link', { name: 'Create Client' })).toBeVisible(); 

    await createPage.performCreate();
    await expect(page.getByText('New Client')).toBeVisible();

    await createPage.fillClientInformation();
  });

    test('Create Bill', async ({ page }) => {
    const viewPage = new ViewPage(page, /^BillsTotal: 1 \(4500kr\)Paid: 0 \(0kr\)View$/ );
    const createPage = new CreatePage(page, 'Create Bill'); 

    await viewPage.performClickView();
    await expect(page.getByRole('link', { name: 'Create Bill' })).toBeVisible(); 

    await createPage.performCreate();
    await expect(page.getByText('New Bill')).toBeVisible();

    await createPage.fillBillInformation();
  });

  test('Create Reservation', async ({ page }) => {
    const viewPage = new ViewPage(page, /^ReservationsTotal: 1Current: 0View$/ );
    const createPage = new CreatePage(page, 'Create Reservation'); 

    await viewPage.performClickView();
    await expect(page.getByRole('link', { name: 'Create Reservation' })).toBeVisible(); 

    await createPage.performCreate();
    await expect(page.getByText('New Reservation')).toBeVisible();

    await createPage.fillReservationInformation(); 
  });
})

test.describe('Delete', () => {
  test('Delete Room', async ({ page }) => {
    const viewPage = new ViewPage(page, /^RoomsNumber: 2View$/ );
    const deleteRoomPage = new DeletePage(page, 1); 

    await viewPage.performClickView();
    await expect(page.getByRole('link', { name: 'Create Room' })).toBeVisible(); 

    await deleteRoomPage.performDelete(); 
  });

  test('Delete Client', async ({ page }) => {
    const viewPage = new ViewPage(page, /^ClientsNumber: 2View$/ );
    const deleteClientPage = new DeletePage(page, 1); 

    await viewPage.performClickView();
    await expect(page.getByRole('link', { name: 'Create Client' })).toBeVisible();

    await deleteClientPage.performDelete(); 
  });

  test('Delete Bill', async ({ page }) => {
    const viewPage = new ViewPage(page, /^BillsTotal: 1 \(4500kr\)Paid: 0 \(0kr\)View$/ );
    const deleteBillPage = new DeletePage(page, 0); 

    await viewPage.performClickView();
     await expect(page.getByRole('link', { name: 'Create Bill' })).toBeVisible(); 

    await deleteBillPage.performDelete(); 
  });

  test('Delete Reservation', async ({ page }) => {
    const viewPage = new ViewPage(page, /^ReservationsTotal: 1Current: 0View$/ );
    const deleteReservationPage = new DeletePage(page, 0); 

    await viewPage.performClickView();
    await expect(page.getByRole('link', { name: 'Create Reservation' })).toBeVisible(); 

    await deleteReservationPage.performDelete(); 
  });
})

test.describe('Edit', () => {
  test('Edit Client', async ({ page }) => {
    const viewPage = new ViewPage(page, /^ClientsNumber: 2View$/ );
    const editPage = new EditPage(page, 2); 

    await viewPage.performClickView();
    await expect(page.getByRole('link', { name: 'Create Client' })).toBeVisible(); 

    await editPage.enterEdit(); 
    await expect(page.getByText('Client:')).toBeVisible();
    
    await editPage.preformEditClient(); 
    await expect(page.getByText('Clients')).toBeVisible(); 
  });

  test('Edit Bill', async ({ page }) => {
    const viewPage = new ViewPage(page, /^BillsTotal: 1 \(4500kr\)Paid: 0 \(0kr\)View$/ );
    const editPage = new EditPage(page, 1); 

    await viewPage.performClickView();
    await expect(page.getByRole('link', { name: 'Create Bill' })).toBeVisible(); 

    await editPage.enterEdit(); 
    await expect(page.getByText('Bill:')).toBeVisible();
    
    await editPage.preformEditBill(); 
    await expect(page.getByText('Bills')).toBeVisible(); 
  });
})