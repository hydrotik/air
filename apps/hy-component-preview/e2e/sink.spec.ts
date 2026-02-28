import { test, expect } from '@playwright/test';

test.describe('Sink Page — Component Kitchen Sink', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/sink');
  });

  test('renders Accordion section', async ({ page }) => {
    await expect(page.getByText('Is it accessible?')).toBeVisible();
    // Expand an accordion item
    await page.getByText('Is it accessible?').click();
    await expect(page.getByText('Yes. It adheres')).toBeVisible();
  });

  test('renders Alert variants', async ({ page }) => {
    await expect(page.getByText('Heads up!')).toBeVisible();
    // Destructive alert
    await expect(page.getByText('Your session has expired')).toBeVisible();
  });

  test('renders Button variants', async ({ page }) => {
    // Multiple button labels exist in the sink
    const buttons = page.getByRole('button');
    await expect(buttons.first()).toBeVisible();
  });

  test('renders Checkbox and it toggles', async ({ page }) => {
    const checkbox = page.getByRole('checkbox').first();
    await expect(checkbox).toBeVisible();
    const initialState = await checkbox.isChecked();
    await checkbox.click();
    const newState = await checkbox.isChecked();
    expect(newState).not.toBe(initialState);
  });

  test('renders Dialog trigger and opens dialog', async ({ page }) => {
    const trigger = page.getByRole('button', { name: /Delete Account/i });
    await expect(trigger).toBeVisible();
    await trigger.click();
    // Dialog should appear
    await expect(page.getByRole('alertdialog')).toBeVisible();
  });

  test('renders Table with headers', async ({ page }) => {
    await expect(page.getByText('Invoice')).toBeVisible();
  });

  test('renders Progress bar', async ({ page }) => {
    const progress = page.getByRole('progressbar').first();
    await expect(progress).toBeVisible();
  });

  test('renders Tabs', async ({ page }) => {
    await expect(page.getByRole('tab').first()).toBeVisible();
  });
});
