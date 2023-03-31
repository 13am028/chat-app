import { Page, expect } from '@playwright/test'

export default class SettingPage {
    page: Page

    constructor(page: Page) {
        this.page = page
    }

    async navigate() {
        await this.page.getByTestId('account-dropdown-toggle').click();
        await this.page.getByTestId('settings-link').click();
    }

    async checkSideBar() {
        await expect(this.page.getByRole('heading', { name: 'USER SETTINGS' })).toBeVisible();
        await expect(this.page.getByRole('link', { name: 'My Profile' })).toBeVisible();
        await expect(this.page.getByRole('link', { name: 'Privacy & Safety' })).toBeVisible();
        await expect(this.page.getByRole('link', { name: 'Friend Requests' })).toBeVisible();
        await expect(this.page.getByRole('heading', { name: 'APP SETTINGS' })).toBeVisible();
        await expect(this.page.getByRole('link', { name: 'Appearance' })).toBeVisible();
        await expect(this.page.getByRole('link', { name: 'Accessibility' })).toBeVisible();
        await expect(this.page.getByRole('link', { name: 'Voice & Video' })).toBeVisible();
        await expect(this.page.getByRole('link', { name: 'Text & Image' })).toBeVisible();
        await expect(this.page.getByRole('link', { name: 'Notification' })).toBeVisible();
        await expect(this.page.getByRole('link', { name: 'Language' })).toBeVisible();
        await expect(this.page.getByRole('heading', { name: 'ACTIVITY SETTINGS' })).toBeVisible();
        await expect(this.page.getByRole('link', { name: 'Activity Privacy' })).toBeVisible();
        await expect(this.page.getByText('Activity PrivacyRegistered Games')).toBeVisible();
        await expect(this.page.getByRole('link', { name: 'Log Out' })).toBeVisible();
    }

    async checkProfileSetting() {
    }
}
