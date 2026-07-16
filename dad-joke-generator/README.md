# Dad Joke Generator

A zero-dependency static web page that serves up a new dad joke every 5 minutes —
no refresh, no clicks, no backend.

## What was built

- **Big joke display** showing a dad joke.
- **A live MM:SS countdown** starting at `5:00`.
- **A "New Joke Now" button** for the impatient.

### Core interaction
On load, a joke is fetched from the free [icanhazdadjoke.com](https://icanhazdadjoke.com)
API (falling back to ~50 hardcoded jokes if the fetch fails) and the timer starts.
When the timer hits `0:00`, a fresh joke is automatically swapped in and the timer
resets to `5:00`. Clicking **New Joke Now** swaps the joke instantly and restarts
the countdown.

## How to run

Just open `index.html` in any browser — no server or install required.

```
open index.html      # macOS
# or double-click the file
```

It's a fully static site (`index.html` + `script.js`), deployable as-is to
GitHub Pages or any static host. The API call degrades gracefully: if it's
blocked (e.g. some `file://` contexts), the local joke list kicks in so the
page never sits empty.

## First 30 seconds

1. Open the page — a dad joke is already waiting for you.
2. Watch the timer tick down from `5:00`.
3. Impatient? Hit **New Joke Now** for an instant new groaner.
4. Leave the tab open — a new joke appears automatically every 5 minutes.
