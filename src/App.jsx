import React, { useState, useEffect, useRef } from 'react';
import { Play, Square, RotateCcw, ShieldAlert } from 'lucide-react';
import PhilosopherTable from './PhilosopherTable';

export default function App() {
  // Application State
  const [philosophers, setPhilosophers] = useState(Array(5).fill('THINKING'));
  const [forks, setForks] = useState(Array(5).fill(null));
  
  // Controls State
  const [isRunning, setIsRunning] = useState(false);
  const [algorithm, setAlgorithm] = useState('naive');

  // We use refs inside our setInterval to ensure the loop always reads the freshest data
  // without getting trapped in a React closure.
  const philsRef = useRef(philosophers);
  const forksRef = useRef(forks);
  const algoRef = useRef(algorithm);

  useEffect(() => { philsRef.current = philosophers; }, [philosophers]);
  useEffect(() => { forksRef.current = forks; }, [forks]);
  useEffect(() => { algoRef.current = algorithm; }, [algorithm]);

  // THE SIMULATION ENGINE
  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        let nextPhils = [...philsRef.current];
        let nextForks = [...forksRef.current];

        // Process threads in random order (simulating unpredictable OS scheduling)
        let order = [0, 1, 2, 3, 4].sort(() => Math.random() - 0.5);

        order.forEach(i => {
          const state = nextPhils[i];
          const left = i;
          const right = (i + 1) % 5;

          if (state === 'THINKING') {
            // CRANKING UP CONTENTION: 95% chance they get hungry instantly
            if (Math.random() < 0.85) nextPhils[i] = 'HUNGRY';
          } 
          else if (state === 'HUNGRY') {
            
            // THE NAIVE ALGORITHM
            if (algoRef.current === 'naive') {
              if (nextForks[left] !== i) {
                if (nextForks[left] === null) {
                  nextForks[left] = i;
                }
              }
              else if (nextForks[right] !== i) {
                if (nextForks[right] === null) {
                  nextForks[right] = i;
                }
              }
              
              if (nextForks[left] === i && nextForks[right] === i) {
                nextPhils[i] = 'EATING';
              }
            }
            // DIJKSTRA'S SEMAPHORE (ASYMMETRIC ALGORITHM)
            else if (algoRef.current === 'semaphore') {
              // Philosopher 4 is our "lefty". They pick up the right fork first.
              const firstFork = (i === 4) ? right : left;
              const secondFork = (i === 4) ? left : right;

              if (nextForks[firstFork] !== i) {
                if (nextForks[firstFork] === null) {
                  nextForks[firstFork] = i;
                }
              }
              else if (nextForks[secondFork] !== i) {
                if (nextForks[secondFork] === null) {
                  nextForks[secondFork] = i;
                }
              }
              
              if (nextForks[firstFork] === i && nextForks[secondFork] === i) {
                nextPhils[i] = 'EATING';
              }
            }
          } 
          else if (state === 'EATING') {
            // Only 10% chance to finish eating, meaning they hold the forks hostage much longer!
            if (Math.random() < 0.15) {
              nextPhils[i] = 'THINKING';
              nextForks[left] = null;
              nextForks[right] = null;
            }
          }
        });

        // Update the UI with the newly calculated frame
        setPhilosophers(nextPhils);
        setForks(nextForks);

      }, 1000); // Frame updates every 1000ms
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const handleReset = () => {
    setIsRunning(false);
    setPhilosophers(Array(5).fill('THINKING'));
    setForks(Array(5).fill(null));
  };

  return (
    <div className="min-h-screen bg-bauhaus-bg flex flex-col items-center justify-center p-8 font-sans text-bauhaus-text">
      
      {/* Header Section */}
      <header className="mb-12 text-center flex flex-col items-center">
        <div className="bg-bauhaus-yellow/20 text-bauhaus-yellow px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
          OS Concurrency
        </div>
        <h1 className="text-4xl font-extrabold mb-4 tracking-tight">
          Dining Philosophers <span className="text-bauhaus-red">Visualized</span>
        </h1>
        <p className="text-bauhaus-text/70 max-w-xl leading-relaxed">
          Watch how operating systems manage multiple threads fighting for the same resources. 
          Without proper synchronization, the system grinds to a halt.
        </p>
      </header>

      {/* Main Workspace */}
      <main className="flex gap-12 items-start max-w-5xl w-full">
        
        {/* Left Panel: Controls */}
        <aside className="w-80 bg-white border border-bauhaus-grey p-6 shadow-[8px_8px_0px_0px_rgba(45,55,72,1)]">
          <h2 className="text-lg font-bold mb-6 flex items-center gap-2 uppercase tracking-wide">
            <ShieldAlert size={20} className="text-bauhaus-red" />
            System Controls
          </h2>
          
          <div className="space-y-4">
            <button 
              onClick={() => setIsRunning(!isRunning)}
              className={`w-full flex items-center justify-center gap-2 py-3 font-semibold transition-colors text-white ${isRunning ? 'bg-bauhaus-red hover:bg-red-700' : 'bg-bauhaus-text hover:bg-black'}`}
            >
              {isRunning ? <Square size={18} /> : <Play size={18} />}
              {isRunning ? 'Stop Simulation' : 'Start Simulation'}
            </button>
            <button 
              onClick={handleReset}
              className="w-full flex items-center justify-center gap-2 border-2 border-bauhaus-text py-3 font-semibold hover:bg-bauhaus-bg transition-colors"
            >
              <RotateCcw size={18} />
              Reset State
            </button>
          </div>

          <hr className="border-bauhaus-grey my-6" />

          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-bauhaus-text/70">Algorithm Selection</h3>
            <label className="flex items-center gap-3 cursor-pointer">
              <input 
                type="radio" 
                name="algorithm" 
                value="naive"
                checked={algorithm === 'naive'}
                onChange={() => setAlgorithm('naive')}
                className="w-4 h-4 accent-bauhaus-red" 
              />
              <span className="font-medium">Naive (Causes Deadlock)</span>
            </label>
           <label className="flex items-center gap-3 cursor-pointer">
              <input 
                type="radio" 
                name="algorithm" 
                value="semaphore"
                checked={algorithm === 'semaphore'}
                onChange={() => setAlgorithm('semaphore')}
                className="w-4 h-4 accent-bauhaus-blue" 
              />
              <span className="font-medium">Dijkstra's Semaphore</span>
            </label>
          </div>
        </aside>

        {/* Right Panel: The Table Stage */}
        <section className="flex-1 flex items-center justify-center bg-white border border-bauhaus-grey shadow-[8px_8px_0px_0px_rgba(45,55,72,1)] p-12 min-h-[500px] relative overflow-hidden">
          <PhilosopherTable philosophers={philosophers} forks={forks} />
        </section>
      </main>
    </div>
  );
}