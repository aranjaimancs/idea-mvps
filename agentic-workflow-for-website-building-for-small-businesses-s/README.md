# LeadForge — Website Outreach Console (MVP Prototype)

An internal tool for a "website-building-for-small-businesses" agency workflow.
It lets a developer source local business leads, send personalized cold outreach,
and — only for businesses that reply positively — auto-generate a landing page
they can preview and share.

The whole point is to **validate the reply rate before building any real automation.**
If leads don't respond to outreach, the idea dies regardless of how good the site generator is.

## What was built

A single-file, fully client-side prototype (`index.html`) with two screens:

1. **Leads** — a table of real-looking local businesses showing name/category,
   phone, website status (none / outdated / facebook-only / live), and outreach
   status. Live stats up top track total leads, outreach sent, replies, and reply rate.
2. **Send outreach** — every lead has a **Send Email** button that opens a
   pre-written, personalized cold email (rendered "via Resend"). Confirming the
   send logs a timestamp and flips the lead to **Emailed**.
3. **Generate Site** — a **Generate Site** button appears *only* on leads marked
   **Replied Yes**. It calls the (mocked) LLM, shows a loading state, then renders
   a real single-page landing site (hero + about + contact) pre-filled with the
   business's info inside a live preview iframe, plus a copyable shareable link.

All data is mocked inline in JavaScript. No back-end, no API calls, no secrets.

## How to run

Just open `index.html` in any browser — double-click it or drag it into a tab.
No build step, no server required.

## First 30 seconds (feel the value)

1. On the **Leads** tab, click **Send Email** on a "New" lead → see the personalized
   email, hit **Send via Resend** → the timestamp logs and status flips to *Emailed*.
2. Click **↳ mark replied yes** on any emailed lead to simulate a positive reply.
3. Hit the purple **🎨 Generate Site** button (or the **Generate Site** tab) → watch
   the LLM "generate" a real landing page for that business, then **Copy link** to grab
   the shareable preview URL.

That loop — outreach → reply → auto-generated site — is the concept in a nutshell.
