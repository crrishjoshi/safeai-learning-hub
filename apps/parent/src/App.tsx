import { FormEvent, useEffect, useRef, useState } from 'react'
import {
  BootsCompanion,
  completeParentSetup,
  confirmParentAccess,
  ContextualPopover,
  createChildAccount,
  deleteFamilyData,
  fetchParentActivity,
  fetchProviderMetadata,
  fetchLinkedChildren,
  fetchMyProfile,
  INITIAL_API_SETTINGS,
  isAudioMuted,
  PARENT_WALKTHROUGH_STEPS,
  PARENT_SAFETY_RULES,
  PASSWORD_MINIMUM,
  playTabSound,
  playTapSound,
  playToggleSound,
  playTourStepSound,
  removeProviderKey,
  resolveParentApproval,
  requestPasswordReset,
  SAFETY_META,
  saveProviderKey,
  setChildPassword,
  signIn,
  signUpParent,
  signOut,
  subscribeToFamilyRealtime,
  supabase,
  supabaseConfigured,
  testProviderConnection,
  providerErrorMessage,
  toggleAudio,
  updateParentAccess,
  updatePassword,
  type ApiProviderSettings,
  type ApprovalStatus,
  type ChildProfile,
  type ActivityAlert,
  type PreviewApproval,
  type ProviderMetadata,
  type SafetyState,
  IconHome,
  IconApprovals,
  IconClock,
  IconBellAlert,
  IconSliders,
  IconSoundOn,
  IconSoundOff,
  IconLock,
  IconDocument,
  IconCheck,
  IconHeart,
  IconX,
  IconArrowUpRight,
  IconSparkle,
} from '@safeai/shared'


type ParentTab = 'overview' | 'approvals' | 'history' | 'alerts' | 'settings'
type Provider = ApiProviderSettings['provider']
type TemporaryChildCredential = { childId: string; childName: string; email?: string; password: string; kind: 'created' | 'reset' }

const PROVIDER_NAMES: Record<Provider, string> = { anthropic: 'Anthropic', openai: 'OpenAI', google: 'Google' }

function renderSafetyIcon(state: SafetyState) {
  switch (state) {
    case 'allowed': return <IconCheck size={13} />
    case 'safe-support': return <IconHeart size={13} />
    case 'approval': return <IconArrowUpRight size={13} />
    case 'blocked': return <IconX size={13} />
    case 'urgent': return <IconSparkle size={13} />
    default: return null

  }
}

// Stored metadata only: a saved key stays "disabled" until a provider
// connection exists, so the page never claims a live connection.
function settingsFromMetadata(metadata: ProviderMetadata | null): ApiProviderSettings {
  if (!metadata?.maskedEnding) return INITIAL_API_SETTINGS
  return {
    provider: metadata.provider,
    isConfigured: true,
    maskedEnding: `••••${metadata.maskedEnding}`,
    connectionStatus: metadata.status === 'active' ? 'connected' : metadata.status === 'error' ? 'testing' : 'disabled',
    lastTested: metadata.lastTested ? new Date(metadata.lastTested).toLocaleString() : 'Never',
  }
}

function Brand() {
  return (
    <a className="brand" href="/" aria-label="SafeAI parent family space">
      <span className="brand-mark" aria-hidden="true" />
      <span>
        <span className="brand-word">SafeAI</span>
        <span className="brand-sub">Family space</span>
      </span>
    </a>
  )
}

const PASSWORD_HINT = `At least ${PASSWORD_MINIMUM} characters. A passphrase you do not use on any other site works best.`

function AuthGate({ notice }: { notice?: string }) {
  const [mode, setMode] = useState<'sign-in' | 'create' | 'reset'>('sign-in')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [info, setInfo] = useState('')
  const [busy, setBusy] = useState(false)

  const switchMode = (next: typeof mode) => {
    setMode(next)
    setError('')
    setInfo('')
    setPassword('')
  }

  const submit = async (event: FormEvent) => {
    event.preventDefault()
    setError('')
    setInfo('')
    setBusy(true)
    try {
      if (mode === 'create') {
        const result = await signUpParent(email, password)
        setPassword('')
        // Same message whether or not the email already had an account.
        if (result === 'check-email') setInfo('Check your inbox. If this email can be used, we have sent a confirmation link. Open it to finish setting up your family space.')
      } else if (mode === 'reset') {
        await requestPasswordReset(email)
        setInfo('If an account uses this email, a password reset link is on its way. The link opens this page so you can choose a new password.')
      } else {
        await signIn(email, password)
      }
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'We could not sign you in.')
    } finally {
      setBusy(false)
    }
  }

  const heading = mode === 'create' ? 'Create your family space.' : mode === 'reset' ? 'Reset your password.' : 'Support their learning journey.'
  const intro = mode === 'create'
    ? 'Create the parent account that will own your family space. Supabase Auth keeps only a secure hash of your password; SafeAI never sees or stores it.'
    : mode === 'reset'
      ? 'Enter the email for your parent account and we will send a single-use reset link.'
      : 'Sign in to review family settings, approval requests, and safety activity. Parent access is strictly separate from the child website.'
  const busyLabel = mode === 'create' ? 'Creating account…' : mode === 'reset' ? 'Sending link…' : 'Signing in…'
  const submitLabel = mode === 'create' ? 'Create parent account' : mode === 'reset' ? 'Send reset link' : 'Sign in'

  return (
    <main className="auth-shell">
      <section className="auth-card" aria-labelledby="parent-sign-in-title">
        <Brand />
        <p className="eyebrow">Parent space</p>
        <h1 id="parent-sign-in-title">{heading}</h1>
        <p className="small">{intro}</p>
        {notice && <p className="error-text" role="alert">{notice}</p>}
        {!supabaseConfigured && (
          <div className="notice notice-preview" role="status" style={{ marginTop: '1.5rem' }}>
            <strong>Account service unavailable</strong>
            <br />
            This deployment is missing its Supabase URL and publishable key, so sign-in and account creation are switched off. Set both in the hosting environment and redeploy.
          </div>
        )}
        <form className="auth-form" onSubmit={submit}>
          <div className="field">
            <label htmlFor="parent-email">Email</label>
            <input id="parent-email" type="email" autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} required maxLength={254} />
          </div>
          {mode !== 'reset' && (
            <div className="field">
              <label htmlFor="parent-password">Password</label>
              <input
                id="parent-password"
                type="password"
                autoComplete={mode === 'create' ? 'new-password' : 'current-password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={mode === 'create' ? PASSWORD_MINIMUM : undefined}
                maxLength={72}
                aria-describedby={mode === 'create' ? 'parent-password-hint' : undefined}
              />
              {mode === 'create' && <p id="parent-password-hint" className="small" style={{ margin: 0 }}>{PASSWORD_HINT}</p>}
            </div>
          )}
          {error && <p className="error-text" role="alert">{error}</p>}
          {info && <div className="notice" role="status">{info}</div>}
          <button className="button button-primary" disabled={!supabaseConfigured || busy}>{busy ? busyLabel : submitLabel}</button>
          {mode === 'sign-in' && (
            <button type="button" className="button button-quiet" onClick={() => switchMode('reset')}>Forgot your password?</button>
          )}
          <button type="button" className="button button-secondary" onClick={() => switchMode(mode === 'sign-in' ? 'create' : 'sign-in')}>
            {mode === 'sign-in' ? 'Create a new parent account' : 'Back to sign in'}
          </button>
        </form>
        <p className="small" style={{ marginTop: '1rem', marginBottom: 0 }}>
          Not an emergency service · Parent oversight for safe AI learning.
        </p>
      </section>
    </main>
  )
}

// Shown once, after a parent confirms their email and signs in for the first
// time. The database function binds the family to the signed-in account.
function FamilySetup({ onDone, onSignOut }: { onDone: () => void; onSignOut: () => void }) {
  const [displayName, setDisplayName] = useState('')
  const [familyName, setFamilyName] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const submit = async (event: FormEvent) => {
    event.preventDefault()
    setError('')
    setBusy(true)
    try {
      await completeParentSetup(displayName, familyName)
      onDone()
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'We could not set up your family space. Try again.')
      setBusy(false)
    }
  }

  return (
    <main className="auth-shell">
      <section className="auth-card" aria-labelledby="family-setup-title">
        <Brand />
        <p className="eyebrow">Almost there</p>
        <h1 id="family-setup-title">Name your family space.</h1>
        <p className="small">Your email is confirmed. Add your name and a name for the family space; you can add child accounts next.</p>
        <form className="auth-form" onSubmit={submit}>
          <div className="field">
            <label htmlFor="parent-display-name">Your name</label>
            <input id="parent-display-name" type="text" autoComplete="name" value={displayName} onChange={(e) => setDisplayName(e.target.value)} required maxLength={80} />
          </div>
          <div className="field">
            <label htmlFor="parent-family-name">Family space name</label>
            <input id="parent-family-name" type="text" value={familyName} onChange={(e) => setFamilyName(e.target.value)} required maxLength={80} />
          </div>
          {error && <p className="error-text" role="alert">{error}</p>}
          <button className="button button-primary" disabled={busy}>{busy ? 'Setting up…' : 'Create family space'}</button>
          <button type="button" className="button button-secondary" onClick={onSignOut}>Sign out</button>
        </form>
      </section>
    </main>
  )
}

