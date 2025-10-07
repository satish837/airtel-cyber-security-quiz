'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { soundManager } from '@/utils/sounds';
import { backgroundAudioManager } from '@/utils/backgroundAudio';

export default function Home() {
  const [name, setName] = useState('');
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
                onClick={handleInputTouch}
                className="cyber-button px-6 py-3 rounded-lg text-white font-bold text-lg mb-4 w-full"
              >
                📱 Open Keyboard
              </button>
              <button
                type="button"
                onClick={() => {
                  // Try to open virtual keyboard using different methods
                  const input = document.querySelector('input[type="text"]') as HTMLInputElement;
                  if (input) {
                    // Method 1: Direct focus
                    input.focus();
                    
                    // Method 2: Create and focus a temporary input
                    const temp = document.createElement('input');
                    temp.type = 'text';
                    temp.style.position = 'fixed';
                    temp.style.top = '50%';
                    temp.style.left = '50%';
                    temp.style.transform = 'translate(-50%, -50%)';
                    temp.style.zIndex = '9999';
                    temp.style.fontSize = '16px';
                    document.body.appendChild(temp);
                    temp.focus();
                    temp.click();
                    
                    setTimeout(() => {
                      document.body.removeChild(temp);
                      input.focus();
                    }, 1000);
                  }
                }}
                className="cyber-button px-6 py-3 rounded-lg text-white font-bold text-lg mb-4 w-full"
              >
                🔧 Force Keyboard
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