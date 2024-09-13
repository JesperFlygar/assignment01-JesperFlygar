import { expect, type Locator, type Page } from '@playwright/test';
import { faker } from '@faker-js/faker';

export class CreateBillPage {
 
  readonly page: Page;
  readonly createButton: Locator; 
  

  constructor(page: Page) {
    this.page = page;
    this.createButton = page.getByRole('link', { name: 'Create Client' }); 
  }

   async performCreateBill() {
    await this.createButton.click();
  }

  async fillBillInformation(){
    const fullName = faker.person.fullName(); 
    const userEmail = faker.internet.email();
    const userPhoneNo = faker.phone.number();
    
    await this.page.locator('div').filter({ hasText: /^Name$/ }).getByRole('textbox').fill(fullName);
    await this.page.locator('input[type="email"]').fill(userEmail);
    await this.page.locator('div').filter({ hasText: /^Telephone$/ }).getByRole('textbox').fill(userPhoneNo);
    await this.page.getByText('Save').click();

    const element = this.page.locator('#app > div > div.bills > div:nth-last-child(1)');
    await expect(element).toContainText(fullName);
    await expect(element).toContainText(userEmail);
    await expect(element).toContainText(userPhoneNo);
  }
}