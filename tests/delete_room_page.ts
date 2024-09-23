import { expect, type Locator, type Page } from '@playwright/test';

export class DeleteRoomPage 
{
    readonly page: Page;
    readonly expectedInstances: Number;
    readonly optionsButton: Locator;
    readonly deleteButton: Locator;

    constructor(page: Page, optionToDelete: Number) 
    {
        this.page = page;
        this.optionsButton = page.locator('#app > div > div.rooms > div:nth-child(+' + optionToDelete + ') > div.action > img');
        this.deleteButton = page.getByText('Delete');
    }

    get numberOfRooms(): Promise<Number> 
    {
        return this.page.getByRole('img').count();
    }

    async clickOptions() 
    {
        await this.optionsButton.click();
    }

    async performDeleteRoom() 
    {
        await this.deleteButton.click();
    }
}