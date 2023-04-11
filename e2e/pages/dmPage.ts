import { Page, expect } from '@playwright/test'
import { randomBytes } from 'crypto'

export default class DmPage {
    page: Page

    constructor(page: Page) {
        this.page = page
    }

    async navigate() {
        await this.page.getByTestId('chat-0').click()
    }

    async checkDMPage() {
        await expect(
            this.page
                .getByTestId('direct-message-nav')
                .locator('div')
                .filter({ hasText: 'DIRECT MESSAGES' }),
        ).toBeVisible()
        await expect(this.page.getByTestId('display-name')).toBeVisible()
        await expect(this.page.getByPlaceholder('Send a message')).toBeVisible()
        await expect(this.page.getByTestId('submit-button')).toBeVisible()
    }

    async checkSendEmptyMessage() {
        await this.page.getByTestId('submit-button').click()
        await this.page
            .locator('.messageOwner')
            .last()
            .textContent()
            .then(value => {
                expect(value?.toString()).not.toBeFalsy()
            })
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
