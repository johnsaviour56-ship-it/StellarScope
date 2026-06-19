# StellarScope Deployment Guide

## Vercel Deployment

### Prerequisites
- GitHub account with repository
- Vercel account (https://vercel.com)

### Steps

#### 1. Prepare Repository
```bash
git init
git add .
git commit -m "Initial commit: StellarScope MVP"
git remote add origin https://github.com/YOUR_USERNAME/stellarscope.git
git push -u origin main
```

#### 2. Connect to Vercel
1. Go to https://vercel.com/import
2. Select "Import Git Repository"
3. Paste your GitHub repository URL
4. Click "Continue"

#### 3. Configure Project
1. **Project Name**: `stellarscope`
2. **Root Directory**: `./` (leave default)
3. **Framework Preset**: Next.js
4. **Build Command**: `next build`
5. **Output Directory**: `.next`
6. **Install Command**: `npm install`

#### 4. Environment Variables
Add the following in Vercel Project Settings → Environment Variables:

```
NEXT_PUBLIC_HORIZON_URL=https://horizon.stellar.org
NEXT_PUBLIC_SOROBAN_RPC_URL=https://soroban-testnet.stellar.org
```

Optional: Use mainnet endpoints
```
NEXT_PUBLIC_SOROBAN_RPC_URL=https://soroban-mainnet.stellar.org
```

#### 5. Deploy
Click "Deploy" and wait for the build to complete.

### Post-Deployment
- Your app will be available at `https://stellarscope.vercel.app`
- Every push to `main` will trigger a new deployment
- Preview deployments for pull requests

## Local Development

### Setup
```bash
npm install
```

### Environment Variables
Create `.env.local`:
```
NEXT_PUBLIC_HORIZON_URL=https://horizon.stellar.org
NEXT_PUBLIC_SOROBAN_RPC_URL=https://soroban-testnet.stellar.org
```

### Run Development Server
```bash
npm run dev
```
Navigate to http://localhost:3000

### Build for Production
```bash
npm run build
npm start
```

## Custom Domain

1. In Vercel Project Settings → Domains
2. Add your custom domain
3. Update DNS records as shown in Vercel
4. Wait for DNS propagation (up to 24 hours)

## Monitoring

### Vercel Analytics
- Built-in performance monitoring
- Available in Vercel Dashboard

### Error Tracking
- Check Vercel Deployments → Logs for errors
- Client errors visible in browser console

### API Health
- Monitor Stellar Horizon API: https://status.stellar.org
- Monitor Soroban RPC availability in your logs

## Troubleshooting

### Build Fails
- Check Node.js version: `node --version` (should be 18+)
- Verify all dependencies: `npm install`
- Check TypeScript errors: `npm run build`

### Data Not Loading
- Verify environment variables in `.env.local` or Vercel
- Check Stellar API status
- Monitor console errors in browser DevTools

### Slow Performance
- Check Vercel Analytics for bottlenecks
- Optimize Soroban RPC queries
- Consider caching with SQLite if data grows

## CI/CD Pipeline

Vercel automatically:
- Runs `npm install`
- Runs `next build` (includes TypeScript type checking)
- Deploys if successful
- Creates preview deployments for PRs

## Rollback

To rollback to previous deployment:
1. Go to Vercel Dashboard
2. Select your project
3. Go to "Deployments"
4. Find previous successful deployment
5. Click "..." menu → "Promote to Production"

## Cost Estimate

- **Free Tier**: Perfect for MVP (up to 100GB bandwidth/month)
- **Pro Tier**: $20/month (additional features)
- **Enterprise**: For high-traffic apps

Most MVPs stay on the free tier.
