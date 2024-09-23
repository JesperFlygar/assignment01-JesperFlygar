import { expect, type Locator, type Page } from '@playwright/test';

export class CreateReservationPage 
{
    readonly page: Page;
    readonly createButton: Locator;


    constructor(page: Page) 
    {
        this.page = page;
        this.createButton = page.getByRole('link', { name: 'Create Reservation' });
    }

    async performCreate() 
    {
        await this.createButton.click();
    }

    async createReservation(startDate: Date, endDate: Date) 
    {
        await this.page.locator('div').filter({ hasText: /^Start \(Format YYYY-MM-DD\)$/ }).getByPlaceholder('YYYY-MM-DD').fill(startDate.toLocaleDateString());
        await this.page.locator('div').filter({ hasText: /^End \(Format YYYY-MM-DD\)$/ }).getByPlaceholder('YYYY-MM-DD').fill(endDate.toLocaleDateString());
        await this.page.locator('#app > div > div:nth-child(2) > div:nth-child(3) > select').selectOption({index: 1});
        await this.page.locator('#app > div > div:nth-child(2) > div:nth-child(4) > select').selectOption({index: 2});
        await this.page.locator('#app > div > div:nth-child(2) > div:nth-child(5) > select').selectOption({index: 1});
        await this.page.getByText('Save').click();
    }
}