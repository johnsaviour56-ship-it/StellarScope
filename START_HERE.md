# 🚀 START HERE - StellarScope MVP Setup Guide

Welcome to **StellarScope**, a lightweight analytics dashboard for the Stellar ecosystem!

This document will guide you through getting up and running in the next 5 minutes.

---

## ⚡ Quick Start (5 minutes)

### 1. Install Node.js (if needed)
Download and install Node.js 18+ from https://nodejs.org

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```

### 4. Open in Browser
Visit **http://localhost:3000** and you'll see the dashboard! 🎉

---

## 📚 Documentation Guide

Read these in order based on your needs:

### New to StellarScope?
1. **This file** (you're reading it!)
2. → `QUICK_REFERENCE.md` - Quick command reference
3. → `PROJECT_SUMMARY.md` - Complete project overview

### Want to understand the code?
1. → `docs/getting-started.md` - Step-by-step tutorial
2. → `docs/architecture.md` - System design
3. → `docs/data-flow.md` - Data flow diagrams

### Ready to deploy?
1. → `docs/deployment.md` - Deploy to Vercel in 5 minutes

### Building or extending?
1. → `IMPLEMENTATION_CHECKLIST.md` - Feature checklist
2. → `docs/getting-started.md` - Code patterns

### Just want the facts?
1. → `README.md` - Overview and features
2. → `QUICK_REFERENCE.md` - Command reference

---

## 🎯 What You're Getting

**StellarScope MVP includes:**

✅ **Dashboard** - Real-time network overview
✅ **Network Page** - Ledger and transaction details
✅ **Contracts Page** - Soroban contract activity
✅ **Charts** - Activity visualization
✅ **Tables** - Transaction and contract lists
✅ **Responsive UI** - Works on desktop, tablet, mobile
✅ **Zero Setup** - Just `npm install && npm run dev`
✅ **Full Documentation** - Everything you need to build on it

**Tech Stack:**
- Next.js 15 (React framework)
- TypeScript (type safety)
- Tailwind CSS (styling)
- Recharts (charts)
- Stellar Horizon API (network data)
- Soroban RPC (contract data)

---

## 🗂️ Project Structure (At a Glance)

```
stellarscope/
├── app/                    ← Pages you see (/, /network, /contracts)
├── components/             ← Reusable UI pieces
├── lib/                    ← Helper functions (API calls)
├── docs/                   ← Documentation
└── package.json            ← Dependencies
```

See `PROJECT_SUMMARY.md` for the complete breakdown.

---

## 🔍 First Time Exploring?

### View the Pages
Open your browser and check out:
- **http://localhost:3000** - Dashboard (main page)
- **http://localhost:3000/network** - Network activity
- **http://localhost:3000/contracts** - Soroban contracts

### Explore the Code
```bash
# Open these files in your editor
code app/page.tsx              # Home dashboard
code components/Header.tsx     # Navigation
code lib/stellar.ts            # API integration
```

### Make a Simple Change
```bash
# Edit the title on the dashboard
# Edit: app/page.tsx, line ~35
# Change: "Dashboard" to "My Dashboard"
# Browser auto-refreshes!
```

---

## 💻 Common Commands

```bash
# Start development (auto-reload)
npm run dev

# Build for production (check for errors)
npm run build

# Run production build locally
npm start

# Install a new package
npm install package-name

# Check for TypeScript errors
npm run build

