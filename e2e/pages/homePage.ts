import { Page, expect } from '@playwright/test'

export default class HomePage {
    page: Page

    constructor(page: Page) {
        this.page = page
    }

    async checkFriendStatusNav() {
        await expect(this.page.getByTestId('friends-heading')).toBeVisible()
        await expect(this.page.getByTestId('pending-heading')).toBeVisible()
        await expect(this.page.getByTestId('blocked-heading')).toBeVisible()
        await expect(this.page.getByTestId('add-friend-button')).toBeVisible()
        await expect(
            this.page.getByTestId('account-dropdown-toggle'),
        ).toBeVisible()
    }

    async checkAddFriendModal() {
        await this.page.getByTestId('add-friend-button').click()
        await expect(this.page.getByTestId('username-input')).toBeVisible()
        await expect(this.page.getByTestId('add-button')).toBeVisible()
        await expect(this.page.getByTestId('close-button')).toBeVisible()
        await this.page.getByTestId('close-button').click()
    }

    async checkAccountDropDown() {
        await this.page.getByTestId('account-dropdown-toggle').click()
        await expect(this.page.getByTestId('settings-link')).toBeVisible()
        await expect(this.page.getByTestId('logout-link')).toBeVisible()
    }
}
