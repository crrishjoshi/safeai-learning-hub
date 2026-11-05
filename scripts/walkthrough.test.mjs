import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import test from 'node:test'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const child = fs.readFileSync(path.join(root, 'apps/child/src/App.tsx'), 'utf8')
const parent = fs.readFileSync(path.join(root, 'apps/parent/src/App.tsx'), 'utf8')
const popover = fs.readFileSync(path.join(root, 'packages/shared/src/ContextualPopover.tsx'), 'utf8')
const types = fs.readFileSync(path.join(root, 'packages/shared/src/types.ts'), 'utf8')
const css = fs.readFileSync(path.join(root, 'packages/shared/src/styles.css'), 'utf8')
const sound = fs.readFileSync(path.join(root, 'packages/shared/src/sound.ts'), 'utf8')

test('child and parent walkthrough foundations have real contextual popovers and full targets', () => {
  // Contextual popover engine tests
  assert.match(popover, /Step \{stepIndex \+ 1\} of \{totalSteps\}/)
  assert.match(popover, /Skip/)
  assert.match(popover, /Finish tour/)
  assert.match(popover, /tour-target-active/)
  assert.match(popover, /Escape/)

  // Child app walkthrough targets (9 controls)
  const childTargets = [
    'tour-child-chat',
    'tour-child-send',
    'tour-child-prompts',
    'tour-child-lessons',
    'tour-child-privacy',
    'tour-child-status',
    'tour-child-history',
    'tour-child-help',
    'tour-child-account',
  ]
  for (const target of childTargets) {
    assert.ok(child.includes(target) || types.includes(target), `Missing child walkthrough target: ${target}`)
  }
  assert.match(child, /Restart guided walkthrough/)

  // Parent app walkthrough targets (10 controls)
  const parentTargets = [
    'tour-parent-switcher',
    'tour-parent-overview',
    'tour-parent-approvals',
    'tour-parent-alerts',
    'tour-parent-history',
    'tour-parent-api',
    'tour-parent-accounts',
    'tour-parent-access',
    'tour-parent-privacy',
    'tour-parent-signout',
  ]
  for (const target of parentTargets) {
    assert.ok(parent.includes(target) || types.includes(target), `Missing parent walkthrough target: ${target}`)
  }
  assert.match(parent, /Restart parent walkthrough/)
  assert.match(parent, /Approval centre/)
  assert.match(parent, /Safety alerts/)
})

test('parent UI enforces masked API settings and multi-child switching', () => {
  assert.match(parent, /type="password"/)
  assert.match(parent, /maskedEnding/)
  assert.match(parent, /Rotate key/)
  assert.match(parent, /Test connection/)
  assert.match(parent, /Create a new parent account/)
  assert.match(parent, /Create a child account/)
  assert.match(parent, /fetchLinkedChildren/)
  // Disallow any copy button for secrets
  assert.doesNotMatch(parent, /copy.*key|copy.*secret/i)
  // Multi-child switcher tests
  assert.match(parent, /child-switcher/)
  assert.doesNotMatch(parent, /MOCK_/)
  assert.doesNotMatch(types, /Maya R\.|Leo R\.|Sam Jr\./)
})

test('new product has separate app entry points and no retired demo controls', () => {
  assert.ok(fs.existsSync(path.join(root, 'apps/child/index.html')))
  assert.ok(fs.existsSync(path.join(root, 'apps/parent/index.html')))
  assert.match(child, /Sign in with the child account created by your parent/)
  assert.doesNotMatch(child, /Create (?:a|your) .*account/i)
  for (const source of [child, parent]) {
    assert.doesNotMatch(source, /View switcher|\/demo/)
    assert.doesNotMatch(source, /localStorage|sessionStorage|indexedDB|fetch\(|WebSocket|EventSource/)
  }
  assert.match(child, /Reset demo/)
  assert.match(parent, /Reset demo/)
})

test('accessibility styling includes focus, colour-plus-text labels, mobile nav and reduced motion', () => {
  assert.match(css, /focus-visible/)
  assert.match(css, /prefers-reduced-motion: reduce/)
  assert.match(css, /status-label/)
  assert.match(css, /animation-duration: \.01ms/)
  assert.match(css, /mobile-bottom-nav/)
  assert.match(css, /contextual-popover/)
  assert.doesNotMatch(css, /--ink:\s*(#000000|black)\b/)
})

test('child history never repeats the typed question', () => {
  const record = child.slice(child.indexOf('const newRecord'), child.indexOf('setHistoryItems((prev)'))
  assert.match(record, /summary: HISTORY_SUMMARY\[outcome\.state\]/)
  assert.doesNotMatch(record, /trimmed|textToSend|inputText/)
  assert.match(child, /if \(outcome\.canSaveToHistory\)/)
})

test('sound effects, subtle animations, and audio controls are accessible and safe', () => {
  // Web Audio synthesis verification (no external file downloads or storage leaks)
  assert.match(sound, /AudioContext/)
  assert.match(sound, /prefers-reduced-motion/)
  assert.doesNotMatch(sound, /localStorage|sessionStorage|indexedDB|fetch\(|WebSocket|EventSource/)
  assert.match(sound, /playSendSound/)
  assert.match(sound, /playReceiveSound/)
  assert.match(sound, /playTapSound/)
  assert.match(sound, /playTabSound/)
  assert.match(sound, /playToggleSound/)
  assert.match(sound, /playTourStepSound/)

  // Both child and parent have visible sound toggle buttons
  assert.match(child, /sound-toggle-btn/)
  assert.match(parent, /sound-toggle-btn/)
  assert.match(child, /handleToggleSound/)
  assert.match(parent, /handleToggleSound/)

  // CSS contains subtle animations and respects reduced motion
  assert.match(css, /@keyframes bootsFloat/)
  assert.match(css, /@keyframes bootsBlink/)
  assert.match(css, /@keyframes messageEntrance/)
  assert.match(css, /@keyframes tourTargetPulse/)
  assert.match(css, /sound-toggle-btn/)
})
