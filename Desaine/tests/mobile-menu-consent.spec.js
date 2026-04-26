import { test, expect } from '@playwright/test'

test('consent banner stays out of the way when the mobile menu is open', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')

  await page.getByRole('button', { name: 'Открыть меню' }).click()

  await expect(page.getByRole('button', { name: 'Только необходимое' })).toBeHidden()
  await expect(page.getByText('Выберите, какой памятью может пользоваться AURA')).toBeHidden()
  await expect(page.getByText('Навигация')).toBeVisible()
})
