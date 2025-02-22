import React, { useState, useCallback } from "react";
import DialogueBox from "../DialogueBox/DialogueBox";
import dialoguesData from "../../assets/data/dialogues.json"; // Importer les dialogues

const DialogueManager = ({ showDialogue, setShowDialogue }) => {
  const [currentDialogue, setCurrentDialogue] = useState(0); // État pour le dialogue actuel

  // Fonction pour passer au dialogue suivant
  const handleNextDialogue = useCallback((choice) => {
    setCurrentDialogue((prev) => {
      const next = dialoguesData[prev].next;
      return typeof next === "object" ? next[choice] : next;
    });
  }, []);

  return (
    <DialogueBox
      showDialogue={showDialogue}
      dialogues={dialoguesData}
      currentDialogue={currentDialogue}
      onNextDialogue={handleNextDialogue}
      useInfernalFont={dialoguesData[currentDialogue].useInfernalFont} // Utiliser la nouvelle police pour les dialogues spécifiés
      infernalChoice={dialoguesData[currentDialogue].infernalChoice} // Passer le choix infernal
    />
  );
};

export default DialogueManager;
