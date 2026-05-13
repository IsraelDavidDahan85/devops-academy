import type { DesignSystem, Page, SlideMeta } from '@open-slide/core';

export const design: DesignSystem = {
  palette: {
    bg: '#FAF7F2',
    text: '#1A1B1A',
    accent: '#2BB3A3',
  },
  fonts: {
    display: '"Inter", "SF Pro Display", system-ui, -apple-system, sans-serif',
    body: '"Inter", "SF Pro Display", system-ui, -apple-system, sans-serif',
  },
  typeScale: {
    hero: 168,
    body: 36,
  },
  radius: 14,
};

const palette = {
  coral: '#E8704A',
  ink: '#1A1B1A',
  muted: '#6E6A60',
  paperLine: '#E5E1D6',
  paperTint: '#F2EEE5',
  chalk: '#B9B2A2',
};

const fontMono = '"JetBrains Mono", "SF Mono", ui-monospace, Menlo, monospace';

const fill = {
  width: '100%',
  height: '100%',
  background: 'var(--osd-bg)',
  color: 'var(--osd-text)',
  fontFamily: 'var(--osd-font-body)',
  position: 'relative' as const,
  overflow: 'hidden' as const,
};

const styles = `
  @keyframes df-fadeUp {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes df-fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes df-drawLine {
    from { stroke-dashoffset: 600; }
    to   { stroke-dashoffset: 0; }
  }
  @keyframes df-pulse {
    0%, 100% { opacity: 0.55; }
    50%      { opacity: 1; }
  }
`;

// ─── Shared chrome ────────────────────────────────────────────────────────────

