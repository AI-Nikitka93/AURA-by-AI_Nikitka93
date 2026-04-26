import { test, expect } from '@playwright/test'

const seedConsent = async (page) => {
  await page.addInitScript(() => {
    window.localStorage.setItem('aura:consent:v1', JSON.stringify({
      resolved: true,
      necessary: true,
      functional: true,
      analytics: false,
      lastUpdatedAt: '2026-04-26T20:00:00.000Z',
    }))
    window.localStorage.removeItem('aura:waitlist:v1')
    window.localStorage.removeItem('aura:experience:v1')
  })
}

async function submitWaitlistForm(page, email) {
  const form = page.locator('form')

  await form.getByRole('button', { name: 'Свечение Свечение' }).click()
  await form.getByLabel('Как вас представить в AURA').fill('Никита')
  await form.getByLabel('Email для раннего доступа').fill(email)
  await form.getByRole('checkbox').nth(1).check()
  await form.getByRole('button', { name: 'Сохранить ранний доступ' }).click()
}

test('device queue stays deduplicated and signals demo mode clearly', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 2200 })
  await seedConsent(page)
  await page.goto('/')

  await submitWaitlistForm(page, 'demo@example.com')
  await expect(page.getByText('Ваш ритуал сохранён в локальную очередь устройства (Демо-режим).')).toBeVisible()

  await page.getByRole('button', { name: 'Отправить ещё' }).click()
  await submitWaitlistForm(page, ' Demo@example.com ')
  await expect(page.getByText('Ваш ритуал сохранён в локальную очередь устройства (Демо-режим).')).toBeVisible()

  const waitlistState = await page.evaluate(() => JSON.parse(window.localStorage.getItem('aura:waitlist:v1')))

  expect(waitlistState.pending).toHaveLength(1)
  expect(waitlistState.pending[0].payload.email).toBe('Demo@example.com')
})
