# InternTrack — Daily Internship Aggregator (MVP)

A single-page prototype that tests one question: **is a single-source
internship aggregator valuable enough that people would want more sources added?**

It shows a searchable, sortable table of internship postings (company, title,
posted date, link) with a **Save** button and **"new since last visit"**
highlighting — the core loop of "log in, browse live postings, save a few,
come back tomorrow to see new ones."

## What was built

- **Live-feel postings table** — mocked postings from a single source
  (RemoteOK-style) filtered by the keyword `intern`.
- **Search** — filter by company or title instantly.
- **Sort** — by newest/oldest, company A–Z, or title A–Z (dropdown or click column headers).
- **Save** — star a posting; saved items persist in `localStorage`
  (a stand-in for the per-user Supabase table + email/password auth).
- **New-entry highlighting** — the **Refresh feed** button simulates the
  daily Vercel Cron → Supabase Edge Function refresh: it marks the current
  batch as "seen," pulls in a fresh batch, and lights the new postings up
  with a yellow **NEW** pill (and a "New since last visit" tab).

> This is a front-end-only concept test. Real data calls, Supabase auth,
> and the actual cron job are mocked/simulated inline so the core
> interaction is tangible with zero setup.

## How to run

Just open `index.html` in any browser — no server, no build, no install.

```
open index.html      # macOS
xdg-open index.html  # Linux
```

## First 30 seconds (feel the value)

1. Scan the table of real-looking internship postings.
2. Type a company or role in the search box (e.g. `data`, `figma`).
3. Click **☆ Save** on a couple you like — watch the "saved" count update.
4. Hit **↻ Refresh feed** — new internships appear highlighted with a **NEW**
   pill, exactly like returning the next day. Click the **New since last visit**
   tab to see just those.

That loop — browse → save → return to fresh, flagged postings — is the whole
bet. If it feels useful with one source, it's worth adding more.
