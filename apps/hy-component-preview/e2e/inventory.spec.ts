import { test, expect } from '@playwright/test';

test.describe('Inventory Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/inventory');
  });

  test('renders sidebar navigation', async ({ page }) => {
    const sidebar = page.getByRole('complementary');
    await expect(sidebar.getByText('Store')).toBeAttached();
    await expect(sidebar.getByRole('button', { name: 'Dashboard' })).toBeVisible();
    await expect(sidebar.getByRole('button', { name: 'Orders' })).toBeVisible();
    await expect(sidebar.getByRole('button', { name: 'Products' })).toBeVisible();
    await expect(sidebar.getByRole('button', { name: 'Customers' })).toBeVisible();
  });

  test('renders KPI cards', async ({ page }) => {
    await expect(page.getByText('Total Revenue')).toBeAttached();
    await expect(page.getByText('$45,231.89').first()).toBeAttached();
    await expect(page.getByText('Orders', { exact: true }).first()).toBeAttached();
    await expect(page.getByText('Products Sold')).toBeAttached();
    await expect(page.getByText('Active Customers')).toBeAttached();
  });

  test('renders breadcrumb', async ({ page }) => {
    await expect(page.getByText('Store').first()).toBeVisible();
    await expect(page.getByText('Dashboard').first()).toBeVisible();
  });

  test('renders search and action buttons', async ({ page }) => {
    await expect(page.getByPlaceholder('Search products...')).toBeAttached();
    await expect(page.getByRole('button', { name: /Export/ })).toBeAttached();
    await expect(page.getByRole('button', { name: /Filter/ })).toBeAttached();
  });

  test('renders revenue chart', async ({ page }) => {
    await expect(page.getByText('Revenue over time')).toBeAttached();
  });

  test('renders category chart with selector', async ({ page }) => {
    await expect(page.getByText('Sales by Category')).toBeAttached();
  });

  test('renders recent orders', async ({ page }) => {
    await expect(page.getByText('Recent Orders')).toBeAttached();
    await expect(page.getByText('Olivia Martin')).toBeAttached();
    await expect(page.getByText('Delivered').first()).toBeAttached();
  });

  test('renders products table with tabs', async ({ page }) => {
    await expect(page.getByText('All Products')).toBeAttached();
    await expect(page.getByText('In Stock').first()).toBeAttached();
    await expect(page.getByText('Low Stock').first()).toBeAttached();
    await expect(page.getByText('Out of Stock').first()).toBeAttached();
  });

  test('renders product rows in table', async ({ page }) => {
    await expect(page.getByText('BJÖRKSNÄS Dining Table')).toBeAttached();
    await expect(page.getByText('STOCKHOLM Rug')).toBeAttached();
    await expect(page.getByText('FRIHETEN Sleeper Sofa')).toBeAttached();
  });

  test('renders pagination', async ({ page }) => {
    await expect(page.getByText('10 row(s)')).toBeAttached();
    await expect(page.getByText('Page 1 of 1')).toBeAttached();
  });

  test('sidebar nav changes breadcrumb', async ({ page }) => {
    await page.getByRole('button', { name: 'Products' }).click();
    await expect(page.getByText('Products').first()).toBeVisible();
  });

  test('navigates to inventory via navbar', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Inventory' }).click();
    await expect(page).toHaveURL('/inventory');
    await expect(page.getByText('Total Revenue')).toBeAttached();
  });
});
