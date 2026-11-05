import { useEffect, useRef } from 'react'
import { playTapSound, playTourStepSound } from './sound.ts'
import { IconX } from './icons.tsx'
import type { WalkthroughStep } from './types.ts'

export interface ContextualPopoverProps {
  step: WalkthroughStep
  stepIndex: number
  totalSteps: number
  onNext: () => void
  onPrev?: () => void
  onSkip: () => void
  role: 'child' | 'parent'
}

export function ContextualPopover({
  step,
  stepIndex,
  totalSteps,
  onNext,
  onPrev,
  onSkip,
  role,
}: ContextualPopoverProps) {
  const popoverRef = useRef<HTMLElement>(null)

  // Focus management on mount and step change
  useEffect(() => {
    popoverRef.current?.focus()
  }, [stepIndex])

  // Keyboard navigation & Escape handling
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const isInput = event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement
      if (event.key === 'Escape') {
        event.preventDefault()
        playTapSound()
        onSkip()
      } else if (event.key === 'ArrowRight' && !isInput) {
        event.preventDefault()
        playTourStepSound()
        onNext()
      } else if (event.key === 'ArrowLeft' && !isInput && onPrev && stepIndex > 0) {
        event.preventDefault()
        playTourStepSound()
        onPrev()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onNext, onPrev, onSkip, stepIndex])

  // Target highlighting and scrolling into view
  useEffect(() => {
    const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const target = document.getElementById(step.targetId)

    // Remove active tour target from any previously highlighted element
    document.querySelectorAll('.tour-target-active').forEach((el) => {
      el.classList.remove('tour-target-active')
    })

    if (target) {
      target.classList.add('tour-target-active')
      target.scrollIntoView({
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
        block: 'nearest',
        inline: 'nearest',
      })
    }

    return () => {
      if (target) {
        target.classList.remove('tour-target-active')
      }
    }
  }, [step.targetId])

  const isFinalStep = stepIndex === totalSteps - 1
  const progressPercent = Math.round(((stepIndex + 1) / totalSteps) * 100)

  return (
    <aside
      ref={popoverRef}
      tabIndex={-1}
      className={`contextual-popover role-${role}`}
      role="dialog"
      aria-modal="false"
      aria-label={`${role === 'child' ? 'Child' : 'Parent'} guided walkthrough`}
      aria-live="polite"
    >
      <div className="popover-header">
        <span className="popover-target-pill">
          <span className="pill-dot" aria-hidden="true" />
          <span>Explaining: <strong>{step.targetLabel}</strong></span>
        </span>
        <button
          type="button"
          className="popover-close-btn"
          onClick={() => {
            playTapSound()
            onSkip()
          }}
          aria-label="Skip walkthrough (or press Escape)"
          title="Skip walkthrough (Escape)"
        >
          <IconX size={13} />
        </button>
      </div>

      <div className="popover-body">
        <h3 className="popover-title">{step.title}</h3>
        <p className="popover-desc">{step.description}</p>
      </div>

      <div className="popover-progress-row">
        <div
          className="popover-progress-track"
          role="progressbar"
          aria-valuenow={stepIndex + 1}
          aria-valuemin={1}
          aria-valuemax={totalSteps}
          aria-label="Walkthrough progress"
        >
          <div className="popover-progress-fill" style={{ width: `${progressPercent}%` }} />
        </div>
        <span className="popover-step-text">
          Step {stepIndex + 1} of {totalSteps}
        </span>
      </div>

      <div className="popover-footer">
        <button
          type="button"
          className="button button-quiet button-sm"
          onClick={() => {
            playTapSound()
            onSkip()
          }}
        >
          Skip
        </button>
        <div className="popover-nav-group">
          {stepIndex > 0 && onPrev && (
            <button
              type="button"
              className="button button-secondary button-sm"
              onClick={() => {
                playTourStepSound()
                onPrev()
              }}
            >
              Back
            </button>
          )}
          <button
            type="button"
            className="button button-primary button-sm"
            onClick={() => {
              playTourStepSound()
              onNext()
            }}
          >
            {isFinalStep ? 'Finish tour' : 'Next'}
          </button>
        </div>
      </div>
    </aside>
  )
}
