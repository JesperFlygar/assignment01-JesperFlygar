import { expect, type Locator, type Page } from '@playwright/test';

export class DeleteBillPage 
{

  readonly page: Page;
  readonly expectedInstances: Number;
  readonly optionsButton: Locator;
  readonly deleteButton: Locator;

  constructor(page: Page) 
  {
    this.page = page;
    this.optionsButton = page.getByRole('img').first();
    this.deleteButton = page.getByText('Delete');
  }

  get numberOfBills(): Promise<Number> 
  {
    return this.page.getByRole('img').count(); 
  }

  async clickOptions()
  {
    await this.optionsButton.click();
  }

  async performDeleteBill() 
  {
    await this.deleteButton.click();
  }
}