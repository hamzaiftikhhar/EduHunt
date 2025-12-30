# EduHunt Frontend

A premium, modern frontend for the EduHunt course discovery platform built with Next.js, TypeScript, Tailwind CSS, and Radix UI components.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm/yarn
- An active EduHunt backend API running

### Setup

1. **Install dependencies:**

```bash
cd frontend
npm install
# or
yarn install
```

2. **Create environment variables:**

```bash
cp .env.example .env.local
```

Update `.env.local` with your backend API URL:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

3. **Start the development server:**

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
frontend/
├── src/
│   ├── app/              # Next.js App Router pages
│   │   ├── page.tsx      # Home page
│   │   ├── explore/      # Course exploration
│   │   ├── scholarships/ # Scholarship finder
│   │   ├── about/        # About page
│   │   ├── layout.tsx    # Root layout
│   │   └── globals.css   # Global styles
│   ├── components/       # Reusable React components
│   ├── lib/
│   │   ├── api.ts        # API client functions
│   │   └── utils.ts      # Utility functions
│   └── styles/           # CSS files
├── public/               # Static assets
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.ts
└── .eslintrc.json
```

## 🎨 Features

- **🔍 Course Search**: Search and filter courses from multiple platforms
- **🏆 Scholarship Finder**: Discover funding opportunities
- **📱 Responsive Design**: Mobile-first, works on all devices
- **⚡ Performance**: Next.js optimizations, SSG/SSR where needed
- **♿ Accessibility**: WCAG 2.1 compliant
- **🎯 Type-Safe**: Full TypeScript support
- **🎨 Premium UI**: Tailwind CSS with custom color palette

## 🔧 Available Scripts

```bash
# Development
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Lint code
npm run lint

# Format code
npm run format

# Type check
npm run type-check
```

## 🎨 Design System

### Colors

- **Primary**: Sky Blue (`primary-*`)
- **Secondary**: Purple (`secondary-*`)
- **Neutral**: Slate (`slate-*`)

### Typography

- Font: Inter (via Google Fonts)
- Base size: 16px
- Line height: 1.5

## 🔌 API Integration

The frontend communicates with the backend API for:

- Course search and filtering
- Course details
- Scholarship listings
- User authentication (planned)

API endpoints are defined in `src/lib/api.ts`.

## 📊 Pages

| Route | Description |
|-------|-------------|
| `/` | Home page with hero, features, and CTA |
| `/explore` | Course search and discovery |
| `/scholarships` | Scholarship finder |
| `/about` | About EduHunt |
| `/course/:id` | Individual course details (coming soon) |

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Set environment variables
4. Deploy automatically on push

### Other Platforms

The app is built with Next.js, so it can be deployed to any Node.js hosting:
- AWS
- Google Cloud
- Netlify
- DigitalOcean
- Heroku

## 📦 Dependencies

### Production

- **next**: React framework
- **react**: UI library
- **react-dom**: React DOM
- **tailwindcss**: CSS framework
- **radix-ui**: Accessible UI primitives
- **lucide-react**: Icon library

### Development

- **typescript**: Type safety
- **eslint**: Linting
- **prettier**: Code formatting
- **tailwind-merge**: Merge Tailwind classes

## 🔄 Development Workflow

1. Create feature branch from `main`
2. Make changes and commit
3. Run `npm run lint` and `npm run format`
4. Push and create Pull Request
5. Get review and merge

## 📝 License

Part of the EduHunt project.

## 🤝 Contributing

See root project README for contribution guidelines.
