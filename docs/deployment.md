# StellarScope Deployment Guide

Deploy StellarScope to any Node.js hosting platform. This guide covers multiple deployment options.

---

## Prerequisites

- Node.js 18+ installed
- npm or yarn
- Git repository initialized
- GitHub account (optional, for remote deployment)

---

## Local Production Build

### Build the Application

```bash
npm run build
npm start
```

Your application will run on `http://localhost:3000`

### Environment Variables

Create `.env.production`:
```env
NEXT_PUBLIC_HORIZON_URL=https://horizon.stellar.org
NEXT_PUBLIC_SOROBAN_RPC_URL=https://soroban-testnet.stellar.org
NODE_ENV=production
PORT=3000
```

---

## Deployment Platforms

### Docker (Recommended)

**Create a `Dockerfile`:**

```dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Build Next.js application
RUN npm run build

# Expose port
EXPOSE 3000

# Start application
CMD ["npm", "start"]
```

**Create a `.dockerignore`:**

```
node_modules
.git
.gitignore
README.md
.next
.env
.env.local
```

**Build and run:**

```bash
# Build image
docker build -t stellarscope:latest .

# Run container
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_HORIZON_URL=https://horizon.stellar.org \
  -e NEXT_PUBLIC_SOROBAN_RPC_URL=https://soroban-testnet.stellar.org \
  stellarscope:latest
```

**Access at:** `http://localhost:3000`

---

### AWS EC2

**1. Launch an EC2 Instance**
- Choose Ubuntu 22.04 LTS
- Instance type: t3.micro or larger
- Allow inbound traffic on ports 80, 443, 3000

**2. Connect and Setup**

```bash
# SSH into instance
ssh -i your-key.pem ubuntu@your-instance-ip

# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install PM2 (process manager)
sudo npm install -g pm2

# Install Nginx (reverse proxy)
sudo apt install -y nginx
```

**3. Deploy Application**

```bash
# Clone repository
git clone https://github.com/YOUR_USERNAME/stellarscope.git
cd stellarscope

# Install dependencies
npm install

# Build application
npm run build

# Start with PM2
pm2 start npm --name "stellarscope" -- start

# Save PM2 config to restart on reboot
pm2 startup
pm2 save
```

**4. Configure Nginx Reverse Proxy**

```bash
sudo cat > /etc/nginx/sites-available/stellarscope << 'EOF'
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
EOF

# Enable site
sudo ln -s /etc/nginx/sites-available/stellarscope /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default

# Test Nginx config
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
```

**5. Setup SSL Certificate (Optional)**

```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Get certificate
sudo certbot --nginx -d your-domain.com
```

---

### DigitalOcean App Platform

**1. Connect GitHub**
- Sign in to DigitalOcean
- Go to App Platform
- Click "Create App"
- Select GitHub and authorize

**2. Configure Application**
- Select your StellarScope repository
- Choose branch: `main`

**3. Set Build Configuration**

```yaml
# Build command
npm run build

# Run command
npm start
```

**4. Add Environment Variables**

```
NEXT_PUBLIC_HORIZON_URL=https://horizon.stellar.org
NEXT_PUBLIC_SOROBAN_RPC_URL=https://soroban-testnet.stellar.org
NODE_ENV=production
```

**5. Deploy**
- Click "Create Resources"
- Click "Deploy App"
- Wait for deployment to complete
- Access via provided URL

---

### Railway

**1. Install Railway CLI**

```bash
npm i -g @railway/cli
```

**2. Login and Initialize**

```bash
railway login
railway init
```

**3. Configure `railway.json`** (optional)

```json
{
  "build": {
    "builder": "nixpacks"
  },
  "start": "npm start"
}
```

**4. Deploy**

```bash
railway up
```

**5. Configure Environment Variables**

```bash
railway variables set NEXT_PUBLIC_HORIZON_URL=https://horizon.stellar.org
railway variables set NEXT_PUBLIC_SOROBAN_RPC_URL=https://soroban-testnet.stellar.org
```

---

### Render

**1. Create Web Service**
- Sign in to Render
- Click "New +" → "Web Service"
- Select GitHub repository

**2. Configure Build**

```
Build Command: npm install && npm run build
Start Command: npm start
```

**3. Set Environment Variables**

```
NEXT_PUBLIC_HORIZON_URL=https://horizon.stellar.org
NEXT_PUBLIC_SOROBAN_RPC_URL=https://soroban-testnet.stellar.org
NODE_ENV=production
```

**4. Deploy**
- Click "Create Web Service"
- Monitor deployment logs

---

### Self-Hosted VPS (Ubuntu 22.04)

