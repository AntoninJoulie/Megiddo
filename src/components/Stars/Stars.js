import React, { useEffect } from 'react';
import './Stars.css';
import { generateStars, generateShootingStar } from '../../utils';

const Stars = () => {
  useEffect(() => {
    generateStars(100); // Générer 100 étoiles

    const shootingStarInterval = setInterval(() => {
      if (Math.random() < 0.1) { // 10% de chance de générer une étoile filante
        generateShootingStar();
      }
    }, 1000); // Vérifier toutes les secondes

    return () => {
      clearInterval(shootingStarInterval);
    };
  }, []);

  return <div className="stars-container"></div>;
};

export default Stars;