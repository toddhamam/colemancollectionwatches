# Coleman Collection Watches — Claude Code Context

Luxury watch eCommerce website. Black + gold aesthetic. Next.js 16 + Tailwind CSS v4 + React Three Fiber + GSAP + Framer Motion.

Deployed on Vercel at [colemancollectionwatches.com](https://colemancollectionwatches.com).

## Installed Claude Code Plugins

These plugins are installed at user scope and available in every session. Use them proactively.

### Core Development

| Plugin | Source | What It Does |
|---|---|---|
| **frontend-design** | `claude-code-plugins` | Generates luxury-grade UI with bold typography, color, and animation. Avoids generic "AI slop" aesthetics. Auto-activates on frontend work. |
| **feature-dev** | `claude-code-plugins` | Structures complex feature builds into phases: explore codebase, architect, implement, review. Invoke with `/feature-dev:feature-dev`. |
| **commit-commands** | `claude-code-plugins` | Git workflow automation. `/commit-commands:commit` to commit, `/commit-commands:commit-push-pr` to commit + push + open PR. |

### Quality & Security

| Plugin | Source | What It Does |
|---|---|---|
| **security-guidance** | `claude-code-plugins` | Warns on code edits that introduce XSS, command injection, or unsafe patterns. Critical for payment-related code. Runs automatically via hook. |
| **code-review** | `claude-code-plugins` | Runs 5 parallel agents to review PRs for bugs, style, and historical context. Invoke with `/code-review:code-review`. |
| **pr-review-toolkit** | `claude-code-plugins` | Specialized agents for silent failure hunting, type design analysis, test coverage, and code simplification. Invoke with `/pr-review-toolkit:review-pr`. |

### Infrastructure & Deployment

| Plugin | Source | What It Does |
|---|---|---|
| **vercel** | `claude-plugins-official` | Deploy, manage env vars, check deployment status. Includes skills for Next.js, AI SDK, Stripe payments, Supabase, and more. |
| **supabase** | `claude-plugins-official` | Direct access to Supabase project for database, auth, and storage management. |
| **sentry** | `claude-plugins-official` | Find, diagnose, and fix production errors from Sentry. |
| **github** | `claude-plugins-official` | Interact with GitHub issues, PRs, and repos via MCP. |

## Key Vercel Skills (from vercel plugin)

These are auto-injected by the Vercel plugin when relevant files are edited. The most important ones for this project:

| Skill | When To Use |
|---|---|
| `vercel:payments` | Stripe integration — checkout sessions, webhooks, subscriptions |
| `vercel:nextjs` | Next.js App Router patterns, Server Components, Server Actions |
| `vercel:shadcn` | shadcn/ui component library — CLI, theming, composition |
| `vercel:ai-sdk` | AI-powered features if needed |
| `vercel:vercel-storage` | Blob, Edge Config, Neon Postgres, Upstash Redis |
| `vercel:auth` | Authentication with Clerk, Descope, or Auth0 |
| `vercel:email` | Transactional email with Resend |
| `vercel:deploy` | Deploy to Vercel from CLI |
| `vercel:env` | Manage environment variables |
| `vercel:vercel-firewall` | DDoS, WAF, rate limiting, bot protection |
| `vercel:observability` | Analytics, Speed Insights, logging |

## Brand Style Guide

### ABSOLUTE RULE: No Grey Text On Dark Backgrounds

**NEVER use grey, steel, silver, or any dark-toned text on dark/black backgrounds. This is a hard rule with zero exceptions.**

The entire site uses dark backgrounds. Every piece of text must be clearly visible and easy to read. Grey text on a black background is nearly invisible, looks cheap, and directly undermines the luxury brand.

### Banned Text Colors (never use for text on dark backgrounds)

| Color | Class / Hex | Why it's banned |
|---|---|---|
| Steel | `text-cc-steel` / `#4A4A4A` | Completely invisible on dark backgrounds |
| Silver | `text-cc-silver` / `#8A8A8A` | Too dim to read, looks washed out |
| Graphite | `text-cc-graphite` / `#2A2A2A` | Even darker than steel — invisible |
| Arbitrary greys | `text-[#666...]`, `text-[#777...]`, `text-[#888...]`, `text-[#999...]`, `text-[#A0A0A0]` | All hard to read |
| Tailwind greys | `text-gray-*`, `text-zinc-*`, `text-neutral-*`, `text-slate-*`, `text-stone-*` | Not part of the design system |

**`cc-steel` and `cc-graphite` may still be used for borders and backgrounds** (e.g., `border-cc-steel`, `bg-cc-graphite`), but **never for text**.

### Required Text Hierarchy (dark backgrounds)

Every piece of text on the site must use one of these:

| Role | Class | When to use |
|---|---|---|
| **Headings** | `text-cc-cream`, `text-cc-white`, or `text-[#FAFAF7]` | All headings, titles, hero text |
| **Body / descriptions** | `text-cc-cream/80` | Paragraphs, descriptions, card body text |
| **Secondary body** | `text-cc-cream/70` | Supporting descriptions, less prominent detail text |
| **Labels / specs / fine print** | `text-cc-cream/60` | Spec values, disclaimers, timestamps, counters, locations |
| **Minimum visibility** | `text-cc-cream/50` | Absolute minimum — only for decorative helper text like "Drag to rotate" |
| **Accent text** | `text-cc-gold` or `text-cc-gold/70` | Prices, taglines, subtitles, active nav states, verified badges |

### Interactive Elements

| Element | Default | Hover | Active |
|---|---|---|---|
| Nav links | `text-cc-cream/80` | `text-cc-gold` | `text-cc-gold` |
| Carousel arrows | `text-cc-cream/50` | `text-cc-gold` | — |
| Carousel dots (inactive) | `bg-cc-cream/30` | `bg-cc-cream/50` | — |
| Carousel dots (active) | `bg-cc-gold` | — | — |
| Filter tabs (inactive) | `text-cc-cream/70` | `text-cc-cream` | — |
| Filter tabs (active) | `text-cc-gold` | — | — |
| Unfilled star ratings | `text-cc-cream/30` | — | — |

### Quick Self-Check

Before committing any UI change, verify:
1. Can you read every piece of text at arm's length on a dark screen?
2. Is there any grey, silver, or steel text color used for text elements?
3. Does the smallest text on the page use at least `text-cc-cream/50`?

If any answer is no, fix it before committing.

## eCommerce Stack (Planned)

No pre-built eCommerce skills exist in the Claude ecosystem. These features will be built with Claude's general coding ability:

- **Payments**: Stripe (via `vercel:payments` skill for guidance)
- **Product catalog**: Next.js dynamic routes + database
- **Cart**: Client-side state management (Zustand already installed)
- **Auth**: TBD (Clerk via Vercel Marketplace is recommended)
- **Database**: Supabase or Neon Postgres
- **Email**: Resend for order confirmations
