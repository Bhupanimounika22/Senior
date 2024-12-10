import React, { useEffect, useRef } from 'react';
import './FunRacer.css';

const FunRacer = () => {
  const audioRef = useRef(null);
  const fadeInterval = useRef(null);  

   
  const handleKeyDown = (event) => {
    if (event.code === 'Space') {
      event.preventDefault();  
      if (audioRef.current && !audioRef.current.loop) {
        audioRef.current.loop = true;
        audioRef.current.volume = 1;  
        audioRef.current.currentTime = 0; 
        audioRef.current.play();
      }
    }
  };
 
  const handleKeyUp = (event) => {
    if (event.code === 'Space') {
      event.preventDefault();  
      if (audioRef.current) {
        audioRef.current.loop = false;  
        clearInterval(fadeInterval.current);  
        fadeInterval.current = setInterval(() => {
          if (audioRef.current.volume > 0) {
            audioRef.current.volume = Math.max(0, audioRef.current.volume - 0.05);
          } else {
            audioRef.current.pause();
            audioRef.current.currentTime = 0; 
            clearInterval(fadeInterval.current); 
          }
        }, 100); 
      }
    }
  };
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return (
    <div className="racer-container">
      <img
        src="https://nova-hata.com/image/cache/catalog/Ithem/NH_0615/bmw-logo-machine-embroidery-design-615-750x750.jpg"
        alt="Fun Racer Logo"
        className="racer-logo"
      />
      <audio ref={audioRef} src="/race-sounds.mp3" preload="auto"></audio>
    </div>
  );
};

export default FunRacer;
