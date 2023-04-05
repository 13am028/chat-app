import { test, expect, Dialog } from '@playwright/test'

const my_secret = 'MySecretPassword'
const norm_email = 'johndoe@example.com'
const non_email = 'this_isnot_email'

const norm_username = 'myusername'
const nonorm_username =
    'very very absolutely normal username for the _ normal, typical, civilize, educated, and great people'
const cool_username = 's҉u҉p҉e҉r҉@w3s()๓E+ยูสเชอร์เนม...!'
const invi_display_name = 'ㅤ'
const norm_display_name = 'mydisplayname'
const invalid_pass_alert =
    'Please enter a valid password. Your password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.'

test.beforeEach(async ({ page }) => {
    await page.goto('./signup')
    await page.waitForLoadState('networkidle')
})

test('All fields empty', async ({ page }) => {
    page.once('dialog', dialog => {
        expect(dialog.message()).toEqual('Please fill in all fields.')
        dialog.accept()
    })
    await page.getByRole('button', { name: 'Sign Up' }).click()
    expect(page.url()).toContain('signup')
})

test.describe('Show password icon show work properly', () => {
    test('1st icon (Password)', async ({ page }) => {
        const pass_input = page.getByLabel('Password', { exact: true })
        const pass_eye = page
            .locator('div')
            .filter({
                hasText:
                    /^PasswordUse 8 or more characters with a mix of letters, numbers & symbols$/,
            })
            .locator('path')

        await pass_input.fill(my_secret)
        await pass_input.getAttribute('type').then(value => {
            expect(value).toEqual('password')
        })
        await pass_input.getAttribute('value').then(value => {
            expect(value).toEqual(my_secret)
        })
        await pass_eye.click()
        await pass_input.getAttribute('type').then(value => {
            expect(value).toEqual('text')
        })
        await pass_input.getAttribute('value').then(value => {
            expect(value).toEqual(my_secret)
        })
        await pass_eye.click()
        await pass_input.getAttribute('type').then(value => {
            expect(value).toEqual('password')
        })
        await pass_input.getAttribute('value').then(value => {
            expect(value).toEqual(my_secret)
        })
    })

    test('2nd icon (Confirm password)', async ({ page }) => {
        const pass_input = page.getByLabel('Confirm Password')
        const pass_eye = page
            .locator('div')
            .filter({ hasText: /^Confirm Password$/ })
            .locator('path')

        // confirm pass input check

        await pass_input.fill(my_secret)
        await pass_input.getAttribute('type').then(value => {
            expect(value).toEqual('password')
        })
        await pass_input.getAttribute('value').then(value => {
            expect(value).toEqual(my_secret)
        })
        await pass_eye.click()
        await pass_input.getAttribute('type').then(value => {
            expect(value).toEqual('text')
        })
        await pass_input.getAttribute('value').then(value => {
            expect(value).toEqual(my_secret)
        })
        await pass_eye.click()
        await pass_input.getAttribute('type').then(value => {
            expect(value).toEqual('password')
        })
        await pass_input.getAttribute('value').then(value => {
            expect(value).toEqual(my_secret)
        })
    })
})

test.describe('missing some fields', () => {
    test('Display name empty', async ({ page }) => {
        const username_input = page.getByLabel('Username')
        const email_input = page.getByLabel('Email')
        const pass_input = page.getByLabel('Password', { exact: true })
        const cpass_input = page.getByLabel('Confirm Password')

        // Fill the fields
        await username_input.fill(norm_display_name)
        await email_input.fill(norm_email)
        await pass_input.fill(my_secret)
        await cpass_input.fill(my_secret)

        // submit
        page.once('dialog', dialog => {
            expect(dialog.message()).toEqual('Please fill in all fields.')
            dialog.accept()
        })
        await page.getByRole('button', { name: 'Sign Up' }).click()
        expect(page.url()).toContain('signup')
    })
    test('Username empty', async ({ page }) => {
        const display_input = page.getByLabel('Display Name')
        const email_input = page.getByLabel('Email')
        const pass_input = page.getByLabel('Password', { exact: true })
        const cpass_input = page.getByLabel('Confirm Password')

        // Fill the fields
        await display_input.fill(norm_display_name)
        await email_input.fill(norm_email)
        await pass_input.fill(my_secret)
        await cpass_input.fill(my_secret)

        // submit
        page.once('dialog', dialog => {
            expect(dialog.message()).toEqual('Please fill in all fields.')
            dialog.accept()
        })
        await page.getByRole('button', { name: 'Sign Up' }).click()
        expect(page.url()).toContain('signup')
    })
    test('Email empty', async ({ page }) => {
        const display_input = page.getByLabel('Display Name')
        const username_input = page.getByLabel('Username')
        const pass_input = page.getByLabel('Password', { exact: true })
        const cpass_input = page.getByLabel('Confirm Password')

        // Fill the fields
        await display_input.fill(norm_display_name)
        await username_input.fill(norm_display_name)
        await pass_input.fill(my_secret)
        await cpass_input.fill(my_secret)

        // submit
        page.once('dialog', dialog => {
            expect(dialog.message()).toEqual('Please fill in all fields.')
            dialog.accept()
        })
        await page.getByRole('button', { name: 'Sign Up' }).click()
        expect(page.url()).toContain('signup')
    })
    test('Password empty', async ({ page }) => {
        const display_input = page.getByLabel('Display Name')
        const username_input = page.getByLabel('Username')
        const email_input = page.getByLabel('Email')
        const cpass_input = page.getByLabel('Confirm Password')

        // Fill the fields
        await display_input.fill(norm_display_name)
        await username_input.fill(norm_display_name)
        await email_input.fill(norm_email)
        await cpass_input.fill(my_secret)

        // submit
        page.once('dialog', dialog => {
            expect(dialog.message()).toEqual('Please fill in all fields.')
            dialog.accept()
        })
        await page.getByRole('button', { name: 'Sign Up' }).click()
        expect(page.url()).toContain('signup')
    })
    test('Confirm password empty', async ({ page }) => {
        const display_input = page.getByLabel('Display Name')
        const username_input = page.getByLabel('Username')
        const email_input = page.getByLabel('Email')
        const pass_input = page.getByLabel('Password', { exact: true })

        // Fill the fields
        await display_input.fill(norm_display_name)
        await username_input.fill(norm_display_name)
        await email_input.fill(norm_email)
        await pass_input.fill(my_secret)

        // submit
        page.once('dialog', dialog => {
            expect(dialog.message()).toEqual(invalid_pass_alert)
            dialog.accept()
        })
        await page.getByRole('button', { name: 'Sign Up' }).click()
        expect(page.url()).toContain('signup')
    })
})

test('Navigate to login correctly', async ({ page }) => {
    await page.getByRole('link', { name: 'Log in here' }).click()
    expect(page.url()).toContain('login')
})
