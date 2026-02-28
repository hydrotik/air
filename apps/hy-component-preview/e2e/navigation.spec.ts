import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('home page renders DataGrid', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'DataGrid' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Components' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Dashboard' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'E-Commerce' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Plugin' })).toBeVisible();
  });

  test('navigates to dashboard page via navbar', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Dashboard' }).click();
    await expect(page).toHaveURL('/dashboard');
  });

  test('navigates to ecommerce page via navbar', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'E-Commerce' }).click();
    await expect(page).toHaveURL('/ecommerce');
  });

  test('navigates to plugin page via navbar', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Plugin' }).click();
    await expect(page).toHaveURL('/plugin');
  });

  test('dashboard page loads directly', async ({ page }) => {
    await page.goto('/dashboard');
    await expect(page).toHaveURL('/dashboard');
  });
});
