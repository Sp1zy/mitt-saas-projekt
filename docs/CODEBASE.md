# ApexDesk codebase guide

Read this before changing anything. It describes what exists today, how it
fits together, and the rough edges you will run into.

## What this is

A single-page marketing site for "ApexDesk", a productized dev-agency
subscription (48-hour sprints, pause/cancel plans). It has a landing page,
two legal pages, a Supabase-backed login, and a client dashboard that
currently renders placeholder data. There is no backend of our own; auth
goes through Supabase. Dashboard data is not persisted yet.

## Stack

| Concern | Choice | Notes |
| --- | --- | --- |
| UI | React 19 (JSX, no TypeScript) | Files are `.jsx` |
| Build | Vite 8 with `@vitejs/plugin-react` | `vite.config.js`, `base: '/'` |
| Styling | Tailwind CSS v4 via `@tailwindcss/vite` | Single `@import "tailwindcss"` in `src/index.css` |
| Lint | oxlint (`.oxlintrc.json`) | `npm run lint` calls `eslint`, which is not installed (see Rough edges) |
| Hosting | Vercel (`vercel.json` SPA rewrite) and gh-pages (`deploy` script) | Two targets, see Deployment |
| Routing | `react-router` 7 | `BrowserRouter`, route table in `App.jsx` |
| Auth/Data | `@supabase/supabase-js` 2.x | Email + password auth via `src/auth/` |

No tests. No CI config in the repo.

## Scripts

```
npm run dev       # Vite dev server
npm run build     # outputs to dist/
npm run preview   # serve dist/ locally
npm run lint      # broken: calls eslint, only oxlint is installed
npm run deploy    # runs build, then pushes dist/ to gh-pages branch
```

## File map

```
index.html                    Vite entry, mounts #root, loads src/main.jsx
vite.config.js                react + tailwind plugins, base '/'
vercel.json                   rewrite /(.*) -> /index.html (SPA fallback, required by BrowserRouter)
.oxlintrc.json                react rules-of-hooks, only-export-components
.env.local                    VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY (untracked)
public/favicon.svg            used by index.html
public/icons.svg              not referenced anywhere
src/main.jsx                  createRoot > StrictMode > BrowserRouter > AuthProvider > App
src/App.jsx                   route table only
src/constants.js              STRIPE_PORTAL_URL
src/index.css                 @import "tailwindcss" (one line)
src/App.css                   Vite template leftovers, not imported by anything
src/DevPortfolio.jsx          engineer cards with all/ai/fullstack filter (belongs in components/)
src/auth/validation.js        pure field validators: email, password rules, confirmation, website
src/auth/userMetadata.js      profile <-> Supabase user_metadata mapping, getDisplayName
src/data/onboardingOptions.js company size, primary need, plan interest option lists
src/data/requestStatus.js     REQUEST_STATUS enum, labels, isRequestEditable (queued only)
src/data/requestsRepository.js Supabase calls for the requests table: list, create, update, delete
src/data/useRequests.js       hook: requests, isLoading, errorMessage, addRequest, editRequest, removeRequest
src/data/requestActivity.js   derives the Recent Activity feed from request status and updated_at
src/data/formatDate.js        en-US short date formatter, safe for bare YYYY-MM-DD values
src/data/sampleSubscription.js placeholder plan card data until Stripe billing sync exists
supabase/migrations/          SQL migrations; 20260910120000 creates requests table, RLS policies, updated_at trigger
src/auth/supabase.js          createClient from env vars, throws if missing
src/auth/AuthProvider.jsx     context + useAuth(): session, user, isAuthenticated, isLoading, authError, signIn, signUp({ email, password, profile }), signOut
src/auth/ProtectedRoute.jsx   layout route: spinner while loading, redirect to /login, else <Outlet/>
src/pages/LandingPage.jsx     marketing page, all sections inline (27 KB)
src/pages/TermsPage.jsx
src/pages/PrivacyPage.jsx
src/pages/LoginPage.jsx       LoginForm, or redirect to returnTo / dashboard when signed in
src/pages/SignupPage.jsx      SignupForm, confirm-email notice after signUp without session
src/pages/DashboardPage.jsx   composes components/dashboard/*, owns local request state
src/components/SiteHeader.jsx     sticky logo header with a right-hand slot (login, signup, dashboard)
src/components/formStyles.js      shared input, label, primary and secondary button class strings
src/components/LoadingScreen.jsx
src/components/LoginForm.jsx
src/components/FormErrorBanner.jsx  red banner for server-side errors (auth, requests)
src/components/Spinner.jsx        small and large spin loader
src/components/SubmitButton.jsx   submit button that shows a spinner and busy label while submitting
src/components/fields/            TextField, TextAreaField, SelectField, PasswordField (eye toggle),
                                  FieldLabel, FieldErrorMessage, PasswordRequirements checklist
src/components/SignupForm.jsx     two steps: account (email, password) then company profile; onSignup({ email, password, profile })
src/components/dashboard/     PlanSummaryCard, StatTile, RequestStats, RequestList (inline edit, remove), RequestForm,
                              StatusBadge, NewRequestForm, ActivityFeed
src/data/sampleDashboard.js   placeholder subscription, requests, activity (replace with Supabase queries)
src/assets/                   hero.png, react.svg, vite.svg, all unused
dist/                         committed build output (stale, see Rough edges)
```

Folder rules:
- `pages/`: one file per URL. Owns the page frame. Never imports another page.
- `components/`: no page frame, no routing. Props in, markup out.
- `auth/`: Supabase client, session context, route guard. No page markup.
- `data/`: static placeholder data until real queries exist.

