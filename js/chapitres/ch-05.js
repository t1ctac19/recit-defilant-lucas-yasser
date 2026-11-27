import { gsap, ScrollTrigger } from "../main.js";


// Appelée par main.js, une fois tout le HTML dans la page.
// section : l'élément <section> de ce chapitre.
export function animate(section, chapter) {
  // Vos animations ici : IntersectionObserver, GSAP...
  // Cherchez vos éléments DANS la section :
  // section.querySelector(".foret")
    const godrick = section.querySelector("#godrick");
    const renala = section.querySelector("#renala");
    const malenia = section.querySelector("#malenia");

  const anim = gsap.timeline({
        scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=4000",
            scrub: 1,
            pin: true,
        }
    });

    anim.from(godrick, {
        x: 1000,
        opacity: 0,
        duration: 1
    });

    anim.from(renala, {
        x: 1000,
        opacity: 0,
        duration: 1
    });

    anim.from(malenia, {
        x: 1000,
        opacity: 0,
        duration: 1
    });
    

  // control + é pour décommenter/commenter
}
export function createMedia(chapitre) {
  // Un bloc pour chaque boss du JSON
  const boss = chapitre.boss
    .map(
      (b) => `
      <div id="${b.id}">
        <p class="ch5-illustration-titre">${b.nom}</p>
        <img src="${b.image}" alt="${b.nom}" class="ch5-image-front" />
        <p class="ch5-paragraphe">${b.texte}</p>
      </div>`
    )
    .join("");

  return `
    <h2 class="ch5-titre">${chapitre.titre}</h2>
    <div class="ch5-illustration">${boss}</div>
    <div class="ch5-textes"></div>`;
}
// Tu peux ajouter les autres plugins au besoin
gsap.registerPlugin(ScrollTrigger);
