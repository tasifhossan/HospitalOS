import Link from 'next/link';
import type { Metadata } from 'next';
import {
  Activity,
  Shield,
  Cpu,
  GitBranch,
  FolderLock,
  BarChart3,
  ArrowRight,
  Zap,
  Lock,
  RefreshCw,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'HospitalOS — Adaptive Resource Scheduling & Secure File Management',
  description:
    'HospitalOS is a next-generation hospital management system modeled after OS principles. Real-time scheduling, deadlock detection, encrypted medical files, and role-based access.',
};

const FEATURES = [
  {
    icon: Cpu,
    title: 'OS-Kernel Scheduler',
    description:
      'Five swappable scheduling algorithms — FCFS, SJF, Priority Aging, Multilevel, Round Robin — dispatching patients in real time.',
    color: 'var(--primary)',
    bg: 'var(--primary-muted)',
  },
  {
    icon: Shield,
    title: 'Deadlock Detection',
    description:
      'Wait-For Graph DFS cycle detection runs every kernel tick, surfacing resource deadlocks before they stall the system.',
    color: 'var(--danger)',
    bg: 'var(--danger-muted)',
  },
  {
    icon: FolderLock,
    title: 'Encrypted Medical Files',
    description:
      'AES-256-CBC encryption for every patient file. All accesses are audit-logged with a tamper-evident trail.',
    color: 'var(--success)',
    bg: 'var(--success-muted)',
  },
  {
    icon: GitBranch,
    title: 'Algorithm Comparison',
    description:
      'Benchmark any combination of scheduling algorithms against the same patient workload to find the optimal policy.',
    color: 'var(--warning)',
    bg: 'var(--warning-muted)',
  },
  {
    icon: Lock,
    title: 'Role-Based Access Control',
    description:
      'Multi-level authorization model: ADMIN down to PATIENT. Every endpoint is JWT-guarded by role.',
    color: 'var(--info)',
    bg: 'var(--info-muted)',
  },
  {
    icon: BarChart3,
    title: 'Real-Time Monitoring',
    description:
      'Socket.io event bus streams scheduler state, patient lifecycle, and resource usage to every connected client.',
    color: 'var(--primary)',
    bg: 'var(--primary-muted)',
  },
];

const ROLES = [
  { role: 'ADMIN', level: '0', color: 'var(--danger)', desc: 'Full system control' },
  { role: 'RECEPTIONIST', level: '1', color: 'var(--warning)', desc: 'Patients & appointments' },
  { role: 'DOCTOR', level: '2', color: 'var(--primary)', desc: 'Medical records & Rx' },
  { role: 'NURSE', level: '3', color: 'var(--success)', desc: 'Lab reports & observation' },
  { role: 'PATIENT', level: '4', color: 'var(--info)', desc: 'Own records only' },
];

