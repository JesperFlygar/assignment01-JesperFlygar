import { expect, type Locator, type Page } from '@playwright/test';

export class DeletePage {

  readonly page: Page;
  readonly expectedInstances: Number;
  readonly optionsButton: Locator;
  readonly deleteButton: Locator;

  constructor(page: Page, expectedInstances: Number) {
    this.page = page;
    this.expectedInstances = expectedInstances;
    this.optionsButton = page.getByRole('img').first();
    this.deleteButton = page.getByText('Delete');
  }

  async performDelete() {
    expect(await this.page.getByRole('img').count()).toBe(+this.expectedInstances + 1);
    await this.optionsButton.click();
    expect(await this.deleteButton.evaluate(node => node.isConnected)).toBe(true);
    await this.deleteButton.click();
    expect(await this.page.getByRole('img').count()).toBe(this.expectedInstances);
  }
}