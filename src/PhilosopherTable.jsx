import React from 'react';
import { motion } from 'framer-motion';

export default function PhilosopherTable() {
  const count = 5;
  const tableRadius = 120; // Distance of philosophers from center
  const forkRadius = 60;   // Distance of forks from center
  
  return (
    <div className="relative w-72 h-72 rounded-full border-4 border-bauhaus-text flex items-center justify-center bg-[#EAEAE2] shadow-inner">
      
      {/* 1. Render the Philosophers (Threads) */}
      {Array.from({ length: count }).map((_, i) => {
        // Calculate degrees, subtract 90 to start at 12 o'clock
        const angle = (i * 360) / count - 90; 
        const rad = angle * (Math.PI / 180);
        const x = Math.cos(rad) * tableRadius;
        const y = Math.sin(rad) * tableRadius;

        return (
          <motion.div
            key={`philosopher-${i}`}
            className="absolute w-14 h-14 bg-bauhaus-blue rounded-full border-2 border-bauhaus-text flex items-center justify-center text-white font-bold shadow-md z-10"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1, x, y }}
            transition={{ duration: 0.5, delay: i * 0.1, type: "spring" }}
          >
            P{i}
          </motion.div>
        );
      })}
      
      {/* 2. Render the Forks (Resources) */}
      {Array.from({ length: count }).map((_, i) => {
        // Forks sit perfectly between the philosophers
        const angle = (i * 360) / count - 90 + (360 / count / 2); 
        const rad = angle * (Math.PI / 180);
        const x = Math.cos(rad) * forkRadius;
        const y = Math.sin(rad) * forkRadius;

        return (
          <motion.div
            key={`fork-${i}`}
            className="absolute w-2 h-10 bg-bauhaus-red rounded-full border border-bauhaus-text z-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, x, y, rotate: angle + 90 }}
            transition={{ duration: 0.5, delay: 0.6 + (i * 0.1) }}
          />
        );
      })}
    </div>
  );
}