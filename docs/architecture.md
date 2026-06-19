# StellarScope Architecture

## Overview

StellarScope is a lightweight analytics dashboard for monitoring Stellar network activity and Soroban contract invocations. The application uses Next.js with server-side rendering to fetch live data directly from public Stellar APIs.

## Data Flow

```
User Browser
    ↓
Next.js Pages (Server Components)
    ↓
Stellar Services:
  - Horizon API (Network data)
  - Soroban RPC (Contract data)
    ↓
User sees live data
```

## Architecture Decisions

### No Database
- **Decision**: Fetch live data directly from Stellar APIs
- **Rationale**: MVP requirements don't need historical data or caching
- **Future**: SQLite can be added if caching becomes necessary

### Server-Side Rendering
- **Decision**: Use Next.js Server Components for data fetching
- **Rationale**: Faster initial page load, no waterfall requests, simpler code
- **Caching**: 30-second revalidation per page

### Minimal Dependencies
- **Next.js**: Framework for pages and API routes
- **TypeScript**: Type safety
- **Tailwind CSS**: Styling
- **Recharts**: Chart visualization
- **No**: Express, Databases, Message Queues, Complex state management

## Project Structure

### `/app`
- **layout.tsx**: Root layout with header
- **page.tsx**: Dashboard home page
- **network/**: Network activity pages
- **contracts/**: Soroban contracts pages
- **api/**: API routes (thin wrappers around Stellar services)

### `/components`
- **Header.tsx**: Navigation header
- **StatCard.tsx**: Reusable statistic card
- **ActivityChart.tsx**: Recharts line chart
- **TransactionTable.tsx**: Transaction list
- **ContractTable.tsx**: Contract list

### `/lib`
- **types.ts**: TypeScript interfaces
- **stellar.ts**: Horizon API utilities
- **soroban.ts**: Soroban RPC utilities

## External APIs

### Stellar Horizon API
- **URL**: https://horizon.stellar.org
- **Used For**: 
  - Latest ledger information
  - Recent transactions
  - Operation counts
  - Account activity

### Soroban RPC
- **URL**: https://soroban-testnet.stellar.org (or mainnet)
- **Used For**:
  - Recent contract invocations
  - Active contract tracking
  - Contract event querying

## API Routes

### Network
- `GET /api/network/ledgers?limit=10` - Recent ledgers
- `GET /api/network/transactions?limit=10` - Recent transactions

### Contracts
- `GET /api/contracts/recent?limit=20` - Recently active contracts

## Performance Considerations

### Data Fetching
- Server components fetch at request time
- 30-second revalidation keeps data fresh without being too aggressive
- No client-side data fetching for initial page load

### Caching
- Next.js `next: { revalidate: 30 }` in fetch calls
- Reduces load on Stellar APIs

### UI Performance
- Minimal dependencies (Recharts only for charts)
- Tailwind CSS (no CSS-in-JS overhead)
- Simple component hierarchy (no deep nesting)

## Future Expansion Points

1. **Local Caching**: Add SQLite for historical data
2. **Real-time Updates**: Add WebSocket subscriptions
3. **Advanced Charts**: More visualization types
4. **Alerts**: Notify users of network events
5. **Filtering**: Advanced search and filters
6. **Authentication**: User accounts and preferences

## Deployment

See [deployment.md](./deployment.md) for Vercel deployment instructions.
