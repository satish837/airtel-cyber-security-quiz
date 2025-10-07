'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { soundManager } from '@/utils/sounds';
import { backgroundAudioManager } from '@/utils/backgroundAudio';

export default function Home() {
  const [name, setName] = useState('');
  const router = useRouter();

  // Focus input on component mount
  useEffect(() => {
    const timer = setTimeout(() => {
      const input = document.querySelector('input[type="text"]') as HTMLInputElement;
      if (input) {
        input.focus();
      }
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted, name:', name);
    
    if (name.trim()) {
      localStorage.setItem('playerName', name.trim());
      router.push('/welcome');
    } else {
      alert('Please enter your name to continue');
    }
  };

  const handleContinueClick = () => {
    console.log('Continue button clicked, name:', name);
    
    if (name.trim()) {
      localStorage.setItem('playerName', name.trim());
      router.push('/welcome');
    } else {
      alert('Please enter your name to continue');
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
          <div className="space-y-6">
            <div className="text-center">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Please Enter Your Name"
                className="cyber-input w-full px-6 py-4 rounded-lg text-center text-lg font-medium placeholder-gray-400"
                required
                autoFocus
                autoComplete="name"
                autoCapitalize="words"
                spellCheck="true"
                style={{ fontSize: '16px' }}
              />
            </div>

            <div className="text-center">
              <button
                type="button"
                onClick={handleContinueClick}
                className="cyber-button px-8 py-4 rounded-lg text-white font-bold text-lg w-full"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}