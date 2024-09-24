import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

import { LoginPage } from './login-page';
import { DashboardPage } from './dashboard-page';

import { ViewRoomPage } from './view_room_page';
import { ViewClientPage } from './view_client_page';
import { ViewBillPage } from './view_bill_page';
import { ViewReservationPage } from './view_reservation_page';

import { CreateRoomPage } from './create_room_page';
import { CreateClientPage } from './create_client_page';
import { CreateBillPage } from './create_bill_page';
import { CreateReservationPage } from './create_reservation_page';

import { DeleteRoomPage } from './delete_room_page';
import { DeleteClientPage } from './delete_client_page';
import { DeleteBillPage } from './delete_bill_page';
import { DeleteReservationPage } from './delete_reservation_page';

import { EditClientPage } from './edit_client_page';
import { EditBillPage } from './edit_bill_page';

test.beforeEach(async ({ page }) => 
{
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.preformLogin(`${process.env.TEST_USERNAME}`, (`${process.env.TEST_PASSWORD}`))
  await expect(page.getByRole('heading', { name: 'Tester Hotel Overview' })).toBeVisible();
});

test.afterEach(async ({ page }) => 
{
  const dashboardPage = new DashboardPage(page);
  dashboardPage.performLogout();
  await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
})

test.describe('Create', () => 
{
  test('Create Room', async ({ page }) => 
  {
    const viewPage = new ViewRoomPage(page);
    const createPage = new CreateRoomPage(page);

    await viewPage.performClickView();
    await expect(page.getByRole('link', { name: 'Create Room' })).toBeVisible();

    await createPage.performCreate();
    await expect(page.getByText('New Room')).toBeVisible();

    const number = faker.helpers.rangeToNumber({ min: 1, max: 1000 });
    const floor = faker.helpers.rangeToNumber({ min: 1, max: 50 });
    const price = faker.helpers.rangeToNumber({ min: 10000, max: 100000 });

    const element = await createPage.createRoom(number, floor, price);

    await expect(element).toContainText(number.toString());
    await expect(element).toContainText(floor.toString());
    await expect(element).toContainText(price.toString());
  });

  test('Create Client', async ({ page }) => 
  {
    const viewPage = new ViewClientPage(page);
    const createPage = new CreateClientPage(page);

    await viewPage.performClickView();
    await expect(page.getByRole('link', { name: 'Create Client' })).toBeVisible();

    await createPage.performCreate();
    await expect(page.getByText('New Client')).toBeVisible();

    const fullName = faker.person.fullName();
    const userEmail = faker.internet.email();
    const userPhoneNo = faker.phone.number();

    const element = await createPage.createClient(fullName, userEmail, userPhoneNo);

    await expect(element).toContainText(fullName);
    await expect(element).toContainText(userEmail);
    await expect(element).toContainText(userPhoneNo);
  });

  test('Create Bill', async ({ page }) => 
  {
    const viewPage = new ViewBillPage(page);
    const createPage = new CreateBillPage(page);

    await viewPage.performClickView();
    await expect(page.getByRole('link', { name: 'Create Bill' })).toBeVisible();

    await createPage.performCreate();
    await expect(page.getByText('New Bill')).toBeVisible();

    const value = faker.helpers.rangeToNumber({ min: 1, max: 999999999 });

    const element = await createPage.createBill(value);

    await expect(element).toContainText(value.toString());
    await expect(element).toContainText('Yes');
  });

  test('Create Reservation', async ({ page }) => 
  {
    const viewPage = new ViewReservationPage(page);
    const createPage = new CreateReservationPage(page);

    await viewPage.performClickView();
    await expect(page.getByRole('link', { name: 'Create Reservation' })).toBeVisible();

    await createPage.performCreate();
    await expect(page.getByText('New Reservation')).toBeVisible();

    const startDate = faker.date.recent();
    const endDate = faker.date.soon();

    const element = await createPage.createReservation(startDate, endDate);

    await expect(element).toContainText(startDate.toLocaleDateString());
    await expect(element).toContainText(endDate.toLocaleDateString());
    await expect(element).toContainText('1');
    await expect(element).toContainText('2');
    await expect(element).toContainText('1');
  });
})

test.describe('Delete', () => 
{
  test('Delete Room', async ({ page }) => 
  {
    const viewPage = new ViewRoomPage(page);
    const deleteRoomPage = new DeleteRoomPage(page);

    await viewPage.performClickView();
    await expect(page.getByRole('link', { name: 'Create Room' })).toBeVisible();

    const currentNumberOfRooms = await deleteRoomPage.numberOfRooms; 
    await deleteRoomPage.performDeleteRoom(1); 
    expect(await deleteRoomPage.numberOfRooms).toBe(+currentNumberOfRooms); /////////
  });

  test('Delete Client', async ({ page }) => 
  {
    const viewPage = new ViewClientPage(page);
    const deleteClientPage = new DeleteClientPage(page);

    await viewPage.performClickView();
    await expect(page.getByRole('link', { name: 'Create Client' })).toBeVisible();

    expect(await deleteClientPage.numberOfClients).toBe(2); 
    await deleteClientPage.performDeleteClient(1);
    expect(await deleteClientPage.numberOfClients).toBe(1);
  });

  test('Delete Bill', async ({ page }) => 
  {
    const viewPage = new ViewBillPage(page);
    const deleteBillPage = new DeleteBillPage(page);

    await viewPage.performClickView();
    await expect(page.getByRole('link', { name: 'Create Bill' })).toBeVisible();

    expect(await deleteBillPage.numberOfBills).toBe(1); 
    await deleteBillPage.performDeleteBill(1);
    expect(await deleteBillPage.numberOfBills).toBe(0);
  });

  test('Delete Reservation', async ({ page }) => 
  {
    const viewPage = new ViewReservationPage(page);
    const deleteReservationPage = new DeleteReservationPage(page);

    await viewPage.performClickView();
    await expect(page.getByRole('link', { name: 'Create Reservation' })).toBeVisible();

    expect(await deleteReservationPage.numberOfReservations).toBe(1);
    await deleteReservationPage.performDeleteReservation(1);
    expect(await deleteReservationPage.numberOfReservations).toBe(0);
  });
})

test.describe('Edit', () => {
  test('Edit Client', async ({ page }) => 
  {
    const viewPage = new ViewClientPage(page);
    const editPage = new EditClientPage(page);

    await viewPage.performClickView();
    await expect(page.getByRole('link', { name: 'Create Client' })).toBeVisible();

    expect(await page.getByRole('img').count()).toBe(2);

    const fullName = faker.person.fullName();
    const userEmail = faker.internet.email();
    const userPhoneNo = faker.phone.number();

    const element = await editPage.preformEditClient(1, fullName, userEmail, userPhoneNo);
    await expect(page.getByText('Clients')).toBeVisible(); 
    await expect(element).toContainText(fullName);
    await expect(element).toContainText(userEmail);
    await expect(element).toContainText(userPhoneNo);
  });

  test('Edit Bill', async ({ page }) => 
  {
    const viewPage = new ViewBillPage(page);
    const editPage = new EditBillPage(page);

    await viewPage.performClickView();
    await expect(page.getByRole('link', { name: 'Create Bill' })).toBeVisible();

    expect(await page.getByRole('img').count()).toBe(1);

    const value = faker.helpers.rangeToNumber({ min: 1, max: 999999999 });

    const element = await editPage.preformEditBill(1, value);
    await expect(page.getByText('Bills')).toBeVisible();
    await expect(element).toContainText(value.toString());
    await expect(element).toContainText('Yes');
  });
})