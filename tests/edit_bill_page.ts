import { expect, type Locator, type Page } from '@playwright/test';

export class EditBillPage 
{
    readonly page: Page;
    readonly expectedInstances: Number;
    readonly optionsButton: Locator;
    readonly editButton: Locator;

    constructor(page: Page) 
    {
        this.page = page;
        this.optionsButton = page.getByRole('img').first();
        this.editButton = page.getByText('Edit');
    }

    async enterEdit() 
    {
        expect(await this.page.getByRole('img').count()).toBe(1);
        await this.optionsButton.click();
        expect(await this.editButton.evaluate(node => node.isConnected)).toBe(true);
        await this.editButton.click();
    }

    async preformEditBill(value: Number) 
    {
        await this.page.getByRole('spinbutton').fill(value.toString());
        await this.page.locator('.checkbox').click();
        await this.page.getByText('Save').click();
    }
}