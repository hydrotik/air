# hy-taxes — Product Requirements Document

## 1. Overview

**hy-taxes** is a local-first web application for organizing personal tax deductions, income, and recurring expenses. It replaces the current manual Excel workflow (`Deductions YYYY.xlsx`) with a structured UI that ingests transaction files from multiple financial sources, presents them in editable grids, and uses LLM assistance to categorize and analyze entries.

The application is part of the Hydrotik monorepo and uses the existing design system (`@hydrotik/design-system`). All sensitive financial data stays local — the `pi-redactor` extension ensures nothing leaks to the LLM.

### Current manual workflow (being replaced)

1. Download transaction exports (CSV, XLSX, PDF statements) from ~20+ financial sources
2. Open `Deductions YYYY.xlsx`, go to the **Status** sheet, track which sources are done
3. For each source: open the transaction file, manually scan for deductible items, copy Date + Description + Price into the appropriate **category section** on the Main sheet
4. Repeat for Music Equipment, Utilities Breakdown, Kim's expenses, and income sheets
5. Verify totals, hand the file to an accountant

### What the app does

- Imports transaction files (CSV, XLSX, PDF) from each financial source
- Extracts and normalizes transactions into a unified schema via LLM-assisted prompts or direct parsing
- Presents transactions in a filterable, editable grid per deduction category
- Tracks source ingestion status (replaces the Status sheet)
- Computes running totals per category and grand totals
- Supports LLM-assisted categorization (rule engine first, LLM validation/fallback) via Pi
- Exports the final organized data in a clean format for accountant handoff

### Design philosophy

The Excel template has worked for years because it's simple and direct. The app should translate that same simplicity — category-grouped line items with dates, descriptions, and amounts — into a grid UI with the added power of automated import, LLM categorization, and computed totals. No overengineering.

---

## 2. Architecture

### 2.1 No backend server

The app is a **static Vite SPA** with no BFF. All data lives in JSON files under `apps/hy-taxes/data/`. File ingestion and LLM analysis happen through Pi tools — the user runs Pi alongside the app and uses prompts or Pi commands to process transaction files into the JSON data store.

### 2.2 Data flow

```
Transaction files (CSV/XLSX/PDF)
        │
        ▼
Pi prompt / tool ──► LLM extracts + categorizes ──► writes JSON
        │                                              │
        │         pi-redactor intercepts               │
        │         (LLM sees tokens only)               │
        ▼                                              ▼
apps/hy-taxes/data/2025/                    React app reads JSON
├── deductions.json                         ├── renders grids
├── utilities.json                          ├── inline edit → saves JSON
├── equipment.json                          ├── manual add → saves JSON
├── kim.json                                └── totals auto-computed
├── income.json
├── sources.json
└── meta.json
```

### 2.3 JSON as the data layer

Each section is a standalone JSON file. The React app reads them on load, edits write back to the same files. Pi tools (`read`, `write`) handle file I/O during LLM-assisted ingestion. The user can also edit JSON directly if needed — the format is human-readable.

### 2.4 One year at a time

Each tax year gets its own directory: `data/2024/`, `data/2025/`, etc. The app loads whichever year is configured. No multi-year switching in the UI — start fresh each year by copying the source list from the previous year's `sources.json`.

---

## 3. Data Model

All data is stored as JSON files. Each file is an array of typed objects (or a single object for config/meta).

### 3.1 `meta.json` — Year metadata

```jsonc
{
  "year": 2025,
  "created_at": "2025-01-15T00:00:00Z",
  "status": "in_progress"  // "in_progress" | "complete"
}
```

### 3.2 `sources.json` — Financial sources + status

This file is the persistent source list. It stays roughly the same year to year. Copy it from the previous year and update as needed (e.g., add a new card for 2025).

```jsonc
[
  {
    "id": "aa-mastercard",
    "name": "AA Mastercard",
    "type": "credit_card",        // "credit_card" | "bank_account" | "platform" | "utility" | "other"
    "status": "not_started",      // "not_started" | "downloaded" | "imported" | "reviewed" | "done"
    "files": [],                  // filenames of imported files
    "schema": null                // column mapping (see §3.3), null until first import
  }
  // ... ~23 sources
]
```

**Default source list** (carried forward year to year):

| Source | Type | Export Format |
|--------|------|--------------|
| XCel | utility | — |
| AA Mastercard | credit_card | XLSX (no headers, 5 cols: date, desc, amount, _, category) |
| Amex | credit_card | XLSX (no headers, 4 cols: date, desc, amount, category) |
| Jetblue | credit_card | XLSX (headers: Date, Description, Amount) |
| Sony Card | credit_card | — |
| Best Buy | credit_card | — |
| Affirm | credit_card | — |
| TD Bills | bank_account | Monthly PDFs (manual read) |
| TD Shared | bank_account | Monthly PDFs (manual read) |
| TD Hydrotik | bank_account | Monthly PDFs (manual read) |
| Catapult | platform | PDF year-end statement |
| Navy Federal | credit_card | XLSX/CSV (no headers, 6 cols: date, amount, desc, category, _, account) |
| Paypal | platform | CSV (headers: Posting Date, Transaction Date, Amount, ...) |
| Fios | utility | — |
| ASCAP | platform | — |
| Venmo | platform | — |
| CapitalOne/ING | bank_account | — |
| ConEd | utility | — |
| Bandcamp | platform | CSV UTF-16 (headers: payout date, ..., paid to you, ...) |
| Vintage King | other | PDF invoices / manual |
| Perfect Circuit | other | PDF invoices / manual |
| Reverb | other | PDF invoices / manual |
| Sweetwater | other | PDF invoices / manual |

### 3.3 `schemas.json` — Column mappings per source

Persisted separately so the LLM or user only needs to define the mapping once. When a new file is imported from a known source, the schema tells the parser which columns map to date, description, amount, etc.

