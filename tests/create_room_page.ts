import { expect, type Locator, type Page } from '@playwright/test';

export class CreateRoomPage 
{

  readonly page: Page;
  readonly createButton: Locator;


  constructor(page: Page) 
  {
    this.page = page;
    this.createButton = page.getByRole('link', { name: 'Create Room' });
  }

  async performCreate() 
  {
    await this.createButton.click();
  }

  async createRoom(number: Number, floor: Number, price: Number) 
  {
    await this.page.getByRole('combobox').selectOption('Single');
    await this.page.locator('div').filter({ hasText: /^Number$/ }).getByRole('spinbutton').fill(number.toString());
    await this.page.locator('div').filter({ hasText: /^Floor$/ }).getByRole('spinbutton').fill(floor.toString());
    await this.page.locator('.checkbox').click();
    await this.page.locator('div').filter({ hasText: /^Price$/ }).getByRole('spinbutton').fill(price.toString());
    await this.page.getByRole('listbox').selectOption('Balcony');
    await this.page.getByText('Save').click();
  }
}