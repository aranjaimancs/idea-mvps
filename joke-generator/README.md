# 😄 Dad Joke Generator

A one-file, zero-dependency web prototype to test one question:
**will anyone bother clicking the button more than once?**

## What was built

A single static `index.html` with:
- A large, centered **"Tell me a joke"** button.
- A display area below it that shows a random dad joke with a **fade-in animation** on every click.
- A live fetch from the free [icanhazdadjoke.com](https://icanhazdadjoke.com) API, with an automatic
  **fallback to 20 hardcoded jokes** if you're offline or opened the file directly (`file://`).

No backend, no build step, no persistence — just vanilla HTML/CSS/JS.

## How to run it

Just open the file — no server needed:

```
open index.html
```

(Or double-click `index.html` in your file browser.)

To deploy: drop the folder onto any static host (GitHub Pages, Netlify, etc.).
The included `.nojekyll` file keeps GitHub Pages from mangling it.

## First 30 seconds

1. Open `index.html`.
2. Click **"Tell me a joke"** — a joke fades in.
3. Click it again. And again. That repeat click is the whole point:
   if you keep tapping for one more groan, the idea has legs.
