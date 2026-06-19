# StellarScope - Complete File Structure

This document provides a complete visual reference of all project files and their purposes.

---

## 📁 Project Directory Tree

```
stellarscope/
│
├── 📚 DOCUMENTATION
│   ├── START_HERE.md                    ⭐ Read this first!
│   ├── README.md                        Main project overview
│   ├── PROJECT_SUMMARY.md               Complete project breakdown
│   ├── QUICK_REFERENCE.md               Command and code patterns
│   ├── IMPLEMENTATION_CHECKLIST.md      Launch checklist
│   ├── FILE_STRUCTURE.md                This file
│   │
│   └── 📂 docs/
│       ├── architecture.md              System design and decisions
│       ├── deployment.md                Deploy to Vercel
│       ├── getting-started.md           Step-by-step tutorial
│       └── data-flow.md                 Data flow diagrams
│
├── ⚙️  CONFIGURATION
│   ├── package.json                     Dependencies and scripts
│   ├── tsconfig.json                    TypeScript configuration
│   ├── tailwind.config.ts               Tailwind CSS setup
│   ├── postcss.config.js                CSS post-processing
│   ├── next.config.js                   Next.js configuration
│   ├── .env.local                       Local environment (git-ignored)
│   ├── .env.local.example               Environment template
│   ├── .gitignore                       Git ignore rules
│   └── LICENSE                          MIT License
│
├── 🎨 APPLICATION CODE
│   │
│   ├── 📂 app/                          Next.js App Router (pages)
│   │   │
│   │   ├── layout.tsx                   Root layout + header
│   │   ├── page.tsx                     Home dashboard (/)
│   │   ├── globals.css                  Global styles
│   │   │
│   │   ├── 📂 network/
│   │   │   └── page.tsx                 Network page (/network)
│   │   │
│   │   ├── 📂 contracts/
│   │   │   └── page.tsx                 Contracts page (/contracts)
│   │   │
│   │   └── 📂 api/                      API Routes
│   │       ├── 📂 network/
│   │       │   ├── 📂 ledgers/
│   │       │   │   └── route.ts         GET /api/network/ledgers
│   │       │   └── 📂 transactions/
│   │       │       └── route.ts         GET /api/network/transactions
│   │       └── 📂 contracts/
│   │           └── 📂 recent/
│   │               └── route.ts         GET /api/contracts/recent
│   │
│   ├── 📂 components/                   React Components
│   │   ├── Header.tsx                   Navigation header
│   │   ├── StatCard.tsx                 Metric cards
│   │   ├── ActivityChart.tsx            Recharts line chart
│   │   ├── TransactionTable.tsx         Transaction list
│   │   └── ContractTable.tsx            Contract list
│   │
│   └── 📂 lib/                          Utilities & Services
│       ├── types.ts                     TypeScript interfaces
│       ├── stellar.ts                   Horizon API functions
│       └── soroban.ts                   Soroban RPC functions
│
└── 📦 OTHER
    └── 📂 public/                       Static assets (empty for MVP)
```

---

## 📄 File Descriptions

### 🚀 START HERE

| File | Purpose | Read When |
|------|---------|-----------|
| `START_HERE.md` | Quick start guide | First thing you read |
| `QUICK_REFERENCE.md` | Command/pattern quick ref | Before coding |
| `README.md` | Main project docs | Need overview |

### 📋 DOCUMENTATION

| File | Purpose | Read When |
|------|---------|-----------|
| `docs/architecture.md` | System design | Want to understand design |
| `docs/deployment.md` | Vercel deployment | Ready to deploy |
| `docs/getting-started.md` | Step-by-step setup | Need detailed tutorial |
| `docs/data-flow.md` | Data flow diagrams | Want visual reference |
| `PROJECT_SUMMARY.md` | Complete breakdown | Need full overview |
| `IMPLEMENTATION_CHECKLIST.md` | Launch checklist | Ready to build |
| `FILE_STRUCTURE.md` | This file | Need file reference |

### ⚙️ CONFIGURATION

