import { expect, Page, test } from '@playwright/test'
import SettingPage from '../../pages/settingPage'
import LoginPage from '../../pages/loginPage'

test.describe('DM Page', () => {
    let page: Page
    let loginPage: LoginPage
    let settingPage: SettingPage

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage()
        loginPage = new LoginPage(page)
        await loginPage.navigate()
        await loginPage.login()
        await expect(page).toHaveURL('/home')
        settingPage = new SettingPage(page)
    })
    test('User can view profile details', async () => {
        await settingPage.navigate()
        await settingPage.checkRevealButton()
    })
})
