import { gsap, ScrollTrigger } from "../main.js";

gsap.registerPlugin(ScrollTrigger);

/* ===== RÉGLAGES : change ces chiffres pour tester ===== */
const DECALAGE_FOND = 0.5;    // de combien le fond monte pendant tout le chapitre (en hauteurs d'écran). Plus petit = plus lent
const GLISSE_BOITE = 40;      // de combien les boîtes glissent à gauche et à droite (en px)
const INCLINAISON = 2;        // de combien les boîtes s'inclinent (en degrés)
const PROFONDEUR_TEXTE = 80;  // de combien le texte bouge par rapport à sa boîte (en px)
/* ====================================================== */

export function createMedia(chapter) {
  return ``;
}

export function animate(section, chapter) {
  // ----- Le fond -----
  const fond = section.querySelector(".ch2-fond");

  // L'image est plus haute que l'écran, juste assez pour pouvoir monter
  fond.style.height = (1 + DECALAGE_FOND) * 100 + "vh";

  // Le fond monte doucement du début à la fin du chapitre
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

  // ----- Le logo et le titre (une seule fois) -----
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

  // ----- Les cartes -----
  // Sur petit écran, on bouge moins pour ne pas sortir de l'écran
  const facteur = window.innerWidth < 700 ? 0.4 : 1;

  // Les cartes suivent le défilement, de leur entrée en bas jusqu'à leur sortie en haut
  function reglageScroll(carte) {
    return {
      trigger: carte,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    };
  }

  section.querySelectorAll(".ch2-carte").forEach((carte, i) => {
    const boite = carte.querySelector(".ch2-carte-fond");
    const texte = carte.querySelector(".ch2-paragraphe");

    // Une carte penche d'un côté, la suivante de l'autre
    const sens = i % 2 === 0 ? 1 : -1;

    // La boîte glisse et s'incline depuis son centre
    gsap.fromTo(
      boite,
      { x: -GLISSE_BOITE * sens * facteur, rotation: -INCLINAISON * sens },
      {
        x: GLISSE_BOITE * sens * facteur,
        rotation: INCLINAISON * sens,
        ease: "none",
        scrollTrigger: reglageScroll(carte),
      }
    );

    // Le texte bouge plus vite et dans l'autre sens : ça donne de la profondeur
    gsap.fromTo(
      texte,
      { x: 20 * sens * facteur, y: PROFONDEUR_TEXTE },
      {
        x: -20 * sens * facteur,
        y: -PROFONDEUR_TEXTE,
        ease: "none",
        scrollTrigger: reglageScroll(carte),
      }
    );
  });
}