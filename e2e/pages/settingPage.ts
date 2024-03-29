import { Page, expect } from '@playwright/test'

export default class SettingPage {
    page: Page
    email: string
    username: string
    displayName: string

    constructor(page: Page) {
        this.page = page
        this.email = process.env.TEST_EMAIL as string
        this.username = process.env.TEST_USERNAME as string
        this.displayName = process.env.TEST_DISPLAY_NAME as string
    }

    async navigate() {
        await this.page.getByTestId('account-dropdown-toggle').click()
        await this.page.getByTestId('settings-link').click()
    }

    async checkSideBar() {
        await expect(this.page.getByTestId('user-setting')).toBeVisible()
        await expect(this.page.getByTestId('profile-link')).toBeVisible()
        await expect(this.page.getByTestId('privacy-link')).toBeVisible()
        await expect(this.page.getByTestId('friend-request-link')).toBeVisible()
        await expect(this.page.getByTestId('app-settings')).toBeVisible()
        await expect(this.page.getByTestId('appearance-link')).toBeVisible()
        await expect(this.page.getByTestId('accessibility-link')).toBeVisible()
        await expect(this.page.getByTestId('voice-video-link')).toBeVisible()
        await expect(this.page.getByTestId('text-image-link')).toBeVisible()
        await expect(this.page.getByTestId('notification-link')).toBeVisible()
        await expect(this.page.getByTestId('language-link')).toBeVisible()
        await expect(this.page.getByTestId('activity-settings')).toBeVisible()
        await expect(
            this.page.getByTestId('activity-privacy-link'),
        ).toBeVisible()
        await expect(
            this.page.getByTestId('registered-game-link'),
        ).toBeVisible()
        await expect(this.page.getByTestId('logout-link')).toBeVisible()
    }

    async checkProfileSetting() {
        await expect(this.page.getByTestId('my-profile')).toBeVisible()
        await expect(this.page.getByTestId('profile-banner')).toBeVisible()
        await expect(this.page.getByTestId('display-name')).toBeVisible()
        await expect(
            this.page.getByTestId('change-avatar-button'),
        ).toBeVisible()
        await this.page.getByTestId('change-avatar-button').click()
        await expect(this.page.getByTestId('modal-title')).toBeVisible()
        await expect(this.page.getByText('Upload Image')).toBeVisible()
        await expect(this.page.getByTestId('upload-image-button')).toBeVisible()
        await this.page.getByTestId('upload-image-button').click()
        await expect(
            this.page
                .frameLocator('[data-test="uw-iframe"]')
                .locator('[data-test="close-dialog-icon"]'),
        ).toBeVisible()
        await this.page
            .frameLocator('[data-test="uw-iframe"]')
            .locator('[data-test="close-dialog-icon"]')
            .click()
        await expect(this.page.getByTestId('username-heading')).toBeVisible()
        await expect(this.page.getByTestId('username')).toBeVisible()
        await expect(this.page.getByTestId('email-heading')).toBeVisible()
        await expect(this.page.getByTestId('displayed-data')).toBeVisible()
        await expect(this.page.getByTestId('reveal-button')).toBeVisible()
        await expect(
            this.page.getByTestId('password-authentication'),
        ).toBeVisible()
        await expect(
            this.page.getByTestId('change-password-button'),
        ).toBeVisible()
        await expect(this.page.getByTestId('two-fa-heading')).toBeVisible()
        await expect(this.page.getByTestId('two-fa-description')).toBeVisible()
        await expect(this.page.getByTestId('enable-2fa-button')).toBeVisible()
    }

    hiddenEmail() {
        let hidden = this.email
        return hidden.replace(
            /^([^\n]{1,4})([a-zA-Z0-9_.+-]+)(@.*)$/,
            (match, first, middle, last) => {
                return `${first}${'****'}${last}`
            },
        )
    }

    async checkRevealButton() {
        await expect(this.page.getByTestId('username')).toHaveText(
            this.username,
        )
        await expect(this.page.getByTestId('display-name')).toHaveText(
            this.displayName,
        )
        await expect(this.page.getByTestId('displayed-data')).toHaveText(
            this.hiddenEmail(),
        )
        await expect(this.page.getByTestId('reveal-button')).toBeVisible()
        await this.page.getByTestId('reveal-button').click()
        await expect(this.page.getByTestId('displayed-data')).toHaveText(
            this.email,
        )
    }
}
