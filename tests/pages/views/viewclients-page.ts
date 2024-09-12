import { expect, type Locator, type Page } from '@playwright/test';

export class ViewClientPage {
 
  readonly page: Page;
  readonly viewButton: Locator; 

  constructor(page: Page) {
    this.page = page;
    this.viewButton = page.locator('div').filter({ hasText: /^ClientsNumber: 2View$/ }).getByRole('link'); 
  }

   async performClickViewClient() {
    await this.viewButton.click();
  }
}