import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/folder/login-page';
import { DashboardPage } from './pages/folder/dashboard-page';

import { ViewRoomPage } from './view_room_page';
import { ViewClientPage } from './view_client_page';
import { ViewBillPage } from './view_bill_page';
import { ViewReservationPage } from './view_reservation_page';

import { CreateRoomPage } from './create_room_page';
import { CreateClientPage } from './create_client_page';
import { CreateBillPage } from './create_bill_page';
import { CreateReservationPage } from './create_reservation_page';

import { EditClientPage } from './edit_client_page';
import { EditBillPage } from './edit_bill_page';

import { DeleteRoomPage } from './delete_room_page';
import { DeleteClientPage } from './delete_client_page';
import { DeleteBillPage } from './delete_bill_page';
import { DeleteReservationPage } from './delete_reservation_page';

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
})

test.describe('Create', () => {
  test('Create Room', async ({ page }) => {
    const viewPage = new ViewRoomPage(page); 
    const createPage = new CreateRoomPage(page);

    await viewPage.performClickView();
    await expect(page.getByRole('link', { name: 'Create Room' })).toBeVisible();

    await createPage.performCreate();
    await expect(page.getByText('New Room')).toBeVisible();

    await createPage.createRoom();
  });

  test('Create Client', async ({ page }) => {
    const viewPage = new ViewClientPage(page);
    const createPage = new CreateClientPage(page);

    await viewPage.performClickView();
    await expect(page.getByRole('link', { name: 'Create Client' })).toBeVisible();

    await createPage.performCreate();
    await expect(page.getByText('New Client')).toBeVisible();

    await createPage.createClient();
  });

  test('Create Bill', async ({ page }) => {
    const viewPage = new ViewBillPage(page);
    const createPage = new CreateBillPage(page);

    await viewPage.performClickView();
    await expect(page.getByRole('link', { name: 'Create Bill' })).toBeVisible();

    await createPage.performCreate();
    await expect(page.getByText('New Bill')).toBeVisible();

    await createPage.createBill();
  });

  test('Create Reservation', async ({ page }) => {
    const viewPage = new ViewReservationPage(page);
    const createPage = new CreateReservationPage(page);

    await viewPage.performClickView();
    await expect(page.getByRole('link', { name: 'Create Reservation' })).toBeVisible();

    await createPage.performCreate();
    await expect(page.getByText('New Reservation')).toBeVisible();

    await createPage.createReservation();
  });
})

test.describe('Delete', () => {
  test('Delete Room', async ({ page }) => {
    const viewPage = new ViewRoomPage(page);
    const deleteRoomPage = new DeleteRoomPage(page);

    await viewPage.performClickView();
    await expect(page.getByRole('link', { name: 'Create Room' })).toBeVisible();

    await deleteRoomPage.performDeleteRoom();
  });

  test('Delete Client', async ({ page }) => {
    const viewPage = new ViewClientPage(page);
    const deleteClientPage = new DeleteClientPage(page);

    await viewPage.performClickView();
    await expect(page.getByRole('link', { name: 'Create Client' })).toBeVisible();

    await deleteClientPage.performDeleteClient();
  });

  test('Delete Bill', async ({ page }) => {
    const viewPage = new ViewBillPage(page);
    const deleteBillPage = new DeleteBillPage(page);

    await viewPage.performClickView();
    await expect(page.getByRole('link', { name: 'Create Bill' })).toBeVisible();

    await deleteBillPage.performDeleteBill();
  });

  test('Delete Reservation', async ({ page }) => {
    const viewPage = new ViewReservationPage(page);
    const deleteReservationPage = new DeleteReservationPage(page);

    await viewPage.performClickView();
    await expect(page.getByRole('link', { name: 'Create Reservation' })).toBeVisible();

    await deleteReservationPage.performDeleteReservation();
  });
})

test.describe('Edit', () => {
  test('Edit Client', async ({ page }) => {
    const viewPage = new ViewClientPage(page);
    const editPage = new EditClientPage(page);

    await viewPage.performClickView();
    await expect(page.getByRole('link', { name: 'Create Client' })).toBeVisible();

    await editPage.enterEdit();
    await expect(page.getByText('Client:')).toBeVisible();

    await editPage.preformEditClient();
    await expect(page.getByText('Clients')).toBeVisible();
  });

  test('Edit Bill', async ({ page }) => {
    const viewPage = new ViewBillPage(page);
    const editPage = new EditBillPage(page);

    await viewPage.performClickView();
    await expect(page.getByRole('link', { name: 'Create Bill' })).toBeVisible();

    await editPage.enterEdit();
    await expect(page.getByText('Bill:')).toBeVisible();

    await editPage.preformEditBill();
    await expect(page.getByText('Bills')).toBeVisible();
  });
})