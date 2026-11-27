import { gsap, ScrollTrigger, MotionPathPlugin } from "../main.js";

/* ===== RÉGLAGES ===== */
const DISTANCE_SCROLL = 3000; // pixels de défilement pour tout le voyage (plus grand = plus lent)
const ZOOM_FOND_DEPART = 1.1; // zoom de la carte au début
const ZOOM_FOND_FIN = 1.3;    // zoom de la carte à la fin
const REGIONS = [
  { nom: "Limgrave", p: 0 },   // p = position sur le chemin (0 = début, 1 = fin)
  { nom: "Liurnia", p: 0.5 },
  { nom: "Caelid", p: 1 },
];
/* ==================== */

const NS = "http://www.w3.org/2000/svg";

export function createMedia(chapitre) {
  const fond = chapitre.medias.find((x) => x.nom === "fond");

  // Un texte pour chaque région du JSON
  const textes = chapitre.regions
    .map(
      (region) => `
      <div class="ch4-texte">
        <h3>${region.nom}</h3>
        <p>${region.texte}</p>
      </div>`
    )
    .join("");

  return `
    <img class="ch4-fond" src="${fond.src}" alt="${fond.alt}" aria-hidden="true" />

    <h2 class="ch4-titre">${chapitre.titre}</h2>

    <svg id="ch4-svg" viewBox="0 0 1200 600" aria-label="Trajet du Sans-éclat">
      <path class="ch4-chemin-fond"
        d="M120,430 C260,540 330,200 520,160 C700,140 780,470 940,440 C1040,420 1090,340 1090,270" />
      <path id="ch4-chemin"
        d="M120,430 C260,540 330,200 520,160 C700,140 780,470 940,440 C1040,420 1090,340 1090,270" />
      <circle id="ch4-marqueur" cx="0" cy="0" r="14" />
    </svg>

    <div class="ch4-textes">${textes}</div>`;
}

export function animate(section, chapter) {
  const svg = section.querySelector("#ch4-svg");
  const chemin = section.querySelector("#ch4-chemin");
  const marqueur = section.querySelector("#ch4-marqueur");
  const fond = section.querySelector(".ch4-fond");
  const textes = section.querySelectorAll(".ch4-texte");
  const longueur = chemin.getTotalLength();

  // Un point et un nom pour chaque région, placés sur le chemin
  const etiquettes = REGIONS.map((region) => {
    const pt = chemin.getPointAtLength(longueur * region.p);

    const point = document.createElementNS(NS, "circle");
    point.setAttribute("class", "ch4-point");
    point.setAttribute("cx", pt.x);
    point.setAttribute("cy", pt.y);
    point.setAttribute("r", 10);
    svg.insertBefore(point, marqueur);

    const nom = document.createElementNS(NS, "text");
    nom.setAttribute("class", "ch4-etiquette");
    nom.setAttribute("x", pt.x);
    nom.setAttribute("y", pt.y - 28);
    nom.textContent = region.nom;
    svg.insertBefore(nom, marqueur);

    return nom;
  });

  // Départ : le trait doré est invisible et le marqueur est au début du chemin
  const depart = chemin.getPointAtLength(0);
  gsap.set(chemin, { strokeDasharray: longueur, strokeDashoffset: longueur });
  gsap.set(marqueur, { x: depart.x, y: depart.y });
  gsap.set(fond, { scale: ZOOM_FOND_DEPART });

  // Affiche le texte de la région (et allume les noms déjà visités)
  let actif = -1;
  function afficher(i) {
    if (i === actif) return;
    actif = i;
    textes.forEach((texte, n) => {
      gsap.to(texte, {
        opacity: n === i ? 1 : 0,
        y: n === i ? 0 : 15,
        duration: 0.5,
        overwrite: true,
      });
    });
    etiquettes.forEach((nom, n) => nom.classList.toggle("actif", n <= i));
  }
  afficher(0);

  // La section reste épinglée, et le défilement dirige tout
  const tl = gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: {
      trigger: section,
      start: "top top",
      end: "+=" + DISTANCE_SCROLL,
      pin: true,
      scrub: true,
      anticipatePin: 1,
      onUpdate: (self) => {
        // Région la plus proche du marqueur
        const i = self.progress < 0.25 ? 0 : self.progress < 0.75 ? 1 : 2;
        afficher(i);
      },
    },
  });

  // Le marqueur suit le chemin et le trait doré se dessine
  tl.to(marqueur, { motionPath: { path: chemin }, duration: 1 }, 0);
  tl.to(chemin, { strokeDashoffset: 0, duration: 1 }, 0);

  // La carte en fond monte doucement en zoomant, comme si on voyageait dessus
  tl.fromTo(
    fond,
    { scale: ZOOM_FOND_DEPART, objectPosition: "50% 85%" },
    { scale: ZOOM_FOND_FIN, objectPosition: "50% 55%", duration: 1 },
    0
  );
}