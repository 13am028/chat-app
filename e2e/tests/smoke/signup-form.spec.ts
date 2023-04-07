import { test, expect, Locator, Page } from '@playwright/test'
import { randomBytes } from 'crypto'

const secure_password = '$S30Jap%ySGI8%W64h'
const norm_email = 'johndoe@example.com'
const non_email = 'this_isnot_email'
const norm_username = 'myusername'
const norm_display_name = 'mydisplayname'

// Error Text
const all_fields_alert = 'Please fill in all fields.'
const match_pass_alert = 'Passwords have to match'
const invalid_pass_alert =
    'Please enter a valid password. Your password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.'
const invalid_email_alert = 'Please enter a valid email address.'
const check_box_alert =
    'Please agree to the terms of service and privacy policy.'

let page: Page
let display_input: Locator
let username_input: Locator
let email_input: Locator
let pass_input: Locator
let cpass_input: Locator
let agreement_box: Locator

test.beforeAll(async ({ browser }) => {
    page = await browser.newPage()
    await page.goto('./signup')
    await page.waitForLoadState('networkidle')
    display_input = page.getByLabel('Display Name')
    username_input = page.getByLabel('Username')
    email_input = page.getByLabel('Email')
    pass_input = page.getByLabel('Password', { exact: true })
    cpass_input = page.getByLabel('Confirm Password')
    agreement_box = page.getByLabel(
        'I agree to the Terms of Service and Privacy Policy',
    )
})

test.afterAll(async () => {
    await page.close()
})

test.beforeEach(async () => {
    await page.goto('./signup')
    await page.waitForLoadState('networkidle')
})

test('All fields empty', async () => {
    page.once('dialog', async dialog => {
        expect(dialog.message()).toEqual(all_fields_alert)
        await dialog.accept()
    })
    await page.getByRole('button', { name: 'Sign Up' }).click()
    expect(page.url()).toContain('signup')
})

test.describe('Show password icon show work properly', () => {
    test('1st icon (Password)', async () => {
        const pass_eye = page
            .locator('div')
            .filter({
                hasText:
                    /^PasswordUse 8 or more characters with a mix of letters, numbers & symbols$/,
            })
            .locator('path')

        await pass_input.fill(secure_password)
        await pass_input.getAttribute('type').then(value => {
            expect(value).toEqual('password')
        })
        await pass_input.getAttribute('value').then(value => {
            expect(value).toEqual(secure_password)
        })
        await pass_eye.click()
        await pass_input.getAttribute('type').then(value => {
            expect(value).toEqual('text')
        })
        await pass_input.getAttribute('value').then(value => {
            expect(value).toEqual(secure_password)
        })
        await pass_eye.click()
        await pass_input.getAttribute('type').then(value => {
            expect(value).toEqual('password')
        })
        await pass_input.getAttribute('value').then(value => {
            expect(value).toEqual(secure_password)
        })
    })

    test('2nd icon (Confirm password)', async () => {
        const pass_input = page.getByLabel('Confirm Password')
        const pass_eye = page
            .locator('div')
            .filter({ hasText: /^Confirm Password$/ })
            .locator('path')

        // confirm pass input check
        await pass_input.fill(secure_password)
        await pass_input.getAttribute('type').then(value => {
            expect(value).toEqual('password')
        })
        await pass_input.getAttribute('value').then(value => {
            expect(value).toEqual(secure_password)
        })
        await pass_eye.click()
        await pass_input.getAttribute('type').then(value => {
            expect(value).toEqual('text')
        })
        await pass_input.getAttribute('value').then(value => {
            expect(value).toEqual(secure_password)
        })
        await pass_eye.click()
        await pass_input.getAttribute('type').then(value => {
            expect(value).toEqual('password')
        })
        await pass_input.getAttribute('value').then(value => {
            expect(value).toEqual(secure_password)
        })
    })
})

