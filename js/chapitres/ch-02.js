import { gsap, ScrollTrigger } from "../main.js";

gsap.registerPlugin(ScrollTrigger);

/* ===== RÉGLAGES : change ces chiffres pour tester ===== */
const DECALAGE_FOND = 0.5;    // de combien le fond monte pendant tout le chapitre (en hauteurs d'écran). Plus petit = plus lent
const GLISSE_BOITE = 40;      // de combien les boîtes glissent à gauche et à droite (en px)
const INCLINAISON = 2;        // de combien les boîtes s'inclinent (en degrés)
const PROFONDEUR_TEXTE = 80;  // de combien le texte bouge par rapport à sa boîte (en px)
const NOMBRE_BRAISES = 28;    // nombre de braises qui montent en continu
/* ====================================================== */

export function createMedia(chapter) {
  return ``;
}

// Braises qui montent en continu + logo qui respire
function ajouterAmbiance(section) {
  // Si le visiteur a demandé moins d'animations, on ne fait rien
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const cadre = section.querySelector(".ch2-fond-cadre");

  for (let i = 0; i < NOMBRE_BRAISES; i++) {
    const braise = document.createElement("span");
    braise.className = "ch2-braise";
    cadre.appendChild(braise);

    const taille = gsap.utils.random(3, 9);
    const duree = gsap.utils.random(7, 14);

    gsap.set(braise, {
      left: gsap.utils.random(0, 100) + "%",
      width: taille,
      height: taille,
      opacity: 0,
    });

    // Monte du bas jusqu'en haut, puis recommence (apparaît, brille, disparaît)
    const tl = gsap.timeline({ repeat: -1, delay: gsap.utils.random(0, duree) });
    tl.fromTo(
      braise,
      { y: 0 },
      { y: -window.innerHeight - 40, duration: duree, ease: "none" },
      0
    )
      .to(braise, { opacity: gsap.utils.random(0.5, 1), duration: duree * 0.2 }, 0)
      .to(braise, { opacity: 0, duration: duree * 0.3 }, duree * 0.7);

    // Petit balancement gauche-droite
    gsap.to(braise, {
      xPercent: gsap.utils.random(-300, 300),
      duration: gsap.utils.random(2, 4),
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
    });
  }

  // Le logo respire : sa lueur monte et descend
  const logo = section.querySelector(".ch2-logo");
  gsap.fromTo(
    logo,
    { filter: "drop-shadow(0 0 4px rgba(233, 224, 164, 0.3))" },
    {
      filter: "drop-shadow(0 0 22px rgba(233, 224, 164, 0.95))",
      duration: 2.2,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
    }
  );
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

  // ----- Ambiance : braises et logo (toujours actif) -----
  ajouterAmbiance(section);
}