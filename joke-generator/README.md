# Tell Me a Joke 😄

A dead-simple, single-page joke machine. One button, one text area, zero friction.

## What was built

A static `index.html` (vanilla HTML + CSS + JS, no dependencies) with:
- A centered **"Tell me a joke"** button.
- A text area below it that displays a random joke on each click.
- A **fade-in animation** every time a new joke appears.
- A little click counter to reinforce the "just one more" loop.

The core interaction: **click the button → get a random joke → click again**. It's built to test one question — *is repeated clicking fun enough that people share the page?*

The jokes are hardcoded in a JavaScript array (~20 jokes). No backend, no database, no API calls, no accounts.

## How to run it

Just open the file in any browser:

```
open index.html      # macOS
# or double-click index.html in your file explorer
```

No install, no build step, no local server required.

## First 30 seconds

1. Open `index.html`.
2. Click **"Tell me a joke"** and read the joke that fades in.
3. Keep clicking — each click serves up a fresh, never-immediately-repeated joke and bumps the counter.

If you find yourself clicking "just one more time," the concept is working.
