# StellarScope Data Flow Diagrams

Visual reference for how data flows through the application.

---

## 🔄 Main Data Flow

```
┌─────────────────┐
│  User Browser   │
│  (Client)       │
└────────┬────────┘
         │
         │ HTTP Request
         │ (page load)
         ▼
┌──────────────────────────┐
│  Next.js Server          │
│  (Server Components)     │
└──────────┬───────────────┘
           │
           ├─────────────────────────┐
           │                         │
           ▼                         ▼
┌──────────────────────┐  ┌─────────────────────┐
│ Stellar Horizon API  │  │  Soroban RPC        │
│ (Network Data)       │  │  (Contract Data)    │
└──────────────────────┘  └─────────────────────┘
           │                         │
           └─────────────┬───────────┘
                         │
                    Data Merged
                         │
                         ▼
          ┌──────────────────────────┐
          │  Render HTML + CSS       │
          │  (React Components)      │
          └──────────┬───────────────┘
                     │
            HTTP Response
                     │
                     ▼
          ┌──────────────────────────┐
          │  Browser Renders Page    │
          │  (User Sees Dashboard)   │
          └──────────────────────────┘
```

---

## 📊 Dashboard Data Sources

```
Dashboard (/):
├── Network Stats
│   ├── Latest Ledger ◄── Horizon API /ledgers?limit=1
│   ├── Transaction Count ◄── From latest ledger data
│   ├── Operation Count ◄── From latest ledger data
│   └── Active Accounts ◄── Horizon API /transactions?limit=100
│
├── Soroban Stats
│   ├── Active Contracts ◄── Soroban RPC getEvents()
│   └── Recent Contracts ◄── Soroban RPC getEvents() grouped by contract ID
│
├── Activity Chart
│   └── 7-day trend ◄── Generated from latest ledger sequence
│
└── Recent Contracts Table
    └── Contracts ◄── Soroban RPC getEvents() (top 10)
```

---

## 🌐 Network Page Data Sources

```
Network (/network):
├── Network Statistics
│   ├── Latest Ledger ◄── Horizon API /ledgers?limit=1
│   ├── Transaction Count ◄── From latest ledger
│   ├── Operation Count ◄── From latest ledger
│   └── Active Accounts ◄── Horizon API /transactions?limit=100
│
├── Recent Ledgers Table
│   ├── Sequence ◄── /ledgers?limit=10&order=desc
│   ├── Transaction Count ◄── From ledger data
│   ├── Operation Count ◄── From ledger data
│   └── Closed At ◄── From ledger data
│
└── Recent Transactions Table
    ├── Hash ◄── Horizon API /transactions?limit=10&order=desc
    ├── Source Account ◄── From transaction data
    ├── Operations ◄── From transaction data
    └── Created ◄── From transaction data
```

---

## 🤖 Contracts Page Data Sources

```
Contracts (/contracts):
├── Overview Stats
│   └── Active Contracts Count ◄── Soroban RPC getEvents()
│
└── All Contracts Table
    ├── Contract ID ◄── Soroban RPC getEvents() contract field
    ├── Invocations ◄── Count of events per contract
    └── Last Activity ◄── Newest event timestamp per contract
```

---

## 🔌 API Routes

```
API Routes (Internal):
│
├── /api/network/ledgers
│   └── GET → Fetch from Horizon → Return JSON
│       └── Used by: Components, manual API calls
│
├── /api/network/transactions  
│   └── GET → Fetch from Horizon → Return JSON
│       └── Used by: Components, manual API calls
│
└── /api/contracts/recent
    └── GET → Fetch from Soroban RPC → Return JSON
        └── Used by: Components, manual API calls
```

---

## 🧩 Component Data Flow

```
App Layout
├── Header (Static)
│   └── Navigation Links
│
└── Page Content
    ├── Fetch Data (Server Component)
    │   └── getNetworkStats()
    │   └── getSorobanStats()
    │
    └── Render Components
        ├── StatCard
        │   └── Props: title, value, description
        │
        ├── ActivityChart
        │   └── Props: data (array), title, height
        │
        ├── TransactionTable
        │   └── Props: transactions (array)
        │
        └── ContractTable
            └── Props: contracts (array)
```

