# 🚀 Deployment Guide

## Quick Deploy to GitHub + Vercel

Follow these steps to deploy your Westeros Lineage app to production:

### Step 1: Create GitHub Repository

1. Go to [github.com](https://github.com) and sign in
2. Click the **+** button in the top right → **New repository**
3. Name it: `westeros-lineage`
4. Keep it **Public** (or Private if you prefer)
5. **Do NOT** initialize with README (we already have one)
6. Click **Create repository**

### Step 2: Push Code to GitHub

Copy and run these commands in your terminal:

```bash
# Add GitHub as remote origin (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/westeros-lineage.git

# Push your code
git push -u origin main
```

**Example:**
```bash
git remote add origin https://github.com/johndoe/westeros-lineage.git
git push -u origin main
```

### Step 3: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click **"Sign Up"** (use your GitHub account for easy integration)
3. Once signed in, click **"Add New..."** → **"Project"**
4. Import your `westeros-lineage` repository
5. Vercel will auto-detect these settings:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
6. Click **"Deploy"**

Your site will be live in ~1 minute at:
```
https://westeros-lineage-[random-id].vercel.app
```

### Step 4: Configure Custom Domain (Optional)

1. In Vercel project dashboard, go to **Settings** → **Domains**
2. Add your custom domain
3. Follow DNS configuration instructions

### Step 5: Enable Auto-Deployment

**Already enabled by default!**

Every time you push to the `main` branch on GitHub, Vercel will automatically:
- Build your app
- Run tests
- Deploy the new version
- Provide a preview URL

## Update Your Live Site

To deploy updates:

```bash
# Make changes to your code
# ...

# Commit and push
git add .
git commit -m "Your update message"
git push origin main
```

Vercel will automatically deploy within 1-2 minutes.

## Preview Deployments

Every pull request gets its own preview URL automatically. Perfect for:
- Testing features before merging
- Showing changes to collaborators
- QA testing

## Environment Variables (if needed)

If you add environment variables later:

1. Go to Vercel project → **Settings** → **Environment Variables**
2. Add your variables
3. Redeploy to apply changes

## Troubleshooting

### Build Failed?
- Check the build logs in Vercel dashboard
- Make sure `npm run build` works locally
- Verify all dependencies are in `package.json`

### 404 Errors on Page Refresh?
- The `vercel.json` file handles SPA routing
- Make sure it's committed to your repo

### Need Help?
- [Vercel Documentation](https://vercel.com/docs)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)

---

**Your app is now live! Share it with the realm!** ⚔️
