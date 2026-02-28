import { test, expect } from '@playwright/test';

test.describe('Plugin Marketing Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/plugin');
  });

  test('renders hero section', async ({ page }) => {
    await expect(page.getByText('See everything.')).toBeAttached();
    await expect(page.getByText('Change nothing.')).toBeAttached();
    await expect(page.getByText('Now available for macOS')).toBeAttached();
  });

  test('renders CTA buttons', async ({ page }) => {
    await expect(page.getByRole('button', { name: /Download Free Trial/ }).first()).toBeVisible();
    await expect(page.getByRole('button', { name: /Watch Demo/ })).toBeVisible();
  });

  test('renders format badges', async ({ page }) => {
    await expect(page.getByText('AU', { exact: true }).first()).toBeAttached();
    await expect(page.getByText('VST3', { exact: true }).first()).toBeAttached();
    await expect(page.getByText('AAX', { exact: true }).first()).toBeAttached();
    await expect(page.getByText('Standalone', { exact: true }).first()).toBeAttached();
  });

  test('renders hero image', async ({ page }) => {
    const img = page.getByRole('img', { name: /TectraScope/ });
    await expect(img).toBeAttached();
  });

  test('renders stats section', async ({ page }) => {
    await expect(page.getByText('Analysis Panels', { exact: true })).toBeAttached();
    await expect(page.getByText('Bass Resolution', { exact: true })).toBeAttached();
    await expect(page.getByText('Latency', { exact: true })).toBeAttached();
    await expect(page.getByText('Plugin Formats', { exact: true })).toBeAttached();
  });

  test('renders feature cards', async ({ page }) => {
    await expect(page.getByText('Every frequency. Every channel. Every detail.')).toBeAttached();
    await expect(page.getByText('Dual-Resolution Spectrum', { exact: true })).toBeAttached();
    await expect(page.getByText('Lissajous Vectorscope', { exact: true })).toBeAttached();
  });

  test('renders comparison table', async ({ page }) => {
    await expect(page.getByText('How TectraScope compares')).toBeAttached();
    await expect(page.getByText('SPL HawkEye')).toBeAttached();
    await expect(page.getByText('iZotope Insight 2')).toBeAttached();
  });

  test('renders use cases', async ({ page }) => {
    await expect(page.getByText('Built for every workflow')).toBeAttached();
    await expect(page.getByText('Mixing', { exact: true })).toBeAttached();
    await expect(page.getByText('Mastering', { exact: true })).toBeAttached();
  });

  test('renders specs with tabs', async ({ page }) => {
    await expect(page.getByText('Technical specifications')).toBeAttached();
    await expect(page.getByText('Analysis', { exact: true })).toBeAttached();
    await expect(page.getByText('System', { exact: true })).toBeAttached();
  });

  test('renders DAW hosts', async ({ page }) => {
    await expect(page.getByText('Logic Pro')).toBeAttached();
    await expect(page.getByText('Ableton Live')).toBeAttached();
    await expect(page.getByText('Pro Tools')).toBeAttached();
  });

  test('renders bottom CTA', async ({ page }) => {
    await expect(page.getByText('Ready to see')).toBeAttached();
    await expect(page.getByRole('button', { name: /View Pricing/ })).toBeAttached();
  });

  test('renders footer', async ({ page }) => {
    await expect(page.getByText(/© \d{4} Hydrotik/)).toBeAttached();
  });

  test('navigates via navbar', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Plugin' }).click();
    await expect(page).toHaveURL('/plugin');
    await expect(page.getByText('See everything.')).toBeAttached();
  });
});
