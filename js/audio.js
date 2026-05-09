export class AudioSystem {
  constructor() {
    this.ctx = null;
    this.bgmOscs = [];
    this.masterGain = null;
    this.currentTheme = null;
    this.isPlaying = false;
  }

  async init() {
    try {
      if (!this.ctx) {
        this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.value = 0.3;
        this.masterGain.connect(this.ctx.destination);
      }
      if (this.ctx.state === 'suspended') {
        await this.ctx.resume();
      }
    } catch(e) {
      console.warn('Audio init failed:', e);
    }
  }

  playTheme(mood) {
    if (!this.ctx || !this.masterGain) return;
    if (this.currentTheme === mood && this.isPlaying) return;
    this.stopTheme();
    this.currentTheme = mood;
    this.isPlaying = true;

    const t = this.ctx.currentTime;
    const chord = this._getChordForMood(mood);
    chord.forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = mood === 'tense' ? 'sawtooth' : 'sine';
      osc.frequency.value = freq;
      const lfo = this.ctx.createOscillator();
      lfo.type = 'sine';
      lfo.frequency.value = 0.1 + (i * 0.02);
      const lfoGain = this.ctx.createGain();
      lfoGain.gain.value = 0.3;
      lfo.connect(lfoGain);
      lfoGain.connect(gain.gain);
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.2 / chord.length, t + 2);
      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(t);
      lfo.start(t);
      this.bgmOscs.push({osc, gain, lfo, lfoGain});
    });
  }

  stopTheme() {
    if (!this.ctx) return;
    this.isPlaying = false;
    const t = this.ctx.currentTime;
    this.bgmOscs.forEach(node => {
      node.gain.gain.cancelScheduledValues(t);
      node.gain.gain.setValueAtTime(node.gain.gain.value, t);
      node.gain.gain.linearRampToValueAtTime(0, t + 1);
      setTimeout(() => {
        try { node.osc.stop(); node.lfo.stop(); } catch(e){}
      }, 1000);
    });
    this.bgmOscs = [];
  }

  _getChordForMood(mood) {
    switch(mood) {
      case 'calm': return [220, 277.18, 329.63];
      case 'suspense': return [196, 233.08, 293.66];
      case 'tense': return [110, 130.81, 164.81];
      case 'sad': return [174.61, 207.65, 261.63];
      case 'ending': return [261.63, 329.63, 392.00, 523.25];
      default: return [220, 261.63, 329.63];
    }
  }

  playClick() { this._playTone(600, 'sine', 0.05, 0.1); }
  playType() { this._playTone(800 + Math.random()*200, 'square', 0.02, 0.05); }
  playWarning() {
    this._playTone(300, 'sawtooth', 0.5, 0.3);
    setTimeout(() => this._playTone(250, 'sawtooth', 0.5, 0.4), 200);
  }
  playSuccess() {
    this._playTone(440, 'sine', 0.1, 0.2);
    setTimeout(() => this._playTone(554.37, 'sine', 0.1, 0.2), 100);
    setTimeout(() => this._playTone(659.25, 'sine', 0.3, 0.4), 200);
  }

  _playTone(freq, type, attack, decay) {
    if (!this.ctx || !this.masterGain) return;
    if (this.ctx.state === 'suspended') return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const t = this.ctx.currentTime;
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t);
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(0.1, t + attack);
    gain.gain.exponentialRampToValueAtTime(0.001, t + attack + decay);
    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(t);
    osc.stop(t + attack + decay);
  }
}

export const audio = new AudioSystem();
