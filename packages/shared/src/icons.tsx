import React from 'react'

export interface IconProps {
  size?: number | string
  className?: string
  style?: React.CSSProperties
}

const defaultProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
}

export function IconChat({ size = 18, className, style }: IconProps) {
  return (
    <svg width={size} height={size} {...defaultProps} className={className} style={style}>
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  )
}

export function IconBook({ size = 18, className, style }: IconProps) {
  return (
    <svg width={size} height={size} {...defaultProps} className={className} style={style}>
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
      <path d="M6 6h10" />
      <path d="M6 10h10" />
    </svg>
  )
}

export function IconClock({ size = 18, className, style }: IconProps) {
  return (
    <svg width={size} height={size} {...defaultProps} className={className} style={style}>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}

export function IconShield({ size = 18, className, style }: IconProps) {
  return (
    <svg width={size} height={size} {...defaultProps} className={className} style={style}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  )
}

export function IconHome({ size = 18, className, style }: IconProps) {
  return (
    <svg width={size} height={size} {...defaultProps} className={className} style={style}>
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  )
}

export function IconApprovals({ size = 18, className, style }: IconProps) {
  return (
    <svg width={size} height={size} {...defaultProps} className={className} style={style}>
      <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <path d="m9 14 2 2 4-4" />
    </svg>
  )
}

export function IconBellAlert({ size = 18, className, style }: IconProps) {
  return (
    <svg width={size} height={size} {...defaultProps} className={className} style={style}>
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
      <circle cx="18" cy="4" r="2.5" fill="#f43f5e" stroke="#f43f5e" />
    </svg>
  )
}

export function IconSliders({ size = 18, className, style }: IconProps) {
  return (
    <svg width={size} height={size} {...defaultProps} className={className} style={style}>
      <line x1="4" x2="4" y1="21" y2="14" />
      <line x1="4" x2="4" y1="10" y2="3" />
      <line x1="12" x2="12" y1="21" y2="12" />
      <line x1="12" x2="12" y1="8" y2="3" />
      <line x1="20" x2="20" y1="21" y2="16" />
      <line x1="20" x2="20" y1="12" y2="3" />
      <line x1="1" x2="7" y1="14" y2="14" />
      <line x1="9" x2="15" y1="8" y2="8" />
      <line x1="17" x2="23" y1="16" y2="16" />
    </svg>
  )
}

export function IconLock({ size = 18, className, style }: IconProps) {
  return (
    <svg width={size} height={size} {...defaultProps} className={className} style={style}>
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  )
}

export function IconSoundOn({ size = 18, className, style }: IconProps) {
  return (
    <svg width={size} height={size} {...defaultProps} className={className} style={style}>
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
    </svg>
  )
}

export function IconSoundOff({ size = 18, className, style }: IconProps) {
  return (
    <svg width={size} height={size} {...defaultProps} className={className} style={style}>
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <line x1="22" x2="16" y1="9" y2="15" />
      <line x1="16" x2="22" y1="9" y2="15" />
    </svg>
  )
}

export function IconSend({ size = 18, className, style }: IconProps) {
  return (
    <svg width={size} height={size} {...defaultProps} className={className} style={style}>
      <line x1="22" x2="11" y1="2" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  )
}

export function IconX({ size = 18, className, style }: IconProps) {
  return (
    <svg width={size} height={size} {...defaultProps} className={className} style={style}>
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}

export function IconCheck({ size = 18, className, style }: IconProps) {
  return (
    <svg width={size} height={size} {...defaultProps} className={className} style={style}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

export function IconSparkle({ size = 18, className, style }: IconProps) {
  return (
    <svg width={size} height={size} {...defaultProps} className={className} style={style}>
      <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z" />
    </svg>
  )
}

export function IconHeart({ size = 18, className, style }: IconProps) {
  return (
    <svg width={size} height={size} {...defaultProps} className={className} style={style}>
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  )
}

export function IconArrowUpRight({ size = 18, className, style }: IconProps) {
  return (
    <svg width={size} height={size} {...defaultProps} className={className} style={style}>
      <line x1="7" x2="17" y1="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  )
}

export function IconAlertTriangle({ size = 18, className, style }: IconProps) {
  return (
    <svg width={size} height={size} {...defaultProps} className={className} style={style}>
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
      <line x1="12" x2="12" y1="9" y2="13" />
      <line x1="12" x2="12.01" y1="17" y2="17" />
    </svg>
  )
}

export function IconDocument({ size = 18, className, style }: IconProps) {
  return (
    <svg width={size} height={size} {...defaultProps} className={className} style={style}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" x2="8" y1="13" y2="13" />
      <line x1="16" x2="8" y1="17" y2="17" />
    </svg>
  )
}

export function IconChevronRight({ size = 18, className, style }: IconProps) {
  return (
    <svg width={size} height={size} {...defaultProps} className={className} style={style}>
      <polyline points="9 18 15 12 9 6" />
    </svg>
  )
}

export function IconChevronLeft({ size = 18, className, style }: IconProps) {
  return (
    <svg width={size} height={size} {...defaultProps} className={className} style={style}>
      <polyline points="15 18 9 12 15 6" />
    </svg>
  )
}

export function IconUser({ size = 18, className, style }: IconProps) {
  return (
    <svg width={size} height={size} {...defaultProps} className={className} style={style}>
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}

export function IconRefresh({ size = 18, className, style }: IconProps) {
  return (
    <svg width={size} height={size} {...defaultProps} className={className} style={style}>
      <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
      <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
      <path d="M16 16h5v5" />
    </svg>
  )
}

export function IconTrash({ size = 18, className, style }: IconProps) {
  return (
    <svg width={size} height={size} {...defaultProps} className={className} style={style}>
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
  )
}

export function IconInfo({ size = 18, className, style }: IconProps) {
  return (
    <svg width={size} height={size} {...defaultProps} className={className} style={style}>
      <circle cx="12" cy="12" r="10" />
      <line x1="12" x2="12" y1="16" y2="12" />
      <line x1="12" x2="12.01" y1="8" y2="8" />
    </svg>
  )
}

export function IconRocket({ size = 18, className, style }: IconProps) {
  return (
    <svg width={size} height={size} {...defaultProps} className={className} style={style}>
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  )
}

export function IconStar({ size = 18, className, style }: IconProps) {
  return (
    <svg width={size} height={size} {...defaultProps} className={className} style={style}>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}

export function IconBulb({ size = 18, className, style }: IconProps) {
  return (
    <svg width={size} height={size} {...defaultProps} className={className} style={style}>
      <path d="M9 18h6" />
      <path d="M10 22h4" />
      <path d="M12 2a7 7 0 0 0-7 7c0 2.38 1.19 4.47 3 5.74V17a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-2.26c1.81-1.27 3-3.36 3-5.74a7 7 0 0 0-7-7z" />
    </svg>
  )
}

export function IconCompass({ size = 18, className, style }: IconProps) {
  return (
    <svg width={size} height={size} {...defaultProps} className={className} style={style}>
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  )
}
