import { expect, type Locator, type Page } from '@playwright/test';

export class DeleteReservationPage 
{
    readonly page: Page;

    constructor(page: Page) 
    {
        this.page = page;
    }

    get numberOfReservations(): Promise<Number> 
    {
        return this.page.getByRole('img').count();
    }

    async performDeleteReservation(optionToDelete: Number) 
    {
        let optionsButton: Locator = this.page.locator('#app > div > div.reservations > div:nth-child('+ optionToDelete +') > div.action > img');
        await optionsButton.click();
        await this.page.locator('#app > div > div.reservations > div:nth-child('+ optionToDelete +') > div.action > img').evaluate(node => node.isConnected);  
        let deleteButton: Locator = this.page.getByText('Delete');
        await deleteButton.click();
    }
}