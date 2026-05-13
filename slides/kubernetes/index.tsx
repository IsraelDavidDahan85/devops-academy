import type { DesignSystem, Page, SlideMeta } from '@open-slide/core';

export const design: DesignSystem = {
  palette: { bg: '#FAF7F2', text: '#1A1B1A', accent: '#2BB3A3' },
  fonts: {
    display: '"Inter", "SF Pro Display", system-ui, -apple-system, sans-serif',
    body: '"Inter", "SF Pro Display", system-ui, -apple-system, sans-serif',
  },
  typeScale: { hero: 168, body: 36 },
  radius: 14,
};

const palette = { coral: '#E8704A', muted: '#6E6A60' };
const fontMono = '"JetBrains Mono", "SF Mono", ui-monospace, Menlo, monospace';

const fill = {
  width: '100%',
  height: '100%',
  background: 'var(--osd-bg)',
  color: 'var(--osd-text)',
  fontFamily: 'var(--osd-font-body)',
  position: 'relative' as const,
} as const;

const Topic = ({ label }: { label: string }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontFamily: fontMono, fontSize: 30 }}>
    <span style={{ color: 'var(--osd-accent)', fontWeight: 700 }}>›</span>
    {label}
  </div>
);

const Cover: Page = () => (
  <div style={fill}>
    <div
      style={{
        position: 'absolute',
        inset: 0,
        padding: '100px 160px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <div
        style={{
          fontFamily: fontMono,
          fontSize: 26,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: palette.muted,
        }}
      >
        Course 06 · DevOps Academy
      </div>

      <div>
        <div style={{ fontFamily: fontMono, fontSize: 36, color: palette.coral, marginBottom: 24 }}>
          $ start --course=kubernetes
        </div>
        <h1
          style={{
            fontFamily: 'var(--osd-font-display)',
            fontSize: 'var(--osd-size-hero)',
            fontWeight: 900,
            letterSpacing: '-0.04em',
            lineHeight: 0.95,
            margin: 0,
          }}
        >
          Kubernetes.
        </h1>
        <p style={{ fontSize: 40, lineHeight: 1.4, color: palette.muted, margin: '36px 0 0', maxWidth: 1200 }}>
          Run containers at scale — declaratively, reliably, and the way the industry actually does it.
        </p>

        <div style={{ marginTop: 56, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Topic label="pods, deployments, services, ingress" />
          <Topic label="configmaps, secrets, volumes" />
          <Topic label="scaling, rolling updates, health checks" />
          <Topic label="Helm, manifests, kustomize" />
        </div>
      </div>

      <div
        style={{
          fontFamily: fontMono,
          fontSize: 22,
          color: palette.muted,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
        }}
      >
        <span style={{ color: palette.coral }}>// stub deck</span> — expand via /create-slide
      </div>
    </div>
  </div>
);

export const meta: SlideMeta = { title: 'Kubernetes' };
export default [Cover] satisfies Page[];