```jsonc
{
  "aa-mastercard": {
    "format": "xlsx",
    "has_header": false,
    "columns": {
      "date": 0,
      "description": 1,
      "amount": 2,
      "category": 4
    },
    "date_format": "M/DD/YY",
    "amount_is_negative_for_charges": false,
    "encoding": "utf-8",
    "notes": "Column 3 is always empty"
  },
  "amex": {
    "format": "xlsx",
    "has_header": false,
    "columns": {
      "date": 0,
      "description": 1,
      "amount": 2,
      "category": 3
    },
    "date_format": "M/DD/YY"
  },
  "jetblue": {
    "format": "xlsx",
    "has_header": true,
    "columns": {
      "date": "Date",
      "description": "Description",
      "amount": " Amount "
    }
  },
  "navy-federal": {
    "format": "xlsx",
    "has_header": false,
    "columns": {
      "date": 0,
      "amount": 1,
      "description": 2,
      "category": 3
    }
  },
  "bandcamp": {
    "format": "csv",
    "has_header": true,
    "encoding": "utf-16le",
    "columns": {
      "date": "payout date",
      "description": "description",
      "amount": "paid to you"
    }
  },
  "paypal": {
    "format": "csv",
    "has_header": true,
    "columns": {
      "date": "Transaction Date",
      "description": "Description",
      "amount": "Amount",
      "direction": "Credit Debit Indicator",
      "category": "Category"
    }
  }
}
```

**Schema discovery process**: When importing a source for the first time (no schema entry), the user can:
1. Use a Pi prompt to analyze the file: *"Read the file `assets/2025/Amex-2025.xlsx` and identify the column mapping for date, description, amount, and category. Save the schema to `data/2025/schemas.json` under the key `amex`."*
2. Or manually create the mapping in the JSON.
3. Once saved, the schema is reused for all future imports from that source.

### 3.4 `deductions.json` — Main deduction entries

```jsonc
[
  {
    "id": "d-001",
    "category": "office_equipment",
    "date": "4/11/2024",
    "description": "Magic Keyboard",
    "amount": 217.74,
    "source": "aa-mastercard",
    "notes": null,
    "created_by": "import",          // "import" | "manual" | "llm_suggested"
    "status": "confirmed"            // "pending" | "confirmed" | "excluded"
  }
]
```

**Deduction categories** (map to the Main sheet sections):

| Key | Display Name | Schedule Reference |
|-----|---|---|
| `books` | Books | Schedule C |
| `shipping` | Shipping/Mailing | Schedule C |
| `office_furnishings` | Office Furnishings | Similar to Equipment |
| `office_equipment` | Office Equipment | Schedule C |
| `office_supplies` | Office Supplies | Schedule C |
| `computer_software` | Computer Supplies/Software | Schedule C Part V |
| `advertising` | Advertising | Schedule C Line 8 |
| `hosting` | Hosting | Schedule C Part V |
| `dining` | Dining/Entertaining | Schedule C 24-b |
| `transportation` | Transportation | Schedule C Other Expenses |
| `medical` | Doctor/Medical | Schedule A |
| `education` | Education | Form 8863 |

Users can add custom categories. The category list itself is stored in `meta.json`.

### 3.5 `equipment.json` — Music equipment

```jsonc
[
  {
    "id": "eq-001",
    "date": "1/22/2024",
    "company": "Reverb",
    "description": "VoIS Modular (Dromedary)",
    "amount": 816.56,
    "equip_amount": 816.56,       // populated if amount >= 250
    "small_equip_amount": null,   // populated if amount < 250
    "source": "reverb",
    "notes": null
  }
]
```

The $250 threshold auto-populates `equip_amount` vs. `small_equip_amount` based on the `amount` field. User can override.

### 3.6 `utilities.json` — Monthly utility breakdown

```jsonc
[
  {
    "category": "cell",           // "cell" | "electricity" | "rent" | "internet" | "utilities_other" | "school" | "storage" | "transportation" | "car"
    "month": 1,                   // 1-12
    "date": "1/17/2025",
    "amount": 16.72
  }
]
```

### 3.7 `kim.json` — Kim's expenses

```jsonc
[
  {
    "id": "k-001",
    "category": "kim_books",      // "kim_cell" | "anthony_college" | "kim_transportation" | "kim_books"
    "date": "12/11/2024",
    "description": "",
    "amount": 84.86
  }
]
```

### 3.8 `income.json` — Income entries

```jsonc
[
  {
    "id": "inc-001",
    "source": "catapult",         // "catapult" | "bandcamp" | "w2" | "1099" | "other"
    "date": "5/19/2024",
    "description": "Cavida - digital sale",
    "amount": 2.29
  }
]
```

For W-2 and 1099 data: the user will add the tax form images (photos/scans) to the `assets/` folder and use a Pi prompt to extract the values via LLM vision, then write the results into `income.json`.

---

## 4. Categorization Engine

### 4.1 Rule engine (primary)

A keyword-to-category mapping applied first during import. Stored in `data/YYYY/rules.json`:

```jsonc
{
  "rules": [
    { "pattern": "godaddy|hostmysite",       "category": "hosting",           "flags": "i" },
    { "pattern": "ikea|staples|aoc",          "category": "office_equipment",  "flags": "i" },
    { "pattern": "avid|waves|native instruments|midjourney|openai|cable guys", "category": "computer_software", "flags": "i" },
    { "pattern": "hr block",                  "category": "computer_software", "flags": "i" },
    { "pattern": "fogo de chao|longhorn|kuruma|banana cafe", "category": "dining", "flags": "i" },
    { "pattern": "aa airlines|exxon|uber|lyft", "category": "transportation", "flags": "i" },
    { "pattern": "catapult",                  "category": "computer_software", "flags": "i" },
    { "pattern": "kinokuniya|amazon.*book|barnes",  "category": "books",      "flags": "i" },
    { "pattern": "buxton eye|cvs pharmacy|walgreens.*rx", "category": "medical", "flags": "i" },
    { "pattern": "sweetwater|reverb|perfect circuit|vintage king|sam ash", "category": "music_equipment", "flags": "i" }
  ]
}
```

