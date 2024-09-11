import { expect, type Locator, type Page } from '@playwright/test';

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
}