const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    const username = await page.getByText('username')
    await expect(username).toBeVisible()
    const password = await page.getByText('password')
    await expect(password).toBeVisible()
    const boton = await page.getByRole('button', {name: 'login'})
    await expect(boton).toBeVisible()
  })
})