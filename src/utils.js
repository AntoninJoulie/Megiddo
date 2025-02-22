export const playSound = (sound, volume) => {
  const audio = new Audio(sound);
  audio.volume = volume;
  audio.play();
};

export const generateStars = (count) => {
  const starsContainer = document.querySelector(".stars-container");
  for (let i = 0; i < count; i++) {
    const star = document.createElement("div");
    const size = Math.random() * 3 + 1; // Taille aléatoire entre 1px et 4px
    star.classList.add("star");
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.top = `${Math.random() * 100}vh`;
    star.style.left = `${Math.random() * 100}vw`;
    star.style.animationDuration = `${Math.random() * 3 + 2}s`; // Durée d'animation aléatoire entre 2s et 5s
    starsContainer.appendChild(star);
  }
};

export const generateShootingStar = () => {
  const starsContainer = document.querySelector(".stars-container");
  const shootingStar = document.createElement("div");
  const size = Math.random() * 3 + 1; // Taille aléatoire entre 1px et 4px
  shootingStar.classList.add("shooting-star");
  shootingStar.style.width = `${size}px`;
  shootingStar.style.height = `${size}px`;

  // Déterminez aléatoirement la position de départ et la direction de l'étoile filante
  const startX = Math.random() * 100; // Position de départ aléatoire entre 0vw et 100vw
  const startY = Math.random() * -20; // Position de départ aléatoire au-dessus de l'écran
  const endX = startX + (Math.random() * 40 - 20); // Position de fin aléatoire pour un angle de chute
  const endY = 100 + Math.random() * 20; // Position de fin aléatoire en dessous de l'écran
  const duration = Math.random() * 1 + 0.5; // Durée aléatoire entre 0.5s et 1.5s

  shootingStar.style.top = `${startY}vh`;
  shootingStar.style.left = `${startX}vw`;
  shootingStar.style.setProperty("--end-x", `${endX}vw`);
  shootingStar.style.setProperty("--end-y", `${endY}vh`);
  shootingStar.style.animation = `shooting ${duration}s linear`;

  starsContainer.appendChild(shootingStar);

  setTimeout(() => {
    starsContainer.removeChild(shootingStar);
  }, duration * 1000); // Durée de l'animation de l'étoile filante
};
