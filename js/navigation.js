// js/navigation.js : étape 1, brancher Vue
export function createNavigation(chaptersArr) {
  return Vue.createApp({
    data() {
      return {
        chapters: chaptersArr,
        activeChapterIndex: 0,
      };
    },
 
    methods: {
      goTo(id) {
        const reduced = window.matchMedia(
          "(prefers-reduced-motion: reduce",
        ).matches;
 
        document.getElementById(id).scrollIntoView({
          behavior: reduced ? "auto" : "smooth",
        });
      },
 
      updateActive() {
        const middle = window.innerHeight / 2;
        this.chapters.forEach((chapter, index) => {
          const section = document.getElementById(chapter.id);
          if (section.getBoundingClientRect().top <= middle) {
            this.activeChapterIndex = index;
          }
        });
      },
    },
        mounted() {
    // À chaque scroll, le navigateur appelle updateWidth
    window.addEventListener("scroll", this.updateActive, {
      passive: true
    } );
    // Et une première fois tout de suite : sinon, width reste à 0
    this.updateActive();
  },
 
  }).mount("#navigation");
}
 