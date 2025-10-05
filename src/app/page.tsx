'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [name, setName] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      localStorage.setItem('playerName', name.trim());
      router.push('/welcome');
    }
  };

  return (
    <div className="cyber-bg  flex items-center justify-center p-4">
      {/* Background geometric frames */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-30"></div>
        <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-30"></div>
        <div className="absolute top-1/2 left-0 w-2 h-32 bg-gradient-to-b from-transparent via-red-500 to-transparent opacity-30 transform -translate-y-1/2"></div>
        <div className="absolute top-1/2 right-0 w-2 h-32 bg-gradient-to-b from-transparent via-red-500 to-transparent opacity-30 transform -translate-y-1/2"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 w-full max-w-2xl">
        <div className="rounded-lg p-8">

          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2 flex justify-center items-center">
              <span className="text-red-500"><img src="/airtel-logo.png" alt="Airtel Logo" className="w-auto h-[100%] object-contain" /></span>
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