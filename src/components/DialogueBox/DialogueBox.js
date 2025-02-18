import React, { useState, useEffect, useCallback } from 'react';
import './DialogueBox.css';
import typewriterSound from '../../assets/sounds/typewriter.mp3';
import clickSound from '../../assets/sounds/click.mp3';
import Choices from '../Choices/Choices';

const DialogueBox = ({ showDialogue, dialogues, currentDialogue, onNextDialogue, useInfernalFont }) => {
  const [displayedText, setDisplayedText] = useState(''); // État pour le texte affiché
  const [isComplete, setIsComplete] = useState(false); // État pour savoir si le texte est complètement affiché
  const [isDialogueVisible, setIsDialogueVisible] = useState(false); // État pour savoir si la boîte de dialogue est visible
  const [disableNext, setDisableNext] = useState(false); // État pour désactiver temporairement les gestionnaires de clic et de pression de touche

  useEffect(() => {
    if (showDialogue) {
      const text = dialogues[currentDialogue].text; // Texte du dialogue actuel
      setDisplayedText(''); // Réinitialiser le texte affiché
      setIsComplete(false); // Réinitialiser l'état de complétion
      setIsDialogueVisible(false); // Réinitialiser la visibilité de la boîte de dialogue
      setDisableNext(false); // Réinitialiser l'état de désactivation des gestionnaires
      let index = 0; // Index pour parcourir le texte
      const audio = new Audio(typewriterSound); // Son de la machine à écrire
      audio.volume = 0.2; // Baisser le volume de l'écriture

      // Intervalle pour afficher le texte lettre par lettre
      const interval = setInterval(() => {
        setDisplayedText((prev) => {
          const nextText = text.slice(0, index + 1); // Prochaine lettre à afficher
          index++;
          if (index <= text.length) {
            audio.currentTime = 0; // Rewind to the start
            audio.play(); // Jouer le son de la machine à écrire
          }
          if (index === text.length) {
            clearInterval(interval); // Arrêter l'intervalle lorsque le texte est complètement affiché
            setIsComplete(true); // Marquer le texte comme complètement affiché
            setIsDialogueVisible(true); // Rendre la boîte de dialogue visible
          }
          return nextText;
        });
      }, 50); // Vitesse accélérée (50ms par lettre)

      return () => clearInterval(interval); // Nettoyer l'intervalle lorsque le composant est démonté
    }
  }, [showDialogue, dialogues, currentDialogue]);

  const handleChoiceSelect = (choice) => {
    setDisableNext(true); // Désactiver temporairement les gestionnaires de clic et de pression de touche
    onNextDialogue(choice);
  };

  // Gestionnaire de clic pour passer au dialogue suivant
  const handleNextClick = useCallback(() => {
    if (!isDialogueVisible || dialogues[currentDialogue].choices || disableNext) return;

    const clickAudio = new Audio(clickSound); // Son de clic
    clickAudio.volume = 0.2; // Baisser le volume du clic
    clickAudio.play(); // Jouer le son de clic
    onNextDialogue(); // Appeler la fonction pour passer au dialogue suivant
  }, [onNextDialogue, isDialogueVisible, dialogues, currentDialogue, disableNext]);

  useEffect(() => {
    // Gestionnaire de pression de touche pour passer au dialogue suivant avec la barre d'espace
    const handleKeyPress = (event) => {
      if (event.code === 'Space') {
        handleNextClick();
      }
    };

    document.addEventListener('keydown', handleKeyPress); // Ajouter l'écouteur d'événement pour la pression de touche
    document.addEventListener('click', handleNextClick); // Ajouter l'écouteur d'événement pour le clic

    return () => {
      document.removeEventListener('keydown', handleKeyPress); // Retirer l'écouteur d'événement pour la pression de touche
      document.removeEventListener('click', handleNextClick); // Retirer l'écouteur d'événement pour le clic
    };
  }, [handleNextClick]);

  return (
    showDialogue && (
      <>
        <div className={`dialogue-box ${useInfernalFont ? 'special-font' : ''}`}>
          <p>{displayedText}</p>
          {isComplete && !dialogues[currentDialogue].choices && (
            <div className="dialogue-triangle"></div> // Afficher le triangle lorsque le texte est complètement affiché et qu'il n'y a pas de choix
          )}
        </div>
        {isComplete && dialogues[currentDialogue].choices && ( // Afficher les choix si disponibles
          <div className="choices-wrapper">
            <Choices
              choices={dialogues[currentDialogue].choices} // Remplacez par les choix appropriés
              onChoiceSelect={handleChoiceSelect}
            />
          </div>
        )}
      </>
    )
  );
};

export default DialogueBox;