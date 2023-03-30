import { Page } from '@playwright/test'

export default class LoginPage {
    page: Page

    constructor(page: Page) {
        this.page = page
    }

    async navigate() {
        await this.page.goto('localhost:3000/login')
    }

    async login(email: string, password: string) {
        await this.page.getByPlaceholder('Enter email').fill(email)
        await this.page.getByPlaceholder('Enter password').fill(password)
        await this.page.getByRole('button', { name: 'Login' }).click()
    }
}
