import { expect, type Locator, type Page } from '@playwright/test';

export class ViewRoomPage {
 
  readonly page: Page;
  readonly viewButton: Locator; 

  constructor(page: Page) {
    this.page = page;
    this.viewButton = page.locator('div').filter({ hasText: /^RoomsNumber: 4View$/ }).getByRole('link');
  }

   async performClickViewRoom() {
    await this.viewButton.click();
  }
}