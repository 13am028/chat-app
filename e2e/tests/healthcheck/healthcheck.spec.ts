import { Page, test, expect } from '@playwright/test'
import HomePage from '../../pages/homePage'
import SettingPage from '../../pages/settingPage'
import LoginPage from '../../pages/loginPage'
import DmPage from '../../pages/dmPage'

test.describe('Health Check', () => {
    let page: Page
    let homePage: HomePage
    let settingPage: SettingPage
    let loginPage: LoginPage
    let dmPage: DmPage

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage()
        loginPage = new LoginPage(page)
        await loginPage.navigate()
        await loginPage.login()
        await expect(page).toHaveURL('/home')
        homePage = new HomePage(page)
        settingPage = new SettingPage(page)
        dmPage = new DmPage(page)
    })

    test.afterAll(async () => {
        await page.close()
    })

    test('User can view home page', async () => {
        await homePage.checkFriendStatusNav()
        await homePage.checkAddFriendModal()
        await homePage.checkAccountDropDown()
        //    TODO: check left nav bar (waiting for group feature to be finished)
    })

    test('User can view setting page', async () => {
        await settingPage.navigate()
        await settingPage.checkSideBar()
        await settingPage.checkProfileSetting()
    })

    test('User can view dm page', async () => {
        await dmPage.navigate()
        await dmPage.checkDMPage()
    })

    test('User can view group page', () => {})
})
