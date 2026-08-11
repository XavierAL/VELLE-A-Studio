const projects = [
  {
    client: "KOLON SPORT「K:」",
    sector: "Outdoor / Performance",
    scope: "Sub Line Creation",
    year: "2025-29",
    detail: "Collection concept, product design and technical development for a new performance sub-line.",
    image: "kolon-ss25.jpg",
  },
  {
    client: "KOLON SPORT「K:」- TDS",
    sector: "Outdoor / Performance",
    scope: "Creative Direction",
    year: "2026-27",
    detail: "A modular product system balancing weather protection with lightweight construction and movement.",
    image: "kolon-ss26.jpg",
  },
  {
    client: "_J.L-A.L_",
    sector: "Fashion / Research",
    scope: "Brand & collection design",
    year: "2022-27",
    detail: "Ongoing material and construction research translated into garments, accessories and seasonal narratives.",
    image: "jlal-ss27.jpg",
  },
  {
    client: "Goldwin 0",
    sector: "Outdoor / Technical",
    scope: "Digital garment development",
    year: "2022-23",
    detail: "Digital prototyping used to study balance, deformation and movement before physical development.",
    video: "goldwin-wireframe.m4v",
  },
  {
    client: "Confidential client",
    sector: "Sportswear / Global",
    scope: "Sub-line strategy & design direction",
    year: "2025-26",
    detail: "A multi-season design framework created for a global performance business. Attribution remains confidential.",
    redacted: true,
  },
  {
    client: "Confidential client",
    sector: "Mobility / Lifestyle",
    scope: "Capsule design & managed production",
    year: "2023-24",
    detail: "A compact product programme developed from concept through sampling and supplier coordination.",
    redacted: true,
  },
];

const escapeHtml = (value) => String(value)
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;");

let drawerLayer = null;

function closeDrawer() {
  drawerLayer?.remove();
  drawerLayer = null;
  document.body.classList.remove("drawer-open");
}

function openDrawer(project) {
  closeDrawer();
  drawerLayer = document.createElement("div");
  drawerLayer.className = "drawer-layer";
  drawerLayer.setAttribute("role", "dialog");
  drawerLayer.setAttribute("aria-modal", "true");
  drawerLayer.setAttribute("aria-labelledby", "drawer-title");

  const heading = project.redacted
    ? '<div class="redacted-heading" aria-hidden="true"><i></i><i></i></div><h2 id="drawer-title" class="sr-only">Confidential client</h2><p class="nda-badge">NDA — IDENTITY WITHHELD</p>'
    : `<h2 id="drawer-title">${escapeHtml(project.client)}</h2>`;
  const media = project.image
    ? `<img src="${project.image}" alt="">`
    : project.video
      ? `<video autoplay muted loop playsinline><source src="${project.video}" type="video/mp4"></video>`
      : "";
  const redactedCopy = project.redacted
    ? '<div class="redacted-copy" aria-hidden="true"><i></i><i></i><i></i><i></i></div>'
    : "";

  drawerLayer.innerHTML = `
    <article class="project-drawer${project.redacted ? " is-redacted" : ""}">
      <button class="close">Close</button>
      <div class="drawer-code"><span>${escapeHtml(project.year)}</span><span>VELLE_A / INDEX</span></div>
      ${heading}
      <dl>
        <div><dt>Sector</dt><dd>${escapeHtml(project.sector)}</dd></div>
        <div><dt>Scope</dt><dd>${escapeHtml(project.scope)}</dd></div>
        <div><dt>Year</dt><dd>${escapeHtml(project.year)}</dd></div>
      </dl>
      <p class="drawer-copy">${escapeHtml(project.detail)}</p>
      ${media}
      ${redactedCopy}
    </article>`;

  drawerLayer.addEventListener("mousedown", (event) => {
    if (event.target === drawerLayer) closeDrawer();
  });
  drawerLayer.querySelector(".close").addEventListener("click", closeDrawer);
  document.body.append(drawerLayer);
  document.body.classList.add("drawer-open");
  drawerLayer.querySelector(".close").focus();
}

document.querySelectorAll(".index-row").forEach((row, index) => {
  row.addEventListener("click", () => openDrawer(projects[index]));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeDrawer();
});
