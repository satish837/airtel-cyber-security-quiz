'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { soundManager } from '@/utils/sounds';
import { backgroundAudioManager } from '@/utils/backgroundAudio';

export default function Home() {
  const [name, setName] = useState('');
  const router = useRouter();

  // Force focus on input for touch devices
  const handleInputTouch = () => {
    const input = document.querySelector('input[type="text"]') as HTMLInputElement;
    if (input) {
      // Multiple attempts to ensure virtual keyboard opens
      input.focus();
      input.click();
      input.blur();
      input.focus();
      
      // Force show virtual keyboard on mobile devices
      if (input.setSelectionRange) {
        input.setSelectionRange(0, 0);
      }
      
      // Trigger input event to ensure keyboard appears
      const event = new Event('input', { bubbles: true });
      input.dispatchEvent(event);
    }
  };

  // Focus input on component mount for touch devices
  useEffect(() => {
    const timer = setTimeout(() => {
      handleInputTouch();
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      await soundManager.playClickSound();
      localStorage.setItem('playerName', name.trim());
      // Start background music after name entry
      backgroundAudioManager.playBackgroundMusic();
      router.push('/welcome');
    }
  };

  return (
    <div className="cyber-bg  flex items-center justify-center p-4">
      

      {/* Main content */}
      <div className="relative z-10 w-full max-w-2xl">
        <div className="rounded-lg p-8">

          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2 flex justify-center items-center flex-col">
              <span className="text-red-500 mb-3"><Image src="/airtel-logo.png" alt="Airtel Logo" width={150} height={60} className="object-contain" /></span>
              <span className="text-white ml-2 text-5xl">Cyber Hunt</span>
            </h1>
          </div>

          {/* Name input form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="text-center">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onTouchStart={handleInputTouch}
                onTouchEnd={handleInputTouch}
                onClick={handleInputTouch}
                onFocus={handleInputTouch}
                placeholder="Please Enter Your Name"
                className="cyber-input w-full px-6 py-4 rounded-lg text-center text-lg font-medium placeholder-gray-400"
                required
                inputMode="text"
                autoComplete="name"
                autoFocus
                autoCapitalize="words"
                spellCheck="true"
                readOnly={false}
                tabIndex={0}
              />
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="cyber-button px-8 py-4 rounded-lg text-white font-bold text-lg w-full"
              >
                Continue
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}