const PageFrame = ({
  children,
  pageNum,
  total,
  eyebrow,
}: {
  children: React.ReactNode;
  pageNum: number;
  total: number;
  eyebrow?: string;
}) => (
  <div style={fill}>
    <style>{styles}</style>
    <PaperGrain />
    <div
      style={{
        position: 'absolute',
        top: 64,
        left: 120,
        right: 120,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: 22,
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        color: palette.muted,
        fontFamily: fontMono,
      }}
    >
      <span>
        DevOps&nbsp;&nbsp;·&nbsp;&nbsp;Fundamentals
      </span>
      <span>
        {eyebrow ? `${eyebrow}  ·  ` : ''}
        {String(pageNum).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </span>
    </div>
    {children}
  </div>
);

const PaperGrain = () => (
  <div
    aria-hidden
    style={{
      position: 'absolute',
      inset: 0,
      pointerEvents: 'none',
      backgroundImage:
        'radial-gradient(rgba(110,106,96,0.06) 1px, transparent 1px), radial-gradient(rgba(110,106,96,0.04) 1px, transparent 1px)',
      backgroundSize: '6px 6px, 11px 11px',
      backgroundPosition: '0 0, 3px 3px',
    }}
  />
);

// A loose, hand-drawn-feel arrow that suggests a teacher's diagram marker.
const SketchArrow = ({
  width = 220,
  height = 60,
  color = palette.coral,
  style,
}: {
  width?: number;
  height?: number;
  color?: string;
  style?: React.CSSProperties;
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 220 60"
    fill="none"
    style={{ overflow: 'visible', ...style }}
    aria-hidden
  >
    <path
      d="M4 32 C 50 18, 120 46, 196 28"
      stroke={color}
      strokeWidth={4}
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M178 18 L198 28 L182 42"
      stroke={color}
      strokeWidth={4}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

const Underline = ({
  width = 360,
  color = 'var(--osd-accent)',
  style,
}: {
  width?: number;
  color?: string;
  style?: React.CSSProperties;
}) => (
  <svg
    width={width}
    height={18}
    viewBox="0 0 360 18"
    fill="none"
    style={style}
    aria-hidden
  >
    <path
      d="M4 10 C 80 2, 200 16, 356 6"
      stroke={color}
      strokeWidth={5}
      strokeLinecap="round"
      fill="none"
    />
  </svg>
);

const TOTAL = 13;

// ─── Inter-section pause / Q&A ────────────────────────────────────────────────

const PausePage = ({
  pageNum,
  total,
  section,
  next,
  children,
}: {
  pageNum: number;
  total: number;
  section: string;
  next: string;
  children: React.ReactNode;
}) => (
  <PageFrame pageNum={pageNum} total={total} eyebrow="PAUSE">
    <div
      style={{
        position: 'absolute',
        inset: 0,
        padding: '120px 160px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          fontFamily: fontMono,
          fontSize: 28,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: palette.coral,
          animation: 'df-fadeIn 600ms ease both',
        }}
      >
        End of {section}
      </div>
      <h2
        style={{
          fontFamily: 'var(--osd-font-display)',
          fontSize: 220,
          fontWeight: 900,
          letterSpacing: '-0.04em',
          lineHeight: 0.92,
          margin: '20px 0 0',
          animation: 'df-fadeUp 700ms ease both 120ms',
        }}
      >
        Questions?
      </h2>
      <div style={{ marginTop: 24, marginLeft: -8 }}>
        <Underline width={520} color={palette.coral} />
      </div>

      <div
        style={{
          marginTop: 64,
          display: 'grid',
          gridTemplateColumns: '1.4fr 1fr',
          gap: 80,
          animation: 'df-fadeUp 600ms ease both 320ms',
        }}
      >
        <div>
          <div
            style={{
              fontFamily: fontMono,
              fontSize: 22,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: palette.muted,
              marginBottom: 16,
            }}
          >
            we just covered
          </div>
          <ul style={{ fontSize: 28, lineHeight: 1.5, color: palette.ink, paddingLeft: 28, margin: 0 }}>
            {children}
          </ul>
        </div>
        <div>
          <div
            style={{
              fontFamily: fontMono,
              fontSize: 22,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: palette.muted,
              marginBottom: 16,
            }}
          >
            up next
          </div>
          <div
            style={{
              fontSize: 44,
              fontWeight: 800,
              color: 'var(--osd-accent)',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
            }}
          >
            {next}
          </div>
        </div>
      </div>
    </div>
  </PageFrame>
);

// ─── Page 1 — Cover ───────────────────────────────────────────────────────────

const Cover: Page = () => (
  <div style={fill}>
    <style>{styles}</style>
    <PaperGrain />
    <div
      style={{
        position: 'absolute',
        inset: 0,
        padding: '120px 160px',
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
          animation: 'df-fadeIn 600ms ease both',
        }}
      >
        Onboarding&nbsp;·&nbsp;A short introduction
      </div>

      <div style={{ animation: 'df-fadeUp 700ms ease both 120ms' }}>
        <div
          style={{
            fontSize: 36,
            color: palette.coral,
            fontFamily: fontMono,
            marginBottom: 24,
          }}
        >
          /* welcome */
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
          DevOps,
          <br />
          from scratch.
        </h1>
        <div style={{ marginTop: 28, marginLeft: -12 }}>
          <Underline width={520} />
        </div>
        <p
          style={{
            fontSize: 40,
            lineHeight: 1.4,
            color: palette.muted,
            margin: '48px 0 0',
            maxWidth: 1200,
            fontWeight: 400,
          }}
        >
          How modern teams ship software — fast, safely, and together.
        </p>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontFamily: fontMono,
          fontSize: 22,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: palette.muted,
        }}
      >
        <span>For new engineers</span>
        <span>01 / {String(TOTAL).padStart(2, '0')}</span>
      </div>
    </div>
  </div>
);

// ─── Page 2 — What is DevOps? ─────────────────────────────────────────────────

const Definition = ({
  index,
  title,
  body,
  delay,
}: {
  index: string;
  title: string;
  body: string;
  delay: number;
}) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: '120px 1fr',
      alignItems: 'baseline',
      gap: 36,
      animation: `df-fadeUp 600ms ease both ${delay}ms`,
    }}
  >
    <div
      style={{
        fontFamily: fontMono,
        fontSize: 36,
        color: 'var(--osd-accent)',
        fontWeight: 600,
      }}
    >
      {index}
    </div>
    <div>
      <div
        style={{
          fontSize: 40,
          fontWeight: 700,
          letterSpacing: '-0.015em',
          marginBottom: 10,
        }}
      >
        {title}
      </div>
      <div style={{ fontSize: 26, lineHeight: 1.4, color: palette.muted }}>
        {body}
      </div>
    </div>
  </div>
);

