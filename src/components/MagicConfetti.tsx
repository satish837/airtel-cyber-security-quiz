'use client';

import { useEffect } from 'react';
import confetti from 'canvas-confetti';

interface MagicConfettiProps {
  trigger: boolean;
  onComplete?: () => void;
}

export default function MagicConfetti({ trigger, onComplete }: MagicConfettiProps) {

  useEffect(() => {
    if (trigger) {
      // Create a spectacular confetti effect
      const duration = 3 * 1000; // 3 seconds
      const animationEnd = Date.now() + duration;
      const defaults = { 
        startVelocity: 30, 
        spread: 360, 
        ticks: 60, 
        zIndex: 9999,
        colors: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3', '#54a0ff', '#5f27cd', '#00d2d3', '#ff9f43']
      };

      const randomInRange = (min: number, max: number) =>
        Math.random() * (max - min) + min;

      const interval = window.setInterval(() => {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          clearInterval(interval);
          onComplete?.();
          return;
        }

        const particleCount = 50 * (timeLeft / duration);
        
        // Fire from left side
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        });
        
        // Fire from right side
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        });
      }, 250);

      // Also fire a big burst from the center
      setTimeout(() => {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: defaults.colors,
        });
      }, 0);
    }
  }, [trigger, onComplete]);

  return null; // This component doesn't render anything visible
}
