import { Page, expect } from '@playwright/test'

export default class HomePage {
    page: Page
    toAddUsername: string
    toAddDisplayName: string

    constructor(page: Page) {
        this.page = page
        this.toAddUsername = 'anonymous1'
        this.toAddDisplayName = 'anonymous1'
    }

    async checkFriendStatusNav() {
        await expect(this.page.getByTestId('friends-heading')).toBeVisible()
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
        await this.page.getByTestId('account-dropdown-toggle').click()
    }

    async checkAddFriend() {
        await this.page.getByTestId('add-friend-button').click()
        await this.page.getByTestId('username-input').fill(this.toAddUsername)
        this.page.once('dialog', dialog => {
            expect(dialog.message()).toContain(
                'has been successfully added as your friend.',
            )
            dialog.dismiss().catch(() => {})
        })
        await this.page.getByTestId('add-button').click()
        await expect(
            this.page
                .getByTestId('friend-list-items')
                .getByText(this.toAddDisplayName),
        ).toBeVisible()
    }

    async checkBlockFriend() {
        await this.page.getByTestId('block-friend-button').first().click()
        this.page.once('dialog', dialog => {
            expect(dialog.message()).toContain('has been blocked successfully')
            dialog.dismiss().catch(() => {})
        })
        await this.page
            .getByTestId('block-friend-modal')
            .getByTestId('block-friend-button')
            .click()
        await expect(
            this.page
                .getByTestId('friend-list-items')
                .getByText(this.toAddDisplayName),
        ).not.toBeVisible()
        await this.page.getByTestId('blocked-heading').click()
        await expect(
            this.page
                .getByTestId('blocked-friend-name')
                .getByText(this.toAddDisplayName),
        ).toBeVisible()
    }

    async checkUnblockFriend() {
        await this.page.getByRole('button', { name: 'Unblock' }).click()
        await this.page
            .getByRole('dialog')
            .getByRole('button', { name: 'Unblock' })
            .click()
        await expect(
            this.page
                .getByTestId('blocked-friend-name')
                .getByText(this.toAddDisplayName),
        ).not.toBeVisible()
        await this.page.getByTestId('friends-heading').click()
        await expect(
            this.page
                .getByTestId('friend-list-items')
                .getByText(this.toAddDisplayName),
        ).toBeVisible()
    }

    async checkRemoveFriend() {
        await this.page.getByTestId('remove-friend-button').first().click()
        this.page.once('dialog', dialog => {
            expect(dialog.message()).toContain(
                'has been successfully removed from your friends.',
            )
            dialog.dismiss().catch(() => {})
        })
        await this.page.getByTestId('confirm-remove-friend-button').click()
        await expect(
            this.page
                .getByTestId('friend-list-items')
                .getByText(this.toAddDisplayName),
        ).not.toBeVisible()
    }
}