const WhatIs: Page = () => (
  <PageFrame pageNum={2} total={TOTAL} eyebrow="DEFINITION">
    <div
      style={{
        position: 'absolute',
        inset: 0,
        padding: '180px 160px 100px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <h2
        style={{
          fontFamily: 'var(--osd-font-display)',
          fontSize: 96,
          fontWeight: 900,
          letterSpacing: '-0.035em',
          lineHeight: 1.0,
          margin: 0,
          animation: 'df-fadeUp 600ms ease both',
        }}
      >
        So, what <em style={{ fontStyle: 'italic', color: palette.coral }}>is</em> DevOps?
      </h2>

      <div style={{ marginTop: 24, marginLeft: -8 }}>
        <Underline width={580} />
      </div>

      <div
        style={{
          marginTop: 56,
          display: 'flex',
          flexDirection: 'column',
          gap: 36,
          maxWidth: 1500,
        }}
      >
        <Definition
          index="01"
          title="A way of working — not a job title."
          body="Practices that bring software development (Dev) and operations (Ops) together so teams build, ship, and run their own code."
          delay={120}
        />
        <Definition
          index="02"
          title="Culture first, automation second."
          body="People share ownership of the whole lifecycle. Tools just remove the boring, error-prone parts."
          delay={240}
        />
        <Definition
          index="03"
          title="The goal: short feedback loops."
          body="Smaller changes, shipped more often, with confidence — instead of big risky releases."
          delay={360}
        />
      </div>
    </div>
  </PageFrame>
);

// ─── Page 3 — The wall ────────────────────────────────────────────────────────

const Persona = ({
  label,
  wants,
  fears,
  align,
}: {
  label: string;
  wants: string;
  fears: string;
  align: 'left' | 'right';
}) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: align === 'left' ? 'flex-start' : 'flex-end',
      textAlign: align,
      gap: 28,
      animation: `df-fadeUp 600ms ease both ${align === 'left' ? 120 : 260}ms`,
    }}
  >
    <div
      style={{
        fontFamily: fontMono,
        fontSize: 24,
        letterSpacing: '0.22em',
        color: palette.muted,
        textTransform: 'uppercase',
      }}
    >
      {align === 'left' ? '— role —' : '— role —'}
    </div>
    <div
      style={{
        fontFamily: 'var(--osd-font-display)',
        fontSize: 160,
        fontWeight: 900,
        letterSpacing: '-0.04em',
        lineHeight: 0.9,
        color: 'var(--osd-text)',
      }}
    >
      {label}
    </div>
    <div style={{ fontSize: 30, lineHeight: 1.45, maxWidth: 560 }}>
      <div style={{ color: 'var(--osd-accent)', fontWeight: 600 }}>wants:</div>
      <div style={{ color: palette.ink, marginBottom: 16 }}>{wants}</div>
      <div style={{ color: palette.coral, fontWeight: 600 }}>fears:</div>
      <div style={{ color: palette.ink }}>{fears}</div>
    </div>
  </div>
);

const WallBrick = ({ tilt }: { tilt: number }) => (
  <div
    style={{
      width: 14,
      height: 36,
      background: palette.chalk,
      borderRadius: 3,
      transform: `rotate(${tilt}deg)`,
    }}
  />
);

const TheWall: Page = () => (
  <PageFrame pageNum={3} total={TOTAL} eyebrow="WHY IT EXISTS">
    <div
      style={{
        position: 'absolute',
        inset: 0,
        padding: '180px 140px 140px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <h2
        style={{
          fontFamily: 'var(--osd-font-display)',
          fontSize: 88,
          fontWeight: 900,
          letterSpacing: '-0.03em',
          margin: 0,
          animation: 'df-fadeUp 600ms ease both',
        }}
      >
        Once upon a time, there was a wall.
      </h2>

      <div
        style={{
          marginTop: 60,
          flex: 1,
          display: 'grid',
          gridTemplateColumns: '1fr 80px 1fr',
          alignItems: 'center',
          gap: 0,
        }}
      >
        <Persona
          label="Dev"
          wants="ship new features, fast"
          fears="being blocked by ops queues"
          align="left"
        />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 12,
            animation: 'df-fadeIn 800ms ease both 380ms',
          }}
        >
          <WallBrick tilt={-2} />
          <WallBrick tilt={2} />
          <WallBrick tilt={-2} />
          <WallBrick tilt={2} />
          <WallBrick tilt={-2} />
          <WallBrick tilt={2} />
          <WallBrick tilt={-2} />
          <WallBrick tilt={2} />
        </div>
        <Persona
          label="Ops"
          wants="keep production stable"
          fears="surprise changes at 3am"
          align="right"
        />
      </div>

      <div
        style={{
          marginTop: 24,
          display: 'flex',
          alignItems: 'center',
          gap: 24,
          fontSize: 36,
          animation: 'df-fadeUp 600ms ease both 520ms',
        }}
      >
        <SketchArrow width={140} height={40} />
        <span style={{ fontWeight: 700 }}>
          DevOps tears down the wall — one team, one pipeline, one outcome.
        </span>
      </div>
    </div>
  </PageFrame>
);

