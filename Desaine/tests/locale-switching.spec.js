import { test, expect } from '@playwright/test'

const seedConsent = async (page) => {
  await page.addInitScript(() => {
    window.localStorage.setItem('aura:consent:v1', JSON.stringify({
      resolved: true,
      necessary: true,
      functional: true,
      analytics: false,
      lastUpdatedAt: '2026-05-01T00:00:00.000Z',
    }))
  })
}

test('landing locale switch updates page language and metadata', async ({ page }) => {
  await seedConsent(page)
  await page.goto('/?lang=ru')

  await expect(page.locator('html')).toHaveAttribute('lang', 'ru')
  await expect(page).toHaveTitle('AURA by AI_Nikitka93 - Портфолио-кейс')

  await page.getByRole('button', { name: 'EN' }).first().click()

  await expect(page.locator('html')).toHaveAttribute('lang', 'en')
  await expect(page).toHaveTitle('AURA by AI_Nikitka93 - Portfolio Concept Case')
  await expect(page.getByText('Jewelry that feels your rhythm')).toBeVisible()
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', /index\.html\?lang=en$/)
})

test('privacy locale switch updates visible copy and canonical metadata', async ({ page }) => {
  await page.goto('/privacy.html?lang=ru')

  await expect(page.locator('html')).toHaveAttribute('lang', 'ru')
  await expect(page.getByText('Последнее обновление: 28 марта 2026 г.')).toBeVisible()

  await page.getByRole('button', { name: 'EN' }).click()

  await expect(page.locator('html')).toHaveAttribute('lang', 'en')
  await expect(page).toHaveTitle('Privacy Policy - AURA by AI_Nikitka93')
  await expect(page.getByText('Last updated: March 28, 2026')).toBeVisible()
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', /privacy\.html\?lang=en$/)
})
