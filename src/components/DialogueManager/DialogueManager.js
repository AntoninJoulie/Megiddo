import React, { useState, useCallback } from "react";
import DialogueBox from "../DialogueBox/DialogueBox";
import dialoguesData from "../../assets/data/dialogues.json";

const DialogueManager = ({ showDialogue, name }) => {
  const [currentDialogue, setCurrentDialogue] = useState(0);

  const handleNextDialogue = useCallback((choice) => {
    setCurrentDialogue((prev) => {
      const next = dialoguesData[prev].next;
      return typeof next === "object" ? next[choice] : next;
    });
  }, []);

  const currentText = dialoguesData[currentDialogue].text.replace(
    "{name}",
    name
  );

  return (
    showDialogue && name && (
      <DialogueBox
        showDialogue={showDialogue}
        dialogues={dialoguesData}
        currentDialogue={currentDialogue}
        onNextDialogue={handleNextDialogue}
        useInfernalFont={dialoguesData[currentDialogue].useInfernalFont}
        infernalChoice={dialoguesData[currentDialogue].infernalChoice}
        currentText={currentText} // Passer le texte actuel avec le nom remplacé
      />
    )
  );
};

export default DialogueManager;