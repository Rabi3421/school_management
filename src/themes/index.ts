// ─── School Theme System ──────────────────────────────────────────────────────
// 10 distinct themes, each with full color palette, typography, and layout meta

export type ThemeId =
  | 'aurora'
  | 'emerald'
  | 'royal'
  | 'crimson'
  | 'slate'
  | 'sunrise'
  | 'violet'
  | 'teal'
  | 'terracotta'
  | 'midnight';

export interface ThemeConfig {
  id: ThemeId;
  name: string;
  tagline: string;
  // Hero section style
  heroStyle: 'gradient' | 'image-overlay' | 'split' | 'minimal' | 'geometric';
  // CSS variables injected at runtime
  vars: {
    '--theme-primary': string;
    '--theme-primary-light': string;
    '--theme-primary-dark': string;
    '--theme-secondary': string;
    '--theme-accent': string;
    '--theme-bg': string;
    '--theme-bg-alt': string;
    '--theme-text': string;
    '--theme-text-light': string;
    '--theme-text-muted': string;
    '--theme-border': string;
    '--theme-hero-from': string;
    '--theme-hero-to': string;
    '--theme-hero-text': string;
    '--theme-font-display': string;
    '--theme-font-body': string;
    '--theme-radius': string;
    '--theme-shadow': string;
  };
  // Tailwind classes used in preview card
  preview: {
    gradient: string;      // bg-gradient-to-br ...
    badge: string;         // badge bg
    badgeText: string;     // badge text
    accent: string;        // accent dot or stripe
    heroText: string;
    cardBg: string;
  };
}

