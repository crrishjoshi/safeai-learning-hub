import type { ParentSafetyRule, ParentSafetyTopic, SafetyOutcome, SafetyState } from './types.ts'

// Sexual or pornographic requests are always blocked, which also alerts the
// parent. General sex-education wording goes to parent review instead.
const explicitSignals = [
  'porn', 'nsfw', 'hentai', 'onlyfans', 'xvideos', 'xhamster', 'xnxx', 'brazzers', 'chaturbate', 'rule 34', 'rule34',
  'nudes', 'send nude', 'nude pic', 'nude photo', 'nude image', 'nude selfie', 'naked pic', 'naked photo', 'naked picture', 'naked image', 'naked selfie', 'naked video',
  'sexting', 'sexy', 'sex video', 'sex tape', 'sex chat', 'sex scene', 'sex story', 'have sex', 'having sex', 'sex with', 'erotic', 'strip club', 'cam girl', 'camgirl',
  'xxx video', 'xxx site', 'adult content', 'adult video', 'adult site', 'blowjob', 'masturbat', 'orgasm', 'fetish', 'hookup', 'horny',
]

const signals: Record<SafetyState, string[]> = {
  urgent: ['immediate danger', 'not safe at home', 'someone is hurting me', 'hurt myself', 'want to die', 'abuse'],
  blocked: ['weapon', 'explosive', 'hack', 'password', 'home address', 'track someone', 'bypass a parent', ...explicitSignals],
  approval: ['medical advice', 'mental health', 'private image', 'contact a stranger', 'buy something', 'post this publicly', 'sex', 'sexual'],
  'safe-support': ['feel lonely', 'friendship problem', 'grief', 'worried', 'sad', 'difficult news'],
  allowed: [],
}

export const PARENT_SAFETY_RULES: readonly ParentSafetyRule[] = [
  { id: 'personal-health', label: 'Health and personal topics', description: 'Block detailed health, wellbeing or private-image requests.' },
  { id: 'private-information', label: 'Private information and location', description: 'Block requests involving addresses, school details, phone numbers or live location.' },
  { id: 'strangers-and-sharing', label: 'Strangers and information sharing', description: 'Block contacting strangers or sharing personal information with them.' },
  { id: 'public-posting', label: 'Public posting', description: 'Block requests to publish or share personal content publicly.' },
  { id: 'purchases-and-age-restricted', label: 'Purchases and age-restricted topics', description: 'Block purchase, gambling, alcohol, tobacco or vaping requests.' },
  { id: 'dangerous-activities', label: 'Dangerous activities', description: 'Keep the built-in dangerous-activity boundary enabled for this child.' },
  { id: 'hacking-and-passwords', label: 'Hacking and passwords', description: 'Keep the built-in credential and security boundary enabled for this child.' },
]

const parentSignals: Record<ParentSafetyTopic, string[]> = {
  'personal-health': ['medical advice', 'mental health', 'private image'],
  'private-information': ['home address', 'school details', 'phone number', 'live location', 'private information'],
  'strangers-and-sharing': ['contact a stranger', 'meet someone online', 'share personal information'],
  'public-posting': ['post this publicly', 'publish this', 'share this publicly'],
  'purchases-and-age-restricted': ['buy something', 'gambling', 'alcohol', 'tobacco', 'vaping'],
  'dangerous-activities': ['weapon', 'explosive', 'dangerous experiment', 'dangerous challenge'],
  'hacking-and-passwords': ['hack', 'password', 'api key', 'credential', 'malware', 'bypass a parent'],
}

const parentTopicIds = new Set(PARENT_SAFETY_RULES.map((rule) => rule.id))

