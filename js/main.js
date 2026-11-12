// GSAP Core
import { gsap } from "https://esm.sh/gsap@3.12.5";

// Plugins gratuits
import { Flip } from "https://esm.sh/gsap@3.12.5/Flip";
import { MotionPathPlugin } from "https://esm.sh/gsap@3.12.5/MotionPathPlugin";
import { Observer } from "https://esm.sh/gsap@3.12.5/Observer";
import { ScrollTrigger } from "https://esm.sh/gsap@3.12.5/ScrollTrigger";
import { ScrollToPlugin } from "https://esm.sh/gsap@3.12.5/ScrollToPlugin";
import { TextPlugin } from "https://esm.sh/gsap@3.12.5/TextPlugin";

// Enregistrement de tous les plugins
gsap.registerPlugin(
  Flip,
  MotionPathPlugin,
  Observer,
  ScrollTrigger,
  ScrollToPlugin,
  TextPlugin
);

// Exportation de la librarie GSAP pour qu'elle puisse être utilisé dans les autres fichiers JavaScript
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

window.addEventListener("DOMContentLoaded", () => {
  const section1 = document.querySelector("#chapitre1");
  if (section1) {
    ch01.animate(section1);
  }

  const section2 = document.querySelector("#chapitre2");
  if (section2) {
    ch02.animate?.(section2);
  }

  const section3 = document.querySelector("#chapitre3");
  if (section3) {
    ch03.animate?.(section3);
  }

  const section4 = document.querySelector("#chapitre4");
  if (section4) {
    ch04.animate?.(section4);
  }
  const section5 = document.querySelector("#chapitre5");
  if (section5) {
    console.log("Chapitre 5 trouvé !");
    ch05.animate?.(section5);
  }
  const section6 = document.querySelector("#chapitre6");
  if (section6) {
    ch06.animate?.(section6);
  }

  const section7 = document.querySelector("#chapitre7");
  if (section7) {
    ch06.animate?.(section7);
  }

});