test.describe('missing some fields', () => {
    test('Display name empty', async () => {
        // Fill the fields
        await username_input.fill(norm_display_name)
        await email_input.fill(norm_email)
        await pass_input.fill(secure_password)
        await cpass_input.fill(secure_password)

        // submit
        page.once('dialog', async dialog => {
            expect(dialog.message()).toEqual(all_fields_alert)
            await dialog.accept()
        })
        await page.getByRole('button', { name: 'Sign Up' }).click()
        expect(page.url()).toContain('signup')
    })
    test('Username empty', async () => {
        // Fill the fields
        await display_input.fill(norm_display_name)
        await email_input.fill(norm_email)
        await pass_input.fill(secure_password)
        await cpass_input.fill(secure_password)

        // submit
        page.once('dialog', async dialog => {
            expect(dialog.message()).toEqual(all_fields_alert)
            await dialog.accept()
        })
        await page.getByRole('button', { name: 'Sign Up' }).click()
        expect(page.url()).toContain('signup')
    })
    test('Email empty', async () => {
        // Fill the fields
        await display_input.fill(norm_display_name)
        await username_input.fill(norm_display_name)
        await pass_input.fill(secure_password)
        await cpass_input.fill(secure_password)

        // submit
        page.once('dialog', async dialog => {
            expect(dialog.message()).toEqual(all_fields_alert)
            await dialog.accept()
        })
        await page.getByRole('button', { name: 'Sign Up' }).click()
        expect(page.url()).toContain('signup')
    })
    test('Password empty', async () => {
        // Fill the fields
        await display_input.fill(norm_display_name)
        await username_input.fill(norm_display_name)
        await email_input.fill(norm_email)
        await cpass_input.fill(secure_password)

        // submit
        page.once('dialog', async dialog => {
            expect(dialog.message()).toEqual(all_fields_alert)
            await dialog.accept()
        })
        await page.getByRole('button', { name: 'Sign Up' }).click()
        expect(page.url()).toContain('signup')
    })
    test('Confirm password empty', async () => {
        // Fill the fields
        await display_input.fill(norm_display_name)
        await username_input.fill(norm_display_name)
        await email_input.fill(norm_email)
        await pass_input.fill(secure_password)

        // submit
        page.once('dialog', async dialog => {
            expect(dialog.message()).toEqual(match_pass_alert)
            await dialog.accept()
        })
        await page.getByRole('button', { name: 'Sign Up' }).click()
        expect(page.url()).toContain('signup')
    })
})

