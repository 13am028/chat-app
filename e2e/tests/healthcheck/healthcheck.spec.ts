import { Page, test, expect } from '@playwright/test'
import HomePage from '../../pages/HomePage'
import SettingPage from "../../pages/SettingPage";

test.describe('Health Check', () => {
    let page: Page
    let homePage: HomePage
    let settingPage: SettingPage

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage()
        await page.goto('/home')
        await expect(page).toHaveURL('/home')
        homePage = new HomePage(page)
        settingPage = new SettingPage(page)
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

    test('User can view dm page', () => {})

    test('User can view group page', () => {})
})
