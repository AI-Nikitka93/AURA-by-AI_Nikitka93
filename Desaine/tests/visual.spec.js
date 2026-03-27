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

const seedAuralocalState = async (page) => {
  await page.addInitScript(() => {
    window.localStorage.setItem('aura:consent:v1', JSON.stringify({
      resolved: true,
      necessary: true,
      functional: true,
      analytics: false,
      lastUpdatedAt: '2026-03-27T12:00:00.000Z',
    }))
    window.localStorage.setItem('aura:experience:v1', JSON.stringify({
      ritual: 'glow',
      intensity: 68,
    }))
    window.localStorage.setItem('aura:waitlist:v1', JSON.stringify({
      pending: [],
      lastSubmission: null,
    }))
  })
}

test('landing desktop visual baseline', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 2200 })
  await seedAuralocalState(page)
  await page.goto('/')
  await disableMotion(page)
  await expect(page).toHaveScreenshot('landing-desktop.png', {
    fullPage: true,
    maxDiffPixels: 6000,
  })
})

test('landing mobile visual baseline', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 1800 })
  await seedAuralocalState(page)
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
