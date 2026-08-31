<div align="center">
  
  # OS Concurrency: Dining Philosophers Visualized

  A high-performance, interactive visualizer demonstrating operating system deadlocks and resource allocation using Dijkstra's Semaphore.

https://github.com/user-attachments/assets/1fb5dd5f-15f6-4fc4-bebf-92173c42bffb

</div>

**Live site:** https://imhammad.github.io/deadlocks-visualized/

## Why I Built This
Concepts like thread synchronization, race conditions, and mutex locks are often taught purely through theory. I wanted to take a notorious Computer Science problem (the Dining Philosophers problem) and bring it to life visually. This tool allows developers to actually watch a system crash due to high contention and then see exactly how modern operating systems resolve the issue.

## Understanding the Visualization
The visual interface directly mirrors the architecture of a computer CPU and memory layout:
* **The Circles (Philosophers):** These represent individual threads or processes running in an operating system.
* **The Dashes (Forks):** These are shared resources, such as a database row or a block of memory. In OS terms, these act as Mutex Locks.
* **Blue (Thinking):** The thread is executing background tasks and does not need shared resources.
* **Yellow (Hungry):** The thread is waiting to acquire the necessary locks.
* **Red (Eating):** The thread successfully acquired both adjacent locks and is executing its critical section.

## The Problem: Deadlock (Naive Algorithm)
In the Naive algorithm, each thread follows a simple set of rules. They grab the left lock, and then they grab the right lock. Under heavy load (high contention), every single thread might grab its left lock simultaneously. Because no thread will release its left lock until it gets a right lock, the system freezes permanently. This is a classic Deadlock.

## The Solution: Dijkstra's Semaphore
To fix this, the visualizer implements an asymmetric resource hierarchy (Dijkstra's solution). By forcing just one thread to pick up its locks in the reverse order (right lock first, then left), we break the circular wait. The system might experience brief traffic jams, but the permanent deadlock becomes mathematically impossible.

## Tech Stack & Implementation
* **React & Vite:** Provides a lightning-fast development environment and robust state management for the simulation loop.
* **Framer Motion:** Handles the fluid, physics-based animations to clearly show state transitions.
* **Tailwind CSS v4:** Utilized for a clean, Bauhaus-inspired geometric UI (avoiding standard dark themes for a crisp, professional aesthetic).
* **Vanilla JavaScript:** Powers the core simulation engine by managing probability distributions and atomic operations per tick.

## Run It Locally
1. Clone the repository:
   `git clone https://github.com/imhammad/deadlocks-visualized.git`
2. Navigate into the directory:
   `cd deadlocks-visualized`
3. Install the dependencies:
   `npm install`
4. Start the development server:
   `npm run dev`
