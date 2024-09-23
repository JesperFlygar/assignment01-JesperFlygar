import { expect, type Locator, type Page } from '@playwright/test';
import { faker } from '@faker-js/faker';

export class EditClientPage 
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
        expect(await this.page.getByRole('img').count()).toBe(2);
        await this.optionsButton.click();
        expect(await this.editButton.evaluate(node => node.isConnected)).toBe(true);
        await this.editButton.click();
    }

    async preformEditClient(fullName: string, userEmail: string, userPhoneNo: string) 
    {
        await this.page.locator('div').filter({ hasText: /^Name$/ }).getByRole('textbox').fill(fullName);
        await this.page.locator('input[type="email"]').fill(userEmail);
        await this.page.locator('div').filter({ hasText: /^Telephone$/ }).getByRole('textbox').fill(userPhoneNo);
        await this.page.getByText('Save').click();
    }
}