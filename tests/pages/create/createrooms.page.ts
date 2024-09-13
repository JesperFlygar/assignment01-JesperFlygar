import { expect, type Locator, type Page } from '@playwright/test';
import { faker } from '@faker-js/faker';

export class CreateRoomPage {
 
  readonly page: Page;
  readonly createButton: Locator; 


  constructor(page: Page) {
    this.page = page;
    this.createButton = page.getByRole('link', { name: 'Create Room' }); 
  }

   async performCreateRoom() {
    await this.createButton.click();
  }

  async fillRoomInformation(){
    const number = faker.helpers.rangeToNumber({min: 1, max: 1000}); 
    const floor = faker.helpers.rangeToNumber({min: 1, max: 50}); 
    const price = faker.helpers.rangeToNumber({min: 10000, max: 100000});

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
}