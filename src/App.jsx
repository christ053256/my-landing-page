import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const App = () => {
  const imageUrl = "/images/game-background.jpg"; 
  const startButtonImage = "/images/start_button_game.png";  // image for the Start button
  const documentationButtonImage = "/images/docu_button_Fr.png";  // image for the Documentation button
  const containerRef = useRef(null);

  // State to track if audio has started
  const [audioStarted, setAudioStarted] = useState(false);
  
  // Use ref for audio element
  const audioRef = useRef(null);

  useEffect(() => {
    // Function to play the audio after a user interaction
    const handleUserInteraction = () => {
      // Play audio when the user interacts (clicks)
      audioRef.current.play();
      setAudioStarted(true); // Set audio as started after play
      // Remove the event listener once audio is started
      window.removeEventListener('click', handleUserInteraction);
    };

    // Add event listener for user interaction
    window.addEventListener('click', handleUserInteraction);

    // Set up the Three.js scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });

    // Make sure renderer canvas takes up the whole screen
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Set the camera closer to the scene
    camera.position.z = 3; // Closer than before, to ensure the model is visible

    // Set up the slime model (Rimuru)
    const loader = new GLTFLoader();
    const slimeModelUrl = '/models/rimuru_slime.glb'; // Path to the Rimuru slime model

    loader.load(slimeModelUrl, (gltf) => {
      const slime = gltf.scene;
      scene.add(slime);

      slime.scale.set(0.5, 0.5, 0.5);  // Scale the slime model
      slime.position.set(2, 0, 0);  // Position slime in the middle-right of the screen

      // Animation loop for slime
      function animateSlime() {
        requestAnimationFrame(animateSlime);
        slime.rotation.y += 0.01;  // Make slime spin
        renderer.render(scene, camera);
      }

      animateSlime();
    }, undefined, (error) => {
      console.error("Error loading slime model:", error);
    });

    // Mouse movement effect for the 3D slime model
    const onMouseMove = (event) => {
      const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

      // Move the slime based on mouse position, but keep it at the right side
      scene.children.forEach((child) => {
        if (child !== camera) {
          child.position.x = 2 + mouseX * 1.5;  // Adjust horizontal movement
          child.position.y = mouseY * 1.5;  // Adjust vertical movement
        }
      });
    };

    // Add mousemove event listener
    window.addEventListener('mousemove', onMouseMove, false);

    // Handle window resizing to keep the 3D canvas responsive
    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onWindowResize, false);

    // Rendering function for Three.js
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    animate();

    // Cleanup on component unmount
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onWindowResize);
      renderer.dispose();
    };
  }, []);

  const handleStartButtonClick = () => {
    // Stop the audio when the start button is clicked
    audioRef.current.pause();
    audioRef.current.currentTime = 0; // Optional: Reset audio to the beginning
    
    // Redirect to the start link
    window.location.href = "https://crosstheroad.vercel.app/";  // start link
  };

  return (
    <div className="relative w-full h-screen">
      {/* Background Music */}
      <audio
        ref={audioRef}
        src="/audio/title-theme.mp3"  
        loop
        autoPlay={audioStarted} // Only autoplay after user interaction
        muted={false}
        preload="auto"
        className="hidden"  
      />
      
      {/* Three.js Canvas */}
      <div ref={containerRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}></div>
      
      {/* Background image */}
      <img
        src={imageUrl}
        alt="Background"
        className="absolute top-0 left-0 w-full h-full object-cover object-bottom"
      />
      
      {/* Buttons section */}
      <div className="absolute top-14 right-10 flex space-x-4">
        {/* Start Button */}
        <button 
          onClick={handleStartButtonClick}  // handle click to stop audio and navigate
          className="relative inline-block rounded-full overflow-hidden shadow-md transform transition duration-300 ease-in-out hover:scale-105 hover:opacity-80"
          style={{
            backgroundImage: `url(${startButtonImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            width: '200px',
            height: '50px',
          }}
        />
        
        {/* Documentation Button */}
        <a 
          href="/path/to/documentation.pdf"  // link to documentation
          className="relative inline-block rounded-full overflow-hidden shadow-md transform transition duration-300 ease-in-out hover:scale-105 hover:opacity-80"
          style={{
            backgroundImage: `url(${documentationButtonImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            width: '200px',
            height: '50px',
          }}
          target="_blank" 
          rel="noopener noreferrer"
        />
      </div>
      
      {/* Teammates Section (Top-left corner, Horizontal Layout) */}
      <div className="absolute top-8 left-8 flex flex-row space-x-4 z-10 items-center">
        {/* Team Member 1 */}
        <div className="flex flex-col items-center">
          <img src="/images/bulac.jpg" alt="Team Member 1" className="w-20 h-20 rounded-full border-4 border-yellow-500 shadow-lg" /> {/* Smaller size */}
          <span className="text-white mt-2">Samantha Bulac</span>
        </div>
        {/* Team Member 2 */}
        <div className="flex flex-col items-center">
          <img src="/images/desoloc.jpg" alt="Team Member 2" className="w-20 h-20 rounded-full border-4 border-yellow-500 shadow-lg" /> {/* Smaller size */}
          <span className="text-white mt-2">Michael Lance Desoloc</span>
        </div>
        {/* Team Member 3 */}
        <div className="flex flex-col items-center">
          <img src="/images/isiderio.jpg" alt="Team Member 3" className="w-20 h-20 rounded-full border-4 border-yellow-500 shadow-lg" /> {/* Smaller size */}
          <span className="text-white mt-2">Christian Isiderio</span>
        </div>
      </div>
      
      {/* Existing content section */}
      <div className="absolute top-1/2 right-12 transform -translate-y-1/2 w-[380px] p-4 bg-gray-900 bg-opacity-70 border-4 border-yellow-500 rounded-lg">
        <h1 className="text-3xl font-extrabold text-yellow-400 mb-3 font-mono">
          Welcome to Our Game!
        </h1>
        
        <p className="text-base text-white mb-3 font-serif">
          This marks one of the few beginning game development projects in our journey as Comsci students.
        </p>
        <p className="text-sm text-white mb-3 font-serif">
          PS. scroll down for a surprise
        </p>
      </div>

      {/* School Bus Image at Lower Left */}
      <div className="absolute bottom-0 left-64 w-80 h-80">
        <img 
          src="/images/bus.png" 
          alt="School Bus" 
          className="w-full h-full object-contain shadow-xl rounded-lg"
        />
      </div>
    </div>
  );
};

export default App;