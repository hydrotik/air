import { test, expect } from '@playwright/test';

test.describe('Editorial Data Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/editorial');
  });

  test('renders header with title and stats bar', async ({ page }) => {
    await expect(page.locator('text=Data Narrative 19').first()).toBeVisible();
    await expect(page.locator('text=Money Touched').first()).toBeVisible();
    await expect(page.locator('text=$2.146B').first()).toBeVisible();
  });

  test('renders section breaks', async ({ page }) => {
    await expect(page.locator('h2:has-text("The Institutions")').first()).toBeVisible();
    await expect(page.locator('h2:has-text("The Shell Entities")').first()).toBeVisible();
    await expect(page.locator('h2:has-text("The Operators")').first()).toBeVisible();
    await expect(page.locator('h2:has-text("The Key Persons")').first()).toBeVisible();
    await expect(page.locator('h2:has-text("The Gaps")').first()).toBeVisible();
  });

  test('renders viz link card', async ({ page }) => {
    await expect(page.locator('text=Interactive Companion').first()).toBeVisible();
    await expect(page.locator('text=Blueprint of a Financial Machine').first()).toBeVisible();
  });

  test('renders shell entity DataGrid', async ({ page }) => {
    await expect(page.locator('text=Meridian Trust Company').first()).toBeVisible();
    await expect(page.locator('text=Austral Financial LLC').first()).toBeVisible();
  });

  test('renders operator callout', async ({ page }) => {
    await expect(page.locator('text=Operator Volume Summary')).toBeVisible();
    await expect(page.locator('text=$320.1M').first()).toBeVisible();
  });

  test('renders pull quotes', async ({ page }) => {
    await expect(page.locator('text=That\'s not an accident. That\'s architecture.').first()).toBeVisible();
  });

  test('renders timeline section with chart', async ({ page }) => {
    await expect(page.locator('h2:has-text("When the Money Moved")').first()).toBeVisible();
    await expect(page.locator('text=MONTHLY').first()).toBeVisible();
    await expect(page.locator('text=ANNUAL').first()).toBeVisible();
  });

  test('renders entity roster with categories', async ({ page }) => {
    await expect(page.locator('h3:has-text("The Names")').first()).toBeVisible();
    await expect(page.locator('text=Principal Subjects').first()).toBeVisible();
    await expect(page.locator('text=Fund Managers').first()).toBeVisible();
  });

  test('renders source rating pip bars', async ({ page }) => {
    const bars = page.locator('[role="meter"][aria-label="Source coverage"]');
    expect(await bars.count()).toBeGreaterThan(0);
  });

  test('renders entity explorer DataGrid with pagination', async ({ page }) => {
    await expect(page.locator('h2:has-text("Entity Explorer")').first()).toBeVisible();
    await expect(page.locator('text=69 row(s)').first()).toBeVisible();
  });

  test('renders vehicle section', async ({ page }) => {
    await expect(page.locator('text=Financial Vehicles').first()).toBeVisible();
    await expect(page.locator('text=Meridian Trust Co.').first()).toBeVisible();
  });

  test('renders source corpus pills', async ({ page }) => {
    await expect(page.locator('text=Source Corpus').first()).toBeVisible();
    await expect(page.locator('text=publication ledger').first()).toBeVisible();
  });

  test('renders footer with disclaimer', async ({ page }) => {
    await expect(page.locator('text=design system demonstration').first()).toBeVisible();
  });

  test('navigates to editorial via navbar', async ({ page }) => {
    await page.goto('/');
    await page.click('a[href="/editorial"]');
    await expect(page).toHaveURL(/\/editorial/);
    await expect(page.locator('text=Data Narrative 19').first()).toBeVisible();
  });
});
