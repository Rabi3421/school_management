'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

// ─── Types ────────────────────────────────────────────────────────────────────
type Tab = 'branding' | 'security' | 'integrations' | 'maintenance' | 'danger';

interface SavedState {
  branding: boolean;
  security: boolean;
  integrations: boolean;
  maintenance: boolean;
}

// ─── Tab sidebar item ─────────────────────────────────────────────────────────
function TabItem({ id, label, icon, activeTab, onClick, badge }: {
  id: Tab; label: string; icon: string; activeTab: Tab; onClick: (t: Tab) => void; badge?: string;
}) {
  const active = activeTab === id;
  return (
    <button
      onClick={() => onClick(id)}
      className={`flex items-center gap-2.5 w-full px-3 py-2.5 rounded-xl text-sm font-700 transition-all text-left ${
        active
          ? 'bg-rose-50 text-rose-600 border border-rose-200'
          : 'text-muted hover:text-foreground hover:bg-background'
      }`}
    >
      <Icon name={icon} size={16} />
      <span className="flex-1">{label}</span>
      {badge && (
        <span className={`px-1.5 py-0.5 rounded text-2xs font-700 ${active ? 'bg-rose-100 text-rose-600' : 'bg-danger/8 text-danger'}`}>
          {badge}
        </span>
      )}
    </button>
  );
}

