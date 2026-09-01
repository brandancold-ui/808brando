/*
  808 BRANDO — PROJECT DATA
  Add the six real image filenames to `cover`, then fill the empty fields only
  when official information is available. No layout changes are required.
*/
const siteContent = {
  projects: [
    "1DD79DA3-024E-472B-AC8B-D9D0BF4B50BC.jpeg",
    "55DD4A71-9E98-42A2-AFD6-0C087A4A21C6.png",
    "76090F60-4982-4AB9-B374-621A9DA31181.png",
    "BA1ACFBF-2406-4A67-9D00-0D025D99E1F7.png",
    "D1B7AF8A-D91B-43CA-BC2B-C20FFFDC2A6B.jpeg"
  ].map((cover, index) => ({
    id: `project-${String(index + 1).padStart(2, "0")}`,
    cover,
    title: "",
    status: "",
    releaseDate: "",
    description: "",
    fullPreviewUrl: "",
    tracks: [], // Example later: { title: "Song title", previewUrl: "assets/audio/song-preview.mp3" }
    links: { appleMusic: "", spotify: "", youtube: "" }
  })),
  videos: [
    { label: "Video 01", status: "Official link pending", url: "https://youtube.com/", image: "1DD79DA3-024E-472B-AC8B-D9D0BF4B50BC.jpeg" },
    { label: "Video 02", status: "Official link pending", url: "https://youtube.com/", image: "55DD4A71-9E98-42A2-AFD6-0C087A4A21C6.png" }
  ],
  socials: [
    { name: "Instagram", handle: "@808brando", url: "https://instagram.com/" },
    { name: "TikTok", handle: "@808brando", url: "https://tiktok.com/" },
    { name: "YouTube", handle: "808 Brando", url: "https://youtube.com/" },
    { name: "X / Twitter", handle: "@808brando", url: "https://x.com/" }
  ]
};

const fallbackCover = "1DD79DA3-024E-472B-AC8B-D9D0BF4B50BC.jpeg";
const rail = document.querySelector("#project-rail");
const dialog = document.querySelector("#project-dialog");
const railCount = document.querySelector("#rail-count");
let currentAudio = null;
let currentButton = null;

const projectLabel = index => `Project ${String(index + 1).padStart(2, "0")}`;

siteContent.projects.forEach((project, index) => {
  const hasPreview = Boolean(project.fullPreviewUrl || project.tracks.some(track => track.previewUrl));
  const card = document.createElement("article");
  card.className = "project-card reveal";
  card.innerHTML = `
    <button class="project-cover" type="button" aria-label="Open details for ${projectLabel(index)}">
      <img src="${project.cover}" alt="Cover artwork ${index + 1}" width="1200" height="1200" ${index ? 'loading="lazy"' : ""} />
      <span class="project-index">${String(index + 1).padStart(2, "0")}</span>
    </button>
    <div class="project-meta">
      <h3>${project.title || projectLabel(index)}</h3>
      <p class="project-status">${[project.status, project.releaseDate].filter(Boolean).join(" · ") || "Official details pending"}</p>
      <div class="project-actions">
        <button class="button button-primary view-project" type="button">View project <span aria-hidden="true">↗</span></button>
        <button class="button button-outline card-preview" type="button" ${hasPreview ? "" : "disabled"}>${hasPreview ? "Play preview" : "Preview pending"}</button>
      </div>
    </div>`;
  const image = card.querySelector("img");
  image.addEventListener("error", () => { image.src = fallbackCover; }, { once: true });
  card.querySelectorAll(".project-cover,.view-project").forEach(button => button.addEventListener("click", () => openProject(project, index)));
  if (hasPreview) card.querySelector(".card-preview").addEventListener("click", event => playAudio(project.fullPreviewUrl || project.tracks.find(track => track.previewUrl).previewUrl, event.currentTarget));
  rail.appendChild(card);
});

railCount.textContent = `01 / ${String(siteContent.projects.length).padStart(2, "0")}`;

