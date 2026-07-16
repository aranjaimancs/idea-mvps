# Dad Joke Generator 👨

A zero-dependency, single-page dad joke machine. Click a button, get a groan.

## What was built
A single static `index.html` (embedded CSS + vanilla JavaScript) containing a
hardcoded array of 42 dad jokes. A large centered card displays the current joke.

**Core interaction:**
- **Get Joke** — randomly picks a new joke (never repeats the same one twice in a
  row) and fades it into the card with a smooth transition.
- **Copy Joke** — copies the current joke to your clipboard with a confirmation toast.

The page is mobile-responsive and loads instantly with no external requests.

## How to run
Just open the file — no server, no build step, no dependencies.

```
open index.html      # macOS
# or double-click index.html in your file browser
```

## First 30 seconds
1. Open `index.html`.
2. Tap **Get Joke** a few times — watch each joke fade in with no lag or repeats.
3. Hit **Copy Joke** to grab your favorite and paste it to a friend.
