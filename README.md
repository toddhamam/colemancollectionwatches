# Coleman Collection Watches

Luxury showcase website for Coleman Collection Watches — *"For The Moments That Define Us."*

Built with Next.js 16, React Three Fiber, GSAP, Framer Motion, and Tailwind CSS v4.

## Changelog

### v0.5.0 — SEO/GEO-Optimized Journal Section & Navigation Updates

**Journal Section (`/journal`)**
- New MDX-based content section with 5 seed articles covering horology, style, craftsmanship, and buying guides
- Listing page with featured article hero, 3-column card grid, and category filter tabs (All, Horology, Style, Craftsmanship, Guides)
- Individual article pages with hero image, sticky table of contents sidebar, FAQ accordion, related articles grid, and "Build Your Timepiece" CTA
- Category pages at `/journal/category/[category]` for filtered browsing
- Content loaded from `content/journal/*.mdx` via `gray-matter` + `reading-time` + `next-mdx-remote/rsc`

**SEO Infrastructure**
- `robots.ts` allowing all crawlers with sitemap reference
- `sitemap.ts` dynamically generating URLs for all pages including journal articles and categories
- Root layout metadata upgrade with `metadataBase`, Open Graph defaults, Twitter card defaults
- JSON-LD structured data on every article: `Article` + `FAQPage` + `BreadcrumbList` schemas
- Organization JSON-LD in root layout

**GEO Optimizations (AI Search Discoverability)**
- `public/llms.txt` machine-readable site summary following the llmstxt.org standard
- FAQ sections on every article with structured Q&A (heavily weighted by AI search engines)
- Citation-magnet lead paragraphs with specific facts and numbers
- Comparison tables in markdown for AI-parseable structured data
- Internal linking clusters between articles for topical authority

**Seed Content (5 Articles)**
1. "The Art of Automatic Movement" — why mechanical watches matter (featured hero)
2. "Miyota vs Sellita" — movement comparison with spec tables
3. "How to Style a Luxury Watch" — occasion-based styling guide
4. "Crafting a Coleman Collection Timepiece" — materials deep-dive
5. "Guide to Watch Water Resistance Ratings" — ATM/bar ratings explained

**Navigation Updates**
- Removed "Collection" from header and footer nav
- Removed "Contact" from header nav (kept in footer)
- Reordered header nav: Build | Craftsmanship | Reviews | Story | Journal

### v0.4.1 — Fix Grey Text Contrast & Product Card Updates

**Text Contrast Overhaul**
- Replaced all grey/steel/silver text (`text-cc-silver`, `text-cc-steel`, `text-[#8A8A8A]`, `text-[#4A4A4A]`, `text-[#A0A0A0]`) with cream/white opacity variants across 13 files
- Navigation links: `text-cc-silver` → `text-cc-cream/80`
- Footer links, Instagram, copyright: silver/steel → `text-cc-cream/80` and `text-cc-cream/60`
- All section body text (Hero, Philosophy, Craftsmanship, CTA, Deconstruction, Collection): `text-[#8A8A8A]` → `text-cc-cream/80`
- Testimonial section: carousel dots, arrows, counter, review count, locations all upgraded from steel/silver to cream variants
- Reviews page: star ratings, filter tabs, count badges, location text, product tags, empty state all fixed
- Configurator step progress: tooltip hover text upgraded from silver to cream
- SectionHeading component: description text upgraded globally

**Brand Style Guide (CLAUDE.md)**
- Expanded from basic contrast rules to comprehensive Brand Style Guide
- Added banned text colors table with specific classes and hex values
- Added required text hierarchy with exact Tailwind classes for each role
- Added interactive elements table (nav links, carousel dots, filter tabs, star ratings)
- Added quick self-check checklist for UI changes

**Product Card Updates**
- Renamed watch models: "The Noir" → "The Open-Heart Noir", "The Blanc" → "The Open-Heart Blanc"
- Price display changed from "$495" to "From $495"
- CTA button changed from "Explore" to "Build Yours"

### v0.4.0 — "Build Your Timepiece" Watch Configurator

**Custom Watch Builder**
- New `/build` route with full multi-step watch configurator inspired by luxury car configurators (Rolls-Royce, Range Rover)
- 5-step flow: Model → Movement → Dial → Strap → Summary
- Step progress bar with clickable navigation and running price display
- Zustand state management for configuration selections and price calculation

