# 🚀 Netlify Deployment Guide for Ride Your Way

## Prerequisites
- Netlify account (free tier works fine)
- Git repository (GitHub, GitLab, or Bitbucket)

## Method 1: Deploy via Netlify Dashboard (Recommended)

### Step 1: Build Your Project Locally
```bash
cd react-app
npm run build
```

This will create a `dist` folder with your production-ready files.

### Step 2: Deploy to Netlify

#### Option A: Drag & Drop (Quickest)
1. Go to https://app.netlify.com/drop
2. Drag and drop your `react-app/dist` folder
3. Your site will be live in seconds!

#### Option B: Connect Git Repository (Best for continuous deployment)
1. Go to https://app.netlify.com
2. Click "Add new site" → "Import an existing project"
3. Choose your Git provider (GitHub/GitLab/Bitbucket)
4. Select your repository: `Ride_Your_Way_iosys`
5. Netlify will automatically detect the `netlify.toml` configuration file
6. Click "Deploy site"

**Note**: The `netlify.toml` file in the repository root contains all the build settings:
- Base directory: `react-app`
- Build command: `npm run build`
- Publish directory: `react-app/dist`

### Step 3: Configure Site Settings (Optional)
1. Go to Site settings → General
2. Change site name to something memorable (e.g., `rideyourway-app`)
3. Your site will be available at: `https://rideyourway-app.netlify.app`

## Method 2: Deploy via Netlify CLI

### Step 1: Install Netlify CLI
```bash
npm install -g netlify-cli
```

### Step 2: Login to Netlify
```bash
netlify login
```

### Step 3: Initialize and Deploy
```bash
cd react-app
npm run build
netlify deploy
```

Follow the prompts:
- Create & configure a new site? **Yes**
- Team: Select your team
- Site name: Enter a unique name (e.g., `rideyourway-app`)
- Publish directory: `dist`

### Step 4: Deploy to Production
```bash
netlify deploy --prod
```

## Configuration Files Created

### 1. `netlify.toml`
- Configures build settings
- Sets up redirects for React Router
- Adds security headers
- Optimizes caching

### 2. `_redirects`
- Ensures all routes work with React Router
- Redirects all requests to index.html

### 3. `vite.config.js` (Updated)
- Changed `base` from `/Ride_Your_Way_iosys/` to `/`
- This is necessary for Netlify deployment

## Environment Variables (If Needed)

If you need to add API keys or environment variables:

1. Go to Site settings → Environment variables
2. Add your variables:
   - `VITE_GOOGLE_MAPS_API_KEY`
   - `VITE_API_URL`
   - etc.

## Custom Domain (Optional)

1. Go to Site settings → Domain management
2. Click "Add custom domain"
3. Follow the instructions to configure DNS

## Troubleshooting

### Issue: 404 on page refresh
**Solution**: The `netlify.toml` and `_redirects` files should fix this. Make sure they're in the `react-app` directory.

### Issue: Build fails
**Solution**: 
- Check that Node version is compatible (16.x or higher)
- Go to Site settings → Build & deploy → Environment
- Set `NODE_VERSION` to `18` or `20`

### Issue: Assets not loading
**Solution**: Make sure `base: '/'` is set in `vite.config.js`

## Continuous Deployment

Once connected to Git:
- Every push to `main` branch automatically deploys
- Pull requests create preview deployments
- You can configure branch deploys in Site settings

## Performance Optimization

Netlify automatically provides:
- ✅ Global CDN
- ✅ Automatic HTTPS
- ✅ Asset optimization
- ✅ Instant cache invalidation
- ✅ Continuous deployment

## Monitoring

View your site's performance:
1. Go to Site overview
2. Check Analytics (available on paid plans)
3. Monitor deploy logs for any issues

## Cost

- **Free tier includes**:
  - 100 GB bandwidth/month
  - 300 build minutes/month
  - Unlimited sites
  - HTTPS
  - Continuous deployment

Perfect for this project! 🎉

## Quick Commands Reference

```bash
# Build locally
npm run build

# Preview build locally
npm run preview

# Deploy to Netlify (CLI)
netlify deploy --prod

# Check deploy status
netlify status

# Open site in browser
netlify open
```

## Your Site is Ready! 🎊

After deployment, your Ride Your Way app will be live at:
- `https://your-site-name.netlify.app`

Share the link and enjoy your deployed app!
