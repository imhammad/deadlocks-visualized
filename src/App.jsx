import React from 'react';
import { Play, RotateCcw, ShieldAlert } from 'lucide-react';

export default function App() {
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
            <button className="w-full flex items-center justify-center gap-2 bg-bauhaus-text text-white py-3 font-semibold hover:bg-black transition-colors">
              <Play size={18} />
              Start Simulation
            </button>
            <button className="w-full flex items-center justify-center gap-2 border-2 border-bauhaus-text py-3 font-semibold hover:bg-bauhaus-bg transition-colors">
              <RotateCcw size={18} />
              Reset State
            </button>
          </div>

          <hr className="border-bauhaus-grey my-6" />

          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-bauhaus-text/70">Algorithm Selection</h3>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="radio" name="algorithm" className="w-4 h-4 accent-bauhaus-red" defaultChecked />
              <span className="font-medium">Naive (Causes Deadlock)</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="radio" name="algorithm" className="w-4 h-4 accent-bauhaus-blue" />
              <span className="font-medium">Dijkstra's Semaphore</span>
            </label>
          </div>
        </aside>

        {/* Right Panel: The Table Stage */}
        <section className="flex-1 flex items-center justify-center bg-white border border-bauhaus-grey shadow-[8px_8px_0px_0px_rgba(45,55,72,1)] p-12 min-h-[500px] relative overflow-hidden">
          
          {/* We will render our animated Framer Motion circle here in the next step! */}
          <div className="w-64 h-64 rounded-full border-4 border-bauhaus-text flex items-center justify-center bg-bauhaus-bg/50">
            <p className="font-mono text-bauhaus-text/50 font-bold uppercase tracking-widest text-sm">
              [ Table Canvas ]
            </p>
          </div>

        </section>
      </main>
    </div>
  );
}