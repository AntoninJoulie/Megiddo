import React, { useState, useEffect, useCallback } from "react";
import "./DialogueBox.css";
import Choices from "../Choices/Choices";
import typewriterSound from "../../assets/sounds/typewriter.mp3";
import clickSound from "../../assets/sounds/click.mp3";
import { typewriterSoundVolume, clickSoundVolume } from "../../config";
import { playSound } from "../../utils";

const DialogueBox = ({
  showDialogue,
  dialogues,
  currentDialogue,
  onNextDialogue,
  useInfernalFont,
  infernalChoice,
  currentText, // Recevoir le texte actuel avec le nom remplacé
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const [isDialogueVisible, setIsDialogueVisible] = useState(false);
  const [disableNext, setDisableNext] = useState(false);

  useEffect(() => {
    if (showDialogue) {
      const text = currentText; // Utiliser le texte actuel
      setDisplayedText("");
      setIsComplete(false);
      setIsDialogueVisible(false);
      setDisableNext(false);
      let index = 0;

      const interval = setInterval(() => {
        setDisplayedText((prev) => {
          const nextText = text.slice(0, index + 1);
          index++;
          if (index <= text.length) {
            playSound(typewriterSound, typewriterSoundVolume);
          }
          if (index === text.length) {
            clearInterval(interval);
            setIsComplete(true);
            setIsDialogueVisible(true);
          }
          return nextText;
        });
      }, 50);

      return () => clearInterval(interval);
    }
  }, [showDialogue, currentText]);

  const handleChoiceSelect = (choice) => {
    setDisableNext(true);
    onNextDialogue(choice);
  };

  const handleNextClick = useCallback(() => {
    if (!isDialogueVisible || dialogues[currentDialogue].choices || disableNext)
      return;

    playSound(clickSound, clickSoundVolume);
    onNextDialogue();
  }, [
    onNextDialogue,
    isDialogueVisible,
    dialogues,
    currentDialogue,
    disableNext,
  ]);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.code === "Space") {
        handleNextClick();
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    document.addEventListener("click", handleNextClick);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
      document.removeEventListener("click", handleNextClick);
    };
  }, [handleNextClick]);

  return (
    showDialogue && (
      <>
        <div
          className={`dialogue-box centered-container ${
            useInfernalFont ? "infernal-font" : ""
          }`}
        >
          <p>{displayedText}</p>
          {isComplete && !dialogues[currentDialogue].choices && (
            <div className="dialogue-triangle"></div>
          )}
        </div>
        {isComplete && dialogues[currentDialogue].choices && (
          <div className="choices-wrapper">
            <Choices
              choices={dialogues[currentDialogue].choices}
              onChoiceSelect={handleChoiceSelect}
              infernalChoice={infernalChoice}
            />
          </div>
        )}
      </>
    )
  );
};

export default DialogueBox;
