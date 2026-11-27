// GSAP Core
import { gsap } from "https://esm.sh/gsap@3.12.5";

// Plugins gratuits
import { Flip } from "https://esm.sh/gsap@3.12.5/Flip";
import { MotionPathPlugin } from "https://esm.sh/gsap@3.12.5/MotionPathPlugin";
import { Observer } from "https://esm.sh/gsap@3.12.5/Observer";
import { ScrollTrigger } from "https://esm.sh/gsap@3.12.5/ScrollTrigger";
import { ScrollToPlugin } from "https://esm.sh/gsap@3.12.5/ScrollToPlugin";
import { TextPlugin } from "https://esm.sh/gsap@3.12.5/TextPlugin";
import { createNavigation } from "./navigation.js";
import { createProgression } from "./progression.js";

// Enregistrement de tous les plugins
gsap.registerPlugin(
  Flip,
  MotionPathPlugin,
  Observer,
  ScrollTrigger,
  ScrollToPlugin,
  TextPlugin
);

// Exportation de la librairie GSAP pour qu'elle puisse être utilisée dans les autres fichiers JavaScript
export {
  gsap,
  Flip,
  MotionPathPlugin,
  Observer,
  ScrollTrigger,
  ScrollToPlugin,
  TextPlugin,
};
export default gsap;

import * as ch01 from "./chapitres/ch-01.js";
import * as ch02 from "./chapitres/ch-02.js";
import * as ch03 from "./chapitres/ch-03.js";
import * as ch04 from "./chapitres/ch-04.js";
import * as ch05 from "./chapitres/ch-05.js";
import * as ch06 from "./chapitres/ch-06.js";
import * as ch07 from "./chapitres/ch-07.js";

// Modules des chapitres, dans le même ordre que les entrées de data.json
const modules = [ch01, ch02, ch03, ch04, ch05, ch06, ch07];

window.addEventListener("DOMContentLoaded", async () => {
  // 1. Lecture des données des chapitres depuis le fichier JSON
  let chapitres;
  try {
    const reponse = await fetch("js/data.json");
    chapitres = await reponse.json();
  } catch (erreur) {
    console.error("Impossible de lire js/data.json", erreur);
    return;
  }

  // 2. Construction d'une section HTML par chapitre à partir du JSON
  const recit = document.querySelector("#recit");

  chapitres.forEach((chapitre, i) => {
    if (!modules[i]) return; // aucune entrée sans module correspondant

    const section = document.createElement("section");
    section.className = "chapitre";
    section.id = "chapitre" + chapitre.id;
    section.innerHTML = modules[i].createMedia(chapitre);
    recit.appendChild(section);
  });

  // 3. Attente du décodage des images pour que GSAP mesure les bonnes dimensions
  const images = [...recit.querySelectorAll("img")];
  await Promise.all(images.map((img) => img.decode().catch(() => {})));

  // 4. Le HTML est en place : lancement de l'animation de chaque chapitre
  chapitres.forEach((chapitre, i) => {
    const section = document.querySelector("#chapitre" + chapitre.id);
    if (section) {
      modules[i]?.animate?.(section, chapitre);
    }
  });

  // 5. Menu de navigation et barre de progression, construits à partir des chapitres présents dans la page
  const chaptersNodeList = document.querySelectorAll(".chapitre");

  const chaptersArr = Array.from(chaptersNodeList).map((section) => ({
    id: section.id,
    titre: section.querySelector("h2").textContent,
  }));

  window.nav = createNavigation(chaptersArr);
  window.progression = createProgression();
});

// Charge la liste des projets depuis le fichier JSON
async function loadProjects() {
  const response = await fetch("js/data.json");
  return response.json();
}