// ─── Page 4 — Linux history: section divider ──────────────────────────────────

const HistoryIntro: Page = () => (
  <PageFrame pageNum={4} total={TOTAL} eyebrow="A LITTLE HISTORY">
    <div
      style={{
        position: 'absolute',
        inset: 0,
        padding: '120px 160px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          fontFamily: fontMono,
          fontSize: 32,
          color: palette.coral,
          marginBottom: 28,
          animation: 'df-fadeUp 600ms ease both',
        }}
      >
        $ git log --reverse
      </div>

      <h2
        style={{
          fontFamily: 'var(--osd-font-display)',
          fontSize: 164,
          fontWeight: 900,
          letterSpacing: '-0.045em',
          lineHeight: 0.92,
          margin: 0,
          animation: 'df-fadeUp 700ms ease both 120ms',
        }}
      >
        Before DevOps,
        <br />
        there was{' '}
        <span style={{ color: 'var(--osd-accent)' }}>Linux</span>.
      </h2>

      <div style={{ marginTop: 28, marginLeft: -8 }}>
        <Underline width={620} />
      </div>

      <p
        style={{
          fontSize: 38,
          lineHeight: 1.4,
          color: palette.muted,
          maxWidth: 1300,
          margin: '40px 0 0',
          animation: 'df-fadeUp 700ms ease both 280ms',
        }}
      >
        Modern DevOps stands on fifty years of Unix philosophy and open-source
        collaboration. A quick rewind tells you why the tools look the way they do.
      </p>
    </div>
  </PageFrame>
);

// ─── Page 5 — Linux history: timeline ─────────────────────────────────────────

const TimelineEvent = ({
  year,
  title,
  body,
  delay,
  isLast,
}: {
  year: string;
  title: string;
  body: string;
  delay: number;
  isLast?: boolean;
}) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: '180px 56px 1fr',
      alignItems: 'flex-start',
      gap: 28,
      animation: `df-fadeUp 600ms ease both ${delay}ms`,
    }}
  >
    <div
      style={{
        fontFamily: 'var(--osd-font-display)',
        fontSize: 60,
        fontWeight: 900,
        letterSpacing: '-0.03em',
        lineHeight: 1,
        color: 'var(--osd-accent)',
      }}
    >
      {year}
    </div>
    <div
      style={{
        position: 'relative',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          width: 22,
          height: 22,
          borderRadius: '50%',
          background: palette.coral,
          border: `3px solid ${palette.ink}`,
          marginTop: 18,
          flexShrink: 0,
        }}
      />
      {!isLast && (
        <div
          style={{
            flex: 1,
            width: 3,
            background: palette.paperLine,
            marginTop: 6,
          }}
        />
      )}
    </div>
    <div style={{ paddingBottom: isLast ? 0 : 22 }}>
      <div
        style={{
          fontSize: 36,
          fontWeight: 700,
          letterSpacing: '-0.015em',
          marginBottom: 6,
        }}
      >
        {title}
      </div>
      <div style={{ fontSize: 24, lineHeight: 1.4, color: palette.muted }}>
        {body}
      </div>
    </div>
  </div>
);

