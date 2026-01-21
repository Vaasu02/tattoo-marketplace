# Tattoo Marketplace MVP

A full-stack tattoo marketplace MVP built with Next.js, Supabase, and shadcn/ui. This project demonstrates end-to-end feature development with artist listings, profile pages, and booking functionality.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Database:** Supabase (PostgreSQL)
- **UI Components:** shadcn/ui + Tailwind CSS
- **Forms:** React Hook Form + Zod
- **Image Optimization:** Next.js Image component
- **Deployment:** Vercel

## Features

- **Artist Listings Page** - Browse all available tattoo artists
- **Artist Profile Pages** - View detailed artist profiles with portfolio galleries
- **Booking Request Form** - Submit booking requests with validation
- **Image Optimization** - Automatic image optimization using Next.js Image
- **Responsive Design** - Works seamlessly on mobile and desktop
- **Professional UI** - Clean, modern design using shadcn/ui components

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Vaasu02/tattoo-marketplace.git
cd tattoo-mvp
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Set Up Supabase

1. Create a new project at [Supabase](https://app.supabase.com)
2. Go to Project Settings → API
3. Copy your Project URL and anon/public key

### 4. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 5. Set Up Database

1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Run the migration file: `supabase/migrations/001_initial.sql`
   - This creates the `artists` and `bookings` tables
   - Sets up Row Level Security (RLS) policies

### 6. Seed the Database

Run the seed script to populate sample artist data:

```bash
npm run seed
# or
npx tsx lib/seed.ts
```

Alternatively, you can manually insert artists through the Supabase dashboard.

### 7. Run the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.


## Database Schema

### Artists Table
- `id` (UUID) - Primary key
- `name` (VARCHAR) - Artist name
- `bio` (TEXT) - Artist biography
- `portfolio` (JSONB) - Array of image URLs
- `location` (VARCHAR) - Artist location
- `specialties` (TEXT[]) - Array of specialties
- `created_at`, `updated_at` - Timestamps

### Bookings Table
- `id` (UUID) - Primary key
- `artist_id` (UUID) - Foreign key to artists
- `name` (VARCHAR) - Customer name
- `contact` (VARCHAR) - Phone number
- `preferred_date` (DATE) - Preferred booking date
- `preferred_time` (TIME) - Preferred booking time
- `message` (TEXT) - Optional message
- `status` (VARCHAR) - Booking status (pending/confirmed/cancelled)
- `created_at`, `updated_at` - Timestamps

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository in [Vercel](https://vercel.com)
3. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy!

Vercel will automatically:
- Detect Next.js
- Install dependencies
- Build and deploy your application

### Environment Variables in Vercel

Go to your project settings → Environment Variables and add:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Live App URL

- **App URL:** https://tattoomarketplace.vercel.app  
  This single Next.js app serves both the **frontend UI** and the **backend API routes** (bookings API).

## Key Implementation Choices

### Why Next.js App Router?
- Server Components for efficient data fetching
- Built-in API routes for backend functionality
- Automatic code splitting and optimization
- Seamless deployment to Vercel

### Why Supabase?
- Fast setup with managed PostgreSQL
- Built-in Row Level Security (RLS)
- Real-time capabilities (if needed later)
- Generous free tier

### Why shadcn/ui?
- Professional, accessible components
- Customizable design system
- Copy-paste component model
- Built on Radix UI primitives

### Image Optimization
- All images use Next.js `next/image` component
- Automatic WebP conversion
- Lazy loading for below-fold images
- Responsive image sizing
- Configured remote patterns for Unsplash images

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Shortcuts & Tradeoffs

- **Seed Data:** Used seed data instead of image upload for faster MVP development
- **Simple Validation:** Basic phone validation (can be enhanced)
- **No Auth:** Simple phone number collection as per requirements (no OAuth, JWT, or complex auth flows - just a phone number field)
- **Focused Scope:** Core booking flow prioritized over edge cases

## AI Tools Usage

- **Code Generation:** Used AI to generate boilerplate code, components, and API routes
- **Type Definitions:** AI-assisted TypeScript type definitions and interfaces
- **Documentation:** AI helped structure and write comprehensive README

**Impact:** Significantly reduced development time from ~12 hours to ~8-10 hours, allowing more focus on:
- UX polish and design details
- Testing and edge cases
- Documentation quality
- Adding bonus features (search/filter)

## Testing & Quality

### Linting
- ESLint configured with Next.js defaults
- Run `npm run lint` to check code quality
- No linting errors in the codebase

### Testing Notes
- Manual testing performed on all core flows:
  - Artist listings display correctly
  - Artist profile pages load with portfolio
  - Booking form validates and submits
  - Database persistence verified
  - Responsive design tested on multiple screen sizes
- **Future Enhancement:** Could add Jest/Vitest for unit tests and Playwright for E2E tests

- **Current:** Manual deployment via Vercel

## Assignment Q&A

### Why do you want to join an early-stage startup?

I enjoy working close to the problem and the users, where decisions are fast and I can see the impact of my work quickly. Early-stage teams give more ownership across the stack product, design, and engineering  which matches how I like to work. I’m motivated by building 0→1 products, iterating from real feedback, and taking responsibility end to end rather than just shipping isolated tickets.

### Describe the craziest project you built single-handedly (what, impact, tech, outcome).

I built a full-stack project where I owned everything from database design to deployment and UX. It had realtime interactions and a fairly complex UI, which forced me to make pragmatic tradeoffs (performance vs complexity, DX vs UX) and learn quickly across the stack. The end result was a production-ready tool that significantly reduced manual work for its users and taught me how to slice big ideas into shippable pieces while keeping code quality and design standards high. You can see the deployed project here: `https://managestaging.foyr.com/`.

### Why do you want to join Inksesh specifically?

Inksesh is solving a trust-heavy problem: helping people discover artists and get their first tattoos with confidence and great experience. I like that you care deeply about UX and are building a profitable, bootstrapped business instead of chasing hype. The focus on design as the product, the builder culture, and the modern stack (Next.js, Cloudflare, etc.) match how I already like to work, and I’d be excited to help take the product from -1 → 1 and iterate quickly with you.

### What would you add to this project next if given 2 weeks?

First, I’d deepen discovery: stronger search and filters (by style, city, budget) and richer artist pages (pricing hints, FAQs, healed work). Next, I’d add a lightweight artist/studio dashboard to manage bookings and availability, plus basic notifications (email/WhatsApp) for confirmations. Finally, I’d add image uploads backed by storage, simple reviews/ratings, and basic analytics to understand where users drop off in the discovery → booking funnel.
