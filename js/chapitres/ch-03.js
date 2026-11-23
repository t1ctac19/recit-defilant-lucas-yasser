import { gsap, ScrollTrigger } from "../main.js";

export function animate(section, chapter) {
  const nuage_01 = section.querySelector("#nuage_01");
  const nuage_02 = section.querySelector("#nuage_02");
  const nuage_03 = section.querySelector("#nuage_03");
  const nuage_04 = section.querySelector("#nuage_04");
  const texte = section.querySelector(".ch3-texte");

  const anim = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "top top",
      end: "+=2000",
      scrub: 1,
      pin: true,
      markers: true,
    },
  });

  anim.from(
    texte,
    {
      x: 2000,
      y: 0,
      opacity: 0,
      duration: 1,
    },
    0,
  );

  anim.to(
    nuage_01,
    {
      x: -1000,
      y: -500,
      opacity: 0,
      duration: 1,
    },
    0,
  );

  anim.to(
    nuage_02,
    {
      x: 1000,
      y: -500,
      opacity: 0,
      duration: 1,
    },
    0,
  );

  anim.to(
    nuage_03,
    {
      x: 1000,
      y: 500,
      opacity: 0,
      duration: 1,
    },
    0,
  );

  anim.to(
    nuage_04,
    {
      x: -1000,
      y: 500,
      opacity: 0,
      duration: 1,
    },
    0,
  );
}
