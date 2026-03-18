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

## Brand Style Guide — Text Contrast Rules

**NEVER use dark text on dark backgrounds.** Grey-on-black is unreadable and breaks the luxury aesthetic.

On dark backgrounds (`bg-cc-black-rich`, `bg-cc-charcoal`, etc.), use this text hierarchy:

| Role | Class | When to use |
|---|---|---|
| **Headings** | `text-cc-cream` or `text-cc-white` | All headings, titles |
| **Body / descriptions** | `text-cc-cream/80` | Paragraphs, descriptions, button labels |
| **Secondary body** | `text-cc-cream/70` | Less prominent descriptions, detail text |
| **Labels / specs / fine print** | `text-cc-cream/60` | Spec values, disclaimers, timestamps |
| **Decorative / helper** | `text-cc-cream/50` | "Drag to rotate", watermarks |
| **Accent text** | `text-cc-gold` or `text-cc-gold/70` | Prices, taglines, active states |

**Do NOT use:** `text-cc-steel`, `text-cc-silver`, `text-cc-graphite`, or `text-[#8A8A8A]` on dark backgrounds. These are effectively invisible.

## eCommerce Stack (Planned)

No pre-built eCommerce skills exist in the Claude ecosystem. These features will be built with Claude's general coding ability:

- **Payments**: Stripe (via `vercel:payments` skill for guidance)
- **Product catalog**: Next.js dynamic routes + database
- **Cart**: Client-side state management (Zustand already installed)
- **Auth**: TBD (Clerk via Vercel Marketplace is recommended)
- **Database**: Supabase or Neon Postgres
- **Email**: Resend for order confirmations
