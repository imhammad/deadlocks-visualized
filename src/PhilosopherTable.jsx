import React from 'react';
import { motion } from 'framer-motion';

export default function PhilosopherTable({ philosophers, forks }) {
  const count = 5;
  const tableRadius = 120;
  const forkRadius = 60;
  
  // Map states to our Bauhaus color palette
  const getStateColor = (state) => {
    switch (state) {
      case 'EATING': return 'bg-bauhaus-red border-bauhaus-red text-white';
      case 'HUNGRY': return 'bg-bauhaus-yellow border-bauhaus-text text-bauhaus-text';
      case 'THINKING': 
      default: return 'bg-bauhaus-blue border-bauhaus-text text-white';
    }
  };

  return (
    <div className="relative w-72 h-72 rounded-full border-4 border-bauhaus-text flex items-center justify-center bg-[#EAEAE2] shadow-inner">
      
      {/* 1. Render the Philosophers */}
      {Array.from({ length: count }).map((_, i) => {
        const angle = (i * 360) / count - 90; 
        const rad = angle * (Math.PI / 180);
        const x = Math.cos(rad) * tableRadius;
        const y = Math.sin(rad) * tableRadius;
        
        const state = philosophers[i];

        return (
          <motion.div
            key={`philosopher-${i}`}
            className={`absolute w-14 h-14 rounded-full border-2 flex items-center justify-center font-bold shadow-md z-10 transition-colors duration-300 ${getStateColor(state)}`}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: state === 'EATING' ? 1.1 : 1, x, y }}
            transition={{ duration: 0.5, delay: i * 0.1, type: "spring" }}
          >
            P{i}
          </motion.div>
        );
      })}
      
      {/* 2. Render the Forks */}
      {Array.from({ length: count }).map((_, i) => {
        const angle = (i * 360) / count - 90 + (360 / count / 2); 
        const rad = angle * (Math.PI / 180);
        const x = Math.cos(rad) * forkRadius;
        const y = Math.sin(rad) * forkRadius;
        
        // If a fork is held by a philosopher, we fade it out from the table center
        const isHeld = forks[i] !== null;

        return (
          <motion.div
            key={`fork-${i}`}
            className="absolute w-2 h-10 bg-bauhaus-text rounded-full z-0"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: isHeld ? 0.2 : 1, 
              scale: isHeld ? 0.8 : 1,
              x, 
              y, 
              rotate: angle + 90 
            }}
            transition={{ duration: 0.3 }}
          />
        );
      })}
    </div>
  );
}