---

## 🔄 Server Component Data Flow

```
┌─────────────────────────────────────────────┐
│ Page Component (app/page.tsx)               │
│ This is a Server Component                  │
└─────────────┬───────────────────────────────┘
              │
              ▼
┌─────────────────────────────────────────────┐
│ Async Functions Execute on Server           │
│ ├── getNetworkStats()                       │
│ ├── getSorobanStats()                       │
│ └── generateChartData()                     │
│ (All happen at request time)                │
└─────────────┬───────────────────────────────┘
              │
              ▼
┌─────────────────────────────────────────────┐
│ Fetch External APIs                         │
│ ├── Stellar Horizon                         │
│ └── Soroban RPC                             │
│ (Real API calls, not in browser)            │
└─────────────┬───────────────────────────────┘
              │
              ▼
┌─────────────────────────────────────────────┐
│ Data Available in Component                 │
│ const stats = { ... }                       │
│ const contracts = { ... }                   │
└─────────────┬───────────────────────────────┘
              │
              ▼
┌─────────────────────────────────────────────┐
│ Pass Data to Child Components               │
│ <StatCard value={stats.ledger} />           │
│ <ContractTable contracts={contracts} />     │
└─────────────┬───────────────────────────────┘
              │
              ▼
┌─────────────────────────────────────────────┐
│ Render to HTML                              │
│ Send to Browser                             │
│ (Page is already interactive!)              │
└─────────────────────────────────────────────┘
```

---

## 📡 Stellar Horizon API Call Pattern

```
┌──────────────────────────────────┐
│ lib/stellar.ts                   │
│ Utility Functions                │
└─────────────────┬────────────────┘
                  │
                  ▼
    ┌─────────────────────────────┐
    │ fetch(HORIZON_URL + endpoint)
    ├─────────────────────────────┤
    │ • Method: GET               │
    │ • Headers: Accept: JSON     │
    │ • Caching: 30s revalidate   │
    └─────────────┬───────────────┘
                  │
                  ▼
    ┌─────────────────────────────┐
    │ Horizon API Response        │
    │ (JSON data)                 │
    └─────────────┬───────────────┘
                  │
                  ▼
    ┌─────────────────────────────┐
    │ Parse JSON                  │
    │ Extract _embedded.records   │
    │ Return typed array          │
    └─────────────┬───────────────┘
                  │
                  ▼
    ┌─────────────────────────────┐
    │ Used in Page Components     │
    │ Displayed in UI             │
    └─────────────────────────────┘
```

---

## 🔐 Soroban RPC Call Pattern

```
┌──────────────────────────────────┐
│ lib/soroban.ts                   │
│ Utility Functions                │
└─────────────────┬────────────────┘
                  │
                  ▼
    ┌─────────────────────────────────┐
    │ fetch(SOROBAN_RPC_URL, {        │
    │   method: 'POST',               │
    │   body: {                       │
    │     jsonrpc: '2.0',             │
    │     method: 'getEvents',        │
    │     params: {...}               │
    │   }                             │
    │ })                              │
    └─────────────┬───────────────────┘
                  │
                  ▼
    ┌─────────────────────────────────┐
    │ Soroban RPC Response            │
    │ (JSON-RPC 2.0 format)           │
    │ result field contains data      │
    └─────────────┬───────────────────┘
                  │
                  ▼
    ┌─────────────────────────────────┐
    │ Extract result field            │
    │ Group by contractId             │
    │ Count invocations               │
    │ Return typed array              │
    └─────────────┬───────────────────┘
                  │
                  ▼
    ┌─────────────────────────────────┐
    │ Used in Page Components         │
    │ Displayed in Contract Table     │
    └─────────────────────────────────┘
```

---

## 🎨 Component Composition

