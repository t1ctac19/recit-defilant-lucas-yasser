import { gsap, ScrollTrigger } from "../main.js";


export function createMedia(chapter) {
  // Vos données : chapter.contenu (ex. chapter.contenu.sprite)
  return ``;
}
 
// Appelée par main.js, une fois tout le HTML dans la page.
// section : l'élément <section> de ce chapitre.
export function animate(section, chapter) {
  // Vos animations ici : IntersectionObserver, GSAP...
  // Cherchez vos éléments DANS la section :
  // section.querySelector(".foret")
 }
// Tu peux ajouter les autres plugins au besoin
gsap.registerPlugin(ScrollTrigger);