export const THEMES: ThemeConfig[] = [
  // ── 1. Aurora ────────────────────────────────────────────────────────────────
  {
    id: 'aurora',
    name: 'Aurora',
    tagline: 'Modern & Prestigious',
    heroStyle: 'gradient',
    vars: {
      '--theme-primary': '#6366f1',
      '--theme-primary-light': '#a5b4fc',
      '--theme-primary-dark': '#4338ca',
      '--theme-secondary': '#06b6d4',
      '--theme-accent': '#f59e0b',
      '--theme-bg': '#f8f9ff',
      '--theme-bg-alt': '#eef0ff',
      '--theme-text': '#1e1b4b',
      '--theme-text-light': '#ffffff',
      '--theme-text-muted': '#6b7280',
      '--theme-border': '#e0e7ff',
      '--theme-hero-from': '#312e81',
      '--theme-hero-to': '#0891b2',
      '--theme-hero-text': '#ffffff',
      '--theme-font-display': "'Playfair Display', Georgia, serif",
      '--theme-font-body': "'Inter', system-ui, sans-serif",
      '--theme-radius': '0.875rem',
      '--theme-shadow': '0 4px 24px rgba(99,102,241,0.12)',
    },
    preview: {
      gradient: 'from-indigo-700 via-indigo-500 to-cyan-500',
      badge: 'bg-indigo-100',
      badgeText: 'text-indigo-700',
      accent: 'bg-amber-400',
      heroText: 'text-white',
      cardBg: 'bg-indigo-50',
    },
  },

  // ── 2. Emerald ───────────────────────────────────────────────────────────────
  {
    id: 'emerald',
    name: 'Emerald',
    tagline: 'Fresh & Nature-Inspired',
    heroStyle: 'split',
    vars: {
      '--theme-primary': '#059669',
      '--theme-primary-light': '#6ee7b7',
      '--theme-primary-dark': '#065f46',
      '--theme-secondary': '#0d9488',
      '--theme-accent': '#f59e0b',
      '--theme-bg': '#f0fdf4',
      '--theme-bg-alt': '#dcfce7',
      '--theme-text': '#064e3b',
      '--theme-text-light': '#ffffff',
      '--theme-text-muted': '#6b7280',
      '--theme-border': '#bbf7d0',
      '--theme-hero-from': '#065f46',
      '--theme-hero-to': '#0d9488',
      '--theme-hero-text': '#ffffff',
      '--theme-font-display': "'Nunito', 'DM Sans', sans-serif",
      '--theme-font-body': "'Inter', system-ui, sans-serif",
      '--theme-radius': '1rem',
      '--theme-shadow': '0 4px 24px rgba(5,150,105,0.12)',
    },
    preview: {
      gradient: 'from-emerald-700 via-emerald-500 to-teal-400',
      badge: 'bg-emerald-100',
      badgeText: 'text-emerald-700',
      accent: 'bg-amber-400',
      heroText: 'text-white',
      cardBg: 'bg-emerald-50',
    },
  },

  // ── 3. Royal ─────────────────────────────────────────────────────────────────
  {
    id: 'royal',
    name: 'Royal',
    tagline: 'Classic & Heritage',
    heroStyle: 'image-overlay',
    vars: {
      '--theme-primary': '#1e3a8a',
      '--theme-primary-light': '#93c5fd',
      '--theme-primary-dark': '#1e2f6b',
      '--theme-secondary': '#854d0e',
      '--theme-accent': '#d97706',
      '--theme-bg': '#fafaf5',
      '--theme-bg-alt': '#f5f3e8',
      '--theme-text': '#111827',
      '--theme-text-light': '#fef3c7',
      '--theme-text-muted': '#6b7280',
      '--theme-border': '#dde0ee',
      '--theme-hero-from': '#1e2a5e',
      '--theme-hero-to': '#1e3a8a',
      '--theme-hero-text': '#fef3c7',
      '--theme-font-display': "'Playfair Display', 'Times New Roman', serif",
      '--theme-font-body': "'Lato', 'Georgia', serif",
      '--theme-radius': '0.5rem',
      '--theme-shadow': '0 4px 24px rgba(30,58,138,0.15)',
    },
    preview: {
      gradient: 'from-blue-900 via-blue-800 to-blue-700',
      badge: 'bg-amber-100',
      badgeText: 'text-amber-800',
      accent: 'bg-amber-500',
      heroText: 'text-amber-100',
      cardBg: 'bg-blue-50',
    },
  },

  // ── 4. Crimson ───────────────────────────────────────────────────────────────
  {
    id: 'crimson',
    name: 'Crimson',
    tagline: 'Bold & Energetic',
    heroStyle: 'geometric',
    vars: {
      '--theme-primary': '#dc2626',
      '--theme-primary-light': '#fca5a5',
      '--theme-primary-dark': '#991b1b',
      '--theme-secondary': '#ea580c',
      '--theme-accent': '#fbbf24',
      '--theme-bg': '#fff5f5',
      '--theme-bg-alt': '#fee2e2',
      '--theme-text': '#1c0a0a',
      '--theme-text-light': '#ffffff',
      '--theme-text-muted': '#6b7280',
      '--theme-border': '#fecaca',
      '--theme-hero-from': '#7f1d1d',
      '--theme-hero-to': '#dc2626',
      '--theme-hero-text': '#ffffff',
      '--theme-font-display': "'Bebas Neue', 'Anton', sans-serif",
      '--theme-font-body': "'Inter', system-ui, sans-serif",
      '--theme-radius': '0.75rem',
      '--theme-shadow': '0 4px 24px rgba(220,38,38,0.15)',
    },
    preview: {
      gradient: 'from-red-800 via-red-600 to-orange-500',
      badge: 'bg-red-100',
      badgeText: 'text-red-700',
      accent: 'bg-yellow-400',
      heroText: 'text-white',
      cardBg: 'bg-red-50',
    },
  },

  // ── 5. Slate ─────────────────────────────────────────────────────────────────
  {
    id: 'slate',
    name: 'Slate',
    tagline: 'Minimal & Tech-Forward',
    heroStyle: 'minimal',
    vars: {
      '--theme-primary': '#0ea5e9',
      '--theme-primary-light': '#7dd3fc',
      '--theme-primary-dark': '#0284c7',
      '--theme-secondary': '#64748b',
      '--theme-accent': '#06b6d4',
      '--theme-bg': '#f8fafc',
      '--theme-bg-alt': '#f1f5f9',
      '--theme-text': '#0f172a',
      '--theme-text-light': '#f8fafc',
      '--theme-text-muted': '#64748b',
      '--theme-border': '#e2e8f0',
      '--theme-hero-from': '#0f172a',
      '--theme-hero-to': '#1e293b',
      '--theme-hero-text': '#f8fafc',
      '--theme-font-display': "'DM Sans', 'Space Grotesk', sans-serif",
      '--theme-font-body': "'Inter', system-ui, sans-serif",
      '--theme-radius': '0.625rem',
      '--theme-shadow': '0 4px 24px rgba(15,23,42,0.10)',
    },
    preview: {
      gradient: 'from-slate-900 via-slate-700 to-sky-600',
      badge: 'bg-sky-100',
      badgeText: 'text-sky-700',
      accent: 'bg-cyan-400',
      heroText: 'text-slate-100',
      cardBg: 'bg-slate-100',
    },
  },

  // ── 6. Sunrise ───────────────────────────────────────────────────────────────
  {
    id: 'sunrise',
    name: 'Sunrise',
    tagline: 'Warm & Welcoming',
    heroStyle: 'split',
    vars: {
      '--theme-primary': '#f97316',
      '--theme-primary-light': '#fdba74',
      '--theme-primary-dark': '#c2410c',
      '--theme-secondary': '#eab308',
      '--theme-accent': '#ef4444',
      '--theme-bg': '#fffbeb',
      '--theme-bg-alt': '#fef3c7',
      '--theme-text': '#431407',
      '--theme-text-light': '#ffffff',
      '--theme-text-muted': '#92400e',
      '--theme-border': '#fed7aa',
      '--theme-hero-from': '#c2410c',
      '--theme-hero-to': '#f59e0b',
      '--theme-hero-text': '#ffffff',
      '--theme-font-display': "'Nunito', 'Quicksand', sans-serif",
      '--theme-font-body': "'Poppins', system-ui, sans-serif",
      '--theme-radius': '1.25rem',
      '--theme-shadow': '0 4px 24px rgba(249,115,22,0.15)',
    },
    preview: {
      gradient: 'from-orange-600 via-orange-400 to-yellow-400',
      badge: 'bg-orange-100',
      badgeText: 'text-orange-700',
      accent: 'bg-red-400',
      heroText: 'text-white',
      cardBg: 'bg-orange-50',
    },
  },

  // ── 7. Violet ────────────────────────────────────────────────────────────────
  {
    id: 'violet',
    name: 'Violet',
    tagline: 'Creative & Vibrant',
    heroStyle: 'gradient',
    vars: {
      '--theme-primary': '#7c3aed',
      '--theme-primary-light': '#c4b5fd',
      '--theme-primary-dark': '#5b21b6',
      '--theme-secondary': '#db2777',
      '--theme-accent': '#f59e0b',
      '--theme-bg': '#faf5ff',
      '--theme-bg-alt': '#ede9fe',
      '--theme-text': '#2e1065',
      '--theme-text-light': '#ffffff',
      '--theme-text-muted': '#6b7280',
      '--theme-border': '#ddd6fe',
      '--theme-hero-from': '#4c1d95',
      '--theme-hero-to': '#be185d',
      '--theme-hero-text': '#ffffff',
      '--theme-font-display': "'Poppins', 'Raleway', sans-serif",
      '--theme-font-body': "'Inter', system-ui, sans-serif",
      '--theme-radius': '1rem',
      '--theme-shadow': '0 4px 24px rgba(124,58,237,0.15)',
    },
    preview: {
      gradient: 'from-violet-800 via-purple-600 to-pink-500',
      badge: 'bg-violet-100',
      badgeText: 'text-violet-700',
      accent: 'bg-amber-400',
      heroText: 'text-white',
      cardBg: 'bg-violet-50',
    },
  },

  // ── 8. Teal ──────────────────────────────────────────────────────────────────
  {
    id: 'teal',
    name: 'Teal',
    tagline: 'Fresh Modern Liberal',
    heroStyle: 'minimal',
    vars: {
      '--theme-primary': '#0d9488',
      '--theme-primary-light': '#5eead4',
      '--theme-primary-dark': '#0f766e',
      '--theme-secondary': '#0891b2',
      '--theme-accent': '#84cc16',
      '--theme-bg': '#f0fdfa',
      '--theme-bg-alt': '#ccfbf1',
      '--theme-text': '#042f2e',
      '--theme-text-light': '#f0fdfa',
      '--theme-text-muted': '#6b7280',
      '--theme-border': '#99f6e4',
      '--theme-hero-from': '#134e4a',
      '--theme-hero-to': '#0e7490',
      '--theme-hero-text': '#f0fdfa',
      '--theme-font-display': "'DM Sans', 'Plus Jakarta Sans', sans-serif",
      '--theme-font-body': "'Inter', system-ui, sans-serif",
      '--theme-radius': '0.875rem',
      '--theme-shadow': '0 4px 24px rgba(13,148,136,0.12)',
    },
    preview: {
      gradient: 'from-teal-800 via-teal-600 to-cyan-500',
      badge: 'bg-teal-100',
      badgeText: 'text-teal-700',
      accent: 'bg-lime-400',
      heroText: 'text-teal-50',
      cardBg: 'bg-teal-50',
    },
  },

  // ── 9. Terracotta ────────────────────────────────────────────────────────────
  {
    id: 'terracotta',
    name: 'Terracotta',
    tagline: 'Earthy & Cultural',
    heroStyle: 'image-overlay',
    vars: {
      '--theme-primary': '#b45309',
      '--theme-primary-light': '#fcd34d',
      '--theme-primary-dark': '#78350f',
      '--theme-secondary': '#b91c1c',
      '--theme-accent': '#16a34a',
      '--theme-bg': '#fdf8f0',
      '--theme-bg-alt': '#fef3e2',
      '--theme-text': '#292524',
      '--theme-text-light': '#fef3c7',
      '--theme-text-muted': '#78716c',
      '--theme-border': '#e7d5c0',
      '--theme-hero-from': '#78350f',
      '--theme-hero-to': '#b45309',
      '--theme-hero-text': '#fef3c7',
      '--theme-font-display': "'Merriweather', 'Lora', serif",
      '--theme-font-body': "'Source Sans Pro', system-ui, sans-serif",
      '--theme-radius': '0.75rem',
      '--theme-shadow': '0 4px 24px rgba(180,83,9,0.12)',
    },
    preview: {
      gradient: 'from-amber-900 via-orange-700 to-yellow-600',
      badge: 'bg-amber-100',
      badgeText: 'text-amber-900',
      accent: 'bg-green-500',
      heroText: 'text-amber-100',
      cardBg: 'bg-amber-50',
    },
  },

  // ── 10. Midnight ─────────────────────────────────────────────────────────────
  {
    id: 'midnight',
    name: 'Midnight',
    tagline: 'Sleek & Premium',
    heroStyle: 'geometric',
    vars: {
      '--theme-primary': '#d4af37',
      '--theme-primary-light': '#fde68a',
      '--theme-primary-dark': '#a87d0c',
      '--theme-secondary': '#9ca3af',
      '--theme-accent': '#f8fafc',
      '--theme-bg': '#0a0a0f',
      '--theme-bg-alt': '#111118',
      '--theme-text': '#f8fafc',
      '--theme-text-light': '#f8fafc',
      '--theme-text-muted': '#9ca3af',
      '--theme-border': '#1e1e2e',
      '--theme-hero-from': '#050508',
      '--theme-hero-to': '#0d0d18',
      '--theme-hero-text': '#f8fafc',
      '--theme-font-display': "'Cinzel', 'Cormorant Garamond', serif",
      '--theme-font-body': "'Inter', system-ui, sans-serif",
      '--theme-radius': '0.5rem',
      '--theme-shadow': '0 4px 24px rgba(212,175,55,0.12)',
    },
    preview: {
      gradient: 'from-gray-950 via-gray-900 to-zinc-800',
      badge: 'bg-yellow-900/60',
      badgeText: 'text-yellow-400',
      accent: 'bg-yellow-500',
      heroText: 'text-yellow-200',
      cardBg: 'bg-zinc-900',
    },
  },
];

export const THEME_MAP: Record<ThemeId, ThemeConfig> = Object.fromEntries(
  THEMES.map((t) => [t.id, t])
) as Record<ThemeId, ThemeConfig>;

export function getTheme(id: ThemeId | string | undefined): ThemeConfig {
  return THEME_MAP[(id as ThemeId) ?? 'aurora'] ?? THEMES[0];
}

/** Inject theme CSS variables into the document root */
export function applyTheme(themeId: ThemeId | string | undefined) {
  const theme = getTheme(themeId);
  const root = document.documentElement;
  Object.entries(theme.vars).forEach(([key, val]) => {
    root.style.setProperty(key, val);
  });
}

/** Remove all theme CSS variables */
export function clearTheme() {
  const root = document.documentElement;
  const sampleTheme = THEMES[0];
  Object.keys(sampleTheme.vars).forEach((key) => {
    root.style.removeProperty(key);
  });
}
