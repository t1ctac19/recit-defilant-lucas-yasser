gsap.from("#godrick", {
    x: 1000,
    opacity: 0,
    duration: 1,
    ease: "power2.out",
    stagger: 0.6  
});

gsap.from("#renala", {
    x: 10000,
    opacity: 0,
    duration: 5,
    ease: "power2.out",
    stagger: 0.6  
});

gsap.from("#malenia", {
    x: 5000,
    opacity: 0,
    duration: 9,
    ease: "power2.out",
    stagger: 0.6  
});


gsap.set(".ch5-illustration", {
    transformStyle: "preserve-3d",
    transformPerspective: 1000
});
gsap.set(".ch5-image-front", {
    transformStyle: "preserve-3d",
    transformOrigin: "50% 50%",
});
gsap.set(".ch5-image-back", {
    rotationY: 180, rotationZ: 180
});

const timing = 1;

const tl = gsap.timeline({ paused: true });
tl.to(".qf-card", { rotationX: "+=180", duration: timing });
tl.to(".quickflip", { z: 50, duration: timing/2, yoyo: true, repeat: 1 }, 0);

gsap.utils.toArray(".quickflip").forEach(flip => {
    flip.addEventListener("click", event => {
      tl.play();
    });
    // flip.addEventListener("mouseenter", event => tl.play());
    // flip.addEventListener("mouseleave", event => tl.reverse());
});