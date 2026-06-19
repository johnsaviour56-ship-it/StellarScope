# StellarScope Quick Reference Card

## 🚀 Get Started in 2 Minutes

```bash
npm install           # Install dependencies
npm run dev          # Start development server
# Open http://localhost:3000
```

---

## 📋 Essential Commands

```bash
npm run dev          # Start dev server (auto-reload)
npm run build        # Build for production (check errors)
npm start            # Run production build
npm i <package>      # Install new package
```

---

## 🗂️ Where To Find Things

| I Want To... | Go To |
|---|---|
| Change dashboard | `app/page.tsx` |
| Change network page | `app/network/page.tsx` |
| Change contracts page | `app/contracts/page.tsx` |
| Edit header/nav | `components/Header.tsx` |
| Edit a card | `components/StatCard.tsx` |
| Edit table styling | `components/TransactionTable.tsx` or `ContractTable.tsx` |
| Change colors | `app/globals.css` or `tailwind.config.ts` |
| Fetch network data | `lib/stellar.ts` |
| Fetch contract data | `lib/soroban.ts` |
| Create new API | `app/api/` |

---

## 🎨 Tailwind Color Palette

```css
/* Background */
bg-slate-900    /* Dark background */
bg-slate-800    /* Cards, sections */
bg-slate-700    /* Hover states */

/* Text */
text-white      /* Primary text */
text-slate-300  /* Secondary text */
text-slate-400  /* Tertiary text */

/* Accents */
text-cyan-400   /* Highlights, links */
border-slate-700 /* Borders */
```

---

## 📦 Common Component Patterns

### StatCard
```typescript
<StatCard 
  title="Title"
  value={12345}
  description="Optional description"
/>
```

### ActivityChart
```typescript
<ActivityChart
  data={[
    { name: 'Jan', value: 100 },
    { name: 'Feb', value: 200 }
  ]}
  title="Chart Title"
  height={300}
/>
```

### TransactionTable
```typescript
<TransactionTable 
  transactions={[
    {
      id: '1',
      hash: 'abc...',
      source_account: 'G...',
      created_at: '2024-01-01T12:00:00Z',
      operation_count: 5
    }
  ]}
/>
```

---

## 🔌 API Utilities

### Network (Stellar Horizon)
```typescript
import { 
  getNetworkStats,
  getRecentLedgers,
  getRecentTransactions
} from '@/lib/stellar';

const stats = await getNetworkStats();
const ledgers = await getRecentLedgers(10);
const txs = await getRecentTransactions(10);
```

### Contracts (Soroban RPC)
```typescript
import {
  getSorobanStats,
  getRecentContracts
} from '@/lib/soroban';

const stats = await getSorobanStats();
const contracts = await getRecentContracts(20);
```

---

## 🌐 Environment Variables

```env
# Required (optional if using defaults)
NEXT_PUBLIC_HORIZON_URL=https://horizon.stellar.org
NEXT_PUBLIC_SOROBAN_RPC_URL=https://soroban-testnet.stellar.org

# No other env vars needed for MVP
```

---

## 🐛 Common Issues & Fixes

| Problem | Solution |
|---------|----------|
| "Cannot find module" | Run `npm install` |
| "Port 3000 in use" | `npm run dev -- -p 3001` |
| Data not loading | Check `.env.local`, restart server |
| TypeScript errors | Run `npm run build` to see errors |
| Tailwind not working | Restart dev server |

---

## 📁 File Organization

**Keep This In Mind:**
- `app/` = pages (what users see)
- `components/` = reusable UI pieces
- `lib/` = helper functions
- `api/` = backend routes
- `docs/` = documentation
- `public/` = static files (images, etc)

---

## 🚀 Deploy in 3 Steps

```bash
# 1. Connect to Vercel
vercel

# 2. Add environment variables in Vercel dashboard
NEXT_PUBLIC_HORIZON_URL=https://horizon.stellar.org
NEXT_PUBLIC_SOROBAN_RPC_URL=https://soroban-testnet.stellar.org

# 3. Done! Every git push deploys automatically
```

---

## 💡 Pro Tips

1. **Use TypeScript**: Let the editor catch errors
2. **Server Components by Default**: Fetch data on server (in `app/`)
3. **Keep Components Small**: Easy to understand and reuse
4. **Use Tailwind**: No need to write CSS files
5. **Check Types**: Run `npm run build` before pushing

---

## 📚 Documentation Quick Links

- `README.md` - Overview and features
- `docs/architecture.md` - How it works
- `docs/deployment.md` - Deploy to production
- `docs/getting-started.md` - Step-by-step setup
- `PROJECT_SUMMARY.md` - Complete file reference

---

## 🎯 Development Pattern

```typescript
// 1. Define types (lib/types.ts)
export interface MyData {
  id: string;
  name: string;
}

// 2. Fetch data (lib/myservice.ts)
export async function getMyData(): Promise<MyData[]> {
  const response = await fetch(...);
  return response.json();
}

// 3. Use in page (app/page.tsx)
const data = await getMyData();

// 4. Display with component (components/MyComponent.tsx)
<StatCard title={data.name} value={data.id} />
```

---

## ✅ Pre-Deploy Checklist

- [ ] `npm run build` passes with no errors
- [ ] `.env.local` has correct API endpoints
- [ ] All pages load at localhost:3000
- [ ] No console errors (F12)
- [ ] Changes committed to git
- [ ] Ready to push to GitHub

---

## 🎓 Learn More

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Stellar API](https://developers.stellar.org/api)
- [Soroban](https://soroban.stellar.org)
- [Recharts](https://recharts.org/en-US)

---

## 📞 Quick Help

**Error in console?**
1. Check `.env.local` exists
2. Check Stellar API is online
3. Restart dev server
4. Clear `.next` folder

**Lost?**
1. Read `PROJECT_SUMMARY.md`
2. Read `docs/getting-started.md`
3. Check file path in "Where To Find Things"

**Want to add feature?**
1. Look at existing similar feature
2. Copy the pattern
3. Modify for your needs
4. Test at localhost:3000

---

## 🚀 You're Ready!

```bash
npm install
npm run dev
# Start building!
```

Good luck! Questions? Check the docs. 🎉
