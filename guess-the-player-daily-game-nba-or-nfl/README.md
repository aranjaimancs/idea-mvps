# Silhouette Hoops — Guess the NBA Player (MVP)

A single-page daily guessing game. An NBA player is **whited out as a moving
silhouette** on the court, and you have to guess who it is in 5 tries — a mash-up
of *Wordle* feedback and *Poeltl*-style attribute clues.

This prototype exists to answer one question: **is the guess → feedback loop fun
enough** to justify building the real automated video-masking pipeline later? So
the "clips" here are lightweight CSS/SVG silhouette animations standing in for the
hand-rotoscoped GIFs of the real product. Everything else — the daily answer,
autocomplete, colored attribute feedback, 5-attempt flow, and shareable emoji
grid — is the real intended mechanic.

## What was built
- **Daily clip**: one deterministic "player of the day" (seeded by the date).
- **Silhouette stage**: an animated whited-out player figure; a new "clip"
  (different pose/angle + hint) is revealed after each wrong guess.
- **Autocomplete guessing**: type a name, pick from suggestions (keyboard + mouse).
- **Attribute feedback**: after each guess, a row lights up
  🟩 green (exact) / 🟨 yellow (partial) / 🟥 red (miss) for
  **Team · Conference · Position · Jersey**.
- **End screen**: reveals the correct answer and a **copy-to-clipboard emoji grid**
  to share your result.
- 12 NBA players mocked inline in JavaScript. Zero API calls, no back-end.

## How to run
Just open the file — no server needed:

```
open index.html      # macOS
# or double-click index.html in your file browser
```

## First 30 seconds
1. Look at the silhouette clip and the motion hint (e.g. "Behind-the-arc launch").
2. Start typing any NBA name and pick a guess from the autocomplete.
3. Read the color feedback row to narrow it down (same conference? same position?).
4. Watch the next clip reveal and guess again — you get 5 tries.
5. Hit the answer (or run out) and copy the emoji grid to share.
