import { expect, Page, test } from '@playwright/test'
import LoginPage from '../../pages/loginPage'
import HomePage from '../../pages/homePage'

test.describe('Home Page', () => {
    test.describe.configure({ mode: 'serial' })
    let page: Page
    let loginPage: LoginPage
    let homePage: HomePage

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage()
        loginPage = new LoginPage(page)
        await loginPage.navigate()
        await loginPage.login()
        await expect(page).toHaveURL('/home')
        homePage = new HomePage(page)
    })

    test.afterAll(async () => {
        await page.close()
    })

    test('User can add friend', async () => {
        await homePage.checkAddFriend()
    })

    test('User can block friend', async () => {
        await homePage.checkBlockFriend()
    })

    test('User can unblock friend', async () => {
        await homePage.checkUnblockFriend()
    })

    test('User can remove friend', async () => {
        await homePage.checkRemoveFriend()
    })

    test('User can create new group', () => {})
})
