import { gsap, ScrollTrigger } from "../main.js";

/* ===== RÉGLAGES : change ces valeurs pour tester ===== */
const DISTANCE_SCROLL = 3500;     // pixels de défilement pendant que la section est épinglée (plus grand = plus lent)
const TRONE_ARRIVE_DE = "droite"; // d'où le trône glisse : "droite", "gauche" ou "bas"
const BRAISES = true;             // true = des braises apparaissent à l'arrivée du trône
const NOMBRE_BRAISES = 22;        // nombre de braises
/* ===================================================== */

// Les états de départ et d'arrivée (les deux doivent avoir les mêmes mots, pour que GSAP les mélange)
const ARBRE_GRIS = "grayscale(1) brightness(0.6)";
const ARBRE_COULEUR = "grayscale(0) brightness(1)";
const CHATEAU_SOMBRE = "brightness(0.45) saturate(0.7)";
const CHATEAU_ECLAIRE = "brightness(0.8) saturate(1)";

// Position de départ du trône, selon le côté choisi
const DEPARTS_TRONE = {
  droite: { xPercent: 150, yPercent: 0 },
  gauche: { xPercent: -150, yPercent: 0 },
  bas: { xPercent: 0, yPercent: 110 },
};

export function createMedia(chapitre) {
  const image = (nom) => {
    const m = chapitre.medias.find((x) => x.nom === nom);
    return `src="${m.src}" alt="${m.alt}"`;
  };

  const textes = chapitre.textes
    .map((texte) => `<div class="ch7-texte"><p>${texte}</p></div>`)
    .join("");

  return `
    <img class="ch7-chateau" ${image("chateau")} aria-hidden="true" />

    <div class="ch7-arbre-zone">
      <img class="ch7-arbre" ${image("arbre")} aria-hidden="true" />
    </div>

    <div class="ch7-braises"></div>

    <div class="ch7-trone-zone">
      <img class="ch7-trone" ${image("trone")} />
    </div>

    <h2 class="ch7-titre">${chapitre.titre}</h2>

    <div class="ch7-textes">${textes}</div>`;
}

// ----- Les braises : des petits points dorés qui montent en continu -----
function creerBraise(conteneur) {
  const braise = document.createElement("span");
  braise.className = "ch7-braise";
  conteneur.appendChild(braise);

  // Chaque braise a sa propre taille, sa vitesse et sa position
  const taille = gsap.utils.random(3, 9);
  const duree = gsap.utils.random(7, 14);

  gsap.set(braise, {
    left: gsap.utils.random(0, 100) + "%",
    width: taille,
    height: taille,
    opacity: 0,
  });

  // Elle monte du bas jusqu'en haut, en boucle
  const montee = gsap.timeline({ repeat: -1, delay: gsap.utils.random(0, duree) });
  montee.fromTo(
    braise,
    { y: 0 },
    { y: -window.innerHeight - 40, duration: duree, ease: "none" },
    0
  );

  // Elle apparaît au début du trajet...
  montee.to(braise, { opacity: gsap.utils.random(0.5, 1), duration: duree * 0.2 }, 0);

  // ...et disparaît vers la fin
  montee.to(braise, { opacity: 0, duration: duree * 0.3 }, duree * 0.7);

  // Pendant ce temps, elle se balance de gauche à droite
  gsap.to(braise, {
    xPercent: gsap.utils.random(-300, 300),
    duration: gsap.utils.random(2, 4),
    yoyo: true,
    repeat: -1,
    ease: "sine.inOut",
  });
}

export function animate(section, chapter) {
  const chateau = section.querySelector(".ch7-chateau");
  const arbre = section.querySelector(".ch7-arbre");
  const trone = section.querySelector(".ch7-trone");
  const conteneurBraises = section.querySelector(".ch7-braises");
  const textes = section.querySelectorAll(".ch7-texte");

  // Les braises tournent en boucle, mais elles restent invisibles jusqu'à l'arrivée du trône
  const veutBraises =
    BRAISES && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (veutBraises) {
    for (let i = 0; i < NOMBRE_BRAISES; i++) creerBraise(conteneurBraises);
  }

  // ----- Le texte : un seul visible à la fois -----
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
  }
  afficher(0);

  // ----- La timeline : la section reste épinglée, et le défilement dirige tout -----
  // Durée totale : 6.5. Le texte change à 2 et à 4.
  const tl = gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: {
      trigger: section,
      start: "top top",
      end: "+=" + DISTANCE_SCROLL,
      pin: true,
      scrub: true,
      anticipatePin: 1,
    },
    onUpdate: () => {
      const t = tl.time();
      afficher(t < 2 ? 0 : t < 4 ? 1 : 2);
    },
  });

  // Pendant tout le chapitre : le château recule et s'éclaire doucement
  tl.fromTo(chateau, { scale: 1.12 }, { scale: 1, duration: 6.5 }, 0);
  tl.fromTo(chateau, { filter: CHATEAU_SOMBRE }, { filter: CHATEAU_ECLAIRE, duration: 6 }, 0);

  // 1. L'Arbre-Monde passe de gris à ses couleurs (de 2 à 4)
  tl.fromTo(
    arbre,
    { filter: ARBRE_GRIS, scale: 0.94 },
    { filter: ARBRE_COULEUR, scale: 1, duration: 2 },
    2
  );

  // 2. Le trône avec le héros glisse dans la scène (de 4 à 5.5)
  tl.fromTo(
    trone,
    { ...DEPARTS_TRONE[TRONE_ARRIVE_DE], opacity: 0 },
    { xPercent: 0, yPercent: 0, opacity: 1, duration: 1.5, ease: "power2.out" },
    4
  );

  // 3. Les braises apparaissent à l'arrivée du trône (de 4.5 à 5.5)
  if (veutBraises) {
    tl.fromTo(conteneurBraises, { opacity: 0 }, { opacity: 1, duration: 1 }, 4.5);
  }

  // Petite pause à la fin, avant de repartir
  tl.set({}, {}, 6.5);
}