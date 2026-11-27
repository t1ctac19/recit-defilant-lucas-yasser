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
export function createMedia(chapitre) {
  const image = (nom) => {
    const m = chapitre.medias.find((x) => x.nom === nom);
    return `src="${m.src}" alt="${m.alt}"`;
  };

  // 4 nuages avec la même image
  const nuages = [1, 2, 3, 4]
    .map((n) => `<img class="nuage" id="nuage_0${n}" ${image("nuage")}>`)
    .join("");

  return `
    <div class="ch3-entete">
      <h2 class="ch3-titre">${chapitre.titre}</h2>
    </div>
    <div class="parallax_ch3">
      <img id="sky_ch3" class="calque--ciel-1" ${image("ciel")}>
      <img id="hill_ch3" class="calque proche calque--hill-3" ${image("colline")}>
      <img id="rock_ch3" class="calque devant calque--rock-3" ${image("roches")}>
      <img id="perso_ch3" class="calque premier-plan calque--character-1" ${image("personnage")}>
      <div class="ch3-texte">
        <p class="ch3-paragraphe">${chapitre.textes[0]}</p>
      </div>
      ${nuages}
    </div>`;
}