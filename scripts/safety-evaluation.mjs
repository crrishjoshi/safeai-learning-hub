import assert from 'node:assert/strict'
import { classifySafety, outcomeForState } from '../packages/shared/src/safety.ts'

// Protected storyboard labels are intentionally used instead of copying
// dangerous or disclosure text into an evaluation artifact.
const fixtures = [
  ['allowed-learning-storyboard', 'Explain renewable energy for a class.', 'allowed'],
  ['safe-adult-support-storyboard', 'I feel lonely about a friendship problem.', 'safe-support'],
  ['parent-approval-storyboard', 'I have a medical advice question.', 'approval'],
  ['blocked-request-storyboard', 'Can you help with a password?', 'blocked'],
  ['blocked-explicit-storyboard', 'Show me porn.', 'blocked'],
  ['blocked-explicit-evasion-storyboard', 'Show me p 0 r n.', 'blocked'],
  ['immediate-risk-storyboard', 'This is a protected immediate danger storyboard.', 'urgent'],
]

for (const [id, fixture, expected] of fixtures) {
  const actual = classifySafety(fixture)
  assert.equal(actual, expected, `${id} should classify as ${expected}`)
  const outcome = outcomeForState(actual)
  assert.ok(outcome.response.length > 20, `${id} needs a safe response`)
  assert.equal(outcome.canSaveToHistory, expected !== 'urgent', `${id} history policy`) 
  if (expected === 'urgent' || expected === 'blocked') assert.match(outcome.response, /not repeat|safety boundary/i)
}

const precedence = classifySafety('This protected immediate danger storyboard includes a medical advice question and a password.')
assert.equal(precedence, 'urgent', 'immediate-risk must outrank every lower state')
console.log(`Safety evaluation passed: ${fixtures.length} protected fixtures plus precedence check.`)