- Patterns are regex (case-insensitive by default)
- Applied against the transaction `description` field
- First match wins
- Unmatched transactions get `category: null` (pending categorization)

### 4.2 LLM validation / fallback

After the rule engine runs:
1. **Unmatched transactions**: User can invoke LLM via Pi to categorize remaining items. Prompt template:
   > *"Here are uncategorized transactions. For each, suggest a category from this list: [categories]. Respond as JSON array."*
2. **Validation pass**: Optionally run the full categorized list past the LLM to catch miscategorizations:
   > *"Review these categorized deductions. Flag any that seem miscategorized."*
3. LLM-suggested entries are marked `created_by: "llm_suggested"` and `status: "pending"` until the user confirms.

---

## 5. User Interface

### 5.1 Layout

```
┌─────────────────────────────────────────────────────────┐
│  hy-taxes                  2025            [Export ▾]    │
├────────────┬────────────────────────────────────────────┤
│            │ [Deductions] [Utilities] [Kim] [Equipment] │
│  Sources   │ [Income] [Status]                          │
│  ────────  │────────────────────────────────────────────│
│  ◉ Amex    │                                            │
│  ◉ AA MC   │  Category: Office Equipment     [$1,283]   │
│  ○ TD Bills│  ┌──────┬──────────────────┬────────┐      │
│  ◉ Navy F  │  │ Date │ Description      │ Amount │      │
│  ○ Jetblue │  ├──────┼──────────────────┼────────┤      │
│  ...       │  │ 4/11 │ Magic Keyboard   │ 217.74 │      │
│            │  │ 7/8  │ Ikea             │ 355.14 │      │
│  ────────  │  │ ...  │ ...              │ ...    │      │
│  18/23 Done│  └──────┴──────────────────┴────────┘      │
│            │                                            │
│  DEDUCTIONS│  Category: Computer Software    [$1,442]   │
│  $7,055.38 │  ┌──────┬──────────────────┬────────┐      │
│  INCOME    │  │ ...  │ ...              │ ...    │      │
│  $4,209.45 │  └──────┴──────────────────┴────────┘      │
│            │                                            │
│            │  DEDUCTION GRAND TOTAL        $54,484.39   │
└────────────┴────────────────────────────────────────────┘
```

### 5.2 Source Status Panel (left sidebar)

- Lists all financial sources from `sources.json`
- Status indicator per source: ○ not started, ◐ in progress, ◉ done
- Click a source → highlights its transactions in the grid
- Bottom summary: source completion count, deduction grand total, income grand total
- **"+ Add Source"** button at the bottom to add a new card/account to `sources.json`

### 5.3 Main Content — Tabbed Sections

| Tab | Data File | Description |
|-----|-----------|-------------|
| **Deductions** | `deductions.json` | Main grid, grouped by category with subtotals |
| **Utilities** | `utilities.json` | 12-month × utility-type matrix |
| **Kim** | `kim.json` | Kim's expenses by sub-category |
| **Equipment** | `equipment.json` | Music equipment with company, equip/small-equip split |
| **Income** | `income.json` | Income by source (Catapult, Bandcamp, 1099, W-2) |
| **Status** | `sources.json` | Full source list with status management |

### 5.4 Deductions Grid

The primary view. A `DataGrid` grouped by deduction category.

**Columns**: Date | Description | Amount | Source | Actions

**Behavior**:
- Rows grouped under collapsible category headers
- Each category header shows: category name + subtotal
- **Grand Total** row at the bottom
- Inline editing: click a cell to edit, Enter to save, Escape to cancel
- **"+ Add"** button per category group header
- Row delete: trash icon → hard removes from JSON
- Row exclude: eye-slash icon → sets `status: "excluded"`, grays out, excluded from totals
- Filtering: by source, by category, by status
- Search: full-text on description

### 5.5 Utilities Breakdown View

A fixed grid — rows are utility categories, columns are months:

```
              Jan       Feb       Mar       ...    Dec      Total
Cell          $16.72    —         $100.00   ...    $31.34   $684.77
Electricity   $181.76   $217.33   $170.66   ...    $300.00  $2,957.71
Rent          $3,335.74 $3,335.74 $3,335.74 ...    —        $40,670.99
Internet      $245.92   $245.92   $245.92   ...    —        $3,015.93
School        —         —         —         ...    —        $156.00
Storage       $250.00   $250.00   $250.00   ...    —        $3,108.00
Transport     $4.00     $5.80     $14.50    ...    $6.94    $233.50
Car           —         —         —         ...    —        $0.00
```

- Click any cell to enter/edit the amount
- Empty cells shown as `—`
- Missing months highlighted (subtle yellow background) as a reminder to check
- Row and column totals auto-computed

### 5.6 Music Equipment View

**Columns**: Date | Company | Description | Price | Equip (≥$250) | Small Equip (<$250)

- `equip_amount` / `small_equip_amount` auto-populated from `amount` based on $250 threshold
- User can override the split
- Footer totals: Equip Total | Small Equip Total | Grand Total
- No receipt or location columns (out of scope)

### 5.7 Kim View

**Sub-sections**: Kim Cell | Anthony College | Kim Transportation | Kim Books

Each is a simple date + amount grid with subtotals.

### 5.8 Income View

**Sub-sections**: Catapult | Bandcamp | 1099 | W-2 | Other

Each is a date + description + amount grid. Grand total + "Income Less 1099" at the bottom.

For W-2 / 1099: the user adds images to `assets/` and uses Pi to extract:
> *"Look at the image `assets/2025/1099-MISC.jpg` and extract the income amounts. Write the entries to `data/2025/income.json`."*

### 5.9 Manual Entry

