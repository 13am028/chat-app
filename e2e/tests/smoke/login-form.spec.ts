import { test, expect } from '@playwright/test'

const my_secret = 'MySecretPassword'
const non_email = 'this_isnot_email'

test.beforeEach(async ({ page }) => {
    await page.goto('./login')
    await page.waitForLoadState('networkidle')
})

test.afterEach(async ({ page }) => {
    await page.close()
})

test('Show password icon show work properly', async ({ page }) => {
    const pass_input = page.getByPlaceholder('Enter password')
    await pass_input.fill(my_secret)
    await pass_input.getAttribute('type').then(value => {
        expect(value).toEqual('password')
    })
    await pass_input.getAttribute('value').then(value => {
        expect(value).toEqual(my_secret)
    })
    await page.getByTestId('show-password-icon').locator('path').click()
    await pass_input.getAttribute('type').then(value => {
        expect(value).toEqual('text')
    })
    await pass_input.getAttribute('value').then(value => {
        expect(value).toEqual(my_secret)
    })
    await page.getByTestId('show-password-icon').click()
    await pass_input.getAttribute('type').then(value => {
        expect(value).toEqual('password')
    })
    await pass_input.getAttribute('value').then(value => {
        expect(value).toEqual(my_secret)
    })
})

test('Try submit empty form', async ({ page }) => {
    page.once('dialog', dialog => {
        expect(dialog.message()).toEqual(
            'Firebase: Error (auth/invalid-email).',
        )
        dialog.accept()
    })
    await page.getByRole('button', { name: 'Login' }).click()
    expect(page.url()).toContain('login')
})

test('Missing email input', async ({ page }) => {
    await page.getByPlaceholder('Enter email').fill(non_email)
    page.once('dialog', dialog => {
        expect(dialog.message()).toEqual(
            'Firebase: Error (auth/invalid-email).',
        )
        dialog.accept()
    })
    await page.getByRole('button', { name: 'Login' }).click()
    expect(page.url()).toContain('login')
})

test('Missing password input', async ({ page }) => {
    await page.getByPlaceholder('Enter password').fill(my_secret)
    page.once('dialog', dialog => {
        expect(dialog.message()).toEqual(
            'Firebase: Error (auth/invalid-email).',
        )
        dialog.accept()
    })
    await page.getByRole('button', { name: 'Login' }).click()
    expect(page.url()).toContain('login')
})

test('Invalid email input', async ({ page }) => {
    await page.getByPlaceholder('Enter email').fill(non_email)
    await page.getByPlaceholder('Enter password').fill(my_secret)
    page.once('dialog', dialog => {
        expect(dialog.message()).toEqual(
            'Firebase: Error (auth/invalid-email).',
        )
        dialog.accept()
    })
    await page.getByRole('button', { name: 'Login' }).click()
    expect(page.url()).toContain('login')
})

test('login working properly', async ({ page }) => {
    require('dotenv').config()
    const email = process.env.TEST_EMAIL as string
    const password = process.env.TEST_PASSWORD as string
    await page.getByPlaceholder('Enter email').fill(email)
    await page.getByPlaceholder('Enter password').fill(password)
    await page.getByRole('button', { name: 'Login' }).click()
    await page.waitForURL('**/home')
    await page.waitForLoadState('networkidle')
    expect(page.url()).not.toContain('home')
})

test('Navigate to signup correctly', async ({ page }) => {
    await page.getByRole('link', { name: 'Sign up' }).click()
    expect(page.url()).toContain('signup')
})
