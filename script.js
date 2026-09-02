/*
  808 BRANDO — EDITABLE SITE DATA
  Fill only confirmed information. Empty values render as neutral pending states.
  PUBLIC AUDIO RULE: previewUrl values must reference approved short public clips only.
  Never place full songs, full beats, or private-source URLs in this public file.
*/
const SITE_DATA = {
  contactEmail: "contact@808brando.com",
  signupUrl: "", // Add a future mailing-list form URL or endpoint.
  primaryProject: {
    title: "BRANDO",
    cover: "4C8C915B-4C05-4F03-BF55-5BFD5AE3C4B6.png",
    releaseDate: "NOVEMBER 1",
    tracks: [
      { number: 1, title: "Till I Die", feature: "", previewUrl: "" },
      { number: 2, title: "My Daddy Said", feature: "", previewUrl: "" },
      { number: 3, title: "S.S.", feature: "", previewUrl: "", links: {
        spotify: "https://open.spotify.com/album/2t7cqE5mZXSqU1u0Qgn9qJ",
        appleMusic: "https://music.apple.com/us/album/ss-single/6772166511"
      } },
      { number: 4, title: "Skinny", feature: "", previewUrl: "" },
      { number: 5, title: "Therapy", feature: "", previewUrl: "" },
      { number: 6, title: "Superbadder", feature: "", previewUrl: "" },
      { number: 7, title: "For The Streets (w/ Luh Hari)", feature: "", previewUrl: "" },
      { number: 8, title: "Dangerous", feature: "", previewUrl: "" },
      { number: 9, title: "Onna Flo", feature: "", previewUrl: "", links: {
        spotify: "https://open.spotify.com/album/5kWoqL24PrfVmpdxXvw3Uu",
        appleMusic: "https://music.apple.com/us/album/onna-flo-single/6799945470",
        amazon: "http://www.amazon.com/gp/product/B0HDQ785SW"
      } },
      { number: 10, title: "Free The Gang", feature: "", previewUrl: "assets/audio/project-previews/free-the-gang-preview.mp3" }
    ]
  },
  vault: [
    // previewUrl may reference only an approved clip in assets/audio/vault/ (30 seconds maximum).
    // { title: "", status: "", image: "", previewUrl: "assets/audio/vault/approved-preview.mp3" }
  ],
  upcoming: [
    { title: "VII" },
    { title: "DEAR LORD" },
    { title: "Mr. Brown" },
    { title: "Bathed in Blood" }
  ],
  coverConcepts: [
    "1DD79DA3-024E-472B-AC8B-D9D0BF4B50BC.jpeg",
    "55DD4A71-9E98-42A2-AFD6-0C087A4A21C6.png",
    "76090F60-4982-4AB9-B374-621A9DA31181.png",
    "BA1ACFBF-2406-4A67-9D00-0D025D99E1F7.png",
    "D1B7AF8A-D91B-43CA-BC2B-C20FFFDC2A6B.jpeg"
  ],
  releases: [
    { title: "S.S.", cover: "assets/artwork/releases/ss.jpg", links: {
      spotify: "https://open.spotify.com/album/2t7cqE5mZXSqU1u0Qgn9qJ",
      appleMusic: "https://music.apple.com/us/album/ss-single/6772166511"
    } },
    { title: "Onna Flo", cover: "assets/artwork/releases/onna-flo.jpg", links: {
      spotify: "https://open.spotify.com/album/5kWoqL24PrfVmpdxXvw3Uu",
      appleMusic: "https://music.apple.com/us/album/onna-flo-single/6799945470",
      amazon: "http://www.amazon.com/gp/product/B0HDQ785SW"
    } },
    { title: "I Ain’t Say That", cover: "assets/artwork/releases/i-aint-say-that.jpg", links: {
      spotify: "https://open.spotify.com/track/677gZd1G8dXgJZSkLyHsHB",
      appleMusic: "https://music.apple.com/us/album/i-aint-say-that/1697637272?i=1697637273"
    } }
  ],
  beats: [
    // Private source files remain in eightoeightvault. previewUrl stays empty until a
    // specific 30-second public excerpt has been approved and created for that beat.
    { title: "4AM Check", previewUrl: "", bpm: "", key: "", moods: [], formats: { mp3: false, wav: false }, licenses: [], exclusiveContact: true },
    { title: "F.T.N.", previewUrl: "", bpm: "152", key: "", moods: [], formats: { mp3: true, wav: false }, licenses: [{ name: "MP3 LEASE", price: "$45", buyUrl: "" }], exclusiveContact: true },
    { title: "Cold Open", previewUrl: "", bpm: "162", key: "", moods: [], formats: { mp3: true, wav: false }, licenses: [{ name: "MP3 LEASE", price: "$45", buyUrl: "" }], exclusiveContact: true },
    { title: "What’s the Deal", previewUrl: "", bpm: "163", key: "", moods: [], formats: { mp3: true, wav: false }, licenses: [{ name: "MP3 LEASE", price: "$45", buyUrl: "" }], exclusiveContact: true },
    { title: "Deadman", previewUrl: "", bpm: "161", key: "", moods: [], formats: { mp3: false, wav: true }, licenses: [{ name: "WAV LEASE", price: "$80", buyUrl: "" }], exclusiveContact: true },
    { title: "Downtime", previewUrl: "", bpm: "151.579", key: "", moods: [], formats: { mp3: false, wav: true }, licenses: [{ name: "WAV LEASE", price: "$80", buyUrl: "" }], exclusiveContact: true },
    { title: "How It Be", previewUrl: "", bpm: "153", key: "", moods: [], formats: { mp3: true, wav: false }, licenses: [{ name: "MP3 LEASE", price: "$45", buyUrl: "" }], exclusiveContact: true },
    { title: "Make It Wild", previewUrl: "", bpm: "162", key: "", moods: [], formats: { mp3: true, wav: false }, licenses: [{ name: "MP3 LEASE", price: "$45", buyUrl: "" }], exclusiveContact: true }
  ]
};

