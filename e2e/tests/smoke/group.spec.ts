import { Page, test, expect } from '@playwright/test'
import LoginPage from '../../pages/loginPage'
import GroupPage from '../../pages/groupPage'

test.describe('Group Page', () => {
    test.describe.configure({ mode: 'serial' })
    let page: Page
    let loginPage: LoginPage
    let groupPage: GroupPage

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage()
        loginPage = new LoginPage(page)
        await loginPage.navigate()
        await loginPage.login()
        await expect(page).toHaveURL('/home')
        groupPage = new GroupPage(page)
        await groupPage.navigate()
    })

    test.afterAll(async () => {
        await page.close()
    })

    test('User can send messages in group', async () => {
        await groupPage.checkSendEmptyMessage
        await groupPage.checkSendMessage
    })
})
