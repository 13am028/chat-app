import { Page, expect } from '@playwright/test'
import { randomBytes } from 'crypto'

export default class GroupPage {
    page: Page

    constructor(page: Page) {
        this.page = page
    }

    async navigate() {
        await this.page.getByTestId('group-icon').first().click()
    }

    async checkDMPage() {
        await expect(
            this.page
                .getByTestId('direct-message-nav')
                .locator('div')
                .filter({ hasText: 'DIRECT MESSAGES' }),
        ).toBeVisible()
        await expect(this.page.getByPlaceholder('Send a message')).toBeVisible()
        await expect(this.page.getByTestId('submit-button')).toBeVisible()
    }

    async checkSendEmptyMessage() {
        await this.page.getByTestId('submit-button').click()
        expect(
            this.page.locator('.messageGridOwner').last().innerText,
        ).not.toBeFalsy()
    }

    async checkSendMessage() {
        let message = randomBytes(12).toString('hex')
        await this.page.locator('#message').fill(message)
        await this.page.getByTestId('submit-button').click()
        await expect(
            this.page.locator('.messageGridOwner').getByText(message),
        ).toBeVisible()
    }
}
