import { gsap, ScrollTrigger } from "../main.js";

/* ===== RÉGLAGES ===== */
const URL_API = "https://eldenring.fanapis.com/api/";
const EPINGLER = true;        // true = la section reste bloquée pendant le compte, false = elle défile normalement
const DISTANCE_SCROLL = 1500; // pixels de défilement pendant que la section est bloquée (plus grand = plus lent)
const LISSAGE = 0.6;          // petit retard pour que ce soit fluide (0 = collé à la molette)

// Chiffres choisis pour l'histoire : ils remplacent ceux de l'API
const CHIFFRES_FORCES = { armures: 60 };

// Chiffres d'exemple, utilisés seulement si l'API ne répond pas. À REMPLACER.
const SECOURS = { bosses: 100, armes: 300, armures: 60 };
/* ==================== */

export function createMedia(chapter) {
  return ``;
}

// Demande à l'API combien il y a d'éléments dans une liste
async function demanderTotal(liste) {
  const reponse = await fetch(`${URL_API}${liste}?limit=1`);
  const json = await reponse.json();
  return json.total ?? json.count;
}

// Récupère les 3 totaux. Si quelque chose échoue, on garde les valeurs de secours.
async function chargerDonnees() {
  let valeurs;
  try {
    const [bosses, armes, armures] = await Promise.all([
      demanderTotal("bosses"),
      demanderTotal("weapons"),
      demanderTotal("armors"),
    ]);
    if (!bosses || !armes || !armures) throw new Error("Totaux manquants");
    valeurs = { bosses, armes, armures };
  } catch (erreur) {
    console.warn("API Elden Ring indisponible, valeurs de secours utilisées.", erreur);
    valeurs = SECOURS;
  }
  return { ...valeurs, ...CHIFFRES_FORCES };
}

export function animate(section, chapter) {
  const nombres = section.querySelectorAll(".ch6-nombre");
  const barres = section.querySelectorAll(".ch6-barre-remplie");
  const zone = section.querySelector(".ch6-chiffres");

  let valeurs = null;              // rempli quand l'API a répondu
  const etat = { progression: 0 }; // 0 = tout à zéro, 1 = tout à sa valeur

  // Met à jour les chiffres et les barres selon la progression
  function mettreAJour() {
    if (!valeurs) return; // pas encore de données

    // Le plus grand chiffre = barre pleine, les autres sont proportionnels
    const maximum = Math.max(...Object.values(valeurs));

    nombres.forEach((el) => {
      const valeur = valeurs[el.dataset.cle] * etat.progression;
      el.textContent = Math.round(valeur).toLocaleString("fr-CA");
    });

    barres.forEach((barre) => {
      const part = valeurs[barre.dataset.cle] / maximum;
      gsap.set(barre, { scaleX: part * etat.progression });
    });
  }

  // IntersectionObserver : on charge les données quand la section approche
  const observateur = new IntersectionObserver(
    async (entrees) => {
      if (!entrees[0].isIntersecting) return;
      observateur.disconnect(); // une seule fois
      valeurs = await chargerDonnees();
      mettreAJour();
    },
    { rootMargin: "300px" } // 300 px avant d'arriver dans l'écran
  );
  observateur.observe(section);

  // Réglages du ScrollTrigger : bloqué ou non
  const reglageScroll = EPINGLER
    ? {
        trigger: section,
        start: "top top",                 // dès que la section touche le haut de l'écran
        end: "+=" + DISTANCE_SCROLL,      // elle reste bloquée pendant cette distance
        pin: true,
        anticipatePin: 1,
        scrub: LISSAGE,
      }
    : {
        trigger: zone,
        start: "top 85%",
        end: "center 40%",
        scrub: LISSAGE,
      };

  // La molette dirige la progression (vers l'avant ET vers l'arrière)
  const tl = gsap.timeline({ scrollTrigger: reglageScroll });
  tl.to(etat, { progression: 1, duration: 1, ease: "none", onUpdate: mettreAJour });

  // Quand c'est bloqué : petite pause une fois au maximum, avant de repartir
  if (EPINGLER) {
    tl.to({}, { duration: 0.25 });
  }
}