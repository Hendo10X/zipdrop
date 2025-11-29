# Deployment Checklist

Use this checklist before deploying Zipdrop to production.

## Pre-Deployment

### 1. Environment Setup
- [ ] Install dependencies: `npm install`
- [ ] Create `.env.local` file from `.env.example`
- [ ] Add `DATABASE_URL` (Neon PostgreSQL connection string)
- [ ] Add `BETTER_AUTH_SECRET` (generate with `openssl rand -hex 32`)
- [ ] Add `BETTER_AUTH_URL` (http://localhost:3000 for dev)
- [ ] Add `MAPBOX_ACCESS_TOKEN` (from Mapbox account)

### 2. Mapbox API Setup
- [ ] Create free Mapbox account at https://account.mapbox.com/
- [ ] Navigate to Access Tokens page
- [ ] Copy default public token or create a new one
- [ ] Paste into `MAPBOX_ACCESS_TOKEN` in `.env.local`
- [ ] Test token by running the app and verifying an address

### 3. Database Setup
- [ ] Create Neon database
- [ ] Copy connection string
- [ ] Run migrations: `npx drizzle-kit push`
- [ ] Verify tables created:
  - [ ] user
  - [ ] session
  - [ ] account
  - [ ] verification
  - [ ] saved_address
  - [ ] activity_log

### 4. Local Testing
- [ ] Start dev server: `npm run dev`
- [ ] Test home page loads
- [ ] Test sign up flow
- [ ] Test login flow
- [ ] Test address verification
- [ ] Test geolocation (grant permission when prompted)
- [ ] Test saving an address
- [ ] Test dashboard overview
- [ ] Test saved addresses page
- [ ] Test activity log
- [ ] Test settings page
- [ ] Test logout

### 5. Build Verification
- [ ] Run production build: `npm run build`
- [ ] Check for TypeScript errors
- [ ] Check for build warnings
- [ ] Test production build locally: `npm start`

## Production Deployment

### 1. Environment Variables (Production)
- [ ] Set `DATABASE_URL` on hosting platform
- [ ] Set `BETTER_AUTH_SECRET` (use a different secret than dev)
- [ ] Set `BETTER_AUTH_URL` to production domain (e.g., https://zipdrop.com)
- [ ] Set `MAPBOX_ACCESS_TOKEN` (can use same as dev or create production token)

### 2. Database (Production)
- [ ] Create production database (separate from dev)
- [ ] Run migrations on production: `npx drizzle-kit push`
- [ ] Verify all tables exist
- [ ] Test database connection

### 3. Hosting Platform Setup (Example: Vercel)
- [ ] Connect GitHub repository
- [ ] Configure build settings:
  - Build Command: `npm run build`
  - Output Directory: `.next`
  - Install Command: `npm install`
- [ ] Add environment variables
- [ ] Deploy

### 4. Post-Deployment Testing
- [ ] Visit production URL
- [ ] Test sign up with real email
- [ ] Test login
- [ ] Test address verification with real addresses
- [ ] Test geolocation
- [ ] Test saving addresses
- [ ] Test all dashboard pages
- [ ] Test on mobile device
- [ ] Test on different browsers

### 5. Monitoring & Security
- [ ] Set up error monitoring (e.g., Sentry)
- [ ] Monitor Mapbox API usage (100,000 free requests/month)
- [ ] Set up API usage alerts (optional)
- [ ] Enable HTTPS (should be automatic on Vercel/Netlify)
- [ ] Test SSL certificate

## Common Issues & Solutions

### Issue: "MAPBOX_ACCESS_TOKEN is not configured"
- **Solution**: Ensure the environment variable is set correctly
- Check spelling and make sure there are no extra spaces
- Restart the development server after adding env vars

### Issue: "Failed to verify address"
- **Solution**:
  - Verify your Mapbox access token is correct
  - Check if you've exceeded the free tier limit (100,000 requests/month)
  - Ensure your token has the appropriate scopes
  - Test the token at https://account.mapbox.com/access-tokens/
  - Check for typos in the address input

### Issue: "Unauthorized" errors in dashboard
- **Solution**:
  - Clear browser cookies
  - Log out and log back in
  - Check database connection
  - Verify session table exists

### Issue: Build fails with TypeScript errors
- **Solution**:
  - Run `npm install` to ensure all dependencies are installed
  - Check for missing imports
  - Verify all files are saved
  - Clear `.next` folder and rebuild

### Issue: Geolocation not working
- **Solution**:
  - Ensure HTTPS is enabled (required for geolocation)
  - Check browser permission settings
  - Try in a different browser
  - Test with a different device/network

### Issue: Database connection fails
- **Solution**:
  - Verify DATABASE_URL is correct
  - Check if database is accessible
  - Ensure SSL mode is set correctly for Neon
  - Check firewall settings

## Performance Optimization

### Before Launch
- [ ] Optimize images (use Next.js Image component)
- [ ] Enable caching for API responses
- [ ] Minify CSS and JavaScript (automatic with Next.js)
- [ ] Test page load times
- [ ] Run Lighthouse audit
- [ ] Check Core Web Vitals

### Monitoring
- [ ] Set up analytics (Google Analytics, Plausible, etc.)
- [ ] Monitor API response times
- [ ] Track error rates
- [ ] Monitor database query performance
- [ ] Set up uptime monitoring

## Security Checklist

- [ ] All API endpoints validate user authentication
- [ ] Database queries use parameterized queries (via Drizzle ORM)
- [ ] API keys stored in environment variables (never in code)
- [ ] HTTPS enabled in production
- [ ] Session cookies are secure and httpOnly
- [ ] Rate limiting considered for API endpoints
- [ ] CORS configured properly
- [ ] Input validation on all forms
- [ ] XSS prevention measures in place

## Backup & Recovery

- [ ] Database backups configured (Neon has automatic backups)
- [ ] Document recovery procedures
- [ ] Test restore process
- [ ] Keep copy of environment variables secure

## Documentation

- [ ] README.md is up to date
- [ ] SETUP.md has accurate instructions
- [ ] API documentation is complete
- [ ] Database schema is documented

## Legal & Compliance

- [ ] Privacy policy created (if collecting user data)
- [ ] Terms of service created
- [ ] Cookie consent implemented (if required)
- [ ] GDPR compliance checked (if serving EU users)
- [ ] Google Maps API terms of service reviewed

## Launch

- [ ] All tests passing
- [ ] All checklist items completed
- [ ] Team notified of launch
- [ ] Support channels ready
- [ ] Monitoring active
- [ ] Rollback plan prepared

## Post-Launch

- [ ] Monitor error rates
- [ ] Check performance metrics
- [ ] Gather user feedback
- [ ] Plan first update
- [ ] Document any issues found

---

## Quick Start Commands

```bash
# Install dependencies
npm install

# Set up environment
cp .env.example .env.local
# Edit .env.local with your values

# Push database schema
npx drizzle-kit push

# Start development
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Support

If you encounter issues not covered here:
1. Check the SETUP.md file
2. Review BUILD_SUMMARY.md for implementation details
3. Check GitHub issues
4. Review console errors carefully
5. Test in incognito/private mode to rule out cache issues

---

**Last Updated**: December 2024
**Application Version**: 1.0.0
