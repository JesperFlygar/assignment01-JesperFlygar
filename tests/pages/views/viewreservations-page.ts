import { expect, type Locator, type Page } from '@playwright/test';

export class ViewReservationPage {
 
  readonly page: Page;
  readonly viewButton: Locator; 

  constructor(page: Page) {
    this.page = page;
    this.viewButton = page.locator('div').filter({ hasText: /^ReservationsTotal: 1Current: 0View$/ }).getByRole('link');
  }

   async performClickViewReservation() {
    await this.viewButton.click();
  }
}