test.describe('Testing form', () => {
    test.describe('Insecure password', () => {
        test('Password too short', async () => {
            let short_pass = 'H_18.&s'
            await display_input.fill(norm_display_name)
            await username_input.fill(norm_username)
            await email_input.fill(norm_email)
            await pass_input.fill(short_pass)
            await cpass_input.fill(short_pass)
            page.once('dialog', async dialog => {
                expect(dialog.message()).toEqual(invalid_pass_alert)
                await dialog.accept()
            })
            await page.getByRole('button', { name: 'Sign Up' }).click()
            expect(page.url()).toContain('signup')
        })

        test('Password only digit', async () => {
            let only_digit = '12345678912'
            await display_input.fill(norm_display_name)
            await username_input.fill(norm_username)
            await email_input.fill(norm_email)
            await pass_input.fill(only_digit)
            await cpass_input.fill(only_digit)
            page.once('dialog', async dialog => {
                expect(dialog.message()).toEqual(invalid_pass_alert)
                await dialog.accept()
            })
            await page.getByRole('button', { name: 'Sign Up' }).click()
            expect(page.url()).toContain('signup')
        })

        test('Password only lower char', async () => {
            let only_low_char = 'asdqwfdfnoais'
            await display_input.fill(norm_display_name)
            await username_input.fill(norm_username)
            await email_input.fill(norm_email)
            await pass_input.fill(only_low_char)
            await cpass_input.fill(only_low_char)
            page.once('dialog', async dialog => {
                expect(dialog.message()).toEqual(invalid_pass_alert)
                await dialog.accept()
            })
            await page.getByRole('button', { name: 'Sign Up' }).click()
            expect(page.url()).toContain('signup')
        })

        test('Password only upper char', async () => {
            let only_up_char = 'ASDIAUDOSCAPNSQC'
            await display_input.fill(norm_display_name)
            await username_input.fill(norm_username)
            await email_input.fill(norm_email)
            await pass_input.fill(only_up_char)
            await cpass_input.fill(only_up_char)
            page.once('dialog', async dialog => {
                expect(dialog.message()).toEqual(invalid_pass_alert)
                await dialog.accept()
            })
            await page.getByRole('button', { name: 'Sign Up' }).click()
            expect(page.url()).toContain('signup')
        })

        test('Password up + low char', async () => {
            let low_up_char = 'ASDadcxDOSCAPNSQC'
            await display_input.fill(norm_display_name)
            await username_input.fill(norm_username)
            await email_input.fill(norm_email)
            await pass_input.fill(low_up_char)
            await cpass_input.fill(low_up_char)
            page.once('dialog', async dialog => {
                expect(dialog.message()).toEqual(invalid_pass_alert)
                await dialog.accept()
            })
            await page.getByRole('button', { name: 'Sign Up' }).click()
            expect(page.url()).toContain('signup')
        })

        test('Password low + num char', async () => {
            let low_num_pass = 'asdh129jcds0'
            await display_input.fill(norm_display_name)
            await username_input.fill(norm_username)
            await email_input.fill(norm_email)
            await pass_input.fill(low_num_pass)
            await cpass_input.fill(low_num_pass)
            page.once('dialog', async dialog => {
                expect(dialog.message()).toEqual(invalid_pass_alert)
                await dialog.accept()
            })
            await page.getByRole('button', { name: 'Sign Up' }).click()
            expect(page.url()).toContain('signup')
        })

        test('Password up + num char', async () => {
            let up_num_pass = 'ASDH129JCDS0'
            await display_input.fill(norm_display_name)
            await username_input.fill(norm_username)
            await email_input.fill(norm_email)
            await pass_input.fill(up_num_pass)
            await cpass_input.fill(up_num_pass)
            page.once('dialog', async dialog => {
                expect(dialog.message()).toEqual(invalid_pass_alert)
                await dialog.accept()
            })
            await page.getByRole('button', { name: 'Sign Up' }).click()
            expect(page.url()).toContain('signup')
        })

        test('Password up + lower + num char', async () => {
            let up_num_pass = 'ASDH129JCDS0'
            await display_input.fill(norm_display_name)
            await username_input.fill(norm_username)
            await email_input.fill(norm_email)
            await pass_input.fill(up_num_pass)
            await cpass_input.fill(up_num_pass)
            page.once('dialog', async dialog => {
                expect(dialog.message()).toEqual(invalid_pass_alert)
                await dialog.accept()
            })
            await page.getByRole('button', { name: 'Sign Up' }).click()
            expect(page.url()).toContain('signup')
        })
    })

    test('Not match password', async () => {
        await display_input.fill(norm_display_name)
        await username_input.fill(norm_username)
        await email_input.fill(norm_email)
        await pass_input.fill(secure_password)
        await cpass_input.fill('not_secret')
        page.once('dialog', async dialog => {
            expect(dialog.message()).toEqual(match_pass_alert)
            await dialog.accept()
        })
        await page.getByRole('button', { name: 'Sign Up' }).click()
        expect(page.url()).toContain('signup')
    })

    test('Invalid email', async () => {
        await display_input.fill(norm_display_name)
        await username_input.fill(norm_display_name)
        await email_input.fill(non_email)
        await pass_input.fill(secure_password)
        await cpass_input.fill(secure_password)
        page.once('dialog', async dialog => {
            expect(dialog.message()).toEqual(invalid_email_alert)
            await dialog.accept()
        })
        await page.getByRole('button', { name: 'Sign Up' }).click()
        expect(page.url()).toContain('signup')
    })

    test('Invisible display name', async () => {
        let invi_display_name = 'ㅤ'
        await display_input.fill(invi_display_name)
        await username_input.fill(invi_display_name)
        await email_input.fill(norm_email)
        await pass_input.fill(secure_password)
        await cpass_input.fill(secure_password)
        page.once('dialog', async dialog => {
            expect(dialog.message()).toEqual(check_box_alert)
            await dialog.accept()
        })
        await page.getByRole('button', { name: 'Sign Up' }).click()
        expect(page.url()).toContain('signup')
    })

    test('Long username', async () => {
        let long_username =
            'very very absolutely normal username for the _ normal, typical, civilize, educated, and great people'
        await display_input.fill(norm_display_name)
        await username_input.fill(long_username)
        await email_input.fill(norm_email)
        await pass_input.fill(secure_password)
        await cpass_input.fill(secure_password)
        page.once('dialog', async dialog => {
            expect(dialog.message()).toEqual(check_box_alert)
            await dialog.accept()
        })
        await page.getByRole('button', { name: 'Sign Up' }).click()
        expect(page.url()).toContain('signup')
    })

    test('cool username', async () => {
        let cool_username = 's҉u҉p҉e҉r҉@w3s()๓E+ยูสเชอร์เนม...!'
        await display_input.fill(norm_display_name)
        await username_input.fill(cool_username)
        await email_input.fill(norm_email)
        await pass_input.fill(secure_password)
        await cpass_input.fill(secure_password)
        page.once('dialog', async dialog => {
            expect(dialog.message()).toEqual(check_box_alert)
            await dialog.accept()
        })
        await page.getByRole('button', { name: 'Sign Up' }).click()
        expect(page.url()).toContain('signup')
    })

    test('Forget check box', async () => {
        await display_input.fill(norm_display_name)
        await username_input.fill(norm_username)
        await email_input.fill(norm_email)
        await pass_input.fill(secure_password)
        await cpass_input.fill(secure_password)
        page.once('dialog', async dialog => {
            expect(dialog.message()).toEqual(check_box_alert)
            await dialog.accept()
        })
        await page.getByRole('button', { name: 'Sign Up' }).click()
        expect(page.url()).toContain('signup')
    })

    test('Username already exist user', async () => {
        require('dotenv').config()
        const email = process.env.TEST_EMAIL as string
        const username = process.env.TEST_USERNAME as string
        const displayName = process.env.TEST_DISPLAY_NAME as string
        const password = process.env.TEST_PASSWORD as string
        await display_input.fill(displayName)
        await username_input.fill(username)
        await email_input.fill(email)
        await pass_input.fill(password)
        await cpass_input.fill(password)
        await agreement_box.check()
        await page.getByRole('button', { name: 'Sign Up' }).click()
        expect(page.url()).toContain('signup')
    })

    test('Email already exist user', async () => {
        require('dotenv').config()
        const email = process.env.TEST_EMAIL as string
        const username = process.env.TEST_USERNAME as string
        const displayName = process.env.TEST_DISPLAY_NAME as string
        const password = process.env.TEST_PASSWORD as string
        await display_input.fill(displayName + '0')
        await username_input.fill(username + '0')
        await email_input.fill(email)
        await pass_input.fill(password)
        await cpass_input.fill(password)
        await agreement_box.check()
        await page.getByRole('button', { name: 'Sign Up' }).click()
        expect(page.url()).toContain('signup')
    })
})

test('Signup working properly', async () => {
    let name = randomBytes(12).toString('hex')
    let email = name + '@testinguser.com'
    await display_input.fill(name)
    await username_input.fill(name)
    await email_input.fill(email)
    await pass_input.fill(secure_password)
    await cpass_input.fill(secure_password)
    await agreement_box.check()

    await page.getByRole('button', { name: 'Sign Up' }).click()
    await page.waitForURL('**/home')
    await page.waitForLoadState('networkidle')
    expect(page.url()).toContain('home')
    await page.getByTestId('account-dropdown-toggle').click()
    await page.getByTestId('logout-link').click()
    await page.waitForURL('**/login')
})

test('Navigate to login correctly', async () => {
    await page.getByRole('link', { name: 'Log in here' }).click()
    await page.waitForURL('**/login')
    expect(page.url()).toContain('login')
})