const page = document.body.dataset.page;
let activeAudio = null;
let activeButton = null;
let activeProgress = null;
let activeTime = null;

function formatTime(value, round = false) {
  const seconds = Math.max(0, (round ? Math.round : Math.floor)(Number(value) || 0));
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
}

function stopAudio() {
  if (activeAudio) { activeAudio.pause(); activeAudio.currentTime = 0; }
  if (activeButton) activeButton.textContent = activeButton.dataset.idle || "Play";
  if (activeProgress) activeProgress.value = 0;
  if (activeTime) activeTime.textContent = "0:00 / 0:30";
  activeAudio = null;
  activeButton = null;
  activeProgress = null;
  activeTime = null;
}

function playPreview(url, button, progress, time) {
  if (!url) return;
  if (activeButton === button && activeAudio && !activeAudio.paused) { stopAudio(); return; }
  stopAudio();
  activeAudio = new Audio(url);
  activeAudio.preload = "metadata";
  activeButton = button;
  activeProgress = progress;
  activeTime = time;
  button.dataset.idle = button.textContent;
  button.textContent = "Pause";
  activeAudio.addEventListener("loadedmetadata", () => {
    if (!activeAudio) return;
    const duration = Math.min(activeAudio.duration || 30, 30);
    progress.max = duration;
    time.textContent = `0:00 / ${formatTime(duration, true)}`;
  }, { once: true });
  activeAudio.addEventListener("timeupdate", () => {
    if (!activeAudio) return;
    const duration = Math.min(activeAudio.duration || 30, 30);
    progress.value = Math.min(activeAudio.currentTime, duration);
    time.textContent = `${formatTime(activeAudio.currentTime)} / ${formatTime(duration, true)}`;
    if (activeAudio.currentTime >= 30) stopAudio();
  });
  activeAudio.addEventListener("ended", stopAudio, { once: true });
  activeAudio.play().catch(() => { button.textContent = "Unavailable"; activeAudio = null; activeButton = null; });
}

