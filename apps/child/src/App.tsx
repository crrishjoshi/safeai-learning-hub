import { FormEvent, useEffect, useRef, useState } from 'react'
import {
  BootsCompanion,
  CHILD_WALKTHROUGH_STEPS,
  ContextualPopover,
  LESSONS,
  classifySafety,
  confirmSiteRole,
  isAudioMuted,
  outcomeForState,
  fetchChildActivity,
  fetchMyProfile,
  playReceiveSound,
  playSendSound,
  playTabSound,
  playTapSound,
  playTourStepSound,
  signIn,
  signOut,
  sendChildMessage,
  subscribeToFamilyRealtime,
  supabase,
  supabaseConfigured,
  toggleAudio,
  type ChatMessage,
  type HistoryRecord,
  type SafetyOutcome,
  type SafetyState,
  IconChat,
  IconBook,
  IconClock,
  IconShield,
  IconSoundOn,
  IconSoundOff,
  IconX,
  IconSend,
  IconHeart,
  IconSparkle,
  IconRocket,
  IconBulb,
  IconCompass,
} from '@safeai/shared'

// History keeps a fixed description of the outcome, never the typed text, so a
// refused question (a password, an address) is not repeated on screen later.
const HISTORY_SUMMARY: Record<SafetyState, string> = {
  allowed: 'Study question explored with Boots.',
  'safe-support': 'Personal topic: best to talk with a professional or your parents.',
  approval: 'Personal topic: best to talk with a professional or your parents.',
  blocked: 'Personal topic: best to talk with a professional or your parents.',
  urgent: 'Support advice: reach out to a professional or your parents.',
}

type ChildTab = 'chat' | 'lessons' | 'history' | 'help'

const STARTER_PROMPTS = [
  { icon: IconRocket, label: 'Space mystery', text: 'Why is Mars called the Red Planet, and could humans build a base there?' },
  { icon: IconCompass, label: 'Dinosaur speed', text: 'How fast could a T-Rex actually run compared to a human?' },
  { icon: IconSparkle, label: 'Superhero story', text: 'Help me invent a superhero with funny food-based superpowers!' },
  { icon: IconBook, label: 'Maths tricks', text: 'What is a fun, easy trick to convert fractions into percentages?' },
  { icon: IconBulb, label: 'Ocean science', text: 'How do underwater volcanoes erupt and create new islands in the ocean?' },
]

// Provider answers often use Markdown; show them as plain readable text.
function tidyAssistantText(text: string) {
  return text
    .replace(/\r\n/g, '\n')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/^(\s*)[*-]\s+/gm, '$1• ')
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/__(.+?)__/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

function Brand() {
  return (
    <a className="brand" href="/" aria-label="SafeAI Boots study space">
      <span className="brand-mark brand-mark-child" aria-hidden="true" />
      <span>
        <span className="brand-word">SafeAI</span>
        <span className="brand-sub">Boots Study Buddy</span>
      </span>
    </a>
  )
}

