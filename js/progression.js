// js/progression.js : la barre qui montre où on est dans toute la page
export function createProgression() {
  return Vue.createApp({
    data() {
      return {
        progress: 0, // 0 = tout en haut, 1 = tout en bas
      };
    },

    methods: {
      updateProgress() {
        // Distance totale qu'on peut défiler (les sections épinglées sont comprises)
        const total = document.documentElement.scrollHeight - window.innerHeight;

        // Où on est : scrollY divisé par le total, gardé entre 0 et 1
        this.progress = Math.min(Math.max(window.scrollY / total, 0), 1);
      },
    },

    mounted() {
      window.addEventListener("scroll", this.updateProgress, { passive: true });
      window.addEventListener("resize", this.updateProgress);
      window.addEventListener("load", this.updateProgress);
      this.updateProgress(); // une première fois tout de suite
    },
  }).mount("#barre-progression");
}