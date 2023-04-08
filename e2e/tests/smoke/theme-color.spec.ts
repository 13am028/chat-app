import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
    await page.goto('./login')
    await page.waitForLoadState('networkidle')
})

test.afterEach(async ({ page }) => {
    await page.close()
})

test('First visit theme', async ({ page }) => {
    // visit website for the first time
    await page
        .locator('body')
        .getAttribute('class')
        .then(value => {
            expect(value).toEqual('light')
        })
    await page
        .locator('body')
        .getAttribute('data-theme')
        .then(value => {
            expect(value).toEqual('light-theme')
        })
})

test('Button Testing', async ({ page }) => {
    // Before click
    await page
        .locator('body')
        .getAttribute('class')
        .then(value => {
            expect(value).toEqual('light')
        })
    await page
        .locator('body')
        .getAttribute('data-theme')
        .then(value => {
            expect(value).toEqual('light-theme')
        })
    // 1st click
    await page.getByRole('button').first().click()
    await page.waitForLoadState('networkidle')
    await page
        .locator('body')
        .getAttribute('class')
        .then(value => {
            expect(value).toEqual('dark')
        })
    await page
        .locator('body')
        .getAttribute('data-theme')
        .then(value => {
            expect(value).toEqual('dark-theme')
        })
    // 2n click
    await page.getByRole('button').first().click()
    await page
        .locator('body')
        .getAttribute('class')
        .then(value => {
            expect(value).toEqual('light')
        })
    await page
        .locator('body')
        .getAttribute('data-theme')
        .then(value => {
            expect(value).toEqual('light-theme')
        })
})

test('Keep theme data when changing page (interact)', async ({ page }) => {
    await page
        .locator('body')
        .getAttribute('class')
        .then(value => {
            expect(value).toEqual('light')
        })
    await page
        .locator('body')
        .getAttribute('data-theme')
        .then(value => {
            expect(value).toEqual('light-theme')
        })
    await page.getByRole('link', { name: 'Sign up' }).click()

    await page
        .locator('body')
        .getAttribute('class')
        .then(value => {
            expect(value).toEqual('light')
        })
    await page
        .locator('body')
        .getAttribute('data-theme')
        .then(value => {
            expect(value).toEqual('light-theme')
        })

    await page.getByRole('button').first().click()
    await page
        .locator('body')
        .getAttribute('class')
        .then(value => {
            expect(value).toEqual('dark')
        })
    await page
        .locator('body')
        .getAttribute('data-theme')
        .then(value => {
            expect(value).toEqual('dark-theme')
        })
    await page.getByRole('link', { name: 'Log in here' }).click()
    await page.waitForLoadState('networkidle')

    await page
        .locator('body')
        .getAttribute('class')
        .then(value => {
            expect(value).toEqual('dark')
        })
    await page
        .locator('body')
        .getAttribute('data-theme')
        .then(value => {
            expect(value).toEqual('dark-theme')
        })
    await page.getByRole('button').first().click()
    await page
        .locator('body')
        .getAttribute('class')
        .then(value => {
            expect(value).toEqual('light')
        })
    await page
        .locator('body')
        .getAttribute('data-theme')
        .then(value => {
            expect(value).toEqual('light-theme')
        })

    await page.getByRole('button').first().click()
    await page
        .locator('body')
        .getAttribute('class')
        .then(value => {
            expect(value).toEqual('dark')
        })
    await page
        .locator('body')
        .getAttribute('data-theme')
        .then(value => {
            expect(value).toEqual('dark-theme')
        })
})

test('Keep theme data when changing page (url)', async ({ page }) => {
    // Check default theme
    await page
        .locator('body')
        .getAttribute('class')
        .then(value => {
            expect(value).toEqual('light')
        })
    await page
        .locator('body')
        .getAttribute('data-theme')
        .then(value => {
            expect(value).toEqual('light-theme')
        })
    // check default theme
    await page.goto('./signup')
    await page.waitForLoadState('networkidle', { timeout: 0 })
    await page
        .locator('body')
        .getAttribute('class')
        .then(value => {
            expect(value).toEqual('light')
        })
    await page
        .locator('body')
        .getAttribute('data-theme')
        .then(value => {
            expect(value).toEqual('light-theme')
        })
    // change theme and check
    await page.getByRole('button').first().click()
    await page
        .locator('body')
        .getAttribute('class')
        .then(value => {
            expect(value).toEqual('dark')
        })
    await page
        .locator('body')
        .getAttribute('data-theme')
        .then(value => {
            expect(value).toEqual('dark-theme')
        })
    await page.goto('./login')
    await page.waitForLoadState('networkidle', { timeout: 0 })
    await page
        .locator('body')
        .getAttribute('class')
        .then(value => {
            expect(value).toEqual('dark')
        })
    await page
        .locator('body')
        .getAttribute('data-theme')
        .then(value => {
            expect(value).toEqual('dark-theme')
        })
})