## Runtime flow

1. `index.html` loads `src/main.jsx`.
2. `main.jsx` renders `App` inside `BrowserRouter` and `AuthProvider`.
3. `AuthProvider` calls `supabase.auth.getSession()` once and subscribes to
   `onAuthStateChange`. Until the first result, `isLoading` is true.
4. `App` is a `<Routes>` table:

| Path | Page | Guard |
| --- | --- | --- |
| `/` | LandingPage | none |
| `/terms` | TermsPage | none |
| `/privacy` | PrivacyPage | none |
| `/login` | LoginPage | redirects to dashboard if already signed in |
| `/signup` | SignupPage | same redirect; shows confirm-email notice when Supabase requires it |
| `/dashboard` | DashboardPage | `ProtectedRoute`, redirects to `/login` |
| `*` | redirect to `/` | |

Login flow: "Client Login" links to `/dashboard`. `ProtectedRoute` sends an
anonymous visitor to `/login` with `state.returnTo`. `LoginForm` calls
`signIn`, Supabase fires `onAuthStateChange`, `LoginPage` sees
`isAuthenticated` and navigates to `returnTo`. Log Out calls `signOut` and
navigates to `/`.

Deep links work in dev (Vite fallback) and on Vercel (`vercel.json`
rewrite). They do not work on GitHub Pages.

### LandingPage.jsx sections (in render order)

Numbered comments in the file mark each block:

1. Navigation bar. Logo is a `Link` to `/`. "Client Login" is a `Link` to
   `/dashboard`.
2. Hero. CTA links to `#pricing` and an external Calendly URL.
3. Value propositions.
4. How it works.
4.5. Portfolio showcase. Renders `<DevPortfolioGrid />`.
5. Pricing. Three cards, each with an external Revolut checkout link.
6. FAQ. Accordion driven by `openFaq` state (index or null).
7. Footer. `Link`s to `/terms` and `/privacy`. "Manage Subscription" links
   to the Stripe billing portal.

### Pricing and payment links

| Card | Price | Checkout |
| --- | --- | --- |
| 2-Week Sprint Pass | $1,490 one-time | Revolut checkout link |
| Monthly Standard | $2,490 /mo | Revolut checkout link |
| Monthly Pro | $3,990 /mo | Revolut checkout link |

Subscription management goes to a Stripe customer portal URL, held in
`src/constants.js`. So purchase is
Revolut, management is Stripe. There is no webhook or server side to either.

### DevPortfolio.jsx

`ENGINEERS` is a hard-coded array of two objects: `id`, `name`, `initial`,
`role`, `category` (`'ai'` or `'fullstack'`), `availability`, `stack[]`,
`deliverables[]`. Component state is `filter` (`'all' | 'ai' | 'fullstack'`).
Adding an engineer means editing the array.

### TermsPage.jsx and PrivacyPage.jsx

Hard-coded text, "Last updated: August 2026". The header with logo and
back link is duplicated between the two files.

### DashboardPage.jsx

Reads `user` and `signOut` from `useAuth`. Holds `subscription` and
`requests` in local state seeded from `data/sampleDashboard.js`. Pause
toggle and new-request form mutate that state only; nothing persists.
Stat tiles derive from the request list. This is where Supabase table
queries go next.

## Environment variables

`.env.local` defines:

```
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
```

Vite only exposes variables prefixed `VITE_` to client code, via
`import.meta.env.VITE_*`. Only `src/auth/supabase.js` reads them. The anon key is a
public client key by Supabase's design, but the file should still stay out
of git.

## Deployment

Two paths exist side by side:

- Vercel: builds from the repo, serves `dist/`, uses `vercel.json` to
  rewrite all paths to `index.html`. `base: '/'` in Vite matches this.
- GitHub Pages: `npm run deploy` pushes `dist/` to a `gh-pages` branch. The
  commit history shows base-path fixes for Pages, then a switch to `/` for
  Vercel. The Pages target would need a repo-name base path to work again.

Remote: `github.com/Sp1zy/mitt-saas-projekt`.

## Rough edges (not fixed, listed for you to pick from)

1. `.env.local` and `.code-review-graph/` are now in `.gitignore`.
2. `dist/` is committed and now stale relative to source. Vercel builds its
   own; untrack it.
3. `npm run lint` runs `eslint`, which is not a dependency. Only `oxlint`
   is installed. The config file is oxlint's.
4. Dead files: `src/App.css`, `src/assets/*`, `public/icons.svg`. Dead
   devDependencies: `autoprefixer`, `postcss`.
5. `npm run deploy` (gh-pages) no longer works with `BrowserRouter` and
   `base: '/'`. Drop the script or accept Vercel only.
6. Dashboard data is placeholder. No Supabase tables exist yet.
7. Two payment providers with no backend: Revolut for checkout, Stripe for
   portal. Nothing links a purchase to a Supabase user.
8. The Calendly link hard-codes `?month=2026-09`.
9. Duplicated markup: legal page header in two files, three near-identical
   pricing cards in `LandingPage.jsx`.
10. `LandingPage.jsx` is 27 KB in one component. Sections could be split
    into `components/landing/`. `DevPortfolio.jsx` still sits at `src/` root.
11. No tests, no CI.

## Knowledge graph

The code-review-graph MCP index was built on 2026-09-10. Rebuild after this
branch's restructure to refresh it. It updates on file changes via
hooks. Use it for callers/dependents queries before grepping.
