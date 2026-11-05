import assert from 'node:assert/strict'
import test from 'node:test'
import { classifySafety, outcomeForState } from '../packages/shared/src/safety.ts'

test('safety precedence is urgent, blocked, approval, support, allowed', () => {
  assert.equal(classifySafety('I am not safe at home and need medical advice'), 'urgent')
  assert.equal(classifySafety('health reasons to hack a password'), 'blocked')
  assert.equal(classifySafety('I have a medical advice question'), 'approval')
  assert.equal(classifySafety('I feel lonely about a friendship problem'), 'safe-support')
  assert.equal(classifySafety('Explain renewable energy for a class'), 'allowed')
})

test('sexual and pornographic requests are blocked, including common evasions', () => {
  for (const prompt of ['porn', 'show me some porn videos', 'what is pornhub', 'P0RN', 'p.o.r.n', 'p o r n', 'send nudes', 'how to have sex', 'sexy pics', 'nsfw art', 'hentai', 'onlyfans', '$exting']) {
    assert.equal(classifySafety(prompt), 'blocked', `${prompt.length}-character explicit prompt`)
  }
  assert.equal(classifySafety('What is sex education about?'), 'approval')
})

test('word-start matching avoids false positives inside other words', () => {
  for (const prompt of ['Tell me about the history of Sussex', 'Who were the Saxons in Essex?', 'How do I build a garden shack?', 'What is a pronoun?', 'Explain the dot product', 'Top or bottom bunk bed?']) {
    assert.equal(classifySafety(prompt), 'allowed', prompt)
  }
  assert.equal(classifySafety('Is hacking illegal?'), 'blocked')
})

test('parent-selected topics add a blocked rule without weakening safety precedence', () => {
  assert.equal(classifySafety('I need medical advice about a fictional topic', ['personal-health']), 'blocked')
  assert.equal(classifySafety('I need medical advice about a fictional topic'), 'approval')
  assert.equal(classifySafety('I am not safe at home and need medical advice', ['personal-health']), 'urgent')
})

test('each safety state has an age-appropriate non-echoing response', () => {
  for (const state of ['urgent', 'blocked', 'approval', 'safe-support', 'allowed']) {
    const outcome = outcomeForState(state)
    assert.equal(outcome.state, state)
    assert.ok(outcome.title.length > 10)
    assert.ok(outcome.response.length > 20)
    assert.ok(outcome.nextStep.length > 20)
    assert.doesNotMatch(outcome.response, /weapon|password|home address|hurt myself|want to die/i)
  }
  assert.equal(outcomeForState('urgent').canCreateApproval, false)
  assert.equal(outcomeForState('urgent').canSaveToHistory, false)
  assert.equal(outcomeForState('approval').canCreateApproval, true)
})

test('protected help is separate from ordinary parent approval', () => {
  const urgent = outcomeForState('urgent')
  assert.match(urgent.nextStep, /trusted adult|emergency support/i)
  assert.match(urgent.response, /does not repeat|not an emergency service/i)
  assert.match(outcomeForState('approval').nextStep, /not emergency support/i)
})
