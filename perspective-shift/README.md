# 🔥 Devil's Advocate — MVP Prototype

A single-page web app that stress-tests your beliefs. State something you
believe, and an AI plays a **rigorous devil's-advocate debater** — it never
agrees, never hedges, and fires back 2–3 concise counter-points. You reply,
it pushes again, for up to **6 exchanges**. After the last round it drops a
**critique card** summarizing the weak points in *your* argument, the
counterpoints you dodged, and one concrete way to argue it better next time.

## What was built

- **Single input** labeled *"What do you believe?"* + a **Challenge** button.
- **Chat-style thread**: each turn streams in the AI's structured rebuttal
  (bulleted, no agreement, no hedging), mimicking a streamed LLM response.
- **Up to 6 total exchanges**, tracked by a live counter.
- **Final summary card** after exchange 6: *Weak points · Unaddressed
  counterpoints · One way to strengthen your position.*
- **No login, no persistence** — reloading the page starts a fresh debate.

> ⚙️ **Note:** This is a front-end prototype. All "LLM" responses are
> **mocked locally in JavaScript** — zero network calls, no API keys, no
> backend. The mock tailors its rebuttals to keywords in your belief so the
> core interaction feels real.

## How to run

Just open the file — no server needed:

```
open index.html      # macOS
# or double-click index.html in your file browser
```

## First 30 seconds (feel the value)

1. Type a real belief, e.g. *"Remote work is better than office work."*
2. Hit **Challenge** and read the AI's 2–3 counter-points.
3. Defend yourself in the reply box — notice it refuses to concede.
4. Keep going to exchange 6 and read the **critique card**: the goal is that
   you walk away thinking *"I'd argue this differently next time."*

## Concept validation

The idea is validated if a real user, after one session, says the AI's
counterarguments **changed how they'd argue the point next time**.
