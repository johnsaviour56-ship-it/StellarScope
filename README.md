# StellarScope

A lightweight analytics dashboard for the Stellar ecosystem. Monitor Stellar network activity and Soroban contract invocations in real-time.

![StellarScope Dashboard](https://img.shields.io/badge/Stellar-Analytics-blue) ![MVP](https://img.shields.io/badge/Status-MVP-brightgreen) ![License](https://img.shields.io/badge/License-MIT-green)

## Features

### Dashboard
- Real-time network overview (latest ledger, transaction count, operations)
- Soroban contract activity snapshot
- Recent contract invocations
- Activity trends visualization

### Network Page
- Recent ledger information
- Transaction history with details
- Network statistics
- Live network data from Stellar Horizon API

### Contracts Page
- Recently active Soroban contracts
- Invocation counts
- Activity timestamps
- Live data from Soroban RPC

## Technology Stack

- **Frontend**: Next.js 15 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Data Sources**: Stellar Horizon API, Soroban RPC
- **Server**: Node.js (Express compatible)

## Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/johnsaviour56-ship-it/stellarscope.git
cd stellarscope

# Install dependencies
npm install

# Create environment file
cp .env.local.example .env.local
```

### Configuration

Edit `.env.local`:
```env
# Stellar Horizon API
NEXT_PUBLIC_HORIZON_URL=https://horizon.stellar.org

# Soroban RPC (testnet or mainnet)
NEXT_PUBLIC_SOROBAN_RPC_URL=https://soroban-testnet.stellar.org
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Production Build

```bash
npm run build
npm start
```

## Project Structure

```
stellarscope/
├── app/                          # Next.js app directory
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Dashboard home
│   ├── network/
│   │   └── page.tsx             # Network activity
│   ├── contracts/
│   │   └── page.tsx             # Soroban contracts
│   ├── api/                     # API routes
│   │   ├── network/
│   │   └── contracts/
│   └── globals.css              # Global styles
├── components/                   # Reusable components
│   ├── Header.tsx
│   ├── StatCard.tsx
│   ├── ActivityChart.tsx
│   ├── TransactionTable.tsx
│   └── ContractTable.tsx
├── lib/                          # Utilities
│   ├── types.ts                 # TypeScript types
│   ├── stellar.ts               # Horizon API utilities
│   └── soroban.ts               # Soroban RPC utilities
├── docs/                         # Documentation
│   ├── architecture.md          # System design
│   └── deployment.md            # Deployment guide
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── README.md
```

## Data Sources

### Stellar Horizon API
- Fetches current ledger information
- Recent transactions and operations
- Network statistics
- **Endpoint**: https://horizon.stellar.org

### Soroban RPC
- Recently active smart contracts
- Contract invocation events
- Activity tracking
- **Endpoints**: 
  - Testnet: https://soroban-testnet.stellar.org
  - Mainnet: https://soroban-mainnet.stellar.org

## API Routes

### Network Data
- `GET /api/network/ledgers?limit=10` - Recent ledgers
- `GET /api/network/transactions?limit=10` - Recent transactions

### Contract Data
- `GET /api/contracts/recent?limit=20` - Active contracts

## Deployment

StellarScope can be deployed to any Node.js hosting platform:

### Production Build

```bash
npm run build
npm start
```

The app runs on `http://localhost:3000` by default.

### Environment Variables for Production

Create a `.env.production` file:
```env
NEXT_PUBLIC_HORIZON_URL=https://horizon.stellar.org
NEXT_PUBLIC_SOROBAN_RPC_URL=https://soroban-testnet.stellar.org
NODE_ENV=production
```

### Hosting Options

- **Docker**: Containerize with a Dockerfile
- **AWS**: Deploy to EC2, Elastic Beanstalk, or App Runner
- **DigitalOcean**: Deploy to App Platform or Droplets
- **Railway**: Simple Git-based deployment
- **Render**: Free tier available
- **Self-hosted**: Any server with Node.js 18+
- **Custom Infrastructure**: Standard Next.js app

For detailed deployment instructions, see [docs/deployment.md](./docs/deployment.md).

## Development Roadmap

### Phase 1: MVP ✅
- [x] Dashboard with network overview
- [x] Network activity page
- [x] Soroban contracts page
- [x] Real-time data fetching
- [x] Basic visualizations

### Phase 2: Enhanced Features (Future)
- [ ] Historical data caching (SQLite)
- [ ] Advanced filtering and search
- [ ] WebSocket real-time updates
- [ ] More chart types
- [ ] Alert notifications
- [ ] Dark/light theme toggle
- [ ] Mobile app

### Phase 3: Advanced Analytics (Future)
- [ ] Transaction analysis
- [ ] Contract performance metrics
- [ ] Network health indicators
- [ ] Custom dashboards
- [ ] Data export (CSV, JSON)

## Contributing

Contributions are welcome! For the MVP, focus on:
- Bug fixes
- Performance improvements
- Documentation
- Simple feature requests

Please follow these guidelines:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is open source and available under the MIT License - see the LICENSE file for details.

## Support

- **Documentation**: See [docs/](./docs/) folder
- **Issues**: GitHub Issues for bug reports and feature requests
- **Stellar Docs**: https://developers.stellar.org
- **Soroban Docs**: https://soroban.stellar.org

## Acknowledgments

- [Stellar Development Foundation](https://stellar.org) for the Horizon API and Soroban
- [Next.js](https://nextjs.org) and [React](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com) and [Recharts](https://recharts.org)

## Status

🚀 **MVP Active Development** - Launching soon!

Built with ❤️ by the Stellar community
