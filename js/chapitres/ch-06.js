import { gsap } from "../main.js";

/* ===== RÉGLAGES ===== */
const URL_API = "https://eldenring.fanapis.com/api/";
const EPINGLER = true;        // true = la section reste bloquée pendant le compte
const DISTANCE_SCROLL = 1500; // pixels de défilement pendant que la section est bloquée
const LISSAGE = 0.6;          // petit retard pour que ce soit fluide

// Chiffres choisis pour l'histoire : ils remplacent ceux de l'API
const CHIFFRES_FORCES = { armures: 60 };

// Chiffres utilisés si l'API ne répond pas
const SECOURS = { bosses: 100, armes: 300, armures: 60 };
/* ==================== */

export function createMedia(chapitre) {
  // Un chiffre avec sa barre pour chaque entrée du JSON
  const chiffres = chapitre.chiffres
    .map(
      (c) => `
      <div class="ch6-chiffre">
        <span class="ch6-nombre" data-cle="${c.cle}">0</span>
        <span class="ch6-etiquette">${c.etiquette}</span>
        <div class="ch6-barre"><div class="ch6-barre-remplie" data-cle="${c.cle}"></div></div>
      </div>`
    )
    .join("");

  return `
    <h2 class="ch6-titre">${chapitre.titre}</h2>
    <p class="ch6-intro">${chapitre.textes[0]}</p>
    <div class="ch6-chiffres">${chiffres}</div>`;
}

// Demande à l'API combien il y a d'éléments dans une liste (boss, armes, armures)
async function demanderTotal(liste) {
  const reponse = await fetch(URL_API + liste + "?limit=1");
  const json = await reponse.json();
  return json.total;
}

// Récupère les 3 chiffres. Si ça échoue, on utilise ceux de secours.
async function chargerDonnees() {
  let valeurs;

  try {
    valeurs = {
      bosses: await demanderTotal("bosses"),
      armes: await demanderTotal("weapons"),
      armures: await demanderTotal("armors"),
    };
  } catch (erreur) {
    console.warn("L'API ne répond pas, on utilise les chiffres de secours.", erreur);
    valeurs = SECOURS;
  }

  // Nos chiffres choisis remplacent ceux de l'API
  return { ...valeurs, ...CHIFFRES_FORCES };
}

export function animate(section, chapter) {
  const nombres = section.querySelectorAll(".ch6-nombre");
  const barres = section.querySelectorAll(".ch6-barre-remplie");

  let valeurs = null;              // rempli quand l'API a répondu
  const etat = { progression: 0 }; // 0 = tout à zéro, 1 = tout à sa valeur

  // Met à jour les chiffres et les barres selon la progression
  function mettreAJour() {
    if (!valeurs) return;

    // La plus grande valeur donne une barre pleine, les autres sont proportionnelles
    const maximum = Math.max(...Object.values(valeurs));

    nombres.forEach((nombre) => {
      const valeur = valeurs[nombre.dataset.cle] * etat.progression;
      nombre.textContent = Math.round(valeur);
    });

    barres.forEach((barre) => {
      const part = valeurs[barre.dataset.cle] / maximum;
      gsap.set(barre, { scaleX: part * etat.progression });
    });
  }

  // IntersectionObserver : on charge les données quand la section approche de l'écran
  const observateur = new IntersectionObserver(
    async (entrees) => {
      if (!entrees[0].isIntersecting) return;

      observateur.disconnect(); // une seule fois
      valeurs = await chargerDonnees();
      mettreAJour();
    },
    { rootMargin: "300px" }
  );
  observateur.observe(section);

  // Le défilement fait avancer la progression (vers l'avant et vers l'arrière)
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "top top",
      end: "+=" + DISTANCE_SCROLL,
      pin: EPINGLER,
      scrub: LISSAGE,
    },
  });

  tl.to(etat, { progression: 1, ease: "none", onUpdate: mettreAJour });
}