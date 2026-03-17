# Coleman Collection Watches

Luxury showcase website for Coleman Collection Watches — *"For The Moments That Define Us."*

Built with Next.js 16, React Three Fiber, GSAP, Framer Motion, and Tailwind CSS v4.

## Changelog

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