# See all files
dir /s
```

See `QUICK_REFERENCE.md` for more commands and patterns.

---

## 🚨 Troubleshooting

### Error: "Port 3000 already in use"
```bash
npm run dev -- -p 3001
```

### Error: "Cannot find module"
```bash
rm -r node_modules package-lock.json
npm install
```

### Data not loading?
1. Check `.env.local` exists (should be created automatically)
2. Make sure you're online
3. Restart dev server
4. Check browser console (F12) for errors

More troubleshooting in `docs/getting-started.md`

---

## 📖 Where to Find Things

| I want to... | Go to |
|---|---|
| Change the dashboard | `app/page.tsx` |
| Change the header/nav | `components/Header.tsx` |
| Fetch network data | `lib/stellar.ts` |
| Fetch contract data | `lib/soroban.ts` |
| Change colors/styling | `app/globals.css` |
| Deploy to production | `docs/deployment.md` |
| Understand data flow | `docs/data-flow.md` |
| Learn the architecture | `docs/architecture.md` |

See `QUICK_REFERENCE.md` for a complete reference.

---

## 🎓 Learning Path

### Day 1: Get Running
1. ✅ `npm install && npm run dev`
2. ✅ View http://localhost:3000
3. ✅ Read `PROJECT_SUMMARY.md`
4. ✅ Explore the file structure

### Day 2: Understand the Code
1. ✅ Read `docs/architecture.md`
2. ✅ Read `docs/data-flow.md`
3. ✅ Look at `lib/stellar.ts` and `lib/soroban.ts`
4. ✅ Look at `app/page.tsx` (simplest page)

### Day 3: Make Changes
1. ✅ Edit a component (e.g., `components/StatCard.tsx`)
2. ✅ See changes live
3. ✅ Add a new stat card
4. ✅ Deploy to Vercel

### Day 4+: Extend
1. ✅ Add new features
2. ✅ Create new pages
3. ✅ Modify styling
4. ✅ Deploy updates

---

## 🚀 Deploy in 5 Minutes

When you're ready to share with the world:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy (Vercel handles everything)
vercel --prod
```

Your app will be live at a Vercel URL!

See `docs/deployment.md` for detailed instructions.

---

## 📋 Before You Start Building

Make sure you have:
- ✅ Node.js 18+ installed (`node --version`)
- ✅ npm installed (`npm --version`)
- ✅ This repository cloned or files downloaded
- ✅ Text editor (VS Code recommended)

That's it! 🎉

---

## 🎯 MVP Scope

**This project includes:**
- ✅ Real-time dashboard
- ✅ Network activity page
- ✅ Soroban contracts page
- ✅ Charts and tables
- ✅ Responsive design
- ✅ Full documentation
- ✅ Ready to deploy

**This project does NOT include (by design):**
- ❌ User authentication
- ❌ Database
- ❌ Historical data storage
- ❌ Advanced filtering
- ❌ Complex animations

This is intentional! We built just what's needed for the MVP, so you can launch fast and add more later.

---

## 🤔 Common Questions

### Can I run this on Windows/Mac/Linux?
Yes! It works everywhere Node.js runs.

### Do I need Docker?
No, just Node.js.

### Can I use this as a starting point?
Absolutely! Fork it and build on top.

### Can I deploy to places other than Vercel?
Yes! It's a standard Next.js app. Deploy to AWS, Netlify, Railway, etc.

### Do I need to know React?
It helps, but you can use this as-is and customize templates.

### Can I add a database?
Yes, but it's not needed for MVP. Add SQLite or PostgreSQL later if needed.

---

## 📞 Need Help?

### Check the docs:
- `docs/getting-started.md` - Step-by-step walkthrough
- `docs/architecture.md` - How it's built
- `QUICK_REFERENCE.md` - Command reference
- `PROJECT_SUMMARY.md` - Complete overview

### Common issues:
- Port already in use? → Use different port
- Data not loading? → Check `.env.local` and internet
- TypeScript errors? → Run `npm run build`

### More resources:
- [Next.js Docs](https://nextjs.org/docs)
- [Stellar Docs](https://developers.stellar.org)
- [Soroban Docs](https://soroban.stellar.org)

---

## ✨ You're Ready!

```bash
npm install
npm run dev
# Visit http://localhost:3000
```

Start exploring! 🎉

---

## 📚 Documentation Index

- `README.md` - Main readme with features and overview
- `PROJECT_SUMMARY.md` - Complete project breakdown
- `QUICK_REFERENCE.md` - Quick command and pattern reference
- `IMPLEMENTATION_CHECKLIST.md` - Launch checklist
- `docs/architecture.md` - System design
- `docs/deployment.md` - Deploy to Vercel
- `docs/getting-started.md` - Step-by-step tutorial
- `docs/data-flow.md` - Visual data flow diagrams

---

## 🎉 Let's Build!

Ready to explore StellarScope?

```bash
npm install && npm run dev
```

Open http://localhost:3000 and start hacking! 🚀

**Questions?** Read the docs above or check the troubleshooting section.

**Next step?** Read `QUICK_REFERENCE.md` for a quick overview of the codebase.

Happy coding! ✨
