let ctx: AudioContext | null = null;

function getCtx(): AudioContext {
  if (!ctx) ctx = new AudioContext();
  if (ctx.state === 'suspended') ctx.resume();
  return ctx;
}

function playTone(freq: number, duration: number, gain: number, type: OscillatorType = 'sine') {
  const c = getCtx();
  const osc = c.createOscillator();
  const g = c.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  g.gain.setValueAtTime(gain, c.currentTime);
  g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + duration);
  osc.connect(g).connect(c.destination);
  osc.start();
  osc.stop(c.currentTime + duration);
}

function playNoise(duration: number, gain: number) {
  const c = getCtx();
  const bufferSize = c.sampleRate * duration;
  const buffer = c.createBuffer(1, bufferSize, c.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
  const src = c.createBufferSource();
  const g = c.createGain();
  src.buffer = buffer;
  g.gain.setValueAtTime(gain, c.currentTime);
  g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + duration);
  src.connect(g).connect(c.destination);
  src.start();
}

const sounds = {
  tap() {
    playTone(800, 0.06, 0.1);
  },
  flip() {
    playTone(300, 0.12, 0.1);
    setTimeout(() => playTone(600, 0.08, 0.08), 40);
  },
  swipe() {
    playNoise(0.08, 0.06);
  },
  toggle() {
    playTone(600, 0.06, 0.08);
    setTimeout(() => playTone(900, 0.06, 0.06), 60);
  },
  shuffle() {
    playNoise(0.04, 0.05);
    setTimeout(() => playNoise(0.04, 0.04), 50);
    setTimeout(() => playNoise(0.04, 0.03), 100);
  },
  back() {
    playTone(400, 0.07, 0.08);
  },
};

export type SoundName = keyof typeof sounds;

export function playSound(name: SoundName): void {
  try {
    sounds[name]();
  } catch {
    // Silently fail if audio context not available
  }
}
