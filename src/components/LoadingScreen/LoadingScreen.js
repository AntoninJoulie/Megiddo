import React, { useEffect, useState } from "react";
import "./LoadingScreen.css";
import loadingSound from "../../assets/sounds/loading.mp3";
import startSound from "../../assets/sounds/start.mp3";
import { loadingSoundVolume, startSoundVolume } from "../../config";
import { playSound } from "../../utils";

const LoadingScreen = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);
  const [loadingText, setLoadingText] = useState("Loading...");

  useEffect(() => {
    playSound(loadingSound, loadingSoundVolume); // Jouer le son de chargement

    const totalDuration = 5000; // Durée totale du chargement en ms
    const updateInterval = 100; // Intervalle de mise à jour en ms
    const totalUpdates = totalDuration / updateInterval;

    const interval = setInterval(() => {
      const randomFactor = Math.random() * 2; // Facteur aléatoire pour accélérer ou ralentir
      const increment = (100 / totalUpdates) * randomFactor;
      setProgress((prev) => Math.min(prev + increment, 100));
    }, updateInterval);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      playSound(startSound, startSoundVolume); // Jouer le son de démarrage
      setLoadingText("Loading completed!");
      setTimeout(() => {
        setFadeOut(true);
        setTimeout(onLoadingComplete, 2000); // Durée de l'animation de fondu
      }, 1000); // Attendre 1 seconde avant de commencer le fondu
    }
  }, [progress, onLoadingComplete]);

  return (
    <div className={`loading-screen ${fadeOut ? "fade-out" : ""}`}>
      <div className="loading-bar">
        <div
          className="loading-progress"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <div className="loading-text">{loadingText}</div>
      <div className="loading-percentage">{Math.round(progress)}%</div>
    </div>
  );
};

export default LoadingScreen;
