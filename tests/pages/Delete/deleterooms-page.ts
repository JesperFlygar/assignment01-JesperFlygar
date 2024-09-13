import { expect, type Locator, type Page } from '@playwright/test';

export class DeleteRoomPage {
 
  readonly page: Page;
  readonly optionsButton: Locator; 
  readonly deleteButton: Locator;
  


  constructor(page: Page) {
    this.page = page;
    this.optionsButton = page.getByRole('img').first();
    this.deleteButton = page.getByText('Delete');
  }

   async performDeleteRoom() {
    expect(await this.page.getByRole('img').count()).toBe(2); 
    await this.optionsButton.click();  
    expect(await this.deleteButton.evaluate(node => node.isConnected)).toBe(true);
    await this.deleteButton.click(); 
    expect(await this.page.getByRole('img').count()).toBe(1); 
  }
}