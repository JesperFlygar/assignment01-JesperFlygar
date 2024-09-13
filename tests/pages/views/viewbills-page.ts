import { expect, type Locator, type Page } from '@playwright/test';

export class ViewBillPage {
 
  readonly page: Page;
  readonly viewButton: Locator; 

  constructor(page: Page) {
    this.page = page;
    this.viewButton = page.locator('div').filter({ hasText: /^BillsTotal: 1 \(4500kr\)Paid: 0 \(0kr\)View$/ }).getByRole('link');
  }

   async performClickViewBill() {
    await this.viewButton.click();
  }
}