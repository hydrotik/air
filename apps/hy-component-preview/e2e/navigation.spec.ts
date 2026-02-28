import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('home page renders hero and bento grid', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1')).toContainText('Design System');
    await expect(page.getByRole('button', { name: /View Components/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /Dashboard Example/i })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Home' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Components' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Dashboard' })).toBeVisible();
  });

  test('navigates to sink page via navbar', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Components' }).click();
    await expect(page).toHaveURL('/sink');
    await expect(page.getByRole('heading', { name: 'Accordion' })).toBeVisible();
  });

  test('navigates to dashboard page via navbar', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Dashboard' }).click();
    await expect(page).toHaveURL('/dashboard');
  });

  test('sink page loads directly', async ({ page }) => {
    await page.goto('/sink');
    await expect(page.getByRole('heading', { name: 'Accordion' })).toBeVisible();
  });

  test('dashboard page loads directly', async ({ page }) => {
    await page.goto('/dashboard');
    await expect(page).toHaveURL('/dashboard');
  });

  test('View Components button navigates to sink', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /View Components/i }).click();
    await expect(page).toHaveURL('/sink');
  });
});
