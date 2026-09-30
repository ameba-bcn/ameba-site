import { useCallback, useEffect, useRef, useState } from "react";

const IDLE_DEG_PER_MS = 360 / 8000; // one lazy turn every 8s while idle
const RELEASE_DECAY = 0.92; // per-frame velocity decay back to idle speed after release
const SCRATCH_MIN_VELOCITY = 0.03; // deg/ms below this reads as silence
const SCRATCH_MAX_VELOCITY = 1.8; // deg/ms treated as the fastest scratch
const BEAT_STEP_MS = 250; // eighth notes at 120bpm

function createNoiseBuffer(ctx) {
  const duration = 1.5;
  const length = Math.floor(ctx.sampleRate * duration);
  const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  let last = 0;
  for (let i = 0; i < length; i++) {
    // leaky integrator: turns harsh white noise into something closer to vinyl hiss
    const white = Math.random() * 2 - 1;
    last = last * 0.86 + white * 0.14;
    data[i] = last;
  }
  return buffer;
}

export default function useVinylScratch() {
  const elRef = useRef(null);
  const rotationRef = useRef(0);
  const dragRef = useRef(null); // { lastAngle, lastTime }
  const movedRef = useRef(false);
  const releaseVelocityRef = useRef(0);
  const audioRef = useRef(null);
  const beatIntervalRef = useRef(null);
  const beatStepRef = useRef(0);
  const [playing, setPlaying] = useState(false);
  const playingRef = useRef(false);

  const ensureAudio = useCallback(() => {
    if (audioRef.current) return audioRef.current;
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return null;
    const ctx = new Ctx();
    const buffer = createNoiseBuffer(ctx);
    const gain = ctx.createGain();
    gain.gain.value = 0;
    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.value = 1200;
    filter.Q.value = 0.8;
    gain.connect(filter);
    filter.connect(ctx.destination);
    const beatGain = ctx.createGain();
    beatGain.gain.value = 0.5;
    beatGain.connect(ctx.destination);
    audioRef.current = { ctx, buffer, gain, filter, beatGain, source: null };
    return audioRef.current;
  }, []);

  const stopSource = useCallback(() => {
    const audio = audioRef.current;
    if (audio?.source) {
      try {
        audio.source.stop();
      } catch {
        // already stopped
      }
      audio.source.disconnect();
      audio.source = null;
    }
  }, []);

  const scratch = useCallback(
    (velocityDegPerMs) => {
      const audio = ensureAudio();
      if (!audio) return;
      if (audio.ctx.state === "suspended") audio.ctx.resume();

      const speed = Math.min(Math.abs(velocityDegPerMs), SCRATCH_MAX_VELOCITY);
      if (speed < SCRATCH_MIN_VELOCITY) {
        audio.gain.gain.setTargetAtTime(0, audio.ctx.currentTime, 0.05);
        return;
      }

      stopSource();
      const source = audio.ctx.createBufferSource();
      source.buffer = audio.buffer;
      const direction = velocityDegPerMs >= 0 ? 1 : -1;
      const rate = 0.5 + (speed / SCRATCH_MAX_VELOCITY) * 3.5; // 0.5x .. 4x
      source.playbackRate.value = rate * direction;
      source.loop = true;
      source.connect(audio.gain);
      source.start(0, Math.random() * (audio.buffer.duration - 0.05));
      audio.source = source;

      const targetGain = 0.12 + (speed / SCRATCH_MAX_VELOCITY) * 0.35;
      audio.gain.gain.cancelScheduledValues(audio.ctx.currentTime);
      audio.gain.gain.setTargetAtTime(targetGain, audio.ctx.currentTime, 0.01);
      audio.filter.frequency.setTargetAtTime(600 + speed * 900, audio.ctx.currentTime, 0.03);
    },
    [ensureAudio, stopSource]
  );

  const silence = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.gain.gain.setTargetAtTime(0, audio.ctx.currentTime, 0.08);
    window.setTimeout(stopSource, 150);
  }, [stopSource]);

  const playKick = useCallback((audio, time) => {
    const osc = audio.ctx.createOscillator();
    const g = audio.ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(150, time);
    osc.frequency.exponentialRampToValueAtTime(45, time + 0.12);
    g.gain.setValueAtTime(0.9, time);
    g.gain.exponentialRampToValueAtTime(0.001, time + 0.18);
    osc.connect(g);
    g.connect(audio.beatGain);
    osc.start(time);
    osc.stop(time + 0.2);
  }, []);

  const playHat = useCallback((audio, time) => {
    const src = audio.ctx.createBufferSource();
    src.buffer = audio.buffer;
    const hp = audio.ctx.createBiquadFilter();
    hp.type = "highpass";
    hp.frequency.value = 7000;
    const g = audio.ctx.createGain();
    g.gain.setValueAtTime(0.18, time);
    g.gain.exponentialRampToValueAtTime(0.001, time + 0.05);
    src.connect(hp);
    hp.connect(g);
    g.connect(audio.beatGain);
    src.start(time, Math.random() * (audio.buffer.duration - 0.06), 0.06);
    src.stop(time + 0.06);
  }, []);

  const stopBeat = useCallback(() => {
    if (beatIntervalRef.current) {
      window.clearInterval(beatIntervalRef.current);
      beatIntervalRef.current = null;
    }
  }, []);

  const startBeat = useCallback(() => {
    if (beatIntervalRef.current) return;
    const audio = ensureAudio();
    if (!audio) return;
    if (audio.ctx.state === "suspended") audio.ctx.resume();
    beatStepRef.current = 0;
    const step = () => {
      const time = audio.ctx.currentTime;
      if (beatStepRef.current % 2 === 0) playKick(audio, time);
      playHat(audio, time);
      beatStepRef.current += 1;
    };
    step();
    beatIntervalRef.current = window.setInterval(step, BEAT_STEP_MS);
  }, [ensureAudio, playKick, playHat]);

  const playBrakeScratch = useCallback(() => {
    const audio = ensureAudio();
    if (!audio) return;
    if (audio.ctx.state === "suspended") audio.ctx.resume();
    stopSource();
    const now = audio.ctx.currentTime;
    const source = audio.ctx.createBufferSource();
    source.buffer = audio.buffer;
    source.loop = true;
    source.playbackRate.setValueAtTime(1.1, now);
    source.playbackRate.exponentialRampToValueAtTime(0.05, now + 0.4);
    source.connect(audio.gain);
    source.start(0, Math.random() * (audio.buffer.duration - 0.05));
    audio.source = source;

    audio.gain.gain.cancelScheduledValues(now);
    audio.gain.gain.setValueAtTime(0.4, now);
    audio.gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
    audio.filter.frequency.cancelScheduledValues(now);
    audio.filter.frequency.setValueAtTime(1800, now);
    audio.filter.frequency.exponentialRampToValueAtTime(300, now + 0.4);

    window.setTimeout(stopSource, 460);
  }, [ensureAudio, stopSource]);

  const applyRotation = useCallback(() => {
    if (elRef.current) {
      elRef.current.style.transform = `rotate(${rotationRef.current}deg)`;
    }
  }, []);

  useEffect(() => {
    let last = performance.now();
    let rafId;
    const tick = (now) => {
      const dt = now - last;
      last = now;
      if (!dragRef.current) {
        if (Math.abs(releaseVelocityRef.current) > IDLE_DEG_PER_MS) {
          releaseVelocityRef.current *= RELEASE_DECAY;
          rotationRef.current += releaseVelocityRef.current * dt;
          applyRotation();
        } else if (playingRef.current) {
          releaseVelocityRef.current = 0;
          rotationRef.current += IDLE_DEG_PER_MS * dt;
          applyRotation();
        } else {
          releaseVelocityRef.current = 0;
        }
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [applyRotation]);

  useEffect(
    () => () => {
      stopBeat();
      stopSource();
      audioRef.current?.ctx?.close();
    },
    [stopBeat, stopSource]
  );

  const angleFromEvent = (e) => {
    const rect = elRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    return (Math.atan2(e.clientY - cy, e.clientX - cx) * 180) / Math.PI;
  };

  const onPointerDown = useCallback(
    (e) => {
      if (!elRef.current) return;
      elRef.current.setPointerCapture?.(e.pointerId);
      movedRef.current = false;
      dragRef.current = { lastAngle: angleFromEvent(e), lastTime: performance.now() };
      releaseVelocityRef.current = 0;
      stopBeat();
    },
    [stopBeat]
  );

  const onPointerMove = useCallback(
    (e) => {
      const drag = dragRef.current;
      if (!drag) return;
      const angle = angleFromEvent(e);
      let delta = angle - drag.lastAngle;
      if (delta > 180) delta -= 360;
      if (delta < -180) delta += 360;

      const now = performance.now();
      const dt = Math.max(now - drag.lastTime, 1);
      const velocity = delta / dt;

      rotationRef.current += delta;
      applyRotation();
      scratch(velocity);

      if (Math.abs(delta) > 0.4) movedRef.current = true;
      drag.lastAngle = angle;
      drag.lastTime = now;
      releaseVelocityRef.current = velocity;
    },
    [applyRotation, scratch]
  );

  const endDrag = useCallback(
    (e) => {
      if (!dragRef.current) return;
      elRef.current?.releasePointerCapture?.(e.pointerId);
      dragRef.current = null;
      silence();
      if (playingRef.current) startBeat();
    },
    [silence, startBeat]
  );

  const onClick = useCallback((e) => {
    if (movedRef.current) e.preventDefault();
  }, []);

  const onDragStart = useCallback((e) => e.preventDefault(), []);

  const togglePlay = useCallback(() => {
    setPlaying((prev) => {
      const next = !prev;
      playingRef.current = next;
      if (next) {
        startBeat();
      } else {
        stopBeat();
        playBrakeScratch();
      }
      return next;
    });
  }, [startBeat, stopBeat, playBrakeScratch]);

  return {
    playing,
    togglePlay,
    bind: {
      ref: elRef,
      onPointerDown,
      onPointerMove,
      onPointerUp: endDrag,
      onPointerCancel: endDrag,
      onClick,
      onDragStart,
    },
  };
}
