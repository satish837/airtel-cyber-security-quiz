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

  // Force focus on input for all devices (including desktop)
  const handleInputTouch = () => {
    const input = document.querySelector('input[type="text"]') as HTMLInputElement;
    if (input) {
      // Method 1: Direct focus and click
      input.focus();
      input.click();
      
      // Method 2: Force selection to trigger keyboard
      if (input.setSelectionRange) {
        input.setSelectionRange(0, input.value.length);
      }
      
      // Method 3: Blur and refocus with delay
      input.blur();
      setTimeout(() => {
        input.focus();
        if (input.setSelectionRange) {
          input.setSelectionRange(0, input.value.length);
        }
      }, 50);
      
      // Method 4: Create a temporary input to force keyboard
      const tempInput = document.createElement('input');
      tempInput.type = 'text';
      tempInput.style.position = 'absolute';
      tempInput.style.left = '-9999px';
      tempInput.style.opacity = '0';
      document.body.appendChild(tempInput);
      tempInput.focus();
      tempInput.click();
      
      setTimeout(() => {
        document.body.removeChild(tempInput);
        input.focus();
        if (input.setSelectionRange) {
          input.setSelectionRange(0, input.value.length);
        }
      }, 100);
      
      // Method 5: Trigger all possible events
      const events = ['input', 'focus', 'click', 'touchstart', 'touchend', 'mousedown', 'mouseup'];
      events.forEach(eventType => {
        const event = new Event(eventType, { bubbles: true, cancelable: true });
        input.dispatchEvent(event);
      });
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

  // Custom virtual keyboard for Mac/Desktop
  const VirtualKeyboard = () => {
    const keys = [
      ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
      ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
      ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
      ['Space', 'Backspace', 'Enter']
    ];

    const handleKeyPress = (key: string) => {
      if (key === 'Space') {
        setName(prev => prev + ' ');
      } else if (key === 'Backspace') {
        setName(prev => prev.slice(0, -1));
      } else if (key === 'Enter') {
        handleSubmit(new Event('submit') as any);
      } else {
        setName(prev => prev + key);
      }
    };

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
            {keys.map((row, rowIndex) => (
              <div key={rowIndex} className="flex justify-center gap-1">
                {row.map((key) => (
                  <button
                    key={key}
                    onClick={() => handleKeyPress(key)}
                    className={`px-3 py-2 rounded font-medium transition-colors ${
                      key === 'Space' 
                        ? 'bg-gray-200 hover:bg-gray-300 text-gray-800 px-8'
                        : key === 'Backspace' || key === 'Enter'
                        ? 'bg-red-500 hover:bg-red-600 text-white px-4'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
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
              onClick={() => handleSubmit(new Event('submit') as any)}
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
                onMouseDown={handleInputTouch}
                onMouseUp={handleInputTouch}
                onKeyDown={handleInputTouch}
                onKeyUp={handleInputTouch}
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
                style={{ 
                  fontSize: '16px',
                  WebkitAppearance: 'none',
                  appearance: 'none'
                }}
              />
              {/* Hidden textarea to force virtual keyboard */}
              <textarea
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{
                  position: 'absolute',
                  left: '-9999px',
                  top: '-9999px',
                  width: '1px',
                  height: '1px',
                  opacity: 0,
                  fontSize: '16px'
                }}
                autoFocus
                onFocus={() => {
                  const input = document.querySelector('input[type="text"]') as HTMLInputElement;
                  if (input) {
                    input.focus();
                  }
                }}
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
                onClick={handleInputTouch}
                className="cyber-button px-6 py-3 rounded-lg text-white font-bold text-lg mb-4 w-full"
              >
                📱 Try Mobile Keyboard
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
      
      {/* Custom Virtual Keyboard Modal */}
      {showVirtualKeyboard && <VirtualKeyboard />}
    </div>
  );
}