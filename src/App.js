import React, { useState } from "react";
import "./styles/App.css";
import "./styles/cosmicBackground.css";
import Stars from "./components/Stars/Stars";
import Message from "./components/Message/Message";
import DialogueManager from "./components/DialogueManager/DialogueManager";
import SoundManager from "./components/SoundManager/SoundManager";

function App() {
  const [showMessage, setShowMessage] = useState(false); // État pour afficher le message initial
  const [fadeOut, setFadeOut] = useState(false); // État pour l'animation de fondu
  const [musicStarted, setMusicStarted] = useState(false); // État pour savoir si la musique a commencé
  const [showDialogue, setShowDialogue] = useState(false); // État pour afficher la boîte de dialogue

  return (
    <div className="App">
      <Stars />
      <Message showMessage={showMessage} fadeOut={fadeOut} />
      <DialogueManager
        showDialogue={showDialogue}
        setShowDialogue={setShowDialogue}
      />
      <SoundManager
        musicStarted={musicStarted}
        setMusicStarted={setMusicStarted}
        setFadeOut={setFadeOut}
        setShowMessage={setShowMessage}
        setShowDialogue={setShowDialogue}
      />
    </div>
  );
}

export default App;
