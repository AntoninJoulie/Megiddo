import React, { useState, useEffect, useCallback } from 'react';
import './styles/App.css';
import './styles/cosmicBackground.css';
import backgroundMusic from './assets/sounds/background-music.mp3';
import startSound from './assets/sounds/start.mp3';
import Stars from './components/Stars/Stars';
import Message from './components/Message/Message';
import DialogueBox from './components/DialogueBox/DialogueBox';

const dialogues = {
  0: { text: "...", choices: null, next: 1 },
  1: { text: "Hello?", choices: null, next: 2 },
  2: { text: "Do you understand me?", choices: null, next: 3 },
  3: { text: "Do you want to continue?", choices: ["Yes", "No"], next: { Yes: 4, No: 5} },
  4: { text: "Cool", choices: null, next: 6 },
  5: { text: "Not cool", choices: null, next: 6 },
  6: { text: "End of the dialogue", choices: null, next: 0 }
};

function App() {
  const [audio] = useState(new Audio(backgroundMusic)); // État pour l'audio de fond
  const [showMessage, setShowMessage] = useState(false); // État pour afficher le message initial
  const [fadeOut, setFadeOut] = useState(false); // État pour l'animation de fondu
  const [musicStarted, setMusicStarted] = useState(false); // État pour savoir si la musique a commencé
  const [showDialogue, setShowDialogue] = useState(false); // État pour afficher la boîte de dialogue
  const [currentDialogue, setCurrentDialogue] = useState(0); // État pour le dialogue actuel

  // Index des dialogues qui doivent utiliser la police spéciale
  const InfernalFontDialogues = [0, 1, 2]; // Par exemple, les dialogues 2 et 3

  useEffect(() => {
    audio.loop = true; // Boucler la musique de fond
    audio.volume = 0.1; // Réduire le volume de la musique de fond

    // Fonction pour démarrer la musique de fond
    const playMusic = () => {
      if (!musicStarted) {
        const startAudio = new Audio(startSound); // Son de démarrage
        startAudio.volume = 0.4; // Réduire le volume du son de démarrage
        startAudio.play();
        setMusicStarted(true);
        setFadeOut(true);
        setTimeout(() => {
          audio.play(); // Jouer la musique de fond
          setShowMessage(false); // Cacher le message initial
          setTimeout(() => {
            setShowDialogue(true); // Afficher la boîte de dialogue après 5 secondes
          }, 5000);
        }, 2000); // Démarrer la musique de fond 2 secondes après le son de démarrage
      }
      document.removeEventListener('click', playMusic);
      document.removeEventListener('keydown', handleKeyPress);
    };

    // Fonction pour gérer la pression de la touche espace
    const handleKeyPress = (event) => {
      if (event.code === 'Space') {
        playMusic();
      }
    };

    document.addEventListener('click', playMusic);
    document.addEventListener('keydown', handleKeyPress);

    // Afficher le message initial après 10 secondes si la musique n'a pas commencé
    const timer = setTimeout(() => {
      if (!musicStarted) {
        setShowMessage(true); // Afficher le message initial après 10 secondes
      }
    }, 10000);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('click', playMusic);
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [audio, musicStarted]);

  // Fonction pour passer au dialogue suivant
  const handleNextDialogue = useCallback((choice) => {
    setCurrentDialogue((prev) => {
      const next = dialogues[prev].next;
      return typeof next === 'object' ? next[choice] : next;
    });
  }, []);

  return (
    <div className="App">
      <Stars />
      <Message showMessage={showMessage} fadeOut={fadeOut} />
      <DialogueBox
        showDialogue={showDialogue}
        dialogues={dialogues}
        currentDialogue={currentDialogue}
        onNextDialogue={handleNextDialogue}
        useInfernalFont={InfernalFontDialogues.includes(currentDialogue)} // Utiliser la nouvelle police pour les dialogues spécifiés
      />
    </div>
  );
}

export default App;