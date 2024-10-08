import { expect, type Locator, type Page } from '@playwright/test';

export class EditBillPage 
{
    readonly page: Page;
    variableIsChecked: Boolean;

    constructor(page: Page) 
    {
        this.page = page;
    }

    get numberOfBills(): Promise<Number> 
    {
        return this.page.getByRole('img').count();
    }

    async isChecked(optionToEdit: Number): Promise<Boolean>
    {
        let paidText: Locator = this.page.locator('#app > div > div.bills > div:nth-child('+ optionToEdit +') > div.paid');
        const checked = paidText.innerText();
        if(await checked == 'Paid: Yes')
        {
            return true; 
        }
        return false; 
    }

    async preformEditBill(optionToEdit: Number, value: Number) 
    {
        let optionsButton: Locator = this.page.locator('#app > div > div.bills > div:nth-child('+ optionToEdit +') > div.action > img')
        await optionsButton.click();
        let editButton: Locator = this.page.getByText('Edit');
        await editButton.evaluate(node => node.isConnected);
        await editButton.click();

        await this.page.getByRole('spinbutton').fill(value.toString());
        await this.page.locator('.checkbox').click();
        await this.page.getByText('Save').click();
        return this.page.locator('#app > div > div.bills > div:nth-last-child(1)');
    }
}