// Reached from a password-reset email. The reset link signs the account in for
// this one purpose; nothing else opens until a new password is saved.
function PasswordRecovery({ onDone, onSignOut }: { onDone: () => void; onSignOut: () => void }) {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const submit = async (event: FormEvent) => {
    event.preventDefault()
    setError('')
    if (password !== confirmPassword) {
      setError('The two passwords do not match.')
      return
    }
    setBusy(true)
    try {
      await updatePassword(password)
      setPassword('')
      setConfirmPassword('')
      onDone()
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'We could not update the password. Request a new reset link.')
      setBusy(false)
    }
  }

  return (
    <main className="auth-shell">
      <section className="auth-card" aria-labelledby="password-recovery-title">
        <Brand />
        <p className="eyebrow">Password reset</p>
        <h1 id="password-recovery-title">Choose a new password.</h1>
        <p className="small">{PASSWORD_HINT}</p>
        <form className="auth-form" onSubmit={submit}>
          <div className="field">
            <label htmlFor="new-password">New password</label>
            <input id="new-password" type="password" autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={PASSWORD_MINIMUM} maxLength={72} />
          </div>
          <div className="field">
            <label htmlFor="confirm-password">Confirm new password</label>
            <input id="confirm-password" type="password" autoComplete="new-password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required minLength={PASSWORD_MINIMUM} maxLength={72} />
          </div>
          {error && <p className="error-text" role="alert">{error}</p>}
          <button className="button button-primary" disabled={busy}>{busy ? 'Saving…' : 'Save new password'}</button>
          <button type="button" className="button button-secondary" onClick={onSignOut}>Cancel and sign out</button>
        </form>
      </section>
    </main>
  )
}

// Email links come back with ?auth=confirm or ?auth=recovery. The marker is read
// once and removed from the address bar; it only chooses which screen to show.
const AUTH_RETURN = (() => {
  if (typeof window === 'undefined') return null
  const params = new URLSearchParams(window.location.search)
  const marker = params.get('auth')
  if (!marker) return null
  params.delete('auth')
  const query = params.toString()
  window.history.replaceState(window.history.state, '', `${window.location.pathname}${query ? `?${query}` : ''}${window.location.hash}`)
  return marker === 'recovery' || marker === 'confirm' ? marker : null
})()
let confirmNoticePending = AUTH_RETURN === 'confirm'

