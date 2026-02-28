import { test, expect } from '@playwright/test';

test.describe('Theme', () => {
  test('dark theme is applied by default', async ({ page }) => {
    await page.goto('/');
    const html = page.locator('html');
    await expect(html).toHaveAttribute('data-theme', 'dark');
  });

  test('page has dark background color', async ({ page }) => {
    await page.goto('/');
    const bgColor = await page.evaluate(() => {
      return getComputedStyle(document.documentElement).backgroundColor;
    });
    // Dark theme should have a dark background (low RGB values)
    const match = bgColor.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
    if (match) {
      const [, r, g, b] = match.map(Number);
      expect(r).toBeLessThan(60);
      expect(g).toBeLessThan(60);
      expect(b).toBeLessThan(60);
    }
  });

  test('no runtime errors on page load', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));
    await page.goto('/');
    await page.waitForTimeout(2000);
    expect(errors).toEqual([]);
  });
});