function AuthGate({ notice }: { notice?: string }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const submit = async (event: FormEvent) => {
    event.preventDefault()
    setError('')
    setBusy(true)
    try {
      await signIn(email, password)
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'We could not sign you in.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <main className="auth-shell child-auth">
      <section className="auth-card" aria-labelledby="child-sign-in-title">
        <Brand />
        <p className="eyebrow">Study space</p>
        <h1 id="child-sign-in-title">Your friendly AI study buddy.</h1>
        <p className="small">
          Sign in with the child account created by your parent or guardian. Keep real personal details, other passwords and private photos out of your chats.
        </p>
        {notice && <p className="error-text" role="alert">{notice}</p>}
        {!supabaseConfigured && (
          <div className="notice notice-preview" role="status" style={{ marginTop: '1.5rem' }}>
            <strong>Account service unavailable</strong>
            <br />
            This deployment is missing its Supabase URL and publishable key, so sign-in is switched off. Child accounts are created by a parent in the parent space.
          </div>
        )}
        <form className="auth-form" onSubmit={submit}>
            <div className="field">
              <label htmlFor="child-email">Email</label>
              <input
                id="child-email"
                type="email"
                autoComplete="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="field">
              <label htmlFor="child-password">Password</label>
              <input
                id="child-password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="error-text" role="alert">{error}</p>}
            <button className="button button-primary" disabled={!supabaseConfigured || busy}>
              {busy ? 'Signing in…' : 'Sign in'}
            </button>
            <p className="small" style={{ margin: 0 }}>
              Forgot your password or need an account? Ask your parent or guardian. They manage child accounts from the parent space.
            </p>
          </form>
        <p className="small" style={{ marginTop: '1rem', marginBottom: 0 }}>
          Not an emergency service · If you feel unsafe, talk to a trusted adult.
        </p>
      </section>
    </main>
  )
}

function StatusBadge({ outcome }: { outcome: SafetyOutcome }) {
  if (outcome.state === 'allowed') {
    return (
      <span id="tour-child-status" className="status-label status-allowed">
        <span aria-hidden="true" style={{ display: 'inline-flex', alignItems: 'center' }}>
          <IconBook size={13} />
        </span>
        Study topic
      </span>
    )
  }
  return (
    <span id="tour-child-status" className="status-label status-support">
      <span aria-hidden="true" style={{ display: 'inline-flex', alignItems: 'center' }}>
        <IconHeart size={13} />
      </span>
      Personal topic · Talk to a professional or parent
    </span>
  )
}


export default function App() {
  const [access, setAccess] = useState<'checking' | 'signed-out' | 'signed-in'>(supabaseConfigured ? 'checking' : 'signed-out')
  const [accessNotice, setAccessNotice] = useState('')
  const [profileName, setProfileName] = useState('Child account')
  const [profileId, setProfileId] = useState('')
  const [activeTab, setActiveTab] = useState<ChildTab>('chat')
  const [tourStep, setTourStep] = useState<number | null>(0)
  const [inputText, setInputText] = useState('')
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-welcome',
      sender: 'assistant',
      text: 'Hi! I’m Boots, your learning companion. Ask me any study question, brainstorm homework ideas, or explore our interactive AI lessons.',
      time: 'Just now',
    },
  ])
  const [historyItems, setHistoryItems] = useState<HistoryRecord[]>([])
  const [chatPaused, setChatPaused] = useState(false)
  const [chatBusy, setChatBusy] = useState(false)
  const [providerIssue, setProviderIssue] = useState<string | null>(null)
  const [soundMuted, setSoundMuted] = useState(isAudioMuted())
  const chatEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (activeTab === 'chat') {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, activeTab, chatBusy])

  const handleToggleSound = () => {
    const next = toggleAudio()
    setSoundMuted(next)
    if (!next) {
      playTapSound()
    }
  }

  const switchTab = (tab: ChildTab) => {
    if (tab !== activeTab) {
      playTabSound()
    }
    setActiveTab(tab)
  }

  // A session only opens this site if family_members says the account is a
  // child. Parent accounts are signed out and sent to the parent website.
  useEffect(() => {
    if (!supabase) return
    let active = true
    const check = async (hasSession: boolean) => {
      if (!hasSession) {
        if (active) setAccess('signed-out')
        return
      }
      const allowed = await confirmSiteRole('child')
      if (!active) return
      if (allowed) {
        const profile = await fetchMyProfile()
        if (!active) return
        if (profile) {
          setProfileId(profile.userId)
          setProfileName(profile.displayName)
        }
        try {
          const activity = await fetchChildActivity()
          if (!active) return
          setHistoryItems(activity.history)
          setChatPaused(activity.chatPaused)
        } catch {
          // Keep the last known access state while the polling pass retries.
        }
      }
      setAccess(allowed ? 'signed-in' : 'signed-out')
      if (!allowed) setAccessNotice('This account cannot use the child space. Parents and guardians sign in on the parent website.')
    }
    const { data: listener } = supabase.auth.onAuthStateChange((event, nextSession) => {
      if (event === 'TOKEN_REFRESHED') return
      // Deferred so no Supabase call runs inside the auth callback itself.
      setTimeout(() => void check(Boolean(nextSession)), 0)
    })
    return () => {
      active = false
      listener.subscription.unsubscribe()
    }
  }, [])

  useEffect(() => {
    if (access !== 'signed-in') return
    let active = true
    const refresh = async () => {
      try {
        const activity = await fetchChildActivity()
        if (active) {
          setHistoryItems(activity.history)
          setChatPaused(activity.chatPaused)
        }
      } catch {
        // Keep the last known access state; the next poll retries.
      }
    }
    const interval = window.setInterval(() => void refresh(), 5000)
    let unsubscribe: (() => void) | undefined
    void subscribeToFamilyRealtime('child', profileId || undefined, () => void refresh()).then((cleanup) => { unsubscribe = cleanup })
    return () => {
      active = false
      window.clearInterval(interval)
      unsubscribe?.()
    }
  }, [access, profileId])

  const signOutNow = async () => {
    await signOut()
    setAccessNotice('')
    setProfileId('')
    setProfileName('Child account')
    setAccess('signed-out')
  }

  // Handle submitting a chat question
  const handleSendMessage = async (textToSend: string) => {
    const trimmed = textToSend.trim()
    if (!trimmed || chatBusy || chatPaused) return

    playSendSound()
    const localOutcome = outcomeForState(classifySafety(trimmed))
    setChatBusy(true)
    try {
      await sendAndShow(trimmed, localOutcome)
    } finally {
      setChatBusy(false)
    }
  }

  const addAssistantNotice = (text: string) => {
    setMessages((prev) => [...prev, { id: `msg-asst-${Date.now()}`, sender: 'assistant', text, time: 'Just now' }])
  }

  const sendAndShow = async (trimmed: string, localOutcome: ReturnType<typeof outcomeForState>) => {
    const response = await sendChildMessage(trimmed)
    if (response.status === 423) {
      setChatPaused(true)
      addAssistantNotice('Chat is currently paused. You can still explore the lessons and help pages.')
      return
    }
    // The typed question stays in the box on these failures so it can be sent again.
    if (!response.result.outcome) {
      if (response.status === 401) addAssistantNotice('Your sign-in has ended. Sign in again, then send your question.')
      else if (response.status === 400) addAssistantNotice('Questions need to be between 1 and 300 characters. Try a shorter question.')
      else addAssistantNotice('That took too long or the connection dropped, so nothing was answered. Your question is still in the box; try sending it again.')
      return
    }
    const outcome = response.result.outcome ?? localOutcome
    setProviderIssue(
      !response.ok && response.result.error
        ? response.result.error === 'provider_authentication_failed' || response.result.error === 'provider_quota_exceeded' || response.result.error === 'provider_model_unavailable'
          ? 'The AI connection is busy right now, so Boots used a prepared answer.'
          : 'The AI service did not answer this time, so Boots used a prepared answer. Try again in a moment.'
        : null,
    )
    const userMsg: ChatMessage = {
      id: `msg-user-${Date.now()}`,
      sender: 'user',
      text: trimmed,
      time: 'Just now',
    }
    const assistantMsg: ChatMessage = {
      id: `msg-asst-${Date.now()}`,
      sender: 'assistant',
      text: response.result.assistantText ?? outcome.response,
      time: 'Just now',
      outcome: response.ok ? outcome : { ...outcome, nextStep: '' },
    }

    setMessages((prev) => [...prev, userMsg, assistantMsg])
    setInputText('')
    playReceiveSound(outcome.state)

    // Urgent disclosure text is never added to ordinary history. The server
    // returns a generic protected receipt from safety_events instead.
    if (outcome.canSaveToHistory) {
      const newRecord: HistoryRecord = {
        id: `hist-${Date.now()}`,
        childId: profileId || 'authenticated-child',
        state: outcome.state,
        title: outcome.title,
        summary: HISTORY_SUMMARY[outcome.state],
        time: 'Just now',
      }
      setHistoryItems((prev) => [newRecord, ...prev])
    }
  }

  // Walkthrough navigation handler that automatically switches tabs if target is elsewhere
  const handleNextTourStep = () => {
    if (tourStep === null) return
    playTourStepSound()
    const nextIdx = tourStep + 1
    if (nextIdx >= CHILD_WALKTHROUGH_STEPS.length) {
      setTourStep(null)
      return
    }
    const targetStep = CHILD_WALKTHROUGH_STEPS[nextIdx]
    if (targetStep.actionSection) {
      setActiveTab(targetStep.actionSection as ChildTab)
    }
    setTourStep(nextIdx)
  }

  const handlePrevTourStep = () => {
    if (tourStep === null || tourStep === 0) return
    playTourStepSound()
    const prevIdx = tourStep - 1
    const targetStep = CHILD_WALKTHROUGH_STEPS[prevIdx]
    if (targetStep.actionSection) {
      setActiveTab(targetStep.actionSection as ChildTab)
    }
    setTourStep(prevIdx)
  }

  const restartTour = () => {
    playTourStepSound()
    setActiveTab('chat')
    setTourStep(0)
  }

  const resetDemo = () => {
    playTapSound()
    setActiveTab('chat')
    setInputText('')
    setMessages([
      {
        id: 'msg-welcome-reset',
        sender: 'assistant',
        text: 'Hi! I’m Boots, your learning companion. Ask me any study question, brainstorm homework ideas, or explore our interactive AI lessons.',
        time: 'Just now',
      },
    ])
    setHistoryItems([])
    setTourStep(0)
  }

  if (supabaseConfigured && access === 'checking') {
    return (
      <main className="auth-shell">
        <p className="small" role="status">Checking your account…</p>
      </main>
    )
  }
  if (supabaseConfigured && access !== 'signed-in') return <AuthGate notice={accessNotice} />
  if (!supabaseConfigured) return <AuthGate />

  return (
    <div className="site-shell child-app">
      {/* Top Header */}
      <header className="topbar">
        <Brand />
        <nav className="topbar-nav" aria-label="Desktop primary navigation">
          <button
            type="button"
            className={`topbar-nav-button ${activeTab === 'chat' ? 'active' : ''}`}
            onClick={() => switchTab('chat')}
            aria-current={activeTab === 'chat' ? 'page' : undefined}
          >
            <span className="topbar-nav-icon" aria-hidden="true" style={{ display: 'inline-flex', alignItems: 'center' }}><IconChat size={15} /></span>
            <span>Chat</span>
          </button>
          <button
            type="button"
            className={`topbar-nav-button ${activeTab === 'lessons' ? 'active' : ''}`}
            onClick={() => switchTab('lessons')}
            aria-current={activeTab === 'lessons' ? 'page' : undefined}
          >
            <span className="topbar-nav-icon" aria-hidden="true" style={{ display: 'inline-flex', alignItems: 'center' }}><IconBook size={15} /></span>
            <span>Lessons</span>
          </button>
          <button
            type="button"
            className={`topbar-nav-button ${activeTab === 'history' ? 'active' : ''}`}
            onClick={() => switchTab('history')}
            aria-current={activeTab === 'history' ? 'page' : undefined}
          >
            <span className="topbar-nav-icon" aria-hidden="true" style={{ display: 'inline-flex', alignItems: 'center' }}><IconClock size={15} /></span>
            <span>History</span>
          </button>
          <button
            type="button"
            className={`topbar-nav-button ${activeTab === 'help' ? 'active' : ''}`}
            onClick={() => switchTab('help')}
            aria-current={activeTab === 'help' ? 'page' : undefined}
          >
            <span className="topbar-nav-icon" aria-hidden="true" style={{ display: 'inline-flex', alignItems: 'center' }}><IconShield size={15} /></span>
            <span>Help</span>
          </button>
        </nav>
        <div id="tour-child-account" className="header-actions">
          <button
            type="button"
            className={`sound-toggle-btn ${soundMuted ? 'muted' : ''}`}
            onClick={handleToggleSound}
            aria-label={soundMuted ? 'Sound effects disabled. Click to enable sound' : 'Sound effects enabled. Click to mute sound'}
            aria-pressed={!soundMuted}
            title={soundMuted ? 'Sound off (Click to enable)' : 'Sound on (Click to mute)'}
          >
            <span aria-hidden="true" style={{ display: 'inline-flex', alignItems: 'center' }}>
              {soundMuted ? <IconSoundOff size={16} /> : <IconSoundOn size={16} />}
            </span>
            <span>{soundMuted ? 'Sound off' : 'Sound on'}</span>
          </button>

          <div className="user-chip">
            <span className="avatar">{profileName.slice(0, 1).toUpperCase()}</span>
            <span>{profileName}</span>
          </div>
          <button type="button" className="button button-secondary button-sm" onClick={signOutNow}>
            Leave
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="main">
        {providerIssue && (
          <p className="notice" role="status">
            {providerIssue}
          </p>
        )}

        {/* Contextual Popover Walkthrough */}
        {tourStep !== null && (
          <ContextualPopover
            step={CHILD_WALKTHROUGH_STEPS[tourStep]}
            stepIndex={tourStep}
            totalSteps={CHILD_WALKTHROUGH_STEPS.length}
            onNext={handleNextTourStep}
            onPrev={handlePrevTourStep}
            onSkip={() => setTourStep(null)}
            role="child"
          />
        )}

        {/* Tab 1: Chat-First Screen */}
        {activeTab === 'chat' && (
          <div className="chat-screen">
            {/* Friendly Boots Welcome Card */}
            <section id="tour-child-privacy" className="boots-hero-card" aria-labelledby="privacy-heading">
              <div className="boots-hero-avatar">
                <BootsCompanion compact label="Boots your study buddy" />
              </div>
              <div className="boots-hero-speech">
                <h2 id="privacy-heading">Hi! I’m Boots 🎒</h2>
                <p>
                  Your friendly homework and curiosity buddy! Ask me about science, maths, history, or creative writing.
                </p>
                <div className="boots-hero-tip">
                  <span aria-hidden="true" style={{ display: 'inline-flex', alignItems: 'center' }}><IconShield size={13} /></span>
                  <span>Keep passwords, your address, and private photos secret</span>
                </div>
              </div>
            </section>

            {chatPaused && (
              <p className="notice" role="status" style={{ marginBottom: '1rem' }}>
                <strong>Chat is currently paused.</strong> Lessons and the help page remain available.
              </p>
            )}

            {/* Chat Messages Workspace */}
            <section id="tour-child-chat" className="chat-messages" aria-label="Conversation workspace">
              {messages.map((msg) => (
                <div key={msg.id} className={`chat-bubble-row ${msg.sender}`}>
                  {msg.sender === 'assistant' && (
                    <BootsCompanion compact label="Boots companion avatar" />
                  )}
                  <div className={`chat-bubble ${msg.sender} ${msg.outcome?.state === 'urgent' ? 'urgent' : ''}`}>
                    <div className="chat-bubble-header">
                      {msg.outcome && <StatusBadge outcome={msg.outcome} />}
                      <span className="chat-bubble-time">{msg.time}</span>
                    </div>
                    <p className="chat-bubble-text">{msg.sender === 'assistant' ? tidyAssistantText(msg.text) : msg.text}</p>
                    {msg.outcome?.nextStep && (
                      <p className="small" style={{ marginTop: '.65rem', marginBottom: 0, borderTop: '1px solid rgba(0,0,0,0.06)', paddingTop: '.45rem' }}>
                        <strong>Next step:</strong> {msg.outcome.nextStep}
                      </p>
                    )}
                  </div>
                </div>
              ))}
              {chatBusy && (
                <div className="chat-bubble-row assistant" role="status" aria-live="polite">
                  <BootsCompanion compact label="Boots companion avatar" />
                  <div className="chat-bubble assistant">
                    <span className="chat-thinking">
                      Boots is thinking
                      <span className="chat-thinking-dot" aria-hidden="true" />
                      <span className="chat-thinking-dot" aria-hidden="true" />
                      <span className="chat-thinking-dot" aria-hidden="true" />
                    </span>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </section>

            {/* Sticky Composer & Starter Suggestions */}
            <div className="chat-composer-sticky">
              <div id="tour-child-prompts" className="prompt-chips-scroll" aria-label="Starter prompt suggestions">
                {STARTER_PROMPTS.map((starter) => {
                  const IconComp = starter.icon
                  return (
                    <button
                      key={starter.label}
                      type="button"
                      className="prompt-chip"
                      disabled={chatBusy || chatPaused}
                      onClick={() => handleSendMessage(starter.text)}
                    >
                      <span className="prompt-chip-icon" aria-hidden="true">
                        <IconComp size={15} />
                      </span>
                      <span>{starter.label}</span>
                    </button>
                  )
                })}
              </div>

              <div className="composer-input-wrapper">
                <input
                  type="text"
                  className="composer-input"
                  placeholder={chatPaused ? 'Chat is currently paused…' : 'Ask Boots anything (homework, science, stories)…'}
                  disabled={chatBusy || chatPaused}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault()
                      handleSendMessage(inputText)
                    }
                  }}
                  maxLength={300}
                  aria-label="Chat question input"
                />
                {inputText.length > 0 && (
                  <button
                    type="button"
                    className="composer-clear-btn"
                    onClick={() => {
                      playTapSound()
                      setInputText('')
                    }}
                    aria-label="Clear typed question"
                    title="Clear question"
                  >
                    <IconX size={13} />
                  </button>
                )}
                <button
                  id="tour-child-send"
                  type="button"
                  className="composer-send-btn"
                  disabled={!inputText.trim() || chatBusy || chatPaused}
                  onClick={() => handleSendMessage(inputText)}
                  aria-label="Send question"
                  title="Send question"
                >
                  {chatBusy ? '…' : <IconSend size={15} />}
                </button>

              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Interactive Lessons */}
        {activeTab === 'lessons' && (
          <div className="grid">
            <div className="page-heading">
              <div>
                <p className="eyebrow">Smart Quests</p>
                <h1>Fun thinking quests.</h1>
                <p>Discover how Boots thinks, practice asking awesome questions, and become an online privacy champ!</p>
              </div>
              <BootsCompanion label="Boots encouraging learning" />
            </div>

            {/* Interactive Lesson 1 */}
            <section className="panel panel-soft lesson-activity" aria-labelledby="lesson-prompt-heading">
              <div className="lesson-meta">
                <span>Smart Quest · 1 of 2</span>
                <span>Interactive practice</span>
              </div>
              <div>
                <h2 id="lesson-prompt-heading">The Great Question Challenge</h2>
                <p className="small">
                  Help Boots give the best answer! Tap the clues that help Boots understand your homework question:
                </p>
              </div>
              <div className="choice-grid">
                {['Say who the answer is for', 'Pick the length (Short or full)', 'Share helpful study clues', 'Secret passwords (NEVER!)', 'Keep all clues hidden'].map(
                  (choice) => (
                    <button
                      key={choice}
                      type="button"
                      className="choice"
                      onClick={(e) => {
                        playTapSound()
                        e.currentTarget.classList.toggle('selected')
                      }}
                    >
                      {choice}
                    </button>
                  )
                )}
              </div>
              <p className="small">
                Tip: Great questions tell Boots what topic you are studying and how long you want the answer. Passwords must never be shared!
              </p>
            </section>

            {/* Interactive Lesson 2 */}
            <section className="panel privacy-card lesson-activity" aria-labelledby="lesson-privacy-heading">
              <div className="lesson-meta">
                <span>Smart Quest · 2 of 2</span>
                <span>Secret shield challenge</span>
              </div>
              <div>
                <h2 id="lesson-privacy-heading">The Secret Shield Challenge</h2>
                <p className="small">
                  Which of these should stay super secret and NEVER be shared with any chatbot or stranger online?
                </p>
              </div>
              <div className="choice-grid">
                {['Favorite dinosaur', 'Your home address', 'School password', 'Private photos', 'Revision timetable'].map(
                  (item) => (
                    <button
                      key={item}
                      type="button"
                      className="choice"
                      onClick={(e) => {
                        playTapSound()
                        e.currentTarget.classList.toggle('selected')
                      }}
                    >
                      {item}
                    </button>
                  )
                )}
              </div>
              <p className="small">
                Tip: Keep passwords, home addresses, and private photos completely to yourself!
              </p>
            </section>

            {/* Coming Soon Lessons */}
            <section aria-labelledby="more-lessons-heading">
              <div className="section-head">
                <h2 id="more-lessons-heading">More fun quests</h2>
                <span className="small">Upcoming learning topics</span>
              </div>
              <div className="grid grid-two">
                {LESSONS.filter((l) => l.status === 'coming-soon').map((lesson) => (
                  <article key={lesson.id} className="panel lesson-card">
                    <div className="lesson-meta">
                      <span>Upcoming</span>
                      <span>{lesson.duration}</span>
                    </div>
                    <h3>{lesson.title}</h3>
                    <p className="small">{lesson.summary}</p>
                    <button type="button" className="button button-secondary button-sm" disabled>
                      Coming soon
                    </button>
                  </article>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* Tab 3: Simple Conversation History */}
        {activeTab === 'history' && (
          <div className="grid">
            <div className="page-heading">
              <div>
                <p className="eyebrow">My Notebook</p>
                <h1>Questions you’ve explored.</h1>
                <p>Review the topics, questions, and homework ideas you’ve explored with Boots.</p>
              </div>
            </div>

            <section className="panel">
              <div className="history-list">
                {historyItems.length === 0 ? (
                  <div className="empty-state-card">
                    <div className="empty-state-icon" aria-hidden="true"><IconChat size={24} /></div>
                    <h3>Your study notebook is empty!</h3>
                    <p>Ask Boots a homework question or curiosity in the Chat tab and it will appear here in your notebook.</p>
                  </div>
                ) : (
                  historyItems.map((item) => (
                    <div key={item.id} className="list-row">
                      <div className="list-copy">
                        <strong>{item.title}</strong>
                        <p>{item.summary}</p>
                        <span className="small">{item.time}</span>
                      </div>
                      <span className={`status-label ${item.state === 'allowed' ? 'status-allowed' : 'status-support'}`}>
                        <span aria-hidden="true" style={{ display: 'inline-flex', alignItems: 'center' }}>
                          {item.state === 'allowed' ? <IconBook size={13} /> : <IconHeart size={13} />}
                        </span>
                        {item.state === 'allowed' ? 'Study topic' : 'Personal topic'}
                      </span>
                    </div>
                  ))
                )}
              </div>

            </section>
          </div>
        )}

        {/* Tab 4: Help and Guidance */}
        {activeTab === 'help' && (
          <div className="grid">
            <div className="page-heading">
              <div>
                <p className="eyebrow">Help & Support</p>
                <h1>Real people who are here for you.</h1>
                <p>Boots is great for homework and fun questions, but for personal questions or when you need support, real people are always the best to talk with!</p>
              </div>
              <BootsCompanion label="Boots offering comfort and help" />
            </div>

            {/* Supportive guidance cards */}
            <section className="panel protected-card" aria-labelledby="help-storyboard-heading">
              <div className="status-banner status-support">
                <span className="status-icon" aria-hidden="true" style={{ display: 'inline-flex', alignItems: 'center' }}>
                  <IconHeart size={15} />
                </span>
                <div>
                  <strong id="help-storyboard-heading">Support for personal or sensitive questions</strong>
                  <p>If you are thinking about something personal, health-related, or emotional, talking with a professional or your parents is always the best choice.</p>
                </div>
              </div>

              <div className="storyboard" style={{ marginTop: '1.2rem' }}>
                <div className="storyboard-step">
                  <span className="step-number">1</span>
                  <div>
                    <strong>Talk with your parents or family</strong>
                    <p className="small">Your parents, carers, or trusted family members care about you and can talk things through when you have questions or worries.</p>
                  </div>
                </div>
                <div className="storyboard-step">
                  <span className="step-number">2</span>
                  <div>
                    <strong>Talk with a professional</strong>
                    <p className="small">Teachers, school nurses, doctors, and counsellors are trained to help with health, emotional wellbeing, and personal questions.</p>
                  </div>
                </div>
                <div className="storyboard-step">
                  <span className="step-number">3</span>
                  <div>
                    <strong>Free confidential helplines</strong>
                    <p className="small">
                      If you ever need confidential help at any time:
                      <br />
                      <strong>Childline:</strong> 0800 1111 (Free, confidential 24/7)
                      <br />
                      <strong>Emergency services:</strong> 999 (Immediate emergency)
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Guided Tour Restart */}
            <section className="panel">
              <h2>Walkthrough guide</h2>
              <p className="small">Need a reminder of how the learning companion works?</p>
              <button type="button" className="button button-secondary" onClick={restartTour}>
                Restart guided walkthrough
              </button>
            </section>

            <section className="panel" aria-labelledby="child-reset-heading">
              <h2 id="child-reset-heading">Reset demo</h2>
              <p className="small">
                Clears only this tab’s temporary preview messages and walkthrough position. It does not delete your account or server data.
              </p>
              <button type="button" className="button button-secondary" onClick={resetDemo}>
                Reset demo
              </button>
            </section>
          </div>
        )}
      </main>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="mobile-bottom-nav" aria-label="Child main navigation">
        <button
          type="button"
          className={`nav-tab-item ${activeTab === 'chat' ? 'active' : ''}`}
          onClick={() => switchTab('chat')}
          aria-current={activeTab === 'chat' ? 'page' : undefined}
        >
          <span className="nav-tab-icon"><IconChat size={18} /></span>
          <span>Chat</span>
        </button>
        <button
          type="button"
          id="tour-child-lessons"
          className={`nav-tab-item ${activeTab === 'lessons' ? 'active' : ''}`}
          onClick={() => switchTab('lessons')}
          aria-current={activeTab === 'lessons' ? 'page' : undefined}
        >
          <span className="nav-tab-icon"><IconBook size={18} /></span>
          <span>Lessons</span>
        </button>
        <button
          type="button"
          id="tour-child-history"
          className={`nav-tab-item ${activeTab === 'history' ? 'active' : ''}`}
          onClick={() => switchTab('history')}
          aria-current={activeTab === 'history' ? 'page' : undefined}
        >
          <span className="nav-tab-icon"><IconClock size={18} /></span>
          <span>History</span>
        </button>
        <button
          type="button"
          id="tour-child-help"
          className={`nav-tab-item ${activeTab === 'help' ? 'active' : ''}`}
          onClick={() => switchTab('help')}
          aria-current={activeTab === 'help' ? 'page' : undefined}
        >
          <span className="nav-tab-icon"><IconShield size={18} /></span>
          <span>Help</span>
        </button>
      </nav>


      {/* Footer Disclaimer */}
      <footer className="footer-note">
        {supabaseConfigured ? 'Signed in · SafeAI learning companion' : 'Account sign-in required'}
      </footer>
    </div>
  )
}
