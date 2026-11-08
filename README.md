# Axuraa website

Marketing site for Axuraa, built with Next.js (App Router) and CSS Modules.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

| Script              | What it does                    |
| ------------------- | ------------------------------- |
| `npm run dev`       | Start the dev server            |
| `npm run build`     | Production build                |
| `npm run start`     | Serve the production build      |
| `npm run lint`      | ESLint                          |
| `npm run typecheck` | TypeScript, no emit             |

## Configuration

Copy `.env.example` to `.env.local` to point the site at another backend:

```
NEXT_PUBLIC_API_URL=https://back-end-axuraa.fly.dev/api/v1
```

## Project layout

- `app/` — routes. Everything localized lives under `app/[locale]/`; the `[locale]`
  layout rejects unsupported locales with a 404.
- `service/` — API calls. All requests go through `service/api/http.ts`
  (timeout, Next.js data cache with `revalidate`, uniform errors). Endpoints live in
  `service/api/APIs.ts`.
- `lib/i18n.ts` — supported locales and `localize()` for fields the API returns either
  as strings or as `{ en, ar }` objects.
- `lib/site.ts` — fallback contact details and social links.
- `public/locales/<locale>/*.json` — UI translations used by `hooks/useClientTranslation`.

## Adding Arabic

1. Add `public/locales/ar/*.json`.
2. Import them in `hooks/useClientTranslation.ts`.
3. Add `"ar"` to `SUPPORTED_LOCALES` in `lib/i18n.ts` (this also shows the language button).
4. Set `dir="rtl"` / `lang` for Arabic pages.
