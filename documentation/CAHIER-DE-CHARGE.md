# Cahier de charges : le voyage du Sans-éclat

**Équipe** : Lucas Bonneau, Yasser El Fantroussi

**Thème** : Fiction

**Brainstorm** : [[lien](https://www.figma.com/board/A502H3KoZy0xZH7dhs0h3g/Untitled?node-id=0-1&p=f&t=LZ50chTnVDOTuyO0-0)]

**Storyboard Figma** : [[lien](https://www.figma.com/design/8ZPICx1lLxAGcWCSsqj7r7/stroyboard_yassser_lucas?node-id=0-1&t=FiNFHj4odoaWnwVK-1)]

## 1. Le concept

Notre récit raconte l'univers d'Elden Ring en défilant, du Bris jusqu'au trône du Sans-éclat. On passe d'une région à l'autre, on croise les demi-dieux, et petit à petit on comprend pourquoi ce monde est en ruines. Ce qu'on veut que le visiteur retienne, c'est que chaque lieu cache un bout d'une grande tragédie, et qu'on la découvre en avançant. Il s'adresse autant aux joueurs curieux qu'aux gens qui n'ont jamais touché au jeu et qui veulent juste comprendre l'histoire.

**En une phrase** : Un voyage à travers les Terres Intermédiaires, du Bris du monde jusqu'au trône du Sans-éclat.

## 2. Le storyboard

Storyboard Figma : [[lien](https://www.figma.com/design/8NE1MUtrjDL1hky7W0ijuq/canvas?node-id=10-42&t=2HRnbHMyvdZg1sDN-0)]

Le récit commence dans le calme, devant l'Arbre-Monde qui brille au loin, puis l'Anneau d'Elden se brise et le Sans-éclat revient d'exil pour traverser les régions et affronter les demi-dieux. Le point culminant est la fin : l'Arbre-Monde passe du gris à l'or et le Sans-éclat prend le trône. Le storyboard compte 7 cadres desktop (un par chapitre) et 2 cadres mobiles (chapitres 4 et 7).

## 3. Les chapitres

| # | Titre | Ce que le chapitre raconte | Animation signature | Technique | Médias | Responsable |
|---|---|---|---|---|---|---|
| 1 | L'Arbre-Monde | Un monde calme, avec l'Arbre-Monde qui brille au loin. | Parallaxe des 3 plans au défilement | CSS au défilement | Image en calques, 3 plans | [Prénom A] |
| 2 | Le Bris | L'Anneau d'Elden se brise et le monde sombre. | Paragraphes qui glissent et apparaissent un à un | IntersectionObserver | Une illustration | [Prénom A] |
| 3 | Le Sans-éclat | Le héros revient d'exil, sans lumière, avec une mission. | Silhouette qui apparaît en fondu au défilement | CSS au défilement | Une silhouette | [Prénom A] |
| 4 | Le voyage | Le Sans-éclat traverse 3 régions : Limgrave, Liurnia, Caelid. | Marqueur qui se déplace sur une carte épinglée | GSAP + ScrollTrigger (épinglé n° 1) | Carte du monde | [Prénom A] |
| 5 | Les demi-dieux | Il affronte 3 boss : Godrick, Rennala, Malenia. | Cartes de boss qui apparaissent en fondu, une après l'autre | CSS au défilement | 3 portraits | [Prénom B] |
| 6 | Le bilan du voyage | Des chiffres sur le voyage : boss vaincus, armes obtenues, armures obtenues. | Chiffres qui comptent de 0 jusqu'à leur valeur | IntersectionObserver | Aucun (dataviz) | [Prénom B] |
| 7 | Le trône | Le Sans-éclat devient Seigneur d'Elden et prend le trône. | Arbre-Monde en SVG qui passe de gris à doré, puis le trône apparaît | GSAP + ScrollTrigger (épinglé n° 2) | SVG préparé pour GSAP | [Prénom B] |

Vérification : chaque technique (CSS au défilement, GSAP + ScrollTrigger, IntersectionObserver) apparaît au moins une fois.

## 4. La matrice de responsabilités

| Élément | Responsable | Ce que ça comprend |
|---|---|---|
| Chapitres 1 à 4 | [Prénom A] | Contenu, intégration, animations |
| Chapitres 5 à 7 | [Prénom B] | Contenu, intégration, animations |
| Média animable 1 : image en calques | [Prénom A] | Préparation et intégration |
| Média animable 2 : SVG préparé pour GSAP | [Prénom B] | Préparation et intégration |
| Composant Vue : barre de progression | [Prénom A] | Barre fixe en haut de la page qui se remplit selon le défilement |
| *Fetch* externe et dataviz | [Prénom B] | Récupérer les données de l'API et les afficher au chapitre 6 |
| Chargement des chapitres (JSON) | [Prénom A] | Lire le fichier JSON et afficher les chapitres |
| Structure commune (HTML, CSS de base, mise en page) | Ensemble | |

## 5. Le modèle de données

Un exemple d'objet chapitre, tel qu'il sera dans notre fichier JSON (exemple) :

```json
{
  "id": 1,
  "titre": "L'Arbre-Monde",
  "texte": "Au début, tout est paisible dans les Terres Intermédiaires...",
  "medias": [
    { "type": "image", "src": "assets/images/arbre-monde-ciel.webp", "alt": "L'Arbre-Monde doré dans un ciel gris" },
    { "type": "image", "src": "assets/images/arbre-monde-falaises.webp", "alt": "Falaises dans la brume" },
    { "type": "image", "src": "assets/images/arbre-monde-ruines.webp", "alt": "Ruines au premier plan" }
  ]
}
```

On garde les propriétés de base (id, titre, texte, medias) parce qu'elles suffisent pour afficher chaque chapitre. Le chapitre 6 aura un tableau `medias` vide, puisque ses chiffres viennent de l'API.

## 6. La dataviz

- **Chapitre** : 6
- **La question** à laquelle le moment répond : combien de boss, d'armes et d'armures le Sans-éclat a-t-il vaincus et ramassés avant d'arriver au trône?
- **Genre de données souhaitées** : des statistiques d'une partie d'Elden Ring (boss vaincus, armes obtenues, armures obtenues)
- **La forme imaginée** : 3 chiffres géants qui comptent de 0 jusqu'à leur valeur, chacun avec son étiquette
- **Ce qu'elles racontent dans le récit** : les chiffres montrent le chemin parcouru par le Sans-éclat juste avant la fin. Plus ils sont grands, plus la prise du trône semble méritée.
- **Pistes d'API, si vous en avez trouvé** : 
## 7. L'inventaire des médias

| Média | Chapitre | Source (produit, banque, IA) | Format | Responsable |
|---|---|---|---|---|
| Image en calques (3 plans) | 1 | IA | WebP ou PNG transparent | [Prénom A] |
| Illustration du Bris | 2 | IA | WebP | [Prénom A] |
| Silhouette du Sans-éclat | 3 | IA | PNG transparent | [Prénom A] |
| Carte du monde | 4 | IA | WebP | [Prénom A] |
| 3 portraits de boss | 5 | IA | WebP | [Prénom B] |
| SVG Arbre-Monde + trône | 7 | ai | SVG | [Prénom B] |

Médias animables choisis :

- [Prénom A] : image en calques, pour le chapitre 1
- [Prénom B] : SVG préparé pour GSAP, pour le chapitre 7

## 8. Les choix technologiques

- **GSAP + ScrollTrigger** : pour les deux sections épinglées (la carte du chapitre 4 et l'Arbre-Monde du chapitre 7), où une animation doit suivre précisément le défilement.
- **Vue.js (CDN)** : pour la barre de progression et pour charger les chapitres depuis le JSON, sans outil de compilation.
- **Hébergement** : [à confirmer]
- **Autres** (Anime.js, Chart.js, etc., s'il y a lieu) :

## 9. Le calendrier de l'équipe (jusqu'au prototype du 13 nov.)

| Semaine | [Prénom] | [Prénom] |
|---|---|---|
| 23 oct. | | |
| 28 oct. | | |
| 4 nov. | | |
| 11 nov. | | |

## 10. Les risques et le plan B

- **Pas d'API pour les statistiques d'Elden Ring.** Plan B : afficher des totaux du jeu (boss, armes, armures) ou utiliser une autre API qui garde l'idée de chiffres qui comptent.
- **L'animation du SVG du chapitre 7 prend trop de temps.** Plan B : on anime seulement la couleur (gris vers doré) et on fait apparaître le trône d'un coup.
- **La carte épinglée du chapitre 4 est trop complexe, surtout sur mobile.** Plan B : le marqueur ne passe que par 2 régions, ou on remplace l'épinglage par un simple défilement.
