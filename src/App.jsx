import React, { useEffect, useRef, useState } from 'react';
import './App.css';

const App = () => {
  const imageUrl = "/images/game-background.jpg";
  const startButtonImage = "/images/start_button_game.png";
  const documentationButtonImage = "/images/docu_button_Fr.png";
  const containerRef = useRef(null);

  const [audioStarted, setAudioStarted] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const handleUserInteraction = () => {
      audioRef.current.play();
      setAudioStarted(true);
      window.removeEventListener('click', handleUserInteraction);
    };

    window.addEventListener('click', handleUserInteraction);

    return () => {
      window.removeEventListener('click', handleUserInteraction);
    };
  }, []);

  const handleStartButtonClick = () => {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    window.location.href = "https://crosstheroad.vercel.app/";
  };

  return (
    <div className="app-container">
      <audio
        ref={audioRef}
        src="/audio/title-theme.mp3"
        loop
        autoPlay={audioStarted}
        muted={false}
        preload="auto"
        className="hidden"
      />
      
      {/* Background Image */}
      <img
        src={imageUrl}
        alt="Background"
        className="game-background"
      />
      
      {/* Buttons Section */}
      <div className="button-container">
        {/* Start Button */}
        <button 
          onClick={handleStartButtonClick}
          className="button start-button"
        />
        
        {/* Docu button */}
        <a 
          href="/documentation-pdf.pdf"
          className="button documentation-button"
          target="_blank"
          rel="noopener noreferrer"
        />
      </div>

      {/* Team Members Section */}
      <div className="team-members">
        <div className="team-member">
          <img src="/images/bulac.jpg" alt="Samantha Bulac" />
          <span>Samantha Bulac</span>
        </div>
        <div className="team-member">
          <img src="/images/desoloc.jpg" alt="Michael Lance Desoloc" />
          <span>Michael Lance Desoloc</span>
        </div>
        <div className="team-member">
          <img src="/images/isiderio.jpg" alt="Christian Isiderio" />
          <span>Christian Isiderio</span>
        </div>
      </div>

      {/* Description */}
      <div className="description-section">
        <h1>Welcome to Our Game!</h1>
        <p>This marks one of the few beginning game development projects in our journey as Comsci students.</p>
      </div>

      {/* Bus */}
      <div className="school-bus">
        <img src="/images/bus.png" alt="School Bus" />
      </div>

      {/* Small Rimuru */}
      <div className="small-rimuru">
        <img src="/images/small_rimuru.png" alt="Small Rimuru Slime" />
      </div>
    </div>
  );
};

export default App;