| File | Purpose | Edit When |
|------|---------|-----------|
| `package.json` | Dependencies & scripts | Adding npm packages |
| `tsconfig.json` | TypeScript config | Changing TS settings |
| `tailwind.config.ts` | Tailwind setup | Customizing theme |
| `postcss.config.js` | CSS processing | Advanced CSS needs |
| `next.config.js` | Next.js config | Advanced Next.js needs |
| `.env.local` | Environment variables | Setting API endpoints |
| `.env.local.example` | Template | Reference |
| `.gitignore` | Git exclusions | Rarely |
| `LICENSE` | MIT License | Reference |

### 🎨 APPLICATION CODE

#### Pages (`app/`)

| File | Purpose | Shows |
|------|---------|-------|
| `app/layout.tsx` | Root layout | Header on every page |
| `app/page.tsx` | Home dashboard | `/` (main page) |
| `app/network/page.tsx` | Network page | `/network` |
| `app/contracts/page.tsx` | Contracts page | `/contracts` |
| `app/globals.css` | Global styles | Dark theme colors |

#### API Routes (`app/api/`)

| File | Endpoint | Returns |
|------|----------|---------|
| `network/ledgers/route.ts` | `GET /api/network/ledgers?limit=10` | Recent ledgers JSON |
| `network/transactions/route.ts` | `GET /api/network/transactions?limit=10` | Recent transactions JSON |
| `contracts/recent/route.ts` | `GET /api/contracts/recent?limit=20` | Active contracts JSON |

#### Components (`components/`)

| File | Purpose | Used In |
|------|---------|---------|
| `Header.tsx` | Navigation | Every page |
| `StatCard.tsx` | Metric card | Dashboard & stats |
| `ActivityChart.tsx` | Line chart | Dashboard |
| `TransactionTable.tsx` | Transaction list | Network page |
| `ContractTable.tsx` | Contract list | Contracts page |

#### Utilities (`lib/`)

| File | Purpose | Exports |
|------|---------|---------|
| `types.ts` | Type definitions | All TypeScript interfaces |
| `stellar.ts` | Horizon API | Network data functions |
| `soroban.ts` | Soroban RPC | Contract data functions |

---

## 🔄 Data Flow by File

### Fetching Network Data

```
app/page.tsx (calls)
    ↓
lib/stellar.ts (getNetworkStats)
    ↓
Stellar Horizon API
    ↓
Returns to app/page.tsx
    ↓
Passes to components/StatCard.tsx
    ↓
User sees data
```

### Fetching Contract Data

```
app/page.tsx (calls)
    ↓
lib/soroban.ts (getSorobanStats)
    ↓
Soroban RPC
    ↓
Returns to app/page.tsx
    ↓
Passes to components/ContractTable.tsx
    ↓
User sees data
```

---

## 📊 File Type Distribution

```
TypeScript/TSX Files:  18  (code)
Markdown Files:        11  (docs)
Config Files:          8   (setup)
CSS Files:             1   (styles)
JSON Files:            2   (config)
Other:                 6   (env, license, etc)
──────────────────────────
Total:                 46 files
```

### By Size Category

```
Large (>100 lines):
├── docs/architecture.md
├── docs/deployment.md
├── docs/data-flow.md
├── PROJECT_SUMMARY.md
├── QUICK_REFERENCE.md
└── README.md

Medium (50-100 lines):
├── app/page.tsx
├── docs/getting-started.md
├── IMPLEMENTATION_CHECKLIST.md
└── lib/soroban.ts

Small (<50 lines):
├── All components
├── All config files
└── All API routes
```

---

## 🎯 How Files Work Together

### Component Chain

```
app/page.tsx (Server Component)
├── Imports: components/StatCard.tsx
├── Imports: components/ActivityChart.tsx
├── Imports: components/ContractTable.tsx
├── Calls: lib/stellar.ts functions
├── Calls: lib/soroban.ts functions
└── Renders: HTML with data
```

### API Chain

```
browser → /api/network/ledgers
          ↓
          app/api/network/ledgers/route.ts
          ├── Calls: lib/stellar.ts functions
          ├── Calls: Stellar Horizon API
          └── Returns: JSON response
```

### Type Chain

