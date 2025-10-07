'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { soundManager } from '@/utils/sounds';

export default function Welcome() {
  const [playerName, setPlayerName] = useState('');
  const router = useRouter();

  useEffect(() => {
    const name = localStorage.getItem('playerName');
    if (!name) {
      router.push('/');
      return;
    }
    setPlayerName(name);
  }, [router]);

  const handleContinue = async () => {
    await soundManager.playClickSound();
    router.push('/categories');
  };

  return (
    <div className="cyber-bg flex items-center justify-center p-4">
      {/* Main content */}
      <div className="relative z-10 w-full max-w-[70%]">
        <div className="rounded-lg">
          {/* Airtel Logo */}
          <div className="flex justify-end mb-6">
            <div className="text-red-500 font-bold text-2xl flex items-right w-full">
              <Image src="/airtel-logo.png" alt="Airtel Logo" width={150} height={60} className="object-contain" />
            </div>
          </div>

          {/* Welcome Message */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-6">
              Welcome {playerName}
            </h1>
          </div>

          {/* Attack Message */}
          <div className="p-6 rounded-lg mb-8 ">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-4 cyber-text-glow">
                Your organization is under <span className="text-red-500">Attack!</span>
              </h2>
              <p className="text-lg text-white">
                You&apos;ve got 30 seconds to outsmart the hacker!
              </p>
            </div>
          </div>

          {/* Continue Button */}
          <div className="text-center">
            <button
              onClick={handleContinue}
              className="cyber-button px-8 py-4 rounded-lg text-white font-bold text-xl"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
