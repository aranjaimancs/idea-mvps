/* app.js — wires the UI to the mock LLM + storage layer */

const TRIP_ID = "family-trip"; // single shared trip ID for the whole family
let state = { itinerary: null, chat: [] };

const $ = (id) => document.getElementById(id);

// ---------- init ----------
window.addEventListener("DOMContentLoaded", () => {
  $("tripId").textContent = TRIP_ID;

  // sensible default dates (next weekend, 4 days)
  const start = new Date(); start.setDate(start.getDate() + 14);
  const end = new Date(start); end.setDate(end.getDate() + 3);
  $("startDate").value = start.toISOString().slice(0, 10);
  $("endDate").value = end.toISOString().slice(0, 10);

  // restore saved trip
  const saved = TripStore.load(TRIP_ID);
  if (saved.itinerary) { state = saved; renderItinerary(); renderChat(); }

  wireEvents();
});

function wireEvents() {
  $("planForm").addEventListener("submit", onGenerate);
  $("chatForm").addEventListener("submit", onChatSubmit);
  $("suggestions").addEventListener("click", (e) => {
    if (e.target.classList.contains("chip")) {
      $("chatInput").value = e.target.textContent;
      $("chatInput").focus();
    }
  });
  $("resetBtn").addEventListener("click", () => {
    TripStore.clear(TRIP_ID);
    state = { itinerary: null, chat: [] };
    renderItinerary(); renderChat();
  });
}

function persist() { TripStore.save(TRIP_ID, state); }

// ---------- generate itinerary ----------
async function onGenerate(e) {
  e.preventDefault();
  const btn = $("generateBtn");
  btn.disabled = true; btn.textContent = "Generating…";
  $("itinerary").innerHTML = '<div class="empty-state">✨ Building a relaxed plan tuned to your family…</div>';

  const form = {
    destinations: $("destinations").value.trim() || "Munich, Germany",
    startDate: $("startDate").value,
    endDate: $("endDate").value,
    notes: $("notes").value.trim(),
  };

  const itinerary = await generateItinerary(form);
  state.itinerary = itinerary;
  persist();
  renderItinerary();

  btn.disabled = false; btn.textContent = "✨ Regenerate Itinerary";
}

function renderItinerary() {
  const el = $("itinerary");
  const meta = $("itineraryMeta");
  const it = state.itinerary;
  if (!it) {
    el.innerHTML = '<div class="empty-state">Fill in the form above and hit <strong>Generate Itinerary</strong> to see a day-by-day plan.</div>';
    meta.textContent = "";
    return;
  }
  meta.textContent = it.summary;
  el.innerHTML = it.days.map((d, i) => `
    <article class="day-card">
      <div class="day-head">
        <span class="day-num">Day ${i + 1}</span>
        <span class="day-date">${escapeHtml(d.date)}</span>
        <span class="day-title">${escapeHtml(d.title)}</span>
      </div>
      <div class="day-body">
        <ul class="acts">
          ${d.activities.map((a) => `
            <li><span class="ic">📍</span><span><strong>${escapeHtml(a.spot)}</strong><br>
            <span class="muted small">${escapeHtml(a.note)}</span></span></li>`).join("")}
        </ul>
        <div class="day-meta">
          <div><span class="k">🏨 Where to stay:</span> ${escapeHtml(d.hotel)}</div>
          <div class="pace">🌿 ${escapeHtml(d.pace)}</div>
        </div>
      </div>
    </article>`).join("");
}

// ---------- chat ----------
function onChatSubmit(e) {
  e.preventDefault();
  const input = $("chatInput");
  const q = input.value.trim();
  if (!q) return;
  input.value = "";

  state.chat.push({ role: "user", text: q });
  renderChat();

  const chat = $("chat");
  const typing = document.createElement("div");
  typing.className = "msg bot typing";
  typing.textContent = "…";
  chat.appendChild(typing);
  chat.scrollTop = chat.scrollHeight;

  $("sendBtn").disabled = true;

  let acc = "";
  askAssistant(q, state.itinerary,
    (tok) => { acc += tok; typing.textContent = acc; typing.classList.remove("typing"); chat.scrollTop = chat.scrollHeight; },
    (full) => {
      typing.remove();
      state.chat.push({ role: "bot", text: full });
      persist();
      renderChat();
      $("sendBtn").disabled = false;
    });
}

function renderChat() {
  const chat = $("chat");
  chat.innerHTML = state.chat.map((m) =>
    `<div class="msg ${m.role === "user" ? "user" : "bot"}">${escapeHtml(m.text)}</div>`).join("");
  chat.scrollTop = chat.scrollHeight;
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}
