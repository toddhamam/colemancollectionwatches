# Coleman Collection Watches

Luxury showcase website for Coleman Collection Watches — *"For The Moments That Define Us."*

Built with Next.js 16, React Three Fiber, GSAP, Framer Motion, and Tailwind CSS v4.

## Changelog

### v0.2.0 — Real Testimonials & Dedicated Reviews Page

**Testimonials**
- Imported 27 verified customer reviews from product database (Loox CSV + image screenshots)
- Curated 12 featured reviews for homepage carousel with customer photos, locations, and product variants
- Homepage testimonial section now shows real reviews with auto-advance, prev/next arrows, and dot navigation

**Reviews Page**
- New `/reviews` page with full masonry grid of all testimonials
- Filter tabs by product variant (All, Black & Black, Open-Heart variants)
- Each card: customer photo or gold initial avatar, star rating, verified badge, review text, product tag
- Framer Motion scroll-triggered entrance animations
- "Reviews" link added to site navigation

**Assets**
- Added customer testimonial photos and review screenshots

### v0.1.0 — Luxury Homepage with Scroll-Driven Watch Deconstruction

**Design System**
- Black + gold luxury color palette with custom Tailwind v4 theme tokens
- Typography: Playfair Display (headings), Inter (body), JetBrains Mono (specs)
- Reusable UI components: Button, SectionHeading, GoldDivider, RevealOnScroll

**Hero + Scroll Deconstruction**
- Full-viewport hero with animated title text over the watch product image
- 121-frame scroll-driven deconstruction animation: the watch disassembles into its components as the user scrolls, revealing sapphire crystal, open-heart dial, Miyota movement, and exhibition caseback
- Feature cards appear at scroll milestones describing each component
- Cinematic bottom fade and vignette overlays

**Homepage Sections**
- Philosophy: brand story with gold divider accents
- Lifestyle: product photography grid
- Collection Preview: watch cards with hover effects
- Craftsmanship: animated spec counters (power reserve, water resistance, jewel count)
- Testimonials: rotating quote carousel
- CTA: waitlist + Instagram links

**3D Watch Viewer**
- Procedural Three.js watch with gold metallic materials (placeholder for future GLB models)
- Studio lighting rig and orbit controls

**Layout**
- Fixed navigation with scroll-aware transparency
- Minimal dark footer with social links
- Responsive across mobile, tablet, and desktop

**Tooling**
- Kling AI video generation script for creating watch rotation/deconstruction assets
- GSAP ScrollTrigger provider with proper cleanup
- Regenerated clean package-lock.json (fixed stale scaffold entries)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Asset Generation

To generate watch videos via the Kling AI API:

```bash
# Set KLING_ACCESS_KEY and KLING_SECRET_KEY in .env.local
node scripts/generate-watch-videos.mjs
```

## Deploy

Deployed on Vercel at [colemancollectionwatches.com](https://colemancollectionwatches.com).
