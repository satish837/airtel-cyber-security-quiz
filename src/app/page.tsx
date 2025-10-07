'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { soundManager } from '@/utils/sounds';
import { backgroundAudioManager } from '@/utils/backgroundAudio';

export default function Home() {
  const [name, setName] = useState('');
  const router = useRouter();

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
                placeholder="Please Enter Your Name"
                className="cyber-input w-full px-6 py-4 rounded-lg text-center text-lg font-medium placeholder-gray-400"
                required
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