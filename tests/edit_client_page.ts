import { expect, type Locator, type Page } from '@playwright/test';

export class EditClientPage 
{
    readonly page: Page;

    constructor(page: Page) 
    {
        this.page = page;
    }

    get numberOfClients(): Promise<Number> 
    {
        return this.page.getByRole('img').count();
    }

    async preformEditClient(optionToEdit: Number, fullName: string, userEmail: string, userPhoneNo: string) 
    {
        let optionsButton: Locator = this.page.locator('#app > div > div.clients > div:nth-child('+ optionToEdit +') > div.action > img')
        await optionsButton.click();
        let editButton: Locator = this.page.getByText('Edit');
        await editButton.evaluate(node => node.isConnected);
        await editButton.click();

        await this.page.locator('div').filter({ hasText: /^Name$/ }).getByRole('textbox').fill(fullName);
        await this.page.locator('input[type="email"]').fill(userEmail);
        await this.page.locator('div').filter({ hasText: /^Telephone$/ }).getByRole('textbox').fill(userPhoneNo);
        await this.page.getByText('Save').click();
        return this.page.locator('#app > div > div.clients > div:nth-child(1)');
    }
}