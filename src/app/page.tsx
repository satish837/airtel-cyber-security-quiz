'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { soundManager } from '@/utils/sounds';
import { backgroundAudioManager } from '@/utils/backgroundAudio';

export default function Home() {
  const [name, setName] = useState('');
  const [showVirtualKeyboard, setShowVirtualKeyboard] = useState(false);
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

  // Virtual Keyboard Component
  const VirtualKeyboard = () => {
    const handleKeyPress = (key: string) => {
      if (key === 'Backspace') {
        setName(prev => prev.slice(0, -1));
      } else if (key === 'Space') {
        setName(prev => prev + ' ');
      } else if (key === 'Enter') {
        handleContinueClick();
      } else {
        setName(prev => prev + key);
      }
    };

    const keyboardLayout = [
      ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
      ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
      ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
      ['Space', 'Backspace', 'Enter']
    ];

    return (
      <div className="fixed inset-0 z-[9999] bg-black/80 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
          <div className="text-center mb-4">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Virtual Keyboard</h3>
            <p className="text-gray-600">Click the keys to type your name</p>
          </div>
          
          <div className="mb-4">
            <input
              type="text"
              value={name}
              readOnly
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-center text-xl font-medium"
              placeholder="Your name will appear here"
            />
          </div>

          <div className="space-y-2">
            {keyboardLayout.map((row, rowIndex) => (
              <div key={rowIndex} className="flex justify-center gap-1">
                {row.map((key) => (
                  <button
                    key={key}
                    onClick={() => handleKeyPress(key)}
                    className={`px-3 py-2 rounded font-medium transition-all duration-200 ${
                      key === 'Space' 
                        ? 'bg-gray-200 hover:bg-gray-300 text-gray-800 px-8 min-w-[120px]'
                        : key === 'Backspace' || key === 'Enter'
                        ? 'bg-red-500 hover:bg-red-600 text-white px-4 min-w-[80px]'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-800 min-w-[40px]'
                    }`}
                  >
                    {key === 'Space' ? '⎵' : key === 'Backspace' ? '⌫' : key === 'Enter' ? '↵' : key}
                  </button>
                ))}
              </div>
            ))}
          </div>

          <div className="flex gap-4 mt-6">
            <button
              onClick={() => setShowVirtualKeyboard(false)}
              className="cyber-button px-6 py-3 rounded-lg text-white font-bold flex-1"
            >
              Close Keyboard
            </button>
            <button
              onClick={handleContinueClick}
              disabled={!name.trim()}
              className="cyber-button px-6 py-3 rounded-lg text-white font-bold flex-1 disabled:opacity-50"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    );
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
                onClick={() => setShowVirtualKeyboard(true)}
                className="cyber-button px-6 py-3 rounded-lg text-white font-bold text-lg mb-4 w-full"
              >
                ⌨️ Virtual Keyboard
              </button>
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
      
      {/* Virtual Keyboard Modal */}
      {showVirtualKeyboard && <VirtualKeyboard />}
    </div>
  );
}