import { expect, Page, test } from '@playwright/test'
import HomePage from '../../pages/homePage'
import LoginPage from '../../pages/loginPage'

test.describe('Redirect to login', async () => {
    test('index', async ({ page }) => {
        await page.goto('.')
        await page.waitForURL('**/login')
        expect(page.url()).toContain('login')
    })

    test('other', async ({ page }) => {
        await page.goto('./ldjasoiwxlak')
        await page.waitForURL('**/login')
        expect(page.url()).toContain('login')
    })
})

test.describe('Prevent unauth user', async () => {
    test('profile', async ({ page }) => {
        await page.goto('./profile')
        await page.waitForURL('**/login')
        expect(page.url()).toContain('login')
    })

    test('setting', async ({ page }) => {
        await page.goto('./setting')
        await page.waitForURL('**/login')
        expect(page.url()).toContain('login')
    })

    test('home', async ({ page }) => {
        await page.goto('./home')
        await page.waitForURL('**/login')
        expect(page.url()).toContain('login')
    })

    test('dm', async ({ page }) => {
        await page.goto('./dm')
        await page.waitForURL('**/login')
        expect(page.url()).toContain('login')
    })
})

test.describe('Auth user redirect', async () => {
    let page: Page
    let loginPage: LoginPage

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage()
        loginPage = new LoginPage(page)
        await loginPage.navigate()
        await loginPage.login()
        await expect(page).toHaveURL('/home')
    })

    test('login', async () => {
        await page.goto('./login')
        await page.waitForURL('**/home')
        expect(page.url()).toContain('home')
    })

    test('signup', async () => {
        await page.goto('./signup')
        await page.waitForURL('**/home')
        expect(page.url()).toContain('home')
    })

    test('setting', async () => {
        await page.goto('./setting')
        await page.waitForURL('**/setting')
        expect(page.url()).toContain('setting')
    })

    test('Random', async () => {
        await page.goto('./asdqwedfasda')
        await page.waitForURL('**/home')
        expect(page.url()).toContain('home')
    })

    test('logout', async () => {
        await page.goto('./logout')
        await page.waitForURL('**/login')
        expect(page.url()).toContain('login')
    })

    test.afterAll(async () => {
        await page.close()
    })
})