```
RootLayout
  ├── styles (globals.css)
  └── Header Component
      ├── Logo
      ├── Nav Link (/)
      ├── Nav Link (/network)
      └── Nav Link (/contracts)

Page Components (Server Components)
  ├── Home Dashboard (app/page.tsx)
  │   ├── Fetch: getNetworkStats()
  │   ├── Fetch: getSorobanStats()
  │   └── Render:
  │       ├── 4x StatCard (metrics)
  │       ├── 1x StatCard (contracts)
  │       ├── ActivityChart
  │       └── ContractTable
  │
  ├── Network Page (app/network/page.tsx)
  │   ├── Fetch: getNetworkStats()
  │   ├── Fetch: getRecentLedgers()
  │   ├── Fetch: getRecentTransactions()
  │   └── Render:
  │       ├── 4x StatCard (metrics)
  │       ├── Ledgers Table
  │       └── TransactionTable
  │
  └── Contracts Page (app/contracts/page.tsx)
      ├── Fetch: getSorobanStats()
      └── Render:
          ├── StatCard (active contracts)
          └── ContractTable
```

---

## ⏱️ Data Freshness Timeline

```
User loads dashboard
       │
       ▼
Time: 0s
├─ Fetch network data
├─ Fetch contract data
└─ Render page
       │
       ▼
Time: 0.5s - 2s
└─ Page shows to user

       ▼
Time: 30s - 59s
├─ User still viewing
└─ Data is fresh (within revalidation window)

       ▼
Time: 60s+
├─ Next page refresh (user navigates or reloads)
├─ New data fetched from APIs
└─ Page updates with latest data
```

---

## 🔄 Error Handling Flow

```
Fetch from Stellar API
       │
       ├─ Success? ──YES──> Parse & Return Data
       │
       NO
       │
       ▼
Catch Error
       │
       ├─ Log error
       ├─ Return fallback data (zeros/empty arrays)
       └─ UI shows "No data found" or default values

Same for:
├─ Soroban RPC
├─ Horizon API
└─ All external calls
```

---

## 📱 Responsive Data Display

```
Desktop (1280+px)
├─ 4 columns for stat cards
├─ Full-width tables
└─ Side-by-side charts

Tablet (768-1279px)
├─ 2 columns for stat cards
├─ Full-width tables
└─ Full-width charts

Mobile (<768px)
├─ 1 column for stat cards
├─ Stacked tables
└─ Full-width charts
```

---

## 🚀 Deployment Data Flow

```
Local Development
       │
       ├─ npm run dev
       ├─ Fetch from APIs
       └─ Display localhost:3000
       
       ▼

Push to GitHub
       │
       ├─ git push origin main
       └─ GitHub receives commit

       ▼

Vercel Detects Push
       │
       ├─ Automatic webhook
       ├─ npm install
       ├─ npm run build
       ├─ Deploy to CDN
       └─ Assign URL

       ▼

Production
       │
       ├─ User visits URL
       ├─ Request routed to CDN
       ├─ Fetch from Stellar APIs
       ├─ Render & return HTML
       └─ User sees dashboard
```

---

## 💾 Caching Strategy

```
First Request (Time 0)
├─ No cache
├─ Fetch from Stellar APIs
├─ Next.js caches with 30s TTL
└─ Return HTML

Requests (Time 0-30s)
├─ Use cached data
├─ Fast response
└─ No API calls

Revalidation (Time 30s)
├─ New request comes in
├─ Cache expired
├─ Fetch fresh data
├─ Regenerate HTML
└─ Update cache

Note: Automatic, no manual cache clearing needed
```

---

## Summary

**Key Principles:**
1. All data fetching happens on the server (server components)
2. No client-side data fetching for MVP
3. Data is cached for 30 seconds to reduce API load
4. Errors are handled gracefully with fallback values
5. Components receive data as props
6. UI is responsive across all device sizes

**Data Sources:**
- Stellar Horizon API → Network data
- Soroban RPC → Contract data

**No Database** - All data is live/real-time from external APIs