**1. Initial Setup**

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install process manager
sudo npm install -g pm2

# Install Nginx
sudo apt install -y nginx

# Install Git
sudo apt install -y git
```

**2. Create Application Directory**

```bash
sudo mkdir -p /var/www/stellarscope
sudo chown $USER:$USER /var/www/stellarscope
cd /var/www/stellarscope
```

**3. Clone and Setup Application**

```bash
# Clone repository
git clone https://github.com/YOUR_USERNAME/stellarscope.git .

# Install dependencies
npm install

# Build application
npm run build

# Start with PM2
pm2 start npm --name "stellarscope" -- start
pm2 startup
pm2 save
```

**4. Configure Nginx**

```bash
sudo cat > /etc/nginx/sites-available/stellarscope << 'EOF'
upstream stellarscope_backend {
    server localhost:3000;
}

server {
    listen 80;
    listen [::]:80;
    
    server_name your-domain.com www.your-domain.com;

    location / {
        proxy_pass http://stellarscope_backend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
EOF

# Enable site
sudo ln -s /etc/nginx/sites-available/stellarscope /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default 2>/dev/null || true

# Test and reload
sudo nginx -t
sudo systemctl reload nginx
```

**5. Setup SSL (Let's Encrypt)**

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

**6. Setup Automatic Updates**

```bash
# Create update script
cat > ~/update-stellarscope.sh << 'EOF'
#!/bin/bash
cd /var/www/stellarscope
git pull origin main
npm install
npm run build
pm2 restart stellarscope
EOF

chmod +x ~/update-stellarscope.sh

# Add to cron for daily updates
crontab -e
# Add: 0 2 * * * ~/update-stellarscope.sh
```

---

## Production Checklist

- [ ] Environment variables configured
- [ ] Build completes without errors (`npm run build`)
- [ ] Application starts without errors (`npm start`)
- [ ] Can access dashboard at configured URL
- [ ] Stellar API endpoints are reachable
- [ ] All pages load correctly
- [ ] No console errors in browser
- [ ] Logging configured if needed
- [ ] Backup strategy in place
- [ ] Monitoring/alerting configured

---

## Monitoring & Maintenance

### Check Application Status

```bash
# With PM2
pm2 status
pm2 logs stellarscope

# With Docker
docker ps
docker logs container-id

# With systemd
sudo systemctl status stellarscope
sudo journalctl -u stellarscope -f
```

### View Server Logs

```bash
# Nginx
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log

# System logs
sudo journalctl -f
```

### Restart Application

```bash
# With PM2
pm2 restart stellarscope

# With systemd
sudo systemctl restart stellarscope

# With Docker
docker restart container-id
```

---

## Troubleshooting

### Application won't start
```bash
npm run build    # Check for build errors
npm start        # Check for runtime errors
```

### Port 3000 already in use
```bash
# Find process using port 3000
lsof -i :3000

# Kill it
kill -9 <PID>

# Or use different port
PORT=3001 npm start
```

### Stellar API not responding
- Check internet connection
- Verify API URL in environment variables
- Check Stellar API status: https://status.stellar.org

### Nginx 502 Bad Gateway
- Check if Node app is running (`pm2 status`)
- Check Node app logs (`pm2 logs`)
- Verify Nginx upstream configuration
- Check firewall rules

---

## Performance Optimization

### Enable Gzip Compression

In Nginx:
```nginx
gzip on;
gzip_types text/plain text/css text/javascript application/json;
gzip_min_length 1024;
```

### Cache Static Assets

In Nginx:
```nginx
location /_next/static {
    expires 365d;
    add_header Cache-Control "public, immutable";
}
```

### Database Caching (Optional Future)

If you add SQLite caching:
```bash
# Ensure write permissions
sudo chown nobody:nogroup /var/www/stellarscope/db
```

---

## Scaling

As traffic increases:

1. **Horizontal Scaling**: Run multiple instances behind load balancer
2. **Caching Layer**: Add Redis for data caching
3. **Database**: Implement SQLite or PostgreSQL for historical data
4. **CDN**: Use Cloudflare or similar for static assets

---

## Cost Estimate

| Platform | Cost | Notes |
|----------|------|-------|
| Docker | Varies | Pay for hosting |
| AWS EC2 | $10-50/month | Free tier available |
| DigitalOcean | $4-12/month | Simple, reliable |
| Railway | $5+/month | Pay-as-you-go |
| Render | Free-$7/month | Free tier available |
| Self-hosted | $5-50/month | VPS cost only |

---

## Support

For issues, check:
- Application logs
- Browser console (F12)
- Stellar API status
- Server disk space and memory

