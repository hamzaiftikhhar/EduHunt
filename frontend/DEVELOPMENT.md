# Frontend Development Guide

Comprehensive guide for developing features in the EduHunt frontend.

## Getting Started

### Initial Setup

```bash
# Clone repository
git clone https://github.com/hamzaiftikhhar/EduHunt.git
cd EduHunt/frontend

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Start development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## Project Architecture

### Folder Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes & handlers
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # Protected user pages
│   ├── explore/           # Course search
│   ├── course/            # Course details
│   ├── scholarships/      # Scholarship finder
│   ├── about/             # Static pages
│   ├── page.tsx           # Home page
│   ├── layout.tsx         # Root layout
│   ├── robots.ts          # SEO
│   └── sitemap.ts         # SEO
├── components/            # Reusable React components
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── Button.tsx
│   ├── Card.tsx
│   └── *.test.tsx         # Component tests
├── hooks/                 # Custom React hooks
│   ├── useFetch.ts
│   └── useLocalStorage.ts
├── lib/                   # Utilities & config
│   ├── auth.ts           # NextAuth config
│   ├── api.ts            # API client
│   ├── theme.ts          # Design tokens
│   └── utils.ts          # Helper functions
└── styles/               # Global CSS
    └── globals.css
```

## Development Workflow

### 1. Create a Feature Branch

```bash
# Update main
git checkout main
git pull origin main

# Create feature branch
git checkout -b feat/feature-name
```

Branch naming conventions:

- `feat/` - New feature
- `fix/` - Bug fix
- `docs/` - Documentation
- `refactor/` - Code refactoring
- `test/` - Adding tests

### 2. Develop Your Feature

```bash
# Start dev server
npm run dev

# Make changes
# Edit files in src/

# Run tests while developing
npm test -- --watch

# Format code
npm run format

# Check types
npm run type-check
```

### 3. Test Before Committing

```bash
# Run all checks
npm run lint
npm run format
npm run type-check
npm test
npm run build

# Run E2E tests (if applicable)
npm run test:e2e
```

### 4. Commit & Push

```bash
# Stage changes
git add .

# Commit with meaningful message
git commit -m "feat: add feature description"

# Push to remote
git push origin feat/feature-name
```

Commit message format:

```
type(scope): description

Body explaining what and why
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

### 5. Create Pull Request

1. Go to GitHub
2. Click "Compare & pull request"
3. Fill PR template:
   - Clear title
   - Description of changes
   - Link related issues
   - Screenshots (if UI changes)

Wait for:

- ✅ All checks to pass
- ✅ Code review approval
- ✅ Tests to pass

### 6. Merge & Deploy

Maintainer will:

1. Merge PR to main
2. Delete feature branch
3. GitHub Actions deploys to production

## Component Development

### Creating a New Component

1. **Create component file**

```typescript
// src/components/MyComponent.tsx
import { ReactNode } from "react";

interface MyComponentProps {
  children: ReactNode;
  variant?: "primary" | "secondary";
}

export function MyComponent({ children, variant = "primary" }: MyComponentProps) {
  return (
    <div className={`component variant-${variant}`}>
      {children}
    </div>
  );
}
```

2. **Create test file**

```typescript
// src/components/MyComponent.test.tsx
import { render, screen } from "@testing-library/react";
import { MyComponent } from "./MyComponent";

describe("MyComponent", () => {
  it("renders children", () => {
    render(<MyComponent>Hello</MyComponent>);
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });
});
```

3. **Export from index**

```typescript
// src/components/index.ts
export { MyComponent } from "./MyComponent";
```

4. **Use in page**

```typescript
import { MyComponent } from "@/components";

export default function Page() {
  return <MyComponent>Content</MyComponent>;
}
```

### Component Best Practices

- Use TypeScript interfaces for props
- Write unit tests for each component
- Document complex components
- Keep components focused (single responsibility)
- Reuse existing components
- Follow naming conventions

## Page Development

### Creating a New Page

1. **Create page directory**

```bash
mkdir -p src/app/new-page
```

2. **Create page component**

```typescript
// src/app/new-page/page.tsx
export default function NewPage() {
  return (
    <main>
      <h1>New Page</h1>
    </main>
  );
}
```

3. **Create layout (if needed)**

```typescript
// src/app/new-page/layout.tsx
export default function Layout({ children }) {
  return <>{children}</>;
}
```

4. **Add metadata**

```typescript
// src/app/new-page/page.tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Title",
  description: "Page description",
};

export default function NewPage() {
  // ...
}
```

### Protected Pages

```typescript
// src/app/protected/page.tsx
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function ProtectedPage() {
  const session = await auth();

  if (!session) {
    redirect("/auth/signin");
  }

  return (
    <main>
      <h1>Welcome, {session.user.name}</h1>
    </main>
  );
}
```

## API Integration

### Using Custom Hooks

```typescript
"use client";

import { useCourses } from "@/hooks";

