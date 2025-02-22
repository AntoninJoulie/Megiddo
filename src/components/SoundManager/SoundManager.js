import { useEffect, useState } from "react";
import backgroundMusic from "../../assets/sounds/background-music.mp3";
import startSound from "../../assets/sounds/start.mp3";
import {
  backgroundMusicVolume,
  startSoundVolume,
  initialMessageDelay,
  dialogueStartDelay,
} from "../../config";
import { playSound } from "../../utils";

const SoundManager = ({
  musicStarted,
  setMusicStarted,
  setFadeOut,
  setShowMessage,
  setShowDialogue,
  loadingComplete,
}) => {
  const [audio] = useState(new Audio(backgroundMusic)); // État pour l'audio de fond

  useEffect(() => {
    audio.loop = true; // Boucler la musique de fond
    audio.volume = backgroundMusicVolume; // Réduire le volume de la musique de fond

    // Fonction pour démarrer la musique de fond
    const playMusic = () => {
      if (!musicStarted) {
        playSound(startSound, startSoundVolume); // Jouer le son de démarrage
        setMusicStarted(true);
        setFadeOut(true);
        setTimeout(() => {
          audio.play(); // Jouer la musique de fond
          setShowMessage(false); // Cacher le message initial
          setTimeout(() => {
            setShowDialogue(true); // Afficher la boîte de dialogue après 5 secondes
          }, dialogueStartDelay);
        }, 2000); // Démarrer la musique de fond 2 secondes après le son de démarrage
      }
      document.removeEventListener("click", playMusic);
      document.removeEventListener("keydown", handleKeyPress);
    };

    // Fonction pour gérer la pression de la touche espace
    const handleKeyPress = (event) => {
      if (event.code === "Space") {
        playMusic();
      }
    };

    document.addEventListener("click", playMusic);
    document.addEventListener("keydown", handleKeyPress);

    // Afficher le message initial après 10 secondes si la musique n'a pas commencé
    const timer = setTimeout(() => {
      if (!musicStarted) {
        setShowMessage(true); // Afficher le message initial après 10 secondes
      }
    }, initialMessageDelay);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("click", playMusic);
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [
    audio,
    musicStarted,
    setFadeOut,
    setShowMessage,
    setShowDialogue,
    setMusicStarted,
  ]);

  useEffect(() => {
    if (loadingComplete && !musicStarted) {
      playSound(startSound, startSoundVolume); // Jouer le son de démarrage après le chargement
    }
  }, [loadingComplete, musicStarted]);

  return null;
};

export default SoundManager;