Every grid supports manual row addition:
- **"+ Add Entry"** button at the section or category level
- New row appears inline with empty editable fields
- User fills in date, description, amount
- On save → appended to the corresponding JSON file with `created_by: "manual"`

### 5.10 Edit / Remove

- **Inline edit**: Click cell → input appears → Enter saves, Escape cancels → JSON file updated
- **Delete**: Trash icon on row → removes from JSON
- **Exclude**: Toggle → sets `status: "excluded"` → grayed out, excluded from totals, still in JSON (restorable)

---

## 6. Import / Ingestion Process

There is no automated import pipeline in the app itself. Import happens through **Pi prompts** that read transaction files and write to the JSON data store.

### 6.1 Workflow

1. User downloads transaction files from each source (manual, as today)
2. Files placed in `apps/hy-taxes/assets/2025/`
3. User opens Pi and runs a prompt:
   > *"Read `assets/2025/Amex-2025.xlsx` using the schema in `data/2025/schemas.json` for source `amex`. Apply the categorization rules from `data/2025/rules.json`. Append the categorized transactions to `data/2025/deductions.json`. Mark any uncategorized items as `status: pending`."*
4. Pi (with `pi-redactor` active) processes the file, applies rules, writes JSON
5. User opens the app, reviews the grid, edits/confirms/excludes entries
6. User updates the source status in the sidebar

### 6.2 Schema discovery (first-time import)

For a new source with no schema:
> *"Read the first 5 rows of `assets/2025/NewCard-2025.xlsx` and determine the column mapping. Save it to `data/2025/schemas.json` under the key `new-card`."*

### 6.3 TD Bank PDFs (manual read)

TD Bank statements are monthly PDFs. The user reads them manually and enters utility amounts into the Utilities grid in the app. No PDF extraction automation — the PDF format is too variable and the data feeds into a fixed monthly matrix that's fast to hand-enter.

### 6.4 Tax form images (W-2, 1099)

User adds photos/scans to `assets/2025/` and uses Pi with vision:
> *"Look at `assets/2025/1099-MISC-2025.jpg`. Extract the payer name, EIN, recipient info, and income amounts. Write to `data/2025/income.json` with source `1099`."*

Pi-redactor will redact SSNs/EINs before the LLM processes the image description.

---

## 7. Date Handling

> **Important**: Transaction files contain dates that may not match the tax year. The **filename and source context is the source of truth** for which tax year a transaction belongs to, not individual row dates.

- Dates are stored as-is from the source file (string format preserved)
- Date formats vary: `MM/DD/YYYY`, `MM/DD/YY`, `M/DD`, `YYYY-MM-DD`, `Month DD, YYYY`
- The app displays dates as-is; no normalization needed for display
- If a row date's year differs from the tax year, show a subtle muted indicator but do NOT auto-exclude
- Sorting by date should parse the string intelligently (handle all formats)

---

## 8. Export

### 8.1 XLSX export

Generate a clean, reformatted Excel workbook with the same structure:
- **Main** sheet: categories as section headers, entries underneath, subtotals, grand total
- **Utilities Breakdown** sheet: month × category matrix
- **Kim** sheet: sub-category sections
- **Music Equipment** sheet: full equipment list with equip/small-equip split
- **Income** sheet: by source with grand total
- Does NOT need to replicate the exact row/column positions of the old template — a clean, professional layout is better

### 8.2 JSON export

The raw JSON files are already the machine-readable export. Copy `data/2025/` for archival.

---

## 9. Configuration Files Summary

All stored under `apps/hy-taxes/data/YYYY/`:

| File | Purpose | Modified by |
|------|---------|------------|
| `meta.json` | Year, status, category list | App |
| `sources.json` | Financial sources + ingestion status | App + User |
| `schemas.json` | Column mappings per source | Pi prompt + User |
| `rules.json` | Categorization rules (regex → category) | User + Pi |
| `deductions.json` | Main deduction entries | Pi + App |
| `equipment.json` | Music equipment entries | Pi + App |
| `utilities.json` | Monthly utility breakdown | App (manual entry) |
| `kim.json` | Kim's expenses | App (manual entry) |
| `income.json` | Income entries | Pi + App |

All files are gitignored (contain financial data). The app scaffolds empty defaults on first load if they don't exist.

---

## 10. Tech Stack

| Layer | Technology |
|-------|-----------|
| **UI** | React + `@hydrotik/design-system` (vanilla-extract, Radix) |
| **Grid** | `DataGrid` component (TanStack Table) |
| **State** | React state, reads/writes JSON files via `fetch` to local dev server |
| **File serving** | Vite dev server serves `data/` as static assets; writes via Pi tools |
| **LLM** | Pi extension system — prompts process files → write JSON |
| **PII protection** | `pi-redactor` (already built, auto-active) |
| **Build** | Vite, turbo pipeline, `@hydrotik/config` for port |
| **Port** | TBD — register in `packages/hy-config` |

---

## 11. Non-Functional Requirements

- **Performance**: Handle ~1,000 rows (largest observed: Music Equipment) without lag
- **Privacy**: No PII in logs, no network requests. `pi-redactor` covers the LLM channel
- **Offline**: Fully offline after `pnpm install`
- **Accessibility**: Keyboard-navigable grids, ARIA labels
- **Desktop-first**: 1440px+ primary target, sidebar collapses below 1024px

---

## 12. File & Folder Structure

```
apps/hy-taxes/
├── assets/                     # gitignored — raw source files
│   ├── 2025/                   # current year transaction files
│   │   ├── Amex-2025.xlsx
│   │   ├── Bandcamp-2025.csv
│   │   ├── 1099-MISC-2025.jpg
│   │   └── ...
│   └── old-2024/               # reference from previous year
├── data/                       # gitignored — app JSON data
│   └── 2025/
│       ├── meta.json
│       ├── sources.json
│       ├── schemas.json
│       ├── rules.json
│       ├── deductions.json
│       ├── equipment.json
│       ├── utilities.json
│       ├── kim.json
│       └── income.json
├── docs/
│   └── PRD.md                  # this file
├── src/                        # app source code (TBD)
├── package.json
└── vite.config.ts
```

