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
  typeScale: { hero: 168, body: 36 },
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

// Mac-terminal dark theme for the <Term> widget — Warm Dark palette.
// Coffee/burgundy-black body + warm cream fg + amber prompt — harmonizes
// with the deck's coral accent and cream-paper background.
const term = {
  bg: '#1A1410',          // deep coffee-burgundy near-black
  bar: '#251D17',          // slightly lighter chrome strip
  border: '#0E0907',
  fg: '#F5E9D8',           // warm cream — matches the paper palette
  muted: '#B89A7A',        // warm tan (instead of cool gray) — has personality
  titleBar: '#8C7059',     // warm muted brown
  prompt: '#FFB347',       // amber / gold — warm and pops on burgundy
  trafficRed: '#FF5F57',
  trafficYellow: '#FEBC2E',
  trafficGreen: '#28C840',
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
  @keyframes lf-fadeUp {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes lf-fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes lf-blink {
    0%, 49% { opacity: 1; }
    50%, 100% { opacity: 0; }
  }
`;

const TOTAL = 45;

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

const PageFrame = ({
  children,
  pageNum,
  eyebrow,
}: {
  children: React.ReactNode;
  pageNum: number;
  eyebrow?: string;
}) => (
  <div style={fill}>
    <style>{styles}</style>
    <PaperGrain />
    <div
      style={{
        position: 'absolute',
        top: 56,
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
      <span>Linux Fundamentals · Course 01</span>
      <span>
        {eyebrow ? `${eyebrow}  ·  ` : ''}
        {String(pageNum).padStart(2, '0')} / {String(TOTAL).padStart(2, '0')}
      </span>
    </div>
    {children}
  </div>
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
  <svg width={width} height={18} viewBox="0 0 360 18" fill="none" style={style} aria-hidden>
    <path
      d="M4 10 C 80 2, 200 16, 356 6"
      stroke={color}
      strokeWidth={5}
      strokeLinecap="round"
      fill="none"
    />
  </svg>
);

const SketchArrow = ({
  width = 120,
  height = 48,
  color = palette.coral,
  style,
}: {
  width?: number;
  height?: number;
  color?: string;
  style?: React.CSSProperties;
}) => (
  <svg width={width} height={height} viewBox="0 0 220 60" fill="none" style={{ overflow: 'visible', ...style }} aria-hidden>
    <path d="M4 32 C 50 18, 120 46, 196 28" stroke={color} strokeWidth={4} strokeLinecap="round" fill="none" />
    <path d="M178 18 L198 28 L182 42" stroke={color} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);

const TermDot = ({ color }: { color: string }) => (
  <span style={{ display: 'inline-block', width: 14, height: 14, borderRadius: '50%', background: color, marginRight: 8 }} />
);

const Term = ({
  children,
  width,
  style,
  title,
}: {
  children: React.ReactNode;
  width?: number | string;
  style?: React.CSSProperties;
  title?: string;
}) => (
  <div
    style={{
      background: term.bg,
      borderRadius: 12,
      width,
      boxShadow: `8px 8px 0 ${palette.coral}`,
      overflow: 'hidden',
      ...style,
    }}
  >
    <div
      style={{
        background: term.bar,
        height: 38,
        display: 'flex',
        alignItems: 'center',
        padding: '0 14px',
        borderBottom: `1px solid ${term.border}`,
      }}
    >
      <TermDot color={term.trafficRed} />
      <TermDot color={term.trafficYellow} />
      <TermDot color={term.trafficGreen} />
      <span style={{ flex: 1, textAlign: 'center', fontFamily: fontMono, fontSize: 18, color: term.titleBar, letterSpacing: '0.04em' }}>
        {title || '— zsh —'}
      </span>
      <span style={{ width: 64 }} aria-hidden />
    </div>
    <div
      style={{
        padding: '20px 28px 24px',
        fontFamily: fontMono,
        fontSize: 26,
        lineHeight: 1.5,
        color: term.fg,
      }}
    >
      {children}
    </div>
  </div>
);

const Prompt = ({ children, color = term.prompt }: { children: React.ReactNode; color?: string }) => (
  <span>
    <span style={{ color, fontWeight: 700 }}>$ </span>
    {children}
  </span>
);

const Out = ({ children }: { children: React.ReactNode }) => (
  <span style={{ color: term.muted }}>{children}</span>
);

const Cursor = () => (
  <span
    style={{
      display: 'inline-block',
      width: 12,
      height: 24,
      background: term.prompt,
      marginLeft: 4,
      verticalAlign: 'text-bottom',
      animation: 'lf-blink 1.1s steps(2) infinite',
    }}
  />
);

// ─── 01 — Cover ───────────────────────────────────────────────────────────────

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
          animation: 'lf-fadeIn 600ms ease both',
        }}
      >
        Course 01 · DevOps Academy
      </div>

      <div style={{ animation: 'lf-fadeUp 700ms ease both 120ms' }}>
        <div
          style={{
            fontSize: 38,
            color: palette.coral,
            fontFamily: fontMono,
            marginBottom: 28,
          }}
        >
          <Prompt>start --course=linux-fundamentals</Prompt>
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
          Linux,
          <br />
          from the prompt up.
        </h1>
        <div style={{ marginTop: 28, marginLeft: -8 }}>
          <Underline width={620} />
        </div>
        <p
          style={{
            fontSize: 40,
            lineHeight: 1.4,
            color: palette.muted,
            margin: '40px 0 0',
            maxWidth: 1300,
          }}
        >
          The shell, the system, and the conventions that make Linux the operating system of the internet.
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
        <span>For new engineers · ~6 hours</span>
        <span>01 / {String(TOTAL).padStart(2, '0')}</span>
      </div>
    </div>
  </div>
);

// ─── 02 — Why Linux ───────────────────────────────────────────────────────────

const StatTile = ({
  big,
  label,
  delay,
}: {
  big: string;
  label: string;
  delay: number;
}) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      animation: `lf-fadeUp 600ms ease both ${delay}ms`,
    }}
  >
    <div
      style={{
        fontFamily: 'var(--osd-font-display)',
        fontSize: 156,
        fontWeight: 900,
        letterSpacing: '-0.045em',
        lineHeight: 0.9,
        color: 'var(--osd-accent)',
      }}
    >
      {big}
    </div>
    <div style={{ fontSize: 28, lineHeight: 1.4, color: palette.muted, maxWidth: 440 }}>
      {label}
    </div>
  </div>
);

const WhyLinux: Page = () => (
  <PageFrame pageNum={2} eyebrow="WHY IT MATTERS">
    <div
      style={{
        position: 'absolute',
        inset: 0,
        padding: '170px 160px 100px',
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
          lineHeight: 1,
          margin: 0,
          animation: 'lf-fadeUp 600ms ease both',
        }}
      >
        Linux is everywhere
        <br />
        you can&apos;t see.
      </h2>
      <div style={{ marginTop: 24, marginLeft: -8 }}>
        <Underline width={560} color={palette.coral} />
      </div>

      <div
        style={{
          marginTop: 80,
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 48,
        }}
      >
        <StatTile big="~90%" label="of public-cloud servers run Linux" delay={120} />
        <StatTile big="100%" label="of the top 500 supercomputers run Linux" delay={240} />
        <StatTile big="3B+" label="Android devices ship with the Linux kernel" delay={360} />
      </div>

      <div
        style={{
          marginTop: 48,
          fontFamily: fontMono,
          fontSize: 26,
          color: palette.muted,
          animation: 'lf-fadeIn 700ms ease both 520ms',
        }}
      >
        <span style={{ color: palette.coral }}>// </span>
        If you operate software at scale, you operate Linux.
      </div>
    </div>
  </PageFrame>
);

// ─── 03 — History ─────────────────────────────────────────────────────────────

const Event = ({
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
      gridTemplateColumns: '180px 48px 1fr',
      alignItems: 'flex-start',
      gap: 24,
      animation: `lf-fadeUp 600ms ease both ${delay}ms`,
    }}
  >
    <div
      style={{
        fontFamily: 'var(--osd-font-display)',
        fontSize: 56,
        fontWeight: 900,
        letterSpacing: '-0.03em',
        lineHeight: 1,
        color: 'var(--osd-accent)',
      }}
    >
      {year}
    </div>
    <div style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div
        style={{
          width: 20,
          height: 20,
          borderRadius: '50%',
          background: palette.coral,
          border: `3px solid ${palette.ink}`,
          marginTop: 16,
          flexShrink: 0,
        }}
      />
      {!isLast && (
        <div style={{ flex: 1, width: 3, background: palette.paperLine, marginTop: 6 }} />
      )}
    </div>
    <div style={{ paddingBottom: isLast ? 0 : 16 }}>
      <div style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.015em', marginBottom: 4 }}>
        {title}
      </div>
      <div style={{ fontSize: 22, lineHeight: 1.4, color: palette.muted }}>{body}</div>
    </div>
  </div>
);

const History: Page = () => (
  <PageFrame pageNum={3} eyebrow="A SHORT HISTORY">
    <div
      style={{
        position: 'absolute',
        inset: 0,
        padding: '170px 160px 80px',
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
          lineHeight: 1,
          margin: 0,
          animation: 'lf-fadeUp 600ms ease both',
        }}
      >
        Fifty years, five moments.
      </h2>

      <div style={{ marginTop: 44, display: 'flex', flexDirection: 'column' }}>
        <Event
          year="1969"
          title="Unix is born at Bell Labs."
          body="Thompson and Ritchie build a tiny, composable OS. The Unix philosophy — small tools, do one thing well, pipe them together — is born with it."
          delay={120}
        />
        <Event
          year="1991"
          title="Linus posts a hobby kernel."
          body='"I’m doing a (free) operating system — just a hobby, won’t be big and professional like GNU." That email seeded all of modern infrastructure.'
          delay={220}
        />
        <Event
          year="1998"
          title='"Open source" gets a name.'
          body="Linux runs serious workloads. Transparent, collaborative development becomes a credible alternative to proprietary software."
          delay={320}
        />
        <Event
          year="2005"
          title="Git is released — also by Linus."
          body="Built to manage the Linux kernel itself. Distributed version control becomes the substrate every CI/CD pipeline lives on."
          delay={420}
        />
        <Event
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

// ─── 04 — Section divider: The Shell ──────────────────────────────────────────

const SectionDivider = ({
  num,
  label,
  blurb,
  pageNum,
}: {
  num: string;
  label: string;
  blurb: string;
  pageNum: number;
}) => (
  <PageFrame pageNum={pageNum} eyebrow="SECTION">
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
          marginBottom: 16,
          animation: 'lf-fadeUp 600ms ease both',
        }}
      >
        Part {num}
      </div>
      <h2
        style={{
          fontFamily: 'var(--osd-font-display)',
          fontSize: 200,
          fontWeight: 900,
          letterSpacing: '-0.045em',
          lineHeight: 0.92,
          margin: 0,
          animation: 'lf-fadeUp 700ms ease both 120ms',
        }}
      >
        {label}
      </h2>
      <div style={{ marginTop: 28, marginLeft: -8 }}>
        <Underline width={620} />
      </div>
      <p
        style={{
          fontSize: 36,
          lineHeight: 1.4,
          color: palette.muted,
          maxWidth: 1300,
          margin: '40px 0 0',
          animation: 'lf-fadeUp 700ms ease both 280ms',
        }}
      >
        {blurb}
      </p>
    </div>
  </PageFrame>
);

const ShellDivider: Page = () => (
  <SectionDivider
    num="01"
    label="The Shell."
    blurb="Your daily driver. The shell is how you talk to Linux — and once you can live in one, every server in the world is yours to operate."
    pageNum={4}
  />
);

// ─── Inter-section pause / Q&A ─────────────────────────────────────────────────

const PausePage = ({
  pageNum,
  section,
  next,
  children,
}: {
  pageNum: number;
  section: string;
  next: string;
  children: React.ReactNode;
}) => (
  <PageFrame pageNum={pageNum} eyebrow="PAUSE">
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
          animation: 'lf-fadeIn 600ms ease both',
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
          animation: 'lf-fadeUp 700ms ease both 120ms',
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
          animation: 'lf-fadeUp 600ms ease both 320ms',
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
          <div style={{ fontSize: 44, fontWeight: 800, color: 'var(--osd-accent)', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
            {next}
          </div>
        </div>
      </div>
    </div>
  </PageFrame>
);

// ─── 05 — First commands ──────────────────────────────────────────────────────

const TwoCol = ({
  left,
  right,
}: {
  left: React.ReactNode;
  right: React.ReactNode;
}) => (
  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'start' }}>
    {left}
    {right}
  </div>
);

const CmdRow = ({
  cmd,
  desc,
  delay,
  cmdWidth = 200,
}: {
  cmd: string;
  desc: string;
  delay: number;
  cmdWidth?: number;
}) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: `${cmdWidth}px 1fr`,
      alignItems: 'baseline',
      gap: 24,
      padding: '12px 0',
      borderBottom: `1px solid ${palette.paperLine}`,
      animation: `lf-fadeUp 500ms ease both ${delay}ms`,
    }}
  >
    <code
      style={{
        fontFamily: fontMono,
        fontSize: 32,
        color: 'var(--osd-accent)',
        fontWeight: 600,
      }}
    >
      {cmd}
    </code>
    <div style={{ fontSize: 26, lineHeight: 1.4, color: palette.ink }}>{desc}</div>
  </div>
);

const FirstCommands: Page = () => (
  <PageFrame pageNum={5} eyebrow="THE BASICS">
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
          lineHeight: 1,
          margin: 0,
          animation: 'lf-fadeUp 600ms ease both',
        }}
      >
        Your first five commands.
      </h2>

      <div style={{ marginTop: 56 }}>
        <TwoCol
          left={
            <div>
              <CmdRow cmd="pwd" desc="print working directory" delay={120} />
              <CmdRow cmd="ls" desc="list what's here" delay={200} />
              <CmdRow cmd="cd <path>" desc="change directory" delay={280} />
              <CmdRow cmd="cd ~" desc="back to your home" delay={360} />
              <CmdRow cmd="cd /" desc="all the way to the root" delay={440} />
            </div>
          }
          right={
            <Term style={{ animation: 'lf-fadeUp 600ms ease both 200ms' }}>
              <div><Prompt>pwd</Prompt></div>
              <div><Out>/home/student</Out></div>
              <div style={{ height: 10 }} />
              <div><Prompt>cd /etc &amp;&amp; pwd</Prompt></div>
              <div><Out>/etc</Out></div>
              <div style={{ height: 10 }} />
              <div><Prompt>cd ~ &amp;&amp; pwd</Prompt></div>
              <div><Out>/home/student</Out><Cursor /></div>
            </Term>
          }
        />
      </div>

      <div
        style={{
          marginTop: 'auto',
          paddingTop: 24,
          fontSize: 26,
          color: palette.muted,
          fontFamily: fontMono,
          animation: 'lf-fadeIn 700ms ease both 560ms',
        }}
      >
        <span style={{ color: palette.coral }}>// </span>
        Paths starting with <code>/</code> are absolute. Everything else is relative to where you are.
      </div>
    </div>
  </PageFrame>
);

// ─── 06 — File operations ─────────────────────────────────────────────────────

const FileOps: Page = () => (
  <PageFrame pageNum={6} eyebrow="MAKE · MOVE · REMOVE">
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
          lineHeight: 1,
          margin: 0,
          animation: 'lf-fadeUp 600ms ease both',
        }}
      >
        Make, move, remove.
      </h2>

      <div style={{ marginTop: 48 }}>
        <TwoCol
          left={
            <div>
              <CmdRow cmd="mkdir -p" desc="create a directory (and parents)" delay={120} />
              <CmdRow cmd="touch" desc="create an empty file" delay={180} />
              <CmdRow cmd="cp -r" desc="copy (recursive for dirs)" delay={240} />
              <CmdRow cmd="cp -p" desc="copy + preserve mode and timestamps" delay={300} />
              <CmdRow cmd="ln -s" desc="symlink — a pointer to another path" delay={360} />
              <CmdRow cmd="mv" desc="move or rename" delay={420} />
              <CmdRow cmd="rm -r" desc="remove (recursive). careful." delay={480} />
            </div>
          }
          right={
            <Term style={{ animation: 'lf-fadeUp 600ms ease both 220ms' }}>
              <div><Prompt>mkdir -p devops/linux/lab-01</Prompt></div>
              <div><Prompt>touch devops/linux/lab-01/notes.md</Prompt></div>
              <div><Prompt>cp -rp devops devops-backup</Prompt></div>
              <div><Prompt>ln -s devops-backup latest</Prompt></div>
              <div><Prompt>mv notes.md README.md</Prompt></div>
              <div style={{ color: palette.coral }}><Prompt>rm -rf devops-backup</Prompt></div>
              <div><Out>(silently nuked, no undo)</Out><Cursor /></div>
            </Term>
          }
        />
      </div>

      <div
        style={{
          marginTop: 28,
          fontSize: 24,
          color: palette.muted,
          fontFamily: fontMono,
          animation: 'lf-fadeIn 700ms ease both 560ms',
        }}
      >
        also useful:&nbsp;&nbsp;<code style={{ color: palette.ink }}>pushd</code>&nbsp;·&nbsp;<code style={{ color: palette.ink }}>popd</code> (directory stack)&nbsp;&nbsp;·&nbsp;&nbsp;<code style={{ color: palette.ink }}>realpath</code> (resolve a symlink to its target)
      </div>

      <div
        style={{
          marginTop: 'auto',
          paddingTop: 24,
          fontSize: 26,
          color: palette.muted,
          fontFamily: fontMono,
          animation: 'lf-fadeIn 700ms ease both 620ms',
        }}
      >
        <span style={{ color: palette.coral }}>// </span>
        <code>rm -rf</code> doesn&apos;t ask twice. Pause before you press Enter on root paths.
      </div>
    </div>
  </PageFrame>
);

// ─── 07 — Find files ──────────────────────────────────────────────────────────

const FindFiles: Page = () => (
  <PageFrame pageNum={7} eyebrow="WALK THE TREE">
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
          lineHeight: 1,
          margin: 0,
          animation: 'lf-fadeUp 600ms ease both',
        }}
      >
        Hunt with <code style={{ fontFamily: fontMono, color: palette.coral }}>find</code>.
      </h2>
      <div
        style={{
          fontSize: 28,
          color: palette.muted,
          marginTop: 14,
          animation: 'lf-fadeUp 600ms ease both 80ms',
        }}
      >
        Where <code>ls</code> only lists, <code>find</code> walks the tree and filters as it goes.
      </div>

      <div style={{ marginTop: 44 }}>
        <TwoCol
          left={
            <div>
              <CmdRow cmd="find <path>" desc="recursively list everything under <path>" delay={140} />
              <CmdRow cmd="-type f / d / l" desc="filter: regular file, directory, symlink" delay={220} />
              <CmdRow cmd={'-name "*.log"'} desc="match the basename (quote it — the shell won't expand)" delay={300} />
              <CmdRow cmd="-size +10M" desc="bigger than 10 MB (use - for smaller)" delay={380} />
              <CmdRow cmd="-mtime -7" desc="modified in the last 7 days" delay={460} />
              <CmdRow cmd="-exec ... \\;" desc="run a command on each match" delay={540} />
            </div>
          }
          right={
            <Term style={{ animation: 'lf-fadeUp 600ms ease both 220ms' }}>
              <div><Prompt>{'find . -name "*.log"'}</Prompt></div>
              <div><Out>./var/log/syslog</Out></div>
              <div><Out>./projects/app.log</Out></div>
              <div style={{ height: 10 }} />
              <div><Prompt>find /home -type f -size +100M</Prompt></div>
              <div><Out>/home/student/downloads/ubuntu.iso</Out></div>
              <div style={{ height: 10 }} />
              <div><Prompt>{'find . -name "*.tmp" -exec rm {} \\;'}</Prompt><Cursor /></div>
            </Term>
          }
        />
      </div>

      <div
        style={{
          marginTop: 'auto',
          paddingTop: 24,
          fontSize: 26,
          color: palette.muted,
          fontFamily: fontMono,
          animation: 'lf-fadeIn 700ms ease both 620ms',
        }}
      >
        <span style={{ color: palette.coral }}>// </span>
        <code>find</code> is recursive by default. Add <code>-maxdepth 1</code> to stop at one level.
      </div>
    </div>
  </PageFrame>
);

// ─── 08 — Viewing files ───────────────────────────────────────────────────────

const Viewing: Page = () => (
  <PageFrame pageNum={8} eyebrow="READ A FILE">
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
          lineHeight: 1,
          margin: 0,
          animation: 'lf-fadeUp 600ms ease both',
        }}
      >
        Four ways to read.
      </h2>

      <div style={{ marginTop: 48 }}>
        <TwoCol
          left={
            <div>
              <CmdRow cmd="cat" desc="dump the whole file" delay={120} />
              <CmdRow cmd="less" desc="page through it (/search, n/N)" delay={200} />
              <CmdRow cmd="head -n 20" desc="first 20 lines" delay={280} />
              <CmdRow cmd="tail -n 20" desc="last 20 lines" delay={360} />
              <CmdRow cmd="tail -f" desc="follow a log live" delay={440} />
            </div>
          }
          right={
            <Term style={{ animation: 'lf-fadeUp 600ms ease both 220ms' }}>
              <div><Prompt>tail -f /var/log/syslog</Prompt></div>
              <div><Out>... waiting for output ...</Out></div>
              <div><Out>Jan 12 10:14:22 kernel: usb 1-1 ...</Out></div>
              <div><Out>Jan 12 10:14:23 systemd: started ...</Out></div>
              <div><Out>Jan 12 10:14:24 sshd: accepted ...</Out><Cursor /></div>
            </Term>
          }
        />
      </div>

      <div
        style={{
          marginTop: 'auto',
          paddingTop: 24,
          fontSize: 26,
          color: palette.muted,
          fontFamily: fontMono,
          animation: 'lf-fadeIn 700ms ease both 560ms',
        }}
      >
        <span style={{ color: palette.coral }}>// </span>
        <code>tail -f</code> is the most useful one-liner in your career. Memorise it.
      </div>
    </div>
  </PageFrame>
);

// ─── 08 — ls -l anatomy ───────────────────────────────────────────────────────

const LsField = ({ label, color = 'var(--osd-accent)' }: { label: string; color?: string }) => (
  <span
    style={{
      display: 'inline-block',
      fontFamily: fontMono,
      fontSize: 38,
      padding: '2px 8px',
      borderRadius: 6,
      background: palette.paperTint,
      border: `1px solid ${palette.paperLine}`,
      color,
    }}
  >
    {label}
  </span>
);

const FieldLabel = ({ caption, delay }: { caption: string; delay: number }) => (
  <div
    style={{
      fontFamily: fontMono,
      fontSize: 22,
      color: palette.muted,
      animation: `lf-fadeUp 500ms ease both ${delay}ms`,
    }}
  >
    {caption}
  </div>
);

const FlagPill = ({ flag, desc, delay }: { flag: string; desc: string; delay: number }) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'baseline',
      gap: 14,
      fontFamily: fontMono,
      fontSize: 24,
      animation: `lf-fadeUp 500ms ease both ${delay}ms`,
    }}
  >
    <code style={{ color: palette.coral, fontWeight: 700, minWidth: 36 }}>{flag}</code>
    <span style={{ color: palette.muted }}>{desc}</span>
  </div>
);

const LsAnatomy: Page = () => (
  <PageFrame pageNum={9} eyebrow="DEEP DIVE">
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
          lineHeight: 1,
          margin: 0,
          animation: 'lf-fadeUp 600ms ease both',
        }}
      >
        Reading <code style={{ fontFamily: fontMono, color: palette.coral }}>ls -l</code>.
      </h2>

      <div
        style={{
          marginTop: 64,
          background: palette.paperTint,
          border: `2px solid ${palette.ink}`,
          borderRadius: 12,
          padding: '36px 44px',
          fontFamily: fontMono,
          fontSize: 38,
          boxShadow: `8px 8px 0 ${palette.coral}`,
          display: 'flex',
          gap: 18,
          flexWrap: 'wrap',
          animation: 'lf-fadeUp 600ms ease both 120ms',
        }}
      >
        <LsField label="-rw-r--r--" />
        <LsField label="1" />
        <LsField label="student" />
        <LsField label="staff" />
        <LsField label="4096" />
        <LsField label="Jan 12 10:14" />
        <LsField label="README.md" color={palette.coral} />
      </div>

      <div
        style={{
          marginTop: 28,
          display: 'grid',
          gridTemplateColumns: '1.6fr 0.5fr 1.1fr 0.8fr 0.8fr 1.4fr 1.6fr',
          gap: 18,
        }}
      >
        <FieldLabel caption="permissions" delay={220} />
        <FieldLabel caption="links" delay={260} />
        <FieldLabel caption="owner" delay={300} />
        <FieldLabel caption="group" delay={340} />
        <FieldLabel caption="size (bytes)" delay={380} />
        <FieldLabel caption="modified" delay={420} />
        <FieldLabel caption="name" delay={460} />
      </div>

      <div
        style={{
          marginTop: 48,
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          rowGap: 14,
          columnGap: 32,
        }}
      >
        <FlagPill flag="-l" desc="long format" delay={520} />
        <FlagPill flag="-a" desc="show hidden" delay={560} />
        <FlagPill flag="-h" desc="human sizes" delay={600} />
        <FlagPill flag="-R" desc="recurse into dirs" delay={640} />
        <FlagPill flag="-t" desc="sort by time" delay={680} />
        <FlagPill flag="-S" desc="sort by size" delay={720} />
        <FlagPill flag="-r" desc="reverse order" delay={760} />
        <FlagPill flag="-d" desc="dir itself, not contents" delay={800} />
      </div>

      <div
        style={{
          marginTop: 'auto',
          paddingTop: 24,
          fontSize: 26,
          color: palette.muted,
          fontFamily: fontMono,
          animation: 'lf-fadeIn 700ms ease both 860ms',
        }}
      >
        <span style={{ color: palette.coral }}>// </span>
        Stack them: <code>ls -lhtSr</code> = long, human, by time, by size, reversed.
      </div>
    </div>
  </PageFrame>
);

// ─── 09 — Help system ─────────────────────────────────────────────────────────

const HelpEntry = ({
  cmd,
  body,
  delay,
}: {
  cmd: string;
  body: string;
  delay: number;
}) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: '260px 1fr',
      alignItems: 'baseline',
      gap: 28,
      padding: '14px 0',
      borderBottom: `1px solid ${palette.paperLine}`,
      animation: `lf-fadeUp 500ms ease both ${delay}ms`,
    }}
  >
    <code style={{ fontFamily: fontMono, fontSize: 30, color: 'var(--osd-accent)', fontWeight: 600 }}>
      {cmd}
    </code>
    <div style={{ fontSize: 26, lineHeight: 1.4, color: palette.ink }}>{body}</div>
  </div>
);

const HelpSystem: Page = () => (
  <PageFrame pageNum={10} eyebrow="WHEN YOU'RE STUCK">
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
          lineHeight: 1,
          margin: 0,
          animation: 'lf-fadeUp 600ms ease both',
        }}
      >
        Help is built in.
      </h2>
      <div
        style={{
          fontSize: 30,
          color: palette.muted,
          marginTop: 16,
          animation: 'lf-fadeUp 600ms ease both 80ms',
        }}
      >
        Reach for these before you reach for a search engine.
      </div>

      <div style={{ marginTop: 36 }}>
        <HelpEntry cmd="man <cmd>" body="The full manual — flags, examples, related commands. Press q to quit." delay={140} />
        <HelpEntry cmd="man <n> <name>" body="Pick a section: 1 = commands, 5 = file formats, 8 = admin. e.g. man 5 passwd." delay={200} />
        <HelpEntry cmd="man hier" body="The filesystem layout, straight from your terminal — what each top-level dir is for." delay={260} />
        <HelpEntry cmd="<cmd> --help" body="Quick reference card baked into most commands." delay={320} />
        <HelpEntry cmd="whatis <cmd>" body="One-line description, useful when you can't remember the name." delay={380} />
        <HelpEntry cmd="apropos <topic>" body="Search the manual database — finds commands related to a keyword." delay={440} />
        <HelpEntry cmd="which / type" body="Tells you where a command lives (or whether it's a shell builtin)." delay={500} />
      </div>
    </div>
  </PageFrame>
);

// ─── 11 — Pause / Questions (end of Shell) ────────────────────────────────────

const ShellPause: Page = () => (
  <PausePage pageNum={11} section="The Shell" next="Power-ups.">
    <li>navigation — <code>pwd</code> · <code>cd</code> · <code>ls</code> · <code>pushd</code>/<code>popd</code></li>
    <li>file ops — <code>mkdir</code> · <code>cp</code> · <code>mv</code> · <code>rm</code> · <code>ln -s</code></li>
    <li>finding stuff — <code>find</code> with <code>-type</code>, <code>-name</code>, <code>-exec</code></li>
    <li>reading files — <code>cat</code> · <code>less</code> · <code>head</code> · <code>tail -f</code></li>
    <li>reading <code>ls -l</code> and the help system (<code>man</code>, <code>--help</code>, <code>apropos</code>)</li>
  </PausePage>
);

// ─── 12 — Section divider: Shell power-ups ───────────────────────────────────

const PowerupsDivider: Page = () => (
  <SectionDivider
    num="02"
    label="Power-ups."
    blurb="The shell is much more than running commands. History, aliases, jobs, pipes, paths, prompts — once you wire these in, your terminal becomes a tool you steer with your fingertips."
    pageNum={12}
  />
);

// ─── 11 — Aliases & history ───────────────────────────────────────────────────

const Tip = ({ label, value }: { label: string; value: string }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
    <span style={{ fontSize: 22, color: palette.muted, fontFamily: fontMono }}>{label}</span>
    <code style={{ fontSize: 32, color: 'var(--osd-accent)', fontFamily: fontMono, fontWeight: 600 }}>
      {value}
    </code>
  </div>
);

const HistoryAliases: Page = () => (
  <PageFrame pageNum={13} eyebrow="MUSCLE MEMORY">
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
          lineHeight: 1,
          margin: 0,
          animation: 'lf-fadeUp 600ms ease both',
        }}
      >
        Repeat yourself less.
      </h2>

      <div
        style={{
          marginTop: 56,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 64,
          alignItems: 'start',
        }}
      >
        <div style={{ animation: 'lf-fadeUp 600ms ease both 120ms' }}>
          <div style={{ fontSize: 36, fontWeight: 700, marginBottom: 20 }}>Aliases</div>
          <Term>
            <div><Prompt>alias ll=&apos;ls -lah&apos;</Prompt></div>
            <div><Prompt>alias gs=&apos;git status&apos;</Prompt></div>
            <div style={{ height: 10 }} />
            <div><Out># persist in ~/.bashrc or ~/.zshrc</Out></div>
          </Term>
          <div style={{ marginTop: 20, fontSize: 24, color: palette.muted, lineHeight: 1.4 }}>
            Aliases are shortcuts. Use them for things you type twenty times a day.
          </div>
        </div>

        <div style={{ animation: 'lf-fadeUp 600ms ease both 240ms' }}>
          <div style={{ fontSize: 36, fontWeight: 700, marginBottom: 20 }}>History tricks</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 18 }}>
            <Tip label="run the last command" value="!!" />
            <Tip label="rerun the last command with sudo" value="sudo !!" />
            <Tip label="last command starting with ls" value="!ls" />
            <Tip label="rerun command #137 from history" value="!137" />
            <Tip label="search history interactively" value="Ctrl + R" />
          </div>
        </div>
      </div>
    </div>
  </PageFrame>
);

// ─── 12 — Line-editing shortcuts ──────────────────────────────────────────────

const Kbd = ({ children }: { children: React.ReactNode }) => (
  <span
    style={{
      display: 'inline-block',
      fontFamily: fontMono,
      fontSize: 28,
      padding: '4px 14px',
      background: 'white',
      border: `2px solid ${palette.ink}`,
      borderBottomWidth: 4,
      borderRadius: 8,
      lineHeight: 1.1,
      color: palette.ink,
      fontWeight: 600,
    }}
  >
    {children}
  </span>
);

const Shortcut = ({
  keys,
  desc,
  delay,
}: {
  keys: { ctrl?: boolean; key: string }[];
  desc: string;
  delay: number;
}) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: '320px 1fr',
      alignItems: 'center',
      gap: 28,
      padding: '12px 0',
      borderBottom: `1px solid ${palette.paperLine}`,
      animation: `lf-fadeUp 500ms ease both ${delay}ms`,
    }}
  >
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      {keys.map((k, i) => (
        <ShortcutKey key={i} ctrl={k.ctrl} k={k.key} withPlus={i < keys.length - 1} />
      ))}
    </div>
    <div style={{ fontSize: 28, color: palette.ink }}>{desc}</div>
  </div>
);

const ShortcutKey = ({ ctrl, k, withPlus }: { ctrl?: boolean; k: string; withPlus: boolean }) => (
  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
    {ctrl && <Kbd>Ctrl</Kbd>}
    {ctrl && <span style={{ fontSize: 22, color: palette.muted }}>+</span>}
    <Kbd>{k}</Kbd>
    {withPlus && <span style={{ width: 8 }} />}
  </span>
);

const LineEditing: Page = () => (
  <PageFrame pageNum={14} eyebrow="STEER WITH YOUR FINGERS">
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
          lineHeight: 1,
          margin: 0,
          animation: 'lf-fadeUp 600ms ease both',
        }}
      >
        Line-editing shortcuts.
      </h2>
      <div
        style={{
          fontSize: 28,
          color: palette.muted,
          marginTop: 12,
          animation: 'lf-fadeUp 600ms ease both 80ms',
        }}
      >
        Stop dragging the arrow keys. These work in bash, zsh, even on remote servers.
      </div>

      <div style={{ marginTop: 36 }}>
        <Shortcut keys={[{ ctrl: true, key: 'A' }]} desc="jump to beginning of line" delay={140} />
        <Shortcut keys={[{ ctrl: true, key: 'E' }]} desc="jump to end of line" delay={200} />
        <Shortcut keys={[{ ctrl: true, key: 'U' }]} desc="clear from cursor to start" delay={260} />
        <Shortcut keys={[{ ctrl: true, key: 'K' }]} desc="clear from cursor to end" delay={320} />
        <Shortcut keys={[{ ctrl: true, key: 'W' }]} desc="delete word backwards" delay={380} />
        <Shortcut keys={[{ ctrl: true, key: 'R' }]} desc="reverse search history" delay={440} />
        <Shortcut keys={[{ ctrl: true, key: 'L' }]} desc="clear the screen" delay={500} />
      </div>
    </div>
  </PageFrame>
);

// ─── 13 — Job control ─────────────────────────────────────────────────────────

const JobControl: Page = () => (
  <PageFrame pageNum={15} eyebrow="BACKGROUND & FOREGROUND">
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
          lineHeight: 1,
          margin: 0,
          animation: 'lf-fadeUp 600ms ease both',
        }}
      >
        Long-running jobs.
      </h2>

      <div
        style={{
          marginTop: 48,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 56,
          alignItems: 'start',
        }}
      >
        <div>
          <CmdRow cmd="cmd &amp;" desc="run in the background" delay={120} />
          <CmdRow cmd="jobs" desc="list jobs you've put aside" delay={180} />
          <CmdRow cmd="fg %1" desc="bring job 1 back to the foreground" delay={240} />
          <CmdRow cmd="bg %1" desc="resume job 1 in the background" delay={300} />
          <CmdRow cmd="Ctrl + Z" desc="suspend the current job" delay={360} />
          <CmdRow cmd="kill %1" desc="send SIGTERM to job 1 — politely ask it to stop" delay={420} />
          <CmdRow cmd="kill -9 %1" desc="SIGKILL — last resort when SIGTERM is ignored" delay={480} />
        </div>

        <Term style={{ animation: 'lf-fadeUp 600ms ease both 240ms' }}>
          <div><Prompt>./long-task.sh &amp;</Prompt></div>
          <div><Out>[1] 4827</Out></div>
          <div style={{ height: 10 }} />
          <div><Prompt>jobs</Prompt></div>
          <div><Out>[1]+  Running   ./long-task.sh</Out></div>
          <div style={{ height: 10 }} />
          <div><Prompt>fg %1</Prompt></div>
          <div><Out>... task output ...</Out><Cursor /></div>
        </Term>
      </div>

      <div
        style={{
          marginTop: 'auto',
          paddingTop: 24,
          fontSize: 26,
          color: palette.muted,
          fontFamily: fontMono,
          animation: 'lf-fadeIn 700ms ease both 560ms',
        }}
      >
        <span style={{ color: palette.coral }}>// </span>
        For jobs that should survive logout, reach for <code>nohup</code>, <code>tmux</code>, or <code>screen</code>.
      </div>
    </div>
  </PageFrame>
);

// ─── 14 — Redirection, pipes, globbing ────────────────────────────────────────

const PipesGlobs: Page = () => (
  <PageFrame pageNum={16} eyebrow="COMPOSE COMMANDS">
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
          lineHeight: 1,
          margin: 0,
          animation: 'lf-fadeUp 600ms ease both',
        }}
      >
        Plumbing &amp; wildcards.
      </h2>

      <div
        style={{
          marginTop: 48,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 56,
          alignItems: 'start',
        }}
      >
        <div>
          <div style={{ fontSize: 32, fontWeight: 700, marginBottom: 16, color: palette.ink, animation: 'lf-fadeUp 600ms ease both 100ms' }}>
            Redirection &amp; pipes
          </div>
          <CmdRow cmd="cmd &gt; file" desc="stdout → file (overwrite)" delay={160} />
          <CmdRow cmd="cmd &gt;&gt; file" desc="stdout → file (append)" delay={220} />
          <CmdRow cmd="cmd 2&gt; file" desc="stderr → file" delay={280} />
          <CmdRow cmd="cmd &lt; file" desc="read stdin from file" delay={340} />
          <CmdRow cmd="cmd1 | cmd2" desc="pipe stdout of cmd1 into cmd2" delay={400} />
        </div>

        <div>
          <div style={{ fontSize: 32, fontWeight: 700, marginBottom: 16, color: palette.ink, animation: 'lf-fadeUp 600ms ease both 220ms' }}>
            Globbing patterns
          </div>
          <CmdRow cmd="*.txt" desc="any name ending in .txt" delay={280} />
          <CmdRow cmd="file?.txt" desc="exactly one char wildcard" delay={340} />
          <CmdRow cmd="[abc]*" desc="anything starting with a, b, or c" delay={400} />
          <CmdRow cmd="[!a]*" desc="anything NOT starting with a" delay={460} />
          <CmdRow cmd="{a,b,c}.txt" desc="brace expansion → a.txt b.txt c.txt" delay={520} />
        </div>
      </div>

      <div
        style={{
          marginTop: 'auto',
          paddingTop: 24,
          fontSize: 26,
          color: palette.muted,
          fontFamily: fontMono,
          animation: 'lf-fadeIn 700ms ease both 600ms',
        }}
      >
        <span style={{ color: palette.coral }}>// </span>
        <code>&amp;&gt; file</code> grabs both streams at once. Example: <code>cat *.log | grep ERROR &gt; errors.txt</code>.
      </div>
    </div>
  </PageFrame>
);

// ─── 16 — Text tools ──────────────────────────────────────────────────────────

const TextTools: Page = () => (
  <PageFrame pageNum={17} eyebrow="SHAPE THE STREAM">
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
          lineHeight: 1,
          margin: 0,
          animation: 'lf-fadeUp 600ms ease both',
        }}
      >
        Slice the stream.
      </h2>
      <div
        style={{
          fontSize: 28,
          color: palette.muted,
          marginTop: 14,
          maxWidth: 1400,
          animation: 'lf-fadeUp 600ms ease both 80ms',
        }}
      >
        Once data flows through a pipe, these are the tools that filter, reshape, and count.
      </div>

      <div style={{ marginTop: 44 }}>
        <TwoCol
          left={
            <div>
              <CmdRow cmd="grep <pat>" desc="lines matching pattern — -i case, -v invert, -r recurse" delay={140} />
              <CmdRow cmd="cut -d: -f1" desc="split each line by delimiter, take field N" delay={220} />
              <CmdRow cmd="sort -u" desc="sort lines, drop duplicates (-n for numeric)" delay={300} />
              <CmdRow cmd="wc -l" desc="count lines (-w words, -c bytes)" delay={380} />
              <CmdRow cmd="tr ':' '\\n'" desc="translate characters — or -d to delete" delay={460} />
              <CmdRow cmd="tee file" desc="copy stdin to file AND pass it through" delay={540} />
            </div>
          }
          right={
            <Term style={{ animation: 'lf-fadeUp 600ms ease both 220ms' }}>
              <div><Prompt>cut -d: -f1 /etc/passwd | sort | head -n 5</Prompt></div>
              <div><Out>bin</Out></div>
              <div><Out>daemon</Out></div>
              <div><Out>nobody</Out></div>
              <div><Out>root</Out></div>
              <div><Out>student</Out></div>
              <div style={{ height: 10 }} />
              <div><Prompt>grep -v &apos;^#&apos; /etc/services | wc -l</Prompt></div>
              <div><Out>582</Out><Cursor /></div>
            </Term>
          }
        />
      </div>

      <div
        style={{
          marginTop: 'auto',
          paddingTop: 24,
          fontSize: 26,
          color: palette.muted,
          fontFamily: fontMono,
          animation: 'lf-fadeIn 700ms ease both 620ms',
        }}
      >
        <span style={{ color: palette.coral }}>// </span>
        Need to feed args into a command? <code>xargs</code> turns lines from stdin into command arguments.
      </div>
    </div>
  </PageFrame>
);

// ─── 17 — PATH ────────────────────────────────────────────────────────────────

const PathSeg = ({ label, idx }: { label: string; idx: number }) => (
  <div
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      animation: `lf-fadeUp 500ms ease both ${120 + idx * 80}ms`,
    }}
  >
    <span
      style={{
        fontFamily: fontMono,
        fontSize: 30,
        background: palette.paperTint,
        border: `2px solid ${palette.ink}`,
        borderRadius: 6,
        padding: '6px 12px',
        color: idx === 0 ? palette.coral : palette.ink,
        fontWeight: idx === 0 ? 700 : 400,
      }}
    >
      {label}
    </span>
    {idx < 3 && <span style={{ fontFamily: fontMono, fontSize: 32, color: palette.muted }}>:</span>}
  </div>
);

const Path: Page = () => (
  <PageFrame pageNum={18} eyebrow="WHERE COMMANDS LIVE">
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
          lineHeight: 1,
          margin: 0,
          animation: 'lf-fadeUp 600ms ease both',
        }}
      >
        <code style={{ fontFamily: fontMono, color: palette.coral }}>$PATH</code>.
      </h2>
      <div
        style={{
          fontSize: 30,
          color: palette.muted,
          marginTop: 12,
          maxWidth: 1400,
          animation: 'lf-fadeUp 600ms ease both 80ms',
        }}
      >
        A colon-separated list of directories. When you type a command, the shell walks the list — first match wins.
      </div>

      <div
        style={{
          marginTop: 48,
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          flexWrap: 'wrap',
        }}
      >
        <PathSeg label="/usr/local/bin" idx={0} />
        <PathSeg label="/usr/bin" idx={1} />
        <PathSeg label="/bin" idx={2} />
        <PathSeg label="/home/student/bin" idx={3} />
      </div>

      <div
        style={{
          marginTop: 12,
          fontFamily: fontMono,
          fontSize: 22,
          color: palette.muted,
          animation: 'lf-fadeIn 600ms ease both 480ms',
        }}
      >
        ↑ checked left-to-right · first <code>ls</code> found wins
      </div>

      <div style={{ marginTop: 48 }}>
        <TwoCol
          left={
            <div>
              <CmdRow cmd="echo $PATH" desc="what's on the path right now" delay={520} />
              <CmdRow cmd="echo $PATH | tr ':' '\\n'" desc="pretty-print one directory per line" delay={580} />
              <CmdRow cmd="which ls" desc="which one will actually run" delay={640} />
              <CmdRow cmd='export PATH=$HOME/bin:$PATH' desc="prepend your own bin dir (add to ~/.bashrc or ~/.zshrc to persist)" delay={700} />
            </div>
          }
          right={
            <div
              style={{
                background: palette.paperTint,
                border: `2px solid ${palette.coral}`,
                borderRadius: 12,
                padding: '24px 28px',
                fontSize: 24,
                lineHeight: 1.5,
                color: palette.ink,
                animation: 'lf-fadeUp 600ms ease both 760ms',
              }}
            >
              <div style={{ fontWeight: 700, marginBottom: 8, color: palette.coral, fontFamily: fontMono, fontSize: 22 }}>
                CAREFUL.
              </div>
              Never remove <code>/usr/bin</code> from <code>$PATH</code>. You will lose access to <code>ls</code>, <code>cat</code>, <code>rm</code> — and the ability to fix it.
            </div>
          }
        />
      </div>
    </div>
  </PageFrame>
);

// ─── 16 — Prompt customization (PS1) ──────────────────────────────────────────

const Ps1Code = ({ code, desc, delay }: { code: string; desc: string; delay: number }) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: '100px 1fr',
      alignItems: 'baseline',
      gap: 24,
      padding: '10px 0',
      borderBottom: `1px solid ${palette.paperLine}`,
      animation: `lf-fadeUp 500ms ease both ${delay}ms`,
    }}
  >
    <code style={{ fontFamily: fontMono, fontSize: 30, color: 'var(--osd-accent)', fontWeight: 600 }}>{code}</code>
    <div style={{ fontSize: 24, lineHeight: 1.4, color: palette.ink }}>{desc}</div>
  </div>
);

const PromptPage: Page = () => (
  <PageFrame pageNum={19} eyebrow="MAKE IT YOURS">
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
          lineHeight: 1,
          margin: 0,
          animation: 'lf-fadeUp 600ms ease both',
        }}
      >
        Customize your prompt.
      </h2>

      <div
        style={{
          marginTop: 48,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 56,
          alignItems: 'start',
        }}
      >
        <div>
          <div style={{ fontSize: 28, color: palette.muted, marginBottom: 20 }}>
            <code style={{ fontFamily: fontMono, color: palette.ink, fontWeight: 600 }}>PS1</code> escape codes:
          </div>
          <Ps1Code code="\\u" desc="username" delay={120} />
          <Ps1Code code="\\h" desc="hostname (short)" delay={180} />
          <Ps1Code code="\\w" desc="working dir (full path)" delay={240} />
          <Ps1Code code="\\W" desc="working dir (basename only)" delay={300} />
          <Ps1Code code="\\t" desc="time HH:MM:SS" delay={360} />
          <Ps1Code code="\\$" desc='$ for user, # for root' delay={420} />
        </div>

        <div style={{ animation: 'lf-fadeUp 600ms ease both 280ms' }}>
          <div style={{ fontSize: 28, color: palette.muted, marginBottom: 20 }}>Example — colored prompt:</div>
          <Term>
            <div style={{ color: term.muted, fontSize: 22 }}>~/.bashrc</div>
            <div style={{ marginTop: 8 }}>
              export PS1=&apos;<span style={{ color: '#2BB3A3' }}>\u@\h</span>{' '}
              <span style={{ color: '#4A90E2' }}>\w</span> \$ &apos;
            </div>
            <div style={{ height: 16 }} />
            <div style={{ color: term.muted, fontSize: 22 }}>becomes:</div>
            <div style={{ marginTop: 8 }}>
              <span style={{ color: '#2BB3A3' }}>student@laptop</span>{' '}
              <span style={{ color: '#4A90E2' }}>~/devops/linux</span> $ <Cursor />
            </div>
          </Term>
        </div>
      </div>
    </div>
  </PageFrame>
);

// ─── 19 — Scripting 101 ───────────────────────────────────────────────────────

const Scripting101: Page = () => (
  <PageFrame pageNum={20} eyebrow="A TEASER FOR COURSE 02">
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
          lineHeight: 1,
          margin: 0,
          animation: 'lf-fadeUp 600ms ease both',
        }}
      >
        From one-liners to scripts.
      </h2>
      <div
        style={{
          fontSize: 28,
          color: palette.muted,
          marginTop: 14,
          maxWidth: 1400,
          animation: 'lf-fadeUp 600ms ease both 80ms',
        }}
      >
        Five primitives turn any shell command into a reusable, parameterised script.
      </div>

      <div style={{ marginTop: 44 }}>
        <TwoCol
          left={
            <div>
              <CmdRow cmdWidth={360} cmd="#!/usr/bin/env bash" desc="shebang — first line tells the OS which interpreter to run" delay={140} />
              <CmdRow cmdWidth={360} cmd="chmod +x file.sh" desc="mark the file executable, then run it as ./file.sh" delay={220} />
              <CmdRow cmdWidth={360} cmd='"${1:-friend}"' desc="first arg, or fall back to a default when nothing's passed" delay={300} />
              <CmdRow cmdWidth={360} cmd="<<'EOF' ... EOF" desc="heredoc — inline a multi-line block as stdin" delay={380} />
              <CmdRow cmdWidth={360} cmd="export FOO=bar" desc="set an env var that child processes can see" delay={460} />
            </div>
          }
          right={
            <Term style={{ animation: 'lf-fadeUp 600ms ease both 220ms' }}>
              <div><Out># greet.sh</Out></div>
              <div>{'#!/usr/bin/env bash'}</div>
              <div style={{ height: 10 }} />
              <div>{'name="${1:-friend}"'}</div>
              <div>{'export GREET_LANG="${LANG:-en}"'}</div>
              <div style={{ height: 10 }} />
              <div>{"cat <<EOF"}</div>
              <div>{'Hello, ${name}!'}</div>
              <div>{'Shell: $SHELL'}</div>
              <div>{'EOF'}</div>
              <div style={{ height: 10 }} />
              <div><Prompt>chmod +x greet.sh &amp;&amp; ./greet.sh Alex</Prompt></div>
              <div><Out>Hello, Alex!</Out><Cursor /></div>
            </Term>
          }
        />
      </div>

      <div
        style={{
          marginTop: 'auto',
          paddingTop: 24,
          fontSize: 26,
          color: palette.muted,
          fontFamily: fontMono,
          animation: 'lf-fadeIn 700ms ease both 620ms',
        }}
      >
        <span style={{ color: palette.coral }}>// </span>
        Course 02 — <em>Shell Scripting</em> — picks this up. Control flow, traps, robust scripts.
      </div>
    </div>
  </PageFrame>
);

// ─── 21 — Pause / Questions (end of Power-ups) ────────────────────────────────

const PowerupsPause: Page = () => (
  <PausePage pageNum={21} section="Power-ups" next="Under the hood.">
    <li>aliases · history expansion · line-editing shortcuts</li>
    <li>jobs — <code>bg</code> / <code>fg</code> · <code>kill</code> · signals</li>
    <li>composition — pipes · redirection · globbing</li>
    <li>stream tools — <code>grep</code> · <code>cut</code> · <code>sort</code> · <code>wc</code> · <code>tr</code> · <code>tee</code></li>
    <li><code>$PATH</code>, your prompt, and a teaser of shell scripting</li>
  </PausePage>
);

// ─── 22 — Section divider: Under the hood ─────────────────────────────────────

const UnderHoodDivider: Page = () => (
  <SectionDivider
    num="03"
    label="Under the hood."
    blurb="Beneath every command is a kernel, a process, and a thousand syscalls. Knowing what's down there turns 'magic' into engineering."
    pageNum={22}
  />
);

// ─── 18 — Kernel & user space ─────────────────────────────────────────────────

const KernelUserSpace: Page = () => (
  <PageFrame pageNum={23} eyebrow="THE BOUNDARY">
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
          lineHeight: 1,
          margin: 0,
          animation: 'lf-fadeUp 600ms ease both',
        }}
      >
        Kernel &amp; user space.
      </h2>

      <div
        style={{
          marginTop: 56,
          display: 'grid',
          gridTemplateColumns: '1.1fr 0.9fr',
          gap: 56,
          alignItems: 'start',
        }}
      >
        <div style={{ animation: 'lf-fadeUp 600ms ease both 120ms' }}>
          <p style={{ fontSize: 32, lineHeight: 1.45, margin: 0 }}>
            Think of the kernel as a <strong style={{ color: palette.coral }}>hotel manager</strong>.
          </p>
          <p style={{ fontSize: 28, lineHeight: 1.5, color: palette.muted, margin: '20px 0 0', maxWidth: 700 }}>
            Guests (your programs) don&apos;t walk into the kitchen. They ring the bell and ask. The kernel decides what&apos;s allowed, talks to the hardware, and delivers the answer back.
          </p>
          <p style={{ fontSize: 28, lineHeight: 1.5, color: palette.muted, margin: '20px 0 0', maxWidth: 700 }}>
            Every <code style={{ fontFamily: fontMono }}>read</code>, <code style={{ fontFamily: fontMono }}>write</code>, or <code style={{ fontFamily: fontMono }}>open</code> is a <strong style={{ color: palette.ink }}>system call</strong> — a request the kernel handles for you.
          </p>
        </div>

        <Term style={{ animation: 'lf-fadeUp 600ms ease both 280ms' }}>
          <div style={{ color: term.muted, fontSize: 22 }}># peek behind the curtain</div>
          <div><Prompt>strace ls /tmp 2&gt;&amp;1 | head</Prompt></div>
          <div style={{ height: 8 }} />
          <div><Out>execve(&quot;/bin/ls&quot;, ...)</Out></div>
          <div><Out>brk(NULL)</Out></div>
          <div><Out>openat(AT_FDCWD, &quot;/tmp&quot;, ...)</Out></div>
          <div><Out>getdents64(3, ...)</Out></div>
          <div><Out>write(1, &quot;...&quot;, 12)</Out></div>
          <div><Out>close(3)</Out><Cursor /></div>
        </Term>
      </div>

      <div
        style={{
          marginTop: 'auto',
          paddingTop: 24,
          fontSize: 26,
          color: palette.muted,
          fontFamily: fontMono,
          animation: 'lf-fadeIn 700ms ease both 560ms',
        }}
      >
        <div>
          <span style={{ color: palette.coral }}>// </span>
          Every line of <code>strace</code> output is a conversation between user space and the kernel.
        </div>
        <div style={{ marginTop: 6 }}>
          <span style={{ color: palette.coral }}>// </span>
          Peek at the kernel&apos;s view: <code>/proc/cpuinfo</code>&nbsp;·&nbsp;<code>/proc/meminfo</code>&nbsp;·&nbsp;<code>ps aux</code>&nbsp;·&nbsp;<code>ls -l /proc/1/exe</code>
        </div>
      </div>
    </div>
  </PageFrame>
);

// ─── 22 — sudo ────────────────────────────────────────────────────────────────

const Sudo: Page = () => (
  <PageFrame pageNum={24} eyebrow="ELEVATE WITH CARE">
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
          lineHeight: 1,
          margin: 0,
          animation: 'lf-fadeUp 600ms ease both',
        }}
      >
        <code style={{ fontFamily: fontMono, color: palette.coral }}>sudo</code>.
      </h2>
      <div
        style={{
          fontSize: 30,
          color: palette.muted,
          marginTop: 12,
          animation: 'lf-fadeUp 600ms ease both 80ms',
        }}
      >
        Borrow root&apos;s powers for one command — and only when you really need to.
      </div>

      <div
        style={{
          marginTop: 48,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 56,
          alignItems: 'start',
        }}
      >
        <div>
          <CmdRow cmd="sudo <cmd>" desc="run cmd as root, just this once" delay={120} />
          <CmdRow cmd="sudo -i" desc="open an interactive root shell" delay={200} />
          <CmdRow cmd="sudo -l" desc="list what you're allowed to do" delay={280} />
          <CmdRow cmd="sudo !!" desc="rerun the previous command with sudo" delay={360} />
          <CmdRow cmd="visudo" desc="safely edit /etc/sudoers" delay={440} />
        </div>

        <div
          style={{
            background: palette.paperTint,
            border: `2px solid ${palette.coral}`,
            borderRadius: 12,
            padding: '28px 32px',
            fontSize: 26,
            lineHeight: 1.5,
            animation: 'lf-fadeUp 600ms ease both 320ms',
          }}
        >
          <div style={{ fontFamily: fontMono, fontSize: 22, color: palette.coral, fontWeight: 700, marginBottom: 12 }}>
            FROM XKCD #149
          </div>
          <div style={{ fontFamily: fontMono, color: palette.muted }}>
            <Prompt>make me a sandwich</Prompt>
          </div>
          <div style={{ fontFamily: fontMono, color: palette.muted }}>
            <Out>What? Make it yourself.</Out>
          </div>
          <div style={{ fontFamily: fontMono, color: palette.muted, marginTop: 6 }}>
            <Prompt>sudo make me a sandwich</Prompt>
          </div>
          <div style={{ fontFamily: fontMono, color: palette.muted }}>
            <Out>Okay.</Out>
          </div>
        </div>
      </div>
    </div>
  </PageFrame>
);

// ─── 20 — Boot process ────────────────────────────────────────────────────────

const BootStage = ({
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
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: 12,
      animation: `lf-fadeUp 600ms ease both ${delay}ms`,
    }}
  >
    <div
      style={{
        width: 220,
        minHeight: 100,
        borderRadius: 14,
        background: palette.paperTint,
        border: `2px solid ${palette.ink}`,
        boxShadow: `6px 6px 0 ${palette.coral}`,
        padding: '16px 20px',
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
      }}
    >
      <div style={{ fontFamily: fontMono, fontSize: 18, color: palette.muted, letterSpacing: '0.18em' }}>
        STEP {index}
      </div>
      <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.01em' }}>{title}</div>
    </div>
    <div style={{ fontSize: 22, lineHeight: 1.4, color: palette.muted, width: 220 }}>{body}</div>
  </div>
);

const BootArrow = ({ delay }: { delay: number }) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      paddingTop: 30,
      animation: `lf-fadeIn 500ms ease both ${delay}ms`,
    }}
  >
    <SketchArrow width={80} height={36} />
  </div>
);

const BootProcess: Page = () => (
  <PageFrame pageNum={25} eyebrow="POWER ON TO LOGIN">
    <div
      style={{
        position: 'absolute',
        inset: 0,
        padding: '160px 80px 100px',
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
          lineHeight: 1,
          margin: 0,
          paddingLeft: 80,
          animation: 'lf-fadeUp 600ms ease both',
        }}
      >
        The boot process.
      </h2>

      <div
        style={{
          marginTop: 64,
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          gap: 8,
        }}
      >
        <BootStage index="01" title="BIOS / UEFI" body="firmware wakes up, checks hardware, picks a boot device" delay={120} />
        <BootArrow delay={220} />
        <BootStage index="02" title="GRUB" body="bootloader chooses a kernel and loads it into RAM" delay={260} />
        <BootArrow delay={360} />
        <BootStage index="03" title="Kernel + initrd" body="kernel starts, mounts a minimal root filesystem" delay={400} />
        <BootArrow delay={500} />
        <BootStage index="04" title="systemd" body="PID 1 — brings services online in dependency order" delay={540} />
        <BootArrow delay={640} />
        <BootStage index="05" title="Login shell" body="getty or display manager hands you a prompt" delay={680} />
      </div>

      <div
        style={{
          marginTop: 'auto',
          paddingTop: 24,
          paddingLeft: 80,
          fontSize: 26,
          color: palette.muted,
          fontFamily: fontMono,
          animation: 'lf-fadeIn 700ms ease both 800ms',
        }}
      >
        <span style={{ color: palette.coral }}>// </span>
        Investigate the timeline with <code>dmesg</code> and <code>journalctl -b</code>.
      </div>
    </div>
  </PageFrame>
);

// ─── 21 — systemd targets ─────────────────────────────────────────────────────

const TargetRow = ({
  rl,
  target,
  desc,
  delay,
}: {
  rl: string;
  target: string;
  desc: string;
  delay: number;
}) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: '140px 380px 1fr',
      alignItems: 'baseline',
      gap: 32,
      padding: '14px 0',
      borderBottom: `1px solid ${palette.paperLine}`,
      animation: `lf-fadeUp 500ms ease both ${delay}ms`,
    }}
  >
    <div style={{ fontFamily: fontMono, fontSize: 30, color: 'var(--osd-accent)', fontWeight: 600 }}>{rl}</div>
    <code style={{ fontFamily: fontMono, fontSize: 26, color: palette.ink }}>{target}</code>
    <div style={{ fontSize: 24, color: palette.muted }}>{desc}</div>
  </div>
);

const SystemdTargets: Page = () => (
  <PageFrame pageNum={26} eyebrow="RUNTIME MODES">
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
          lineHeight: 1,
          margin: 0,
          animation: 'lf-fadeUp 600ms ease both',
        }}
      >
        systemd targets.
      </h2>
      <div
        style={{
          fontSize: 28,
          color: palette.muted,
          marginTop: 12,
          maxWidth: 1300,
          animation: 'lf-fadeUp 600ms ease both 80ms',
        }}
      >
        Old SysV runlevels mapped onto modern systemd. Targets are named groups of services brought up together.
      </div>

      <div style={{ marginTop: 36 }}>
        <TargetRow rl="0" target="poweroff.target" desc="halt the machine" delay={120} />
        <TargetRow rl="1" target="rescue.target" desc="single-user maintenance mode" delay={180} />
        <TargetRow rl="3" target="multi-user.target" desc="full multi-user, no GUI (servers)" delay={240} />
        <TargetRow rl="5" target="graphical.target" desc="full multi-user with display manager" delay={300} />
        <TargetRow rl="6" target="reboot.target" desc="restart" delay={360} />
      </div>

      <div
        style={{
          marginTop: 36,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          rowGap: 10,
          columnGap: 48,
          fontFamily: fontMono,
          fontSize: 22,
          color: palette.ink,
          animation: 'lf-fadeUp 600ms ease both 440ms',
        }}
      >
        <span><span style={{ color: palette.coral }}>$ </span>systemctl get-default</span>
        <span><span style={{ color: palette.coral }}>$ </span>{'journalctl -u <svc> -f'}</span>
        <span><span style={{ color: palette.coral }}>$ </span>systemctl list-units --type=service</span>
        <span><span style={{ color: palette.coral }}>$ </span>journalctl -p err -b</span>
        <span><span style={{ color: palette.coral }}>$ </span>{'systemctl status <svc>'}</span>
        <span><span style={{ color: palette.coral }}>$ </span>journalctl --list-boots</span>
        <span><span style={{ color: palette.coral }}>$ </span>{'systemctl cat <svc>'}</span>
        <span><span style={{ color: palette.coral }}>$ </span>systemd-analyze blame</span>
      </div>
    </div>
  </PageFrame>
);

// ─── 22 — Everything is a file + FHS ──────────────────────────────────────────

const FtRow = ({
  symbol,
  name,
  example,
  delay,
}: {
  symbol: string;
  name: string;
  example: string;
  delay: number;
}) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: '60px 180px 1fr',
      alignItems: 'baseline',
      gap: 16,
      padding: '8px 0',
      borderBottom: `1px solid ${palette.paperLine}`,
      animation: `lf-fadeUp 400ms ease both ${delay}ms`,
    }}
  >
    <code style={{ fontFamily: fontMono, fontSize: 32, color: palette.coral, fontWeight: 700 }}>{symbol}</code>
    <div style={{ fontSize: 22, color: palette.ink, fontWeight: 600 }}>{name}</div>
    <code style={{ fontFamily: fontMono, fontSize: 20, color: palette.muted }}>{example}</code>
  </div>
);

const FhsRow = ({ dir, desc, delay }: { dir: string; desc: string; delay: number }) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: '120px 1fr',
      alignItems: 'baseline',
      gap: 16,
      padding: '6px 0',
      animation: `lf-fadeUp 400ms ease both ${delay}ms`,
    }}
  >
    <code style={{ fontFamily: fontMono, fontSize: 22, color: 'var(--osd-accent)', fontWeight: 600 }}>{dir}</code>
    <div style={{ fontSize: 20, color: palette.muted }}>{desc}</div>
  </div>
);

const FilesAndFhs: Page = () => (
  <PageFrame pageNum={27} eyebrow="EVERYTHING IS A FILE">
    <div
      style={{
        position: 'absolute',
        inset: 0,
        padding: '160px 100px 80px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <h2
        style={{
          fontFamily: 'var(--osd-font-display)',
          fontSize: 80,
          fontWeight: 900,
          letterSpacing: '-0.035em',
          lineHeight: 1,
          margin: 0,
          paddingLeft: 60,
          animation: 'lf-fadeUp 600ms ease both',
        }}
      >
        Seven file types &amp; the FHS.
      </h2>

      <div
        style={{
          marginTop: 40,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 56,
          paddingLeft: 60,
          paddingRight: 60,
        }}
      >
        <div>
          <div style={{ fontSize: 24, color: palette.muted, fontFamily: fontMono, marginBottom: 12 }}>
            FILE TYPE · SYMBOL · EXAMPLE
          </div>
          <FtRow symbol="-" name="regular file" example="/etc/hosts" delay={140} />
          <FtRow symbol="d" name="directory" example="/var/log" delay={190} />
          <FtRow symbol="l" name="symlink" example="/bin → /usr/bin" delay={240} />
          <FtRow symbol="c" name="char device" example="/dev/tty1" delay={290} />
          <FtRow symbol="b" name="block device" example="/dev/sda1" delay={340} />
          <FtRow symbol="p" name="named pipe (FIFO)" example="/run/initctl" delay={390} />
          <FtRow symbol="s" name="socket" example="/var/run/docker.sock" delay={440} />
        </div>

        <div>
          <div style={{ fontSize: 24, color: palette.muted, fontFamily: fontMono, marginBottom: 12 }}>
            FHS · TOP-LEVEL DIRECTORIES
          </div>
          <FhsRow dir="/bin" desc="essential user binaries" delay={140} />
          <FhsRow dir="/etc" desc="system configuration" delay={180} />
          <FhsRow dir="/home" desc="user home directories" delay={220} />
          <FhsRow dir="/root" desc="root user's home (not under /home)" delay={260} />
          <FhsRow dir="/var" desc="variable data — logs, caches, spools" delay={300} />
          <FhsRow dir="/usr" desc="user programs &amp; libraries" delay={340} />
          <FhsRow dir="/opt" desc="third-party / optional packages" delay={380} />
          <FhsRow dir="/tmp" desc="ephemeral scratch space" delay={420} />
          <FhsRow dir="/proc" desc="live view into the kernel (processes)" delay={460} />
          <FhsRow dir="/sys" desc="live view into the kernel (devices, drivers)" delay={500} />
          <FhsRow dir="/dev" desc="device files" delay={540} />
        </div>
      </div>

      <div
        style={{
          marginTop: 'auto',
          paddingTop: 24,
          paddingLeft: 60,
          fontSize: 26,
          color: palette.muted,
          fontFamily: fontMono,
          animation: 'lf-fadeIn 700ms ease both 600ms',
        }}
      >
        <span style={{ color: palette.coral }}>// </span>
        From your terminal: <code>man hier</code> — the canonical tour of the filesystem.
      </div>
    </div>
  </PageFrame>
);

// ─── 28 — Pause / Questions (end of Under the hood) ───────────────────────────

const HoodPause: Page = () => (
  <PausePage pageNum={28} section="Under the hood" next="Operating the system.">
    <li>kernel &amp; user space — every command is a system call</li>
    <li><code>sudo</code> · the boot process · systemd targets &amp; services</li>
    <li>seven file types and the FHS — where everything lives</li>
  </PausePage>
);

// ─── 29 — Section divider: Operating the system ───────────────────────────────

const Part4Divider: Page = () => (
  <SectionDivider
    num="04"
    label="Operating it."
    blurb="The shell is great. But on a real box you also install software, edit configs, manage users, mount disks, and write services that survive a reboot. That's the daily work."
    pageNum={29}
  />
);

// ─── 30 — Package management: apt + dpkg ─────────────────────────────────────

const PkgColHeader = ({ tool, distros, delay }: { tool: string; distros: string; delay: number }) => (
  <div style={{ marginBottom: 14, animation: `lf-fadeUp 500ms ease both ${delay}ms` }}>
    <code style={{ fontFamily: fontMono, fontSize: 34, color: 'var(--osd-accent)', fontWeight: 700 }}>{tool}</code>
    <span style={{ fontFamily: fontMono, fontSize: 20, color: palette.muted, marginLeft: 14 }}>{distros}</span>
  </div>
);

const PackageManagementApt: Page = () => (
  <PageFrame pageNum={30} eyebrow="DEBIAN · UBUNTU">
    <div style={{ position: 'absolute', inset: 0, padding: '160px 160px 100px', display: 'flex', flexDirection: 'column' }}>
      <h2 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 88, fontWeight: 900, letterSpacing: '-0.035em', lineHeight: 1, margin: 0, animation: 'lf-fadeUp 600ms ease both' }}>
        <code style={{ fontFamily: fontMono, color: palette.coral }}>apt</code> &amp; <code style={{ fontFamily: fontMono, color: palette.coral }}>dpkg</code>.
      </h2>
      <div style={{ fontSize: 28, color: palette.muted, marginTop: 14, maxWidth: 1400, animation: 'lf-fadeUp 600ms ease both 80ms' }}>
        <code>apt</code> resolves dependencies for you. <code>dpkg</code> is the low-level tool — reach for it with local <code>.deb</code> files or to query what&apos;s installed.
      </div>

      <div style={{ marginTop: 40, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'start' }}>
        <div>
          <PkgColHeader tool="apt" distros="high-level · resolves deps" delay={120} />
          <CmdRow cmdWidth={340} cmd="apt update" desc="refresh the package index" delay={180} />
          <CmdRow cmdWidth={340} cmd="apt install <p>" desc="install + dependencies" delay={240} />
          <CmdRow cmdWidth={340} cmd="apt upgrade" desc="upgrade everything" delay={300} />
          <CmdRow cmdWidth={340} cmd="apt remove <p>" desc="remove (keeps configs)" delay={360} />
          <CmdRow cmdWidth={340} cmd="apt purge <p>" desc="remove + configs" delay={420} />
          <CmdRow cmdWidth={340} cmd="apt search <q>" desc="find what's available" delay={480} />
          <CmdRow cmdWidth={340} cmd="apt show <p>" desc="details, deps, size" delay={540} />
        </div>
        <div>
          <PkgColHeader tool="dpkg" distros="low-level · operates on .deb" delay={200} />
          <CmdRow cmdWidth={380} cmd="dpkg -i <file>" desc="install a local .deb" delay={260} />
          <CmdRow cmdWidth={380} cmd="dpkg -r <p>" desc="remove (keeps configs)" delay={320} />
          <CmdRow cmdWidth={380} cmd="dpkg -P <p>" desc="purge — remove + configs" delay={380} />
          <CmdRow cmdWidth={380} cmd="dpkg -l" desc="list every installed pkg" delay={440} />
          <CmdRow cmdWidth={380} cmd="dpkg -L <p>" desc="list files in package" delay={500} />
          <CmdRow cmdWidth={380} cmd="dpkg -S <file>" desc="which pkg owns this?" delay={560} />
          <CmdRow cmdWidth={380} cmd="dpkg --configure -a" desc="recover an interrupted install" delay={620} />
        </div>
      </div>

      <div style={{ marginTop: 'auto', paddingTop: 24, fontSize: 26, color: palette.muted, fontFamily: fontMono, animation: 'lf-fadeIn 700ms ease both 700ms' }}>
        <span style={{ color: palette.coral }}>// </span>
        When <code>dpkg -i</code> complains about missing deps: <code>apt -f install</code> fixes them up.
      </div>
    </div>
  </PageFrame>
);

// ─── 31 — Package management: dnf + rpm ──────────────────────────────────────

const PackageManagementDnf: Page = () => (
  <PageFrame pageNum={31} eyebrow="RHEL · FEDORA · ROCKY · ALMA">
    <div style={{ position: 'absolute', inset: 0, padding: '160px 160px 100px', display: 'flex', flexDirection: 'column' }}>
      <h2 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 88, fontWeight: 900, letterSpacing: '-0.035em', lineHeight: 1, margin: 0, animation: 'lf-fadeUp 600ms ease both' }}>
        <code style={{ fontFamily: fontMono, color: palette.coral }}>dnf</code> &amp; <code style={{ fontFamily: fontMono, color: palette.coral }}>rpm</code>.
      </h2>
      <div style={{ fontSize: 28, color: palette.muted, marginTop: 14, maxWidth: 1400, animation: 'lf-fadeUp 600ms ease both 80ms' }}>
        <code>dnf</code> resolves dependencies for you. <code>rpm</code> is the low-level tool — reach for it with local <code>.rpm</code> files or to query what&apos;s installed.
      </div>

      <div style={{ marginTop: 40, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'start' }}>
        <div>
          <PkgColHeader tool="dnf" distros="high-level · resolves deps" delay={120} />
          <CmdRow cmdWidth={340} cmd="dnf check-update" desc="what updates are pending" delay={180} />
          <CmdRow cmdWidth={340} cmd="dnf install <p>" desc="install + dependencies" delay={240} />
          <CmdRow cmdWidth={340} cmd="dnf upgrade" desc="upgrade everything" delay={300} />
          <CmdRow cmdWidth={340} cmd="dnf remove <p>" desc="remove the package" delay={360} />
          <CmdRow cmdWidth={340} cmd="dnf autoremove" desc="drop orphaned deps" delay={420} />
          <CmdRow cmdWidth={340} cmd="dnf search <q>" desc="find what's available" delay={480} />
          <CmdRow cmdWidth={340} cmd="dnf info <p>" desc="details, deps, repo" delay={540} />
        </div>
        <div>
          <PkgColHeader tool="rpm" distros="low-level · operates on .rpm" delay={200} />
          <CmdRow cmdWidth={340} cmd="rpm -ivh <file>" desc="install a local .rpm" delay={260} />
          <CmdRow cmdWidth={340} cmd="rpm -Uvh <file>" desc="upgrade or install" delay={320} />
          <CmdRow cmdWidth={340} cmd="rpm -e <p>" desc="erase (remove)" delay={380} />
          <CmdRow cmdWidth={340} cmd="rpm -qa" desc="query all installed" delay={440} />
          <CmdRow cmdWidth={340} cmd="rpm -ql <p>" desc="list files in package" delay={500} />
          <CmdRow cmdWidth={340} cmd="rpm -qf <file>" desc="which pkg owns this?" delay={560} />
          <CmdRow cmdWidth={340} cmd="rpm -qi <p>" desc="package info" delay={620} />
        </div>
      </div>

      <div style={{ marginTop: 'auto', paddingTop: 24, fontSize: 26, color: palette.muted, fontFamily: fontMono, animation: 'lf-fadeIn 700ms ease both 700ms' }}>
        <span style={{ color: palette.coral }}>// </span>
        Arch uses <code>pacman -Syu / -S / -R</code>. Cross-distro: <code>snap</code>, <code>flatpak</code>, <code>brew</code>.
      </div>
    </div>
  </PageFrame>
);

// ─── 31 — Managing repos ──────────────────────────────────────────────────────

const RepoRow = ({ k, v, last }: { k: string; v: string; last?: boolean }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 4, paddingBottom: 12, marginBottom: 12, borderBottom: last ? 'none' : `1px solid ${palette.paperLine}` }}>
    <code style={{ fontFamily: fontMono, fontSize: 22, color: palette.coral, fontWeight: 600 }}>{k}</code>
    <div style={{ fontSize: 22, lineHeight: 1.4, color: palette.ink }}>{v}</div>
  </div>
);

const RepoManagement: Page = () => (
  <PageFrame pageNum={32} eyebrow="WHERE PACKAGES COME FROM">
    <div style={{ position: 'absolute', inset: 0, padding: '160px 160px 100px', display: 'flex', flexDirection: 'column' }}>
      <h2 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 88, fontWeight: 900, letterSpacing: '-0.035em', lineHeight: 1, margin: 0, animation: 'lf-fadeUp 600ms ease both' }}>
        Add, list, disable a repo.
      </h2>
      <div style={{ fontSize: 28, color: palette.muted, marginTop: 14, maxWidth: 1400, animation: 'lf-fadeUp 600ms ease both 80ms' }}>
        A repository is a signed URL the package manager pulls from. Add one to install software outside the base distro.
      </div>

      <div style={{ marginTop: 36, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'start' }}>
        <div style={{ animation: 'lf-fadeUp 600ms ease both 140ms' }}>
          <div style={{ marginBottom: 14 }}>
            <code style={{ fontFamily: fontMono, fontSize: 34, color: 'var(--osd-accent)', fontWeight: 700 }}>apt</code>
            <span style={{ fontFamily: fontMono, fontSize: 20, color: palette.muted, marginLeft: 14 }}>Debian · Ubuntu</span>
          </div>
          <div style={{ background: palette.paperTint, border: `2px solid ${palette.ink}`, borderRadius: 12, padding: '20px 24px', boxShadow: `6px 6px 0 ${palette.paperLine}` }}>
            <RepoRow k="/etc/apt/sources.list" v="main list — distro defaults live here" />
            <RepoRow k="/etc/apt/sources.list.d/*.list" v="drop-in files, one per extra repo" />
            <RepoRow k="add-apt-repository ppa:<o>/<p>" v="add a Launchpad PPA on Ubuntu" />
            <RepoRow k="/etc/apt/keyrings/*.gpg" v="signing keys for new repos" />
            <RepoRow k="apt policy <pkg>" v="show which repo the package came from" last />
          </div>
        </div>
        <div style={{ animation: 'lf-fadeUp 600ms ease both 240ms' }}>
          <div style={{ marginBottom: 14 }}>
            <code style={{ fontFamily: fontMono, fontSize: 34, color: 'var(--osd-accent)', fontWeight: 700 }}>dnf</code>
            <span style={{ fontFamily: fontMono, fontSize: 20, color: palette.muted, marginLeft: 14 }}>RHEL · Fedora · Rocky · Alma</span>
          </div>
          <div style={{ background: palette.paperTint, border: `2px solid ${palette.ink}`, borderRadius: 12, padding: '20px 24px', boxShadow: `6px 6px 0 ${palette.paperLine}` }}>
            <RepoRow k="/etc/yum.repos.d/*.repo" v="one .repo file per source" />
            <RepoRow k="dnf repolist  ·  --all" v="list enabled repos (--all = disabled too)" />
            <RepoRow k="dnf config-manager --add-repo <url>" v="register a new .repo from a URL" />
            <RepoRow k="dnf config-manager --enable / --disable <id>" v="flip a repo on/off without deleting it" />
            <RepoRow k="rpm --import <key-url>" v="trust the GPG key (dnf verifies on install)" last />
          </div>
        </div>
      </div>

      <div style={{ marginTop: 'auto', paddingTop: 24, fontSize: 26, color: palette.muted, fontFamily: fontMono, animation: 'lf-fadeIn 700ms ease both 700ms' }}>
        <span style={{ color: palette.coral }}>// </span>
        Verify GPG fingerprints before trusting a third-party repo — supply chain matters.
      </div>
    </div>
  </PageFrame>
);

// ─── 32 — vi survival ─────────────────────────────────────────────────────────

const ViKey = ({ k, desc, delay }: { k: string; desc: string; delay: number }) => (
  <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', alignItems: 'baseline', gap: 18, padding: '8px 0', borderBottom: `1px solid ${palette.paperLine}`, animation: `lf-fadeUp 500ms ease both ${delay}ms` }}>
    <code style={{ fontFamily: fontMono, fontSize: 26, color: 'var(--osd-accent)', fontWeight: 700 }}>{k}</code>
    <div style={{ fontSize: 22, lineHeight: 1.4, color: palette.ink }}>{desc}</div>
  </div>
);

const ViSectionHeader = ({ label, delay, top = false }: { label: string; delay: number; top?: boolean }) => (
  <div
    style={{
      fontSize: 28,
      fontWeight: 700,
      marginTop: top ? 0 : 22,
      marginBottom: 8,
      color: palette.ink,
      animation: `lf-fadeUp 600ms ease both ${delay}ms`,
    }}
  >
    {label}
  </div>
);

const ViSurvival: Page = () => (
  <PageFrame pageNum={33} eyebrow="THE EDITOR THAT'S EVERYWHERE">
    <div style={{ position: 'absolute', inset: 0, padding: '160px 160px 100px', display: 'flex', flexDirection: 'column' }}>
      <h2 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 88, fontWeight: 900, letterSpacing: '-0.035em', lineHeight: 1, margin: 0, animation: 'lf-fadeUp 600ms ease both' }}>
        <code style={{ fontFamily: fontMono, color: palette.coral }}>vi</code> survival kit.
      </h2>
      <div style={{ fontSize: 28, color: palette.muted, marginTop: 14, maxWidth: 1400, animation: 'lf-fadeUp 600ms ease both 80ms' }}>
        Default mode is <em>Normal</em> — keys are commands. Press <code>i</code> to type, <code>ESC</code> to stop.
      </div>
      <div style={{ marginTop: 32, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56 }}>
        <div>
          <ViSectionHeader label="Modes" delay={120} top />
          <ViKey k="i" desc="enter Insert mode — type text" delay={160} />
          <ViKey k="ESC" desc="back to Normal mode" delay={200} />
          <ViKey k=":" desc="Ex-command mode (save, quit, replace)" delay={240} />
          <ViKey k="v" desc="Visual mode — select before editing" delay={280} />

          <ViSectionHeader label="Move around" delay={320} />
          <ViKey k="h  j  k  l" desc="left · down · up · right" delay={360} />
          <ViKey k="w · b" desc="jump forward / back by word" delay={400} />
          <ViKey k="0 · $" desc="start of line / end of line" delay={440} />
          <ViKey k="gg · G" desc="top of file / bottom of file" delay={480} />
        </div>
        <div>
          <ViSectionHeader label="Edit, search, save" delay={240} top />
          <ViKey k=":w" desc="save (write)" delay={280} />
          <ViKey k=":q · :wq · :q!" desc="quit · save+quit · discard" delay={320} />
          <ViKey k="x" desc="delete the character under the cursor" delay={360} />
          <ViKey k="dd · yy · p" desc="delete line · yank line · paste below" delay={400} />
          <ViKey k="/pat · n · N" desc="search forward · next · previous" delay={440} />
          <ViKey k=":%s/old/new/g" desc="global search and replace (whole file)" delay={480} />
          <ViKey k="u · Ctrl+R" desc="undo · redo" delay={520} />
          <ViKey k="5dd · 3w" desc="counts — repeat any motion or action N times" delay={560} />
        </div>
      </div>
      <div style={{ marginTop: 'auto', paddingTop: 20, fontSize: 26, color: palette.muted, fontFamily: fontMono, animation: 'lf-fadeIn 700ms ease both 660ms' }}>
        <span style={{ color: palette.coral }}>// </span>
        Stuck? <code>ESC</code> · <code>ESC</code> · <code>:q!</code> bails out of anything without saving.
      </div>
    </div>
  </PageFrame>
);

// ─── 32 — File permissions ────────────────────────────────────────────────────

const PermBit = ({ char, color }: { char: string; color: string }) => (
  <span style={{ display: 'inline-block', fontFamily: fontMono, fontSize: 56, color, fontWeight: 800, minWidth: 36, textAlign: 'center' }}>{char}</span>
);

const Permissions: Page = () => (
  <PageFrame pageNum={34} eyebrow="WHO CAN DO WHAT">
    <div style={{ position: 'absolute', inset: 0, padding: '160px 160px 100px', display: 'flex', flexDirection: 'column' }}>
      <h2 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 88, fontWeight: 900, letterSpacing: '-0.035em', lineHeight: 1, margin: 0, animation: 'lf-fadeUp 600ms ease both' }}>
        <code style={{ fontFamily: fontMono, color: palette.coral }}>rwx</code> — for who?
      </h2>

      <div style={{ marginTop: 44, background: palette.paperTint, border: `2px solid ${palette.ink}`, borderRadius: 12, padding: '24px 36px', boxShadow: `8px 8px 0 ${palette.coral}`, animation: 'lf-fadeUp 600ms ease both 120ms' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
          <PermBit char="-" color={palette.muted} />
          <PermBit char="r" color="var(--osd-accent)" />
          <PermBit char="w" color="var(--osd-accent)" />
          <PermBit char="x" color="var(--osd-accent)" />
          <PermBit char="r" color={palette.coral} />
          <PermBit char="-" color={palette.muted} />
          <PermBit char="x" color={palette.coral} />
          <PermBit char="r" color={palette.ink} />
          <PermBit char="-" color={palette.muted} />
          <PermBit char="-" color={palette.muted} />
        </div>
        <div style={{ marginTop: 8, display: 'grid', gridTemplateColumns: '48px 144px 144px 1fr', gap: 0, fontFamily: fontMono, fontSize: 20, color: palette.muted }}>
          <div>type</div>
          <div style={{ color: 'var(--osd-accent)' }}>owner (u)</div>
          <div style={{ color: palette.coral }}>group (g)</div>
          <div>others (o)</div>
        </div>
      </div>

      <div style={{ marginTop: 36, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'start' }}>
        <div>
          <CmdRow cmdWidth={240} cmd="chmod 755 file" desc="rwxr-xr-x — owner all, others r+x" delay={220} />
          <CmdRow cmdWidth={240} cmd="chmod u+x file" desc="give the owner execute (symbolic)" delay={280} />
          <CmdRow cmdWidth={240} cmd="chmod -R 644 dir" desc="recursive — every file inside" delay={340} />
          <CmdRow cmdWidth={240} cmd="chown alice file" desc="change owner" delay={400} />
          <CmdRow cmdWidth={240} cmd="chown alice:devs f" desc="change owner and group together" delay={460} />
          <CmdRow cmdWidth={240} cmd="chgrp devs file" desc="change just the group" delay={520} />
        </div>
        <div style={{ animation: 'lf-fadeUp 600ms ease both 360ms' }}>
          <div style={{ fontFamily: fontMono, fontSize: 20, color: palette.muted, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 12 }}>
            Octal math
          </div>
          <div style={{ background: palette.paperTint, border: `2px solid ${palette.ink}`, borderRadius: 12, padding: '20px 26px', fontFamily: fontMono, fontSize: 26, color: palette.ink, boxShadow: `6px 6px 0 ${palette.paperLine}`, lineHeight: 1.5 }}>
            <div><span style={{ color: 'var(--osd-accent)', fontWeight: 700 }}>r</span> = 4 · <span style={{ color: 'var(--osd-accent)', fontWeight: 700 }}>w</span> = 2 · <span style={{ color: 'var(--osd-accent)', fontWeight: 700 }}>x</span> = 1</div>
            <div style={{ marginTop: 10 }}><span style={{ color: palette.coral }}>7</span> = rwx · <span style={{ color: palette.coral }}>6</span> = rw- · <span style={{ color: palette.coral }}>5</span> = r-x · <span style={{ color: palette.coral }}>4</span> = r--</div>
            <div style={{ marginTop: 14, fontSize: 22, color: palette.muted }}>files → <code>644</code> · executables &amp; dirs → <code>755</code></div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 'auto', paddingTop: 24, fontSize: 26, color: palette.muted, fontFamily: fontMono, animation: 'lf-fadeIn 700ms ease both 640ms' }}>
        <span style={{ color: palette.coral }}>// </span>
        <code>ls -l</code> shows the bits. <code>stat file</code> shows them in human form too.
      </div>
    </div>
  </PageFrame>
);

// ─── 33 — Special bits & umask ────────────────────────────────────────────────

const SpecialBitCard = ({ name, octal, desc, example, delay }: { name: string; octal: string; desc: string; example: string; delay: number }) => (
  <div style={{ background: palette.paperTint, border: `2px solid ${palette.ink}`, borderRadius: 14, padding: '24px 28px', boxShadow: `6px 6px 0 ${palette.paperLine}`, display: 'flex', flexDirection: 'column', gap: 10, animation: `lf-fadeUp 600ms ease both ${delay}ms` }}>
    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
      <div style={{ fontSize: 34, fontWeight: 800, color: palette.ink }}>{name}</div>
      <code style={{ fontFamily: fontMono, fontSize: 24, color: 'var(--osd-accent)' }}>{octal}</code>
    </div>
    <div style={{ fontSize: 22, lineHeight: 1.4, color: palette.ink }}>{desc}</div>
    <div style={{ fontSize: 20, fontFamily: fontMono, color: palette.muted }}>{example}</div>
  </div>
);

const SpecialBits: Page = () => (
  <PageFrame pageNum={35} eyebrow="THREE BITS BEYOND RWX">
    <div style={{ position: 'absolute', inset: 0, padding: '160px 160px 100px', display: 'flex', flexDirection: 'column' }}>
      <h2 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 88, fontWeight: 900, letterSpacing: '-0.035em', lineHeight: 1, margin: 0, animation: 'lf-fadeUp 600ms ease both' }}>
        SUID · SGID · sticky.
      </h2>
      <div style={{ fontSize: 28, color: palette.muted, marginTop: 14, maxWidth: 1400, animation: 'lf-fadeUp 600ms ease both 80ms' }}>
        Three flags that change how programs run and how directories behave.
      </div>

      <div style={{ marginTop: 44, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 32 }}>
        <SpecialBitCard
          name="SUID"
          octal="4xxx"
          desc="Run a binary as the file's owner — not as the user who launched it."
          example="/usr/bin/passwd is owned by root with SUID."
          delay={140}
        />
        <SpecialBitCard
          name="SGID"
          octal="2xxx"
          desc="Run as the file's group — or, on a directory, new files inherit its group."
          example="Shared project directories use SGID."
          delay={220}
        />
        <SpecialBitCard
          name="sticky"
          octal="1xxx"
          desc="On a directory: only the file's owner can delete it. Public dirs use this."
          example="/tmp is mode 1777 — anyone writes, only the owner deletes."
          delay={300}
        />
      </div>

      <div style={{ marginTop: 40, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'start' }}>
        <div>
          <CmdRow cmdWidth={240} cmd="chmod u+s file" desc="set SUID (symbolic)" delay={420} />
          <CmdRow cmdWidth={240} cmd="chmod 2755 dir" desc="set SGID (octal — prepend 2)" delay={480} />
          <CmdRow cmdWidth={240} cmd="chmod +t dir" desc="set the sticky bit" delay={540} />
        </div>
        <div style={{ animation: 'lf-fadeUp 600ms ease both 480ms' }}>
          <div style={{ fontFamily: fontMono, fontSize: 20, color: palette.muted, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 12 }}>
            umask — the default-mode filter
          </div>
          <div style={{ background: palette.paperTint, border: `2px solid ${palette.ink}`, borderRadius: 12, padding: '20px 26px', fontFamily: fontMono, fontSize: 24, color: palette.ink, boxShadow: `6px 6px 0 ${palette.paperLine}`, lineHeight: 1.5 }}>
            <div><span style={{ color: 'var(--osd-accent)' }}>umask 022</span> · default on most distros</div>
            <div style={{ fontSize: 22, color: palette.muted, marginTop: 8 }}>files → 644 · dirs → 755</div>
            <div style={{ fontSize: 22, color: palette.muted }}>(subtract umask from 666/777)</div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 'auto', paddingTop: 20, fontSize: 26, color: palette.muted, fontFamily: fontMono, animation: 'lf-fadeIn 700ms ease both 700ms' }}>
        <span style={{ color: palette.coral }}>// </span>
        Need per-user perms beyond rwx? Look up <code>setfacl</code> / <code>getfacl</code> — ACLs.
      </div>
    </div>
  </PageFrame>
);

// ─── 34 — Users & groups ──────────────────────────────────────────────────────

const UsersAndGroups: Page = () => (
  <PageFrame pageNum={36} eyebrow="USERS · GROUPS · IDENTITY">
    <div style={{ position: 'absolute', inset: 0, padding: '160px 160px 100px', display: 'flex', flexDirection: 'column' }}>
      <h2 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 88, fontWeight: 900, letterSpacing: '-0.035em', lineHeight: 1, margin: 0, animation: 'lf-fadeUp 600ms ease both' }}>
        Who is who?
      </h2>
      <div style={{ fontSize: 28, color: palette.muted, marginTop: 14, maxWidth: 1400, animation: 'lf-fadeUp 600ms ease both 80ms' }}>
        <code>/etc/passwd</code> lists users. <code>/etc/group</code> lists groups. Use the tools — don&apos;t hand-edit.
      </div>

      <div style={{ marginTop: 44 }}>
        <TwoCol
          left={
            <div>
              <CmdRow cmdWidth={400} cmd="useradd -m alice" desc="create user (+ home dir)" delay={140} />
              <CmdRow cmdWidth={400} cmd="passwd alice" desc="set or reset a password" delay={200} />
              <CmdRow cmdWidth={400} cmd="usermod -aG sudo alice" desc="add to a group (-a = append!)" delay={260} />
              <CmdRow cmdWidth={400} cmd="userdel -r alice" desc="remove user + home" delay={320} />
              <CmdRow cmdWidth={400} cmd="groupadd devs" desc="create a new group" delay={380} />
              <CmdRow cmdWidth={400} cmd="id alice" desc="show uid, gid, groups" delay={440} />
              <CmdRow cmdWidth={400} cmd="getent passwd alice" desc="query the user db (LDAP/AD too)" delay={500} />
            </div>
          }
          right={
            <Term style={{ animation: 'lf-fadeUp 600ms ease both 220ms' }}>
              <div style={{ color: term.muted, fontSize: 22 }}># /etc/passwd format</div>
              <div style={{ fontSize: 22 }}>alice:x:1001:1001:Alice Doe:/home/alice:/bin/bash</div>
              <div style={{ height: 8 }} />
              <div style={{ fontSize: 20, color: term.muted }}>name : pwd : uid : gid : gecos : home : shell</div>
              <div style={{ height: 14 }} />
              <div style={{ color: term.muted, fontSize: 22 }}># /etc/shadow keeps hashed passwords (root-only)</div>
              <div style={{ height: 10 }} />
              <div><Prompt>id alice</Prompt></div>
              <div><Out>uid=1001(alice) gid=1001(alice) groups=1001(alice),27(sudo),1100(devs)</Out><Cursor /></div>
            </Term>
          }
        />
      </div>

      <div style={{ marginTop: 'auto', paddingTop: 24, fontSize: 26, color: palette.muted, fontFamily: fontMono, animation: 'lf-fadeIn 700ms ease both 660ms' }}>
        <span style={{ color: palette.coral }}>// </span>
        <code>sudo</code> is a privileged group, not a user. Add to it carefully — full root access.
      </div>
    </div>
  </PageFrame>
);

// ─── 35 — Processes & resources ───────────────────────────────────────────────

const ProcessesAndResources: Page = () => (
  <PageFrame pageNum={37} eyebrow="WHO'S RUNNING · WHAT'S USED">
    <div style={{ position: 'absolute', inset: 0, padding: '160px 160px 100px', display: 'flex', flexDirection: 'column' }}>
      <h2 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 88, fontWeight: 900, letterSpacing: '-0.035em', lineHeight: 1, margin: 0, animation: 'lf-fadeUp 600ms ease both' }}>
        Where did my CPU / RAM / disk go?
      </h2>
      <div style={{ fontSize: 28, color: palette.muted, marginTop: 14, maxWidth: 1400, animation: 'lf-fadeUp 600ms ease both 80ms' }}>
        Six commands answer 90% of "why is this box slow?"
      </div>

      <div style={{ marginTop: 44 }}>
        <TwoCol
          left={
            <div>
              <CmdRow cmdWidth={220} cmd="top · htop" desc="live processes — sort by CPU, RAM, etc." delay={140} />
              <CmdRow cmdWidth={220} cmd="ps aux" desc="full snapshot of every process" delay={200} />
              <CmdRow cmdWidth={220} cmd="ps --forest" desc="process tree — see who spawned who" delay={260} />
              <CmdRow cmdWidth={220} cmd="free -h" desc="memory: free / used / cached (human units)" delay={320} />
              <CmdRow cmdWidth={220} cmd="df -h" desc="disk usage by mount point" delay={380} />
              <CmdRow cmdWidth={220} cmd="du -sh ./*" desc="disk usage by directory (sum + human)" delay={440} />
              <CmdRow cmdWidth={220} cmd="kill -<sig> <pid>" desc="signal: TERM (default), KILL (-9), HUP (-1)" delay={500} />
            </div>
          }
          right={
            <Term style={{ animation: 'lf-fadeUp 600ms ease both 220ms' }}>
              <div><Prompt>free -h</Prompt></div>
              <div><Out>{'         total   used   free   shared  buff/cache  available'}</Out></div>
              <div><Out>Mem:     15Gi   4.2Gi  1.1Gi  312Mi    9.8Gi       10Gi</Out></div>
              <div><Out>Swap:    2.0Gi  0B     2.0Gi</Out></div>
              <div style={{ height: 10 }} />
              <div><Prompt>du -sh /var/log/*</Prompt></div>
              <div><Out>1.2G  /var/log/journal</Out></div>
              <div><Out>340M  /var/log/nginx</Out></div>
              <div><Out>22M   /var/log/syslog</Out><Cursor /></div>
            </Term>
          }
        />
      </div>

      <div style={{ marginTop: 'auto', paddingTop: 24, fontSize: 26, color: palette.muted, fontFamily: fontMono, animation: 'lf-fadeIn 700ms ease both 600ms' }}>
        <span style={{ color: palette.coral }}>// </span>
        <code>htop</code> is the prettier <code>top</code>. <code>ncdu</code> is the prettier <code>du</code>. Both worth installing.
      </div>
    </div>
  </PageFrame>
);

// ─── 36 — Archives & compression ──────────────────────────────────────────────

const ArchivesAndCompression: Page = () => (
  <PageFrame pageNum={38} eyebrow="BUNDLE · SQUEEZE">
    <div style={{ position: 'absolute', inset: 0, padding: '160px 160px 100px', display: 'flex', flexDirection: 'column' }}>
      <h2 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 88, fontWeight: 900, letterSpacing: '-0.035em', lineHeight: 1, margin: 0, animation: 'lf-fadeUp 600ms ease both' }}>
        <code style={{ fontFamily: fontMono, color: palette.coral }}>tar</code> bundles. <code style={{ fontFamily: fontMono, color: palette.coral }}>gzip</code> squeezes.
      </h2>
      <div style={{ fontSize: 28, color: palette.muted, marginTop: 14, maxWidth: 1400, animation: 'lf-fadeUp 600ms ease both 80ms' }}>
        They compose. A <code>.tar.gz</code> is a tarball that was then gzip&apos;d.
      </div>

      <div style={{ marginTop: 44 }}>
        <TwoCol
          left={
            <div>
              <CmdRow cmdWidth={300} cmd="tar -czf out.tar.gz dir/" desc="create gzipped tarball of dir" delay={140} />
              <CmdRow cmdWidth={300} cmd="tar -xzf out.tar.gz" desc="extract here" delay={220} />
              <CmdRow cmdWidth={300} cmd="tar -xzf f.tgz -C /opt" desc="extract into a different directory" delay={300} />
              <CmdRow cmdWidth={300} cmd="tar -tzf out.tar.gz" desc="list contents without extracting" delay={380} />
              <CmdRow cmdWidth={300} cmd="gzip / gunzip file" desc="compress / decompress a single file" delay={460} />
              <CmdRow cmdWidth={300} cmd="zstd / unzstd file" desc="modern, faster, often better ratio" delay={540} />
              <CmdRow cmdWidth={300} cmd="zip / unzip file.zip" desc="interop with Windows / macOS" delay={620} />
            </div>
          }
          right={
            <Term style={{ animation: 'lf-fadeUp 600ms ease both 220ms' }}>
              <div style={{ color: term.muted, fontSize: 22 }}># tar flag glossary</div>
              <div style={{ fontSize: 24 }}><span style={{ color: 'var(--osd-accent)', fontWeight: 700 }}>c</span> &nbsp;create</div>
              <div style={{ fontSize: 24 }}><span style={{ color: 'var(--osd-accent)', fontWeight: 700 }}>x</span> &nbsp;extract</div>
              <div style={{ fontSize: 24 }}><span style={{ color: 'var(--osd-accent)', fontWeight: 700 }}>t</span> &nbsp;list (table-of-contents)</div>
              <div style={{ fontSize: 24 }}><span style={{ color: 'var(--osd-accent)', fontWeight: 700 }}>z</span> &nbsp;use gzip · <span style={{ color: 'var(--osd-accent)', fontWeight: 700 }}>j</span> bzip2 · <span style={{ color: 'var(--osd-accent)', fontWeight: 700 }}>J</span> xz</div>
              <div style={{ fontSize: 24 }}><span style={{ color: 'var(--osd-accent)', fontWeight: 700 }}>f</span> &nbsp;file (always followed by filename)</div>
              <div style={{ fontSize: 24 }}><span style={{ color: 'var(--osd-accent)', fontWeight: 700 }}>v</span> &nbsp;verbose</div>
              <div style={{ height: 10 }} />
              <div style={{ fontSize: 22, color: term.muted }}># stream a tarball over ssh</div>
              <div style={{ fontSize: 22 }}>tar -cz dir/ | ssh box &apos;cat &gt; backup.tgz&apos;<Cursor /></div>
            </Term>
          }
        />
      </div>

      <div style={{ marginTop: 'auto', paddingTop: 24, fontSize: 26, color: palette.muted, fontFamily: fontMono, animation: 'lf-fadeIn 700ms ease both 700ms' }}>
        <span style={{ color: palette.coral }}>// </span>
        Mnemonic for unknown tarballs: <code>tar -xvf</code> — "<em>e<u>x</u>tract <u>v</u>erbose <u>f</u>ile</em>"; flags handle the rest.
      </div>
    </div>
  </PageFrame>
);

// ─── 37 — Cron & systemd timers ───────────────────────────────────────────────

const CronAndTimers: Page = () => (
  <PageFrame pageNum={39} eyebrow="TICK · RUN · TICK AGAIN">
    <div style={{ position: 'absolute', inset: 0, padding: '160px 160px 100px', display: 'flex', flexDirection: 'column' }}>
      <h2 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 88, fontWeight: 900, letterSpacing: '-0.035em', lineHeight: 1, margin: 0, animation: 'lf-fadeUp 600ms ease both' }}>
        Things on a schedule.
      </h2>
      <div style={{ fontSize: 28, color: palette.muted, marginTop: 14, maxWidth: 1400, animation: 'lf-fadeUp 600ms ease both 80ms' }}>
        <code>cron</code> is universal and simple. <code>systemd</code> timers are richer — logging, dependencies, on-boot triggers.
      </div>

      <div style={{ marginTop: 44, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'start' }}>
        <div>
          <div style={{ fontSize: 32, fontWeight: 700, marginBottom: 16, color: palette.ink, animation: 'lf-fadeUp 600ms ease both 100ms' }}>cron</div>
          <CmdRow cmdWidth={220} cmd="crontab -e" desc="edit your crontab" delay={160} />
          <CmdRow cmdWidth={220} cmd="crontab -l" desc="list it" delay={220} />
          <CmdRow cmdWidth={220} cmd="/etc/cron.d/*" desc="system-wide jobs (root) — drop files here" delay={280} />
          <div style={{ marginTop: 18, background: palette.paperTint, border: `2px solid ${palette.ink}`, borderRadius: 12, padding: '20px 24px', fontFamily: fontMono, fontSize: 22, color: palette.ink, boxShadow: `6px 6px 0 ${palette.paperLine}`, animation: 'lf-fadeUp 600ms ease both 320ms' }}>
            <div style={{ color: palette.muted, fontSize: 20 }}># min hour dom mon dow  command</div>
            <div style={{ marginTop: 6 }}>0 2 * * *  /usr/local/bin/backup.sh</div>
            <div style={{ marginTop: 8, fontSize: 20, color: palette.muted }}># every day at 02:00</div>
          </div>
        </div>
        <div>
          <div style={{ fontSize: 32, fontWeight: 700, marginBottom: 16, color: palette.ink, animation: 'lf-fadeUp 600ms ease both 200ms' }}>systemd timers</div>
          <CmdRow cmdWidth={280} cmd="systemctl list-timers" desc="every active timer and when it fires" delay={260} />
          <CmdRow cmdWidth={280} cmd="systemctl enable --now t" desc="enable a timer at boot, start it now" delay={320} />
          <CmdRow cmdWidth={280} cmd="journalctl -u <unit>" desc="logs for the service the timer triggered" delay={380} />
          <div style={{ marginTop: 18, fontSize: 22, lineHeight: 1.5, color: palette.muted, animation: 'lf-fadeUp 600ms ease both 440ms' }}>
            A timer is a <code>.timer</code> file paired with a <code>.service</code> — same name, different extension. See the systemd service page next.
          </div>
        </div>
      </div>

      <div style={{ marginTop: 'auto', paddingTop: 24, fontSize: 26, color: palette.muted, fontFamily: fontMono, animation: 'lf-fadeIn 700ms ease both 580ms' }}>
        <span style={{ color: palette.coral }}>// </span>
        Use cron when it&apos;s simple. Reach for timers when you need logs, dependencies, or boot triggers.
      </div>
    </div>
  </PageFrame>
);

// ─── 38 — Storage basics ──────────────────────────────────────────────────────

const StorageLayer = ({ label, sub, color, delay }: { label: string; sub: string; color: string; delay: number }) => (
  <div style={{ padding: '14px 20px', background: color, border: `2px solid ${palette.ink}`, borderRadius: 10, display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', animation: `lf-fadeUp 500ms ease both ${delay}ms` }}>
    <div style={{ fontSize: 26, fontWeight: 700, color: palette.ink }}>{label}</div>
    <div style={{ fontFamily: fontMono, fontSize: 22, color: palette.muted }}>{sub}</div>
  </div>
);

const StorageBasics: Page = () => (
  <PageFrame pageNum={40} eyebrow="DISKS · PARTITIONS · FILESYSTEMS">
    <div style={{ position: 'absolute', inset: 0, padding: '160px 160px 100px', display: 'flex', flexDirection: 'column' }}>
      <h2 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 88, fontWeight: 900, letterSpacing: '-0.035em', lineHeight: 1, margin: 0, animation: 'lf-fadeUp 600ms ease both' }}>
        From disk to directory.
      </h2>
      <div style={{ fontSize: 28, color: palette.muted, marginTop: 14, maxWidth: 1400, animation: 'lf-fadeUp 600ms ease both 80ms' }}>
        Four layers stack: <em>block device → partition → filesystem → mount point</em>.
      </div>

      <div style={{ marginTop: 40, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <StorageLayer label="Mount point" sub="/mnt/data" color="#FAEAD8" delay={140} />
          <StorageLayer label="Filesystem" sub="ext4 / xfs / btrfs" color="#F2EEE5" delay={200} />
          <StorageLayer label="Partition" sub="/dev/sdb1" color="#E5E1D6" delay={260} />
          <StorageLayer label="Block device" sub="/dev/sdb" color="#D8D4C8" delay={320} />
        </div>
        <div>
          <CmdRow cmdWidth={260} cmd="lsblk" desc="what disks/partitions are visible" delay={200} />
          <CmdRow cmdWidth={260} cmd="findmnt · mount" desc="what's currently mounted" delay={260} />
          <CmdRow cmdWidth={260} cmd="mkfs.ext4 /dev/sdb1" desc="format a partition (ext4 here)" delay={320} />
          <CmdRow cmdWidth={260} cmd="mount /dev/sdb1 /mnt" desc="mount it on /mnt" delay={380} />
          <CmdRow cmdWidth={260} cmd="umount /mnt" desc="unmount" delay={440} />
          <CmdRow cmdWidth={260} cmd="/etc/fstab" desc="mounts that should happen at boot" delay={500} />
          <CmdRow cmdWidth={260} cmd="swapon · swapoff" desc="enable / disable swap" delay={560} />
        </div>
      </div>

      <div style={{ marginTop: 'auto', paddingTop: 24, fontSize: 26, color: palette.muted, fontFamily: fontMono, animation: 'lf-fadeIn 700ms ease both 640ms' }}>
        <span style={{ color: palette.coral }}>// </span>
        Filesystem types: <code>ext4</code> (default, stable), <code>xfs</code> (large files / RHEL), <code>btrfs</code> &amp; <code>zfs</code> (snapshots, COW).
      </div>
    </div>
  </PageFrame>
);

// ─── 39 — LVM concepts ────────────────────────────────────────────────────────

const LvmBox = ({ label, examples, color, delay }: { label: string; examples: string; color: string; delay: number }) => (
  <div style={{ background: color, border: `2px solid ${palette.ink}`, borderRadius: 10, padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 6, animation: `lf-fadeUp 500ms ease both ${delay}ms` }}>
    <div style={{ fontSize: 24, fontWeight: 800, color: palette.ink }}>{label}</div>
    <div style={{ fontFamily: fontMono, fontSize: 20, color: palette.muted }}>{examples}</div>
  </div>
);

const LvmConcepts: Page = () => (
  <PageFrame pageNum={41} eyebrow="DISKS THAT CAN RESIZE">
    <div style={{ position: 'absolute', inset: 0, padding: '160px 160px 100px', display: 'flex', flexDirection: 'column' }}>
      <h2 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 88, fontWeight: 900, letterSpacing: '-0.035em', lineHeight: 1, margin: 0, animation: 'lf-fadeUp 600ms ease both' }}>
        LVM — a layer that bends.
      </h2>
      <div style={{ fontSize: 28, color: palette.muted, marginTop: 14, maxWidth: 1400, animation: 'lf-fadeUp 600ms ease both 80ms' }}>
        Pool disks together (VG), carve out volumes (LV), resize or snapshot any of them without unplugging anything.
      </div>

      <div style={{ marginTop: 36, animation: 'lf-fadeUp 600ms ease both 120ms' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <LvmBox label="PV" examples="/dev/sdb · /dev/sdc · /dev/sdd" color="#D8D4C8" delay={160} />
          <span style={{ fontFamily: fontMono, fontSize: 32, color: palette.muted }}>→</span>
          <LvmBox label="VG" examples="vg0 (pool of the PVs above)" color="#E5E1D6" delay={240} />
          <span style={{ fontFamily: fontMono, fontSize: 32, color: palette.muted }}>→</span>
          <LvmBox label="LV" examples="data · home · backups" color="#FAEAD8" delay={320} />
        </div>
        <div style={{ marginTop: 10, fontFamily: fontMono, fontSize: 20, color: palette.muted }}>
          Physical Volume → Volume Group → Logical Volume — then format the LV like any partition.
        </div>
      </div>

      <div style={{ marginTop: 30, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'start' }}>
        <div>
          <CmdRow cmdWidth={260} cmd="pvcreate /dev/sdb" desc="mark a disk as a Physical Volume" delay={400} />
          <CmdRow cmdWidth={260} cmd="vgcreate vg0 /dev/sdb" desc="create a Volume Group from PVs" delay={460} />
          <CmdRow cmdWidth={260} cmd="lvcreate -L 20G -n data vg0" desc="carve a 20 GB Logical Volume" delay={520} />
        </div>
        <div>
          <CmdRow cmdWidth={300} cmd="lvextend -L +10G <lv>" desc="grow the LV by 10 GB" delay={460} />
          <CmdRow cmdWidth={300} cmd="resize2fs <lv>" desc="grow the filesystem on top to match" delay={520} />
          <CmdRow cmdWidth={300} cmd="pvs · vgs · lvs" desc="inspect each layer" delay={580} />
        </div>
      </div>

      <div style={{ marginTop: 'auto', paddingTop: 20, fontSize: 26, color: palette.muted, fontFamily: fontMono, animation: 'lf-fadeIn 700ms ease both 660ms' }}>
        <span style={{ color: palette.coral }}>// </span>
        Snapshots: <code>lvcreate -s -L 5G -n backup vg0/data</code> — a point-in-time copy you can mount.
      </div>
    </div>
  </PageFrame>
);

// ─── 40 — Logs deeper ─────────────────────────────────────────────────────────

const LogsDeeper: Page = () => (
  <PageFrame pageNum={42} eyebrow="WHERE THE SYSTEM WRITES ITSELF DOWN">
    <div style={{ position: 'absolute', inset: 0, padding: '160px 160px 100px', display: 'flex', flexDirection: 'column' }}>
      <h2 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 88, fontWeight: 900, letterSpacing: '-0.035em', lineHeight: 1, margin: 0, animation: 'lf-fadeUp 600ms ease both' }}>
        Two log worlds.
      </h2>
      <div style={{ fontSize: 28, color: palette.muted, marginTop: 14, maxWidth: 1400, animation: 'lf-fadeUp 600ms ease both 80ms' }}>
        <code>/var/log</code> holds the text-file half — services that write their own. <code>journalctl</code> owns the systemd-managed half.
      </div>

      <div style={{ marginTop: 44, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'start' }}>
        <div>
          <div style={{ fontSize: 32, fontWeight: 700, marginBottom: 16, color: palette.ink, animation: 'lf-fadeUp 600ms ease both 100ms' }}>/var/log</div>
          <CmdRow cmdWidth={300} cmd="/var/log/syslog" desc="general system events (Debian-family)" delay={160} />
          <CmdRow cmdWidth={300} cmd="/var/log/messages" desc="same idea (RHEL-family)" delay={220} />
          <CmdRow cmdWidth={300} cmd="/var/log/auth.log" desc="login + sudo attempts (also: secure)" delay={280} />
          <CmdRow cmdWidth={300} cmd="/var/log/nginx/" desc="per-service directories — same pattern" delay={340} />
          <CmdRow cmdWidth={300} cmd="/etc/logrotate.d/*" desc="rules for rotating logs so disks don't fill" delay={400} />
        </div>
        <div>
          <div style={{ fontSize: 32, fontWeight: 700, marginBottom: 16, color: palette.ink, animation: 'lf-fadeUp 600ms ease both 200ms' }}>journalctl</div>
          <CmdRow cmdWidth={280} cmd="journalctl -xe" desc="last events with extra context" delay={260} />
          <CmdRow cmdWidth={280} cmd={'journalctl -u <svc> -f'} desc="follow one service's logs live" delay={320} />
          <CmdRow cmdWidth={280} cmd={'journalctl --since "10m"'} desc="time-windowed (also: --until)" delay={380} />
          <CmdRow cmdWidth={280} cmd="journalctl -p err -b" desc="errors only, since this boot" delay={440} />
          <CmdRow cmdWidth={280} cmd="journalctl --disk-usage" desc="how much disk the journal is using" delay={500} />
        </div>
      </div>

      <div style={{ marginTop: 'auto', paddingTop: 24, fontSize: 26, color: palette.muted, fontFamily: fontMono, animation: 'lf-fadeIn 700ms ease both 620ms' }}>
        <span style={{ color: palette.coral }}>// </span>
        First triage move: <code>journalctl -xe</code> — then narrow with <code>-u</code> / <code>-p</code> / <code>--since</code>.
      </div>
    </div>
  </PageFrame>
);

// ─── 41 — Write your own systemd service ──────────────────────────────────────

const SystemdServiceTeaser: Page = () => (
  <PageFrame pageNum={43} eyebrow="MAKE IT A SERVICE">
    <div style={{ position: 'absolute', inset: 0, padding: '160px 160px 100px', display: 'flex', flexDirection: 'column' }}>
      <h2 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 88, fontWeight: 900, letterSpacing: '-0.035em', lineHeight: 1, margin: 0, animation: 'lf-fadeUp 600ms ease both' }}>
        Write your own service.
      </h2>
      <div style={{ fontSize: 28, color: palette.muted, marginTop: 14, maxWidth: 1400, animation: 'lf-fadeUp 600ms ease both 80ms' }}>
        A <code>.service</code> file tells systemd how to run your program — and how to restart it when it dies.
      </div>

      <div style={{ marginTop: 40, display: 'grid', gridTemplateColumns: '1.2fr 0.9fr', gap: 56, alignItems: 'start' }}>
        <Term style={{ animation: 'lf-fadeUp 600ms ease both 220ms' }}>
          <div style={{ color: term.muted, fontSize: 22 }}># /etc/systemd/system/backup.service</div>
          <div style={{ height: 6 }} />
          <div style={{ color: 'var(--osd-accent)' }}>[Unit]</div>
          <div>Description=Nightly backup</div>
          <div>After=network.target</div>
          <div style={{ height: 6 }} />
          <div style={{ color: 'var(--osd-accent)' }}>[Service]</div>
          <div>Type=oneshot</div>
          <div>ExecStart=/usr/local/bin/backup.sh</div>
          <div>User=backup</div>
          <div>Restart=on-failure</div>
          <div style={{ height: 6 }} />
          <div style={{ color: 'var(--osd-accent)' }}>[Install]</div>
          <div>WantedBy=multi-user.target<Cursor /></div>
        </Term>
        <div>
          <CmdRow cmdWidth={280} cmd="systemctl daemon-reload" desc="reload after editing a unit file" delay={300} />
          <CmdRow cmdWidth={280} cmd="systemctl enable backup" desc="start on boot" delay={360} />
          <CmdRow cmdWidth={280} cmd="systemctl start backup" desc="start now" delay={420} />
          <CmdRow cmdWidth={280} cmd="systemctl status backup" desc="is it healthy?" delay={480} />
          <CmdRow cmdWidth={280} cmd="journalctl -u backup -f" desc="follow its logs" delay={540} />
        </div>
      </div>

      <div style={{ marginTop: 'auto', paddingTop: 20, fontSize: 26, color: palette.muted, fontFamily: fontMono, animation: 'lf-fadeIn 700ms ease both 640ms' }}>
        <span style={{ color: palette.coral }}>// </span>
        Pair with a <code>backup.timer</code> (same name, <code>.timer</code> extension) to run it on a schedule.
      </div>
    </div>
  </PageFrame>
);

// ─── 42 — Networking teaser ───────────────────────────────────────────────────

const NetworkingTeaser: Page = () => (
  <PageFrame pageNum={44} eyebrow="A TEASER FOR COURSE 04">
    <div style={{ position: 'absolute', inset: 0, padding: '160px 160px 100px', display: 'flex', flexDirection: 'column' }}>
      <h2 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 88, fontWeight: 900, letterSpacing: '-0.035em', lineHeight: 1, margin: 0, animation: 'lf-fadeUp 600ms ease both' }}>
        Networking — the survival kit.
      </h2>
      <div style={{ fontSize: 28, color: palette.muted, marginTop: 14, maxWidth: 1400, animation: 'lf-fadeUp 600ms ease both 80ms' }}>
        Course 04 — <em>Networking &amp; SSH</em> — dives in deep. Until then, these six get you unstuck.
      </div>

      <div style={{ marginTop: 44 }}>
        <TwoCol
          left={
            <div>
              <CmdRow cmdWidth={220} cmd="ip addr · ip a" desc="show interfaces and IPs" delay={140} />
              <CmdRow cmdWidth={220} cmd="ip route" desc="routing table — where packets go" delay={220} />
              <CmdRow cmdWidth={220} cmd="ping <host>" desc="basic reachability check" delay={300} />
              <CmdRow cmdWidth={220} cmd="ss -tlnp" desc="listening TCP sockets (which port → which pid)" delay={380} />
              <CmdRow cmdWidth={220} cmd="curl <url>" desc="fetch a URL — works on APIs too" delay={460} />
              <CmdRow cmdWidth={220} cmd="dig <host>" desc="DNS query — what does the name resolve to?" delay={540} />
            </div>
          }
          right={
            <Term style={{ animation: 'lf-fadeUp 600ms ease both 220ms' }}>
              <div><Prompt>ip -br a</Prompt></div>
              <div><Out>lo     UNKNOWN  127.0.0.1/8</Out></div>
              <div><Out>eth0   UP       10.0.0.42/24</Out></div>
              <div style={{ height: 10 }} />
              <div><Prompt>ss -tlnp | head -n 3</Prompt></div>
              <div><Out>LISTEN  0.0.0.0:22    users:(("sshd",pid=812))</Out></div>
              <div><Out>LISTEN  0.0.0.0:80    users:(("nginx",pid=914))</Out></div>
              <div style={{ height: 10 }} />
              <div><Prompt>dig +short example.com</Prompt></div>
              <div><Out>93.184.216.34</Out><Cursor /></div>
            </Term>
          }
        />
      </div>

      <div style={{ marginTop: 'auto', paddingTop: 24, fontSize: 26, color: palette.muted, fontFamily: fontMono, animation: 'lf-fadeIn 700ms ease both 660ms' }}>
        <span style={{ color: palette.coral }}>// </span>
        Course 04 covers <code>ssh</code>, <code>scp</code>, <code>rsync</code>, firewalls, and the full networking model.
      </div>
    </div>
  </PageFrame>
);

// ─── 43 — Closing Q&A ─────────────────────────────────────────────────────────

const ClosingPause: Page = () => (
  <PausePage pageNum={45} section="Linux Fundamentals" next="Course 02 — Shell Scripting.">
    <li>shell mastery — navigation, file ops, viewing, <code>find</code>, help</li>
    <li>power-ups — aliases, jobs, pipes, globs, text tools, scripts</li>
    <li>under the hood — kernel, syscalls, <code>sudo</code>, boot, systemd, FHS</li>
    <li>operating the system — packages, permissions, users, storage, services</li>
  </PausePage>
);

export const meta: SlideMeta = { title: 'Linux Fundamentals' };
export default [
  Cover,
  WhyLinux,
  History,
  ShellDivider,
  FirstCommands,
  FileOps,
  FindFiles,
  Viewing,
  LsAnatomy,
  HelpSystem,
  ShellPause,
  PowerupsDivider,
  HistoryAliases,
  LineEditing,
  JobControl,
  PipesGlobs,
  TextTools,
  Path,
  PromptPage,
  Scripting101,
  PowerupsPause,
  UnderHoodDivider,
  KernelUserSpace,
  Sudo,
  BootProcess,
  SystemdTargets,
  FilesAndFhs,
  HoodPause,
  Part4Divider,
  PackageManagementApt,
  PackageManagementDnf,
  RepoManagement,
  ViSurvival,
  Permissions,
  SpecialBits,
  UsersAndGroups,
  ProcessesAndResources,
  ArchivesAndCompression,
  CronAndTimers,
  StorageBasics,
  LvmConcepts,
  LogsDeeper,
  SystemdServiceTeaser,
  NetworkingTeaser,
  ClosingPause,
] satisfies Page[];
