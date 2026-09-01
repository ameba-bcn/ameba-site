// Mini emulació d'una caixa de ritmes Roland TR-808 amb Web Audio API pura
// (sense mostres ni dependències). Cada so es sintetitza amb oscil·ladors i
// soroll blanc filtrat, tal com feia el maquinari original.

function noiseBuffer(ctx, duration) {
  const buffer = ctx.createBuffer(1, ctx.sampleRate * duration, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i += 1) {
    data[i] = Math.random() * 2 - 1;
  }
  return buffer;
}

function envelope(ctx, gainNode, { attack = 0.001, peak = 1, decay = 0.2 }, startTime) {
  const gain = gainNode.gain;
  gain.cancelScheduledValues(startTime);
  gain.setValueAtTime(0, startTime);
  gain.linearRampToValueAtTime(peak, startTime + attack);
  gain.exponentialRampToValueAtTime(0.0001, startTime + attack + decay);
}

function playKick(ctx, destination, time) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(150, time);
  osc.frequency.exponentialRampToValueAtTime(40, time + 0.25);
  envelope(ctx, gain, { peak: 1, decay: 0.35 }, time);
  osc.connect(gain).connect(destination);
  osc.start(time);
  osc.stop(time + 0.4);
}

function playSnare(ctx, destination, time) {
  const osc = ctx.createOscillator();
  const oscGain = ctx.createGain();
  osc.type = "triangle";
  osc.frequency.setValueAtTime(180, time);
  envelope(ctx, oscGain, { peak: 0.6, decay: 0.12 }, time);
  osc.connect(oscGain).connect(destination);

  const noise = ctx.createBufferSource();
  noise.buffer = noiseBuffer(ctx, 0.2);
  const noiseFilter = ctx.createBiquadFilter();
  noiseFilter.type = "highpass";
  noiseFilter.frequency.value = 1000;
  const noiseGain = ctx.createGain();
  envelope(ctx, noiseGain, { peak: 0.8, decay: 0.18 }, time);
  noise.connect(noiseFilter).connect(noiseGain).connect(destination);

  osc.start(time);
  osc.stop(time + 0.15);
  noise.start(time);
  noise.stop(time + 0.2);
}

function playHiHat(ctx, destination, time, { open = false } = {}) {
  const fundamentals = [205, 305, 365, 415, 505, 605];
  const gain = ctx.createGain();
  const bandpass = ctx.createBiquadFilter();
  bandpass.type = "bandpass";
  bandpass.frequency.value = 10000;
  const highpass = ctx.createBiquadFilter();
  highpass.type = "highpass";
  highpass.frequency.value = 7000;

  fundamentals.forEach((freq) => {
    const osc = ctx.createOscillator();
    osc.type = "square";
    osc.frequency.value = freq;
    osc.connect(bandpass);
    osc.start(time);
    osc.stop(time + (open ? 0.5 : 0.08));
  });

  bandpass.connect(highpass).connect(gain).connect(destination);
  envelope(ctx, gain, { peak: open ? 0.35 : 0.4, decay: open ? 0.45 : 0.06 }, time);
}

function playTom(ctx, destination, time, { startFreq, endFreq }) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(startFreq, time);
  osc.frequency.exponentialRampToValueAtTime(endFreq, time + 0.2);
  envelope(ctx, gain, { peak: 0.9, decay: 0.3 }, time);
  osc.connect(gain).connect(destination);
  osc.start(time);
  osc.stop(time + 0.35);
}

function playClap(ctx, destination, time) {
  [0, 0.02, 0.04].forEach((delay, i) => {
    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuffer(ctx, 0.2);
    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.value = 1200;
    const gain = ctx.createGain();
    const start = time + delay;
    envelope(ctx, gain, { peak: i === 2 ? 0.7 : 0.5, decay: i === 2 ? 0.25 : 0.05 }, start);
    noise.connect(filter).connect(gain).connect(destination);
    noise.start(start);
    noise.stop(start + 0.25);
  });
}

function playCowbell(ctx, destination, time) {
  const gain = ctx.createGain();
  const bandpass = ctx.createBiquadFilter();
  bandpass.type = "bandpass";
  bandpass.frequency.value = 800;

  [540, 800].forEach((freq) => {
    const osc = ctx.createOscillator();
    osc.type = "square";
    osc.frequency.value = freq;
    osc.connect(bandpass);
    osc.start(time);
    osc.stop(time + 0.3);
  });

  bandpass.connect(gain).connect(destination);
  envelope(ctx, gain, { peak: 0.5, decay: 0.3 }, time);
}

// Ordre 1:1 amb `STATS` a src/content/associacio.js — cada estadística
// dispara el so corresponent en clicar-la en mode "live".
const SOUNDS = [
  (ctx, dest, t) => playKick(ctx, dest, t),
  (ctx, dest, t) => playSnare(ctx, dest, t),
  (ctx, dest, t) => playHiHat(ctx, dest, t, { open: false }),
  (ctx, dest, t) => playHiHat(ctx, dest, t, { open: true }),
  (ctx, dest, t) => playTom(ctx, dest, t, { startFreq: 120, endFreq: 80 }),
  (ctx, dest, t) => playTom(ctx, dest, t, { startFreq: 200, endFreq: 140 }),
  (ctx, dest, t) => playClap(ctx, dest, t),
  (ctx, dest, t) => playCowbell(ctx, dest, t),
];

export function create808DrumMachine() {
  let ctx = null;

  function getContext() {
    if (!ctx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      ctx = new AudioContextClass();
    }
    if (ctx.state === "suspended") {
      ctx.resume();
    }
    return ctx;
  }

  return {
    play(index) {
      const sound = SOUNDS[index % SOUNDS.length];
      if (!sound) return;
      const audioCtx = getContext();
      sound(audioCtx, audioCtx.destination, audioCtx.currentTime);
    },
    dispose() {
      if (ctx) {
        ctx.close();
        ctx = null;
      }
    },
  };
}
