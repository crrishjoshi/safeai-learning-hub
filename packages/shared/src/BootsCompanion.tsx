import type { CSSProperties } from 'react'

export function BootsCompanion({
  label = 'Boots, your learning companion',
  compact = false,
}: {
  label?: string
  compact?: boolean
}) {
  const scale = compact ? '0.36' : '1'
  const style = { '--boots-scale': scale } as CSSProperties

  return (
    <div
      className={`boots ${compact ? 'boots-compact' : 'boots-full'}`}
      style={style}
      role="img"
      aria-label={label}
    >
      <svg
        viewBox="0 0 120 128"
        className="boots-svg"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="boots-body-grad" x1="20" y1="20" x2="100" y2="108" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#c084fc" />
            <stop offset="45%" stopColor="#818cf8" />
            <stop offset="100%" stopColor="#4f46e5" />
          </linearGradient>
          <linearGradient id="boots-sheen" x1="60" y1="24" x2="60" y2="52" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="boots-beacon-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="boot-grad-l" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fb7185" />
            <stop offset="100%" stopColor="#e11d48" />
          </linearGradient>
          <linearGradient id="boot-grad-r" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fb7185" />
            <stop offset="100%" stopColor="#e11d48" />
          </linearGradient>
        </defs>

        {/* Ambient ground shadow (full mode only) */}
        {!compact && (
          <ellipse cx="60" cy="122" rx="34" ry="4.5" fill="#000000" fillOpacity="0.45" />
        )}

        {/* Floating companion group */}
        <g className="boots-float-wrap">
          {/* Cute Boots (feet) with collars and sneaker soles */}
          <g className="boot boot-left">
            <rect x="25" y="93" width="22" height="7" rx="3.5" fill="#fda4af" />
            <path
              d="M26 98 C26 98 25 106 18 109 C16 110 16 114 20 114 L44 114 C47 114 47 108 46 98 Z"
              fill="url(#boot-grad-l)"
            />
            <rect x="17" y="113" width="30" height="4" rx="2" fill="#ffffff" />
            <rect x="17" y="115.5" width="30" height="1.5" rx="0.5" fill="#94a3b8" />
            <ellipse cx="23" cy="111" rx="4" ry="2" fill="#ffffff" fillOpacity="0.3" />
          </g>

          <g className="boot boot-right">
            <rect x="73" y="93" width="22" height="7" rx="3.5" fill="#fda4af" />
            <path
              d="M74 98 C73 108 73 114 76 114 L100 114 C104 114 104 110 102 109 C95 106 94 98 94 98 Z"
              fill="url(#boot-grad-r)"
            />
            <rect x="73" y="113" width="30" height="4" rx="2" fill="#ffffff" />
            <rect x="73" y="115.5" width="30" height="1.5" rx="0.5" fill="#94a3b8" />
            <ellipse cx="97" cy="111" rx="4" ry="2" fill="#ffffff" fillOpacity="0.3" />
          </g>

          {/* Cute Blob Body */}
          <g className="boots-body">
            {/* Antenna beacon */}
            <line x1="60" y1="16" x2="60" y2="25" stroke="#818cf8" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="60" cy="13" r="7" fill="url(#boots-beacon-glow)" opacity="0.65" />
            <circle cx="60" cy="13" r="4" fill="#38bdf8" />
            <circle cx="58.5" cy="11.5" r="1.5" fill="#ffffff" />

            {/* Organic rounded body */}
            <path
              d="M60 24 C86 24 102 42 102 68 C102 92 86 102 60 102 C34 102 18 92 18 68 C18 42 34 24 60 24 Z"
              fill="url(#boots-body-grad)"
              stroke="rgba(255, 255, 255, 0.22)"
              strokeWidth="1.2"
            />

            {/* 3D Top Sheen */}
            <ellipse cx="60" cy="38" rx="28" ry="11" fill="url(#boots-sheen)" />

            {/* Cheerful Blushing Cheeks */}
            <ellipse cx="38" cy="71" rx="6.5" ry="4" fill="#fb7185" fillOpacity="0.45" />
            <ellipse cx="82" cy="71" rx="6.5" ry="4" fill="#fb7185" fillOpacity="0.45" />

            {/* Alive Eyes with Specular Highlights */}
            <g className="boots-eye boots-eye-left">
              <ellipse cx="45" cy="59" rx="6" ry="7" fill="#0f172a" />
              <circle cx="43" cy="56.5" r="2.4" fill="#ffffff" />
              <circle cx="47" cy="61.5" r="1.1" fill="#ffffff" fillOpacity="0.85" />
            </g>

            <g className="boots-eye boots-eye-right">
              <ellipse cx="75" cy="59" rx="6" ry="7" fill="#0f172a" />
              <circle cx="73" cy="56.5" r="2.4" fill="#ffffff" />
              <circle cx="77" cy="61.5" r="1.1" fill="#ffffff" fillOpacity="0.85" />
            </g>

            {/* Friendly Warm Smile */}
            <path
              d="M53 69 Q60 76 67 69"
              fill="none"
              stroke="#0f172a"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </g>
        </g>
      </svg>
    </div>
  )
}
