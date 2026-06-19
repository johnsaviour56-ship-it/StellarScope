# Getting Started with StellarScope

A quick guide to set up and run StellarScope locally.

## Prerequisites

- **Node.js**: 18.17 or later ([download](https://nodejs.org))
- **npm**: Usually comes with Node.js
- **Git**: For version control

## Installation Steps

### 1. Clone or Create Project

```bash
# Clone from GitHub
git clone https://github.com/YOUR_USERNAME/stellarscope.git
cd stellarscope

# Or create manually from provided files
```

### 2. Install Dependencies

```bash
npm install
```

This installs:
- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Recharts

### 3. Configure Environment

Copy the example file and update:

```bash
cp .env.local.example .env.local
```

Edit `.env.local` (optional - defaults work fine):

```env
# Stellar Horizon API (default: https://horizon.stellar.org)
NEXT_PUBLIC_HORIZON_URL=https://horizon.stellar.org

# Soroban RPC (default: testnet)
NEXT_PUBLIC_SOROBAN_RPC_URL=https://soroban-testnet.stellar.org
```

### 4. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

You should see:
- **Dashboard**: Network stats and Soroban overview
- **Network**: Ledger and transaction details
- **Contracts**: Active Soroban contracts

## Common Tasks

### View TypeScript Errors

```bash
npm run build
```

This will catch any type errors during the build process.

### Build for Production

```bash
npm run build
npm start
```

The app will be available at [http://localhost:3000](http://localhost:3000).

### Clean and Reinstall

If you encounter issues:

```bash
# Remove node modules and lock file
rm -r node_modules package-lock.json

# Reinstall
npm install

# Restart dev server
npm run dev
```

## Project Navigation

### Home Page (`/`)
Shows real-time dashboard with:
- Network stats (latest ledger, transactions, operations)
- Soroban overview (active contracts)
- Activity chart
- Recent contracts table

### Network Page (`/network`)
Displays:
- Network statistics
- Recent ledgers table
- Recent transactions table

### Contracts Page (`/contracts`)
Shows:
- Active contracts count
- Table of recently active contracts

## Understanding the Code

### Data Fetching

Pages use **Next.js Server Components** to fetch data:

```typescript
// app/page.tsx
const [networkStats, sorobanStats] = await Promise.all([
  getNetworkStats(),
  getSorobanStats(),
]);
```

Data is fetched at request time with 30-second caching.

### API Integration

Network utilities in `/lib`:

```typescript
// lib/stellar.ts - Fetch from Horizon
export async function getNetworkStats() { ... }

// lib/soroban.ts - Fetch from Soroban RPC
export async function getSorobanStats() { ... }
```

### Components

Reusable components in `/components`:

```typescript
<StatCard title="..." value={...} />
<ActivityChart data={...} />
<TransactionTable transactions={...} />
```

## Troubleshooting

### Error: "Module not found"

Run `npm install` to ensure all dependencies are installed.

### Error: "NEXT_PUBLIC_* variables undefined"

Check `.env.local` file exists and has correct values. Restart dev server after changes.

### Port 3000 Already in Use

Use a different port:

```bash
npm run dev -- -p 3001
```

### Data Not Loading

1. Check browser console for errors (F12)
2. Verify Stellar API is online: https://status.stellar.org
3. Check network tab for failed requests
4. Try clearing `.next` folder: `rm -r .next` then restart

### Slow Performance

- Stellar APIs may be experiencing high load
- Try switching between testnet/mainnet endpoints
- Check internet connection

## Next Steps

1. **Customize**: Update colors, layout, or add features
2. **Deploy**: Follow [deployment.md](./deployment.md) for Vercel deployment
3. **Contribute**: See main README for contribution guidelines
4. **Learn**: Read [architecture.md](./architecture.md) for system design details

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Stellar Developers](https://developers.stellar.org)
- [Soroban Documentation](https://soroban.stellar.org)
- [Tailwind CSS](https://tailwindcss.com)
- [Recharts](https://recharts.org)

## Getting Help

- Check the [docs/](../docs/) folder
- Review existing GitHub issues
- Create a new issue with details and error messages
- Ask in Stellar Community forums

Happy coding! 🚀
