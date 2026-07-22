# SiteSpark — Automated Local Business Website Outreach (MVP prototype)

A self-contained, front-end-only prototype that proves the core loop end-to-end:
**raw business name → LLM-generated live site preview → personalized cold email → open/reply tracking**, all in one dashboard.

## What was built

A single-page, three-panel dashboard (`index.html`) that mirrors the real product:

1. **Leads panel** — a table of 20 manually-curated local businesses (would come from Supabase), showing name, industry/city, status, and a **Generate** button.
2. **Site Preview panel** — clicking Generate runs a simulated LLM + build + deploy pipeline (with a live console log) that produces a real one-page website (hero, about, contact) rendered in a browser-style iframe at a unique preview URL.
3. **Outreach panel** — an auto-drafted cold email that references the live preview link. You can edit the subject/body and click **Send via Resend**. Delivery, opens, and replies are then tracked inline and rolled up into the KPI counters in the header.

A **⚡ Generate previews for first 5 leads** button proves the batch success criterion: go from raw names to 5 personalized emails-with-live-links in seconds.

> This is a front-end mock. There are no external API calls or secrets. The LLM generation, Vercel-style deploy, Resend delivery, and open/reply webhooks are all simulated deterministically in vanilla JS — but the interaction faithfully represents the intended Next.js + Supabase + Resend architecture.

## How to run

Just open `index.html` in any modern browser. No server, no build, no dependencies.

```
open index.html
```

## First 30 seconds (feel the value)

1. Click **⚡ Generate previews for first 5 leads** at the top of the Leads panel.
2. Watch 5 businesses flip to **Preview ready** and a real generated website appear in the middle panel.
3. Click any lead, read the auto-drafted email (note the live preview link), and hit **Send email via Resend**.
4. Watch the status flow **Sent → Opened → Replied** and the header KPIs tick up — the whole conversion funnel in one view.
