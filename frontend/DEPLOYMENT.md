# Frontend Deployment Guide

Complete guide for deploying the EduHunt frontend to production.

## Prerequisites

- Vercel account
- GitHub repository access
- OAuth credentials (Google & GitHub)
- Backend API endpoint

## Vercel Deployment (Recommended)

### Step 1: Setup Vercel Project

1. Visit [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Select your GitHub repository
4. Configure import settings:
   - **Root Directory**: `frontend/`
   - **Framework Preset**: Next.js
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`

### Step 2: Environment Variables

Add the following environment variables in Vercel dashboard:

```
NEXT_PUBLIC_API_URL=https://api.yourdomain.com/api
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=https://yourdomain.com
```

### Step 3: Generate NEXTAUTH_SECRET

```bash
openssl rand -base64 32
```

Copy the output and paste it as `NEXTAUTH_SECRET` in Vercel.

### Step 4: Deploy

Click "Deploy" button. Vercel will:

1. Build the Next.js application
2. Run tests (if configured)
3. Deploy to edge network
4. Provide a production URL

### Step 5: Connect Domain

1. Go to project settings
2. Domains section
3. Add your custom domain
4. Update DNS records (Vercel will provide)

## GitHub Actions CI/CD

The frontend includes a complete CI/CD pipeline that runs on every push:

### Workflow Jobs

1. **Lint** - ESLint & Prettier checks
2. **Type Check** - TypeScript validation
3. **Unit Tests** - Jest & React Testing Library
4. **Build** - Next.js production build
5. **E2E Tests** - Playwright tests
6. **Deploy Preview** - Preview on pull requests
7. **Deploy Production** - Deploy to production on main

### Setup Secrets

Add to GitHub repository secrets:

```
VERCEL_TOKEN=your_vercel_token
VERCEL_ORG_ID=your_vercel_org_id
VERCEL_PROJECT_ID=your_vercel_project_id
```

#### How to Get Vercel Credentials:

1. **VERCEL_TOKEN**: Visit [Vercel Settings](https://vercel.com/account/tokens)
   - Create new token
   - Copy and add to GitHub secrets

2. **VERCEL_ORG_ID**: Found in Vercel dashboard URL
   - URL: `https://vercel.com/[org-id]/[project]`

3. **VERCEL_PROJECT_ID**: Also in Vercel dashboard
   - Or run: `npx vercel link` locally

## Local Development Before Deploy

### 1. Test Everything Locally

```bash
cd frontend

# Install dependencies
npm install

# Run tests
npm test
npm run test:e2e

# Build production
npm run build

# Start production server
npm start
```

### 2. Test Environment Variables

```bash
# Copy example
cp .env.example .env.local

# Update with your credentials
nano .env.local

# Start dev server
npm run dev

# Visit http://localhost:3000
```

### 3. Lint & Format

```bash
npm run lint      # Check for issues
npm run format    # Fix formatting
npm run type-check # TypeScript check
```

## Production Checklist

- [ ] All environment variables set in Vercel
- [ ] Backend API is accessible
- [ ] OAuth credentials are valid
- [ ] Custom domain is configured
- [ ] SSL certificate is active
- [ ] All tests passing locally
- [ ] No console errors or warnings
- [ ] Images are optimized
- [ ] Metadata and SEO tags are correct
- [ ] Analytics tracking is configured (optional)

## Monitoring & Debugging

### Vercel Analytics

1. Go to Vercel project dashboard
2. Click "Analytics" tab
3. Monitor:
   - Performance metrics
   - Web vitals
   - Error rates

### Logs

View deployment logs:

1. Vercel dashboard > Deployments > Select deployment
2. Click "Logs" tab
3. Check for build or runtime errors

### Error Tracking

For production errors:

1. Check browser console (F12)
2. Check Vercel logs
3. Check backend API logs
4. Check GitHub Actions logs

## Rollback

If deployment has issues:

1. **Vercel Rollback**
   - Go to Deployments
   - Select previous stable version
   - Click "Promote to Production"

2. **Git Rollback**
   ```bash
   git revert [bad-commit]
   git push origin feat/frontend
   ```

## Scaling & Performance

### Optimization Tips

1. **Images**: Use Next.js Image component
2. **Code Splitting**: Let Next.js handle automatically
3. **Caching**: Vercel handles by default
4. **Database**: Monitor API response times

### CDN Configuration

Vercel automatically:

- Caches static assets
- Compresses responses
- Serves from global edge network

## Troubleshooting

### OAuth Not Working

1. Check OAuth credentials are correct
2. Verify redirect URIs:
   - Development: `http://localhost:3000/api/auth/callback/[provider]`
   - Production: `https://yourdomain.com/api/auth/callback/[provider]`
3. Check NEXTAUTH_SECRET is set
4. Check NEXTAUTH_URL matches domain

### API Not Responding

1. Check `NEXT_PUBLIC_API_URL` is correct
2. Verify backend is running
3. Check CORS settings on backend
4. Check network tab in DevTools

### Build Failing

1. Check Node.js version (18+)
2. Run `npm install` locally
3. Run `npm run build` locally
4. Check for console errors
5. Verify all required env vars

### Slow Performance

1. Check Core Web Vitals
2. Optimize images
3. Reduce bundle size
4. Check API response times
5. Enable caching headers

## Maintenance

### Regular Tasks

- **Weekly**: Monitor error rates, check logs
- **Monthly**: Review analytics, update dependencies
- **Quarterly**: Security audit, performance review

### Update Dependencies

```bash
cd frontend

# Check for updates
npm outdated

# Update all
npm update

# Update specific package
npm install package@latest

# Run tests after update
npm test
npm run test:e2e
```

## Support

For deployment issues:

- Check Vercel documentation: https://vercel.com/docs
- GitHub Actions docs: https://docs.github.com/en/actions
- NextAuth.js docs: https://next-auth.js.org

---

Deployed with ❤️ on Vercel
