import { expect, type Locator, type Page } from '@playwright/test';

export class DeleteRoomPage {

  readonly page: Page;
  readonly expectedInstances: Number;
  readonly optionsButton: Locator;
  readonly deleteButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.optionsButton = page.getByRole('img').first();
    this.deleteButton = page.getByText('Delete');
  }

  get numberOfRooms(): Promise<Number> {
    return this.page.getByRole('img').count(); 
  }

  async performDeleteRoom() {
    await this.optionsButton.click();
    expect(await this.deleteButton.evaluate(node => node.isConnected)).toBe(true);
    await this.deleteButton.click();
  }
}