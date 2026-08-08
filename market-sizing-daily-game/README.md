# Guesstimate — Daily Absurd Market-Sizing Game

A tiny single-page prototype to test one thing: **is the "guess-then-reveal" loop fun enough to make someone want to come back tomorrow?**

## What was built
- One hardcoded **daily absurd market-sizing question** (e.g., *"How much do New Yorkers spend annually on umbrellas they lose within a week?"*).
- A **"Reveal a hint"** button that shows up to **3 hints**, one at a time.
- A single **numeric guess input** + **submit** button.
- On submit: shows the **accepted answer range** and a **short explanation of the estimation logic**.
- A **shareable result summary** ("I guessed $X, actual range was $Y–$Z, here's the logic") with a **copy-to-clipboard** button.
- Uses **localStorage** so you only get **one guess per day** (reload = your result is remembered, not reset).

No backend, no build step, no external calls. All data is hardcoded inline.

## How to run
Just open `index.html` in any browser. That's it — no server required.

## First 30 seconds (to feel the value)
1. Read the absurd question at the top.
2. Tap **"Reveal a hint"** once or twice to help anchor your estimate.
3. Type a dollar guess and hit **"Lock in my guess."**
4. See whether you landed in the range, read the one-line estimation logic, and hit **Copy shareable result** to imagine sharing your score.

## Notes
- To re-test the guess flow, clear the `guesstimate:*` key in localStorage (or open a private window).
- New questions would rotate daily in the real product; here one day is hardcoded.
