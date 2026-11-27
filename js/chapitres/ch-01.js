import { gsap, ScrollTrigger } from "../main.js";
 
// Appelée par main.js, une fois tout le HTML dans la page.
// section : l'élément <section> de ce chapitre.
export function animate(section, chapter) {
  // Vos animations ici : IntersectionObserver, GSAP...
  // Cherchez vos éléments DANS la section :
  // section.querySelector(".foret")
 }
// Tu peux ajouter les autres plugins au besoin
gsap.registerPlugin(ScrollTrigger);

export function createMedia(chapitre) {
  // Donne src="..." alt="..." pour le média qui porte ce nom dans le JSON
  const image = (nom) => {
    const m = chapitre.medias.find((x) => x.nom === nom);
    return `src="${m.src}" alt="${m.alt}"`;
  };

  return `
    <div class="calque devant ch1-entete">
      <h2 class="ch1-titre">${chapitre.titre}</h2>
    </div>
    <div class="parallax_ch1">
      <img id="sky" class="calque--ciel-1" ${image("ciel")}>
      <img id="tree" class="calque loin calque--arbre-1" ${image("arbre")}>
      <img id="ruins" class="calque milieu calque--ruin-1" ${image("ruines")}>
      <img id="hill" class="calque proche calque--hill-1" ${image("colline")}>
      <img id="rock" class="calque devant calque--rock-1" ${image("roches")}>
      <img id="character" class="calque premier-plan calque--character-1" ${image("personnage")}>
    </div>`;
}