---

## 13. Seed Data

On first run for a new year, the app should scaffold these defaults:

### `sources.json` — copy from previous year or use this default:

```jsonc
[
  { "id": "xcel",              "name": "XCel",             "type": "utility",      "status": "not_started", "files": [] },
  { "id": "aa-mastercard",     "name": "AA Mastercard",    "type": "credit_card",  "status": "not_started", "files": [] },
  { "id": "amex",              "name": "Amex",             "type": "credit_card",  "status": "not_started", "files": [] },
  { "id": "jetblue",           "name": "Jetblue",          "type": "credit_card",  "status": "not_started", "files": [] },
  { "id": "sony-card",         "name": "Sony Card",        "type": "credit_card",  "status": "not_started", "files": [] },
  { "id": "best-buy",          "name": "Best Buy",         "type": "credit_card",  "status": "not_started", "files": [] },
  { "id": "affirm",            "name": "Affirm",           "type": "credit_card",  "status": "not_started", "files": [] },
  { "id": "td-bills",          "name": "TD Bills",         "type": "bank_account", "status": "not_started", "files": [] },
  { "id": "td-shared",         "name": "TD Shared",        "type": "bank_account", "status": "not_started", "files": [] },
  { "id": "td-hydrotik",       "name": "TD Hydrotik",      "type": "bank_account", "status": "not_started", "files": [] },
  { "id": "catapult",          "name": "Catapult",         "type": "platform",     "status": "not_started", "files": [] },
  { "id": "navy-federal",      "name": "Navy Federal",     "type": "credit_card",  "status": "not_started", "files": [] },
  { "id": "paypal",            "name": "Paypal",           "type": "platform",     "status": "not_started", "files": [] },
  { "id": "fios",              "name": "Fios",             "type": "utility",      "status": "not_started", "files": [] },
  { "id": "ascap",             "name": "ASCAP",            "type": "platform",     "status": "not_started", "files": [] },
  { "id": "venmo",             "name": "Venmo",            "type": "platform",     "status": "not_started", "files": [] },
  { "id": "capitalone-ing",    "name": "CapitalOne/ING",   "type": "bank_account", "status": "not_started", "files": [] },
  { "id": "coned",             "name": "ConEd",            "type": "utility",      "status": "not_started", "files": [] },
  { "id": "bandcamp",          "name": "Bandcamp",         "type": "platform",     "status": "not_started", "files": [] },
  { "id": "vintage-king",      "name": "Vintage King",     "type": "other",        "status": "not_started", "files": [] },
  { "id": "perfect-circuit",   "name": "Perfect Circuit",  "type": "other",        "status": "not_started", "files": [] },
  { "id": "reverb",            "name": "Reverb",           "type": "other",        "status": "not_started", "files": [] },
  { "id": "sweetwater",        "name": "Sweetwater",       "type": "other",        "status": "not_started", "files": [] }
]
```

### `rules.json` — starting categorization rules:

```jsonc
{
  "rules": [
    { "pattern": "godaddy|hostmysite",                                    "category": "hosting",           "flags": "i" },
    { "pattern": "ikea|staples|aoc.*monitor|magic keyboard|jw winco",     "category": "office_equipment",  "flags": "i" },
    { "pattern": "avid|waves|native instruments|midjourney|openai|cable guys|cleaverbridge|tal software", "category": "computer_software", "flags": "i" },
    { "pattern": "hr block|turbotax",                                     "category": "computer_software", "flags": "i" },
    { "pattern": "fogo de chao|longhorn|kuruma|banana cafe|nobu|peter luger", "category": "dining",        "flags": "i" },
    { "pattern": "aa airlines|american airlines|exxon|uber|lyft|taxi|hertz|avis", "category": "transportation", "flags": "i" },
    { "pattern": "catapult",                                              "category": "computer_software", "flags": "i" },
    { "pattern": "kinokuniya|amazon.*book|barnes.*noble",                 "category": "books",             "flags": "i" },
    { "pattern": "buxton eye|cvs.*pharm|walgreens.*rx|lenscrafters",      "category": "medical",           "flags": "i" },
    { "pattern": "sweetwater|reverb|perfect circuit|vintage king|sam ash|guitar center", "category": "music_equipment", "flags": "i" },
    { "pattern": "ups store|usps|fedex",                                  "category": "shipping",          "flags": "i" },
    { "pattern": "squarespace|wix|mailchimp|facebook.*ad|google.*ad",     "category": "advertising",       "flags": "i" }
  ]
}
```

### `schemas.json` — known column mappings from 2024 analysis:

(Pre-populated from §3.3 above)

---

## 14. UI Component Mapping

Every piece of the UI is built from `@hydrotik/design-system` components. No ad-hoc HTML or one-off styles — all vanilla-extract + design tokens.

### 14.1 Available component inventory

The design system exports 63 components. The ones relevant to hy-taxes:

