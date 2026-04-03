'use client';

import React from 'react';
import { THEMES, ThemeId } from '@/themes';
import Icon from '@/components/ui/AppIcon';

interface ThemePickerProps {
  schoolName: string;
  currentTheme: ThemeId | undefined;
  onSelect: (themeId: ThemeId) => void;
  onClose: () => void;
}

const HERO_STYLE_ICON: Record<string, string> = {
  gradient: 'Layers',
  'image-overlay': 'ImageIcon',
  split: 'LayoutTemplate',
  minimal: 'Minus',
  geometric: 'Hexagon',
};

export default function ThemePicker({ schoolName, currentTheme, onSelect, onClose }: ThemePickerProps) {
  const [hovered, setHovered] = React.useState<ThemeId | null>(null);
  const [selected, setSelected] = React.useState<ThemeId>(currentTheme ?? 'aurora');

  const handleApply = () => {
    onSelect(selected);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-foreground/40 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-white w-full sm:max-w-4xl rounded-t-3xl sm:rounded-2xl border border-border/60 shadow-card max-h-[92vh] flex flex-col">

        {/* ── Header ── */}
        <div className="sticky top-0 bg-white flex items-start justify-between px-6 pt-5 pb-4 border-b border-border/40 rounded-t-3xl sm:rounded-t-2xl flex-shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-rose-50 flex items-center justify-center">
                <Icon name="Palette" size={16} className="text-rose-500" />
              </div>
              <h3 className="font-display text-base font-800 text-foreground">Choose Website Theme</h3>
            </div>
            <p className="text-xs text-muted mt-1 ml-10">
              Selecting a theme for <strong className="text-foreground">{schoolName}</strong> — this will style their public website
            </p>
          </div>
          <button onClick={onClose} className="text-muted hover:text-foreground p-1 flex-shrink-0 mt-0.5">
            <Icon name="X" size={16} />
          </button>
        </div>

        {/* ── Theme Grid ── */}
        <div className="flex-1 overflow-y-auto p-5">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {THEMES.map((theme) => {
              const isSelected = selected === theme.id;
              const isHovered = hovered === theme.id;

              return (
                <button
                  key={theme.id}
                  onClick={() => setSelected(theme.id)}
                  onMouseEnter={() => setHovered(theme.id)}
                  onMouseLeave={() => setHovered(null)}
                  className={`relative rounded-2xl overflow-hidden border-2 transition-all duration-200 text-left group ${
                    isSelected
                      ? 'border-rose-500 shadow-lg scale-[1.02]'
                      : 'border-border/60 hover:border-rose-300 hover:shadow-md hover:scale-[1.01]'
                  }`}
                >
                  {/* Hero preview strip */}
                  <div className={`h-20 bg-gradient-to-br ${theme.preview.gradient} relative overflow-hidden`}>
                    {/* Decorative shapes */}
                    <div className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/10" />
                    <div className="absolute bottom-1 left-2 w-5 h-5 rounded-full bg-white/10" />
                    <div className="absolute top-4 left-4">
                      <div className={`text-xs font-800 ${theme.preview.heroText} opacity-90 leading-none`}>{theme.name}</div>
                      <div className={`w-8 h-0.5 ${theme.preview.accent} mt-1.5 rounded-full`} />
                    </div>
                    {/* Fake hero buttons */}
                    <div className="absolute bottom-2.5 left-3 flex gap-1">
                      <div className={`w-10 h-2.5 rounded-full ${theme.preview.accent} opacity-90`} />
                      <div className="w-8 h-2.5 rounded-full bg-white/25" />
                    </div>

                    {/* Selected check */}
                    {isSelected && (
                      <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-rose-500 flex items-center justify-center shadow-sm">
                        <Icon name="Check" size={11} className="text-white" />
                      </div>
                    )}
                  </div>

                  {/* Card body */}
                  <div className="p-2.5 bg-white">
                    <div className="flex items-start justify-between gap-1">
                      <div>
                        <div className="text-xs font-800 text-foreground">{theme.name}</div>
                        <div className="text-2xs text-muted leading-tight mt-0.5">{theme.tagline}</div>
                      </div>
                      <span className={`flex-shrink-0 px-1.5 py-0.5 rounded text-2xs font-700 ${theme.preview.badge} ${theme.preview.badgeText} capitalize`}>
                        {theme.heroStyle === 'image-overlay' ? 'overlay' : theme.heroStyle}
                      </span>
                    </div>

                    {/* Color swatches */}
                    <div className="flex gap-1 mt-2">
                      {[
                        theme.vars['--theme-primary'],
                        theme.vars['--theme-secondary'],
                        theme.vars['--theme-accent'],
                        theme.vars['--theme-bg-alt'],
                      ].map((color, i) => (
                        <div
                          key={i}
                          title={color}
                          style={{ backgroundColor: color }}
                          className="w-4 h-4 rounded-full border border-white shadow-sm flex-shrink-0"
                        />
                      ))}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Selected theme detail strip ── */}
        {selected && (() => {
          const t = THEMES.find(th => th.id === selected)!;
          return (
            <div className="px-5 py-3 border-t border-border/30 bg-background/60 flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${t.preview.gradient} flex-shrink-0`} />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-800 text-foreground">{t.name} <span className="text-muted font-400">—</span> <span className="text-muted font-500 text-xs">{t.tagline}</span></div>
                  <div className="flex items-center gap-3 mt-0.5">
                    <span className="text-2xs text-muted flex items-center gap-1">
                      <Icon name="Type" size={10} className="text-muted" />
                      {t.vars['--theme-font-display'].split(',')[0].replace(/'/g, '')}
                    </span>
                    <span className="text-2xs text-muted flex items-center gap-1">
                      <Icon name="Layout" size={10} className="text-muted" />
                      {t.heroStyle} hero
                    </span>
                    <span className="text-2xs text-muted flex items-center gap-1">
                      <Icon name="Circle" size={10} className="text-muted" style={{ color: t.vars['--theme-primary'] }} />
                      {t.vars['--theme-primary']}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })()}

        {/* ── Footer actions ── */}
        <div className="px-5 pb-5 pt-3 flex gap-2 flex-shrink-0 border-t border-border/20">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 bg-background border border-border/60 text-sm font-700 text-foreground rounded-xl hover:bg-border/20 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleApply}
            disabled={selected === currentTheme}
            className="flex-1 py-2.5 bg-rose-500 text-white text-sm font-700 rounded-xl hover:bg-rose-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <Icon name="Palette" size={14} />
            Apply {THEMES.find(t => t.id === selected)?.name} Theme
          </button>
        </div>
      </div>
    </div>
  );
}