export default function LandingPage() {
  return (
    <div
      className="min-h-screen grid-overlay"
      style={{ background: 'var(--background)' }}
    >
      {/* Ambient glow */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{ background: 'var(--gradient-glow)' }}
      />

      {/* ── Navbar ─────────────────────────────────────────────────────────── */}
      <header
        className="sticky top-0 z-40 border-b"
        style={{
          background: 'rgba(7,8,15,0.85)',
          backdropFilter: 'blur(16px)',
          borderColor: 'var(--border)',
        }}
      >
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ background: 'var(--gradient-primary)' }}
            >
              <Activity className="w-3.5 h-3.5 text-white" />
            </div>
            <span
              className="text-sm font-bold tracking-tight"
              style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}
            >
              HospitalOS
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              id="landing-login-btn"
              className="px-4 py-2 rounded-lg text-sm font-medium border transition-colors"
              style={{
                color: 'var(--text-secondary)',
                borderColor: 'var(--border)',
              }}
            >
              Sign In
            </Link>
            <Link
              href="/login"
              id="landing-get-started-btn"
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium text-white"
              style={{ background: 'var(--gradient-primary)' }}
            >
              Get Started <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </header>

      <main>
        {/* ── Hero ───────────────────────────────────────────────────────────── */}
        <section className="relative max-w-6xl mx-auto px-6 pt-20 pb-16 text-center">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-8"
            style={{
              background: 'var(--primary-muted)',
              color: 'var(--primary-hover)',
              border: '1px solid var(--primary-glow)',
            }}
          >
            <Zap className="w-3 h-3" />
            OS-Inspired Hospital Management
          </div>

          <h1
            className="text-5xl sm:text-6xl lg:text-7xl font-black leading-none tracking-tight mb-6"
            style={{ color: 'var(--text-primary)' }}
          >
            Hospital
            <span
              className="block"
              style={{
                background: 'var(--gradient-primary)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Operating System
            </span>
          </h1>

          <p
            className="text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
            style={{ color: 'var(--text-secondary)' }}
          >
            Adaptive resource scheduling, deadlock detection, encrypted medical file management,
            and real-time role-based dashboards — all modeled after OS kernel principles.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/login"
              id="hero-signin-btn"
              className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold text-white transition-transform hover:scale-105"
              style={{ background: 'var(--gradient-primary)', boxShadow: 'var(--shadow-glow-primary)' }}
            >
              <Activity className="w-4 h-4" />
              Launch Dashboard
            </Link>
            <a
              href="#features"
              className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold border transition-colors"
              style={{
                background: 'var(--surface-elevated)',
                color: 'var(--text-secondary)',
                borderColor: 'var(--border-bright)',
              }}
            >
              Explore Features
            </a>
          </div>

          {/* OS terminal preview strip */}
          <div
            className="mt-16 rounded-2xl border overflow-hidden text-left"
            style={{
              background: 'var(--surface)',
              borderColor: 'var(--border-bright)',
              boxShadow: 'var(--shadow-lg)',
            }}
          >
            {/* Terminal bar */}
            <div
              className="flex items-center gap-2 px-4 py-3 border-b"
              style={{ background: 'var(--surface-elevated)', borderColor: 'var(--border)' }}
            >
              <span className="w-3 h-3 rounded-full" style={{ background: 'var(--danger)' }} />
              <span className="w-3 h-3 rounded-full" style={{ background: 'var(--warning)' }} />
              <span className="w-3 h-3 rounded-full" style={{ background: 'var(--success)' }} />
              <span
                className="ml-2 text-xs font-mono"
                style={{ color: 'var(--text-muted)' }}
              >
                hospitalos ~ kernel-console
              </span>
            </div>
            {/* Terminal body */}
            <div
              className="px-5 py-4 font-mono text-xs space-y-1.5"
              style={{ color: 'var(--text-secondary)' }}
            >
              {[
                { prefix: '$ ', text: 'hospitalos start --scheduler=PRIORITY_AGING', color: 'var(--success)' },
                { prefix: '✓ ', text: 'SimulationClock initialized at tick 00001', color: 'var(--text-muted)' },
                { prefix: '✓ ', text: 'ResourceManager: DOCTOR×4 BED×12 ICU_BED×3', color: 'var(--text-muted)' },
                { prefix: '✓ ', text: 'DeadlockDetector: watching Wait-For Graph', color: 'var(--text-muted)' },
                { prefix: '✓ ', text: 'EncryptionService: AES-256-CBC ready', color: 'var(--text-muted)' },
                { prefix: '● ', text: 'Socket.io listening — broadcasting simulation:snapshot', color: 'var(--primary)' },
              ].map((line, i) => (
                <div key={i} className="flex gap-2">
                  <span style={{ color: line.color }}>{line.prefix}</span>
                  <span>{line.text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Features ─────────────────────────────────────────────────────── */}
        <section id="features" className="max-w-6xl mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <h2
              className="text-3xl font-bold mb-3"
              style={{ color: 'var(--text-primary)' }}
            >
              Kernel-Level Capabilities
            </h2>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
              Every clinical workflow modeled after a proven OS concept.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {FEATURES.map((feat) => {
              const Icon = feat.icon;
              return (
                <div
                  key={feat.title}
                  className="card-os group"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                    style={{ background: feat.bg }}
                  >
                    <Icon className="w-5 h-5" style={{ color: feat.color }} />
                  </div>
                  <h3
                    className="text-sm font-semibold mb-2"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {feat.title}
                  </h3>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {feat.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── System Privilege Levels ─────────────────────────────────────────── */}
        <section className="max-w-6xl mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <h2
              className="text-3xl font-bold mb-3"
              style={{ color: 'var(--text-primary)' }}
            >
              System Privilege Levels
            </h2>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
              JWT-guarded role hierarchy — multi-level access privileges.
            </p>
          </div>

          <div className="flex flex-col gap-2 max-w-lg mx-auto">
            {ROLES.map((r, i) => (
              <div
                key={r.role}
                className="flex items-center gap-4 px-5 py-3.5 rounded-xl border transition-all hover:border-[color:var(--border-bright)]"
                style={{
                  background: 'var(--surface)',
                  borderColor: 'var(--border)',
                  paddingLeft: `${20 + i * 24}px`,
                }}
              >
                <div
                  className="flex items-center justify-center w-6 h-6 rounded-full text-[10px] font-black font-mono text-white flex-shrink-0"
                  style={{ background: r.color }}
                >
                  {r.level}
                </div>
                <div className="flex-1">
                  <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                    {r.role}
                  </span>
                  <span className="text-xs ml-2" style={{ color: 'var(--text-muted)' }}>
                    — {r.desc}
                  </span>
                </div>
                <Shield className="w-4 h-4 flex-shrink-0" style={{ color: r.color, opacity: 0.6 }} />
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────────────────────── */}
        <section className="max-w-6xl mx-auto px-6 py-16">
          <div
            className="rounded-2xl border p-10 text-center relative overflow-hidden"
            style={{
              background: 'var(--surface)',
              borderColor: 'var(--primary-glow)',
              boxShadow: 'var(--shadow-glow-primary)',
            }}
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse at center, var(--primary-muted) 0%, transparent 70%)' }}
            />
            <div className="relative z-10">
              <h2
                className="text-3xl font-bold mb-3"
                style={{ color: 'var(--text-primary)' }}
              >
                Ready to boot?
              </h2>
              <p className="text-sm mb-8" style={{ color: 'var(--text-secondary)' }}>
                Sign in to access your role-specific dashboard and real-time system console.
              </p>
              <Link
                href="/login"
                id="cta-signin-btn"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-semibold text-white"
                style={{ background: 'var(--gradient-primary)', boxShadow: 'var(--shadow-glow-primary)' }}
              >
                <RefreshCw className="w-4 h-4" />
                Initialize Session
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer
        className="border-t mt-8"
        style={{ borderColor: 'var(--border)' }}
      >
        <div
          className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between text-[11px] font-mono"
          style={{ color: 'var(--text-muted)' }}
        >
          <span>© 2026 HospitalOS — Adaptive Resource Scheduling</span>
          <span style={{ color: 'var(--primary)' }}>KERNEL v1.0.0</span>
        </div>
      </footer>
    </div>
  );
}
