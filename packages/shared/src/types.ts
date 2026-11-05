export type Role = 'child' | 'parent'

export type SafetyState =
  | 'allowed'
  | 'safe-support'
  | 'approval'
  | 'blocked'
  | 'urgent'

export type ParentSafetyTopic =
  | 'personal-health'
  | 'private-information'
  | 'strangers-and-sharing'
  | 'public-posting'
  | 'purchases-and-age-restricted'
  | 'dangerous-activities'
  | 'hacking-and-passwords'

export interface ParentSafetyRule {
  id: ParentSafetyTopic
  label: string
  description: string
}

export type ApprovalStatus = 'pending' | 'approved' | 'rejected' | 'discuss-later'

export interface SafetyOutcome {
  state: SafetyState
  title: string
  response: string
  nextStep: string
  canSaveToHistory: boolean
  canCreateApproval: boolean
}

export interface Lesson {
  id: string
  title: string
  summary: string
  duration: string
  status: 'interactive' | 'coming-soon'
}

export interface PreviewApproval {
  id: string
  childId: string
  childName: string
  category: string
  contextSummary: string
  status: ApprovalStatus
  time: string
  note?: string
}

export interface ChildProfile {
  id: string
  name: string
  age: number
  schoolYear: string
  avatar: string
  lessonsStarted: number
  activeApprovals: number
  chatPaused: boolean
}

export interface ApiProviderSettings {
  provider: 'anthropic' | 'openai' | 'google'
  isConfigured: boolean
  maskedEnding: string
  connectionStatus: 'connected' | 'testing' | 'disabled' | 'not-configured'
  lastTested: string
}

export type ActivityAlert = {
  id: string
  childId: string
  childName: string
  state: SafetyState
  category: string
  contextSummary: string
  protected: boolean
  time: string
}

export type ParentActivity = {
  history: Array<HistoryRecord & { childName: string }>
  approvals: PreviewApproval[]
  alerts: ActivityAlert[]
  access: Array<{ childId: string; chatbotPaused: boolean; ordinaryNotifications: boolean; flaggedNotifications: boolean; blockedTopics: ParentSafetyTopic[] }>
  notifications: Array<{ id: string; childId: string | null; childName: string | null; kind: string; title: string; body: string; readAt: string | null; time: string }>
  metrics: { allowed_count: number; support_count: number; approval_count: number; blocked_count: number; urgent_count: number; lessons_started: number; updated_at: string | null }
}

export type ChildActivity = {
  history: HistoryRecord[]
  approvals: Array<{ id: string; category: string; status: ApprovalStatus; resolved_at: string | null }>
  chatPaused: boolean
  notifications: Array<{ id: string; kind: string; title: string; body: string; readAt: string | null; time: string }>
}

export interface WalkthroughStep {
  targetId: string
  title: string
  description: string
  targetLabel: string
  actionSection?: string
}

export interface ChatMessage {
  id: string
  sender: 'user' | 'assistant'
  text: string
  time: string
  outcome?: SafetyOutcome
}

export interface HistoryRecord {
  id: string
  childId: string
  state: SafetyState
  title: string
  summary: string
  time: string
}

export const SAFETY_META: Record<SafetyState, { label: string; icon: string; tone: string }> = {
  allowed: { label: 'Allowed', icon: '✓', tone: 'allowed' },
  'safe-support': { label: 'Safe adult-support', icon: '♡', tone: 'support' },
  approval: { label: 'Parent approval required', icon: '↗', tone: 'approval' },
  blocked: { label: 'Blocked', icon: '!', tone: 'blocked' },
  urgent: { label: 'Immediate help', icon: '✦', tone: 'urgent' },
}

export const LESSONS: Lesson[] = [
  { id: 'what-ai-is', title: 'How Boots Thinks', summary: 'Discover what computers are great at—and why your own human brain is unbeatable!', duration: '5 min', status: 'coming-soon' },
  { id: 'prompting', title: 'Asking Great Questions', summary: 'Give Boots the best clues about what you are studying and what you need.', duration: '4 min', status: 'interactive' },
  { id: 'checking', title: 'Detective Mode: Fact-Checking', summary: 'How to spot when a bot is guessing, and how to verify real facts in books.', duration: '5 min', status: 'coming-soon' },
  { id: 'privacy', title: 'The Secret Shield', summary: 'Keep passwords, private photos, and your address completely safe and private.', duration: '4 min', status: 'interactive' },
  { id: 'learning', title: 'Supercharging Your Homework', summary: 'Use Boots to brainstorm, practice tricky questions, and do your best work.', duration: '5 min', status: 'coming-soon' },
  { id: 'bias', title: 'Fair Play & Kindness', summary: 'How AI learns from stories, and why kindness and fairness matter everywhere.', duration: '5 min', status: 'coming-soon' },
  { id: 'help', title: 'Staying Safe Online', summary: 'What to do when something online feels confusing or worrying.', duration: '4 min', status: 'coming-soon' },
]

