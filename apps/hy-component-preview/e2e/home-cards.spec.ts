import { test, expect } from '@playwright/test';

test.describe('Home Page — Bento Cards', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('h1');
  });

  test('Payment Method card renders form fields', async ({ page }) => {
    await expect(page.getByText('Payment Method', { exact: true })).toBeAttached();
    await expect(page.getByText('Name on Card')).toBeAttached();
    await expect(page.getByText('Card Number')).toBeAttached();
  });

  test('InputGroup with https:// prefix renders correctly', async ({ page }) => {
    const group = page.locator('[role="group"]').filter({ hasText: 'https://' }).first();
    await expect(group).toBeAttached();
    await expect(group.locator('input')).toBeAttached();
  });

  test('Price Range card renders', async ({ page }) => {
    await expect(page.getByText('Price Range')).toBeAttached();
  });

  test('Spinner badges render', async ({ page }) => {
    await expect(page.getByText('Syncing')).toBeAttached();
    await expect(page.getByText('Updating')).toBeAttached();
  });

  test('Prompt card textarea renders', async ({ page }) => {
    await expect(page.getByPlaceholder('Add context')).toBeAttached();
  });

  test('Appearance Settings card renders radio options', async ({ page }) => {
    await expect(page.getByText('Compute Environment', { exact: true })).toBeAttached();
    await expect(page.getByText('Kubernetes', { exact: true })).toBeAttached();
  });

  test('404 search card renders', async ({ page }) => {
    await expect(page.getByText('404 - Not Found')).toBeAttached();
  });
});
