import { expect, type Locator, type Page } from '@playwright/test';
import { faker } from '@faker-js/faker';

export class CreateBillPage {

  readonly page: Page;
  readonly createButton: Locator;


  constructor(page: Page) {
    this.page = page;
    this.createButton = page.getByRole('link', { name: 'Create Bill' });
  }

  async performCreate() {
    await this.createButton.click();
  }

  async createBill() {
    const value = faker.helpers.rangeToNumber({ min: 1, max: 999999999 });

    await this.page.getByRole('spinbutton').fill(value.toString());
    await this.page.locator('.checkbox').click();
    await this.page.getByText('Save').click();

    const element = this.page.locator('#app > div > div.bills > div:nth-last-child(1)');
    await expect(element).toContainText(value.toString());
    await expect(element).toContainText('Yes');
  }
}