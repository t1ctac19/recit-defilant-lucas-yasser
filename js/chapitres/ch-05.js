import { gsap, ScrollTrigger } from "../main.js";

export function createMedia(chapter) {
  // Vos données : chapter.contenu (ex. chapter.contenu.sprite)
  const godrick = section.querySelector("#godrick");
  const renala = section.querySelector("#renala");
  const malenia = section.querySelector("#malenia");
  return ``;
}

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


  // gsap.set(".ch5-illustration", {
  //     transformStyle: "preserve-3d",
  //     transformPerspective: 1000
  // });
  // gsap.set(".ch5-image-front", {
  //     transformStyle: "preserve-3d",
  //     transformOrigin: "50% 50%",
  // });
  // gsap.set(".ch5-image-back", {
  //     rotationY: 180, rotationZ: 180
  // });

  // const timing = 1;

  // const tl = gsap.timeline({ paused: true });
  // tl.to(".qf-card", { rotationX: "+=180", duration: timing });
  // tl.to(".quickflip", { z: 50, duration: timing/2, yoyo: true, repeat: 1 }, 0);

  // gsap.utils.toArray(".quickflip").forEach(flip => {
  //     flip.addEventListener("click", event => {
  //       tl.play();
  //     });
  //     // flip.addEventListener("mouseenter", event => tl.play());
  //     // flip.addEventListener("mouseleave", event => tl.reverse());
  // });

  // control + é pour décommenter/commenter
}
// Tu peux ajouter les autres plugins au besoin
gsap.registerPlugin(ScrollTrigger);
