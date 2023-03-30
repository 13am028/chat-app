import { chromium } from '@playwright/test'
import LoginPage from './pages/LoginPage'

require('dotenv').config()

async function globalSetup() {
    const browser = await chromium.launch()
    const page = await browser.newPage()
    const loginPage = new LoginPage(page)
    const email = process.env.TEST_USERNAME
    const password = process.env.TEST_PASSWORD

    await loginPage.navigate()
    await loginPage.login(email as string, password as string)
    await browser.close()
}

export default globalSetup
