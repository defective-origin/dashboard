import dotenv from 'dotenv'
import { expect } from '@playwright/test'
import { createBdd, DataTable } from 'playwright-bdd'
import { EmailService, MongooseService, LoginService } from 'services'

dotenv.config()

const { Given, When, Then, BeforeScenario } = createBdd()

BeforeScenario(async ({ page }) => {
  await page.close()
  await EmailService.setup()
  await LoginService.setup()
  await MongooseService.setup()
})


/**
 * Given Prefill "variant1"
 * And Prefill "variant2"
 * -- or --
 * Given Prefill "variant1, variant2"
 */
Given('Prefill {string}', async (_, fileNames: string) => {
  await MongooseService.setInfo(fileNames.split(',').map(fileName => fileName.trim()))
})

/** Given User 'admin@gmail.com' */
Given('User {string}', async (_, email) => {
  await LoginService.setInfo(email)
})

/** Given Location '/widgets' */
Given('Location {string}', async ({ page }, url) => {
  await page.goto(`${process.env.CLIENT}${url}`)
})

/**
 * When I fill fields
 *  | Field | Value |
 *  | name | Custom client name |
 */
When('I fill fields', async ({ page }, table: DataTable) => {
  for (const [label, value] of table.rows()) {
    await page.getByLabel(label).fill(value)
  }
})

/**
 * When I hover on "Submit" button
 * When I click on "Redirect" link
 */
When(/I (hover|click) on "([^"]+)" (link|button)/, async ({ page }, action, name, role) => {
  if (action === 'click') {
    await page.getByRole(role, { name }).click()
  } else {
    await page.getByRole(role, { name }).hover()
  }
})

When('I click on {string} image', async ({ page }, name) => {
  await page.getByAltText(name).click()
})

/** Then I click on "Submit" button for row with text "line number 3" */
When(/I click on "([^"]+)" (link|button) for row with text "([^"]+)"/, async ({ page }, name, role, cellText) => {
  await page.locator('tr').filter({ hasText: cellText }).getByRole(role, { name }).click()
})

/** Then I have to see "Home" title */
Then(/I have to see "([^"]+)" (title|text)/, async ({ page }, text, type) => {
  if (type === 'title') {
    await expect(page).toHaveTitle(new RegExp(text))
  } else {
    await expect(page.getByText(new RegExp(text))).toBeVisible()
  }
})

/** Then Success "Title" alert should be shown */
Then(/(Success|Error|Warning) "([^"]+)" alert should be shown/, async function ({ page }, status, title) {
  await expect(page.getByRole('alert')).toHaveText(status)
  await expect(page.getByRole('alert')).toHaveText(title)
})

/** Then Popup 'Confirm' should be shown */
Then('Popup {string} should be shown', async ({ page }, name) => {
  await expect(page.getByRole('dialog').getByRole('heading', { name })).toBeVisible()
})

/** Then Page "/***" should be opened */
Then('Page {string} should be opened', async ({ page }, url) => {
  await expect(page).toHaveURL(`${process.env.CLIENT}${url}`)
})

/**
 * Then I have to see details
 *  | Field | Value |
 *  | name | Custom client name |
 */
Then('I have to see details', async ({ page }, table: DataTable) => {
  for (const [label, value] of table.rows()) {
    await expect(page.getByText(label)).toBeVisible() // TODO: get by role
    await expect(page.getByText(value)).toBeVisible() // TODO: get by role
  }
})
