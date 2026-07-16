// ===== Dad Joke Generator =====
// A random joke shows on load; a 5:00 timer counts down and auto-swaps in a
// new joke at 0:00. The button swaps instantly and resets the timer.

const JOKES = [
  "I'm afraid for the calendar. Its days are numbered.",
  "Why did the scarecrow win an award? He was outstanding in his field.",
  "I used to hate facial hair, but then it grew on me.",
  "What do you call a fake noodle? An impasta.",
  "Why don't skeletons fight each other? They don't have the guts.",
  "I only know 25 letters of the alphabet. I don't know y.",
  "What did the ocean say to the beach? Nothing, it just waved.",
  "Why can't you hear a pterodactyl go to the bathroom? Because the 'P' is silent.",
  "I would tell you a construction joke, but I'm still working on it.",
  "What do you call cheese that isn't yours? Nacho cheese.",
  "How do you organize a space party? You planet.",
  "Why did the bicycle fall over? Because it was two-tired.",
  "I don't trust stairs. They're always up to something.",
  "What do you call a factory that makes okay products? A satisfactory.",
  "Did you hear about the restaurant on the moon? Great food, no atmosphere.",
  "What's brown and sticky? A stick.",
  "Why did the coffee file a police report? It got mugged.",
  "How does a penguin build its house? Igloos it together.",
  "I'm reading a book about anti-gravity. It's impossible to put down.",
  "What do you call a bear with no teeth? A gummy bear.",
  "Why don't eggs tell jokes? They'd crack each other up.",
  "What's the best thing about Switzerland? I don't know, but the flag is a big plus.",
  "I made a pencil with two erasers. It was pointless.",
  "Why did the math book look sad? Because it had too many problems.",
  "What do you call a dinosaur that crashes his car? Tyrannosaurus wrecks.",
  "I'm on a seafood diet. I see food and I eat it.",
  "Why did the golfer bring two pairs of pants? In case he got a hole in one.",
  "What did one wall say to the other wall? I'll meet you at the corner.",
  "How do you make a tissue dance? You put a little boogie in it.",
  "Why can't you give Elsa a balloon? Because she'll let it go.",
  "What do you call a boomerang that won't come back? A stick.",
  "Why did the tomato turn red? Because it saw the salad dressing.",
  "I ordered a chicken and an egg online. I'll let you know.",
  "What do you call a pile of cats? A meowtain.",
  "Why do bees have sticky hair? Because they use honeycombs.",
  "What did the grape do when it got stepped on? Nothing, it just let out a little wine.",
  "How do you catch a squirrel? Climb a tree and act like a nut.",
  "Why did the cookie go to the doctor? Because it was feeling crumby.",
  "What do you call a man with no arms and no legs in the ocean? Bob.",
  "Why was the belt arrested? For holding up a pair of pants.",
  "What kind of shoes do ninjas wear? Sneakers.",
  "Why don't scientists trust atoms? Because they make up everything.",
  "What did the janitor say when he jumped out of the closet? Supplies!",
  "How do you fix a broken tuba? With a tuba glue.",
  "What's orange and sounds like a parrot? A carrot.",
  "Why did the stadium get hot after the game? All the fans left.",
  "What do you call a sleeping dinosaur? A dino-snore.",
  "Why did the banana go to the doctor? Because it wasn't peeling well.",
  "What did the buffalo say to his son when he left for college? Bison.",
  "I tried to catch some fog earlier. I mist.",
  "Why did the picture go to jail? Because it was framed.",
  "What do you call a duck that gets all A's? A wise quacker."
];

const DURATION = 5 * 60; // seconds
const API_URL = 'https://icanhazdadjoke.com/';

const jokeBox = document.getElementById('joke-box');
const timerEl = document.getElementById('timer');
const btn = document.getElementById('joke-btn');

let remaining = DURATION;
let intervalId = null;
let lastIndex = -1;

function pickRandomJoke() {
  let idx;
  do {
    idx = Math.floor(Math.random() * JOKES.length);
  } while (JOKES.length > 1 && idx === lastIndex);
  lastIndex = idx;
  return JOKES[idx];
}

// Try the free icanhazdadjoke.com API first; fall back to the local list if the
// fetch fails (offline, blocked, opened via file://, etc.). Either way the page
// always shows a joke.
async function fetchJoke() {
  try {
    const res = await fetch(API_URL, { headers: { Accept: 'application/json' } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (data && data.joke) return data.joke;
    throw new Error('No joke in response');
  } catch (err) {
    return pickRandomJoke();
  }
}

function renderTimer() {
  const m = Math.floor(remaining / 60);
  const s = remaining % 60;
  timerEl.textContent = `${m}:${String(s).padStart(2, '0')}`;
}

async function newJoke() {
  jokeBox.textContent = await fetchJoke();
  remaining = DURATION;
  renderTimer();
}

function tick() {
  remaining -= 1;
  if (remaining <= 0) {
    remaining = DURATION; // reset immediately so the swap can't double-fire
    renderTimer();
    newJoke(); // swaps joke and resets timer to 5:00
    return;
  }
  renderTimer();
}

function startTimer() {
  if (intervalId) clearInterval(intervalId);
  intervalId = setInterval(tick, 1000);
}

btn.addEventListener('click', () => {
  newJoke();
  startTimer(); // restart the countdown from the click moment
});

// On page load: show a joke and start the countdown.
newJoke();
startTimer();
