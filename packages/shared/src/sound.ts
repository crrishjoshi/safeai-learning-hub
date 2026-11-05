/**
 * Web Audio API synthesized sound generator for SafeAI Learning Hub.
 *
 * Rules:
 * 1. Zero external network requests or audio file fetches (self-contained Web Audio synthesis).
 * 2. Zero client-side persistent storage (keeps in-memory state only).
 * 3. Warm, subtle, non-intrusive micro-audio feedback.
 * 4. Respects prefers-reduced-motion (silenced automatically when reduced motion is requested).
 * 5. Urgent risk and blocked safety states use calm, neutral tones—NEVER exciting, alarming, or punitive sounds.
 * 6. Graceful no-op in headless / SSR environments (Node.js tests).
 */

import type { SafetyState } from './types.ts'

let audioCtx: AudioContext | null = null
let inMemoryMuted = false

/**
 * Returns whether audio is currently muted.
 */
export function isAudioMuted(): boolean {
  return inMemoryMuted
}

/**
 * Sets the audio mute state.
 */
export function setAudioMuted(muted: boolean): void {
  inMemoryMuted = muted
}

/**
 * Toggles the audio mute state and returns the new muted state.
 */
export function toggleAudio(): boolean {
  inMemoryMuted = !inMemoryMuted
  return inMemoryMuted
}

/**
 * Checks if sound should play (unmuted, audio context available, and no reduced-motion preference).
 */
export function shouldPlayAudio(): boolean {
  if (inMemoryMuted) return false
  if (typeof window === 'undefined') return false
  if (typeof window.matchMedia === 'function') {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return false
    }
  }
  return true
}

/**
 * Lazily initialize the AudioContext upon first user interaction to comply with browser autoplay policies.
 */
function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null
  try {
    if (!audioCtx) {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (AudioCtxClass) {
        audioCtx = new AudioCtxClass()
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      void audioCtx.resume()
    }
    return audioCtx
  } catch {
    return null
  }
}

/**
 * Play a subtle soft tap / click (e.g. for small button taps).
 */
export function playTapSound(): void {
  if (!shouldPlayAudio()) return
  const ctx = getAudioContext()
  if (!ctx) return

  try {
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = 'sine'
    osc.frequency.setValueAtTime(540, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(320, ctx.currentTime + 0.035)

    gain.gain.setValueAtTime(0.04, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.035)

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.start()
    osc.stop(ctx.currentTime + 0.038)
  } catch {
    // Graceful no-op on audio error
  }
}

/**
 * Play a light navigation tab tick.
 */
export function playTabSound(): void {
  if (!shouldPlayAudio()) return
  const ctx = getAudioContext()
  if (!ctx) return

  try {
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = 'sine'
    osc.frequency.setValueAtTime(640, ctx.currentTime)
    gain.gain.setValueAtTime(0.035, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.03)

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.start()
    osc.stop(ctx.currentTime + 0.032)
  } catch {
    // Graceful no-op
  }
}

/**
 * Play a pleasant ascending blip when a user sends a message.
 */
export function playSendSound(): void {
  if (!shouldPlayAudio()) return
  const ctx = getAudioContext()
  if (!ctx) return

  try {
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = 'sine'
    osc.frequency.setValueAtTime(440, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(660, ctx.currentTime + 0.075)

    gain.gain.setValueAtTime(0.06, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.08)

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.start()
    osc.stop(ctx.currentTime + 0.085)
  } catch {
    // Graceful no-op
  }
}

/**
 * Play an appropriate, non-alarming sound when an assistant response arrives.
 *
 * For urgent and blocked: calm, neutral, low-frequency warm tone.
 * Never harsh, buzzy, alarming, or punitive.
 */
export function playReceiveSound(state?: SafetyState): void {
  if (!shouldPlayAudio()) return
  const ctx = getAudioContext()
  if (!ctx) return

  try {
    if (state === 'urgent' || state === 'blocked') {
      // Gentle, calm single tone (E4 - 330Hz) - reassuring and neutral
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.type = 'sine'
      osc.frequency.setValueAtTime(330, ctx.currentTime)
      gain.gain.setValueAtTime(0.045, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.12)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start()
      osc.stop(ctx.currentTime + 0.125)
      return
    }

    // Friendly 2-note chime for allowed, safe-support, and approval
    const now = ctx.currentTime

    // Note 1: C5 (523.25 Hz)
    const osc1 = ctx.createOscillator()
    const gain1 = ctx.createGain()
    osc1.type = 'sine'
    osc1.frequency.setValueAtTime(523.25, now)
    gain1.gain.setValueAtTime(0.045, now)
    gain1.gain.exponentialRampToValueAtTime(0.0001, now + 0.08)
    osc1.connect(gain1)
    gain1.connect(ctx.destination)
    osc1.start(now)
    osc1.stop(now + 0.085)

    // Note 2: E5 (659.25 Hz)
    const osc2 = ctx.createOscillator()
    const gain2 = ctx.createGain()
    osc2.type = 'sine'
    osc2.frequency.setValueAtTime(659.25, now + 0.07)
    gain2.gain.setValueAtTime(0.0001, now)
    gain2.gain.setValueAtTime(0.05, now + 0.07)
    gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.16)
    osc2.connect(gain2)
    gain2.connect(ctx.destination)
    osc2.start(now + 0.07)
    osc2.stop(now + 0.165)
  } catch {
    // Graceful no-op
  }
}

/**
 * Play a subtle switch toggle click (e.g. settings toggles).
 */
export function playToggleSound(checked?: boolean): void {
  if (!shouldPlayAudio()) return
  const ctx = getAudioContext()
  if (!ctx) return

  try {
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = 'sine'
    const freq = checked ? 720 : 480
    osc.frequency.setValueAtTime(freq, ctx.currentTime)
    gain.gain.setValueAtTime(0.035, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.04)

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.start()
    osc.stop(ctx.currentTime + 0.045)
  } catch {
    // Graceful no-op
  }
}

/**
 * Play a gentle airy step ping for walkthrough navigation.
 */
export function playTourStepSound(): void {
  if (!shouldPlayAudio()) return
  const ctx = getAudioContext()
  if (!ctx) return

  try {
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = 'sine'
    osc.frequency.setValueAtTime(620, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(780, ctx.currentTime + 0.06)

    gain.gain.setValueAtTime(0.04, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.065)

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.start()
    osc.stop(ctx.currentTime + 0.07)
  } catch {
    // Graceful no-op
  }
}