| Component | Design System Export | Usage in hy-taxes |
|-----------|---------------------|-------------------|
| `DataGrid` | `DataGrid`, `useDataGrid`, `createDataGrid`, `ColumnDef` | Every grid view (deductions, equipment, utilities, kim, income, status) |
| `Tabs` | `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent` | Main content tab switcher (Deductions / Utilities / Kim / Equipment / Income / Status) |
| `Sidebar` | `Sidebar`, `SidebarContent`, `SidebarGroup`, `SidebarGroupLabel`, `SidebarMenu`, `SidebarMenuItem`, `SidebarMenuButton`, `SidebarFooter` | Source status panel (left rail) |
| `Badge` | `Badge` | Source status badges (Done, Imported, Not Started), entry status indicators |
| `Button` | `Button` | All actions: Add Entry, Export, Delete, Save, etc. |
| `Card` | `Card`, `CardHeader`, `CardTitle`, `CardContent`, `CardFooter` | Summary cards (grand totals, category totals), source detail panels |
| `Input` | `Input` | Inline cell editing, manual entry forms |
| `Select` | `Select`, `SelectTrigger`, `SelectValue`, `SelectContent`, `SelectItem` | Category pickers, source type selectors, status dropdowns |
| `Dialog` | `Dialog`, `DialogTrigger`, `DialogContent`, `DialogHeader`, `DialogTitle`, `DialogDescription`, `DialogFooter` | Confirm delete, add source, export options |
| `AlertDialog` | `AlertDialog`, `AlertDialogAction`, `AlertDialogCancel`, `AlertDialogContent`, `AlertDialogDescription`, `AlertDialogFooter`, `AlertDialogHeader`, `AlertDialogTitle`, `AlertDialogTrigger` | Destructive confirmations (delete entry, clear all) |
| `DropdownMenu` | `DropdownMenu`, `DropdownMenuTrigger`, `DropdownMenuContent`, `DropdownMenuItem`, `DropdownMenuSeparator` | Row action menus (Edit / Exclude / Delete), Export menu |
| `Tooltip` | `Tooltip`, `TooltipTrigger`, `TooltipContent` | Truncated descriptions, date format hints, status explanations |
| `Progress` | `Progress` | Source completion progress bar in sidebar footer |
| `Separator` | `Separator` | Section dividers in sidebar, between category groups |
| `Skeleton` | `Skeleton` | Loading states while JSON files are being read |
| `ScrollArea` | `ScrollArea` | Sidebar scroll, grid container scroll |
| `Toggle` | `Toggle` | Show/hide excluded entries, compact view toggle |
| `Label` | `Label` | Form field labels in manual entry and dialogs |
| `Heading` | `Heading` | Section headings, category group headers |
| `Typography` | `Text`, `Mono` | Body text, monospace amounts |
| `Breadcrumb` | `Breadcrumb`, `BreadcrumbItem`, `BreadcrumbLink`, `BreadcrumbSeparator` | Navigation context (e.g., Deductions > Office Equipment) |
| `Sonner` | `toast` | Success/error notifications (entry saved, file imported, export complete) |
| `FlagTag` | `FlagTag` | Status flags on pending/excluded entries, LLM-suggested indicator |
| `Spinner` | `Spinner` | Loading indicator during file reads |
| `SegmentedRatingBar` | `SegmentedRatingBar` | Source completion visualization in sidebar (filled segments = done sources) |
| `Kbd` | `Kbd` | Keyboard shortcut hints (Ctrl+S to save, Enter to confirm edit) |
| `Alert` | `Alert`, `AlertTitle`, `AlertDescription` | Warnings (uncategorized entries remain, missing utility months) |
| `Form` | `Form`, `FormField`, `FormItem`, `FormLabel`, `FormControl`, `FormMessage` | Manual entry forms, add source form |
| `Checkbox` | `Checkbox` | Bulk selection in grids, toggle options |
| `Textarea` | `Textarea` | Notes field in manual entry |
| `Pagination` | `Pagination` | DataGrid pagination for large datasets (equipment, AA card transactions) |
| `Sheet` | `Sheet`, `SheetTrigger`, `SheetContent`, `SheetHeader`, `SheetTitle` | Mobile sidebar, detail panels |
| `Avatar` | `Avatar`, `AvatarFallback` | Source icons in sidebar (initials: "AM" for Amex, "TD" for TD Bank) |

### 14.2 DataGrid configuration per view

#### Deductions Grid

```tsx
<DataGrid<DeductionEntry>
  columns={deductionColumns}
  data={deductions.filter(d => d.status !== 'excluded' || showExcluded)}
  density="editorial"
  borderless
  transparent
  headerBorder="thick"
  rowSeparator="subtle"
  enableSorting
  enableGrouping
  enableEditing
  enableGlobalFilter
  showToolbar
  initialState={{
    grouping: ['category'],
    sorting: [{ id: 'date', desc: false }],
  }}
  onCellEdit={(rowId, columnId, value) => updateDeduction(rowId, columnId, value)}
  getRowId={(row) => row.id}
/>
```

**Column definitions**:

```tsx
const deductionColumns: ColumnDef<DeductionEntry>[] = [
  {
    id: 'category',
    accessorKey: 'category',
    header: 'Category',
    enableGrouping: true,
    cell: ({ value }) => CATEGORY_LABELS[value],
    // Grouped header shows: "Office Equipment — $1,283.87"
    aggregateFn: (columnId, leafRows) =>
      leafRows.reduce((sum, row) => sum + row.original.amount, 0),
  },
  {
    id: 'date',
    accessorKey: 'date',
    header: 'Date',
    size: 100,
    editable: true,
  },
  {
    id: 'description',
    accessorKey: 'description',
    header: 'Description',
    size: 300,
    editable: true,
  },
  {
    id: 'amount',
    accessorKey: 'amount',
    header: 'Amount',
    size: 120,
    align: 'right',
    editable: true,
    cell: ({ value }) => formatCurrency(value),
    footer: ({ table }) => formatCurrency(grandTotal(table)),
  },
  {
    id: 'source',
    accessorKey: 'source',
    header: 'Source',
    size: 140,
    cell: ({ value }) => <Badge variant="outline">{SOURCE_LABELS[value]}</Badge>,
  },
  {
    id: 'actions',
    header: '',
    size: 80,
    enableSorting: false,
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm"><Icons.IconDots size={14} /></Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => excludeEntry(row.original.id)}>
            <Icons.IconEyeOff size={14} /> Exclude
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => deleteEntry(row.original.id)} className="destructive">
            <Icons.IconTrash size={14} /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];
```

#### Equipment Grid

```tsx
<DataGrid<EquipmentEntry>
  columns={equipmentColumns}
  data={equipment}
  density="editorial"
  borderless
  transparent
  headerBorder="thick"
  rowSeparator="subtle"
  enableSorting
  enableEditing
  enableGlobalFilter
  showToolbar
  onCellEdit={handleEquipmentEdit}
/>
```

