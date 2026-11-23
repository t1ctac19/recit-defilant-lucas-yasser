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
            markers: true
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
// Tu peux ajouter les autres plugins au besoin
gsap.registerPlugin(ScrollTrigger);
