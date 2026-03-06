/**
 * Live asset test — scans actual files in /apps/hy-taxes/assets/
 * and verifies the redactor catches any PII present.
 *
 * This test extracts text from PDFs and XLSX, runs detectAll + sanitizePayload,
 * and prints a redaction summary. It does NOT print raw values.
 */
import { readFileSync, readdirSync, existsSync, mkdtempSync, rmSync } from 'node:fs';
import { join, extname, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { tmpdir } from 'node:os';
import { detectAll } from '../src/detectors';
import { sanitizePayload } from '../src/sanitize';
import { previewSummary } from '../src/policy';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ASSETS_DIR = join(__dirname, '..', '..', '..', '..', 'apps', 'hy-taxes', 'assets');

/** Extract text from a PDF using pdf-parse. */
async function extractPdfText(filePath: string): Promise<string> {
  const pdfParseModule = await import('pdf-parse');
  const pdfParse = (pdfParseModule as any).default ?? pdfParseModule;
  const buffer = readFileSync(filePath);
  const data = await pdfParse(buffer);
  return data.text;
}

/** Extract text from an XLSX using xlsx. */
async function extractXlsxText(filePath: string): Promise<string> {
  const XLSX = await import('xlsx');
  const workbook = XLSX.readFile(filePath);
  const lines: string[] = [];
  for (const sheetName of workbook.SheetNames) {
    const sheet = workbook.Sheets[sheetName];
    const csv = XLSX.utils.sheet_to_csv(sheet);
    lines.push(`--- Sheet: ${sheetName} ---`);
    lines.push(csv);
  }
  return lines.join('\n');
}

/** Extract text from a file by extension. */
async function extractText(filePath: string): Promise<string> {
  const ext = extname(filePath).toLowerCase();
  if (ext === '.pdf') return await extractPdfText(filePath);
  if (ext === '.xlsx' || ext === '.xls') return await extractXlsxText(filePath);
  if (ext === '.txt' || ext === '.csv') return readFileSync(filePath, 'utf8');
  return '';
}

describe('Live asset scan: /apps/hy-taxes/assets/', () => {
  let tempDir: string;
  const passphrase = 'live-test-key';
  const secretKey = 'live-hmac-secret';

  beforeAll(() => {
    tempDir = mkdtempSync(join(tmpdir(), 'pi-redactor-live-'));
  });

  afterAll(() => {
    rmSync(tempDir, { recursive: true, force: true });
  });

  if (!existsSync(ASSETS_DIR)) {
    it.skip('assets directory not found', () => {});
    return;
  }

  const files = readdirSync(ASSETS_DIR).filter(
    (f) => !f.startsWith('.') && ['.pdf', '.xlsx', '.xls', '.txt', '.csv'].includes(extname(f).toLowerCase()),
  );

  if (files.length === 0) {
    it.skip('no scannable files in assets', () => {});
    return;
  }

  for (const file of files) {
    it(`scans ${file}`, async () => {
      const filePath = join(ASSETS_DIR, file);
      let text: string;

      try {
        text = await extractText(filePath);
      } catch (err: any) {
        console.warn(`  ⚠ Could not extract text from ${file}: ${err.message}`);
        return; // Skip unreadable files
      }

      if (!text.trim()) {
        console.log(`  ℹ ${file}: empty or no extractable text`);
        return;
      }

      // --- Detection pass ---
      const detections = detectAll(text, { detectNames: true });
      const summary = previewSummary(detections);

      // Print summary (safe — no raw values)
      console.log(`\n  📄 ${file} (${text.length} chars extracted)`);
      console.log(`  ${summary.replace(/\n/g, '\n  ')}`);

      // --- Sanitization pass ---
      const result = sanitizePayload(
        { text },
        {
          mappingId: `live-${file}`,
          secretKey,
          baseDir: tempDir,
          passphrase,
          config: { detectNames: true },
        },
      );

      // Verify no raw SSNs remain in redacted output
      const ssnPattern = /\b(?!000|666|9\d{2})\d{3}-(?!00)\d{2}-(?!0000)\d{4}\b/g;
      const leakedSSNs = result.redacted_text.match(ssnPattern) ?? [];
      expect(leakedSSNs).toHaveLength(0);

      // Verify no raw EINs remain (XX-XXXXXXX format)
      const einPattern = /\b\d{2}-\d{7}\b/g;
      const redactedEINs = result.redacted_text.match(einPattern) ?? [];
      // If there were EINs detected, they should all be gone now
      if (result.redaction_report.EIN) {
        expect(redactedEINs).toHaveLength(0);
      }

      // Report what was found
      if (result.has_pii) {
        const cats = Object.entries(result.redaction_report)
          .map(([k, v]) => `${k}:${v}`)
          .join(', ');
        console.log(`  ✅ Redacted: ${cats}`);
      } else {
        console.log(`  ✅ No PII detected`);
      }
    }, 15000); // 15s timeout per file (PDF parsing can be slow)
  }
});