function audioButton(url, label = "Play") {
  const control = document.createElement("div");
  control.className = "audio-control";
  const button = document.createElement("button");
  button.className = "audio-button";
  button.type = "button";
  button.textContent = url ? label : "Pending";
  button.disabled = !url;
  if (!url) control.classList.add("pending");
  const progress = document.createElement("progress");
  progress.className = "audio-progress";
  progress.max = 30;
  progress.value = 0;
  const time = document.createElement("time");
  time.textContent = "0:00 / 0:30";
  if (url) button.addEventListener("click", () => playPreview(url, button, progress, time));
  control.append(button, progress, time);
  return control;
}

function emptyState(text, className = "empty-state") {
  const element = document.createElement("div");
  element.className = className;
  element.textContent = text;
  return element;
}

function renderTracklist() {
  const list = document.querySelector("#brando-tracklist");
  if (!list) return;
  const tracks = SITE_DATA.primaryProject.tracks;
  if (!tracks.length) {
    const item = document.createElement("li");
    item.className = "track-row placeholder-row";
    item.innerHTML = "<span>—</span><div><strong>Tracklist pending</strong><small>Titles and previews will be added when confirmed.</small></div>";
    item.appendChild(audioButton(""));
    list.appendChild(item);
    return;
  }
  tracks.forEach((track, index) => {
    const item = document.createElement("li");
    item.className = "track-row";
    const details = document.createElement("div");
    details.className = "track-info";
    const streamLinks = Object.entries(track.links || {}).filter(([service, url]) => url && ["spotify", "appleMusic"].includes(service));
    details.innerHTML = `<strong>${track.title || "Title pending"}</strong>${track.feature ? `<small>feat. ${track.feature}</small>` : ""}`;
    if (streamLinks.length) {
      const actions = document.createElement("div");
      actions.className = "track-streams-direct";
      streamLinks.forEach(([service, url]) => actions.insertAdjacentHTML("beforeend", `<a href="${url}" target="_blank" rel="noopener" aria-label="Open ${track.title} on ${platformLabel(service)}">${service === "spotify" ? "Spotify" : "Apple"}</a>`));
      details.appendChild(actions);
    }
    item.innerHTML = `<span>${String(track.number || index + 1).padStart(2, "0")}</span>`;
    const preview = track.previewUrl ? audioButton(track.previewUrl) : document.createElement("span");
    if (!track.previewUrl) { preview.className = streamLinks.length ? "preview-status" : "preview-empty"; preview.textContent = streamLinks.length ? "Out now" : "—"; }
    item.append(details, preview);
    list.appendChild(item);
  });
}

function renderVault() {
  const list = document.querySelector("#vault-list");
  if (!list) return;
  if (!SITE_DATA.vault.length) { list.appendChild(emptyState("Vault entries pending.")); return; }
  SITE_DATA.vault.forEach((entry, index) => {
    const item = document.createElement("article");
    item.className = "vault-row reveal";
    if (entry.image) item.innerHTML = `<img src="${entry.image}" alt="">`;
    const info = document.createElement("div");
    info.innerHTML = `<span>${String(index + 1).padStart(2, "0")}</span><h3>${entry.title || "Title pending"}</h3><p>${entry.status || "Unreleased"}</p>`;
    item.append(info, audioButton(entry.previewUrl || "", "Play snippet"));
    list.appendChild(item);
  });
}

function renderUpcoming() {
  const grid = document.querySelector("#upcoming-grid");
  const rail = document.querySelector("#concept-rail");
  if (!grid || !rail) return;
  SITE_DATA.upcoming.forEach((project, index) => grid.insertAdjacentHTML("beforeend", `<article class="upcoming-card reveal"><span>${String(index + 1).padStart(2, "0")}</span><h3>${project.title}</h3></article>`));
  SITE_DATA.coverConcepts.forEach((cover, index) => rail.insertAdjacentHTML("beforeend", `<figure><img src="${cover}" alt="Upcoming artwork ${index + 1}" loading="lazy"></figure>`));
}

