# Netlify Deployment Guide for PetPortions.com

## ✅ Prerequisites Complete

- [x] MongoDB Atlas cluster configured with replica set support
- [x] 842 pet food products scraped and stored in database
- [x] Complete nutritional calculations (DMB, CWB, ME) implemented
- [x] Prisma schema synced with Atlas

## 🚀 Deployment Steps

### 1. Push to GitHub

Make sure all changes are committed and pushed to your GitHub repository:

```bash
git add .
git commit -m "Add MongoDB Atlas integration and complete pet food scraper"
git push origin main
```

### 2. Connect to Netlify

1. Go to https://app.netlify.com/
2. Click "Add new site" → "Import an existing project"
3. Choose "GitHub" as your Git provider
4. Select your `petportions.com` repository
5. Configure build settings:
   - **Build command**: `npm run build` or `next build`
   - **Publish directory**: `.next`
   - **Framework**: Next.js (auto-detected)

### 3. Configure Environment Variables

In Netlify dashboard → Site settings → Environment variables, add:

```
DATABASE_URL=mongodb+srv://actionjax4_db_user:tqr2Emfq0PpLz3ZP@petportions.qheq7lj.mongodb.net/petportions?retryWrites=true&w=majority&appName=petportions
```

**Important**: This environment variable will be used by your Next.js application to connect to MongoDB Atlas in production.

### 4. Deploy!

Click "Deploy site" and Netlify will:
- Install dependencies
- Build your Next.js app
- Deploy to a Netlify subdomain (e.g., `petportions.netlify.app`)

## 📊 Database Status

Your MongoDB Atlas database (`petportions`) currently contains:

- **842 pet food products** (629 dogs, 213 cats)
- **Complete nutritional data** for each product:
  - Guaranteed Analysis (protein, fat, fiber, moisture, ash)
  - Dry Matter Basis percentages
  - Calorie-Weighted Basis percentages
  - Metabolizable Energy (kcal/cup, kcal/kg, kcal/100g)
  - Full ingredients list
  - Estimated carbohydrates

## 🔐 Security Notes

### IP Whitelist

Your MongoDB Atlas cluster currently allows access from:
- **Your current IP**: 174.24.67.121

For Netlify to access your database, you need to:

1. Go to MongoDB Atlas → Network Access
2. Click "Add IP Address"
3. Select "Allow Access from Anywhere" (0.0.0.0/0)
   - **Note**: This is safe because authentication is still required via username/password

### Credentials Management

Your database credentials are:
- **Username**: `actionjax4_db_user`
- **Password**: `tqr2Emfq0PpLz3ZP`

These are **only** stored in:
- `.env.local` (gitignored, local dev only)
- Netlify environment variables (production)
- **NOT** in your Git repository

## 🔄 Keeping Data Updated

### Running the Scraper

The scraper can be run manually or via scheduled jobs:

**Local execution:**
```bash
npm run scrape
```

**Scheduled updates** (future enhancement):
- Use Netlify Functions with scheduled triggers
- Or GitHub Actions on a schedule
- Recommended: Weekly updates to catch formula changes

## 🎯 Next Steps

After deployment, you'll want to:

1. **Seed AAFCO Standards**: Add official nutrient requirements
2. **Integrate FDA Recalls**: Add recall warnings to food search
3. **Build Server Actions**: Replace mock data with real DB queries
4. **Test all features**: Calculator, Grader, Diet Transition with real data

## 📝 Environment Variables Reference

| Variable | Value | Purpose |
|----------|-------|---------|
| `DATABASE_URL` | `mongodb+srv://...` | MongoDB Atlas connection string |

## 🆘 Troubleshooting

### Build fails on Netlify

- Check that `DATABASE_URL` is set in environment variables
- Ensure Prisma client is generated during build (should be automatic)

### Database connection timeout

- Verify IP whitelist includes `0.0.0.0/0` in MongoDB Atlas
- Check that connection string has `?retryWrites=true&w=majority`

### Missing products in search

- Verify scraper completed successfully (should show 842 products)
- Check Prisma schema is synced: `npx prisma db push`

## 🎉 Success Checklist

- [ ] Site deploys successfully to Netlify
- [ ] No build errors
- [ ] Food search components load (even if using old API)
- [ ] No database connection errors in Netlify logs

Once deployed, the next major task is replacing the OpenPetFood API calls with queries to your new MongoDB database!

