// Sound utility using Web Audio API — no audio files needed!

let audioCtx = null;

function getAudioCtx() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioCtx;
}

/**
 * Plays a short, satisfying button click sound.
 */
export function playClick() {
  try {
    const ctx = getAudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.08);
    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.1);
  } catch (e) { /* ignore */ }
}

/**
 * Plays a soft "add to cart" pop sound.
 */
export function playPop() {
  try {
    const ctx = getAudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = 'sine';
    osc.frequency.setValueAtTime(400, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.05);
    osc.frequency.exponentialRampToValueAtTime(500, ctx.currentTime + 0.15);
    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.2);
  } catch (e) { /* ignore */ }
}

/**
 * Plays a joyful celebratory melody after a successful order!
 */
export function playCelebration() {
  try {
    const ctx = getAudioCtx();

    // A cheerful ascending arpeggio: C E G C (major chord)
    const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51];
    const durations = [0.12, 0.12, 0.12, 0.18, 0.35];
    let startTime = ctx.currentTime + 0.05;

    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, startTime);
      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.25, startTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + durations[i]);
      osc.start(startTime);
      osc.stop(startTime + durations[i] + 0.02);
      startTime += durations[i] * 0.9;
    });

    // Add a warm bass note underneath
    const bassOsc = ctx.createOscillator();
    const bassGain = ctx.createGain();
    bassOsc.connect(bassGain);
    bassGain.connect(ctx.destination);
    bassOsc.type = 'sine';
    bassOsc.frequency.setValueAtTime(130.81, ctx.currentTime + 0.05);
    bassGain.gain.setValueAtTime(0.3, ctx.currentTime + 0.05);
    bassGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.9);
    bassOsc.start(ctx.currentTime + 0.05);
    bassOsc.stop(ctx.currentTime + 0.95);
  } catch (e) { /* ignore */ }
}