const LinuxTimeline: Page = () => (
  <PageFrame pageNum={5} total={TOTAL} eyebrow="TIMELINE">
    <div
      style={{
        position: 'absolute',
        inset: 0,
        padding: '160px 160px 80px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 28 }}>
        <h2
          style={{
            fontFamily: 'var(--osd-font-display)',
            fontSize: 88,
            fontWeight: 900,
            letterSpacing: '-0.035em',
            margin: 0,
            lineHeight: 1,
            animation: 'df-fadeUp 600ms ease both',
          }}
        >
          Fifty years, five moments.
        </h2>
      </div>

      <div
        style={{
          marginTop: 48,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <TimelineEvent
          year="1969"
          title="Unix is born at Bell Labs."
          body="Ken Thompson and Dennis Ritchie build a tiny, composable OS. The Unix philosophy: small tools, do one thing well, pipe them together."
          delay={120}
        />
        <TimelineEvent
          year="1991"
          title="Linus posts a hobby kernel."
          body='"I’m doing a (free) operating system — just a hobby, won’t be big and professional like GNU." That email seeded all of modern infrastructure.'
          delay={220}
        />
        <TimelineEvent
          year="1998"
          title='"Open source" gets a name.'
          body="Linux runs serious workloads. The bazaar beats the cathedral — collaborative, transparent development becomes a credible model."
          delay={320}
        />
        <TimelineEvent
          year="2005"
          title="Git is released — also by Linus."
          body="Built to manage the Linux kernel itself. Distributed version control becomes the substrate every CI/CD pipeline lives on."
          delay={420}
        />
        <TimelineEvent
          year="2013"
          title="Docker arrives. Cloud-native begins."
          body="Linux namespaces and cgroups become developer-friendly containers. Kubernetes follows. DevOps tooling explodes."
          delay={520}
          isLast
        />
      </div>
    </div>
  </PageFrame>
);

// ─── Page 6 — Pause (after history) ───────────────────────────────────────────

const BackgroundPause: Page = () => (
  <PausePage pageNum={6} total={TOTAL} section="A little history" next="CALMS, CI/CD, the toolbox.">
    <li>where DevOps came from — the wall between Dev and Ops</li>
    <li>the Unix philosophy that shaped today&apos;s tooling</li>
    <li>five moments that built the modern stack — 1969 → 2013</li>
  </PausePage>
);

// ─── Page 7 — CALMS pillars ───────────────────────────────────────────────────

const Pillar = ({
  letter,
  name,
  body,
  delay,
}: {
  letter: string;
  name: string;
  body: string;
  delay: number;
}) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: '120px 1fr',
      alignItems: 'center',
      gap: 32,
      paddingBottom: 16,
      borderBottom: `1px solid ${palette.paperLine}`,
      animation: `df-fadeUp 600ms ease both ${delay}ms`,
    }}
  >
    <div
      style={{
        fontFamily: 'var(--osd-font-display)',
        fontSize: 80,
        fontWeight: 900,
        letterSpacing: '-0.05em',
        lineHeight: 1,
        color: 'var(--osd-accent)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {letter}
    </div>
    <div>
      <div
        style={{
          fontSize: 36,
          fontWeight: 700,
          letterSpacing: '-0.015em',
          marginBottom: 4,
        }}
      >
        {name}
      </div>
      <div style={{ fontSize: 24, lineHeight: 1.4, color: palette.muted }}>
        {body}
      </div>
    </div>
  </div>
);

const Calms: Page = () => (
  <PageFrame pageNum={7} total={TOTAL} eyebrow="THE PILLARS">
    <div
      style={{
        position: 'absolute',
        inset: 0,
        padding: '160px 160px 80px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 32 }}>
        <h2
          style={{
            fontFamily: 'var(--osd-font-display)',
            fontSize: 88,
            fontWeight: 900,
            letterSpacing: '-0.035em',
            margin: 0,
            lineHeight: 1,
            animation: 'df-fadeUp 600ms ease both',
          }}
        >
          CALMS.
        </h2>
        <div
          style={{
            fontFamily: fontMono,
            fontSize: 24,
            color: palette.muted,
            paddingBottom: 12,
            animation: 'df-fadeIn 700ms ease both 200ms',
          }}
        >
          // five pillars to remember
        </div>
      </div>

      <div
        style={{
          marginTop: 40,
          display: 'flex',
          flexDirection: 'column',
          gap: 14,
        }}
      >
        <Pillar
          letter="C"
          name="Culture"
          body="Shared ownership across dev, ops, QA, and security. No throwing things over walls."
          delay={120}
        />
        <Pillar
          letter="A"
          name="Automation"
          body="If a human does it twice, a machine should do it forever. Tests, builds, deploys, infra."
          delay={200}
        />
        <Pillar
          letter="L"
          name="Lean"
          body="Small batches, fast feedback. Smaller changes are cheaper to ship and easier to fix."
          delay={280}
        />
        <Pillar
          letter="M"
          name="Measurement"
          body="Numbers tell the story — latency, error rate, lead time. Decide with data, not vibes."
          delay={360}
        />
        <Pillar
          letter="S"
          name="Sharing"
          body="Knowledge flows freely. Docs, dashboards, postmortems — everyone learns from everyone."
          delay={440}
        />
      </div>
    </div>
  </PageFrame>
);

// ─── Page 5 — CI/CD pipeline ──────────────────────────────────────────────────

const PipelineNode = ({
  index,
  icon,
  title,
  caption,
  delay,
}: {
  index: string;
  icon: string;
  title: string;
  caption: string;
  delay: number;
}) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 20,
      animation: `df-fadeUp 600ms ease both ${delay}ms`,
    }}
  >
    <div
      style={{
        width: 220,
        height: 220,
        borderRadius: 24,
        background: palette.paperTint,
        border: `3px solid ${palette.ink}`,
        boxShadow: `8px 8px 0 ${palette.coral}`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
      }}
    >
      <div style={{ fontSize: 76, lineHeight: 1 }}>{icon}</div>
      <div
        style={{
          fontFamily: fontMono,
          fontSize: 20,
          color: palette.muted,
          letterSpacing: '0.18em',
        }}
      >
        STEP {index}
      </div>
    </div>
    <div
      style={{
        fontSize: 38,
        fontWeight: 800,
        letterSpacing: '-0.015em',
      }}
    >
      {title}
    </div>
    <div
      style={{
        fontSize: 24,
        lineHeight: 1.4,
        color: palette.muted,
        textAlign: 'center',
        maxWidth: 260,
      }}
    >
      {caption}
    </div>
  </div>
);

const NodeArrow = ({ delay }: { delay: number }) => (
  <div
    style={{
      height: 220,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      animation: `df-fadeIn 600ms ease both ${delay}ms`,
    }}
  >
    <SketchArrow width={120} height={48} />
  </div>
);

const Pipeline: Page = () => (
  <PageFrame pageNum={8} total={TOTAL} eyebrow="CI / CD">
    <div
      style={{
        position: 'absolute',
        inset: 0,
        padding: '180px 100px 120px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <h2
        style={{
          fontFamily: 'var(--osd-font-display)',
          fontSize: 96,
          fontWeight: 900,
          letterSpacing: '-0.035em',
          margin: 0,
          paddingLeft: 60,
          lineHeight: 1,
          animation: 'df-fadeUp 600ms ease both',
        }}
      >
        The pipeline.
      </h2>
      <div
        style={{
          fontSize: 32,
          color: palette.muted,
          marginTop: 16,
          paddingLeft: 60,
          animation: 'df-fadeUp 600ms ease both 80ms',
        }}
      >
        Code → production, mostly without humans in the loop.
      </div>

      <div
        style={{
          flex: 1,
          marginTop: 60,
          display: 'grid',
          gridTemplateColumns: 'auto auto auto auto auto auto auto',
          alignItems: 'flex-start',
          justifyContent: 'center',
          gap: 12,
        }}
      >
        <PipelineNode
          index="01"
          icon="✎"
          title="Commit"
          caption="Push small, frequent changes to a shared branch."
          delay={120}
        />
        <NodeArrow delay={220} />
        <PipelineNode
          index="02"
          icon="⚙"
          title="Build"
          caption="Compile, package, produce an artifact you can trust."
          delay={260}
        />
        <NodeArrow delay={360}/>
        <PipelineNode
          index="03"
          icon="✓"
          title="Test"
          caption="Unit, integration, security — automated checks gate the change."
          delay={400}
        />
        <NodeArrow delay={500}/>
        <PipelineNode
          index="04"
          icon="↑"
          title="Deploy"
          caption="Roll out gradually. Watch metrics. Roll back if needed."
          delay={540}
        />
      </div>
    </div>
  </PageFrame>
);

// ─── Page 6 — Tooling landscape ───────────────────────────────────────────────

const ToolRow = ({
  category,
  examples,
  delay,
}: {
  category: string;
  examples: string;
  delay: number;
}) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: '420px 1fr',
      alignItems: 'baseline',
      gap: 48,
      padding: '20px 0',
      borderBottom: `1px solid ${palette.paperLine}`,
      animation: `df-fadeUp 600ms ease both ${delay}ms`,
    }}
  >
    <div
      style={{
        fontSize: 36,
        fontWeight: 700,
        color: palette.ink,
        letterSpacing: '-0.01em',
      }}
    >
      {category}
    </div>
    <div
      style={{
        fontFamily: fontMono,
        fontSize: 28,
        color: palette.muted,
        letterSpacing: '0.01em',
      }}
    >
      {examples}
    </div>
  </div>
);

const Tooling: Page = () => (
  <PageFrame pageNum={9} total={TOTAL} eyebrow="THE STACK">
    <div
      style={{
        position: 'absolute',
        inset: 0,
        padding: '180px 160px 100px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <h2
        style={{
          fontFamily: 'var(--osd-font-display)',
          fontSize: 96,
          fontWeight: 900,
          letterSpacing: '-0.035em',
          margin: 0,
          lineHeight: 1,
          animation: 'df-fadeUp 600ms ease both',
        }}
      >
        The toolbox.
      </h2>
      <div
        style={{
          fontSize: 28,
          color: palette.muted,
          marginTop: 16,
          animation: 'df-fadeUp 600ms ease both 80ms',
        }}
      >
        You don&apos;t need to know all of these on day one — just recognise the categories.
      </div>

      <div
        style={{
          marginTop: 52,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <ToolRow
          category="Version control"
          examples="Git  ·  GitHub  ·  GitLab"
          delay={120}
        />
        <ToolRow
          category="CI / CD"
          examples="GitHub Actions  ·  GitLab CI  ·  CircleCI  ·  Jenkins"
          delay={200}
        />
        <ToolRow
          category="Containers"
          examples="Docker  ·  Podman  ·  OCI images"
          delay={280}
        />
        <ToolRow
          category="Orchestration"
          examples="Kubernetes  ·  ECS  ·  Nomad"
          delay={360}
        />
        <ToolRow
          category="Infra as code"
          examples="Terraform  ·  Pulumi  ·  Helm"
          delay={440}
        />
        <ToolRow
          category="Observability"
          examples="Prometheus  ·  Grafana  ·  Datadog  ·  OpenTelemetry"
          delay={520}
        />
      </div>

      <div
        style={{
          marginTop: 32,
          display: 'flex',
          alignItems: 'center',
          gap: 20,
          fontSize: 26,
          color: palette.coral,
          fontStyle: 'italic',
          animation: 'df-fadeIn 600ms ease both 640ms',
        }}
      >
        <SketchArrow width={80} height={28} />
        Tools change every year. The principles don&apos;t.
      </div>
    </div>
  </PageFrame>
);

// ─── Page 10 — Pause (after frameworks) ───────────────────────────────────────

const FrameworksPause: Page = () => (
  <PausePage pageNum={10} total={TOTAL} section="Frameworks" next="How we work in practice.">
    <li>CALMS — five pillars: Culture, Automation, Lean, Measurement, Sharing</li>
    <li>the CI/CD pipeline — commit · build · test · deploy</li>
    <li>the toolbox — VCS, CI, containers, orchestration, IaC, observability</li>
  </PausePage>
);

// ─── Page 11 — Culture ────────────────────────────────────────────────────────

const Practice = ({
  title,
  body,
  delay,
}: {
  title: string;
  body: string;
  delay: number;
}) => (
  <div
    style={{
      background: palette.paperTint,
      border: `2px solid ${palette.ink}`,
      borderRadius: 18,
      padding: '40px 44px',
      animation: `df-fadeUp 600ms ease both ${delay}ms`,
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
    }}
  >
    <div
      style={{
        fontFamily: 'var(--osd-font-display)',
        fontSize: 40,
        fontWeight: 800,
        letterSpacing: '-0.02em',
        lineHeight: 1.15,
      }}
    >
      {title}
    </div>
    <div style={{ fontSize: 26, lineHeight: 1.5, color: palette.muted }}>
      {body}
    </div>
  </div>
);

const Culture: Page = () => (
  <PageFrame pageNum={11} total={TOTAL} eyebrow="HOW WE BEHAVE">
    <div
      style={{
        position: 'absolute',
        inset: 0,
        padding: '180px 160px 120px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <h2
        style={{
          fontFamily: 'var(--osd-font-display)',
          fontSize: 96,
          fontWeight: 900,
          letterSpacing: '-0.035em',
          margin: 0,
          lineHeight: 1,
          animation: 'df-fadeUp 600ms ease both',
        }}
      >
        Culture beats tooling.
      </h2>
      <div
        style={{
          fontSize: 30,
          color: palette.muted,
          marginTop: 18,
          maxWidth: 1300,
          animation: 'df-fadeUp 600ms ease both 80ms',
        }}
      >
        Three habits that decide whether a DevOps practice actually works.
      </div>

      <div
        style={{
          marginTop: 56,
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 36,
        }}
      >
        <Practice
          title="You build it, you run it."
          body="The team that writes the code also operates it in production. Skin in the game changes design decisions."
          delay={120}
        />
        <Practice
          title="Blameless postmortems."
          body="When something breaks, ask what the system allowed — not who screwed up. Fix the system."
          delay={240}
        />
        <Practice
          title="Automate the toil first."
          body="Every manual, repetitive step is a future incident. Eliminate it before adding new features."
          delay={360}
        />
      </div>
    </div>
  </PageFrame>
);

// ─── Page 8 — Your first week ─────────────────────────────────────────────────

const Step = ({
  num,
  title,
  body,
  delay,
}: {
  num: string;
  title: string;
  body: string;
  delay: number;
}) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: '120px 1fr',
      alignItems: 'center',
      gap: 28,
      animation: `df-fadeUp 600ms ease both ${delay}ms`,
    }}
  >
    <div
      style={{
        fontFamily: 'var(--osd-font-display)',
        fontSize: 84,
        fontWeight: 900,
        letterSpacing: '-0.05em',
        lineHeight: 1,
        color: palette.coral,
      }}
    >
      {num}
    </div>
    <div>
      <div
        style={{
          fontSize: 40,
          fontWeight: 700,
          letterSpacing: '-0.015em',
          marginBottom: 8,
        }}
      >
        {title}
      </div>
      <div style={{ fontSize: 26, lineHeight: 1.4, color: palette.muted }}>
        {body}
      </div>
    </div>
  </div>
);

const FirstWeek: Page = () => (
  <PageFrame pageNum={12} total={TOTAL} eyebrow="YOUR TURN">
    <div
      style={{
        position: 'absolute',
        inset: 0,
        padding: '160px 160px 100px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <h2
        style={{
          fontFamily: 'var(--osd-font-display)',
          fontSize: 88,
          fontWeight: 900,
          letterSpacing: '-0.035em',
          margin: 0,
          lineHeight: 1,
          animation: 'df-fadeUp 600ms ease both',
        }}
      >
        Three things, this week.
      </h2>
      <div style={{ marginTop: 20, marginLeft: -8 }}>
        <Underline width={520} color={palette.coral} />
      </div>

      <div
        style={{
          marginTop: 48,
          display: 'flex',
          flexDirection: 'column',
          gap: 32,
        }}
      >
        <Step
          num="01"
          title="Read one pipeline end-to-end."
          body="Open .github/workflows or the equivalent. Trace one PR from commit to deploy. Ask what each step does."
          delay={140}
        />
        <Step
          num="02"
          title="Ship the tiniest possible PR."
          body="A typo fix counts. The point is feeling the full loop — review, CI, merge, deploy — in your own hands."
          delay={260}
        />
        <Step
          num="03"
          title="Sit with someone on-call."
          body="Watch how alerts, dashboards, and runbooks come together when something is on fire."
          delay={380}
        />
      </div>

      <div
        style={{
          marginTop: 'auto',
          paddingTop: 32,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontFamily: fontMono,
          fontSize: 26,
          color: palette.muted,
          animation: 'df-fadeIn 700ms ease both 520ms',
        }}
      >
        <span>
          <span style={{ color: 'var(--osd-accent)' }}>$</span> welcome aboard
          <span
            style={{
              display: 'inline-block',
              width: 14,
              height: 28,
              background: 'var(--osd-accent)',
              marginLeft: 8,
              verticalAlign: 'text-bottom',
              animation: 'df-pulse 1.1s ease-in-out infinite',
            }}
          />
        </span>
        <span>questions? → ask anyone, anytime.</span>
      </div>
    </div>
  </PageFrame>
);

// ─── Page 13 — Closing Q&A ────────────────────────────────────────────────────

const ClosingPause: Page = () => (
  <PausePage pageNum={13} total={TOTAL} section="DevOps Fundamentals" next="Course 01 — Linux Fundamentals.">
    <li>what DevOps is — a way of working, culture first, short feedback loops</li>
    <li>the pipeline, the toolbox, the principles that don&apos;t change</li>
    <li>your first week — read a pipeline, ship a tiny PR, sit with on-call</li>
  </PausePage>
);

export const meta: SlideMeta = { title: 'DevOps Fundamentals' };
export default [
  Cover,
  WhatIs,
  TheWall,
  HistoryIntro,
  LinuxTimeline,
  BackgroundPause,
  Calms,
  Pipeline,
  Tooling,
  FrameworksPause,
  Culture,
  FirstWeek,
  ClosingPause,
] satisfies Page[];
