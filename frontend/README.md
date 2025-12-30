# EduHunt Frontend

A premium, modern frontend for the EduHunt course discovery platform built with Next.js, TypeScript, Tailwind CSS, and NextAuth.js.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm/yarn
- An active EduHunt backend API running
- OAuth credentials (Google & GitHub)

### Setup

1. **Install dependencies:**

```bash
cd frontend
npm install
```

2. **Create environment variables:**

```bash
cp .env.example .env.local
```

Update `.env.local` with your credentials:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api

# OAuth (Google)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# OAuth (GitHub)
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret

# NextAuth Secret
NEXTAUTH_SECRET=$(openssl rand -base64 32)
```

3. **Start the development server:**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
frontend/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── api/            # API routes & auth
│   │   ├── auth/           # Authentication pages
│   │   ├── dashboard/      # User dashboard
│   │   ├── explore/        # Course search
│   │   ├── course/         # Course detail
│   │   ├── scholarships/   # Scholarships
│   │   ├── about/          # About page
│   │   ├── page.tsx        # Home page
│   │   ├── layout.tsx      # Root layout
│   │   ├── robots.ts       # SEO robots
│   │   └── sitemap.ts      # SEO sitemap
│   ├── components/         # Reusable components
│   ├── hooks/              # Custom React hooks
│   ├── lib/
│   │   ├── auth.ts         # NextAuth config
│   │   ├── auth-actions.ts # Auth actions
│   │   ├── api.ts          # API client
│   │   ├── theme.ts        # Design tokens
│   │   └── utils.ts        # Utilities
│   └── styles/             # Global CSS
├── e2e/                    # Playwright tests
├── public/                 # Static assets
├── jest.config.ts          # Jest configuration
├── playwright.config.ts    # Playwright configuration
└── [config files]          # TSConfig, Tailwind, ESLint
```

## 🎨 Features

### ✨ User Features
- 🔍 **Course Search** - Search and filter courses from multiple platforms
- 🏆 **Scholarship Finder** - Discover funding opportunities
- 📚 **Course Details** - Comprehensive course information
- ❤️ **Wishlist** - Save courses for later
- 👤 **User Dashboard** - Track learning progress
- 🔐 **Authentication** - Google/GitHub OAuth sign-in

### 🛠️ Developer Features
- **Next.js 15** with App Router & TypeScript
- **Tailwind CSS 3.4** for styling
- **NextAuth.js** for authentication
- **Jest + React Testing Library** for unit tests
- **Playwright** for E2E testing
- **GitHub Actions** CI/CD pipeline
- **Accessibility** WCAG 2.1 AA compliance
- **SEO** robots.txt, sitemap.xml, meta tags
- **PWA** manifest for mobile apps

## 🔧 Available Scripts

```bash
# Development
npm run dev              # Start dev server

# Build & Deploy
npm run build           # Build for production
npm run start           # Start production server

# Quality
npm run lint            # Run ESLint
npm run format          # Format with Prettier
npm run type-check      # TypeScript check

# Testing
npm test                # Run unit tests
npm test:watch          # Watch mode
npm test:e2e            # Run E2E tests
```

## 🎨 Design System

### Colors
- **Primary**: Sky Blue (`primary-*`)
- **Secondary**: Purple (`secondary-*`)
- **Neutral**: Slate (`slate-*`)

### Components
- Button, Badge, Card, SearchBar
- Modal, Alert, Pagination
- Header, Footer, Container
- SkipLink (accessibility)

### Typography
- Font: Inter (from Google Fonts)
- Base size: 16px (1rem)
- Responsive scales

## 🔌 API Integration

### Endpoints
- `GET /api/courses` - List courses with filters
- `GET /api/courses/:id` - Get course details
- `GET /api/scholarships` - List scholarships
- `POST /api/users/courses` - Enroll in course
- `POST /api/users/wishlist` - Save course

### Custom Hooks
```typescript
// Data fetching
const { data, loading, error } = useCourses(filters);
const course = useCourseDetail(id);
const { data: scholarships } = useScholarships(filters);

// Client storage
const { value, setValue } = useLocalStorage(key, initial);
```

## 🔐 Authentication

### Providers
- **Google OAuth** - Sign in with Google
- **GitHub OAuth** - Sign in with GitHub

### Protected Routes
- `/dashboard` - Requires authentication
- `/dashboard/profile` - User profile
- `/dashboard/wishlist` - Saved courses

### Session
```typescript
import { auth } from "@/lib/auth";

const session = await auth();
if (session) {
  // User is authenticated
  console.log(session.user.email);
}
```

## 📊 Pages

| Route | Description |
|-------|-------------|
| `/` | Home with features & CTA |
| `/explore` | Course search & discovery |
| `/course/:id` | Course details & enrollment |
| `/scholarships` | Scholarship finder |
| `/about` | About EduHunt |
| `/auth/signin` | Sign in page |
| `/auth/error` | Auth error page |
| `/dashboard` | User learning dashboard |
| `/dashboard/profile` | User profile settings |
| `/dashboard/wishlist` | Saved courses |

## 🧪 Testing

### Unit Tests
```bash
npm test
npm test -- --coverage
```

### E2E Tests
```bash
npm run test:e2e
npm run test:e2e -- --headed
```

## ♿ Accessibility

- WCAG 2.1 AA compliant
- Keyboard navigation support
- ARIA labels and descriptions
- Color contrast compliance
- Skip links for screen readers
- Semantic HTML structure

## 📈 Performance

- Image optimization with Next.js Image
- Code splitting & lazy loading
- Server-side rendering (SSR)
- Static generation (SSG)
- CSS minification with Tailwind
- JavaScript bundling optimization

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect repository to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Import the repository
   - Set project root to `frontend/`

2. **Configure environment variables**
   - Add all `.env` variables in Vercel settings
   - Set `NEXTAUTH_URL` to your domain

3. **Deploy**
   - Automatic deployment on push to main
   - Preview deployments on pull requests

### Other Platforms

The app can be deployed to any Node.js hosting:
- AWS Amplify
- Google Cloud Run
- DigitalOcean
- Heroku

## 📦 Dependencies

### Production
- `next` - React framework
- `react` - UI library
- `next-auth` - Authentication
- `tailwindcss` - CSS framework
- `lucide-react` - Icons

### Development
- `typescript` - Type safety
- `jest` - Unit testing
- `playwright` - E2E testing
- `prettier` - Code formatting
- `eslint` - Linting

## 🔄 Development Workflow

1. Create feature branch
2. Make changes
3. Run tests: `npm test`
4. Run linter: `npm run lint`
5. Format code: `npm run format`
6. Push and create PR
7. Wait for CI/CD to pass
8. Request review

## 📋 Checklist

- [x] Project scaffolding
- [x] Core pages (5 main pages)
- [x] Design system & components (11 components)
- [x] API integration & hooks
- [x] Authentication (OAuth)
- [x] User dashboard
- [x] Unit tests
- [x] E2E tests
- [x] CI/CD pipeline
- [x] Accessibility
- [x] SEO setup
- [x] Deployment ready

## 🤝 Contributing

See root project README for contribution guidelines.

## 📝 License

Part of the EduHunt project.

## 🎯 Support

- 📧 Email: support@eduhunt.app
- 🐛 Issues: GitHub Issues
- 💬 Discussions: GitHub Discussions

---

Built with ❤️ using Next.js & TypeScript