**Product Image Preview**
- Replaced procedural 3D watch model with real product photography in the configurator preview
- Context-aware images: each step shows the most relevant product photo (hero shot, caseback, dial close-up, strap detail, lifestyle)
- Smooth crossfade transitions between images using Framer Motion
- Dial step swaps between black-dial and white-dial product shots based on selection

**Configuration Options**
- 3 models: The Sovereign, The Sovereign Black (PVD), The Sovereign Rose
- 4 movements: Miyota 9039, Miyota 82S0, Sellita SW200-1, Sellita SW300-1
- 5 dial colours: Obsidian Black, Pearl White, Midnight Blue, Racing Green, Champagne
- 5 strap options: Black Leather, Saddle Brown, Cognac Tan, Steel Bracelet, Vulcanised Rubber
- Dynamic price calculation from $495 base with per-option deltas

**UI/UX Polish**
- All text uses cream/white on dark backgrounds for readability (brand style guide enforced)
- Increased text sizes across all option cards for better legibility
- Back button added to Summary step for easy navigation without restarting
- "Build Yours" CTA replaces "Shop" in site navigation and homepage

**Site Architecture**
- Route groups: `(site)` for homepage/reviews, `(configurator)` for the build flow
- Root layout simplified — Navigation/Footer moved to site layout so configurator has its own chrome
- 3D watch model (ConfigurableWatch.tsx) retained for future use with custom 3D renders

**Brand Style Guide**
- Added text contrast rules to CLAUDE.md: never use grey/steel/silver text on dark backgrounds
- Established hierarchy: cream (headings) → cream/80 (body) → cream/70 (secondary) → cream/60 (labels) → gold (accent)

### v0.3.1 — Fix Scroll Jitter by Removing Annotation Lines & Backdrop Blur

**Scroll Performance**
- Removed SVG annotation lines (Bezier curve paths + endpoint markers) — the 1.5s stroke-dashoffset CSS transitions were causing continuous repaints during scroll, making the deconstruction animation laggy and jittery on production
- Removed `backdrop-blur-md` from feature cards — backdrop blur forces expensive Gaussian blur compositing on every scroll frame
- Replaced `transition-all duration-700` with targeted `opacity 0.3s, transform 0.3s` on feature cards for tighter, GPU-friendly transitions
- Added `will-change: opacity, transform` to promote animated cards to their own compositor layers
- Removed viewport resize state tracking (`vw`/`vh`) and `useMemo` for line path calculation — no longer needed without annotation lines
- Feature cards still appear at scroll milestones with slide-in animation, just without connector lines

### v0.3.0 — Spliced Deconstruction, Annotation Lines & Scroll Performance

**Spliced Deconstruction Sequence**
- Combined best-of-both deconstruction videos: frames 1-90 from new 1080p source (sharp exploded view), frames 91-121 from original video (elegant caseback-in-hand reveal with "Coleman Collection" branding)
- Old frames upscaled from 1088x844 to 1632x1268 via lanczos filter for seamless resolution match
- Removed raw .mp4 source videos from repo to reduce bundle size

**Animated Annotation Lines**
- Golden SVG bezier curves draw from each feature card toward the corresponding watch component during scroll
- Lines animate in with a 1.5s stroke-dashoffset draw effect and smooth cubic-bezier easing
- Endpoint markers: gold dot with outer ring, fade in after the line finishes drawing
- Annotation lines visible on desktop (lg+), hidden on mobile for clean layout

**Enhanced Feature Cards**
- More prominent styling: increased padding, larger title text, stronger backdrop blur
- Gold accent border on the inner edge (facing center) connecting visually to the annotation line
- Numbered labels (01–04) in gold monospace for technical blueprint aesthetic

**Scroll Performance Fix**
- Eliminated React state (`setProgress`) from the scroll path — all scroll-driven updates now use direct DOM manipulation via refs
- Zero React re-renders during scroll; component only re-renders on window resize
- Fixed scroll indicator entrance delay being bypassed by `applyProgress` on mount

### v0.2.1 — Upgrade Deconstruction to 1080p

- Re-extracted 121 scroll animation frames from higher resolution (1632x1268) Kling AI generation
- Noticeably sharper detail on movement components, sapphire crystal, and crown during deconstruction scroll

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

## AI Development Setup

See [CLAUDE.md](./CLAUDE.md) for installed Claude Code plugins, available skills, and the planned eCommerce stack.

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
