// Sound utility functions for the quiz app

export class SoundManager {
  private static instance: SoundManager;
  private audioContext: AudioContext | null = null;
  private sounds: Map<string, AudioBuffer> = new Map();

  private constructor() {
    // Initialize audio context when first sound is played
  }

  public static getInstance(): SoundManager {
    if (!SoundManager.instance) {
      SoundManager.instance = new SoundManager();
    }
    return SoundManager.instance;
  }

  private async initAudioContext(): Promise<void> {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    }
  }

  // Generate click sound
  private generateClickSound(): AudioBuffer | null {
    if (!this.audioContext) return null;
    
    const sampleRate = this.audioContext.sampleRate;
    const duration = 0.1; // 100ms
    const length = sampleRate * duration;
    const buffer = this.audioContext.createBuffer(1, length, sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < length; i++) {
      const t = i / sampleRate;
      // Generate a short beep sound
      data[i] = Math.sin(2 * Math.PI * 800 * t) * Math.exp(-t * 20) * 0.3;
    }

    return buffer;
  }

  // Generate win sound
  private generateWinSound(): AudioBuffer | null {
    if (!this.audioContext) return null;
    
    const sampleRate = this.audioContext.sampleRate;
    const duration = 0.5; // 500ms
    const length = sampleRate * duration;
    const buffer = this.audioContext.createBuffer(1, length, sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < length; i++) {
      const t = i / sampleRate;
      // Generate ascending melody for win
      const frequency = 400 + (t * 400); // Ascending from 400Hz to 800Hz
      data[i] = Math.sin(2 * Math.PI * frequency * t) * Math.exp(-t * 2) * 0.4;
    }

    return buffer;
  }

  // Generate lose sound
  private generateLoseSound(): AudioBuffer | null {
    if (!this.audioContext) return null;
    
    const sampleRate = this.audioContext.sampleRate;
    const duration = 0.3; // 300ms
    const length = sampleRate * duration;
    const buffer = this.audioContext.createBuffer(1, length, sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < length; i++) {
      const t = i / sampleRate;
      // Generate descending tone for lose
      const frequency = 600 - (t * 300); // Descending from 600Hz to 300Hz
      data[i] = Math.sin(2 * Math.PI * frequency * t) * Math.exp(-t * 3) * 0.3;
    }

    return buffer;
  }

  public async playClickSound(): Promise<void> {
    try {
      await this.initAudioContext();
      if (!this.audioContext) return;

      const buffer = this.generateClickSound();
      const source = this.audioContext.createBufferSource();
      source.buffer = buffer;
      source.connect(this.audioContext.destination);
      source.start();
    } catch {
      console.log('Audio not supported or user interaction required');
    }
  }

  public async playWinSound(): Promise<void> {
    try {
      await this.initAudioContext();
      if (!this.audioContext) return;

      const buffer = this.generateWinSound();
      const source = this.audioContext.createBufferSource();
      source.buffer = buffer;
      source.connect(this.audioContext.destination);
      source.start();
    } catch {
      console.log('Audio not supported or user interaction required');
    }
  }

  public async playLoseSound(): Promise<void> {
    try {
      await this.initAudioContext();
      if (!this.audioContext) return;

      const buffer = this.generateLoseSound();
      const source = this.audioContext.createBufferSource();
      source.buffer = buffer;
      source.connect(this.audioContext.destination);
      source.start();
    } catch {
      console.log('Audio not supported or user interaction required');
    }
  }
}

// Export singleton instance
export const soundManager = SoundManager.getInstance();

