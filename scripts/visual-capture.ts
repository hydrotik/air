#!/usr/bin/env npx tsx
/**
 * visual-capture.ts — Headless Playwright screenshot tool
 *
 * Captures screenshots of the component preview app for visual validation.
 * Runs headless Chromium — no macOS Screen Recording permission needed.
 *
 * Usage:
 *   npx tsx scripts/visual-capture.ts                          # all routes, full page
 *   npx tsx scripts/visual-capture.ts --route /editorial       # single route
 *   npx tsx scripts/visual-capture.ts --route /editorial --selector ".roster-section"
 *   npx tsx scripts/visual-capture.ts --route /editorial --scroll 2000
 *   npx tsx scripts/visual-capture.ts --route /editorial --viewport 1920x1080
 *   npx tsx scripts/visual-capture.ts --route /editorial --element "[role='meter']" --padding 20
 *   npx tsx scripts/visual-capture.ts --all                    # every route, full page
 *   npx tsx scripts/visual-capture.ts --theme light            # light mode
 *
 * Output: /tmp/hydrotik-captures/<route>-<timestamp>.png
 */

import { chromium, type Page, type Browser } from 'playwright';
import * as path from 'path';
import * as fs from 'fs';

// ── Config ──────────────────────────────────────────────────────────────────

const BASE_URL = process.env.BASE_URL || 'http://localhost:3100';
const OUTPUT_DIR = process.env.CAPTURE_DIR || '/tmp/hydrotik-captures';

const ALL_ROUTES = [
  '/',
  '/dashboard',
  '/inventory',
  '/plugin',
  '/datagrid',
  '/editorial',
];

// ── CLI args ────────────────────────────────────────────────────────────────

interface CaptureOptions {
  routes: string[];
  selector?: string;
  element?: string;
  scroll?: number;
  viewport: { width: number; height: number };
  fullPage: boolean;
  theme?: 'light' | 'dark';
  padding?: number;
  waitMs?: number;
}

function parseArgs(): CaptureOptions {
  const args = process.argv.slice(2);
  const opts: CaptureOptions = {
    routes: [],
    viewport: { width: 1440, height: 900 },
    fullPage: true,
    padding: 0,
    waitMs: 1000,
  };

  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case '--route':
      case '-r':
        opts.routes.push(args[++i]);
        break;
      case '--all':
      case '-a':
        opts.routes = [...ALL_ROUTES];
        break;
      case '--selector':
      case '-s':
        opts.selector = args[++i];
        opts.fullPage = false;
        break;
      case '--element':
      case '-e':
        opts.element = args[++i];
        opts.fullPage = false;
        break;
      case '--scroll':
        opts.scroll = parseInt(args[++i], 10);
        opts.fullPage = false;
        break;
      case '--viewport':
      case '-v': {
        const [w, h] = args[++i].split('x').map(Number);
        opts.viewport = { width: w, height: h };
        break;
      }
      case '--theme':
      case '-t':
        opts.theme = args[++i] as 'light' | 'dark';
        break;
      case '--no-full-page':
        opts.fullPage = false;
        break;
      case '--padding':
      case '-p':
        opts.padding = parseInt(args[++i], 10);
        break;
      case '--wait':
      case '-w':
        opts.waitMs = parseInt(args[++i], 10);
        break;
      case '--help':
      case '-h':
        console.log(`
visual-capture — Headless Playwright screenshot tool

Options:
  --route, -r <path>      Route to capture (repeatable). Default: /
  --all, -a               Capture all routes
  --selector, -s <css>    CSS selector — capture that element only
  --element, -e <css>     Alias for --selector
  --scroll <px>           Scroll Y before viewport capture
  --viewport, -v <WxH>    Viewport size (default: 1440x900)
  --theme, -t <name>      Set theme: light | dark
  --no-full-page          Viewport-only capture (no full page scroll)
  --padding, -p <px>      Padding around element captures
  --wait, -w <ms>         Wait after load (default: 1000ms)
  --help, -h              Show this help
`);
        process.exit(0);
    }
  }

  // Default to home route
  if (opts.routes.length === 0) opts.routes = ['/'];

  return opts;
}

// ── Capture logic ───────────────────────────────────────────────────────────

