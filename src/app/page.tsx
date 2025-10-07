'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { soundManager } from '@/utils/sounds';
import { backgroundAudioManager } from '@/utils/backgroundAudio';

export default function Home() {
  const [name, setName] = useState('');
  const [showVirtualKeyboard, setShowVirtualKeyboard] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Simple focus function for input
  const handleInputFocus = () => {
    const input = document.querySelector('input[type="text"]') as HTMLInputElement;
    if (input) {
      input.focus();
    }
  };

  // Initialize virtual keyboard
  useEffect(() => {
    const initializeVirtualKeyboard = async () => {
      if (typeof window !== 'undefined' && inputRef.current) {
        try {
          const VirtualKeyboardModule = await import('virtual-keyboard');
          const VirtualKeyboard = VirtualKeyboardModule.default || VirtualKeyboardModule;
          
          // Initialize virtual keyboard
          const keyboard = new (VirtualKeyboard as any)(inputRef.current, {
            layout: 'qwerty',
            theme: 'flat',
            color: 'light',
            background: 'white',
            border: '2px solid #ef4444',
            borderRadius: '8px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
            position: 'fixed',
            zIndex: 9999,
            alwaysOpen: false,
            autoAccept: true,
            autoAcceptOnEsc: true,
            autoAcceptOnEnter: true,
            usePreview: true,
            useWheel: false,
            stickyShift: false,
            appendLocally: true,
            css: {
              container: 'ui-keyboard-container',
              input: 'ui-keyboard-input',
              button: 'ui-keyboard-button',
              buttonHover: 'ui-keyboard-button-hover',
              buttonActive: 'ui-keyboard-button-active',
              buttonDisabled: 'ui-keyboard-button-disabled',
              row: 'ui-keyboard-row'
            }
          });

          // Store keyboard instance for cleanup
          (window as any).virtualKeyboard = keyboard;
        } catch (error) {
          console.error('Failed to load virtual keyboard:', error);
        }
      }
    };

    initializeVirtualKeyboard();

    // Cleanup on unmount
    return () => {
      if (typeof window !== 'undefined' && (window as any).virtualKeyboard) {
        (window as any).virtualKeyboard.destroy();
      }
    };
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
                ref={inputRef}
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
                onClick={() => {
                  if (typeof window !== 'undefined' && (window as any).virtualKeyboard) {
                    (window as any).virtualKeyboard.toggle();
                  }
                }}
                className="cyber-button px-6 py-3 rounded-lg text-white font-bold text-lg mb-4 w-full"
              >
                ⌨️ Toggle Virtual Keyboard
              </button>
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