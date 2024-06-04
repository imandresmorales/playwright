const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3001/api/testing/reset')
    await request.post('http://localhost:3001/api/users', {
        data: {
            name: "Matti Luukkainen",
            username: "mluukkai",
            password: "salainen"
        }
    })
    await page.goto('http://localhost:5173')
  })

  test('5.17 Login form is shown', async ({ page }) => {
    const username = await page.getByText('username')
    await expect(username).toBeVisible()
    const password = await page.getByText('password')
    await expect(password).toBeVisible()
    const boton = await page.getByRole('button', {name: 'login'})
    await expect(boton).toBeVisible()
  })

  describe('5.18 Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.getByTestId('username').fill('mluukkai')
      await page.getByTestId('password').fill('salainen')
      await page.getByRole('button', {name: "login"}).click()
      await expect(page.getByText('Matti Luukkainen logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
        await page.getByRole('button', {name: "login"}).click()
        await page.getByTestId('username').fill('mluukkai')
        await page.getByTestId('password').fill('password')
        await expect(page.getByText('wrong username or password')).toBeVisible()
    })
  })
})

describe('5.19 When logged in', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3001/api/testing/reset')
    await request.post('http://localhost:3001/api/users', {
        data: {
            name: "Matti Luukkainen",
            username: "mluukkai",
            password: "salainen"
        }
    })
    await page.goto('http://localhost:5173')
    await page.getByTestId('username').fill('mluukkai')
    await page.getByTestId('password').fill('salainen')
    await page.getByRole('button', {name: "login"}).click()
  })

  test('a new blog can be created', async ({ page }) => {
    await page.getByRole('button', {name: "create new blog"}).click()
    const texboxes = await page.getByRole('textbox').all()
    await texboxes[0].fill('belladurmiente')
    await texboxes[1].fill('walt disney')
    await texboxes[2].fill('disney.com')
    await page.getByRole('button', {name: "create"}).click()
    await page.getByText("a new blog belladurmiente by walt disney added").waitFor()
    // await expect(page.getByText( "a new blog belladurmiente by walt disney added")).toBeVisible()
    await expect(page.getByText( "belladurmiente walt disney")).toBeVisible()
  })
})

describe('5.20 edicion de blog', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3001/api/testing/reset')
    await request.post('http://localhost:3001/api/users', {
        data: {
            name: "Matti Luukkainen",
            username: "mluukkai",
            password: "salainen"
        }
    })
    await page.goto('http://localhost:5173')
    await page.getByTestId('username').fill('mluukkai')
    await page.getByTestId('password').fill('salainen')
    await page.getByRole('button', {name: "login"}).click()
  })

  test('edicion de blog', async ({ page }) => {
    await page.getByRole('button', {name: "create new blog"}).click()
    // await page.getByText("Create new").waitFor()
    const texboxes = await page.getByRole('textbox').all()
    await texboxes[0].fill('belladurmiente')
    await texboxes[1].fill('walt disney')
    await texboxes[2].fill('disney.com')
    await page.getByRole('button', {name: "create"}).click()
    
    await page.getByRole('button', {name: "view"}).click()
    await page.getByRole('button', {name: "like"}).click()
    await page.getByTestId("likes")
    await expect(page.getByText('likes 1')).toBeVisible()
  })
})