**Column definitions**:

```tsx
const equipmentColumns: ColumnDef<EquipmentEntry>[] = [
  { id: 'date', accessorKey: 'date', header: 'Date', size: 100, editable: true },
  { id: 'company', accessorKey: 'company', header: 'Company', size: 150, editable: true },
  { id: 'description', accessorKey: 'description', header: 'Description', size: 280, editable: true },
  {
    id: 'amount',
    accessorKey: 'amount',
    header: 'Price',
    size: 110,
    align: 'right',
    editable: true,
    cell: ({ value }) => formatCurrency(value),
    footer: ({ table }) => formatCurrency(equipTotal(table)),
  },
  {
    id: 'equip_amount',
    accessorKey: 'equip_amount',
    header: 'Equip ≥$250',
    size: 120,
    align: 'right',
    cell: ({ value }) => value ? formatCurrency(value) : '—',
    footer: ({ table }) => formatCurrency(equipOver250Total(table)),
  },
  {
    id: 'small_equip_amount',
    accessorKey: 'small_equip_amount',
    header: 'Small <$250',
    size: 120,
    align: 'right',
    cell: ({ value }) => value ? formatCurrency(value) : '—',
    footer: ({ table }) => formatCurrency(equipUnder250Total(table)),
  },
  { id: 'actions', /* ... same pattern as deductions ... */ },
];
```

#### Utilities Grid

The utilities view is a **custom grid layout** (not a standard DataGrid) because it's a fixed matrix (rows = utility types, columns = months). Built with:

```tsx
<Card borderless transparent>
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Category</TableHead>
        {MONTHS.map(m => <TableHead key={m} align="right">{m}</TableHead>)}
        <TableHead align="right">Total</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {UTILITY_CATEGORIES.map(cat => (
        <TableRow key={cat}>
          <TableCell><Text weight="medium">{UTILITY_LABELS[cat]}</Text></TableCell>
          {MONTHS.map((_, month) => (
            <TableCell key={month} align="right" onClick={() => editUtilityCell(cat, month)}>
              {getUtilityAmount(cat, month)
                ? <Mono>{formatCurrency(getUtilityAmount(cat, month))}</Mono>
                : <Text color="muted">—</Text>}
            </TableCell>
          ))}
          <TableCell align="right">
            <Mono weight="bold">{formatCurrency(utilityRowTotal(cat))}</Mono>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</Card>
```

When a cell is clicked, an inline `<Input>` appears for editing the amount.

#### Income Grid

```tsx
<DataGrid<IncomeEntry>
  columns={incomeColumns}
  data={income}
  density="editorial"
  borderless
  transparent
  headerBorder="thick"
  rowSeparator="subtle"
  enableSorting
  enableEditing
  enableGrouping
  initialState={{ grouping: ['source'] }}
  onCellEdit={handleIncomeEdit}
/>
```

#### Kim Grid

```tsx
<DataGrid<KimEntry>
  columns={kimColumns}
  data={kimExpenses}
  density="editorial"
  borderless
  transparent
  headerBorder="thick"
  rowSeparator="subtle"
  enableSorting
  enableEditing
  enableGrouping
  initialState={{ grouping: ['category'] }}
  onCellEdit={handleKimEdit}
/>
```

#### Status Grid

```tsx
<DataGrid<SourceEntry>
  columns={statusColumns}
  data={sources}
  density="compact"
  borderless
  headerBorder="thick"
  rowSeparator="subtle"
  noRowHover={false}
  onRowClick={(row) => highlightSourceTransactions(row.original.id)}
/>
```

**Column definitions**:

```tsx
const statusColumns: ColumnDef<SourceEntry>[] = [
  {
    id: 'name',
    accessorKey: 'name',
    header: 'Source',
    size: 200,
    cell: ({ row }) => (
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <Avatar size="sm"><AvatarFallback>{row.original.name.slice(0, 2)}</AvatarFallback></Avatar>
        <Text>{row.original.name}</Text>
      </div>
    ),
  },
  {
    id: 'type',
    accessorKey: 'type',
    header: 'Type',
    size: 130,
    cell: ({ value }) => <Badge variant="outline">{TYPE_LABELS[value]}</Badge>,
  },
  {
    id: 'status',
    accessorKey: 'status',
    header: 'Status',
    size: 130,
    cell: ({ value, row }) => (
      <Select value={value} onValueChange={(v) => updateSourceStatus(row.original.id, v)}>
        <SelectTrigger><SelectValue /></SelectTrigger>
        <SelectContent>
          <SelectItem value="not_started">Not Started</SelectItem>
          <SelectItem value="downloaded">Downloaded</SelectItem>
          <SelectItem value="imported">Imported</SelectItem>
          <SelectItem value="reviewed">Reviewed</SelectItem>
          <SelectItem value="done">Done</SelectItem>
        </SelectContent>
      </Select>
    ),
  },
  {
    id: 'files',
    accessorKey: 'files',
    header: 'Files',
    size: 80,
    align: 'center',
    cell: ({ value }) => <Text color="muted">{value.length}</Text>,
  },
];
```

### 14.3 Sidebar component tree

