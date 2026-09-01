/*
  808 BRANDO — EDITABLE SITE DATA
  Fill only confirmed information. Empty values render as neutral pending states.
  Audio previews should be short files (15–30 seconds recommended).
*/
const SITE_DATA = {
  contactEmail: "", // Add the confirmed professional @808brando.com address.
  signupUrl: "", // Add a future mailing-list form URL or endpoint.
  primaryProject: {
    title: "BRANDO",
    cover: "4C8C915B-4C05-4F03-BF55-5BFD5AE3C4B6.png",
    releaseDate: "",
    tracks: [
      // { number: 1, title: "", feature: "", previewUrl: "assets/audio/preview.mp3" }
    ]
  },
  vault: [
    // { title: "", status: "", image: "", previewUrl: "assets/audio/vault-preview.mp3" }
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
    // { title: "", cover: "", links: { appleMusic: "", spotify: "", youtube: "", other: "" } }
  ],
  beats: [
    // {
    //   title: "", previewUrl: "", bpm: "", key: "", moods: [], price: "",
    //   licenses: [{ name: "", price: "", buyUrl: "" }], exclusiveContact: true
    // }
  ]
};

const page = document.body.dataset.page;
let activeAudio = null;
let activeButton = null;

function stopAudio() {
  if (activeAudio) { activeAudio.pause(); activeAudio.currentTime = 0; }
  if (activeButton) activeButton.textContent = activeButton.dataset.idle || "Play";
  activeAudio = null;
  activeButton = null;
}

function playPreview(url, button) {
  if (!url) return;
  if (activeButton === button && activeAudio && !activeAudio.paused) { stopAudio(); return; }
  stopAudio();
  activeAudio = new Audio(url);
  activeButton = button;
  button.dataset.idle = button.textContent;
  button.textContent = "Pause";
  activeAudio.addEventListener("timeupdate", () => { if (activeAudio && activeAudio.currentTime >= 30) stopAudio(); });
  activeAudio.addEventListener("ended", stopAudio, { once: true });
  activeAudio.play().catch(() => { button.textContent = "Unavailable"; activeAudio = null; activeButton = null; });
}

function audioButton(url, label = "Play") {
  const button = document.createElement("button");
  button.className = "audio-button";
  button.type = "button";
  button.textContent = url ? label : "Pending";
  button.disabled = !url;
  if (url) button.addEventListener("click", () => playPreview(url, button));
  return button;
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
    details.innerHTML = `<strong>${track.title || "Title pending"}</strong>${track.feature ? `<small>feat. ${track.feature}</small>` : ""}`;
    item.innerHTML = `<span>${String(track.number || index + 1).padStart(2, "0")}</span>`;
    item.append(details, audioButton(track.previewUrl || ""));
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
  SITE_DATA.upcoming.forEach((project, index) => grid.insertAdjacentHTML("beforeend", `<article class="upcoming-card reveal"><span>${String(index + 1).padStart(2, "0")}</span><h3>${project.title}</h3><p>Details pending</p></article>`));
  SITE_DATA.coverConcepts.forEach((cover, index) => rail.insertAdjacentHTML("beforeend", `<figure><img src="${cover}" alt="Unassigned cover concept ${index + 1}" loading="lazy"><figcaption>Concept ${String(index + 1).padStart(2, "0")}</figcaption></figure>`));
}

function platformLabel(key) {
  return { appleMusic: "Apple Music", spotify: "Spotify", youtube: "YouTube", other: "More" }[key] || key;
}

function renderReleases() {
  const grid = document.querySelector("#release-grid");
  if (!grid) return;
  if (!SITE_DATA.releases.length) { grid.appendChild(emptyState("Official releases and listening links pending.")); return; }
  SITE_DATA.releases.forEach(release => {
    const item = document.createElement("article");
    item.className = "release-card reveal";
    item.innerHTML = `<img src="${release.cover}" alt="${release.title || "Release"} cover artwork"><h3>${release.title || "Title pending"}</h3>`;
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
  info.innerHTML = `<h3>${beat.title || "Title pending"}</h3><p>${(beat.moods || []).join(" · ") || "Tags pending"}</p>`;
  item.append(info);
  [beat.bpm || "—", beat.key || "—", beat.price || "—"].forEach(value => { const span = document.createElement("span"); span.textContent = value; item.appendChild(span); });
  item.appendChild(audioButton(beat.previewUrl || ""));
  if ((beat.licenses || []).length || beat.exclusiveContact) {
    const actions = document.createElement("div");
    actions.className = "beat-actions";
    (beat.licenses || []).forEach(license => { const link = document.createElement("a"); link.href = license.buyUrl || "#"; link.textContent = `${license.name}${license.price ? ` · ${license.price}` : ""}`; if (!license.buyUrl) link.setAttribute("aria-disabled", "true"); actions.appendChild(link); });
    if (beat.exclusiveContact) actions.insertAdjacentHTML("beforeend", '<a href="index.html#contact">Exclusive inquiry</a>');
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
  if (!SITE_DATA.beats.length) list.appendChild(emptyState("Beat inventory pending."));
  else SITE_DATA.beats.forEach(beat => list.appendChild(beatRow(beat)));
  const moods = [...new Set(SITE_DATA.beats.flatMap(beat => beat.moods || []))].sort();
  const moodSelect = document.querySelector("#beat-mood");
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

function setupReveal() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { document.querySelectorAll(".reveal").forEach(element => element.classList.add("visible")); return; }
  const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add("visible"); observer.unobserve(entry.target); } }), { threshold: 0.08 });
  document.querySelectorAll(".reveal").forEach(element => observer.observe(element));
}

if (page === "home") {
  renderTracklist(); renderVault(); renderUpcoming(); renderReleases(); renderBeatPreview(); setupForms();
  document.querySelector("#brando-release-date").textContent = SITE_DATA.primaryProject.releaseDate || "Release date pending";
}
if (page === "beats") renderBeatStore();
document.querySelectorAll("#year").forEach(element => { element.textContent = new Date().getFullYear(); });
setupNavigation();
setupReveal();
