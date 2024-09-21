import { expect, type Locator, type Page } from '@playwright/test';
import { faker } from '@faker-js/faker';

export class EditBillPage {

    readonly page: Page;
    readonly expectedInstances: Number;
    readonly optionsButton: Locator;
    readonly editButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.optionsButton = page.getByRole('img').first();
        this.editButton = page.getByText('Edit');
    }

    async enterEdit() {
        expect(await this.page.getByRole('img').count()).toBe(1);
        await this.optionsButton.click();
        expect(await this.editButton.evaluate(node => node.isConnected)).toBe(true);
        await this.editButton.click();
    }

    async preformEditBill() {
        const value = faker.helpers.rangeToNumber({ min: 1, max: 999999999 });

        await this.page.getByRole('spinbutton').fill(value.toString());
        await this.page.locator('.checkbox').click();
        await this.page.getByText('Save').click();

        const element = this.page.locator('#app > div > div.bills > div:nth-last-child(1)');
        await expect(element).toContainText(value.toString());
        await expect(element).toContainText('Yes');
    }
}