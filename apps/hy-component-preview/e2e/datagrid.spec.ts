import { test, expect } from '@playwright/test';

test.describe('DataGrid Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('renders page title and subtitle', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'DataGrid' })).toBeVisible();
    await expect(page.getByText('Enterprise-grade data grid')).toBeAttached();
  });

  test('renders Full Featured section', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Full Featured' })).toBeAttached();
  });

  test('renders global search input', async ({ page }) => {
    await expect(page.getByPlaceholder('Search all columns…').first()).toBeAttached();
  });

  test('renders Columns visibility button', async ({ page }) => {
    await expect(page.getByLabel('Toggle column visibility').first()).toBeAttached();
  });

  test('renders header cells', async ({ page }) => {
    await expect(page.getByText('Employee', { exact: true }).first()).toBeAttached();
    await expect(page.getByText('Department', { exact: true }).first()).toBeAttached();
    await expect(page.getByText('Salary', { exact: true }).first()).toBeAttached();
  });

  test('renders employee data rows', async ({ page }) => {
    await expect(page.getByText('James Smith').first()).toBeAttached();
    await expect(page.getByText('james.smith@example.com').first()).toBeAttached();
    await expect(page.getByText('Engineering').first()).toBeAttached();
  });

  test('renders status badges', async ({ page }) => {
    await expect(page.getByText('active', { exact: true }).first()).toBeAttached();
    await expect(page.getByText('inactive', { exact: true }).first()).toBeAttached();
  });

  test('renders column filter inputs', async ({ page }) => {
    await expect(page.getByPlaceholder('Filter Employee…')).toBeAttached();
    await expect(page.getByPlaceholder('Filter Department…')).toBeAttached();
  });

  test('renders select-all checkbox', async ({ page }) => {
    await expect(page.getByLabel('Select all rows')).toBeAttached();
  });

  test('renders pagination controls', async ({ page }) => {
    await expect(page.getByText('Rows per page:')).toBeAttached();
    await expect(page.getByLabel('First page')).toBeAttached();
    await expect(page.getByLabel('Next page')).toBeAttached();
  });

  test('renders Minimal section', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Minimal' })).toBeAttached();
  });

  test('renders Tree Data section', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Tree Data' })).toBeAttached();
  });

  test('renders Loading State section', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Loading State' })).toBeAttached();
  });

  test('renders Empty State section', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Empty State' })).toBeAttached();
    await expect(page.getByText('No employees found')).toBeAttached();
  });
});
