# 🧳 Family Trip Planner

A minimal single-page prototype of a family travel agent. It generates a relaxed,
comfort-first, day-by-day itinerary and includes a **Trip Assistant** chat that
answers travel questions using your itinerary as context.

## What was built

A single-page web app with two connected views:

1. **Plan a Trip** — enter destination(s), start/end dates and free-text notes.
   These are combined with a hardcoded **family preference profile**
   (relaxed pace · nicer/quieter hotels · avoid long walks · mom has back pain ·
   loves major landmarks without over-scheduling) and turned into a day-by-day
   itinerary. Each day card shows 2–3 activities, a suggested hotel area/type,
   and a pacing note. The list is clean and scrollable.

2. **Trip Assistant** — a chat panel below the itinerary. Ask free-text questions
   (e.g. *"do we need cash in Germany?"*, *"how do you say hello in German?"*)
   and it streams back a short conversational answer, using the current itinerary
   as context.

The itinerary and chat history are stored keyed by a single shared **Trip ID**
so the family can revisit the same plan.

### Prototype notes
- The LLM calls and Supabase persistence are **mocked locally** (`mockApi.js`):
  itinerary generation and streaming chat are simulated, and data is saved in
  the browser's `localStorage` under the shared trip ID. Swapping these for a
  real LLM endpoint + Supabase table is the only change needed for production.
- No build step, no server, no API keys.

## How to run

Just open **`index.html`** directly in any browser. That's it.

## First 30 seconds

1. The form is pre-filled for **Munich & Bavaria, Germany** with dates.
2. Click **✨ Generate Itinerary** — a relaxed, low-walking, landmark-focused
   plan appears as day cards.
3. Scroll to **Trip Assistant** and click a suggested question like
   *"do we need cash in Germany?"* — watch the answer stream in.
4. Reload the page — your itinerary and chat are still there (shared Trip ID).

## Files
- `index.html` — layout & structure
- `styles.css` — styling
- `app.js` — UI wiring, rendering, persistence
- `mockApi.js` — mocked LLM (itinerary + streaming chat) & storage layer