export default function CourseList() {
  const { data, loading, error } = useCourses({
    search: "JavaScript",
    limit: 10,
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <ul>
      {data?.courses.map((course) => (
        <li key={course.id}>{course.title}</li>
      ))}
    </ul>
  );
}
```

### Creating API Routes

```typescript
// src/app/api/custom/route.ts
export async function GET(request: Request) {
  try {
    const data = { message: "Hello World" };
    return Response.json(data);
  } catch (error) {
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
```

## Authentication

### Check User Session

```typescript
// Client component
"use client";
import { useSession } from "next-auth/react";

export default function Component() {
  const { data: session } = useSession();

  if (!session) return <div>Not signed in</div>;

  return <div>Welcome {session.user.email}</div>;
}
```

```typescript
// Server component
import { auth } from "@/lib/auth";

export default async function Component() {
  const session = await auth();

  if (!session) return <div>Not signed in</div>;

  return <div>Welcome {session.user.email}</div>;
}
```

## Styling

### Using Tailwind CSS

```typescript
export function MyComponent() {
  return (
    <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-6 hover:shadow-lg">
      <h2 className="text-lg font-bold text-slate-900">Title</h2>
      <button className="bg-primary-600 px-4 py-2 text-white hover:bg-primary-700">
        Action
      </button>
    </div>
  );
}
```

### Design Tokens

Use theme tokens from `src/lib/theme.ts`:

```typescript
import { colors, spacing, shadows } from "@/lib/theme";

// In CSS-in-JS or component props
const primaryColor = colors.primary[600];
const padding = spacing.md;
const boxShadow = shadows.lg;
```

## Testing

### Unit Tests

```bash
# Run tests
npm test

# Watch mode
npm test -- --watch

# Coverage
npm test -- --coverage
```

### Writing Tests

```typescript
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MyComponent } from "./MyComponent";

describe("MyComponent", () => {
  it("renders correctly", () => {
    render(<MyComponent>Test</MyComponent>);
    expect(screen.getByText("Test")).toBeInTheDocument();
  });

  it("handles click events", async () => {
    const user = userEvent.setup();
    render(<MyComponent>Click me</MyComponent>);

    await user.click(screen.getByRole("button"));

    // Assert something changed
  });
});
```

### E2E Tests

```bash
# Run E2E tests
npm run test:e2e

# Headed mode (see browser)
npm run test:e2e -- --headed
```

## Performance Optimization

### Image Optimization

```typescript
import Image from "next/image";

export function MyComponent() {
  return (
    <Image
      src="/course-image.jpg"
      alt="Course"
      width={600}
      height={400}
      priority // For above-the-fold images
    />
  );
}
```

### Code Splitting

Next.js automatically splits code per route. For dynamic imports:

```typescript
import dynamic from "next/dynamic";

const HeavyComponent = dynamic(() => import("./Heavy"), {
  loading: () => <div>Loading...</div>,
});
```

### Lazy Loading

```typescript
export function MyComponent() {
  return (
    <div className="space-y-8">
      <Section1 />
      <Suspense fallback={<div>Loading...</div>}>
        <Section2 />
      </Suspense>
    </div>
  );
}
```

## Accessibility

### Semantic HTML

```typescript
export function Course() {
  return (
    <article>
      <header>
        <h1>Course Title</h1>
      </header>
      <section>
        <p>Description</p>
      </section>
      <footer>
        <button>Enroll</button>
      </footer>
    </article>
  );
}
```

### ARIA Labels

```typescript
export function Button() {
  return (
    <button
      aria-label="Save course"
      aria-pressed={isSaved}
    >
      ❤️
    </button>
  );
}
```

### Keyboard Navigation

Always ensure:

- Tab navigation works
- Form submissions work with Enter
- Dialogs have trap focus
- Buttons are focusable

## Common Tasks

### Add a New Page

1. Create `src/app/my-page/page.tsx`
2. Add metadata
3. Build component
4. Test locally
5. Commit & push

### Update Component

1. Edit `src/components/MyComponent.tsx`
2. Update tests
3. Check all usages
4. Run lint & tests
5. Commit & push

### Fix a Bug

1. Create `fix/bug-name` branch
2. Locate bug
3. Write failing test
4. Fix the bug
5. Test passes
6. Commit & push

### Add a Feature

1. Create `feat/feature-name` branch
2. Design component/page
3. Write tests
4. Implement feature
5. Update documentation
6. Commit & push

## Useful Commands

```bash
# Development
npm run dev                 # Start dev server
npm run build              # Build for production
npm run start              # Start production server

# Quality
npm run lint               # Check code
npm run format             # Format code
npm run type-check         # TypeScript check

# Testing
npm test                   # Run tests
npm test -- --watch       # Watch mode
npm run test:e2e          # E2E tests

# Git
git status                 # Show changes
git diff                   # Show differences
git log --oneline -10      # Show recent commits
```

## Tips & Tricks

1. **Use TypeScript** - Catch errors early
2. **Write Tests** - Confidence in changes
3. **Follow Conventions** - Keep code consistent
4. **Ask for Help** - Code review is helpful
5. **Keep it Simple** - Don't over-engineer
6. **Document Code** - Help future developers
7. **Test Changes** - Before pushing
8. **Review Others** - Learn and help

## Resources

- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [NextAuth.js](https://next-auth.js.org)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

Happy coding! 🚀