const normalise = (value: string) => value.toLowerCase().replace(/[’']/g, '').replace(/\s+/g, ' ').trim()

// A second view of the prompt that undoes common evasions: digit and symbol
// swaps (p0rn, $exy), punctuation inside a word (p.o.r.n) and spaced-out
// letters (p o r n).
const LOOKALIKES: Record<string, string> = { '0': 'o', '1': 'i', '3': 'e', '4': 'a', '5': 's', '7': 't', '@': 'a', '$': 's', '!': 'i', '|': 'l' }
const deobfuscate = (prompt: string) => prompt
  .replace(/[013457@$!|]/g, (char) => LOOKALIKES[char])
  .replace(/([a-z])[.\-_*+~]+(?=[a-z])/g, '$1')
  .replace(/\b[a-z](?: [a-z]\b){2,}/g, (letters) => letters.replace(/ /g, ''))

const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
const signalPatterns = new Map<string, RegExp>()
// Signals match at the start of a word, so "sex" never matches "Sussex" and
// "hack" never matches "shack", while "hacking" and "sexting" still match.
const matchesSignal = (views: readonly string[], signal: string) => {
  let pattern = signalPatterns.get(signal)
  if (!pattern) {
    pattern = new RegExp(`(?:^|[^a-z0-9])${escapeRegExp(signal)}`)
    signalPatterns.set(signal, pattern)
  }
  return views.some((view) => pattern.test(view))
}

export function classifySafety(value: string, parentBlockedTopics: readonly string[] = []): SafetyState {
  const prompt = normalise(value)
  const views = [...new Set([prompt, deobfuscate(prompt)])]
  for (const state of ['urgent', 'blocked', 'approval', 'safe-support'] as const) {
    if (state === 'approval') {
      const customBlock = parentBlockedTopics.some((topic) => parentTopicIds.has(topic as ParentSafetyTopic) && parentSignals[topic as ParentSafetyTopic].some((signal) => matchesSignal(views, signal)))
      if (customBlock) return 'blocked'
    }
    if (signals[state].some((signal) => matchesSignal(views, signal))) return state
  }
  return 'allowed'
}

export function outcomeForState(state: SafetyState): SafetyOutcome {
  switch (state) {
    case 'urgent':
      return {
        state,
        title: 'A real person can support you best',
        response: 'This app does not repeat or store personal disclosures, and is not an emergency service. If you are going through something serious or difficult, you are much better off talking to a professional or your parents right now.',
        nextStep: 'Reach out to a trusted adult, professional, or emergency support like Childline (0800 1111) or 999.',
        canSaveToHistory: false,
        canCreateApproval: false,
      }
    case 'blocked':
      return {
        state,
        title: 'For personal topics, talk to someone you trust',
        response: 'I will not repeat this request as I can only help with school and study questions. If you are asking about something personal, private, or worrying, you are much better off talking to a professional or your parents.',
        nextStep: 'Try asking a study question, or speak with a professional or your parents if you need advice.',
        canSaveToHistory: true,
        canCreateApproval: false,
      }
    case 'approval':
      return {
        state,
        title: 'Worth talking over with a professional or parent',
        response: 'This sounds like something personal or private. You are much better off talking to a professional (like a doctor, school nurse, or counselor) or your parents about this.',
        nextStep: 'Have a conversation with a professional or your parents. (This is for everyday guidance, not emergency support.)',
        canSaveToHistory: true,
        canCreateApproval: true,
      }
    case 'safe-support':
      return {
        state,
        title: 'Talking with someone can really help',
        response: 'It sounds like you might be dealing with something personal or emotional. You are much better off talking to a professional or your parents, who know you and can support you in person.',
        nextStep: 'Consider talking with a parent, school counselor, or trusted professional about how you feel.',
        canSaveToHistory: true,
        canCreateApproval: false,
      }
    default:
      return {
        state: 'allowed',
        title: 'Here is a helpful place to start',
        response: 'Here is some information to help with your question. Important facts should always be checked with reliable learning sources.',
        nextStep: 'Try adding your audience, format and what you already know to make the prompt easier to answer.',
        canSaveToHistory: true,
        canCreateApproval: false,
      }
  }
}