export default function App() {
  const [access, setAccess] = useState<'checking' | 'signed-out' | 'needs-setup' | 'recovery' | 'signed-in'>(supabaseConfigured ? 'checking' : 'signed-out')
  const [accessNotice, setAccessNotice] = useState('')
  const recoveryPending = useRef(AUTH_RETURN === 'recovery')
  const recheckAccess = useRef<() => void>(() => undefined)
  const [familyDataError, setFamilyDataError] = useState('')
  const [profileName, setProfileName] = useState('Parent account')
  const [activeTab, setActiveTab] = useState<ParentTab>('overview')
  const [tourStep, setTourStep] = useState<number | null>(0)
  const [soundMuted, setSoundMuted] = useState(isAudioMuted())

  const handleToggleSound = () => {
    const next = toggleAudio()
    setSoundMuted(next)
    if (!next) {
      playTapSound()
    }
  }

  const switchTab = (tab: ParentTab) => {
    if (tab !== activeTab) {
      playTabSound()
    }
    setActiveTab(tab)
  }

  // Linked children come from the authenticated family. An empty array is a
  // real empty state, never a fictional child account.
  const [children, setChildren] = useState<ChildProfile[]>([])
  const [selectedChildId, setSelectedChildId] = useState<string>('')
  const [childrenLoading, setChildrenLoading] = useState(false)

  // Approvals & history remain empty until those server-backed flows are
  // connected; fictional activity is never substituted for real data.
  const [approvals, setApprovals] = useState<PreviewApproval[]>([])
  const [historyItems, setHistoryItems] = useState<import('@safeai/shared').HistoryRecord[]>([])
  const [alerts, setAlerts] = useState<ActivityAlert[]>([])
  const [notifications, setNotifications] = useState<import('@safeai/shared').ParentActivity['notifications']>([])
  const [metrics, setMetrics] = useState<import('@safeai/shared').ParentActivity['metrics']>({ allowed_count: 0, support_count: 0, approval_count: 0, blocked_count: 0, urgent_count: 0, lessons_started: 0, updated_at: null })
  const [historyFilter, setHistoryFilter] = useState<'all' | SafetyState>('all')
  const [historySearch, setHistorySearch] = useState('')

  // Settings state
  const [ordinaryNotifications, setOrdinaryNotifications] = useState(false)
  const [flaggedHighlighted, setFlaggedHighlighted] = useState(true)
  const [parentBlockedTopics, setParentBlockedTopics] = useState<string[]>([])

  // API Provider state (masked, secure, parent-only)
  const [apiSettings, setApiSettings] = useState<ApiProviderSettings>(INITIAL_API_SETTINGS)
  const [showRotateKeyInput, setShowRotateKeyInput] = useState(false)
  const [newKeyDraft, setNewKeyDraft] = useState('')
  const [providerDraft, setProviderDraft] = useState<Provider>('anthropic')
  const [apiBusy, setApiBusy] = useState(false)
  const [apiFeedback, setApiFeedback] = useState('')

  const [childForm, setChildForm] = useState({ displayName: '', email: '', password: '', schoolYear: '' })
  const [childAccountBusy, setChildAccountBusy] = useState(false)
  const [childAccountFeedback, setChildAccountFeedback] = useState('')
  const [passwordChildId, setPasswordChildId] = useState<string | null>(null)
  const [childPasswordForm, setChildPasswordForm] = useState({ password: '', confirm: '' })
  const [childPasswordBusy, setChildPasswordBusy] = useState(false)
  const [childPasswordFeedback, setChildPasswordFeedback] = useState<{ childId: string; message: string } | null>(null)
  const [showChildCreatePassword, setShowChildCreatePassword] = useState(false)
  const [showChildResetPassword, setShowChildResetPassword] = useState(false)
  const [showTemporaryChildPassword, setShowTemporaryChildPassword] = useState(false)
  const [temporaryChildCredential, setTemporaryChildCredential] = useState<TemporaryChildCredential | null>(null)
  const [credentialCopyFeedback, setCredentialCopyFeedback] = useState('')
  const [privacyFeedback, setPrivacyFeedback] = useState('')
  const [deleteConfirmation, setDeleteConfirmation] = useState('')
  const [deleteBusy, setDeleteBusy] = useState(false)

  // Selected child object
  const activeChild = children.find((c) => c.id === selectedChildId)
  const activeChildId = activeChild?.id
  const activeChildLabel = activeChild?.name ?? 'your linked child'

  // Filtered approvals for selected child
  const childApprovals = approvals.filter((a) => a.childId === activeChildId)
  const pendingApprovalsCount = approvals.filter((a) => a.status === 'pending').length

  // Filtered history for selected child
  const childHistory = historyItems.filter((h) => {
    if (h.childId !== activeChildId) return false
    if (historyFilter !== 'all' && h.state !== historyFilter) return false
    if (historySearch.trim() && !h.title.toLowerCase().includes(historySearch.toLowerCase()) && !h.summary.toLowerCase().includes(historySearch.toLowerCase())) {
      return false
    }
    return true
  })

  // A session only opens this site if family_members says the account is a
  // parent. Child accounts are signed out and sent back to the child website.
  useEffect(() => {
    if (!supabase) return
    let active = true
    const check = async (hasSession: boolean) => {
      if (!hasSession) {
        if (active) {
          setAccess('signed-out')
          setApiSettings(INITIAL_API_SETTINGS)
          if (recoveryPending.current) {
            recoveryPending.current = false
            setAccessNotice('That reset link has expired, was already used, or was opened in a different browser. Request a new one below.')
          } else if (confirmNoticePending) {
            confirmNoticePending = false
            setAccessNotice('If you just confirmed your email, sign in to finish setting up your family space.')
          }
        }
        return
      }
      if (recoveryPending.current) {
        if (active) setAccess('recovery')
        return
      }
      const parentAccess = await confirmParentAccess()
      if (!active) return
      if (parentAccess === 'needs-family-setup') {
        setAccess('needs-setup')
        return
      }
      if (parentAccess === 'denied') {
        setAccess('signed-out')
        setAccessNotice('This account cannot use the parent space. Children sign in on the child website.')
        return
      }
      setAccessNotice('')
      setAccess('signed-in')
      setChildrenLoading(true)
      setFamilyDataError('')
      try {
        const [profile, metadata, linkedChildren, activity] = await Promise.all([
          fetchMyProfile(),
          fetchProviderMetadata(),
          fetchLinkedChildren(),
          fetchParentActivity(),
        ])
        if (!active) return
        if (profile) setProfileName(profile.displayName)
        setApiSettings(settingsFromMetadata(metadata))
        setApprovals(activity.approvals)
        setHistoryItems(activity.history)
        setAlerts(activity.alerts)
        setNotifications(activity.notifications)
        setMetrics(activity.metrics)
        setOrdinaryNotifications(activity.access.some((row) => row.ordinaryNotifications))
        setFlaggedHighlighted(activity.access.length === 0 || activity.access.some((row) => row.flaggedNotifications))
        const mappedChildren: ChildProfile[] = linkedChildren.map((child) => ({
          id: child.id,
          name: child.displayName,
          age: 0,
          schoolYear: child.schoolYear,
          avatar: child.displayName.slice(0, 1).toUpperCase(),
          lessonsStarted: 0,
          activeApprovals: activity.approvals.filter((approval) => approval.childId === child.id && approval.status === 'pending').length,
          chatPaused: activity.access.find((row) => row.childId === child.id)?.chatbotPaused ?? child.disabled,
        }))
        setChildren(mappedChildren)
        const initialChildId = selectedChildId || mappedChildren[0]?.id || ''
        setSelectedChildId(initialChildId)
        setParentBlockedTopics(activity.access.find((row) => row.childId === initialChildId)?.blockedTopics ?? [])
      } catch (caught) {
        if (!active) return
        setChildren([])
        setSelectedChildId('')
        const code = caught instanceof Error ? caught.message : ''
        setFamilyDataError(
          code === 'auth_backend_not_configured'
            ? 'Family data service is not configured on this deployment yet. No account data was changed.'
            : 'Family data could not be loaded. Nothing was changed; try again later.',
        )
      } finally {
        if (active) setChildrenLoading(false)
      }
    }
    recheckAccess.current = () => {
      void supabase?.auth.getSession().then(({ data }) => check(Boolean(data.session)))
    }
    const { data: listener } = supabase.auth.onAuthStateChange((event, nextSession) => {
      if (event === 'TOKEN_REFRESHED') return
      if (event === 'PASSWORD_RECOVERY') recoveryPending.current = true
      // Deferred so no Supabase call runs inside the auth callback itself.
      setTimeout(() => void check(Boolean(nextSession)), 0)
    })
    return () => {
      active = false
      setChildrenLoading(false)
      listener.subscription.unsubscribe()
    }
  }, [])

  // Polling keeps the two hosted sites in sync without exposing a realtime
  // subscription to the browser. Only family-scoped rows are returned by the API.
  useEffect(() => {
    if (access !== 'signed-in') return
    let active = true
    const refresh = async () => {
      try {
        const activity = await fetchParentActivity()
        if (!active) return
        setApprovals(activity.approvals)
        setHistoryItems(activity.history)
        setAlerts(activity.alerts)
        setNotifications(activity.notifications)
        setMetrics(activity.metrics)
        setOrdinaryNotifications(activity.access.some((row) => row.ordinaryNotifications))
        setFlaggedHighlighted(activity.access.length === 0 || activity.access.some((row) => row.flaggedNotifications))
        setParentBlockedTopics(activity.access.find((row) => row.childId === selectedChildId)?.blockedTopics ?? [])
        setChildren((current) => current.map((child) => ({
          ...child,
          activeApprovals: activity.approvals.filter((approval) => approval.childId === child.id && approval.status === 'pending').length,
          chatPaused: activity.access.find((row) => row.childId === child.id)?.chatbotPaused ?? child.chatPaused,
        })))
      } catch {
        // Keep the last known view; the next poll retries without clearing data.
      }
    }
    const interval = window.setInterval(() => void refresh(), 5000)
    let unsubscribe: (() => void) | undefined
    void subscribeToFamilyRealtime('parent', undefined, () => void refresh()).then((cleanup) => { unsubscribe = cleanup })
    return () => {
      active = false
      window.clearInterval(interval)
      unsubscribe?.()
    }
  }, [access, selectedChildId])

  const signOutNow = async () => {
    recoveryPending.current = false
    await signOut()
    setAccessNotice('')
    setApiSettings(INITIAL_API_SETTINGS)
    setChildren([])
    setSelectedChildId('')
    setTemporaryChildCredential(null)
    setCredentialCopyFeedback('')
    setShowTemporaryChildPassword(false)
    setAccess('signed-out')
  }

  // Handle approval decision
  const handleDecision = async (approvalId: string, status: ApprovalStatus, note: string) => {
    playTapSound()
    try {
      await resolveParentApproval(approvalId, status, note)
      setApprovals((prev) => prev.map((appr) => (appr.id === approvalId ? { ...appr, status, note } : appr)))
      setChildren((prev) => prev.map((c) => c.id === activeChildId ? { ...c, activeApprovals: Math.max(0, c.activeApprovals - 1) } : c))
    } catch {
      setFamilyDataError('That decision could not be saved. The request is unchanged; try again.')
    }
  }

  // Handle toggling child chat access
  const toggleChildChatPause = async (childId: string) => {
    playToggleSound()
    const child = children.find((item) => item.id === childId)
    if (!child) return
    try {
      await updateParentAccess({ childId, chatbotPaused: !child.chatPaused, ordinaryNotifications, flaggedNotifications: flaggedHighlighted, blockedTopics: parentBlockedTopics })
      setChildren((prev) => prev.map((c) => (c.id === childId ? { ...c, chatPaused: !c.chatPaused } : c)))
    } catch {
      setFamilyDataError('Chat access could not be changed. Nothing was changed; try again.')
    }
  }

  const updateNotificationSetting = async (kind: 'ordinary' | 'flagged', value: boolean) => {
    if (!activeChild) return
    try {
      await updateParentAccess({
        childId: activeChild.id,
        chatbotPaused: activeChild.chatPaused,
        ordinaryNotifications: kind === 'ordinary' ? value : ordinaryNotifications,
        flaggedNotifications: kind === 'flagged' ? value : flaggedHighlighted,
        blockedTopics: parentBlockedTopics,
      })
      if (kind === 'ordinary') setOrdinaryNotifications(value)
      else setFlaggedHighlighted(value)
      playToggleSound(value)
    } catch {
      setFamilyDataError('Notification settings could not be changed. Nothing was changed; try again.')
    }
  }

  const updateParentSafetyTopic = async (topic: string, checked: boolean) => {
    if (!activeChild) return
    const nextTopics = checked
      ? [...new Set([...parentBlockedTopics, topic])]
      : parentBlockedTopics.filter((item) => item !== topic)
    try {
      await updateParentAccess({
        childId: activeChild.id,
        chatbotPaused: activeChild.chatPaused,
        ordinaryNotifications,
        flaggedNotifications: flaggedHighlighted,
        blockedTopics: nextTopics,
      })
      setParentBlockedTopics(nextTopics)
      playToggleSound(checked)
    } catch {
      setFamilyDataError('Safety criteria could not be changed. Nothing was changed; try again.')
    }
  }

  const handleCreateChild = async (event: FormEvent) => {
    event.preventDefault()
    setChildAccountFeedback('')
    setChildAccountBusy(true)
    try {
      const created = await createChildAccount(childForm)
      const mapped: ChildProfile = {
        id: created.id,
        name: created.displayName,
        age: 0,
        schoolYear: created.schoolYear,
        avatar: created.displayName.slice(0, 1).toUpperCase(),
        lessonsStarted: 0,
        activeApprovals: 0,
        chatPaused: created.disabled,
      }
      setChildren((current) => [...current, mapped])
      setSelectedChildId(created.id)
      setTemporaryChildCredential({ childId: created.id, childName: created.displayName, email: created.email ?? childForm.email.trim().toLowerCase(), password: childForm.password, kind: 'created' })
      setCredentialCopyFeedback('')
      setShowTemporaryChildPassword(false)
      setChildForm({ displayName: '', email: '', password: '', schoolYear: '' })
      setShowChildCreatePassword(false)
      setChildAccountFeedback('Child account created. Copy the temporary sign-in details now; SafeAI will not save the password for later retrieval.')
    } catch (caught) {
      const code = caught instanceof Error ? caught.message : ''
      setChildAccountFeedback(
        code === 'auth_backend_not_configured' || code === 'secure_backend_not_configured'
          ? 'Child account service is not configured on this deployment yet. Nothing was created.'
          : code === 'child_limit_reached'
            ? 'This family space already has the maximum of 10 child accounts. Nothing was created.'
            : code === 'child_password_rejected'
              ? 'That password was rejected. Choose a longer one that is not used on other sites. Nothing was created.'
              : code === 'invalid_child_account'
                ? 'Check the details: a name, a school year, a valid email and a password of at least 12 characters.'
                : 'The child account could not be created. Check the email or try a different one. Nothing was created.',
      )
    } finally {
      setChildAccountBusy(false)
    }
  }

  const openChildPasswordForm = (childId: string | null) => {
    setPasswordChildId(childId)
    setChildPasswordForm({ password: '', confirm: '' })
    setShowChildResetPassword(false)
    setChildPasswordFeedback(null)
  }

  const copyTemporaryChildPassword = async () => {
    if (!temporaryChildCredential) return
    setCredentialCopyFeedback('')
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(temporaryChildCredential.password)
      } else {
        const copyTarget = document.createElement('textarea')
        copyTarget.value = temporaryChildCredential.password
        copyTarget.setAttribute('readonly', '')
        copyTarget.style.position = 'fixed'
        copyTarget.style.opacity = '0'
        document.body.appendChild(copyTarget)
        copyTarget.select()
        const copied = document.execCommand('copy')
        copyTarget.remove()
        if (!copied) throw new Error('clipboard_unavailable')
      }
      setCredentialCopyFeedback('Copied. SafeAI keeps this password only in this page until you hide the receipt or leave the page.')
    } catch {
      setCredentialCopyFeedback('Copy is unavailable in this browser. Select the password manually, then hide this receipt when finished.')
    }
  }

  const handleSetChildPassword = async (event: FormEvent, childId: string) => {
    event.preventDefault()
    setChildPasswordFeedback(null)
    if (childPasswordForm.password !== childPasswordForm.confirm) {
      setChildPasswordFeedback({ childId, message: 'The two passwords do not match. Nothing was changed.' })
      return
    }
    setChildPasswordBusy(true)
    try {
      await setChildPassword(childId, childPasswordForm.password)
      const child = children.find((item) => item.id === childId)
      setTemporaryChildCredential({ childId, childName: child?.name ?? 'your child', password: childPasswordForm.password, kind: 'reset' })
      setCredentialCopyFeedback('')
      setShowTemporaryChildPassword(false)
      setPasswordChildId(null)
      setChildPasswordForm({ password: '', confirm: '' })
      setShowChildResetPassword(false)
      setChildPasswordFeedback({ childId, message: 'New password saved. Copy it now if you need to share it; SafeAI will not save it for later retrieval.' })
    } catch (caught) {
      const code = caught instanceof Error ? caught.message : ''
      setChildPasswordForm({ password: '', confirm: '' })
      if (code === 'child_sessions_revoke_failed') {
        setPasswordChildId(null)
        setChildPasswordFeedback({
          childId,
          message: 'New password saved, but your child may still be signed in on devices they already use. Set a new password again to sign them out everywhere.',
        })
        return
      }
      setChildPasswordFeedback({
        childId,
        message:
          code === 'auth_backend_not_configured' || code === 'secure_backend_not_configured'
            ? 'The account service is not configured on this deployment yet. Nothing was changed.'
            : code === 'child_password_rejected'
              ? 'That password was rejected. Choose a longer one that is not used on other sites. Nothing was changed.'
              : code === 'invalid_child_password'
                ? `Use a password of ${PASSWORD_MINIMUM}–72 characters. Nothing was changed.`
                : 'The password could not be changed. Try again. Nothing was changed.',
      })
    } finally {
      setChildPasswordBusy(false)
    }
  }

  // API Provider actions. The raw key never enters React state after submit;
  // this action only receives masked metadata back from the server.
  const handleTestConnection = async () => {
    setApiBusy(true)
    setApiFeedback('Testing the saved provider connection…')
    try {
      const result = await testProviderConnection()
      setApiSettings((current) => ({ ...current, provider: result.provider, isConfigured: true, connectionStatus: 'connected', lastTested: new Date(result.lastTested).toLocaleString() }))
      setApiFeedback('Connection test passed. Allowed child questions can now use the selected provider through the server safety boundary.')
    } catch (caught) {
      const code = caught instanceof Error ? caught.message : 'provider_request_failed'
      setApiSettings((current) => ({ ...current, connectionStatus: current.isConfigured ? 'testing' : 'not-configured' }))
      setApiFeedback(providerErrorMessage(code))
    } finally {
      setApiBusy(false)
    }
  }

  const handleSaveRotatedKey = async (e: FormEvent) => {
    e.preventDefault()
    const draft = newKeyDraft.trim()
    // Clear the field straight away so the key does not linger in the page.
    setNewKeyDraft('')
    if (!draft) return
    if (!supabaseConfigured) {
      setShowRotateKeyInput(false)
      setApiFeedback('Preview only: the key was discarded. Nothing was sent or stored.')
      return
    }
    setApiBusy(true)
    const result = await saveProviderKey(providerDraft, draft)
    setApiBusy(false)
    if (!result.ok) {
      setApiFeedback(result.message)
      return
    }
    setShowRotateKeyInput(false)
    setApiSettings({
      provider: providerDraft,
      isConfigured: true,
      maskedEnding: result.maskedEnding ? `••••${result.maskedEnding}` : 'Stored',
      connectionStatus: 'testing',
      lastTested: 'Never',
    })
    setApiFeedback('Key saved encrypted on the server. Test the connection to enable provider-backed answers.')
  }

  const handleDisableKey = () => {
    setApiSettings((current) => ({ ...current, connectionStatus: 'disabled' }))
    setApiFeedback('Provider use disabled for this family. Re-test the connection when you want to enable it again.')
  }

  const handleRemoveKey = async () => {
    if (!supabaseConfigured) {
      setApiSettings(INITIAL_API_SETTINGS)
      setApiFeedback('Preview only: the sample key details were cleared. Nothing was stored.')
      return
    }
    setApiBusy(true)
    const result = await removeProviderKey()
    setApiBusy(false)
    if (!result.ok) {
      setApiFeedback(result.message)
      return
    }
    setApiSettings(INITIAL_API_SETTINGS)
    setApiFeedback('Key removed. The encrypted key and its masked details were deleted from the server.')
  }

  // Walkthrough navigation handler that automatically switches tabs if target is elsewhere
  const handleNextTourStep = () => {
    if (tourStep === null) return
    playTourStepSound()
    const nextIdx = tourStep + 1
    if (nextIdx >= PARENT_WALKTHROUGH_STEPS.length) {
      setTourStep(null)
      return
    }
    const targetStep = PARENT_WALKTHROUGH_STEPS[nextIdx]
    if (targetStep.actionSection) {
      setActiveTab(targetStep.actionSection as ParentTab)
    }
    setTourStep(nextIdx)
  }

  const handlePrevTourStep = () => {
    if (tourStep === null || tourStep === 0) return
    playTourStepSound()
    const prevIdx = tourStep - 1
    const targetStep = PARENT_WALKTHROUGH_STEPS[prevIdx]
    if (targetStep.actionSection) {
      setActiveTab(targetStep.actionSection as ParentTab)
    }
    setTourStep(prevIdx)
  }

  const restartTour = () => {
    playTourStepSound()
    setActiveTab('overview')
    setTourStep(0)
  }

  const resetDemo = () => {
    playTapSound()
    setActiveTab('overview')
    setTourStep(0)
    setChildAccountFeedback('')
    setTemporaryChildCredential(null)
    setCredentialCopyFeedback('')
    setShowTemporaryChildPassword(false)
    setShowChildCreatePassword(false)
    setShowChildResetPassword(false)
    setApiFeedback('')
    setPrivacyFeedback('')
    setShowRotateKeyInput(false)
    setNewKeyDraft('')
    void fetchParentActivity().then((activity) => {
      setApprovals(activity.approvals)
      setHistoryItems(activity.history)
      setAlerts(activity.alerts)
      setNotifications(activity.notifications)
      setMetrics(activity.metrics)
      setOrdinaryNotifications(activity.access.some((row) => row.ordinaryNotifications))
      setFlaggedHighlighted(activity.access.length === 0 || activity.access.some((row) => row.flaggedNotifications))
      setParentBlockedTopics(activity.access.find((row) => row.childId === selectedChildId)?.blockedTopics ?? [])
    }).catch(() => undefined)
  }

  const handleFamilyDeletion = async () => {
    if (deleteConfirmation !== 'DELETE MY FAMILY DATA') return
    setDeleteBusy(true)
    setPrivacyFeedback('')
    try {
      await deleteFamilyData(deleteConfirmation)
      await signOut()
      setPrivacyFeedback('Family records were deleted. You have been signed out; your Supabase login account remains available to create a new family later.')
      setAccess('signed-out')
      setChildren([])
      setSelectedChildId('')
    } catch (caught) {
      setPrivacyFeedback(caught instanceof Error && caught.message === 'secure_backend_not_configured' ? 'Secure deletion is not configured on this deployment. Nothing was changed.' : 'Family deletion could not be completed. Nothing was changed; try again.')
    } finally {
      setDeleteBusy(false)
    }
  }

  if (supabaseConfigured && access === 'checking') {
    return (
      <main className="auth-shell">
        <p className="small" role="status">Checking your account…</p>
      </main>
    )
  }
  if (supabaseConfigured && access === 'needs-setup') return <FamilySetup onDone={() => recheckAccess.current()} onSignOut={() => void signOutNow()} />
  if (supabaseConfigured && access === 'recovery') {
    return (
      <PasswordRecovery
        onDone={() => {
          recoveryPending.current = false
          recheckAccess.current()
        }}
        onSignOut={() => void signOutNow()}
      />
    )
  }
  if (supabaseConfigured && access !== 'signed-in') return <AuthGate notice={accessNotice} />
  if (!supabaseConfigured) return <AuthGate />

  return (
    <div className="site-shell">
      {/* Top Header */}
      <header className="topbar">
        <Brand />
        <nav className="topbar-nav" aria-label="Desktop primary navigation">
          <button
            type="button"
            className={`topbar-nav-button ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => switchTab('overview')}
            aria-current={activeTab === 'overview' ? 'page' : undefined}
          >
            <span className="topbar-nav-icon" aria-hidden="true" style={{ display: 'inline-flex', alignItems: 'center' }}><IconHome size={15} /></span>
            <span>Overview</span>
          </button>
          <button
            type="button"
            className={`topbar-nav-button ${activeTab === 'approvals' ? 'active' : ''}`}
            onClick={() => switchTab('approvals')}
            aria-current={activeTab === 'approvals' ? 'page' : undefined}
          >
            <span className="topbar-nav-icon" aria-hidden="true" style={{ display: 'inline-flex', alignItems: 'center' }}><IconApprovals size={15} /></span>
            <span>Approvals</span>
            {pendingApprovalsCount > 0 && <span className="topbar-nav-badge">{pendingApprovalsCount}</span>}
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
            className={`topbar-nav-button ${activeTab === 'alerts' ? 'active' : ''}`}
            onClick={() => switchTab('alerts')}
            aria-current={activeTab === 'alerts' ? 'page' : undefined}
          >
            <span className="topbar-nav-icon" aria-hidden="true" style={{ display: 'inline-flex', alignItems: 'center' }}><IconBellAlert size={15} /></span>
            <span>Alerts</span>
          </button>
          <button
            type="button"
            className={`topbar-nav-button ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => switchTab('settings')}
            aria-current={activeTab === 'settings' ? 'page' : undefined}
          >
            <span className="topbar-nav-icon" aria-hidden="true" style={{ display: 'inline-flex', alignItems: 'center' }}><IconSliders size={15} /></span>
            <span>Settings</span>
          </button>
        </nav>
        <div id="tour-parent-signout" className="header-actions">
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
            <span className="avatar">P</span>
            <span>{profileName} · Parent account</span>
          </div>
          <button type="button" className="button button-secondary button-sm" onClick={signOutNow}>
            Leave
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="main">
        {supabaseConfigured && (
          <p className="notice notice-preview" role="status">
            <strong>Signed in.</strong> This space shows only family records returned for your account. Create a child account in Settings to begin; no fictional children are substituted.
          </p>
        )}
        {familyDataError && (
          <p className="notice notice-preview" role="alert">
            {familyDataError}
          </p>
        )}

        {/* Child Switcher Pill Bar */}
        <section
          id="tour-parent-switcher"
          className="child-switcher-bar"
          aria-label="Linked children profile switcher"
        >
          {children.length === 0 ? (
            <p className="small" style={{ margin: 0 }}>No linked child accounts yet. Create one from Settings.</p>
          ) : children.map((child) => (
            <button
              key={child.id}
              type="button"
              className={`child-switcher-pill ${child.id === activeChild?.id ? 'active' : ''}`}
              onClick={() => {
                playTapSound()
                setSelectedChildId(child.id)
              }}
            >
              <span className="avatar">{child.avatar}</span>
              <span>
                {child.name} <span className="small">({child.schoolYear})</span>
              </span>
              {child.activeApprovals > 0 && (
                <span className="status-label status-approval" style={{ padding: '.15rem .45rem', fontSize: '.7rem' }}>
                  {child.activeApprovals}
                </span>
              )}
            </button>
          ))}
        </section>

        {/* Contextual Popover Walkthrough */}
        {tourStep !== null && (
          <ContextualPopover
            step={PARENT_WALKTHROUGH_STEPS[tourStep]}
            stepIndex={tourStep}
            totalSteps={PARENT_WALKTHROUGH_STEPS.length}
            onNext={handleNextTourStep}
            onPrev={handlePrevTourStep}
            onSkip={() => setTourStep(null)}
            role="parent"
          />
        )}

        {/* Tab 1: Family Overview */}
        {activeTab === 'overview' && (
          <div id="tour-parent-overview" className="grid">
            <div className="page-heading">
              <div>
                <p className="eyebrow">Family space</p>
                <h1>{activeChild ? `${activeChild.name}’s learning activity.` : 'Your family learning activity.'}</h1>
                <p>Support their digital curiosity while respecting the transparent visibility boundary.</p>
              </div>
            </div>

            {/* At a glance metrics */}
            <div className="stats-row">
              <div className="stat">
                <span className="stat-value">{activeChild?.lessonsStarted ?? 0}</span>
                <span className="stat-label">lessons explored</span>
              </div>
              <div className="stat">
                <span className="stat-value">{activeChild?.activeApprovals ?? 0}</span>
                <span className="stat-label">pending approvals</span>
              </div>
              <div className="stat">
                <span className="stat-value">{activeChild?.chatPaused ? 'Paused' : activeChild ? 'Active' : '—'}</span>
                <span className="stat-label">chat status</span>
              </div>
            </div>

            <div className="grid grid-two">
              <article className="panel panel-soft" aria-labelledby="privacy-metrics-heading">
                <div className="section-head" style={{ margin: '0 0 .8rem' }}>
                  <h2 id="privacy-metrics-heading">Privacy-safe activity</h2>
                  <span className="status-label status-allowed">Live totals</span>
                </div>
                <p className="small">Aggregate counts only. SafeAI does not send chat wording to analytics.</p>
                <div className="stats-row" style={{ margin: 0 }}>
                  <div className="stat"><span className="stat-value">{metrics.allowed_count}</span><span className="stat-label">allowed</span></div>
                  <div className="stat"><span className="stat-value">{metrics.approval_count}</span><span className="stat-label">reviews</span></div>
                  <div className="stat"><span className="stat-value">{metrics.blocked_count + metrics.urgent_count}</span><span className="stat-label">protected stops</span></div>
                </div>
              </article>
              <article className="panel panel-soft" aria-labelledby="notifications-heading">
                <div className="section-head" style={{ margin: '0 0 .8rem' }}>
                  <h2 id="notifications-heading">Family notifications</h2>
                  <span className="status-label status-approval">{notifications.filter((item) => !item.readAt).length} new</span>
                </div>
                {notifications.length === 0 ? <p className="small">No new family notifications.</p> : notifications.slice(0, 3).map((item) => (
                  <div className="list-row" key={item.id} style={{ padding: '.55rem 0' }}>
                    <div className="list-copy"><strong>{item.childName ? item.childName + ' · ' + item.title : item.title}</strong><p>{item.body}</p></div>
                  </div>
                ))}
              </article>
            </div>

            {/* Attention Cards */}
            <div className="grid grid-two">
              <article className="panel panel-soft">
                <div className="section-head" style={{ margin: '0 0 .8rem' }}>
                  <h2>Approval requests</h2>
                  <button type="button" className="button button-quiet" onClick={() => { playTapSound(); setActiveTab('approvals') }}>
                    Open centre
                  </button>
                </div>
                {childApprovals.filter((a) => a.status === 'pending').length > 0 ? (
                  <div className="list-row" style={{ padding: 0 }}>
                    <div className="list-copy">
                      <strong>{childApprovals[0].category}</strong>
                      <p>{childApprovals[0].contextSummary}</p>
                    </div>
                    <button type="button" className="button button-primary button-sm" onClick={() => { playTapSound(); setActiveTab('approvals') }}>
                      Review
                    </button>
                  </div>
                ) : (
                  <p className="small">{activeChild ? `No pending requests for ${activeChild.name}. All clear!` : 'Create a linked child account to see approval requests here.'}</p>
                )}
              </article>

              <article className="panel protected-card">
                <div className="section-head" style={{ margin: '0 0 .8rem' }}>
                  <h2>Safety alerts</h2>
                  <button type="button" className="button button-quiet" onClick={() => { playTapSound(); setActiveTab('alerts') }}>
                    View alerts
                  </button>
                </div>
                <div className="list-row" style={{ padding: 0 }}>
                  <div className="list-copy">
                    <strong>Protected emergency storyboard</strong>
                    <p>Disclosure text withheld to protect child autonomy and safety.</p>
                  </div>
                  <button type="button" className="button button-secondary button-sm" onClick={() => { playTapSound(); setActiveTab('alerts') }}>
                    Read
                  </button>
                </div>
              </article>
            </div>

            {/* Privacy notice banner */}
            <section className="panel privacy-card">
              <h2>What parent visibility means</h2>
              <p className="small">
                {activeChild ? `${activeChild.name} is shown an upfront notice before beginning chat: selected study activity and sensitive flagged topics may be reviewed by you.` : 'Create a linked child account to show the privacy notice and access controls for that child.'} This system avoids covert surveillance and never treats parent approval as a replacement for professional safeguarding.
              </p>
              <button type="button" className="button button-secondary button-sm" onClick={() => { playTapSound(); setActiveTab('settings') }}>
                Review family access controls
              </button>
            </section>
          </div>
        )}

        {/* Tab 2: Approval Centre */}
        {activeTab === 'approvals' && (
          <div id="tour-parent-approvals" className="grid">
            <div className="page-heading">
              <div>
                <p className="eyebrow">Decide together</p>
                <h1>Approval centre.</h1>
                <p>Sensitive topics require adult review before deeper answers are shared with {activeChildLabel}.</p>
              </div>
              <BootsCompanion label="Boots companion reminding to talk" />
            </div>

            {childApprovals.length === 0 ? (
              <div className="empty-state-card">
                <div className="empty-state-icon" aria-hidden="true"><IconCheck size={24} /></div>
                <h3>All caught up</h3>
                <p>No approval requests pending for {activeChildLabel}. Any topics requiring adult guidance will be routed here for your review.</p>
              </div>
            ) : (
              childApprovals.map((appr) => (
                <section key={appr.id} className="panel" aria-labelledby={`appr-title-${appr.id}`}>
                  <div className={`status-banner status-${appr.status === 'pending' ? 'approval' : appr.status === 'approved' ? 'allowed' : 'blocked'}`}>
                    <span className="status-icon" aria-hidden="true">
                      {appr.status === 'pending' ? <IconArrowUpRight size={14} /> : appr.status === 'approved' ? <IconCheck size={14} /> : <IconX size={14} />}
                    </span>

                    <div>
                      <strong id={`appr-title-${appr.id}`}>
                        {appr.category} · {appr.status.toUpperCase()}
                      </strong>
                      <p>{appr.time}</p>
                    </div>
                  </div>

                  <div style={{ marginTop: '1rem' }}>
                    <p style={{ margin: '0 0 .5rem', fontWeight: 600 }}>Limited Context Summary:</p>
                    <p className="small" style={{ margin: '0 0 1rem' }}>{appr.contextSummary}</p>

                    <div className="notice" style={{ marginBottom: '1rem' }}>
                      <strong>Why this was routed:</strong> This topic is potentially educational but involves sensitive considerations that warrant adult guidance.
                    </div>

                    {appr.status === 'pending' ? (
                      <div>
                        <div className="field">
                          <label htmlFor={`parent-note-${appr.id}`}>Optional note for {activeChildLabel}:</label>
                          <textarea
                            id={`parent-note-${appr.id}`}
                            rows={3}
                            placeholder="e.g. Let’s read through this revision guide together tonight."
                            defaultValue={appr.note || ''}
                          />
                        </div>
                        <div className="row-actions" style={{ marginTop: '1rem' }}>
                          <button
                            type="button"
                            className="button button-approve"
                            onClick={() => {
                              const el = document.getElementById(`parent-note-${appr.id}`) as HTMLTextAreaElement
                              handleDecision(appr.id, 'approved', el?.value || '')
                            }}
                          >
                            Approve
                          </button>
                          <button
                            type="button"
                            className="button button-danger"
                            onClick={() => {
                              const el = document.getElementById(`parent-note-${appr.id}`) as HTMLTextAreaElement
                              handleDecision(appr.id, 'rejected', el?.value || '')
                            }}
                          >
                            Reject
                          </button>
                          <button
                            type="button"
                            className="button button-secondary"
                            onClick={() => {
                              const el = document.getElementById(`parent-note-${appr.id}`) as HTMLTextAreaElement
                              handleDecision(appr.id, 'discuss-later', el?.value || '')
                            }}
                          >
                            Discuss later
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="notice notice-preview" role="status" aria-live="polite">
                        <strong>Decision recorded:</strong> {appr.status.toUpperCase()}
                        {appr.note && (
                          <p className="small" style={{ margin: '.3rem 0 0' }}>
                            <strong>Parent note:</strong> “{appr.note}”
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </section>
              ))
            )}
          </div>
        )}

        {/* Tab 3: Conversation History */}
        {activeTab === 'history' && (
          <div id="tour-parent-history" className="grid">
            <div className="page-heading">
              <div>
                <p className="eyebrow">Audit trail</p>
                <h1>{activeChild ? `${activeChild.name}’s conversation history.` : 'Conversation history.'}</h1>
                <p>Transparent record of learning attempts with safety classification labels. Blocked and approval entries are redacted receipts; protected immediate-risk records stay in Safety alerts.</p>
              </div>
            </div>

            <section className="panel">
              <div className="filter-row" aria-label="Filter history by safety status">
                {(['all', 'allowed', 'approval', 'blocked', 'safe-support'] as const).map((tone) => (
                  <button
                    key={tone}
                    type="button"
                    className={`filter-button ${historyFilter === tone ? 'active' : ''}`}
                    onClick={() => {
                      playTapSound()
                      setHistoryFilter(tone)
                    }}
                  >
                    {tone === 'all' ? 'All records' : SAFETY_META[tone]?.label || tone}
                  </button>
                ))}
              </div>

              <div className="field" style={{ marginBottom: '1rem' }}>
                <input
                  type="search"
                  placeholder="Search history by topic…"
                  value={historySearch}
                  onChange={(e) => setHistorySearch(e.target.value)}
                  aria-label="Search conversation history"
                />
              </div>

              <div className="history-list">
                {childHistory.length === 0 ? (
                  <div className="empty-state-card">
                    <div className="empty-state-icon" aria-hidden="true"><IconDocument size={24} /></div>
                    <h3>No matching conversations</h3>
                    <p>No study conversation receipts match your search or filter for {activeChildLabel}.</p>
                  </div>
                ) : (
                  childHistory.map((item) => {
                    const meta = SAFETY_META[item.state]
                    return (
                      <div key={item.id} className="list-row">
                        <div className="list-copy">
                          <strong>{item.title}</strong>
                          <p>{item.summary}</p>
                          <span className="small">{item.time}</span>
                        </div>
                        <span className={`status-label status-${meta.tone}`}>
                          <span aria-hidden="true" style={{ display: 'inline-flex', alignItems: 'center' }}>
                            {renderSafetyIcon(item.state)}
                          </span>
                          {meta.label}
                        </span>
                      </div>
                    )
                  })
                )}
              </div>
            </section>
          </div>
        )}

        {/* Tab 4: Safety Alerts */}
        {activeTab === 'alerts' && (
          <div id="tour-parent-alerts" className="grid">
            <div className="page-heading">
              <div>
                <p className="eyebrow">Safeguarding boundary</p>
                <h1>Safety alerts.</h1>
                <p>High-risk disclosures follow a protected escalation protocol rather than ordinary chat history.</p>
              </div>
            </div>

            {alerts.filter((alert) => !activeChildId || alert.childId === activeChildId).length > 0 && (
              <section className="panel" aria-labelledby="live-alerts-heading">
                <h2 id="live-alerts-heading">Live family alerts</h2>
                <p className="small">Protected safety receipts from your linked family. Sensitive disclosure text is never shown here.</p>
                <div className="history-list">
                  {alerts.filter((alert) => !activeChildId || alert.childId === activeChildId).map((alert) => (
                    <div className="list-row" key={alert.id}>
                      <div className="list-copy">
                        <strong>{SAFETY_META[alert.state]?.label ?? 'Safety alert'} · {alert.childName}</strong>
                        <p>{alert.contextSummary || 'Protected escalation recorded without disclosure text.'}</p>
                        <span className="small">{alert.time}</span>
                      </div>
                      <span className={`status-label status-${SAFETY_META[alert.state]?.tone ?? 'urgent'}`}>{SAFETY_META[alert.state]?.label ?? 'Protected'}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            <section className="panel protected-card">
              <div className="status-banner status-urgent">
                <span className="status-icon" aria-hidden="true" style={{ display: 'inline-flex', alignItems: 'center' }}>
                  <IconSparkle size={15} />
                </span>
                <div>

                  <strong>Immediate-risk protected alert</strong>
                  <p>Storyboard demonstration · Fictional emergency disclosure</p>
                </div>
              </div>

              <div className="notice" style={{ marginTop: '1.2rem' }}>
                <strong>Child disclosure text is intentionally withheld here.</strong>
                <br />
                In genuine safeguarding emergencies, an alleged abuser or risk factor could be the parent or guardian. SafeAI directs the child immediately to verified emergency and crisis resources (Childline 0800 1111, 999) without broadcasting sensitive statements to family dashboards.
              </div>

              <div className="storyboard" style={{ marginTop: '1rem' }}>
                <div className="storyboard-step">
                  <span className="step-number">1</span>
                  <div>
                    <strong>Immediate real-world action</strong>
                    <p className="small">Check on the young person in the real world or contact school safeguarding leaders.</p>
                  </div>
                </div>
                <div className="storyboard-step">
                  <span className="step-number">2</span>
                  <div>
                    <strong>Specialist crisis escalation</strong>
                    <p className="small">A production platform requires certified human review, not an automated chat loop.</p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* Tab 5: Settings */}
        {activeTab === 'settings' && (
          <div className="grid">
            <div className="page-heading">
              <div>
                <p className="eyebrow">Control centre</p>
                <h1>Family & security settings.</h1>
                <p>Manage child access privileges, API provider keys, and privacy policies.</p>
              </div>
            </div>

            {/* Child Account Management */}
            <section id="tour-parent-accounts" className="panel" aria-labelledby="accounts-heading">
              <h2 id="accounts-heading">Linked child accounts</h2>
              <div className="settings-list">
                {childrenLoading ? <p className="small" role="status">Loading linked child accounts…</p> : children.length === 0 && <p className="small">No child accounts yet. Create the first account below.</p>}
                {children.map((child) => (
                  <div key={child.id} className="setting-row-group">
                    <div className="setting-row">
                      <div className="setting-copy">
                        <strong>{child.name}</strong>
                        <p>
                          {child.schoolYear} · Chat status:{' '}
                          {child.chatPaused ? 'Paused' : 'Active'}
                        </p>
                      </div>
                      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                        <button
                          type="button"
                          className={`button button-sm ${child.chatPaused ? 'button-primary' : 'button-secondary'}`}
                          onClick={() => toggleChildChatPause(child.id)}
                        >
                          {child.chatPaused ? 'Resume chat' : 'Pause chat'}
                        </button>
                        <button
                          type="button"
                          className="button button-sm button-secondary"
                          aria-expanded={passwordChildId === child.id}
                          aria-controls={`child-password-form-${child.id}`}
                          onClick={() => openChildPasswordForm(passwordChildId === child.id ? null : child.id)}
                        >
                          {passwordChildId === child.id ? 'Cancel' : 'Set new password'}
                        </button>
                      </div>
                    </div>
                    {passwordChildId === child.id && (
                      <form id={`child-password-form-${child.id}`} className="auth-form" onSubmit={(event) => void handleSetChildPassword(event, child.id)} style={{ marginTop: '0.75rem' }}>
                        <p className="small">Choose a new password for {child.name}. Their old password stops working. SafeAI passes it only to Supabase Auth and keeps the new password only in this page until you finish sharing it.</p>
                        <div className="field">
                          <label htmlFor={`child-new-password-${child.id}`}>New password</label>
                          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'stretch', flexWrap: 'wrap' }}>
                            <input id={`child-new-password-${child.id}`} style={{ flex: '1 1 16rem' }} type={showChildResetPassword ? 'text' : 'password'} autoComplete="new-password" value={childPasswordForm.password} onChange={(e) => setChildPasswordForm({ ...childPasswordForm, password: e.target.value })} required minLength={PASSWORD_MINIMUM} maxLength={72} />
                            <button type="button" className="button button-secondary button-sm" onClick={() => setShowChildResetPassword((shown) => !shown)} aria-pressed={showChildResetPassword}>
                              {showChildResetPassword ? 'Hide' : 'Show'} password
                            </button>
                          </div>
                        </div>
                        <div className="field">
                          <label htmlFor={`child-confirm-password-${child.id}`}>Confirm new password</label>
                          <input id={`child-confirm-password-${child.id}`} type="password" autoComplete="new-password" value={childPasswordForm.confirm} onChange={(e) => setChildPasswordForm({ ...childPasswordForm, confirm: e.target.value })} required minLength={PASSWORD_MINIMUM} maxLength={72} />
                        </div>
                        <button className="button button-primary" disabled={childPasswordBusy}>
                          {childPasswordBusy ? 'Saving new password…' : 'Save new password'}
                        </button>
                      </form>
                    )}
                    {childPasswordFeedback?.childId === child.id && <p className="notice notice-preview" role="status" aria-live="polite">{childPasswordFeedback.message}</p>}
                  </div>
                ))}
              </div>
              <form className="auth-form" onSubmit={(event) => void handleCreateChild(event)} style={{ marginTop: '1.25rem' }}>
                <h3>Create a child account</h3>
                <p className="small">The child will sign in on the separate child website. SafeAI stores the password only through Supabase Auth; keep the temporary password private.</p>
                <div className="field">
                  <label htmlFor="child-display-name">Child display name</label>
                  <input id="child-display-name" type="text" value={childForm.displayName} onChange={(e) => setChildForm({ ...childForm, displayName: e.target.value })} required maxLength={80} />
                </div>
                <div className="field">
                  <label htmlFor="child-email">Child sign-in email</label>
                  <input id="child-email" type="email" autoComplete="off" value={childForm.email} onChange={(e) => setChildForm({ ...childForm, email: e.target.value })} required />
                </div>
                <div className="field">
                  <label htmlFor="child-password">Temporary password</label>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'stretch', flexWrap: 'wrap' }}>
                    <input id="child-password" style={{ flex: '1 1 16rem' }} type={showChildCreatePassword ? 'text' : 'password'} autoComplete="new-password" minLength={12} value={childForm.password} onChange={(e) => setChildForm({ ...childForm, password: e.target.value })} required />
                    <button type="button" className="button button-secondary button-sm" onClick={() => setShowChildCreatePassword((shown) => !shown)} aria-pressed={showChildCreatePassword}>
                      {showChildCreatePassword ? 'Hide' : 'Show'} password
                    </button>
                  </div>
                </div>
                <div className="field">
                  <label htmlFor="child-school-year">School year</label>
                  <input id="child-school-year" type="text" placeholder="e.g. Year 8" value={childForm.schoolYear} onChange={(e) => setChildForm({ ...childForm, schoolYear: e.target.value })} required maxLength={80} />
                </div>
                <button className="button button-primary" disabled={childAccountBusy}>
                  {childAccountBusy ? 'Creating child account…' : 'Create child account'}
                </button>
                {childAccountFeedback && <p className="notice notice-preview" role="status" aria-live="polite">{childAccountFeedback}</p>}
              </form>
              {temporaryChildCredential && (
                <div className="notice notice-preview" role="status" aria-live="polite" style={{ marginTop: '1rem' }}>
                  <strong>Temporary password — copy it now</strong>
                  <p className="small" style={{ margin: '0.45rem 0' }}>
                    {temporaryChildCredential.kind === 'created' ? `Created account: ${temporaryChildCredential.email}` : `New password for ${temporaryChildCredential.childName}`}. This value is held only in this page and will disappear when you hide this receipt or leave the page.
                  </p>
                  <div className="field" style={{ marginBottom: '0.65rem' }}>
                    <label htmlFor="temporary-child-password">Temporary password</label>
                    <input id="temporary-child-password" type={showTemporaryChildPassword ? 'text' : 'password'} value={temporaryChildCredential.password} readOnly autoComplete="off" />
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <button type="button" className="button button-primary button-sm" onClick={() => void copyTemporaryChildPassword()}>Copy password</button>
                    <button type="button" className="button button-secondary button-sm" onClick={() => setShowTemporaryChildPassword((shown) => !shown)} aria-pressed={showTemporaryChildPassword}>
                      {showTemporaryChildPassword ? 'Hide' : 'Show'} password
                    </button>
                    <button type="button" className="button button-quiet button-sm" onClick={() => { setTemporaryChildCredential(null); setCredentialCopyFeedback(''); setShowTemporaryChildPassword(false); setShowChildCreatePassword(false); setShowChildResetPassword(false) }}>Hide receipt</button>
                  </div>
                  {credentialCopyFeedback && <p className="small" role="status" style={{ marginBottom: 0 }}>{credentialCopyFeedback}</p>}
                </div>
              )}
            </section>

            {/* Family Access Controls */}
            <section id="tour-parent-access" className="panel" aria-labelledby="access-heading">
              <h2 id="access-heading">Access & notification controls</h2>
              <div className="settings-list">
                {activeChild ? (
                  <div className="setting-row">
                    <div className="setting-copy">
                      <strong>Pause chat for {activeChild.name}</strong>
                      <p>Temporarily disables AI chat interaction on their device.</p>
                    </div>
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={activeChild.chatPaused}
                        onChange={() => toggleChildChatPause(activeChild.id)}
                        aria-label={`Pause chat for ${activeChild.name}`}
                      />
                      <span className="switch-track" />
                    </label>
                  </div>
                ) : <p className="small">Create a child account to manage chat access.</p>}

                <div className="setting-row">
                  <div className="setting-copy">
                    <strong>Ordinary activity notifications</strong>
                    <p>Receive updates for routine study chats (recommended: off for privacy).</p>
                  </div>
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={ordinaryNotifications}
                      onChange={(e) => void updateNotificationSetting('ordinary', e.target.checked)}
                      aria-label="Ordinary activity notifications"
                    />
                    <span className="switch-track" />
                  </label>
                </div>

                <div className="setting-row">
                  <div className="setting-copy">
                    <strong>Flagged activity highlights</strong>
                    <p>Highlight sensitive topics that require adult approval.</p>
                  </div>
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={flaggedHighlighted}
                      onChange={(e) => void updateNotificationSetting('flagged', e.target.checked)}
                      aria-label="Flagged activity highlights"
                    />
                    <span className="switch-track" />
                  </label>
                </div>

                <div className="criteria-panel" aria-labelledby="parent-safety-criteria-heading">
                  <h3 id="parent-safety-criteria-heading">Parent safety criteria</h3>
                  <p className="small">Choose additional topics to block for {activeChild?.name ?? 'this child'}. Every prompt still passes through SafeAI’s fixed rulebook first; immediate-risk and built-in blocked rules always take precedence.</p>
                  {activeChild ? (
                    <div className="criteria-list">
                      {PARENT_SAFETY_RULES.map((rule) => (
                        <label className="criteria-option" key={rule.id}>
                          <input
                            type="checkbox"
                            checked={parentBlockedTopics.includes(rule.id)}
                            onChange={(event) => void updateParentSafetyTopic(rule.id, event.target.checked)}
                            aria-label={'Block ' + rule.label + ' for ' + activeChild.name}
                          />
                          <span className="setting-copy">
                            <strong>{rule.label}</strong>
                            <span className="small">{rule.description}</span>
                          </span>
                        </label>
                      ))}
                    </div>
                  ) : <p className="small">Create a linked child account to choose safety criteria.</p>}
                </div>
              </div>
            </section>

            {/* API Provider Settings */}
            <section id="tour-parent-api" className="panel privacy-card" aria-labelledby="api-heading">
              <div className="api-lock-banner">
                <IconLock size={16} />
                <span>
                  <strong>Parent-only security area:</strong> API credentials are encrypted and stored server-side only. Raw secrets are never exposed in browser code.
                </span>
              </div>


              <h2 id="api-heading" style={{ marginTop: '1.2rem' }}>
                AI provider configuration
              </h2>
              <p className="small">
                Save, rotate or remove your family's provider key. This page only ever shows the provider and the last four characters. Test the connection to verify it before allowed child questions use it.
              </p>

              <div className="api-status-card">
                <div className="api-meta-grid">
                  <div className="api-meta-cell">
                    <span className="api-meta-label">Provider</span>
                    <span className="api-meta-val">
                      {apiSettings.isConfigured ? PROVIDER_NAMES[apiSettings.provider] : 'None'}
                    </span>
                  </div>
                  <div className="api-meta-cell">
                    <span className="api-meta-label">Status</span>
                    <span className={`status-label status-${apiSettings.connectionStatus === 'connected' ? 'allowed' : apiSettings.connectionStatus === 'disabled' ? 'blocked' : 'support'}`}>
                      {apiSettings.connectionStatus}
                    </span>
                  </div>
                  <div className="api-meta-cell">
                    <span className="api-meta-label">Active Key</span>
                    <span className="api-masked-code">{apiSettings.maskedEnding}</span>
                  </div>
                  <div className="api-meta-cell">
                    <span className="api-meta-label">Last tested</span>
                    <span className="api-meta-val" style={{ fontSize: '.84rem' }}>{apiSettings.lastTested}</span>
                  </div>
                </div>

                <div className="row-actions" style={{ justifyContent: 'flex-start', marginTop: '.4rem' }}>
                  <button type="button" className="button button-primary button-sm" onClick={handleTestConnection} disabled={apiBusy}>
                    Test connection
                  </button>
                  <button
                    type="button"
                    className="button button-secondary button-sm"
                    onClick={() => setShowRotateKeyInput(!showRotateKeyInput)}
                    disabled={apiBusy}
                  >
                    {showRotateKeyInput ? 'Cancel rotate' : 'Rotate key'}
                  </button>
                  <button
                    type="button"
                    className="button button-secondary button-sm"
                    onClick={handleDisableKey}
                    disabled={apiBusy || apiSettings.connectionStatus !== 'connected'}
                  >
                    Disable
                  </button>
                  <button
                    type="button"
                    className="button button-danger button-sm"
                    onClick={() => void handleRemoveKey()}
                    disabled={apiBusy || !apiSettings.isConfigured}
                  >
                    Remove
                  </button>
                </div>
              </div>

              {showRotateKeyInput && (
                <form className="auth-form" onSubmit={(e) => void handleSaveRotatedKey(e)} style={{ marginTop: '1rem' }}>
                  <div className="field">
                    <label htmlFor="rotate-provider">Provider</label>
                    <select id="rotate-provider" value={providerDraft} onChange={(e) => setProviderDraft(e.target.value as Provider)}>
                      <option value="anthropic">Anthropic</option>
                      <option value="openai">OpenAI</option>
                      <option value="google">Google</option>
                    </select>
                  </div>
                  <div className="field">
                    <label htmlFor="rotate-key-input">New provider API key (hidden as you type)</label>
                    <input
                      id="rotate-key-input"
                      type="password"
                      autoComplete="new-password"
                      placeholder={supabaseConfigured ? 'Sent once to the server, then encrypted' : 'Preview: the key is discarded, never sent'}
                      spellCheck={false}
                      value={newKeyDraft}
                      onChange={(e) => setNewKeyDraft(e.target.value)}
                      required
                    />
                  </div>
                  <button className="button button-primary button-sm" disabled={apiBusy || !newKeyDraft.trim()}>
                    {apiBusy ? 'Saving…' : 'Save key'}
                  </button>
                </form>
              )}

              {apiFeedback && (
                <p className="notice notice-preview" role="status" aria-live="polite" style={{ marginTop: '1rem', marginBottom: 0 }}>
                  {apiFeedback}
                </p>
              )}
            </section>

            {/* Privacy & Retention */}
            <section id="tour-parent-privacy" className="panel" aria-labelledby="privacy-heading">
              <h2 id="privacy-heading">Privacy, data & retention</h2>
              <p className="small">
                SafeAI operates on strict data minimisation: we do not collect real addresses, dates of birth, payment info, or personal photographs. You have the right to request deletion of all recorded learning receipts.
              </p>
              <button
                type="button"
                className="button button-secondary button-sm"
                onClick={() => {
                  playTapSound()
                  setPrivacyFeedback('Type the confirmation phrase below to delete this family’s application records. This cannot be undone.')
                }}
              >
                Request family data deletion
              </button>
              {privacyFeedback.includes('Type the confirmation') && (
                <div className="auth-form" style={{ marginTop: '.9rem' }}>
                  <div className="field">
                    <label htmlFor="delete-family-confirmation">Type DELETE MY FAMILY DATA to continue</label>
                    <input id="delete-family-confirmation" value={deleteConfirmation} onChange={(event) => setDeleteConfirmation(event.target.value)} autoComplete="off" />
                  </div>
                  <button type="button" className="button button-danger button-sm" disabled={deleteBusy || deleteConfirmation !== 'DELETE MY FAMILY DATA'} onClick={() => void handleFamilyDeletion()}>
                    {deleteBusy ? 'Deleting…' : 'Delete family records'}
                  </button>
                </div>
              )}
              {privacyFeedback && (
                <p className="notice notice-preview" role="status" aria-live="polite" style={{ marginTop: '0.85rem', marginBottom: 0 }}>
                  {privacyFeedback}
                </p>
              )}
            </section>

            {/* Guided Walkthrough Restart */}
            <section className="panel">
              <h2>Parent walkthrough guide</h2>
              <p className="small">Review the controls and features available in the parent space.</p>
              <button type="button" className="button button-secondary" onClick={restartTour}>
                Restart parent walkthrough
              </button>
            </section>

            <section className="panel" aria-labelledby="parent-reset-heading">
              <h2 id="parent-reset-heading">Reset demo</h2>
              <p className="small">
                Clears only temporary preview decisions, filters and local control changes. It does not delete accounts, child records or a stored provider key.
              </p>
              <button type="button" className="button button-secondary" onClick={resetDemo}>
                Reset demo
              </button>
            </section>
          </div>
        )}
      </main>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="mobile-bottom-nav" aria-label="Parent main navigation">
        <button
          type="button"
          className={`nav-tab-item ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => switchTab('overview')}
          aria-current={activeTab === 'overview' ? 'page' : undefined}
        >
          <span className="nav-tab-icon"><IconHome size={18} /></span>
          <span>Overview</span>
        </button>
        <button
          type="button"
          className={`nav-tab-item ${activeTab === 'approvals' ? 'active' : ''}`}
          onClick={() => switchTab('approvals')}
          aria-current={activeTab === 'approvals' ? 'page' : undefined}
        >
          <span className="nav-tab-icon"><IconApprovals size={18} /></span>
          <span>Approvals</span>
          {pendingApprovalsCount > 0 && <span className="nav-tab-badge">{pendingApprovalsCount}</span>}
        </button>
        <button
          type="button"
          className={`nav-tab-item ${activeTab === 'history' ? 'active' : ''}`}
          onClick={() => switchTab('history')}
          aria-current={activeTab === 'history' ? 'page' : undefined}
        >
          <span className="nav-tab-icon"><IconClock size={18} /></span>
          <span>History</span>
        </button>
        <button
          type="button"
          className={`nav-tab-item ${activeTab === 'alerts' ? 'active' : ''}`}
          onClick={() => switchTab('alerts')}
          aria-current={activeTab === 'alerts' ? 'page' : undefined}
        >
          <span className="nav-tab-icon"><IconBellAlert size={18} /></span>
          <span>Alerts</span>
        </button>
        <button
          type="button"
          className={`nav-tab-item ${activeTab === 'settings' ? 'active' : ''}`}
          onClick={() => switchTab('settings')}
          aria-current={activeTab === 'settings' ? 'page' : undefined}
        >
          <span className="nav-tab-icon"><IconSliders size={18} /></span>
          <span>Settings</span>
        </button>
      </nav>


      {/* Footer Disclaimer */}
      <footer className="footer-note">
        {supabaseConfigured ? 'Signed in · Live family records' : 'Account sign-in required'} · Parent oversight · Provider use is parent-controlled
      </footer>
    </div>
  )
}
