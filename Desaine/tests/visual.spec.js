import { test, expect } from '@playwright/test'

const disableMotion = async (page) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.addStyleTag({
    content: `
      *, *::before, *::after {
        animation: none !important;
        transition: none !important;
        caret-color: transparent !important;
      }
    `,
  })
}

test('landing desktop visual baseline', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 2200 })
  await page.goto('/')
  await disableMotion(page)
  await expect(page).toHaveScreenshot('landing-desktop.png', {
    fullPage: true,
    maxDiffPixels: 6000,
  })
})

test('landing mobile visual baseline', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 1800 })
  await page.goto('/')
  await disableMotion(page)
  await expect(page).toHaveScreenshot('landing-mobile.png', { fullPage: true })
})

test('privacy desktop visual baseline', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 2000 })
  await page.goto('/privacy.html')
  await disableMotion(page)
  await expect(page).toHaveScreenshot('privacy-desktop.png', {
    fullPage: true,
    maxDiffPixels: 6000,
  })
})
