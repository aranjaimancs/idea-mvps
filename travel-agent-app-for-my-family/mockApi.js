/*
 * mockApi.js
 * Stand-in for a real LLM API + Supabase. In production these functions would:
 *   - POST to an LLM endpoint with the family profile + form/chat context
 *   - persist to Supabase keyed by tripId
 * Here everything is mocked locally and stored in localStorage.
 */

const FAMILY_PROFILE = {
  pace: "relaxed",
  hotels: "nicer, quieter",
  mobility: "avoid long walks; mom has back pain",
  interests: "major landmarks without over-scheduling",
};

// --- tiny "storage layer" pretending to be Supabase, keyed by trip ID ---
const TripStore = {
  key: (tripId) => `trip:${tripId}`,
  load(tripId) {
    try { return JSON.parse(localStorage.getItem(this.key(tripId))) || {}; }
    catch { return {}; }
  },
  save(tripId, data) {
    localStorage.setItem(this.key(tripId), JSON.stringify(data));
  },
  clear(tripId) { localStorage.removeItem(this.key(tripId)); },
};

// Curated activity pools so the mock feels destination-aware.
const CITY_PLANS = {
  munich: [
    { spot: "Marienplatz & the Glockenspiel show", note: "watch from a nearby café — no standing required" },
    { spot: "English Garden — slow riverside stroll & beer garden lunch", note: "benches & shade throughout" },
    { spot: "Nymphenburg Palace gardens", note: "gentle, flat paths; rent a garden cart if tired" },
    { spot: "Day trip to Neuschwanstein Castle", note: "book the shuttle bus up the hill, skip the walk" },
    { spot: "BMW Welt & Museum", note: "indoor, elevators, plenty of seating" },
    { spot: "Viktualienmarkt food tasting", note: "compact, easy loop with seating" },
  ],
  default: [
    { spot: "Old Town walking highlights (short loop)", note: "kept under 20 min of walking" },
    { spot: "Signature landmark visit", note: "prebook timed tickets to skip lines" },
    { spot: "Relaxed local lunch", note: "reserve a table with comfortable seating" },
    { spot: "Scenic viewpoint by car/taxi", note: "arrive close, minimal walking" },
    { spot: "Museum or gallery afternoon", note: "climate-controlled with elevators & benches" },
  ],
};

const HOTEL_AREAS = {
  munich: "Lehel / Altstadt — quiet, central, near flat riverside paths",
  default: "A quiet central district near the main sights",
};

function cityKey(destinations) {
  const d = (destinations || "").toLowerCase();
  if (d.includes("munich") || d.includes("münchen") || d.includes("bavaria") || d.includes("germany")) return "munich";
  return "default";
}

function daysBetween(start, end) {
  const s = new Date(start), e = new Date(end);
  if (isNaN(s) || isNaN(e) || e < s) return 3;
  return Math.min(10, Math.floor((e - s) / 86400000) + 1);
}

function fmtDate(start, offset) {
  const d = new Date(start);
  if (isNaN(d)) return `Day ${offset + 1}`;
  d.setDate(d.getDate() + offset);
  return d.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" });
}

// --- "LLM" itinerary generation (mocked, returns a Promise like a real API) ---
function generateItinerary({ destinations, startDate, endDate, notes }) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const key = cityKey(destinations);
      const pool = CITY_PLANS[key];
      const nDays = daysBetween(startDate, endDate);
      const hotel = HOTEL_AREAS[key];
      const notesLc = (notes || "").toLowerCase();

      const days = [];
      for (let i = 0; i < nDays; i++) {
        const perDay = i === 0 ? 2 : (2 + (i % 2)); // arrival day lighter
        const acts = [];
        for (let j = 0; j < perDay; j++) {
          acts.push(pool[(i * 2 + j) % pool.length]);
        }
        let pace = i === 0
          ? "Easy arrival day — settle in, short evening stroll, early dinner."
          : "Late start (~10am), long lunch break, nothing scheduled after 5pm.";
        if (notesLc.includes("castle") && key === "munich" && i === 1) {
          acts[0] = pool[3]; // Neuschwanstein
          pace = "Full but comfortable day — shuttle up, plenty of rest stops.";
        }
        days.push({
          date: fmtDate(startDate, i),
          title: i === 0 ? "Arrival & easing in" : `Exploring ${destinations.split(/[,&]/)[0].trim()}`,
          activities: acts,
          hotel,
          pace,
        });
      }

      resolve({
        destinations,
        startDate,
        endDate,
        summary: `${nDays}-day relaxed plan for ${destinations}. Comfort-first, landmark-focused, low walking.`,
        days,
        generatedAt: new Date().toISOString(),
      });
    }, 700); // fake network/LLM latency
  });
}

// --- "LLM" chat, streaming token-by-token (mocked) ---
const CHAT_ANSWERS = [
  { match: (q) => /cash|money|card|pay/.test(q),
    text: "Cards are widely accepted in hotels, big restaurants and shops, but Germany still loves cash — keep €50–100 on hand for beer gardens, bakeries, markets, and small cafés. Many places are card-only-averse, so cash keeps things stress-free." },
  { match: (q) => /hello|hi |say|german word|speak|language/.test(q),
    text: "\"Hello\" is \"Hallo\" (informal) or \"Guten Tag\" (polite, daytime). \"Thank you\" is \"Danke\". In Bavaria you'll also hear \"Grüß Gott\" as a friendly hello!" },
  { match: (q) => /back|mom|pain|walk|tired|rest|mobility/.test(q),
    text: "For your mom's back: breathable layers and supportive cushioned shoes help. I've kept each day's walking short with plenty of benches — consider a lightweight seat-cane, and taxis are cheap and easy for the door-to-door stretches." },
  { match: (q) => /weather|pack|wear|clothes|rain|cold/.test(q),
    text: "Pack layers and a compact umbrella — weather can shift. Comfortable walking shoes are key, and evenings can be cool, so a light jacket is smart even in summer." },
  { match: (q) => /tip|tipping|gratuity/.test(q),
    text: "Tipping is modest: round up or add about 5–10% for good service. Just tell the server the total amount as you pay (e.g. \"Zehn Euro\") rather than leaving it on the table." },
  { match: (q) => /hotel|stay|where/.test(q),
    text: "Based on your itinerary I'd stay in a quiet central area near flat, easy-to-walk streets — close enough to reach the main sights by a short taxi or gentle stroll." },
];

function chatFallback(q) {
  return "Great question! For your relaxed, comfort-first trip I'd keep things simple: prebook the key landmarks, build in long lunch breaks, and use taxis for anything more than a short walk. Want me to adjust a specific day?";
}

// Returns an async-ish streamer: calls onToken for each chunk, then onDone.
function askAssistant(question, itinerary, onToken, onDone) {
  const q = question.toLowerCase();
  const hit = CHAT_ANSWERS.find((a) => a.match(q));
  let text = hit ? hit.text : chatFallback(q);
  if (itinerary && /day|plan|schedule|itinerary/.test(q)) {
    text = `Your plan has ${itinerary.days.length} days in ${itinerary.destinations}. ` + text;
  }
  const tokens = text.split(/(\s+)/); // keep spaces
  let i = 0;
  setTimeout(function stream() {
    if (i < tokens.length) {
      onToken(tokens[i++]);
      setTimeout(stream, 22);
    } else {
      onDone(text);
    }
  }, 350);
}