// ─── Toggle Switch ────────────────────────────────────────────────────────────
function Toggle({ checked, onChange, label, desc }: {
  checked: boolean; onChange: (v: boolean) => void; label: string; desc?: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-3 border-b border-border/30 last:border-0">
      <div>
        <div className="text-sm font-700 text-foreground">{label}</div>
        {desc && <div className="text-xs text-muted mt-0.5">{desc}</div>}
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={`relative w-11 h-6 rounded-full transition-colors flex-shrink-0 ${checked ? 'bg-rose-500' : 'bg-border'}`}
      >
        <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all ${checked ? 'left-[22px]' : 'left-0.5'}`} />
      </button>
    </div>
  );
}

// ─── Section card ─────────────────────────────────────────────────────────────
function SectionCard({ title, desc, children }: { title: string; desc?: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-border/60 shadow-soft overflow-hidden">
      <div className="px-5 py-4 border-b border-border/40 bg-background/40">
        <h3 className="font-display text-sm font-800 text-foreground">{title}</h3>
        {desc && <p className="text-xs text-muted mt-0.5">{desc}</p>}
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

// ─── Branding Tab ─────────────────────────────────────────────────────────────
const BRANDING_DEFAULTS = {
  platformName: 'SchoolSync',
  tagline: 'The smart school management platform',
  supportEmail: 'support@schoolsync.io',
  footerText: '© 2026 SchoolSync. All rights reserved.',
  primaryColor: '#6366F1',
  accentColor: '#f43f5e',
};

function BrandingTab({ onSave, saved }: { onSave: () => void; saved: boolean }) {
  const [platformName, setPlatformName] = useState(BRANDING_DEFAULTS.platformName);
  const [tagline, setTagline]           = useState(BRANDING_DEFAULTS.tagline);
  const [supportEmail, setSupportEmail] = useState(BRANDING_DEFAULTS.supportEmail);
  const [primaryColor, setPrimaryColor] = useState(BRANDING_DEFAULTS.primaryColor);
  const [accentColor, setAccentColor]   = useState(BRANDING_DEFAULTS.accentColor);
  const [footerText, setFooterText]     = useState(BRANDING_DEFAULTS.footerText);

  const PRESET_COLORS = ['#6366F1', '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#F43F5E'];

  const handleReset = () => {
    setPlatformName(BRANDING_DEFAULTS.platformName);
    setTagline(BRANDING_DEFAULTS.tagline);
    setSupportEmail(BRANDING_DEFAULTS.supportEmail);
    setFooterText(BRANDING_DEFAULTS.footerText);
    setPrimaryColor(BRANDING_DEFAULTS.primaryColor);
    setAccentColor(BRANDING_DEFAULTS.accentColor);
  };

  return (
    <div className="space-y-4">
      <SectionCard title="Platform Identity" desc="Customize how the platform appears to all users">
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-700 text-foreground mb-1.5">Platform Name</label>
              <input value={platformName} onChange={e => setPlatformName(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-border/60 bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-400" />
            </div>
            <div>
              <label className="block text-xs font-700 text-foreground mb-1.5">Support Email</label>
              <input value={supportEmail} onChange={e => setSupportEmail(e.target.value)} type="email"
                className="w-full px-3 py-2.5 rounded-xl border border-border/60 bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-400" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-700 text-foreground mb-1.5">Tagline</label>
            <input value={tagline} onChange={e => setTagline(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-border/60 bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-400" />
          </div>
          <div>
            <label className="block text-xs font-700 text-foreground mb-1.5">Footer Text</label>
            <input value={footerText} onChange={e => setFooterText(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-border/60 bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-400" />
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Color Scheme" desc="Set the primary and accent colors used across the platform">
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-700 text-foreground mb-1.5">Primary Color</label>
              <div className="flex items-center gap-2">
                <input type="color" value={primaryColor} onChange={e => setPrimaryColor(e.target.value)}
                  className="w-10 h-10 rounded-xl border border-border/60 cursor-pointer" />
                <input value={primaryColor} onChange={e => setPrimaryColor(e.target.value)}
                  className="flex-1 px-3 py-2.5 rounded-xl border border-border/60 bg-background text-sm text-foreground font-mono focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-400" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-700 text-foreground mb-1.5">Accent Color</label>
              <div className="flex items-center gap-2">
                <input type="color" value={accentColor} onChange={e => setAccentColor(e.target.value)}
                  className="w-10 h-10 rounded-xl border border-border/60 cursor-pointer" />
                <input value={accentColor} onChange={e => setAccentColor(e.target.value)}
                  className="flex-1 px-3 py-2.5 rounded-xl border border-border/60 bg-background text-sm text-foreground font-mono focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-400" />
              </div>
            </div>
          </div>
          <div>
            <div className="text-xs font-700 text-muted mb-2">Quick Presets</div>
            <div className="flex flex-wrap gap-2">
              {PRESET_COLORS.map(c => (
                <button key={c} onClick={() => setPrimaryColor(c)}
                  style={{ backgroundColor: c }}
                  className={`w-8 h-8 rounded-xl border-2 transition-all ${primaryColor === c ? 'border-foreground scale-110' : 'border-transparent'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Logo & Favicon" desc="Upload your platform logo and browser favicon">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { label: 'Platform Logo', hint: 'PNG/SVG · Recommended 200×60px' },
            { label: 'Favicon',       hint: 'ICO/PNG · 32×32px or 64×64px' },
          ].map(f => (
            <div key={f.label}>
              <div className="text-xs font-700 text-foreground mb-1.5">{f.label}</div>
              <div className="border-2 border-dashed border-border/60 rounded-xl p-6 flex flex-col items-center gap-2 bg-background/50 hover:border-rose-300 transition-colors cursor-pointer">
                <Icon name="Upload" size={20} className="text-muted" />
                <div className="text-xs font-700 text-muted">Click to upload</div>
                <div className="text-2xs text-muted">{f.hint}</div>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      <div className="flex justify-end gap-2">
        <button onClick={handleReset} className="px-4 py-2.5 bg-background border border-border/60 text-sm font-700 text-foreground rounded-xl hover:bg-border/20 transition-colors">
          Reset
        </button>
        <button onClick={onSave} className="flex items-center gap-2 px-5 py-2.5 bg-rose-500 text-white text-sm font-700 rounded-xl hover:bg-rose-600 transition-colors">
          {saved ? <><Icon name="Check" size={14} />Saved!</> : <><Icon name="Save" size={14} />Save Branding</>}
        </button>
      </div>
    </div>
  );
}

// ─── Security Tab ─────────────────────────────────────────────────────────────
const SECURITY_DEFAULTS = {
  minLen: 8, sessionTimeout: 60, maxAttempts: 5, lockoutDuration: 30,
  require2FA: false, requireUpper: true, requireNumber: true, requireSpecial: false,
  jwtExpiry: 7, auditEnabled: true, ipWhitelistEnabled: false,
};

function SecurityTab({ onSave, saved }: { onSave: () => void; saved: boolean }) {
  const [minLen, setMinLen]             = useState(SECURITY_DEFAULTS.minLen);
  const [sessionTimeout, setSession]    = useState(SECURITY_DEFAULTS.sessionTimeout);
  const [maxAttempts, setMaxAttempts]   = useState(SECURITY_DEFAULTS.maxAttempts);
  const [lockoutDuration, setLockout]   = useState(SECURITY_DEFAULTS.lockoutDuration);
  const [require2FA, setRequire2FA]     = useState(SECURITY_DEFAULTS.require2FA);
  const [requireUpper, setReqUpper]     = useState(SECURITY_DEFAULTS.requireUpper);
  const [requireNumber, setReqNumber]   = useState(SECURITY_DEFAULTS.requireNumber);
  const [requireSpecial, setReqSpecial] = useState(SECURITY_DEFAULTS.requireSpecial);
  const [jwtExpiry, setJwtExpiry]       = useState(SECURITY_DEFAULTS.jwtExpiry);
  const [auditEnabled, setAudit]        = useState(SECURITY_DEFAULTS.auditEnabled);
  const [ipWhitelistEnabled, setIPWL]   = useState(SECURITY_DEFAULTS.ipWhitelistEnabled);

  const handleReset = () => {
    setMinLen(SECURITY_DEFAULTS.minLen);
    setSession(SECURITY_DEFAULTS.sessionTimeout);
    setMaxAttempts(SECURITY_DEFAULTS.maxAttempts);
    setLockout(SECURITY_DEFAULTS.lockoutDuration);
    setRequire2FA(SECURITY_DEFAULTS.require2FA);
    setReqUpper(SECURITY_DEFAULTS.requireUpper);
    setReqNumber(SECURITY_DEFAULTS.requireNumber);
    setReqSpecial(SECURITY_DEFAULTS.requireSpecial);
    setJwtExpiry(SECURITY_DEFAULTS.jwtExpiry);
    setAudit(SECURITY_DEFAULTS.auditEnabled);
    setIPWL(SECURITY_DEFAULTS.ipWhitelistEnabled);
  };

  return (
    <div className="space-y-4">
      <SectionCard title="Password Policy" desc="Global rules applied to all new and changed passwords">
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-700 text-foreground mb-1.5">Minimum Password Length</label>
              <div className="flex items-center gap-3">
                <input type="range" min={6} max={16} value={minLen} onChange={e => setMinLen(Number(e.target.value))}
                  className="flex-1 accent-rose-500" />
                <span className="w-8 text-sm font-700 text-foreground text-center">{minLen}</span>
              </div>
            </div>
            <div>
              <label className="block text-xs font-700 text-foreground mb-1.5">JWT Token Expiry (days)</label>
              <div className="flex items-center gap-3">
                <input type="range" min={1} max={30} value={jwtExpiry} onChange={e => setJwtExpiry(Number(e.target.value))}
                  className="flex-1 accent-rose-500" />
                <span className="w-8 text-sm font-700 text-foreground text-center">{jwtExpiry}d</span>
              </div>
            </div>
          </div>
          <div className="space-y-0 divide-y divide-border/30">
            <Toggle checked={requireUpper}   onChange={setReqUpper}   label="Require uppercase letter"  desc="At least one A–Z character" />
            <Toggle checked={requireNumber}  onChange={setReqNumber}  label="Require number"             desc="At least one 0–9 character" />
            <Toggle checked={requireSpecial} onChange={setReqSpecial} label="Require special character" desc="At least one of !@#$%^&*" />
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Login & Session" desc="Control login behaviour and session management">
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-700 text-foreground mb-1.5">Session Timeout (minutes)</label>
              <div className="flex items-center gap-3">
                <input type="range" min={15} max={480} step={15} value={sessionTimeout} onChange={e => setSession(Number(e.target.value))}
                  className="flex-1 accent-rose-500" />
                <span className="w-14 text-sm font-700 text-foreground text-center">{sessionTimeout}m</span>
              </div>
            </div>
            <div>
              <label className="block text-xs font-700 text-foreground mb-1.5">Max Failed Attempts Before Lockout</label>
              <div className="flex items-center gap-3">
                <input type="range" min={3} max={10} value={maxAttempts} onChange={e => setMaxAttempts(Number(e.target.value))}
                  className="flex-1 accent-rose-500" />
                <span className="w-8 text-sm font-700 text-foreground text-center">{maxAttempts}</span>
              </div>
            </div>
          </div>
          <div>
            <label className="block text-xs font-700 text-foreground mb-1.5">Lockout Duration (minutes)</label>
            <div className="flex items-center gap-3">
              <input type="range" min={5} max={120} step={5} value={lockoutDuration} onChange={e => setLockout(Number(e.target.value))}
                className="flex-1 accent-rose-500" />
              <span className="w-14 text-sm font-700 text-foreground text-center">{lockoutDuration}m</span>
            </div>
          </div>
          <div className="space-y-0 divide-y divide-border/30">
            <Toggle checked={require2FA}        onChange={setRequire2FA}   label="Enforce 2FA for Admins & Super Admins" desc="Applies to principal and superadmin roles" />
            <Toggle checked={ipWhitelistEnabled} onChange={setIPWL}        label="Enable IP Whitelist for Super Admins"   desc="Only allow listed IPs to access superadmin console" />
            <Toggle checked={auditEnabled}       onChange={setAudit}       label="Enable Security Audit Logging"          desc="Record all auth events and security actions" />
          </div>
        </div>
      </SectionCard>

      <div className="flex justify-end gap-2">
        <button onClick={handleReset} className="px-4 py-2.5 bg-background border border-border/60 text-sm font-700 text-foreground rounded-xl hover:bg-border/20 transition-colors">Reset</button>
        <button onClick={onSave} className="flex items-center gap-2 px-5 py-2.5 bg-rose-500 text-white text-sm font-700 rounded-xl hover:bg-rose-600 transition-colors">
          {saved ? <><Icon name="Check" size={14} />Saved!</> : <><Icon name="Save" size={14} />Save Security</>}
        </button>
      </div>
    </div>
  );
}

// ─── Integrations Tab ─────────────────────────────────────────────────────────
const INTEGRATIONS_DEFAULTS = {
  smtpHost: 'smtp.sendgrid.net', smtpPort: '587', smtpUser: 'apikey',
  smsProvider: 'twilio', senderPhone: '+1 415 555 0100',
  storageType: 's3' as 'local' | 's3' | 'cloudinary',
  s3Bucket: 'schoolsync-uploads', s3Region: 'ap-south-1',
};

function IntegrationsTab({ onSave, saved }: { onSave: () => void; saved: boolean }) {
  const [smtpHost, setSmtpHost]       = useState(INTEGRATIONS_DEFAULTS.smtpHost);
  const [smtpPort, setSmtpPort]       = useState(INTEGRATIONS_DEFAULTS.smtpPort);
  const [smtpUser, setSmtpUser]       = useState(INTEGRATIONS_DEFAULTS.smtpUser);
  const [smtpPass, setSmtpPass]       = useState('••••••••••••••••');
  const [showPass, setShowPass]       = useState(false);
  const [smsProvider, setSmsProvider] = useState(INTEGRATIONS_DEFAULTS.smsProvider);
  const [twilioSid, setTwilioSid]     = useState('AC••••••••••••••••••••••••••••••••');
  const [twilioToken, setTwilioToken] = useState('••••••••••••••••');
  const [senderPhone, setSenderPhone] = useState(INTEGRATIONS_DEFAULTS.senderPhone);
  const [storageType, setStorageType] = useState<'local' | 's3' | 'cloudinary'>(INTEGRATIONS_DEFAULTS.storageType);
  const [s3Bucket, setS3Bucket]       = useState(INTEGRATIONS_DEFAULTS.s3Bucket);
  const [s3Region, setS3Region]       = useState(INTEGRATIONS_DEFAULTS.s3Region);
  const [emailTestState, setEmailTest] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [smsTestState, setSmsTest]     = useState<'idle' | 'sending' | 'sent'>('idle');

  const handleTestEmail = () => {
    setEmailTest('sending');
    setTimeout(() => { setEmailTest('sent'); setTimeout(() => setEmailTest('idle'), 3000); }, 1500);
  };
  const handleTestSms = () => {
    setSmsTest('sending');
    setTimeout(() => { setSmsTest('sent'); setTimeout(() => setSmsTest('idle'), 3000); }, 1500);
  };
  const handleReset = () => {
    setSmtpHost(INTEGRATIONS_DEFAULTS.smtpHost);
    setSmtpPort(INTEGRATIONS_DEFAULTS.smtpPort);
    setSmtpUser(INTEGRATIONS_DEFAULTS.smtpUser);
    setSmsProvider(INTEGRATIONS_DEFAULTS.smsProvider);
    setSenderPhone(INTEGRATIONS_DEFAULTS.senderPhone);
    setStorageType(INTEGRATIONS_DEFAULTS.storageType);
    setS3Bucket(INTEGRATIONS_DEFAULTS.s3Bucket);
    setS3Region(INTEGRATIONS_DEFAULTS.s3Region);
  };

  return (
    <div className="space-y-4">
      <SectionCard title="Email (SMTP)" desc="Configure the outbound email provider for notifications and alerts">
        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <label className="block text-xs font-700 text-foreground mb-1.5">SMTP Host</label>
              <input value={smtpHost} onChange={e => setSmtpHost(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-border/60 bg-background text-sm text-foreground font-mono focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-400" />
            </div>
            <div>
              <label className="block text-xs font-700 text-foreground mb-1.5">Port</label>
              <input value={smtpPort} onChange={e => setSmtpPort(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-border/60 bg-background text-sm text-foreground font-mono focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-400" />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-700 text-foreground mb-1.5">Username</label>
              <input value={smtpUser} onChange={e => setSmtpUser(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-border/60 bg-background text-sm text-foreground font-mono focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-400" />
            </div>
            <div>
              <label className="block text-xs font-700 text-foreground mb-1.5">Password / API Key</label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  value={smtpPass}
                  onChange={e => setSmtpPass(e.target.value)}
                  className="w-full pl-3 pr-9 py-2.5 rounded-xl border border-border/60 bg-background text-sm text-foreground font-mono focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-400"
                />
                <button onClick={() => setShowPass(p => !p)} className="absolute right-2 top-1/2 -translate-y-1/2 text-muted hover:text-foreground">
                  <Icon name={showPass ? 'EyeOff' : 'Eye'} size={15} />
                </button>
              </div>
            </div>
          </div>
          <button
            onClick={handleTestEmail}
            disabled={emailTestState !== 'idle'}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-700 transition-colors ${
              emailTestState === 'sent'
                ? 'bg-success/8 border-success/20 text-success'
                : 'bg-background border-border/60 text-muted hover:text-foreground'
            } disabled:opacity-70`}
          >
            <Icon name={emailTestState === 'sent' ? 'CheckCircle' : emailTestState === 'sending' ? 'Loader' : 'Send'} size={13}
              className={emailTestState === 'sending' ? 'animate-spin' : ''} />
            {emailTestState === 'sending' ? 'Sending…' : emailTestState === 'sent' ? 'Test sent!' : 'Send Test Email'}
          </button>
        </div>
      </SectionCard>

      <SectionCard title="SMS Gateway" desc="Configure the SMS provider for OTP and alert messages">
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-700 text-foreground mb-1.5">Provider</label>
            <div className="flex gap-2">
              {(['twilio', 'msg91', 'textlocal'] as const).map(p => (
                <button key={p} onClick={() => setSmsProvider(p)}
                  className={`flex-1 py-2 rounded-xl border text-xs font-700 capitalize transition-all ${
                    smsProvider === p
                      ? 'bg-rose-50 text-rose-600 border-rose-200'
                      : 'bg-background text-muted border-border/60 hover:text-foreground'
                  }`}>
                  {p === 'msg91' ? 'MSG91' : p === 'textlocal' ? 'TextLocal' : 'Twilio'}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-700 text-foreground mb-1.5">Account SID</label>
              <input value={twilioSid} onChange={e => setTwilioSid(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-border/60 bg-background text-sm text-foreground font-mono focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-400" />
            </div>
            <div>
              <label className="block text-xs font-700 text-foreground mb-1.5">Auth Token</label>
              <input type="password" value={twilioToken} onChange={e => setTwilioToken(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-border/60 bg-background text-sm text-foreground font-mono focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-400" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-700 text-foreground mb-1.5">Sender Phone Number</label>
            <input value={senderPhone} onChange={e => setSenderPhone(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-border/60 bg-background text-sm text-foreground font-mono focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-400" />
          </div>
          <button
            onClick={handleTestSms}
            disabled={smsTestState !== 'idle'}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-700 transition-colors ${
              smsTestState === 'sent'
                ? 'bg-success/8 border-success/20 text-success'
                : 'bg-background border-border/60 text-muted hover:text-foreground'
            } disabled:opacity-70`}
          >
            <Icon name={smsTestState === 'sent' ? 'CheckCircle' : smsTestState === 'sending' ? 'Loader' : 'MessageSquare'} size={13}
              className={smsTestState === 'sending' ? 'animate-spin' : ''} />
            {smsTestState === 'sending' ? 'Sending…' : smsTestState === 'sent' ? 'SMS sent!' : 'Send Test SMS'}
          </button>
        </div>
      </SectionCard>

      <SectionCard title="File Storage" desc="Where uploaded files (documents, photos, reports) are stored">
        <div className="space-y-3">
          <div className="flex gap-2">
            {(['local', 's3', 'cloudinary'] as const).map(t => (
              <button key={t} onClick={() => setStorageType(t)}
                className={`flex-1 py-2 rounded-xl border text-xs font-700 capitalize transition-all ${
                  storageType === t
                    ? 'bg-rose-50 text-rose-600 border-rose-200'
                    : 'bg-background text-muted border-border/60 hover:text-foreground'
                }`}>
                {t === 's3' ? 'AWS S3' : t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>
          {storageType === 's3' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-700 text-foreground mb-1.5">S3 Bucket Name</label>
                <input value={s3Bucket} onChange={e => setS3Bucket(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-border/60 bg-background text-sm text-foreground font-mono focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-400" />
              </div>
              <div>
                <label className="block text-xs font-700 text-foreground mb-1.5">AWS Region</label>
                <input value={s3Region} onChange={e => setS3Region(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-border/60 bg-background text-sm text-foreground font-mono focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-400" />
              </div>
            </div>
          )}
          {storageType === 'local' && (
            <div className="p-3 rounded-xl bg-warning/5 border border-warning/20 flex items-center gap-2 text-xs text-warning font-700">
              <Icon name="AlertTriangle" size={14} />
              Local storage is not recommended for production use.
            </div>
          )}
        </div>
      </SectionCard>

      <div className="flex justify-end gap-2">
        <button onClick={handleReset} className="px-4 py-2.5 bg-background border border-border/60 text-sm font-700 text-foreground rounded-xl hover:bg-border/20 transition-colors">Reset</button>
        <button onClick={onSave} className="flex items-center gap-2 px-5 py-2.5 bg-rose-500 text-white text-sm font-700 rounded-xl hover:bg-rose-600 transition-colors">
          {saved ? <><Icon name="Check" size={14} />Saved!</> : <><Icon name="Save" size={14} />Save Integrations</>}
        </button>
      </div>
    </div>
  );
}

// ─── Maintenance Tab ──────────────────────────────────────────────────────────
const MAINTENANCE_DEFAULTS = {
  maintenanceMode: false,
  maintenanceMsg: 'We are performing scheduled maintenance. Back in 30 minutes.',
  backupFreq: 'daily' as 'daily' | 'weekly' | 'monthly',
  backupRetention: 30,
  autoUpdates: true,
  debugMode: false,
};

function MaintenanceTab({ onSave, saved }: { onSave: () => void; saved: boolean }) {
  const [maintenanceMode, setMaintMode]     = useState(MAINTENANCE_DEFAULTS.maintenanceMode);
  const [maintenanceMsg, setMaintMsg]       = useState(MAINTENANCE_DEFAULTS.maintenanceMsg);
  const [announcement, setAnnouncement]     = useState('');
  const [backupFreq, setBackupFreq]         = useState<'daily' | 'weekly' | 'monthly'>(MAINTENANCE_DEFAULTS.backupFreq);
  const [backupRetention, setBackupRetent]  = useState(MAINTENANCE_DEFAULTS.backupRetention);
  const [autoUpdates, setAutoUpdates]       = useState(MAINTENANCE_DEFAULTS.autoUpdates);
  const [debugMode, setDebugMode]           = useState(MAINTENANCE_DEFAULTS.debugMode);
  const [backupState, setBackupState]       = useState<'idle' | 'running' | 'done'>('idle');
  const [showBackupHistory, setShowBackupHistory] = useState(false);

  const handleReset = () => {
    setMaintMode(MAINTENANCE_DEFAULTS.maintenanceMode);
    setMaintMsg(MAINTENANCE_DEFAULTS.maintenanceMsg);
    setBackupFreq(MAINTENANCE_DEFAULTS.backupFreq);
    setBackupRetent(MAINTENANCE_DEFAULTS.backupRetention);
    setAutoUpdates(MAINTENANCE_DEFAULTS.autoUpdates);
    setDebugMode(MAINTENANCE_DEFAULTS.debugMode);
    setAnnouncement('');
  };

  const handleManualBackup = () => {
    setBackupState('running');
    setTimeout(() => { setBackupState('done'); setTimeout(() => setBackupState('idle'), 4000); }, 2000);
  };

  const BACKUP_HISTORY = [
    { id: 1, date: 'Apr 2, 2026 · 03:00 AM', size: '48.2 MB', type: 'Auto · Daily',  status: 'success' },
    { id: 2, date: 'Apr 1, 2026 · 03:00 AM', size: '47.8 MB', type: 'Auto · Daily',  status: 'success' },
    { id: 3, date: 'Mar 31, 2026 · 12:45 PM', size: '47.1 MB', type: 'Manual',        status: 'success' },
    { id: 4, date: 'Mar 31, 2026 · 03:00 AM', size: '47.0 MB', type: 'Auto · Daily',  status: 'success' },
    { id: 5, date: 'Mar 30, 2026 · 03:00 AM', size: '46.5 MB', type: 'Auto · Daily',  status: 'failed'  },
  ];

  return (
    <div className="space-y-4">
      <SectionCard title="Maintenance Mode" desc="Take the platform offline for all users except super admins">
        <div className="space-y-4">
          <Toggle
            checked={maintenanceMode}
            onChange={setMaintMode}
            label="Enable Maintenance Mode"
            desc={maintenanceMode ? '⚠ All users (except super admins) are currently blocked.' : 'Platform is fully operational.'}
          />
          {maintenanceMode && (
            <div className="p-3 rounded-xl bg-warning/5 border border-warning/20 flex items-start gap-2 text-xs text-warning">
              <Icon name="AlertTriangle" size={14} className="flex-shrink-0 mt-0.5" />
              <span>Maintenance mode is <strong>active</strong>. Users will see the maintenance message below.</span>
            </div>
          )}
          <div>
            <label className="block text-xs font-700 text-foreground mb-1.5">Maintenance Message (shown to users)</label>
            <textarea
              value={maintenanceMsg}
              onChange={e => setMaintMsg(e.target.value)}
              rows={3}
              className="w-full px-3 py-2.5 rounded-xl border border-border/60 bg-background text-sm text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-400"
            />
          </div>
        </div>
      </SectionCard>

      <SectionCard title="System Announcement" desc="Show a banner to all logged-in users">
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-700 text-foreground mb-1.5">Announcement Text (leave blank to hide)</label>
            <textarea
              value={announcement}
              onChange={e => setAnnouncement(e.target.value)}
              rows={2}
              placeholder="e.g. 🎉 New feature: Bulk import is now available in Admin → Students."
              className="w-full px-3 py-2.5 rounded-xl border border-border/60 bg-background text-sm text-foreground resize-none placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-400"
            />
          </div>
          {announcement && (
            <div className="p-3 rounded-xl bg-primary/5 border border-primary/20 text-xs text-primary font-700 flex items-center gap-2">
              <Icon name="Megaphone" size={13} />Preview: {announcement}
            </div>
          )}
        </div>
      </SectionCard>

      <SectionCard title="Backup & Recovery" desc="Automated database backup settings">
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-700 text-foreground mb-1.5">Backup Frequency</label>
              <div className="flex gap-2">
                {(['daily', 'weekly', 'monthly'] as const).map(f => (
                  <button key={f} onClick={() => setBackupFreq(f)}
                    className={`flex-1 py-2 rounded-xl border text-xs font-700 capitalize transition-all ${
                      backupFreq === f
                        ? 'bg-rose-50 text-rose-600 border-rose-200'
                        : 'bg-background text-muted border-border/60 hover:text-foreground'
                    }`}>
                    {f}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-xs font-700 text-foreground mb-1.5">Retention Period (days)</label>
              <div className="flex items-center gap-3">
                <input type="range" min={7} max={90} step={1} value={backupRetention} onChange={e => setBackupRetent(Number(e.target.value))}
                  className="flex-1 accent-rose-500" />
                <span className="w-10 text-sm font-700 text-foreground text-center">{backupRetention}d</span>
              </div>
            </div>
          </div>
          <div className="space-y-0 divide-y divide-border/30">
            <Toggle checked={autoUpdates} onChange={setAutoUpdates} label="Auto-apply minor version updates"    desc="Patch and security updates are applied automatically" />
            <Toggle checked={debugMode}   onChange={setDebugMode}   label="Debug Mode"                         desc="Log verbose output — do not enable in production" />
          </div>
          <div className="flex flex-wrap gap-2 pt-1">
            <button
              onClick={handleManualBackup}
              disabled={backupState !== 'idle'}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-700 transition-colors ${
                backupState === 'done'
                  ? 'bg-success/8 border-success/20 text-success'
                  : 'bg-background border-border/60 text-muted hover:text-foreground'
              } disabled:opacity-70`}
            >
              <Icon name={backupState === 'done' ? 'CheckCircle' : backupState === 'running' ? 'Loader' : 'Download'} size={13}
                className={backupState === 'running' ? 'animate-spin' : ''} />
              {backupState === 'running' ? 'Backing up…' : backupState === 'done' ? 'Backup complete!' : 'Trigger Manual Backup'}
            </button>
            <button
              onClick={() => setShowBackupHistory(v => !v)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-background border border-border/60 text-xs font-700 text-muted hover:text-foreground transition-colors"
            >
              <Icon name="History" size={13} />
              {showBackupHistory ? 'Hide Backup History' : 'View Backup History'}
            </button>
          </div>
          {showBackupHistory && (
            <div className="mt-3 rounded-xl border border-border/60 overflow-hidden">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-background border-b border-border/40">
                    <th className="text-left px-4 py-2.5 font-700 text-muted">Date & Time</th>
                    <th className="text-left px-4 py-2.5 font-700 text-muted hidden sm:table-cell">Type</th>
                    <th className="text-left px-4 py-2.5 font-700 text-muted">Size</th>
                    <th className="text-left px-4 py-2.5 font-700 text-muted">Status</th>
                    <th className="text-right px-4 py-2.5 font-700 text-muted">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/30">
                  {BACKUP_HISTORY.map(b => (
                    <tr key={b.id} className="hover:bg-background/50">
                      <td className="px-4 py-2.5 text-foreground font-700">{b.date}</td>
                      <td className="px-4 py-2.5 text-muted hidden sm:table-cell">{b.type}</td>
                      <td className="px-4 py-2.5 text-muted">{b.size}</td>
                      <td className="px-4 py-2.5">
                        <span className={`px-2 py-0.5 rounded-full text-2xs font-700 ${b.status === 'success' ? 'bg-success/8 text-success' : 'bg-danger/8 text-danger'}`}>
                          {b.status}
                        </span>
                      </td>
                      <td className="px-4 py-2.5 text-right">
                        {b.status === 'success' && (
                          <button className="text-primary hover:underline text-2xs font-700">Restore</button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </SectionCard>

      <div className="flex justify-end gap-2">
        <button onClick={handleReset} className="px-4 py-2.5 bg-background border border-border/60 text-sm font-700 text-foreground rounded-xl hover:bg-border/20 transition-colors">Reset</button>
        <button onClick={onSave} className="flex items-center gap-2 px-5 py-2.5 bg-rose-500 text-white text-sm font-700 rounded-xl hover:bg-rose-600 transition-colors">
          {saved ? <><Icon name="Check" size={14} />Saved!</> : <><Icon name="Save" size={14} />Save Maintenance</>}
        </button>
      </div>
    </div>
  );
}

// ─── Danger Zone Tab ──────────────────────────────────────────────────────────
function DangerZoneTab() {
  const [confirmText, setConfirmText] = useState('');
  const [step, setStep]               = useState<'idle' | 'confirm' | 'done'>('idle');
  const [action, setAction]           = useState<string>('');

  const triggerAction = (name: string) => {
    setAction(name);
    setStep('confirm');
    setConfirmText('');
  };

  if (step === 'done') {
    return (
      <div className="bg-white rounded-2xl border border-border/60 shadow-soft p-10 flex flex-col items-center text-center gap-4">
        <div className="w-16 h-16 rounded-2xl bg-success/8 flex items-center justify-center">
          <Icon name="CheckCircle" size={30} className="text-success" />
        </div>
        <div>
          <h3 className="font-display text-base font-800 text-foreground mb-1">Action Completed</h3>
          <p className="text-sm text-muted">"{action}" was executed successfully. Check the Activity Log for details.</p>
        </div>
        <button onClick={() => setStep('idle')} className="px-5 py-2.5 bg-background border border-border/60 text-sm font-700 text-foreground rounded-xl hover:bg-border/20 transition-colors">
          Back to Danger Zone
        </button>
      </div>
    );
  }

  if (step === 'confirm') {
    return (
      <div className="bg-white rounded-2xl border border-border/60 shadow-soft p-6 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-danger/8 flex items-center justify-center">
            <Icon name="AlertTriangle" size={20} className="text-danger" />
          </div>
          <div>
            <h3 className="font-display text-sm font-800 text-danger">Confirm Dangerous Action</h3>
            <p className="text-xs text-muted mt-0.5">You are about to: <strong>{action}</strong></p>
          </div>
        </div>
        <p className="text-sm text-muted p-3 bg-danger/5 border border-danger/10 rounded-xl">
          ⚠ This action is <strong className="text-danger">irreversible</strong>. Type <code className="bg-border/40 px-1.5 py-0.5 rounded text-xs font-mono">CONFIRM</code> below to proceed.
        </p>
        <input
          value={confirmText}
          onChange={e => setConfirmText(e.target.value)}
          placeholder="Type CONFIRM to proceed"
          className="w-full px-3 py-2.5 rounded-xl border border-border/60 bg-background text-sm text-foreground font-mono focus:outline-none focus:ring-2 focus:ring-danger/20 focus:border-danger"
        />
        <div className="flex gap-2">
          <button onClick={() => setStep('idle')} className="flex-1 py-2.5 bg-background border border-border/60 text-sm font-700 text-foreground rounded-xl hover:bg-border/20 transition-colors">
            Cancel
          </button>
          <button
            disabled={confirmText !== 'CONFIRM'}
            onClick={() => setStep('done')}
            className="flex-1 py-2.5 bg-danger text-white text-sm font-700 rounded-xl hover:bg-red-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Execute
          </button>
        </div>
      </div>
    );
  }

  const actions = [
    {
      label:  'Export All Platform Data',
      desc:   'Download a full JSON/CSV export of all schools, users, and settings.',
      icon:   'Download',
      color:  'text-primary',
      bg:     'bg-primary/8',
      btn:    'Export Data',
      btnCls: 'border-primary/30 text-primary hover:bg-primary/8',
      danger: false,
    },
    {
      label:  'Purge All Activity Logs',
      desc:   'Permanently delete all stored activity logs. This cannot be undone.',
      icon:   'Trash',
      color:  'text-warning',
      bg:     'bg-warning/10',
      btn:    'Purge Logs',
      btnCls: 'border-warning/30 text-warning hover:bg-warning/10',
      danger: true,
    },
    {
      label:  'Reset All User Passwords',
      desc:   'Force a password reset for every account on the platform on next login.',
      icon:   'KeyRound',
      color:  'text-danger',
      bg:     'bg-danger/8',
      btn:    'Bulk Reset',
      btnCls: 'border-danger/30 text-danger hover:bg-danger/8',
      danger: true,
    },
    {
      label:  'Wipe Platform Data',
      desc:   'Permanently erase ALL data from this platform. Only use for decommissioning.',
      icon:   'Flame',
      color:  'text-danger',
      bg:     'bg-danger/8',
      btn:    'Wipe Data',
      btnCls: 'border-danger/30 text-danger hover:bg-danger/8',
      danger: true,
    },
  ];

  return (
    <div className="space-y-3">
      <div className="p-4 rounded-2xl bg-danger/5 border border-danger/15 flex items-start gap-3">
        <Icon name="ShieldAlert" size={18} className="text-danger flex-shrink-0 mt-0.5" />
        <div className="text-sm text-danger">
          <strong>Danger Zone —</strong> All actions below are irreversible or have significant impact on the platform. Proceed with extreme caution.
        </div>
      </div>

      {actions.map(a => (
        <div key={a.label} className="bg-white rounded-2xl border border-border/60 shadow-soft p-5 flex items-center gap-4">
          <div className={`w-10 h-10 rounded-xl ${a.bg} flex items-center justify-center flex-shrink-0`}>
            <Icon name={a.icon} size={18} className={a.color} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-700 text-foreground">{a.label}</div>
            <div className="text-xs text-muted mt-0.5">{a.desc}</div>
          </div>
          <button
            onClick={() => triggerAction(a.label)}
            className={`flex-shrink-0 px-4 py-2 rounded-xl border text-xs font-700 transition-colors ${a.btnCls}`}
          >
            {a.btn}
          </button>
        </div>
      ))}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function SuperAdminSettings() {
  const [activeTab, setActiveTab] = useState<Tab>('branding');
  const [saved, setSaved] = useState<SavedState>({ branding: false, security: false, integrations: false, maintenance: false });

  const handleSave = (tab: keyof SavedState) => {
    setSaved(s => ({ ...s, [tab]: true }));
    setTimeout(() => setSaved(s => ({ ...s, [tab]: false })), 2500);
  };

  const tabs: { id: Tab; label: string; icon: string; badge?: string }[] = [
    { id: 'branding',      label: 'Platform Branding', icon: 'Palette'     },
    { id: 'security',      label: 'Security Policies', icon: 'ShieldCheck' },
    { id: 'integrations',  label: 'Integrations',      icon: 'Plug'        },
    { id: 'maintenance',   label: 'Maintenance',        icon: 'Wrench'      },
    { id: 'danger',        label: 'Danger Zone',        icon: 'Flame', badge: '!' },
  ];

  return (
    <div className="p-4 lg:p-6">
      {/* Page header */}
      <div className="mb-5">
        <h1 className="font-display text-2xl font-800 text-foreground">System Settings</h1>
        <p className="text-sm text-muted mt-0.5">Platform-level configuration for the entire SchoolSync instance</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-5">
        {/* Sidebar nav */}
        <div className="lg:w-52 flex-shrink-0">
          <div className="bg-white rounded-2xl border border-border/60 shadow-soft p-2 lg:sticky lg:top-4">
            <div className="flex flex-row lg:flex-col gap-1 overflow-x-auto lg:overflow-visible">
              {tabs.map(t => (
                <TabItem
                  key={t.id}
                  id={t.id}
                  label={t.label}
                  icon={t.icon}
                  activeTab={activeTab}
                  onClick={setActiveTab}
                  badge={t.badge}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {activeTab === 'branding'     && <BrandingTab     onSave={() => handleSave('branding')}     saved={saved.branding}     />}
          {activeTab === 'security'     && <SecurityTab     onSave={() => handleSave('security')}     saved={saved.security}     />}
          {activeTab === 'integrations' && <IntegrationsTab onSave={() => handleSave('integrations')} saved={saved.integrations} />}
          {activeTab === 'maintenance'  && <MaintenanceTab  onSave={() => handleSave('maintenance')}  saved={saved.maintenance}  />}
          {activeTab === 'danger'       && <DangerZoneTab />}
        </div>
      </div>
    </div>
  );
}