function openProject(project, index) {
  stopAudio();
  const cover = document.querySelector("#detail-cover");
  cover.src = project.cover;
  cover.alt = `Cover artwork ${index + 1}`;
  cover.onerror = () => { cover.onerror = null; cover.src = fallbackCover; };
  document.querySelector("#detail-title").textContent = project.title || projectLabel(index);
  document.querySelector("#detail-status").textContent = [project.status, project.releaseDate].filter(Boolean).join(" · ") || "Official details pending";
  document.querySelector("#detail-description").textContent = project.description || "Project description will be added when official information is available.";

  const actions = document.querySelector("#detail-actions");
  actions.replaceChildren();
  if (project.fullPreviewUrl) actions.appendChild(makeAction("Play project preview", () => playAudio(project.fullPreviewUrl)));
  Object.entries(project.links).forEach(([service, url]) => {
    const label = service === "appleMusic" ? "Apple Music" : service[0].toUpperCase() + service.slice(1);
    const element = document.createElement(url ? "a" : "button");
    element.className = url ? "button button-primary" : "button button-outline";
    element.textContent = url ? label : `${label} · Pending`;
    if (url) { element.href = url; element.target = "_blank"; element.rel = "noopener"; }
    else { element.type = "button"; element.disabled = true; }
    actions.appendChild(element);
  });

  const tracklist = document.querySelector("#detail-tracklist");
  tracklist.replaceChildren();
  if (!project.tracks.length) {
    const empty = document.createElement("li"); empty.className = "empty-state"; empty.textContent = "Tracklist will be added when announced."; tracklist.appendChild(empty);
  } else {
    project.tracks.forEach((track, trackIndex) => {
      const item = document.createElement("li"); item.className = "track";
      item.innerHTML = `<span>${String(trackIndex + 1).padStart(2, "0")}</span><span>${track.title}</span><button class="preview-button" type="button" ${track.previewUrl ? "" : "disabled"}>${track.previewUrl ? "Play preview" : "Preview pending"}</button>`;
      if (track.previewUrl) item.querySelector("button").addEventListener("click", event => playAudio(track.previewUrl, event.currentTarget));
      tracklist.appendChild(item);
    });
  }
  dialog.showModal(); document.body.classList.add("dialog-open");
}

function makeAction(label, handler) { const button = document.createElement("button"); button.className = "button button-primary"; button.type = "button"; button.textContent = label; button.addEventListener("click", handler); return button; }
function playAudio(url, button) {
  if (!url) return;
  stopAudio(); currentAudio = new Audio(url); currentButton = button || null;
  if (currentButton) currentButton.textContent = "Pause preview";
  currentAudio.play().catch(() => { if (currentButton) currentButton.textContent = "Preview unavailable"; });
  currentAudio.addEventListener("ended", stopAudio, { once: true });
}
function stopAudio() { if (currentAudio) { currentAudio.pause(); currentAudio.currentTime = 0; } if (currentButton) currentButton.textContent = "Play preview"; currentAudio = null; currentButton = null; }
function closeProject() { stopAudio(); dialog.close(); document.body.classList.remove("dialog-open"); }
document.querySelector("#dialog-close").addEventListener("click", closeProject);
dialog.addEventListener("click", event => { if (event.target === dialog) closeProject(); });

const scrollRail = direction => { const card = rail.querySelector(".project-card"); if (card) rail.scrollBy({ left: direction * (card.offsetWidth + 24), behavior: "smooth" }); };
document.querySelector("#project-prev").addEventListener("click", () => scrollRail(-1));
document.querySelector("#project-next").addEventListener("click", () => scrollRail(1));
rail.addEventListener("scroll", () => { const card = rail.querySelector(".project-card"); if (!card) return; const index = Math.min(siteContent.projects.length - 1, Math.max(0, Math.round(rail.scrollLeft / (card.offsetWidth + 24)))); railCount.textContent = `${String(index + 1).padStart(2, "0")} / ${String(siteContent.projects.length).padStart(2, "0")}`; }, { passive: true });

const videoGrid = document.querySelector("#video-grid");
siteContent.videos.forEach(video => videoGrid.insertAdjacentHTML("beforeend", `<a class="video-card reveal" href="${video.url}" target="_blank" rel="noopener"><img src="${video.image}" alt="Placeholder video still" loading="lazy"><div class="video-content"><span class="play" aria-hidden="true">▶</span><h3>${video.label}</h3><p>${video.status}</p></div></a>`));
const socialList = document.querySelector("#social-list");
siteContent.socials.forEach(social => socialList.insertAdjacentHTML("beforeend", `<a class="social-link" href="${social.url}" target="_blank" rel="noopener"><div>${social.name}<small> · ${social.handle}</small></div><span aria-hidden="true">↗</span></a>`));
document.querySelector("#year").textContent = new Date().getFullYear();

const menuButton = document.querySelector(".menu-toggle"); const menu = document.querySelector(".site-nav");
const closeMenu = () => { menuButton.setAttribute("aria-expanded","false"); menu.classList.remove("open"); document.body.classList.remove("menu-open"); };
menuButton.addEventListener("click", () => { const opening = menuButton.getAttribute("aria-expanded") !== "true"; menuButton.setAttribute("aria-expanded",String(opening)); menu.classList.toggle("open",opening); document.body.classList.toggle("menu-open",opening); });
menu.querySelectorAll("a").forEach(link => link.addEventListener("click", closeMenu)); document.addEventListener("keydown", event => { if (event.key === "Escape") closeMenu(); });
const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add("visible"); observer.unobserve(entry.target); } }), { threshold:.1 });
document.querySelectorAll(".reveal").forEach(element => observer.observe(element));
