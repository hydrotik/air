#!/usr/bin/env node
/**
 * Standalone scanner: extracts text from PDFs/XLSX in /apps/hy-taxes/assets/
 * and runs pi-redactor's detection + sanitization pipeline.
 *
 * Usage: PI_REDACTOR_KEY=test node scan-assets.cjs
 *
 * Outputs detection summaries only — never prints raw PII values.
 */
const fs = require('fs');
const path = require('path');
const os = require('os');
const crypto = require('crypto');

const ASSETS_DIR = path.join(__dirname, '..', '..', '..', 'apps', 'hy-taxes', 'assets');

// ── Inline the core logic (CJS-compatible) ──
// We can't easily import the ESM src, so we duplicate the detectors here for the scanner.

const SSN_RE = /\b(?!000|666|9\d{2})\d{3}[- ]?(?!00)\d{2}[- ]?(?!0000)\d{4}\b/g;
const EIN_RE = /\b(\d{2})-(\d{7})\b/g;
const EMAIL_RE = /\b[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}\b/g;
const PHONE_RE = /(?:\+?1[\s.-]?)?(?:\(?\d{3}\)?[\s.\-]?)?\d{3}[\s.\-]?\d{4}\b/g;
const CC_RE = /\b(?:\d[ \-]?){13,19}\b/g;
const ROUTING_RE = /\b\d{9}\b/g;
const BANK_RE = /\b\d{6,17}\b/g;
const BANK_CTX = /\b(?:account\s*(?:number|num|no|#)?|acct|bank\s*(?:account|acct)|checking|savings|deposit)\b/i;
const ADDR_SUFFIXES = 'Street|St|Avenue|Ave|Boulevard|Blvd|Drive|Dr|Lane|Ln|Road|Rd|Court|Ct|Circle|Way|Place|Pl|Trail|Trl|Parkway|Pkwy|Highway|Hwy';
const ADDR_RE = new RegExp(`\\b(\\d{1,6})\\s+([A-Z][A-Za-z0-9\\s]{1,40})\\b\\s*(?:${ADDR_SUFFIXES})\\.?\\b`, 'gi');
const DOB_RE = /\b(0[1-9]|1[0-2])[\/\-\.](0[1-9]|[12]\d|3[01])[\/\-\.](\d{4}|\d{2})\b/g;
const DOB_CTX = /\b(?:born|birth|dob|date\s+of\s+birth|birthday|d\.o\.b)\b/i;

function luhn(num) {
  const d = num.replace(/\D/g, '');
  if (d.length < 13 || d.length > 19) return false;
  let sum = 0, alt = false;
  for (let i = d.length - 1; i >= 0; i--) {
    let n = +d[i];
    if (alt) { n *= 2; if (n > 9) n -= 9; }
    sum += n; alt = !alt;
  }
  return sum % 10 === 0;
}

function abaCheck(d) {
  const n = d.split('').map(Number);
  return (3*(n[0]+n[3]+n[6]) + 7*(n[1]+n[4]+n[7]) + (n[2]+n[5]+n[8])) % 10 === 0;
}

function scan(text) {
  const hits = {};
  function add(cat, matches) {
    if (matches.length) hits[cat] = (hits[cat] || 0) + matches.length;
  }

  // SSN
  const ssns = [...text.matchAll(SSN_RE)].map(m => m[0]);
  add('SSN', ssns);

  // EIN
  const eins = [...text.matchAll(EIN_RE)].map(m => m[0]);
  add('EIN', eins);

  // Email
  add('EMAIL', [...text.matchAll(EMAIL_RE)].map(m => m[0]));

  // Phone
  const phones = [...text.matchAll(PHONE_RE)]
    .map(m => m[0])
    .filter(p => { const d = p.replace(/\D/g, ''); return d.length >= 10 && d.length <= 11; });
  add('PHONE', phones);

  // Credit card (Luhn)
  const ccs = [...text.matchAll(CC_RE)]
    .map(m => m[0])
    .filter(c => { const d = c.replace(/\D/g, ''); return d.length >= 13 && d.length <= 19 && luhn(d); });
  add('CC', ccs);

  // Routing (ABA)
  const routes = [...text.matchAll(ROUTING_RE)]
    .map(m => m[0])
    .filter(r => abaCheck(r));
  add('ROUTING', routes);

  // Bank account (context)
  BANK_RE.lastIndex = 0;
  let bm;
  while ((bm = BANK_RE.exec(text)) !== null) {
    const before = text.slice(Math.max(0, bm.index - 80), bm.index);
    const after = text.slice(bm.index + bm[0].length, bm.index + bm[0].length + 30);
    if (BANK_CTX.test(before) || BANK_CTX.test(after)) {
      hits['BANK_ACCT'] = (hits['BANK_ACCT'] || 0) + 1;
    }
  }

  // Address
  add('ADDRESS', [...text.matchAll(ADDR_RE)].map(m => m[0]));

  // DOB (with context)
  DOB_RE.lastIndex = 0;
  let dm;
  while ((dm = DOB_RE.exec(text)) !== null) {
    const lookback = text.slice(Math.max(0, dm.index - 80), dm.index);
    if (DOB_CTX.test(lookback)) {
      hits['DOB'] = (hits['DOB'] || 0) + 1;
    }
  }

  return hits;
}

// ── Redact: replace detected PII with tokens ──
function redactText(text) {
  let result = text;
  const replacements = [];

  // SSN
  result = result.replace(SSN_RE, (m) => { replacements.push(['SSN', m]); return `[SSN_${replacements.filter(r=>r[0]==='SSN').length}]`; });
  // EIN
  result = result.replace(EIN_RE, (m) => { replacements.push(['EIN', m]); return `[EIN_${replacements.filter(r=>r[0]==='EIN').length}]`; });
  // Email
  result = result.replace(EMAIL_RE, (m) => { replacements.push(['EMAIL', m]); return `[EMAIL_${replacements.filter(r=>r[0]==='EMAIL').length}]`; });

  return { redacted: result, replacements };
}

// ── Main ──
async function main() {
  console.log('╔══════════════════════════════════════════════════════════╗');
  console.log('║          pi-redactor — Live Asset Scanner               ║');
  console.log('╚══════════════════════════════════════════════════════════╝\n');

  if (!fs.existsSync(ASSETS_DIR)) {
    console.error(`Assets directory not found: ${ASSETS_DIR}`);
    process.exit(1);
  }

  const files = fs.readdirSync(ASSETS_DIR).filter(f => !f.startsWith('.'));
  console.log(`Found ${files.length} file(s) in ${ASSETS_DIR}\n`);

  for (const file of files) {
    const filePath = path.join(ASSETS_DIR, file);
    const ext = path.extname(file).toLowerCase();
    let text = '';

    console.log(`─── ${file} ───`);

    try {
      if (ext === '.pdf') {
        const pdfParse = require('pdf-parse');
        const buffer = fs.readFileSync(filePath);
        const data = await pdfParse(buffer);
        text = data.text;
      } else if (ext === '.xlsx' || ext === '.xls') {
        const XLSX = require('xlsx');
        const wb = XLSX.readFile(filePath);
        const sheets = [];
        for (const name of wb.SheetNames) {
          sheets.push(XLSX.utils.sheet_to_csv(wb.Sheets[name]));
        }
        text = sheets.join('\n');
      } else if (ext === '.txt' || ext === '.csv') {
        text = fs.readFileSync(filePath, 'utf8');
      } else {
        console.log(`  ⏭  Skipped (unsupported format: ${ext})\n`);
        continue;
      }
    } catch (err) {
      console.log(`  ⚠  Could not extract text: ${err.message}\n`);
      continue;
    }

    if (!text.trim()) {
      console.log(`  ℹ  Empty or no extractable text.\n`);
      continue;
    }

    console.log(`  📄 Extracted ${text.length} characters`);

    // Detection
    const hits = scan(text);
    const categories = Object.keys(hits);

    if (categories.length === 0) {
      console.log('  ✅ No PII detected.\n');
      continue;
    }

    console.log('  🔍 Detections (counts only — no raw values):');
    const HARD = new Set(['SSN', 'EIN', 'CC', 'ROUTING', 'BANK_ACCT']);
    for (const [cat, count] of Object.entries(hits)) {
      const severity = HARD.has(cat) ? '🔴 HARD' : '🟡 SOFT';
      console.log(`     ${severity}  ${cat}: ${count} occurrence(s)`);
    }

    // Redaction sample (show first 200 chars of redacted output)
    const { redacted } = redactText(text);
    const ssnLeaked = /\b(?!000|666|9\d{2})\d{3}-(?!00)\d{2}-(?!0000)\d{4}\b/.test(redacted);
    const einLeaked = /\b\d{2}-\d{7}\b/.test(redacted);

    console.log(`  🛡️  Redaction check:`);
    console.log(`     SSN patterns remaining in output: ${ssnLeaked ? '❌ LEAKED' : '✅ CLEAN'}`);
    console.log(`     EIN patterns remaining in output: ${einLeaked ? '⚠️  CHECK (may be non-EIN)' : '✅ CLEAN'}`);
    console.log();
  }

  console.log('Done.');
}

main().catch(err => { console.error(err); process.exit(1); });
