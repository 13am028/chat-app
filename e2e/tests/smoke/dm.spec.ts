import { expect, Page, test } from '@playwright/test'
import LoginPage from '../../pages/loginPage'
import DmPage from '../../pages/dmPage'

test.describe('DM Page', () => {
    test.describe.configure({ mode: 'serial' })
    let page: Page
    let loginPage: LoginPage
    let dmPage: DmPage

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage()
        loginPage = new LoginPage(page)
        await loginPage.navigate()
        await loginPage.login()
        await expect(page).toHaveURL('/home')
        dmPage = new DmPage(page)
        await dmPage.navigate()
    })

    test.afterAll(async () => {
        await page.close()
    })

    test('User can send messages', async () => {
        await dmPage.checkSendEmptyMessage()
        await dmPage.checkSendMessage
    })
})