function platformLabel(key) {
  return { appleMusic: "Apple Music", spotify: "Spotify", amazon: "Amazon", youtube: "YouTube", other: "More" }[key] || key;
}

function renderReleases() {
  const grid = document.querySelector("#release-grid");
  if (!grid) return;
  if (!SITE_DATA.releases.length) { grid.appendChild(emptyState("Official releases and listening links pending.")); return; }
  SITE_DATA.releases.forEach(release => {
    const item = document.createElement("article");
    item.className = "release-card reveal";
    item.innerHTML = `<img src="${release.cover}" alt="Official ${release.title || "release"} cover artwork" loading="lazy" width="632" height="632"><h3>${release.title || "Title pending"}</h3>`;
    const links = document.createElement("div");
    links.className = "stream-links";
    Object.entries(release.links || {}).filter(([, url]) => url).forEach(([service, url]) => links.insertAdjacentHTML("beforeend", `<a href="${url}" target="_blank" rel="noopener">${platformLabel(service)} ↗</a>`));
    item.appendChild(links);
    grid.appendChild(item);
  });
}

function beatRow(beat) {
  const item = document.createElement("article");
  item.className = "beat-row reveal";
  item.dataset.search = `${beat.title || ""} ${(beat.moods || []).join(" ")}`.toLowerCase();
  item.dataset.moods = (beat.moods || []).join("|");
  const info = document.createElement("div");
  info.className = "beat-title";
  const formatLabels = Object.entries(beat.formats || {}).filter(([, available]) => available).map(([format]) => format.toUpperCase());
  info.innerHTML = `<h3>${beat.title || "Title pending"}</h3><p>${formatLabels.join(" · ") || "Format pending"}</p>`;
  item.append(info);
  const firstPrice = beat.price || (beat.licenses || []).find(license => license.price)?.price || "—";
  [beat.bpm || "—", beat.key || "—", firstPrice].forEach(value => { const span = document.createElement("span"); span.textContent = value; item.appendChild(span); });
  item.appendChild(audioButton(beat.previewUrl || ""));
  if ((beat.licenses || []).length || beat.exclusiveContact) {
    const actions = document.createElement("div");
    actions.className = "beat-actions";
    (beat.licenses || []).forEach(license => {
      const action = document.createElement(license.buyUrl ? "a" : "span");
      if (license.buyUrl) action.href = license.buyUrl;
      else action.setAttribute("aria-disabled", "true");
      action.textContent = `${license.name}${license.price ? ` · ${license.price}` : ""}`;
      actions.appendChild(action);
    });
    if (beat.exclusiveContact) actions.insertAdjacentHTML("beforeend", `<a href="mailto:contact@808brando.com?subject=${encodeURIComponent(`${beat.title || "Beat"} — Exclusive inquiry`)}">Exclusive · $400</a>`);
    item.appendChild(actions);
  }
  return item;
}

function renderBeatPreview() {
  const target = document.querySelector("#beats-preview");
  if (!target) return;
  if (!SITE_DATA.beats.length) { target.appendChild(emptyState("Beat inventory pending.", "beats-empty")); return; }
  SITE_DATA.beats.slice(0, 3).forEach(beat => target.appendChild(beatRow(beat)));
}

