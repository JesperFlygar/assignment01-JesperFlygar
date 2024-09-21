import { expect, type Locator, type Page } from '@playwright/test';

export class DeleteClientPage {

  readonly page: Page;
  readonly expectedInstances: Number;
  readonly optionsButton: Locator;
  readonly deleteButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.optionsButton = page.getByRole('img').first();
    this.deleteButton = page.getByText('Delete');
  }

  async performDeleteClient() {
    expect(await this.page.getByRole('img').count()).toBe(2);
    await this.optionsButton.click();
    expect(await this.deleteButton.evaluate(node => node.isConnected)).toBe(true);
    await this.deleteButton.click();
    expect(await this.page.getByRole('img').count()).toBe(1);
  }
}