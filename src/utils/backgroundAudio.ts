class BackgroundAudioManager {
  private audio: HTMLAudioElement | null = null;
  private isPlaying = false;

  playBackgroundMusic() {
    if (this.audio) {
      this.audio.currentTime = 0;
      this.audio.play().catch(console.error);
      this.isPlaying = true;
      return;
    }

    this.audio = new Audio('/option1.mp3');
    this.audio.loop = true;
    this.audio.volume = 0.3; // Set volume to 30%
    
    this.audio.addEventListener('canplaythrough', () => {
      this.audio?.play().catch(console.error);
      this.isPlaying = true;
    });

    this.audio.addEventListener('error', (e) => {
      console.error('Background audio error:', e);
    });
  }

  stopBackgroundMusic() {
    if (this.audio && this.isPlaying) {
      this.audio.pause();
      this.audio.currentTime = 0;
      this.isPlaying = false;
    }
  }

  pauseBackgroundMusic() {
    if (this.audio && this.isPlaying) {
      this.audio.pause();
      this.isPlaying = false;
    }
  }

  resumeBackgroundMusic() {
    if (this.audio && !this.isPlaying) {
      this.audio.play().catch(console.error);
      this.isPlaying = true;
    }
  }

  setVolume(volume: number) {
    if (this.audio) {
      this.audio.volume = Math.max(0, Math.min(1, volume));
    }
  }

  isCurrentlyPlaying() {
    return this.isPlaying;
  }
}

export const backgroundAudioManager = new BackgroundAudioManager();
