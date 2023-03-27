import { Page, test, expect } from '@playwright/test'
import HomePage from '../../pages/homePage'

test.describe('Health Check', () => {
    let page: Page
    let homePage: HomePage

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage()
        await page.goto('/home')
        await expect(page).toHaveURL('/home')
        homePage = new HomePage(page)
    })

    test('User can view home page', async () => {
        await homePage.checkFriendStatusNav()
        await homePage.checkAddFriendModal()
        await homePage.checkAccountDropDown()
    })

    test('User can view setting page', () => {})

    test('User can view dm page', () => {})

    test('User can view group page', () => {})
})
