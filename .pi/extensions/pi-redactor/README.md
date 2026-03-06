# pi-redactor

A Pi extension that detects and redacts sensitive data (PII/tax identifiers) from all outbound LLM requests. Mappings are stored locally with AES-256-GCM encryption — **originals never leave your machine**.

## How it works

```
User prompt ──► Detectors scan for PII ──► Policy check ──► Redact ──► LLM sees tokens only
                                              │                          │
                                              ▼                          ▼
                                         BLOCK if hard PII          [SSN_1], [EMAIL_2], etc.
                                         unless allowed
                                                                     │
                                         Mapping saved locally ◄─────┘
                                         (AES-256-GCM encrypted)
```

## Installation

1. The extension lives at `.pi/extensions/pi-redactor/` in your project (auto-discovered by Pi).

2. Install dev dependencies (only needed for running tests):
   ```bash
   cd .pi/extensions/pi-redactor
   npm install
   ```

3. Set up an encryption key (one of):
   ```bash
   # macOS Keychain (preferred)
   security add-generic-password -s "pi-redactor" -a "encryption-key" -w "your-secret-key" -U

   # Or environment variable
   export PI_REDACTOR_KEY="your-secret-key"
   ```

4. Start Pi — the extension loads automatically:
   ```bash
   pi
   # Status bar shows: 🛡️ Redactor active
   ```

## What it detects

| Category    | Pattern                        | Validation           |
|-------------|--------------------------------|----------------------|
| `SSN`       | XXX-XX-XXXX (US)               | Prefix/group rules   |
| `EIN`       | XX-XXXXXXX (Federal Tax ID)    | Valid prefix set      |
| `CC`        | 13-19 digit card numbers       | Luhn checksum         |
| `ROUTING`   | 9-digit ABA routing numbers    | ABA checksum          |
| `BANK_ACCT` | 6-17 digits + banking context  | Context heuristic     |
| `EMAIL`     | Standard email format          | Regex                 |
| `PHONE`     | US phone numbers               | 10-11 digit check     |
| `DOB`       | Dates near "born"/"DOB"        | Context heuristic     |
| `ADDRESS`   | Street number + suffix         | Suffix dictionary     |
| `NAME`      | Capitalized names (opt-in)     | Context + deny/allow  |

## Policy

**Default:** Hard PII (SSN, EIN, CC, routing, bank account) **blocks** the request outright. The user gets a confirmation dialog to proceed with redaction.

**Soft PII** (email, phone, DOB, address, name) is redacted but doesn't block.

Override in `~/.pi-redactor/config.json`:
```json
{
  "policy": {
    "allowSensitive": true,
    "redact": true
  }
}
```

- `allowSensitive: true` — don't block on hard PII (still redacts)
- `redact: false` — skip redaction entirely (requires `allowSensitive: true`)

## Token mapping

Same value → same token within a session:
```
Input:  "SSN 123-45-6789 appears again: 123-45-6789"
Output: "SSN [SSN_1] appears again: [SSN_1]"
```

Different values get sequential tokens:
```
Input:  "SSN1: 123-45-6789, SSN2: 234-56-7890"
Output: "SSN1: [SSN_1], SSN2: [SSN_2]"
```

Mappings are deterministic per `mapping_id` using HMAC-SHA256 (originals never stored as keys).

## Commands

| Command                | Description                                      |
|------------------------|--------------------------------------------------|
| `/redactor-preview`    | Scan text and show detection summary (no values)  |
| `/redactor-list`       | List all stored mapping IDs                       |
| `/redactor-delete <id>`| Delete a stored mapping                           |
| `/redactor-rehydrate`  | Restore originals locally (editor, never sent)    |
| `/redactor-status`     | Show current configuration                        |

## Configuration

`~/.pi-redactor/config.json`:
```json
{
  "detectNames": false,
  "nameAllowlist": ["Company Name"],
  "nameDenylist": ["Jane Doe"],
  "customPatterns": [
    {
      "name": "Passport",
      "category": "SSN",
      "pattern": "\\b[A-Z]{2}\\d{7}\\b",
      "flags": "g"
    }
  ],
  "policy": {
    "allowSensitive": false,
    "redact": true
  }
}
```

## Programmatic usage

```typescript
import {
  sanitizePayload,
  rehydrate,
  listMappings,
  deleteMapping,
  evaluatePolicy,
  detectAll,
  previewSummary,
} from '.pi/extensions/pi-redactor/src/index';

// Sanitize a prompt
const result = sanitizePayload(
  { text: 'My SSN is 123-45-6789' },
  { mappingId: 'my-session', secretKey: 'local-secret' },
);
console.log(result.redacted_text);  // "My SSN is [SSN_1]"
console.log(result.redaction_report); // { SSN: 1 }

// Sanitize tool JSON
const jsonResult = sanitizePayload(
  {
    text: 'Process this',
    json: { employee: { ssn: '123-45-6789', email: 'a@b.com' } },
  },
  { mappingId: 'my-session', secretKey: 'local-secret' },
);

// Rehydrate locally
const original = rehydrate(result.redacted_text, 'my-session');
// "My SSN is 123-45-6789" — NEVER send this to the LLM

// List / delete mappings
const ids = listMappings();
deleteMapping('old-session');
```

## Storage

```
~/.pi-redactor/
├── config.json              # User configuration
└── mappings/
    ├── <uuid>.enc.json      # AES-256-GCM encrypted mapping
    └── ...
```

Encryption key sources (in priority order):
1. **macOS Keychain** — `security find-generic-password -s "pi-redactor"`
2. **Environment variable** — `PI_REDACTOR_KEY`

## Testing

```bash
cd .pi/extensions/pi-redactor
npm install
npm test
```

Test suites:
- `detectors.test.ts` — Each detector individually + deduplication
- `crypto.test.ts` — HMAC determinism, AES encrypt/decrypt, tampering
- `sanitize.test.ts` — Full pipeline, JSON recursion, mapping persistence
- `policy.test.ts` — Block/allow decisions, preview summary
- `storage.test.ts` — Save/load/list/delete encrypted mappings
- `tax-fixtures.test.ts` — W-2 and 1099-INT snippets, no raw values leak

## Security constraints

- ❌ Mapping files never sent to the LLM
- ❌ Original values never logged
- ❌ Unredacted content never leaves the machine
- ✅ Tokens are opaque (`[SSN_1]`, `[EMAIL_2]`)
- ✅ Mappings encrypted at rest (AES-256-GCM)
- ✅ HMAC-SHA256 for hash-to-token lookup (originals not used as keys)
