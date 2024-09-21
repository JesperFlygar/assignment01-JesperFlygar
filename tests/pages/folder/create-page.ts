import { expect, type Locator, type Page } from '@playwright/test';
import { faker } from '@faker-js/faker';

export class CreatePage {

  readonly page: Page;
  readonly createButton: Locator;


  constructor(page: Page, createName: string) {
    this.page = page;
    this.createButton = page.getByRole('link', { name: createName });
  }

  async performCreate() {
    await this.createButton.click();
  }

  async fillRoomInformation() {
    const number = faker.helpers.rangeToNumber({ min: 1, max: 1000 });
    const floor = faker.helpers.rangeToNumber({ min: 1, max: 50 });
    const price = faker.helpers.rangeToNumber({ min: 10000, max: 100000 });

    await this.page.getByRole('combobox').selectOption('Single');
    await this.page.locator('div').filter({ hasText: /^Number$/ }).getByRole('spinbutton').fill(number.toString());
    await this.page.locator('div').filter({ hasText: /^Floor$/ }).getByRole('spinbutton').fill(floor.toString());
    await this.page.locator('.checkbox').click();
    await this.page.locator('div').filter({ hasText: /^Price$/ }).getByRole('spinbutton').fill(price.toString());
    await this.page.getByRole('listbox').selectOption('Balcony');
    await this.page.getByText('Save').click();

    const element = this.page.locator('#app > div > div.rooms > div:nth-last-child(1)');
    await expect(element).toContainText(number.toString());
    await expect(element).toContainText(floor.toString());
    await expect(element).toContainText(price.toString());
  }

  async fillClientInformation() {
    const fullName = faker.person.fullName();
    const userEmail = faker.internet.email();
    const userPhoneNo = faker.phone.number();

    await this.page.locator('div').filter({ hasText: /^Name$/ }).getByRole('textbox').fill(fullName);
    await this.page.locator('input[type="email"]').fill(userEmail);
    await this.page.locator('div').filter({ hasText: /^Telephone$/ }).getByRole('textbox').fill(userPhoneNo);
    await this.page.getByText('Save').click();

    const element = this.page.locator('#app > div > div.clients > div:nth-last-child(1)');
    await expect(element).toContainText(fullName);
    await expect(element).toContainText(userEmail);
    await expect(element).toContainText(userPhoneNo);
  }

  async fillBillInformation() {
    const value = faker.helpers.rangeToNumber({ min: 1, max: 999999999 });

    await this.page.getByRole('spinbutton').fill(value.toString());
    await this.page.locator('.checkbox').click();
    await this.page.getByText('Save').click();

    const element = this.page.locator('#app > div > div.bills > div:nth-last-child(1)');
    await expect(element).toContainText(value.toString());
    await expect(element).toContainText('Yes');
  }

  async fillReservationInformation() {
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