import { Page, expect } from '@playwright/test'

export default class SettingPage {
    page: Page

    constructor(page: Page) {
        this.page = page
    }

    async navigate() {
        await this.page.getByTestId('account-dropdown-toggle').click()
        await this.page.getByTestId('settings-link').click()
    }

    async checkSideBar() {
        await expect(
            this.page.getByRole('heading', { name: 'USER SETTINGS' }),
        ).toBeVisible()
        await expect(
            this.page.getByRole('link', { name: 'My Profile' }),
        ).toBeVisible()
        await expect(
            this.page.getByRole('link', { name: 'Privacy & Safety' }),
        ).toBeVisible()
        await expect(
            this.page.getByRole('link', { name: 'Friend Requests' }),
        ).toBeVisible()
        await expect(
            this.page.getByRole('heading', { name: 'APP SETTINGS' }),
        ).toBeVisible()
        await expect(
            this.page.getByRole('link', { name: 'Appearance' }),
        ).toBeVisible()
        await expect(
            this.page.getByRole('link', { name: 'Accessibility' }),
        ).toBeVisible()
        await expect(
            this.page.getByRole('link', { name: 'Voice & Video' }),
        ).toBeVisible()
        await expect(
            this.page.getByRole('link', { name: 'Text & Image' }),
        ).toBeVisible()
        await expect(
            this.page.getByRole('link', { name: 'Notification' }),
        ).toBeVisible()
        await expect(
            this.page.getByRole('link', { name: 'Language' }),
        ).toBeVisible()
        await expect(
            this.page.getByRole('heading', { name: 'ACTIVITY SETTINGS' }),
        ).toBeVisible()
        await expect(
            this.page.getByRole('link', { name: 'Activity Privary' }),
        ).toBeVisible()
        await expect(
            this.page.getByText('Activity PrivaryRegistered Games'),
        ).toBeVisible()
        await expect(
            this.page.getByRole('link', { name: 'Log Out' }),
        ).toBeVisible()
    }

    async checkProfileSetting() {
        await expect(
            this.page.getByRole('heading', { name: 'My Profile' }),
        ).toBeVisible()
        await expect(
            this.page.getByTestId('change-avatar-button'),
        ).toBeVisible()
        await this.page.getByTestId('change-avatar-button').click()
        await expect(
            this.page.getByRole('heading', { name: 'Change Avatar' }),
        ).toBeVisible()
        await expect(
            this.page.getByTestId('upload-image-button').locator('div').first(),
        ).toBeVisible()
        await this.page
            .getByTestId('upload-image-button')
            .locator('div')
            .first()
            .click()
        await expect(
            this.page
                .frameLocator('[data-test="uw-iframe"]')
                .locator('[data-test="close-dialog-icon"]'),
        ).toBeVisible()
        await this.page
            .frameLocator('[data-test="uw-iframe"]')
            .locator('[data-test="close-dialog-icon"]')
            .click()
        await expect(
            this.page.getByRole('button', { name: 'Close' }),
        ).toBeVisible()
        await expect(
            this.page
                .locator('div')
                .filter({ hasText: /^Change AvatarJohndow$/ })
                .locator('span'),
        ).toBeVisible()
        await expect(
            this.page.getByRole('heading', { name: 'USERNAME' }),
        ).toBeVisible()
        await expect(
            this.page
                .locator('div')
                .filter({ hasText: /^Johndow$/ })
                .locator('span'),
        ).toBeVisible()
        await expect(
            this.page.getByRole('heading', { name: 'EMAIL' }),
        ).toBeVisible()
        await expect(this.page.getByTestId('displayed-data')).toBeVisible()
        await expect(
            this.page.getByRole('heading', {
                name: 'Password and Authentication',
            }),
        ).toBeVisible()
        await expect(
            this.page.getByTestId('change-password-button'),
        ).toBeVisible()
        await expect(
            this.page.getByText('TWO-FACTOR AUTHENTICATION'),
        ).toBeVisible()
        await expect(
            this.page.getByText(
                'Protect your Discord account with an extra layer of security. Once configured, y',
            ),
        ).toBeVisible()
        await expect(this.page.getByTestId('enable-2fa-button')).toBeVisible()
    }
}