```tsx
<Sidebar>
  <SidebarContent>
    <SidebarGroup>
      <SidebarGroupLabel>
        <Heading as="h3" size="xs">Sources</Heading>
      </SidebarGroupLabel>
      <SidebarMenu>
        {sources.map(source => (
          <SidebarMenuItem key={source.id}>
            <SidebarMenuButton
              isActive={activeSource === source.id}
              onClick={() => setActiveSource(source.id)}
            >
              <Avatar size="xs">
                <AvatarFallback>{source.name.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <span>{source.name}</span>
              <Badge variant={statusVariant(source.status)} size="xs">
                {STATUS_LABELS[source.status]}
              </Badge>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>

    <Separator />

    <SidebarGroup>
      <SidebarGroupLabel>Summary</SidebarGroupLabel>
      <Card transparent borderless>
        <CardContent>
          <SegmentedRatingBar
            value={doneCount}
            total={sources.length}
            size="md"
            color="primary"
          />
          <Text size="xs" color="muted">{doneCount}/{sources.length} sources done</Text>
        </CardContent>
      </Card>
      <Separator />
      <div>
        <Text size="xs" color="muted">DEDUCTIONS</Text>
        <Heading as="h4" size="sm">{formatCurrency(deductionGrandTotal)}</Heading>
      </div>
      <div>
        <Text size="xs" color="muted">INCOME</Text>
        <Heading as="h4" size="sm">{formatCurrency(incomeGrandTotal)}</Heading>
      </div>
    </SidebarGroup>
  </SidebarContent>

  <SidebarFooter>
    <Button variant="outline" size="sm" onClick={addSource}>
      <Icons.IconPlus size={14} /> Add Source
    </Button>
  </SidebarFooter>
</Sidebar>
```

### 14.4 Add Entry dialog

```tsx
<Dialog>
  <DialogTrigger asChild>
    <Button variant="outline" size="sm">
      <Icons.IconPlus size={14} /> Add Entry
    </Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Add Deduction Entry</DialogTitle>
      <DialogDescription>Manually add a deduction to {CATEGORY_LABELS[category]}</DialogDescription>
    </DialogHeader>
    <Form onSubmit={handleAddEntry}>
      <FormField name="date">
        <FormItem>
          <FormLabel>Date</FormLabel>
          <FormControl><Input placeholder="MM/DD/YYYY" /></FormControl>
        </FormItem>
      </FormField>
      <FormField name="description">
        <FormItem>
          <FormLabel>Description</FormLabel>
          <FormControl><Input placeholder="Merchant or item name" /></FormControl>
        </FormItem>
      </FormField>
      <FormField name="amount">
        <FormItem>
          <FormLabel>Amount</FormLabel>
          <FormControl><Input type="number" step="0.01" placeholder="0.00" /></FormControl>
        </FormItem>
      </FormField>
      <FormField name="source">
        <FormItem>
          <FormLabel>Source</FormLabel>
          <FormControl>
            <Select>
              <SelectTrigger><SelectValue placeholder="Select source" /></SelectTrigger>
              <SelectContent>
                {sources.map(s => <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>)}
              </SelectContent>
            </Select>
          </FormControl>
        </FormItem>
      </FormField>
    </Form>
    <DialogFooter>
      <Button variant="outline" onClick={close}>Cancel</Button>
      <Button onClick={handleAddEntry}>Add Entry</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

### 14.5 Delete confirmation

```tsx
<AlertDialog>
  <AlertDialogTrigger asChild>
    <DropdownMenuItem><Icons.IconTrash size={14} /> Delete</DropdownMenuItem>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Delete entry?</AlertDialogTitle>
      <AlertDialogDescription>
        This will permanently remove "{entry.description}" (${entry.amount}).
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction onClick={() => deleteEntry(entry.id)}>Delete</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
```

### 14.6 Notification toasts

```tsx
// On successful save
toast.success('Entry saved', { description: 'Magic Keyboard — $217.74' });

// On import complete
toast.success('Import complete', { description: '47 transactions from Amex, 12 categorized' });

// On export
toast.success('Export saved', { description: 'Deductions-2025.xlsx' });

// On error
toast.error('Failed to read file', { description: 'Invalid XLSX format' });
```

### 14.7 Warning alerts

```tsx
// Uncategorized entries remain
<Alert variant="warning">
  <AlertTitle>14 uncategorized entries</AlertTitle>
  <AlertDescription>
    Use Pi to auto-categorize or manually assign categories in the grid.
  </AlertDescription>
</Alert>

// Missing utility months
<Alert variant="warning">
  <AlertTitle>Missing utility data</AlertTitle>
  <AlertDescription>
    Electricity is missing for November and December. Check TD Bills statements.
  </AlertDescription>
</Alert>
```

### 14.8 Entry status flags

```tsx
// LLM-suggested entry (not yet confirmed)
<FlagTag variant="primary" label="LLM" size="xs" marginLeft="4px" />

// Pending review
<FlagTag variant="warning" label="PENDING" size="xs" marginLeft="4px" />

// Excluded from totals
<FlagTag variant="muted" label="EXCLUDED" size="xs" marginLeft="4px" />
```

### 14.9 DataGrid visual variant

All grids use the **editorial density** variant from the design system for high-density financial data:

```tsx
// Standard config applied to every DataGrid instance
const GRID_DEFAULTS = {
  density: 'editorial' as const,     // mono uppercase headers, 10px header font, 6px body padding, 13px body font
  borderless: true,                   // no outer border or radius
  transparent: true,                  // transparent bg (inherits page background)
  headerBorder: 'thick' as const,     // 2px blue header separator
  rowSeparator: 'subtle' as const,    // 4% opacity row lines
};
```

This matches the editorial/forensic aesthetic established in the Component Preview's Editorial page.

### 14.10 Theming

The app uses `ThemeProvider` from `@hydrotik/theme-provider` with **dark theme default** (consistent with the rest of the Hydrotik monorepo). All colors come from `vars.*` tokens — no hardcoded hex values.

---

## 15. Glossary

| Term | Meaning |
|------|---------|
| **Source** | A financial institution or account (Amex, TD Bills, Bandcamp, etc.) |
| **Schema** | Column mapping for a source's export file (which column is date, description, amount) |
| **Rule** | A regex pattern that maps a transaction description to a deduction category |
| **Entry** | A single line item in any grid (deduction, equipment, utility, income) |
| **Exclude** | Soft-delete: entry stays in JSON but is grayed out and excluded from totals |
| **Pi prompt** | A natural language instruction given to the LLM via Pi to process files |
