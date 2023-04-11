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

    async checkGroupPage() {
        await expect(
            this.page.locator('.nav_head').filter({ hasText: 'Members' }),
        ).toBeVisible()
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

    async checkCreateGroup() {
        await this.page.getByTestId('add-server-icon-button').click()
        await this.page.getByTestId('add-server-modal-input').click()
        await this.page
            .getByTestId('add-server-modal-input')
            .fill('Testing server Name')
        await this.page.getByTestId('add-server-modal-create-button').click()
    }

    async checkDeletedGroup() {
        await this.page.getByTestId('group-icon').last().click({
            button: 'right',
        })
        await this.page.getByText('Delete server').click()
    }
}