```
lib/types.ts
├── Exports: Ledger interface
├── Exports: Transaction interface
├── Exports: NetworkStats interface
├── Used in: lib/stellar.ts
├── Used in: components/
└── Used in: app/page.tsx
```

---

## 🚀 Where to Make Changes

| I Want To... | Edit File(s) |
|---|---|
| Change dashboard layout | `app/page.tsx` |
| Change network page | `app/network/page.tsx` |
| Change contracts page | `app/contracts/page.tsx` |
| Edit header/navigation | `components/Header.tsx` |
| Edit stat cards | `components/StatCard.tsx` |
| Edit chart | `components/ActivityChart.tsx` |
| Edit table styling | `components/TransactionTable.tsx` or `ContractTable.tsx` |
| Change colors/theme | `app/globals.css` or `tailwind.config.ts` |
| Add new component | Create file in `components/` |
| Add new page | Create file in `app/newpage/page.tsx` |
| Create new API endpoint | Create in `app/api/newroute/route.ts` |
| Change data sources | `lib/stellar.ts` or `lib/soroban.ts` |
| Update types | `lib/types.ts` |
| Deploy settings | `next.config.js` or `vercel.json` |

---

## 🔐 File Security Notes

**DO NOT COMMIT:**
- `.env.local` (contains API keys/secrets)
- `node_modules/` (installed by npm)
- `.next/` (build output)

**SAFE TO COMMIT:**
- All `.ts` and `.tsx` files
- All `.md` files
- `.env.local.example` (template only)
- `package.json` and `package-lock.json`

**Configured in `.gitignore`:**
- ✅ `.env.local` is ignored
- ✅ `node_modules/` is ignored
- ✅ `.next/` is ignored

---

## 📦 Key Dependencies in `package.json`

```json
{
  "dependencies": {
    "next": "^15.0.0",        ← Framework
    "react": "^19.0.0",       ← UI library
    "typescript": "^5.3.0",   ← Type safety
    "recharts": "^2.10.3",    ← Charts
    "tailwindcss": "^3.3.6"   ← Styling
  }
}
```

Just 5 production dependencies! Very minimal.

---

## 🎓 Code Organization Principles

### Separation of Concerns
- `app/` - Pages and routing
- `components/` - Reusable UI
- `lib/` - Business logic and utilities
- `api/` - Backend handlers

### File Naming
- Components: PascalCase (Header.tsx)
- Utilities: camelCase (stellar.ts)
- Pages: page.tsx
- Routes: route.ts

### Imports Always Use Alias
```typescript
// ✅ Good
import { StatCard } from '@/components/StatCard';

// ❌ Avoid
import { StatCard } from '../components/StatCard';
```

---

## 📈 Adding New Features

### New Page
1. Create `app/newpage/page.tsx`
2. Add navigation link in `components/Header.tsx`
3. Add any new components needed

### New Component
1. Create `components/NewComponent.tsx`
2. Export the component
3. Use in pages

### New Data Source
1. Add functions to `lib/stellar.ts` or `lib/soroban.ts`
2. Add types to `lib/types.ts`
3. Use in pages

### New API Route
1. Create `app/api/path/to/route.ts`
2. Export GET, POST, etc. handlers
3. Call from components or frontend

---

## 🔍 Finding Things Quick Reference

| Looking for | Location |
|---|---|
| Button styling | `components/` or `app/globals.css` |
| API integration | `lib/stellar.ts` or `lib/soroban.ts` |
| Page content | `app/[pagename]/page.tsx` |
| Navigation | `components/Header.tsx` |
| Table layout | `components/*Table.tsx` |
| Color scheme | `app/globals.css` |
| Data types | `lib/types.ts` |
| API endpoints | `app/api/*/route.ts` |
| Documentation | `docs/` or `.md` files |

---

## ✨ Final Summary

**35 files total:**
- 🎨 **18** TypeScript/React files (code)
- 📚 **11** Markdown files (docs)
- ⚙️  **8** Configuration files
- 🎭 **1** CSS file
- 📋 **2** JSON files
- 🔑 **6** Other files

**All organized** for easy navigation and maintenance.

**All documented** with inline comments and guides.

**All ready to extend** with clear patterns to follow.

Ready to explore? Start with `START_HERE.md` →