function renderBeatStore() {
  const list = document.querySelector("#beat-list");
  if (!list) return;
  if (!SITE_DATA.beats.length) list.appendChild(emptyState("Catalog pending."));
  else SITE_DATA.beats.forEach(beat => list.appendChild(beatRow(beat)));
  const moods = [...new Set(SITE_DATA.beats.flatMap(beat => beat.moods || []))].sort();
  const moodSelect = document.querySelector("#beat-mood");
  if (!SITE_DATA.beats.length) {
    document.querySelector("#beat-search").disabled = true;
    moodSelect.disabled = true;
  }
  moods.forEach(mood => moodSelect.insertAdjacentHTML("beforeend", `<option value="${mood}">${mood}</option>`));
  const applyFilters = () => {
    const term = document.querySelector("#beat-search").value.trim().toLowerCase();
    const mood = moodSelect.value;
    list.querySelectorAll(".beat-row").forEach(row => { row.hidden = Boolean((term && !row.dataset.search.includes(term)) || (mood && !row.dataset.moods.split("|").includes(mood))); });
  };
  document.querySelector("#beat-search").addEventListener("input", applyFilters);
  moodSelect.addEventListener("change", applyFilters);
}

function setupForms() {
  const inquiry = document.querySelector("#inquiry-form");
  if (inquiry) inquiry.addEventListener("submit", event => {
    event.preventDefault();
    const status = document.querySelector("#inquiry-status");
    if (!SITE_DATA.contactEmail) { status.textContent = "Contact form will be available soon."; return; }
    const data = new FormData(inquiry);
    const subject = encodeURIComponent(`808 Brando inquiry — ${data.get("inquiryType")}`);
    const body = encodeURIComponent(`Reply to: ${data.get("replyTo")}\n\n${data.get("message")}`);
    window.location.href = `mailto:${SITE_DATA.contactEmail}?subject=${subject}&body=${body}`;
  });
  const signup = document.querySelector("#signup-form");
  if (signup) signup.addEventListener("submit", event => {
    event.preventDefault();
    document.querySelector("#signup-status").textContent = SITE_DATA.signupUrl ? "Signup link ready for connection." : "Fan signup will be available soon.";
  });
}

function setupNavigation() {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".site-nav");
  if (!toggle || !nav) return;
  const close = () => { toggle.setAttribute("aria-expanded", "false"); nav.classList.remove("open"); };
  toggle.addEventListener("click", () => { const open = toggle.getAttribute("aria-expanded") !== "true"; toggle.setAttribute("aria-expanded", String(open)); nav.classList.toggle("open", open); });
  nav.querySelectorAll("a").forEach(link => link.addEventListener("click", close));
  document.addEventListener("keydown", event => { if (event.key === "Escape") { stopAudio(); close(); } });
}

function setupProjectMotion() {
  const project = document.querySelector(".primary-project");
  if (!project || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  let scheduled = false;
  const update = () => {
    const rect = project.getBoundingClientRect();
    const range = Math.max(window.innerHeight, rect.height * 0.55);
    const progress = Math.min(1, Math.max(0, -rect.top / range));
    project.style.setProperty("--artist-shift", `${(-1.15 * progress).toFixed(3)}rem`);
    project.style.setProperty("--artist-scale", (1 - 0.035 * progress).toFixed(4));
    project.style.setProperty("--artist-opacity", (1 - 0.42 * progress).toFixed(4));
    project.style.setProperty("--cover-scale", (1 + 0.018 * progress).toFixed(4));
    scheduled = false;
  };
  const requestUpdate = () => { if (!scheduled) { scheduled = true; requestAnimationFrame(update); } };
  update();
  addEventListener("scroll", requestUpdate, { passive: true });
  addEventListener("resize", requestUpdate, { passive: true });
}

function setupReveal() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { document.querySelectorAll(".reveal").forEach(element => element.classList.add("visible")); return; }
  const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add("visible"); observer.unobserve(entry.target); } }), { threshold: 0.08 });
  document.querySelectorAll(".reveal").forEach(element => observer.observe(element));
}

if (page === "home") {
  renderTracklist(); renderUpcoming(); renderReleases(); setupForms();
  document.querySelector("#brando-release-date").textContent = SITE_DATA.primaryProject.releaseDate || "Release date pending";
}
if (page === "beats") renderBeatStore();
document.querySelectorAll("#year").forEach(element => { element.textContent = new Date().getFullYear(); });
setupNavigation();
setupReveal();
setupProjectMotion();
