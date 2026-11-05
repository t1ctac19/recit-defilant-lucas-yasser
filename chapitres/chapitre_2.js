// Animation test GSAP (sans ScrollTrigger)
// Les paragraphes glissent du bas et apparaissent un à un
gsap.from(".ch2-paragraphe", {
    y: 80,
    opacity: 0,
    duration: 1,
    ease: "power2.out",
    stagger: 0.6   // un paragraphe après l'autre
});