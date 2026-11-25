import { gsap, ScrollTrigger } from "../main.js";

gsap.registerPlugin(ScrollTrigger);

/* ===== RÉGLAGES : change ces valeurs pour tester ===== */
const DECALAGE_FOND = 0.5;        // de combien le fond monte pendant tout le chapitre (en hauteurs d'écran). Plus petit = plus lent
const CARTES_SE_REFERMENT = true; // true = la carte se referme quand elle sort de l'écran
/* ===================================================== */

export function createMedia(chapter) {
  return ``;
}

// ----- Le fond : il monte plus lentement que la page (parallaxe) -----
function animerFond(section) {
  const fond = section.querySelector(".ch2-fond");

  // L'image est un peu plus haute que l'écran, juste assez pour pouvoir monter
  fond.style.height = (1 + DECALAGE_FOND) * 100 + "vh";

  gsap.to(fond, {
    y: () => -DECALAGE_FOND * window.innerHeight,
    ease: "none",
    scrollTrigger: {
      trigger: section,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      invalidateOnRefresh: true,
    },
  });
}

// ----- Le logo et le titre : ils apparaissent une seule fois -----
function animerEntete(section) {
  gsap.from(section.querySelectorAll(".ch2-logo, .ch2-titre"), {
    y: 40,
    opacity: 0,
    duration: 1.2,
    stagger: 0.2,
    ease: "power3.out",
    scrollTrigger: {
      trigger: section.querySelector(".ch2-entete"),
      start: "top 80%",
      toggleActions: "play none none none",
    },
  });
}

// ----- Les cartes -----

// Coupe un paragraphe en mots (un <span> par mot) pour pouvoir les allumer un à un
function decouperMots(paragraphe) {
  const mots = paragraphe.textContent.trim().split(/\s+/);
  paragraphe.textContent = "";

  return mots.map((mot, i) => {
    const span = document.createElement("span");
    span.textContent = mot;
    span.style.display = "inline-block";
    paragraphe.appendChild(span);

    // On remet l'espace entre les mots
    if (i < mots.length - 1) paragraphe.appendChild(document.createTextNode(" "));
    return span;
  });
}

function animerCartes(section) {
  // Si le visiteur a demandé moins d'animations, les cartes restent telles quelles
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  section.querySelectorAll(".ch2-carte").forEach((carte) => {
    const boite = carte.querySelector(".ch2-carte-fond");
    const texte = carte.querySelector(".ch2-paragraphe");
    const mots = decouperMots(texte);

    // Boîte ouverte : les marges négatives laissent voir l'ombre et le petit losange du haut
    const OUVERTE = "inset(-30% -25% -30% -25%)";
    const FERMEE_AU_CENTRE = "inset(-30% 50% -30% 50%)";
    const FERMEE_EN_LIGNE = "inset(50% -25% 50% -25%)";

    // Un seul défilement par carte, de son entrée en bas jusqu'à sa sortie en haut.
    // Le temps de la timeline va de 0 à 6 pendant ce passage.
    const tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: carte,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    // 1. La boîte s'ouvre depuis le centre (de 0 à 1)
    tl.fromTo(
      boite,
      { clipPath: FERMEE_AU_CENTRE, opacity: 0 },
      { clipPath: OUVERTE, opacity: 1, duration: 1, ease: "power2.out" },
      0
    );

    // 2. Les mots s'allument un à un (de 0.5 à 2.1)
    tl.fromTo(
      mots,
      { opacity: 0.1, y: 10 },
      { opacity: 1, y: 0, duration: 0.3, stagger: { amount: 1.3 } },
      0.5
    );

    // 3. La carte reste entière jusqu'à 4.8, puis elle se referme (de 4.8 à 6)
    if (CARTES_SE_REFERMENT) {
      tl.to(
        boite,
        { clipPath: FERMEE_EN_LIGNE, opacity: 0, duration: 1.2, ease: "power2.in" },
        4.8
      );
      tl.to(
        texte,
        { opacity: 0, y: -30, filter: "blur(4px)", duration: 1, ease: "power2.in" },
        4.8
      );
    }

    // Garde la durée à 6 même si la carte ne se referme pas
    tl.set({}, {}, 6);
  });
}

// ----- Appelée par main.js -----
export function animate(section, chapter) {
  animerFond(section);
  animerEntete(section);
  animerCartes(section);
}