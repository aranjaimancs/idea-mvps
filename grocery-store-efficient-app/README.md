# 🛒 Aisle Sort

Reorders a grocery list so you can walk **one real store in a single direction**, picking
items up in the order you physically encounter them — no backtracking.

## What was built

A single-page, zero-dependency web app (plain HTML/CSS/JS in `index.html`).

- **Hardcoded store layout** for *Safeway — 15th & Market St, San Francisco* (11 sections in
  physical walk order: Produce → Bakery → Deli → Meat → Dairy → Pantry → Snacks → Beverages →
  Frozen → Household → Health & Beauty).
- **Paste your list** (one item per line) into the textarea.
- **Keyword matching** assigns each item to a section (`milk` → Dairy, `frozen pizza` → Frozen).
- **Manual override dropdown** on every item; anything unmatched is flagged and dropped in a
  "Not matched" group with a *choose aisle* prompt.
- **Output** is your list regrouped under numbered aisle headers in walking order.

All data is inline in JavaScript. No server, no build step, no external calls.

## How to run

Just **open `index.html` in any browser**. That's it.

## First 30 seconds

1. Open `index.html`.
2. Click **"Load a sample list"** (or paste your own, one item per line).
3. Press **"Sort by aisle →"** and watch the list snap into store-walk order.
4. Notice `unicorn dust` lands in *Not matched* — use its dropdown to assign an aisle.

**Success test:** take the sorted output to the actual Safeway and confirm the aisle order
matches the path you'd naturally walk.
