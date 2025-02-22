import React, { useState, useEffect } from "react";
import "./styles/App.css";
import "./styles/cosmicBackground.css";
import Stars from "./components/Stars/Stars";
import Message from "./components/Message/Message";
import DialogueManager from "./components/DialogueManager/DialogueManager";
import SoundManager from "./components/SoundManager/SoundManager";
import NameInput from "./components/NameInput/NameInput";
import LoadingScreen from "./components/LoadingScreen/LoadingScreen";

function App() {
  const [showMessage, setShowMessage] = useState(false);
  const [fadeOutMessage, setFadeOutMessage] = useState(false);
  const [musicStarted, setMusicStarted] = useState(false);
  const [showDialogue, setShowDialogue] = useState(false);
  const [name, setName] = useState("");
  const [showNameInput, setShowNameInput] = useState(false);
  const [fadeOutNameInput, setFadeOutNameInput] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [loadingComplete, setLoadingComplete] = useState(false);

  useEffect(() => {
    if (fadeOutMessage) {
      setTimeout(() => {
        setShowMessage(false);
        setShowNameInput(true);
      }, 2000); // Durée de l'animation de fondu
    }
  }, [fadeOutMessage]);

  const handleNameSubmit = (submittedName) => {
    setName(submittedName);
    setFadeOutNameInput(true);
    setTimeout(() => {
      setShowNameInput(false);
      setShowLoading(true);
    }, 2000); // Durée de l'animation de fondu
  };

  const handleLoadingComplete = () => {
    setShowLoading(false);
    setLoadingComplete(true);
    setTimeout(() => {
      setShowDialogue(true);
    }, 3000); // Attendre 3 secondes avant d'afficher le dialogue
  };

  // Définir la fonction onMessageComplete
  const handleMessageComplete = () => {
    setFadeOutMessage(true);
  };

  return (
    <div className="App">
      <Stars />
      {showMessage && (
        <Message
          showMessage={showMessage}
          fadeOut={fadeOutMessage}
          onMessageComplete={handleMessageComplete} // Passer la fonction onMessageComplete
        />
      )}
      {showNameInput && (
        <NameInput onNameSubmit={handleNameSubmit} fadeOut={fadeOutNameInput} />
      )}
      {showLoading && (
        <LoadingScreen onLoadingComplete={handleLoadingComplete} />
      )}
      {loadingComplete && showDialogue && name && (
        <DialogueManager
          showDialogue={showDialogue}
          setShowDialogue={setShowDialogue}
          name={name}
        />
      )}
      <SoundManager
        musicStarted={musicStarted}
        setMusicStarted={setMusicStarted}
        setFadeOut={setFadeOutMessage}
        setShowMessage={setShowMessage}
        setShowDialogue={setShowDialogue}
        loadingComplete={loadingComplete}
      />
    </div>
  );
}

export default App;
