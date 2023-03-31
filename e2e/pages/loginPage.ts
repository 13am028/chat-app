import { Page } from '@playwright/test'

require('dotenv').config()

export default class LoginPage {
    page: Page

    constructor(page: Page) {
        this.page = page
    }

    async navigate() {
        await this.page.goto('/login')
    }

    async login() {
        const email = process.env.TEST_EMAIL as string
        const password = process.env.TEST_PASSWORD as string
        await this.page.getByPlaceholder('Enter email').fill(email)
        await this.page.getByPlaceholder('Enter password').fill(password)
        await this.page.getByRole('button', { name: 'Login' }).click()
    }
}