async function captureRoute(
  page: Page,
  route: string,
  opts: CaptureOptions,
): Promise<string[]> {
  const paths: string[] = [];
  const slug = route === '/' ? 'home' : route.replace(/^\//, '').replace(/\//g, '-');
  const ts = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);

  await page.goto(`${BASE_URL}${route}`, { waitUntil: 'networkidle' });

  // Set theme if requested
  if (opts.theme) {
    await page.evaluate((theme) => {
      document.documentElement.setAttribute('data-theme', theme);
    }, opts.theme);
    await page.waitForTimeout(300);
  }

  // Wait for rendering
  await page.waitForTimeout(opts.waitMs || 1000);

  // Element capture
  if (opts.element || opts.selector) {
    const sel = (opts.element || opts.selector)!;
    const elements = await page.locator(sel).all();

    if (elements.length === 0) {
      console.warn(`  ⚠ No elements found for selector: ${sel}`);
      return paths;
    }

    for (let j = 0; j < elements.length; j++) {
      const suffix = elements.length > 1 ? `-${j}` : '';
      const outPath = path.join(OUTPUT_DIR, `${slug}-element${suffix}-${ts}.png`);

      await elements[j].scrollIntoViewIfNeeded();
      await page.waitForTimeout(200);

      if (opts.padding && opts.padding > 0) {
        // Capture with padding by getting bounding box and clipping
        const box = await elements[j].boundingBox();
        if (box) {
          const clip = {
            x: Math.max(0, box.x - opts.padding),
            y: Math.max(0, box.y - opts.padding),
            width: box.width + opts.padding * 2,
            height: box.height + opts.padding * 2,
          };
          await page.screenshot({ path: outPath, clip });
        }
      } else {
        await elements[j].screenshot({ path: outPath });
      }

      paths.push(outPath);
      console.log(`  📸 ${outPath}`);
    }
    return paths;
  }

  // Scroll + viewport capture
  if (opts.scroll !== undefined) {
    await page.evaluate((y) => window.scrollTo(0, y), opts.scroll);
    await page.waitForTimeout(300);
    const outPath = path.join(OUTPUT_DIR, `${slug}-scroll${opts.scroll}-${ts}.png`);
    await page.screenshot({ path: outPath, fullPage: false });
    paths.push(outPath);
    console.log(`  📸 ${outPath}`);
    return paths;
  }

  // Full page capture
  const outPath = path.join(OUTPUT_DIR, `${slug}-${opts.fullPage ? 'full' : 'viewport'}-${ts}.png`);
  await page.screenshot({ path: outPath, fullPage: opts.fullPage });
  paths.push(outPath);
  console.log(`  📸 ${outPath}`);

  return paths;
}

// ── Main ────────────────────────────────────────────────────────────────────

async function main() {
  const opts = parseArgs();
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  console.log(`\n🔍 Hydrotik Visual Capture`);
  console.log(`   Base URL:  ${BASE_URL}`);
  console.log(`   Viewport:  ${opts.viewport.width}×${opts.viewport.height}`);
  console.log(`   Routes:    ${opts.routes.join(', ')}`);
  if (opts.theme) console.log(`   Theme:     ${opts.theme}`);
  if (opts.element || opts.selector) console.log(`   Selector:  ${opts.element || opts.selector}`);
  if (opts.scroll !== undefined) console.log(`   Scroll:    ${opts.scroll}px`);
  console.log('');

  let browser: Browser | undefined;
  try {
    browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
      viewport: opts.viewport,
      deviceScaleFactor: 2, // Retina-quality captures
      colorScheme: opts.theme === 'light' ? 'light' : 'dark',
    });
    const page = await context.newPage();

    const allPaths: string[] = [];
    for (const route of opts.routes) {
      console.log(`📄 ${route}`);
      const captured = await captureRoute(page, route, opts);
      allPaths.push(...captured);
    }

    await context.close();

    console.log(`\n✅ ${allPaths.length} screenshot(s) saved to ${OUTPUT_DIR}/\n`);
  } catch (err) {
    console.error('❌ Capture failed:', err);
    process.exit(1);
  } finally {
    await browser?.close();
  }
}

main();