export const CHILD_WALKTHROUGH_STEPS: WalkthroughStep[] = [
  {
    targetId: 'tour-child-chat',
    title: 'Study chat',
    description: 'Your friendly space to ask homework questions, brainstorm ideas, and explore with Boots.',
    targetLabel: 'Chat area',
    actionSection: 'chat',
  },
  {
    targetId: 'tour-child-send',
    title: 'Ask questions',
    description: 'Send your homework or curiosity question to Boots to get clear, friendly explanations.',
    targetLabel: 'Send button',
    actionSection: 'chat',
  },
  {
    targetId: 'tour-child-prompts',
    title: 'Fun ideas',
    description: 'Tap any example question to explore space mysteries, dinosaurs, and creative stories.',
    targetLabel: 'Prompt suggestions',
    actionSection: 'chat',
  },
  {
    targetId: 'tour-child-lessons',
    title: 'Smart thinking quests',
    description: 'Play fun mini-quests to practice asking great questions and keeping secrets safe.',
    targetLabel: 'Lessons tab',
    actionSection: 'lessons',
  },
  {
    targetId: 'tour-child-privacy',
    title: 'Secret shield tips',
    description: 'Friendly reminder to keep your real passwords, address, and private photos to yourself.',
    targetLabel: 'Learning tips',
    actionSection: 'chat',
  },
  {
    targetId: 'tour-child-status',
    title: 'Helpful topic guides',
    description: 'Answers show helpful topic indicators for study questions and suggest talking to a professional or your parents for personal topics.',
    targetLabel: 'Topic label',
    actionSection: 'chat',
  },
  {
    targetId: 'tour-child-history',
    title: 'My study notebook',
    description: 'Look back over your past questions and learning topics in one simple notebook.',
    targetLabel: 'History tab',
    actionSection: 'history',
  },
  {
    targetId: 'tour-child-help',
    title: 'People who care',
    description: 'Find trusted professionals, parent guidance, and free confidential helplines like Childline (0800 1111).',
    targetLabel: 'Help & support',
    actionSection: 'help',
  },
  {
    targetId: 'tour-child-account',
    title: 'Account controls',
    description: 'Check your profile and sign out of your learning session whenever you are finished.',
    targetLabel: 'Account chip',
    actionSection: 'chat',
  },
]

export const PARENT_WALKTHROUGH_STEPS: WalkthroughStep[] = [
  {
    targetId: 'tour-parent-switcher',
    title: 'Child switcher',
    description: 'Switch between linked children to see child-specific activity and approval requests.',
    targetLabel: 'Child switcher',
    actionSection: 'overview',
  },
  {
    targetId: 'tour-parent-overview',
    title: 'Family overview',
    description: 'A calm, at-a-glance summary of active learning progress, pending decisions, and recent safety activity.',
    targetLabel: 'Overview tab',
    actionSection: 'overview',
  },
  {
    targetId: 'tour-parent-approvals',
    title: 'Approval centre',
    description: 'Review sensitive topics with limited context. Approve, reject, or discuss together with optional parent notes.',
    targetLabel: 'Approval centre',
    actionSection: 'approvals',
  },
  {
    targetId: 'tour-parent-alerts',
    title: 'Safety alerts',
    description: 'High-risk protected storyboard alerts. Child disclosure text is withheld to prevent domestic risk.',
    targetLabel: 'Safety alerts',
    actionSection: 'alerts',
  },
  {
    targetId: 'tour-parent-history',
    title: 'Conversation history',
    description: 'Filter and inspect child conversations with clear safety classification labels and timestamped summaries.',
    targetLabel: 'History tab',
    actionSection: 'history',
  },
  {
    targetId: 'tour-parent-api',
    title: 'API provider settings',
    description: 'Parent-only area. A saved key is encrypted on the server and only its last four characters are shown. Test, rotate or remove it here.',
    targetLabel: 'API settings',
    actionSection: 'settings',
  },
  {
    targetId: 'tour-parent-accounts',
    title: 'Child account management',
    description: 'Manage linked child profiles, school year levels, and individual chat access privileges.',
    targetLabel: 'Child accounts',
    actionSection: 'settings',
  },
  {
    targetId: 'tour-parent-access',
    title: 'Family access controls',
    description: 'Configure chat access, parent-selected blocked topics, ordinary activity notifications, and flagged safety highlights per child.',
    targetLabel: 'Access controls',
    actionSection: 'settings',
  },
  {
    targetId: 'tour-parent-privacy',
    title: 'Privacy & data explanation',
    description: 'Understand the data minimisation principles, parent visibility limits, and request preview data deletion.',
    targetLabel: 'Privacy settings',
    actionSection: 'settings',
  },
  {
    targetId: 'tour-parent-signout',
    title: 'Sign out',
    description: 'Safely exit the parent family management space.',
    targetLabel: 'Sign out button',
    actionSection: 'overview',
  },
]

// No provider is connected in this build, so the honest starting state is empty.
export const INITIAL_API_SETTINGS: ApiProviderSettings = {
  provider: 'anthropic',
  isConfigured: false,
  maskedEnding: 'None stored',
  connectionStatus: 'not-configured',
  lastTested: 'Never',
}
