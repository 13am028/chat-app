import { Page, expect } from '@playwright/test'

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
}
