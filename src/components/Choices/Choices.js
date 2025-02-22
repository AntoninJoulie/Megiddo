import React, { useState, useEffect, useCallback } from "react";
import "./Choices.css";
import clickSound from "../../assets/sounds/click.mp3"; // Importer le son de clic

const Choices = ({ choices, onChoiceSelect, infernalChoice }) => {
  const [hoveredButton, setHoveredButton] = useState(0); // État pour le bouton survolé par défaut
  const [fadeOut, setFadeOut] = useState(false); // État pour l'effet de fondu
  const [selectedButton, setSelectedButton] = useState(null); // État pour le bouton sélectionné

  const handleButtonClick = useCallback(
    (choice, index) => {
      const clickAudio = new Audio(clickSound); // Créer une nouvelle instance de l'audio
      clickAudio.volume = 0.2; // Régler le volume du son de clic
      clickAudio.play(); // Jouer le son de clic

      setSelectedButton(index); // Définir le bouton sélectionné
      setFadeOut(true); // Activer l'effet de fondu
      setTimeout(() => {
        onChoiceSelect(choice); // Appeler la fonction de sélection de choix après un délai
      }, 500); // Délai pour l'effet de fondu
    },
    [onChoiceSelect]
  );

  const handleButtonHover = useCallback((index) => {
    setHoveredButton(index); // Mettre à jour l'état de survol
  }, []);

  const handleKeyDown = useCallback(
    (event) => {
      if (event.code === "ArrowRight") {
        setHoveredButton((prev) => (prev + 1) % choices.length); // Passer au bouton suivant
      } else if (event.code === "ArrowLeft") {
        setHoveredButton(
          (prev) => (prev - 1 + choices.length) % choices.length
        ); // Passer au bouton précédent
      } else if (event.code === "Space") {
        handleButtonClick(choices[hoveredButton], hoveredButton); // Valider le choix avec la barre d'espace
      }
    },
    [choices, hoveredButton, handleButtonClick]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div className={`choices-container ${fadeOut ? "fade-out" : "fade-in"}`}>
      {choices.map((choice, index) => (
        <button
          key={index}
          className={`choice-button ${hoveredButton === index ? "hover" : ""} ${
            selectedButton === index ? "selected" : ""
          } ${infernalChoice.includes(choice) ? "infernal-font" : ""}`}
          onClick={() => handleButtonClick(choice, index)}
          onMouseEnter={() => handleButtonHover(index)}
        >
          {choice}
        </button>
      ))}
    </div>
  );
};

export default Choices;
