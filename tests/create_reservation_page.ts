import { expect, type Locator, type Page } from '@playwright/test';
import { faker } from '@faker-js/faker';

export class CreateReservationPage {

  readonly page: Page;
  readonly createButton: Locator;


  constructor(page: Page) {
    this.page = page;
    this.createButton = page.getByRole('link', { name: 'Create Reservation' });
  }

  async performCreate() {
    await this.createButton.click();
  }

  async createReservation() {
    const startDate = faker.date.recent();
    const endDate = faker.date.soon();

    await this.page.locator('div').filter({ hasText: /^Start \(Format YYYY-MM-DD\)$/ }).getByPlaceholder('YYYY-MM-DD').fill(startDate.toLocaleDateString());
    await this.page.locator('div').filter({ hasText: /^End \(Format YYYY-MM-DD\)$/ }).getByPlaceholder('YYYY-MM-DD').fill(endDate.toLocaleDateString());
    await this.page.locator('div').filter({ hasText: /^Client- Not selected -Jonas Hellman \(#1\)Mikael Eriksson \(#2\)$/ }).getByRole('combobox').selectOption('Jonas Hellman \(#1\)');
    await this.page.locator('div').filter({ hasText: /^Room- Not selected -Floor 1, Room 101Floor 1, Room 102$/ }).getByRole('combobox').selectOption('Floor 1, Room 102');
    await this.page.locator('div').filter({ hasText: /^Bill- Not selected -ID: 1$/ }).getByRole('combobox').selectOption('ID: 1');
    await this.page.getByText('Save').click();

    const element = this.page.locator('#app > div > div.reservations > div:nth-last-child(1)');
    await expect(element).toContainText(startDate.toLocaleDateString());
    await expect(element).toContainText(endDate.toLocaleDateString());
    await expect(element).toContainText('1');
    await expect(element).toContainText('2');
    await expect(element).toContainText('1');
  }
}