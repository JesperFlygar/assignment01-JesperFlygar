import { expect, type Locator, type Page } from '@playwright/test';
import { faker } from '@faker-js/faker';

export class EditPage {
 
  readonly page: Page;
  readonly expectedInstances: Number;
  readonly optionsButton: Locator; 
  readonly editButton: Locator;
  
  constructor(page: Page, expectedInstances: Number) {
    this.page = page;
    this.expectedInstances = expectedInstances;
    this.optionsButton = page.getByRole('img').first();
    this.editButton = page.getByText('Edit');
  }

   async enterEdit() {
    expect(await this.page.getByRole('img').count()).toBe(this.expectedInstances); 
    await this.optionsButton.click();  
    expect(await this.editButton.evaluate(node => node.isConnected)).toBe(true);
    await this.editButton.click(); 
  }

  async preformEditClient() {
    const fullName = faker.person.fullName(); 
    const userEmail = faker.internet.email();
    const userPhoneNo = faker.phone.number();
    
    await this.page.locator('div').filter({ hasText: /^Name$/ }).getByRole('textbox').fill(fullName);
    await this.page.locator('input[type="email"]').fill(userEmail);
    await this.page.locator('div').filter({ hasText: /^Telephone$/ }).getByRole('textbox').fill(userPhoneNo);
    await this.page.getByText('Save').click();

    const element = this.page.locator('#app > div > div.clients > div:nth-child(1)');
    await expect(element).toContainText(fullName);
    await expect(element).toContainText(userEmail);
    await expect(element).toContainText(userPhoneNo);
  }

  async preformEditBill() {
    const value = faker.helpers.rangeToNumber({min: 1, max: 999999999});
    
    await this.page.getByRole('spinbutton').fill(value.toString());
    await this.page.locator('.checkbox').click(); 
    await this.page.getByText('Save').click();

    const element = this.page.locator('#app > div > div.bills > div:nth-last-child(1)');
    await expect(element).toContainText(value.toString());
    await expect(element).toContainText('Yes'); 
  }
}