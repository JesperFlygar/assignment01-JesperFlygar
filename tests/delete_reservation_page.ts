import { expect, type Locator, type Page } from '@playwright/test';

export class DeleteReservationPage 
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

    get numberOfReservations(): Promise<Number> 
    {
        return this.page.getByRole('img').count();
    }

    async clickOptions() 
    {
        await this.optionsButton.click();
    }

    async performDeleteReservation() 
    {
        await this.deleteButton.click();
    }
}