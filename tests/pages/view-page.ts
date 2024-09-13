import { expect, type Locator, type Page } from '@playwright/test';

export class ViewPage {
 
  readonly page: Page;
  readonly viewButton: Locator; 

  constructor(page: Page, hasText: string) {
    this.page = page;
    this.viewButton = page.locator('div').filter({ hasText: hasText }).getByRole('link');
  }

   async performClickView() {
    await this.viewButton.click();
  }
}