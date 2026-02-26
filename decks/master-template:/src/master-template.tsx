import { useState, useEffect, useCallback, useRef } from "react";

const fonts = `@import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');`;

// ╔══════════════════════════════════════════════════════════════╗
// ║  PROPHETX MASTER TEMPLATE SYSTEM                           ║
// ║  Controlled by: jeff@prophetx.co                           ║
// ║  DO NOT modify THEMES, fonts, or NAV ENGINE                ║
// ║  To deploy: set ACTIVE_FORMAT, ACTIVE_THEME, and DECK meta ║
// ╚══════════════════════════════════════════════════════════════╝

// ── LOCKED DESIGN TOKENS ─────────────────────────────────────
const THEMES = {
  dark: {
    id: "dark", label: "DARK",
    bg: "#0A1520", surface: "#0F1E2E", card: "#152535",
    accent: "#00C896", accentDim: "#00C89628", accentGlow: "#00C89614",
    second: "#0EA5E9", red: "#FF4D4D", yellow: "#F59E0B",
    text: "#F0F8FF", textDim: "#4A6580", textMid: "#7A9AB5",
    border: "#1A3045", onAccent: "#0A1520",
  },
  lightB: {
    id: "lightB", label: "LIGHT",
    bg: "#FFFFFF", surface: "#F1F8FC", card: "#E8F4FA",
    accent: "#00B884", accentDim: "#00B88422", accentGlow: "#00B8840F",
    second: "#6366F1", red: "#EF4444", yellow: "#F59E0B",
    text: "#060E18", textDim: "#94A3B8", textMid: "#334155",
    border: "#BAD8EA", onAccent: "#FFFFFF",
  },
  dynamic: {
    id: "dynamic", label: "ALT",
    bg: "#F2F6FA", surface: "#0A1520", card: "#FFFFFF",
    accent: "#00E5AA", accentDim: "#00E5AA22", accentGlow: "#00E5AA10",
    second: "#F0B429", red: "#FF4458", yellow: "#F0B429",
    text: "#0A1520", textLight: "#EEF6FF",
    textDim: "#94A3B8", textMid: "#475569",
    textDimDark: "#3D5A74", textMidDark: "#7099B8",
    border: "#CBD5E1", borderDark: "#1A3045",
    onAccent: "#0A1520", splitMode: true,
  },
};

const FORMATS = {
  proposal:  { id: "proposal",  label: "PROPOSAL",  icon: "◈" },
  reporting: { id: "reporting", label: "REPORTING",  icon: "◉" },
  scroll:    { id: "scroll",    label: "SCROLL DOC", icon: "◎" },
};

// ── DECK METADATA — edit per deployment ──────────────────────
const DECK = {
  title: "Deck Title",
  subtitle: "A short description of this deck and its purpose.",
  presenter: "Presenter Name",
  contact: "presenter@prophetx.co",
  date: "March 2025",
  topic: "Topic Area",
  url: "prophetx-marketing-[deckname]",
};

// ── SHARED PRIMITIVES ─────────────────────────────────────────
const f = { sora: "'Sora', sans-serif", mono: "'JetBrains Mono', monospace" };

function BrandMark({ T, size = 26 }) {
  return (
    <div style={{ width: size, height: size, borderRadius: Math.floor(size * 0.22), background: T.accent, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      <span style={{ fontFamily: f.sora, fontWeight: 800, fontSize: size * 0.48, color: T.onAccent, lineHeight: 1 }}>X</span>
    </div>
  );
}

function Label({ T, children, color }) {
  return <div style={{ fontFamily: f.mono, fontSize: 10, color: color || T.accent, textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 8 }}>{children}</div>;
}

function H1({ T, children }) {
  return <h1 style={{ fontFamily: f.sora, fontWeight: 800, fontSize: "clamp(20px, 3vw, 42px)", lineHeight: 1.1, color: T.text, margin: 0, letterSpacing: "-0.03em" }}>{children}</h1>;
}

function Sub({ T, children }) {
  return <p style={{ fontFamily: f.sora, fontWeight: 300, fontSize: "clamp(13px, 1.4vw, 17px)", color: T.textMid, margin: "8px 0 0", lineHeight: 1.6 }}>{children}</p>;
}

function Card({ T, children, style = {} }) {
  return <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 12, padding: "16px 18px", ...style }}>{children}</div>;
}

function Banner({ T, children, solid }) {
  if (solid) return <div style={{ padding: "11px 22px", background: T.accent, borderRadius: 10, fontFamily: f.sora, fontWeight: 700, fontSize: 13, color: T.onAccent, textAlign: "center" }}>{children}</div>;
  return <div style={{ padding: "12px 16px", background: `linear-gradient(90deg, ${T.accentGlow}, transparent)`, borderLeft: `3px solid ${T.accent}`, borderRadius: "0 8px 8px 0", fontFamily: f.sora, fontSize: 13, color: T.text, lineHeight: 1.5 }}>{children}</div>;
}

function Tag({ T, children, color }) {
  const c = color || T.accent;
  return <span style={{ fontFamily: f.mono, fontSize: 10, color: c, background: c + "18", border: `1px solid ${c}28`, borderRadius: 5, padding: "2px 8px", letterSpacing: "0.05em" }}>{children}</span>;
}

function Pip({ T, color }) {
  return <div style={{ width: 5, height: 5, borderRadius: "50%", background: color || T.accent, flexShrink: 0, marginTop: 5 }} />;
}

function StatBox({ T, value, label, color }) {
  return (
    <div style={{ flex: 1, textAlign: "center", padding: "14px 10px", background: T.card, border: `1px solid ${T.border}`, borderRadius: 12 }}>
      <div style={{ fontFamily: f.sora, fontWeight: 800, fontSize: "clamp(22px, 3vw, 40px)", color: color || T.accent, lineHeight: 1, letterSpacing: "-0.03em" }}>{value}</div>
      <div style={{ fontFamily: f.mono, fontSize: 10, color: T.textDim, marginTop: 5, textTransform: "uppercase", letterSpacing: "0.08em" }}>{label}</div>
    </div>
  );
}

// ── BAR CHART (pure CSS) ─────────────────────────────────────
function BarChart({ T, data }) {
  const max = Math.max(...data.map(d => d.value));
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
      {data.map((d, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ fontFamily: f.sora, fontSize: 11, color: T.textMid, width: 100, flexShrink: 0, textAlign: "right" }}>{d.label}</div>
          <div style={{ flex: 1, height: 8, background: T.border, borderRadius: 4, overflow: "hidden" }}>
            <div style={{ width: `${(d.value / max) * 100}%`, height: "100%", background: d.color || T.accent, borderRadius: 4 }} />
          </div>
          <div style={{ fontFamily: f.mono, fontSize: 10, color: T.textMid, width: 40, textAlign: "right" }}>{d.display || d.value}</div>
        </div>
      ))}
    </div>
  );
}

// ── SLIDE WRAPPER ─────────────────────────────────────────────
function Slide({ children, style = {} }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%", padding: "0 clamp(22px, 5vw, 72px)", gap: 20, ...style }}>
      {children}
    </div>
  );
}

// ╔══════════════════════════════════════════════════════════════╗
// ║  FORMAT 1: PROPOSAL                                        ║
// ╚══════════════════════════════════════════════════════════════╝

const PROPOSAL_SLIDES = [
  function PropTitle({ T }) {
    return (
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100%", textAlign: "center", padding: "0 clamp(32px, 7vw, 120px)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "38%", left: "50%", width: 560, height: 360, background: `radial-gradient(ellipse, ${T.accentGlow} 0%, transparent 65%)`, transform: "translate(-50%,-50%)", pointerEvents: "none" }} />
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 32, position: "relative" }}>
          <BrandMark T={T} size={28} />
          <span style={{ fontFamily: f.sora, fontWeight: 800, fontSize: 15, color: T.text, letterSpacing: "-0.02em" }}>PROPHETX</span>
          <span style={{ fontFamily: f.mono, fontSize: 9, color: T.textDim, letterSpacing: "0.12em", textTransform: "uppercase" }}>Marketing</span>
        </div>
        <h1 style={{ fontFamily: f.sora, fontWeight: 800, fontSize: "clamp(26px, 4vw, 54px)", color: T.text, margin: 0, lineHeight: 1.05, letterSpacing: "-0.04em", position: "relative", maxWidth: 700 }}>
          <span style={{ color: T.accent }}>{DECK.title.split(" ")[0]}</span> {DECK.title.split(" ").slice(1).join(" ")}
        </h1>
        <p style={{ fontFamily: f.sora, fontWeight: 300, fontSize: "clamp(13px, 1.5vw, 17px)", color: T.textMid, marginTop: 18, maxWidth: 520, lineHeight: 1.6, position: "relative" }}>{DECK.subtitle}</p>
        <div style={{ marginTop: 30, display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center", position: "relative" }}>
          <Tag T={T}>Proposal</Tag>
          <Tag T={T} color={T.second}>{DECK.topic}</Tag>
          <Tag T={T} color={T.yellow}>{DECK.date}</Tag>
        </div>
        <div style={{ marginTop: 28, display: "flex", flexDirection: "column", alignItems: "center", gap: 10, position: "relative" }}>
          <div style={{ width: 60, height: 1, background: `linear-gradient(90deg, transparent, ${T.textDim}50, transparent)` }} />
          <div style={{ fontFamily: f.mono, fontSize: 10, color: T.textDim }}>ProphetX Marketing · {DECK.date}</div>
        </div>
      </div>
    );
  },
  function PropSummary({ T }) {
    const pts = [
      { k: "Context", v: "Replace with your executive summary context — the situation, the background, the why." },
      { k: "Proof", v: "Replace with evidence or existing work that validates the proposal." },
      { k: "Vision", v: "Replace with the forward-looking outcome you're proposing." },
      { k: "The Ask", v: "Replace with what you need — approval, budget, headcount, or time." },
    ];
    return (
      <Slide>
        <div><Label T={T}>Executive Summary</Label><H1 T={T}>The <span style={{ color: T.accent }}>TL;DR</span> — what this is and why it matters.</H1><Sub T={T}>Replace this subtitle with a single punchy sentence that captures the deck's thesis.</Sub></div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {pts.map((p, i) => (
            <div key={i} style={{ display: "flex", gap: 14, padding: "12px 16px", background: T.card, border: `1px solid ${T.border}`, borderRadius: 10 }}>
              <div style={{ fontFamily: f.mono, fontSize: 10, color: T.accent, textTransform: "uppercase", letterSpacing: "0.1em", minWidth: 72, paddingTop: 1, flexShrink: 0 }}>{p.k}</div>
              <div style={{ fontFamily: f.sora, fontSize: 13, color: T.textMid, lineHeight: 1.5 }}>{p.v}</div>
            </div>
          ))}
        </div>
        <Banner T={T}>Replace this banner with the single most important takeaway from this slide.</Banner>
      </Slide>
    );
  },
  function PropOpportunity({ T }) {
    const without = ["Manual process 1 — describe the friction", "Manual process 2 — describe the friction", "Scaling output requires scaling headcount", "Knowledge lives in people's heads", "Slow feedback loops"];
    const withAI  = ["Automated version of process 1", "Automated version of process 2", "Scaling output = refining the system", "Knowledge codified and reusable", "Real-time insights surfaced automatically"];
    return (
      <Slide>
        <div><Label T={T}>The Opportunity</Label><H1 T={T}>The problem is <span style={{ color: T.accent }}>real.</span> The solution is ready.</H1><Sub T={T}>Replace with a one-sentence framing of the opportunity and why now is the right time.</Sub></div>
        <div style={{ display: "flex", gap: 12 }}>
          {[{ label: "Without", items: without, color: T.red }, { label: "With", items: withAI, color: T.accent }].map(col => (
            <div key={col.label} style={{ flex: 1, background: `linear-gradient(145deg, ${col.color}12, ${col.color}04)`, border: `1px solid ${col.color}25`, borderRadius: 12, padding: "18px 16px", display: "flex", flexDirection: "column", gap: 10 }}>
              <div style={{ fontFamily: f.mono, fontSize: 10, color: col.color, textTransform: "uppercase", letterSpacing: "0.1em" }}>{col.label}</div>
              {col.items.map((t, i) => (
                <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                  <Pip T={T} color={col.color} />
                  <div style={{ fontFamily: f.sora, fontSize: 12, color: T.textMid, lineHeight: 1.4 }}>{t}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
        <Banner T={T}>Replace with the "so what" — the consequence of not acting, or the gain of acting now.</Banner>
      </Slide>
    );
  },
  function PropApproach({ T }) {
    const items = [
      { n: "01", icon: "◈", name: "Initiative One", desc: "Replace with a description of the first key initiative or pillar of your approach.", tag: "Live" },
      { n: "02", icon: "◉", name: "Initiative Two", desc: "Replace with a description of the second initiative.", tag: "Live" },
      { n: "03", icon: "◎", name: "Initiative Three", desc: "Replace with a description of the third initiative.", tag: "In Progress" },
      { n: "04", icon: "◇", name: "Initiative Four", desc: "Replace with a description of the fourth initiative.", tag: "In Progress" },
      { n: "05", icon: "○", name: "Initiative Five", desc: "Replace with a description of the fifth initiative.", tag: "Planned" },
    ];
    return (
      <Slide>
        <div><Label T={T}>The Approach</Label><H1 T={T}>Five initiatives. <span style={{ color: T.accent }}>One system.</span></H1><Sub T={T}>Replace subtitle — explain what makes this approach coherent as a system, not just a list.</Sub></div>
        <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
          {items.map(p => (
            <div key={p.n} style={{ display: "flex", gap: 14, padding: "11px 16px", background: T.card, border: `1px solid ${T.border}`, borderRadius: 10 }}>
              <div style={{ fontFamily: f.sora, fontSize: 18, color: T.accent, minWidth: 24, flexShrink: 0 }}>{p.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
                  <span style={{ fontFamily: f.sora, fontWeight: 700, fontSize: 13, color: T.text }}>{p.name}</span>
                  <Tag T={T} color={p.tag === "Live" ? T.accent : p.tag === "In Progress" ? T.yellow : T.textDim}>{p.tag}</Tag>
                </div>
                <div style={{ fontFamily: f.sora, fontSize: 12, color: T.textMid, lineHeight: 1.4 }}>{p.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </Slide>
    );
  },
  function PropShowTell({ T }) {
    return (
      <Slide>
        <div><Label T={T}>Show & Tell</Label><H1 T={T}>Here's what it <span style={{ color: T.accent }}>already looks like.</span></H1><Sub T={T}>Replace with context about the demonstration — what you're showing and why it's relevant evidence.</Sub></div>
        <div style={{ display: "flex", gap: 12 }}>
          {[{ v: "Metric 1", l: "Replace label", c: T.accent }, { v: "Metric 2", l: "Replace label", c: T.second }, { v: "Metric 3", l: "Replace label", c: T.yellow }].map((s, i) => <StatBox key={i} T={T} value={s.v} label={s.l} color={s.c} />)}
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          {[{ label: "What the system handled", color: T.accent, items: ["Replace with item 1", "Replace with item 2", "Replace with item 3", "Replace with item 4"] }, { label: "What I handled", color: T.second, items: ["Replace with item 1", "Replace with item 2", "Replace with item 3"] }].map(col => (
            <Card T={T} key={col.label} style={{ flex: 1 }}>
              <div style={{ fontFamily: f.mono, fontSize: 10, color: col.color, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10 }}>{col.label}</div>
              {col.items.map((t, i) => (
                <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start", marginBottom: 6 }}>
                  <Pip T={T} color={col.color} />
                  <div style={{ fontFamily: f.sora, fontSize: 12, color: T.textMid }}>{t}</div>
                </div>
              ))}
            </Card>
          ))}
        </div>
        <Banner T={T}>Replace with the key insight from the demonstration.</Banner>
      </Slide>
    );
  },
  function PropVision({ T }) {
    const phases = [
      { phase: "Phase 1", label: "Solo", status: "Now", color: T.accent, desc: "Replace with Phase 1 description — the current state and what's already proven." },
      { phase: "Phase 2", label: "Team", status: "Q2 2025", color: T.second, desc: "Replace with Phase 2 description — the expansion plan and what it unlocks." },
      { phase: "Phase 3", label: "Org", status: "Q3 2025", color: T.yellow, desc: "Replace with Phase 3 description — the long-term vision and org-wide impact." },
    ];
    return (
      <Slide>
        <div><Label T={T}>Expansion Vision</Label><H1 T={T}>From <span style={{ color: T.accent }}>one</span> to the whole organisation.</H1><Sub T={T}>Replace with a framing sentence about the expansion arc.</Sub></div>
        <div style={{ display: "flex", gap: 12 }}>
          {phases.map((p, i) => (
            <div key={i} style={{ flex: 1, background: `linear-gradient(155deg, ${p.color}12, ${p.color}04)`, border: `1px solid ${p.color}25`, borderRadius: 12, padding: "20px 16px", display: "flex", flexDirection: "column", gap: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ fontFamily: f.mono, fontSize: 9, color: p.color, textTransform: "uppercase", letterSpacing: "0.1em" }}>{p.phase}</div>
                <Tag T={T} color={p.color}>{p.status}</Tag>
              </div>
              <div style={{ fontFamily: f.sora, fontWeight: 800, fontSize: 26, color: T.text, lineHeight: 1 }}>{p.label}</div>
              <div style={{ width: 28, height: 3, background: p.color, borderRadius: 2 }} />
              <div style={{ fontFamily: f.sora, fontSize: 12, color: T.textMid, lineHeight: 1.5, marginTop: "auto" }}>{p.desc}</div>
            </div>
          ))}
        </div>
        <Banner T={T}>Replace with the single most compelling reason this expansion makes sense now.</Banner>
      </Slide>
    );
  },
  function PropRoadmap({ T }) {
    const ms = [
      { period: "Now", items: ["Milestone already complete", "Milestone already complete", "Milestone already complete"] },
      { period: "30 Days", items: ["First near-term milestone", "Second near-term milestone"] },
      { period: "60 Days", items: ["First mid-term milestone", "Second mid-term milestone"] },
      { period: "90 Days", items: ["First long-term milestone", "Second long-term milestone"] },
    ];
    return (
      <Slide>
        <div><Label T={T}>Timeline & Roadmap</Label><H1 T={T}>A <span style={{ color: T.accent }}>90-day</span> plan.</H1></div>
        <div style={{ display: "flex", gap: 10 }}>
          {ms.map((m, i) => (
            <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: T.accent }} />
                <div style={{ fontFamily: f.sora, fontWeight: 700, fontSize: 13, color: T.accent }}>{m.period}</div>
              </div>
              <Card T={T} style={{ flex: 1 }}>
                {m.items.map((item, j) => (
                  <div key={j} style={{ display: "flex", gap: 7, alignItems: "flex-start", marginBottom: j < m.items.length - 1 ? 8 : 0 }}>
                    <Pip T={T} />
                    <div style={{ fontFamily: f.sora, fontSize: 11, color: T.textMid, lineHeight: 1.4 }}>{item}</div>
                  </div>
                ))}
              </Card>
            </div>
          ))}
        </div>
        <Banner T={T}>Replace with a note on timeline confidence — what's locked vs. what's indicative.</Banner>
      </Slide>
    );
  },
  function PropResources({ T }) {
    return (
      <Slide>
        <div><Label T={T}>Resource Ask</Label><H1 T={T}>The investment is <span style={{ color: T.accent }}>minimal.</span> The return is not.</H1><Sub T={T}>Replace with a framing sentence about the ask — position it relative to expected return.</Sub></div>
        <div style={{ display: "flex", gap: 12 }}>
          {[{ cat: "Tooling", color: T.accent, rows: [{ l: "Tool / platform 1", v: "$0", n: "Note about this item" }, { l: "Tool / platform 2", v: "$X/mo", n: "Note about this item" }, { l: "Tool / platform 3", v: "Existing", n: "Note about this item" }] }, { cat: "Time", color: T.second, rows: [{ l: "Time investment 1", v: "X hrs", n: "One-time" }, { l: "Time investment 2", v: "X hrs/mo", n: "Ongoing" }, { l: "Time investment 3", v: "Embedded", n: "Part of normal workflow" }] }].map((cat, i) => (
            <Card T={T} key={i} style={{ flex: 1 }}>
              <div style={{ fontFamily: f.mono, fontSize: 10, color: cat.color, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12 }}>{cat.cat}</div>
              {cat.rows.map((r, j) => (
                <div key={j} style={{ paddingBottom: 10, marginBottom: 10, borderBottom: j < cat.rows.length - 1 ? `1px solid ${T.border}` : "none" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
                    <span style={{ fontFamily: f.sora, fontWeight: 600, fontSize: 12, color: T.text }}>{r.l}</span>
                    <span style={{ fontFamily: f.sora, fontWeight: 700, fontSize: 12, color: cat.color }}>{r.v}</span>
                  </div>
                  <div style={{ fontFamily: f.sora, fontSize: 11, color: T.textDim }}>{r.n}</div>
                </div>
              ))}
            </Card>
          ))}
        </div>
        <div style={{ padding: "12px 16px", background: T.accentDim, border: `1px solid ${T.accent}28`, borderRadius: 10 }}>
          <div style={{ fontFamily: f.sora, fontWeight: 700, fontSize: 12, color: T.text, marginBottom: 3 }}>What I'm asking for</div>
          <div style={{ fontFamily: f.sora, fontSize: 12, color: T.textMid, lineHeight: 1.5 }}>Replace with a plain-English statement of the specific ask — approval, budget, seats, or calendar time.</div>
        </div>
      </Slide>
    );
  },
  function PropTeam({ T }) {
    const team = [
      { name: "Team Member Name", role: "Role / Title", owns: "Area of ownership within this proposal", tag: "Owner" },
      { name: "Team Member Name", role: "Role / Title", owns: "Area of ownership within this proposal", tag: "User" },
      { name: "Team Member Name", role: "Role / Title", owns: "Area of ownership within this proposal", tag: "User" },
      { name: "Team Member Name", role: "Role / Title", owns: "Area of ownership within this proposal", tag: "User" },
    ];
    return (
      <Slide>
        <div><Label T={T}>The Team</Label><H1 T={T}>One system. <span style={{ color: T.accent }}>Every person.</span></H1><Sub T={T}>Replace with a sentence about how the team is structured around this proposal.</Sub></div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {team.map((m, i) => (
            <div key={i} style={{ display: "flex", gap: 14, alignItems: "center", padding: "12px 16px", background: T.card, border: `1px solid ${i === 0 ? T.accent + "40" : T.border}`, borderRadius: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: i === 0 ? T.accent : T.border, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <span style={{ fontFamily: f.sora, fontWeight: 800, fontSize: 14, color: i === 0 ? T.onAccent : T.textDim }}>{m.name[0]}</span>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
                  <span style={{ fontFamily: f.sora, fontWeight: 700, fontSize: 13, color: T.text }}>{m.name}</span>
                  <Tag T={T} color={i === 0 ? T.accent : T.second}>{m.tag}</Tag>
                </div>
                <div style={{ fontFamily: f.mono, fontSize: 9, color: T.textDim, marginBottom: 2 }}>{m.role}</div>
                <div style={{ fontFamily: f.sora, fontSize: 11, color: T.textMid }}>{m.owns}</div>
              </div>
            </div>
          ))}
        </div>
      </Slide>
    );
  },
  function PropNextSteps({ T }) {
    const steps = [
      { n: "01", title: "First action item", desc: "Replace with a specific, ownable action — who does what by when." },
      { n: "02", title: "Second action item", desc: "Replace with a specific, ownable action — who does what by when." },
      { n: "03", title: "Third action item", desc: "Replace with a specific, ownable action — who does what by when." },
    ];
    return (
      <Slide>
        <div style={{ textAlign: "center" }}><Label T={T}>Next Steps</Label><H1 T={T}>Three things to <span style={{ color: T.accent }}>move forward.</span></H1><Sub T={T}>Replace with a closing sentence that motivates action.</Sub></div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {steps.map(s => (
            <Card T={T} key={s.n} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
              <div style={{ fontFamily: f.sora, fontWeight: 800, fontSize: 28, color: T.accent, lineHeight: 1, minWidth: 38 }}>{s.n}</div>
              <div>
                <div style={{ fontFamily: f.sora, fontWeight: 700, fontSize: 14, color: T.text, marginBottom: 3 }}>{s.title}</div>
                <div style={{ fontFamily: f.sora, fontSize: 12, color: T.textDim, lineHeight: 1.5 }}>{s.desc}</div>
              </div>
            </Card>
          ))}
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <div style={{ flex: 1, background: T.accentDim, border: `1px solid ${T.accent}30`, borderRadius: 10, padding: "12px 16px", display: "flex", gap: 10, alignItems: "center" }}>
            <BrandMark T={T} size={22} />
            <div>
              <div style={{ fontFamily: f.sora, fontWeight: 600, fontSize: 12, color: T.text }}>Prepared by {DECK.presenter}</div>
              <div style={{ fontFamily: f.mono, fontSize: 10, color: T.textDim }}>{DECK.contact}</div>
            </div>
          </div>
          <div style={{ flex: 2, background: T.accent, borderRadius: 10, padding: "12px 16px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontFamily: f.sora, fontWeight: 700, fontSize: 13, color: T.onAccent }}>ProphetX Marketing · {DECK.date}</span>
          </div>
        </div>
      </Slide>
    );
  },
];

const PROPOSAL_LABELS = ["Title", "Summary", "Opportunity", "Approach", "Show & Tell", "Vision", "Roadmap", "Resources", "Team", "Next Steps"];

// ╔══════════════════════════════════════════════════════════════╗
// ║  FORMAT 2: REPORTING DECK                                  ║
// ╚══════════════════════════════════════════════════════════════╝

const REPORTING_SLIDES = [
  function RepTitle({ T }) {
    return (
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100%", textAlign: "center", padding: "0 clamp(32px, 7vw, 120px)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "35%", left: "50%", width: 500, height: 340, background: `radial-gradient(ellipse, ${T.accentGlow} 0%, transparent 65%)`, transform: "translate(-50%,-50%)", pointerEvents: "none" }} />
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 28, position: "relative" }}>
          <BrandMark T={T} size={28} /><span style={{ fontFamily: f.sora, fontWeight: 800, fontSize: 15, color: T.text }}>PROPHETX</span>
          <span style={{ fontFamily: f.mono, fontSize: 9, color: T.textDim, letterSpacing: "0.12em", textTransform: "uppercase" }}>Marketing</span>
        </div>
        <h1 style={{ fontFamily: f.sora, fontWeight: 800, fontSize: "clamp(24px, 3.8vw, 50px)", color: T.text, margin: 0, lineHeight: 1.05, letterSpacing: "-0.04em", position: "relative" }}>
          {DECK.title}<br /><span style={{ color: T.accent }}>Report</span>
        </h1>
        <p style={{ fontFamily: f.sora, fontWeight: 300, fontSize: "clamp(13px, 1.4vw, 16px)", color: T.textMid, marginTop: 16, maxWidth: 440, lineHeight: 1.6, position: "relative" }}>{DECK.subtitle}</p>
        <div style={{ marginTop: 24, display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center", position: "relative" }}>
          <Tag T={T}>Date Range</Tag><Tag T={T} color={T.second}>Data Source</Tag><Tag T={T} color={T.yellow}>Internal</Tag>
        </div>
        <div style={{ marginTop: 24, display: "flex", flexDirection: "column", alignItems: "center", gap: 10, position: "relative" }}>
          <div style={{ width: 60, height: 1, background: `linear-gradient(90deg, transparent, ${T.textDim}50, transparent)` }} />
          <div style={{ fontFamily: f.mono, fontSize: 10, color: T.textDim }}>Prepared by {DECK.presenter} · {DECK.date}</div>
        </div>
      </div>
    );
  },
  function RepKPIs({ T }) {
    return (
      <Slide>
        <div><Label T={T}>Performance Snapshot</Label><H1 T={T}>Headline numbers — <span style={{ color: T.accent }}>week ending [date].</span></H1><Sub T={T}>Replace subtitle — add context on the period, comparison baseline, and any notable conditions.</Sub></div>
        <div style={{ display: "flex", gap: 10 }}>
          {[{ v: "0,000", l: "Primary KPI", c: T.accent }, { v: "+0%", l: "vs Prior Period", c: T.accent }, { v: "0.0%", l: "Conversion Rate", c: T.second }, { v: "$0K", l: "Pipeline / Value", c: T.yellow }].map((s, i) => <StatBox key={i} T={T} value={s.v} label={s.l} color={s.c} />)}
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          {[{ label: "On Track", color: T.accent, note: "Replace with what's performing above target — be specific." }, { label: "Watch", color: T.yellow, note: "Replace with what needs attention — include magnitude of deviation." }, { label: "Action Needed", color: T.red, note: "Replace with what's underperforming — include proposed fix." }].map(f2 => (
            <Card T={T} key={f2.label} style={{ flex: 1, borderLeft: `3px solid ${f2.color}` }}>
              <div style={{ fontFamily: f.mono, fontSize: 9, color: f2.color, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4 }}>{f2.label}</div>
              <div style={{ fontFamily: f.sora, fontSize: 12, color: T.textMid, lineHeight: 1.4 }}>{f2.note}</div>
            </Card>
          ))}
        </div>
        <Banner T={T}>Replace with the single most important insight from this week's data — not a summary, an insight.</Banner>
      </Slide>
    );
  },
  function RepChannels({ T }) {
    const data = [
      { label: "Channel 1", value: 80, display: "0,000", color: T.accent },
      { label: "Channel 2", value: 60, display: "0,000", color: T.second },
      { label: "Channel 3", value: 35, display: "0,000", color: T.yellow },
      { label: "Channel 4", value: 15, display: "0,000", color: T.textDim },
    ];
    return (
      <Slide>
        <div><Label T={T}>Channel Breakdown</Label><H1 T={T}>Where the <span style={{ color: T.accent }}>volume is coming from.</span></H1><Sub T={T}>Replace with a sentence framing what the channel mix tells us this period.</Sub></div>
        <div style={{ display: "flex", gap: 12 }}>
          <Card T={T} style={{ flex: 2 }}>
            <div style={{ fontFamily: f.mono, fontSize: 9, color: T.textDim, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12 }}>Volume by channel</div>
            <BarChart T={T} data={data} />
          </Card>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
            {data.map((d, i) => (
              <Card T={T} key={i} style={{ flex: 1 }}>
                <div style={{ fontFamily: f.mono, fontSize: 9, color: d.color, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 3 }}>{d.label}</div>
                <div style={{ fontFamily: f.sora, fontWeight: 800, fontSize: 20, color: T.text, lineHeight: 1 }}>{d.display}</div>
                <div style={{ fontFamily: f.sora, fontSize: 11, color: T.textDim, marginTop: 2 }}>Replace with delta vs prior period</div>
              </Card>
            ))}
          </div>
        </div>
        <Banner T={T}>Replace with the channel-level insight — which is over/under-indexing and what it means.</Banner>
      </Slide>
    );
  },
  function RepRAG({ T }) {
    const items = [
      { label: "Initiative / Campaign 1", status: "green", owner: "Owner", note: "On track — replace with specific status note." },
      { label: "Initiative / Campaign 2", status: "green", owner: "Owner", note: "On track — replace with specific status note." },
      { label: "Initiative / Campaign 3", status: "amber", owner: "Owner", note: "At risk — replace with what's causing the risk and mitigation." },
      { label: "Initiative / Campaign 4", status: "amber", owner: "Owner", note: "At risk — replace with what's causing the risk and mitigation." },
      { label: "Initiative / Campaign 5", status: "red", owner: "Owner", note: "Off track — replace with what's broken and what action is taken." },
    ];
    const colors = { green: T.accent, amber: T.yellow, red: T.red };
    const labels = { green: "On Track", amber: "At Risk", red: "Off Track" };
    return (
      <Slide>
        <div><Label T={T}>Initiative Health</Label><H1 T={T}>RAG status — <span style={{ color: T.accent }}>what's moving, what's stuck.</span></H1></div>
        <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
          {items.map((item, i) => (
            <div key={i} style={{ display: "flex", gap: 14, alignItems: "center", padding: "11px 16px", background: T.card, border: `1px solid ${T.border}`, borderLeft: `3px solid ${colors[item.status]}`, borderRadius: 10 }}>
              <div style={{ minWidth: 70, flexShrink: 0 }}>
                <div style={{ fontFamily: f.mono, fontSize: 9, color: colors[item.status], textTransform: "uppercase", letterSpacing: "0.08em" }}>{labels[item.status]}</div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: f.sora, fontWeight: 600, fontSize: 13, color: T.text, marginBottom: 2 }}>{item.label}</div>
                <div style={{ fontFamily: f.sora, fontSize: 11, color: T.textMid, lineHeight: 1.4 }}>{item.note}</div>
              </div>
              <div style={{ fontFamily: f.mono, fontSize: 9, color: T.textDim, flexShrink: 0 }}>{item.owner}</div>
            </div>
          ))}
        </div>
        <Banner T={T}>Replace with a summary of overall initiative health and the one thing that needs a decision this week.</Banner>
      </Slide>
    );
  },
  function RepNextSteps({ T }) {
    const steps = [
      { n: "01", title: "Action item one", desc: "Replace — specific, ownable, time-bound." },
      { n: "02", title: "Action item two", desc: "Replace — specific, ownable, time-bound." },
      { n: "03", title: "Action item three", desc: "Replace — specific, ownable, time-bound." },
    ];
    return (
      <Slide>
        <div style={{ textAlign: "center" }}><Label T={T}>Actions</Label><H1 T={T}>What moves <span style={{ color: T.accent }}>this week.</span></H1></div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {steps.map(s => (
            <Card T={T} key={s.n} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
              <div style={{ fontFamily: f.sora, fontWeight: 800, fontSize: 28, color: T.accent, lineHeight: 1, minWidth: 36 }}>{s.n}</div>
              <div><div style={{ fontFamily: f.sora, fontWeight: 700, fontSize: 14, color: T.text, marginBottom: 3 }}>{s.title}</div><div style={{ fontFamily: f.sora, fontSize: 12, color: T.textDim, lineHeight: 1.5 }}>{s.desc}</div></div>
            </Card>
          ))}
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <div style={{ flex: 1, background: T.accentDim, border: `1px solid ${T.accent}28`, borderRadius: 10, padding: "12px 16px", display: "flex", gap: 10, alignItems: "center" }}>
            <BrandMark T={T} size={20} />
            <div><div style={{ fontFamily: f.sora, fontWeight: 600, fontSize: 12, color: T.text }}>Prepared by {DECK.presenter}</div><div style={{ fontFamily: f.mono, fontSize: 10, color: T.textDim }}>{DECK.contact}</div></div>
          </div>
          <div style={{ flex: 2, background: T.accent, borderRadius: 10, padding: "12px 16px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontFamily: f.sora, fontWeight: 700, fontSize: 13, color: T.onAccent }}>Next review: [Date] · ProphetX Marketing</span>
          </div>
        </div>
      </Slide>
    );
  },
];

const REPORTING_LABELS = ["Title", "KPIs", "Channels", "RAG Status", "Actions"];

// ╔══════════════════════════════════════════════════════════════╗
// ║  FORMAT 3: SCROLL DOC                                      ║
// ╚══════════════════════════════════════════════════════════════╝

const SCROLL_SECTIONS = [
  { label: "Overview", content: function ScrollOverview({ T }) {
    return (
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "60px 0 40px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 28 }}>
          <BrandMark T={T} size={24} />
          <span style={{ fontFamily: f.sora, fontWeight: 800, fontSize: 14, color: T.text }}>PROPHETX</span>
          <span style={{ fontFamily: f.mono, fontSize: 9, color: T.textDim, letterSpacing: "0.12em", textTransform: "uppercase" }}>Marketing</span>
        </div>
        <div style={{ fontFamily: f.mono, fontSize: 10, color: T.accent, textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 14 }}>Document Overview</div>
        <h1 style={{ fontFamily: f.sora, fontWeight: 800, fontSize: "clamp(28px, 4vw, 52px)", color: T.text, margin: 0, lineHeight: 1.05, letterSpacing: "-0.04em", marginBottom: 16 }}>
          {DECK.title}<br /><span style={{ color: T.accent }}>— {DECK.topic}</span>
        </h1>
        <p style={{ fontFamily: f.sora, fontWeight: 300, fontSize: 17, color: T.textMid, lineHeight: 1.7, marginBottom: 28 }}>{DECK.subtitle} Replace this with a fuller introduction paragraph — one to three sentences that orient the reader on what they're about to read and why it matters.</p>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 32 }}>
          <Tag T={T}>Scroll Document</Tag><Tag T={T} color={T.second}>{DECK.topic}</Tag><Tag T={T} color={T.yellow}>{DECK.date}</Tag>
        </div>
        <div style={{ height: 1, background: T.border, marginBottom: 32 }} />
        <div style={{ fontFamily: f.mono, fontSize: 10, color: T.textDim, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 12 }}>Contents</div>
        {["Overview", "Context & Background", "Key Findings", "Timeline", "Recommendations", "Closing"].map((s, i) => (
          <div key={i} style={{ display: "flex", gap: 10, alignItems: "center", padding: "8px 0", borderBottom: `1px solid ${T.border}` }}>
            <div style={{ fontFamily: f.mono, fontSize: 10, color: T.accent, width: 20 }}>{String(i + 1).padStart(2, "0")}</div>
            <div style={{ fontFamily: f.sora, fontSize: 14, color: T.text }}>{s}</div>
          </div>
        ))}
        <div style={{ marginTop: 20, fontFamily: f.mono, fontSize: 10, color: T.textDim }}>Prepared by {DECK.presenter} · {DECK.contact} · {DECK.date}</div>
      </div>
    );
  }},
  { label: "Context", content: function ScrollContext({ T }) {
    return (
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "40px 0" }}>
        <div style={{ fontFamily: f.mono, fontSize: 10, color: T.accent, textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 12 }}>01 — Context & Background</div>
        <h2 style={{ fontFamily: f.sora, fontWeight: 800, fontSize: "clamp(22px, 3vw, 36px)", color: T.text, margin: "0 0 16px", letterSpacing: "-0.03em", lineHeight: 1.1 }}>Replace with the context headline — what situation are we describing?</h2>
        <p style={{ fontFamily: f.sora, fontSize: 15, color: T.textMid, lineHeight: 1.8, marginBottom: 20 }}>Replace this paragraph with background context. This should orient the reader on the situation — what was happening, what the conditions were, and why this document exists. Write in plain, direct prose. Avoid bullet points here; this section should read like a brief.</p>
        <p style={{ fontFamily: f.sora, fontSize: 15, color: T.textMid, lineHeight: 1.8, marginBottom: 28 }}>Add a second paragraph if needed. Use this space to establish any key terms, constraints, or assumptions the reader needs before moving into findings.</p>
        <div style={{ padding: "16px 20px", background: T.accentDim, borderLeft: `3px solid ${T.accent}`, borderRadius: "0 8px 8px 0", marginBottom: 24 }}>
          <div style={{ fontFamily: f.mono, fontSize: 9, color: T.accent, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 6 }}>Key Assumption</div>
          <div style={{ fontFamily: f.sora, fontSize: 14, color: T.text, lineHeight: 1.5 }}>Replace with a key assumption or constraint that underpins everything that follows.</div>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          {[{ l: "Context metric 1", v: "Replace" }, { l: "Context metric 2", v: "Replace" }, { l: "Context metric 3", v: "Replace" }].map((s, i) => (
            <div key={i} style={{ flex: 1, padding: "14px 16px", background: T.card, border: `1px solid ${T.border}`, borderRadius: 10, textAlign: "center" }}>
              <div style={{ fontFamily: f.sora, fontWeight: 800, fontSize: 22, color: T.accent, marginBottom: 4 }}>{s.v}</div>
              <div style={{ fontFamily: f.mono, fontSize: 9, color: T.textDim, textTransform: "uppercase", letterSpacing: "0.08em" }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }},
  { label: "Findings", content: function ScrollFindings({ T }) {
    return (
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "40px 0" }}>
        <div style={{ fontFamily: f.mono, fontSize: 10, color: T.accent, textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 12 }}>02 — Key Findings</div>
        <h2 style={{ fontFamily: f.sora, fontWeight: 800, fontSize: "clamp(22px, 3vw, 36px)", color: T.text, margin: "0 0 16px", letterSpacing: "-0.03em", lineHeight: 1.1 }}>Replace with the findings headline — what did we learn?</h2>
        <p style={{ fontFamily: f.sora, fontSize: 15, color: T.textMid, lineHeight: 1.8, marginBottom: 24 }}>Replace with a brief intro to the findings — set up what the reader is about to see and why these are the most important takeaways from the data or research.</p>
        {[{ n: "01", title: "Finding one headline", body: "Replace with a full description of this finding. Write in prose — explain what you found, what the data shows, and what it means. One to two sentences of context followed by the specific insight." }, { n: "02", title: "Finding two headline", body: "Replace with a full description of this finding. Include relevant data points inline, like 'conversion rate dropped from 4.2% to 3.1% over the period, driven primarily by mobile underperformance.'" }, { n: "03", title: "Finding three headline", body: "Replace with a full description of this finding. If there's a nuance or caveat to this finding, include it here — readers of scroll docs expect more depth than slide decks." }].map(f2 => (
          <div key={f2.n} style={{ marginBottom: 20, padding: "20px 22px", background: T.card, border: `1px solid ${T.border}`, borderRadius: 12 }}>
            <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
              <div style={{ fontFamily: f.sora, fontWeight: 800, fontSize: 24, color: T.accent, lineHeight: 1, minWidth: 32, flexShrink: 0 }}>{f2.n}</div>
              <div>
                <div style={{ fontFamily: f.sora, fontWeight: 700, fontSize: 15, color: T.text, marginBottom: 6 }}>{f2.title}</div>
                <div style={{ fontFamily: f.sora, fontSize: 14, color: T.textMid, lineHeight: 1.7 }}>{f2.body}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }},
  { label: "Timeline", content: function ScrollTimeline({ T }) {
    const events = [
      { date: "Date / Period", title: "Event or milestone title", desc: "Replace with a description of what happened at this point — what was decided, launched, or discovered. Keep it to one to two sentences." },
      { date: "Date / Period", title: "Event or milestone title", desc: "Replace with event description. This format works well for project timelines, campaign histories, or decision logs." },
      { date: "Date / Period", title: "Event or milestone title", desc: "Replace with event description. Use past tense for completed events, present tense for current status, future tense for planned items." },
      { date: "Date / Period", title: "Event or milestone title", desc: "Replace with event description." },
      { date: "Date / Period", title: "Planned — Future milestone", desc: "Replace with what's coming next and what it depends on." },
    ];
    return (
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "40px 0" }}>
        <div style={{ fontFamily: f.mono, fontSize: 10, color: T.accent, textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 12 }}>03 — Timeline</div>
        <h2 style={{ fontFamily: f.sora, fontWeight: 800, fontSize: "clamp(22px, 3vw, 36px)", color: T.text, margin: "0 0 16px", letterSpacing: "-0.03em", lineHeight: 1.1 }}>Replace with timeline headline — what arc does this cover?</h2>
        <p style={{ fontFamily: f.sora, fontSize: 15, color: T.textMid, lineHeight: 1.8, marginBottom: 28 }}>Replace with a brief intro — describe what period this timeline covers and what the key inflection points are.</p>
        <div style={{ position: "relative" }}>
          <div style={{ position: "absolute", left: 72, top: 0, bottom: 0, width: 1, background: T.border }} />
          {events.map((e, i) => (
            <div key={i} style={{ display: "flex", gap: 20, marginBottom: 24, position: "relative" }}>
              <div style={{ width: 64, flexShrink: 0, textAlign: "right" }}>
                <div style={{ fontFamily: f.mono, fontSize: 10, color: T.textDim, lineHeight: 1.4 }}>{e.date}</div>
              </div>
              <div style={{ width: 16, flexShrink: 0, display: "flex", justifyContent: "center", paddingTop: 2 }}>
                <div style={{ width: 9, height: 9, borderRadius: "50%", background: T.accent, border: `2px solid ${T.bg}`, zIndex: 1 }} />
              </div>
              <div style={{ flex: 1, paddingBottom: 20, borderBottom: i < events.length - 1 ? "none" : "none" }}>
                <div style={{ fontFamily: f.sora, fontWeight: 700, fontSize: 14, color: T.text, marginBottom: 4 }}>{e.title}</div>
                <div style={{ fontFamily: f.sora, fontSize: 13, color: T.textMid, lineHeight: 1.6 }}>{e.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }},
  { label: "Recommendations", content: function ScrollRecs({ T }) {
    return (
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "40px 0" }}>
        <div style={{ fontFamily: f.mono, fontSize: 10, color: T.accent, textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 12 }}>04 — Recommendations</div>
        <h2 style={{ fontFamily: f.sora, fontWeight: 800, fontSize: "clamp(22px, 3vw, 36px)", color: T.text, margin: "0 0 16px", letterSpacing: "-0.03em", lineHeight: 1.1 }}>Replace with recommendations headline.</h2>
        <p style={{ fontFamily: f.sora, fontSize: 15, color: T.textMid, lineHeight: 1.8, marginBottom: 24 }}>Replace with a brief framing paragraph — explain the basis for these recommendations and how they connect to the findings above.</p>
        {[{ n: "01", priority: "High", title: "Recommendation one", rationale: "Replace with rationale — why this, why now, what it addresses.", action: "Replace with the specific action required." }, { n: "02", priority: "High", title: "Recommendation two", rationale: "Replace with rationale.", action: "Replace with the specific action required." }, { n: "03", priority: "Medium", title: "Recommendation three", rationale: "Replace with rationale.", action: "Replace with the specific action required." }].map((r, i) => (
          <div key={i} style={{ marginBottom: 16, padding: "20px 22px", background: T.card, border: `1px solid ${T.border}`, borderLeft: `3px solid ${T.accent}`, borderRadius: "0 12px 12px 0" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <span style={{ fontFamily: f.sora, fontWeight: 800, fontSize: 22, color: T.accent, lineHeight: 1 }}>{r.n}</span>
                <span style={{ fontFamily: f.sora, fontWeight: 700, fontSize: 14, color: T.text }}>{r.title}</span>
              </div>
              <Tag T={T} color={r.priority === "High" ? T.accent : T.yellow}>{r.priority}</Tag>
            </div>
            <div style={{ fontFamily: f.sora, fontSize: 13, color: T.textMid, lineHeight: 1.6, marginBottom: 8 }}><strong style={{ color: T.text, fontWeight: 600 }}>Why: </strong>{r.rationale}</div>
            <div style={{ fontFamily: f.sora, fontSize: 13, color: T.textMid, lineHeight: 1.6 }}><strong style={{ color: T.accent, fontWeight: 600 }}>Action: </strong>{r.action}</div>
          </div>
        ))}
      </div>
    );
  }},
  { label: "Closing", content: function ScrollClose({ T }) {
    return (
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "40px 0 80px" }}>
        <div style={{ fontFamily: f.mono, fontSize: 10, color: T.accent, textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 12 }}>05 — Closing</div>
        <h2 style={{ fontFamily: f.sora, fontWeight: 800, fontSize: "clamp(22px, 3vw, 36px)", color: T.text, margin: "0 0 16px", letterSpacing: "-0.03em", lineHeight: 1.1 }}>Replace with a closing headline — the "so what" in one line.</h2>
        <p style={{ fontFamily: f.sora, fontSize: 15, color: T.textMid, lineHeight: 1.8, marginBottom: 28 }}>Replace with a closing paragraph — summarise the key message of the whole document in three to five sentences. Don't introduce new information; bring everything together and make the path forward clear.</p>
        <div style={{ padding: "20px 22px", background: T.accentDim, border: `1px solid ${T.accent}28`, borderRadius: 12, marginBottom: 24 }}>
          <div style={{ fontFamily: f.mono, fontSize: 9, color: T.accent, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>Next Steps</div>
          {["Replace with first next step — specific, ownable, time-bound.", "Replace with second next step.", "Replace with third next step."].map((s, i) => (
            <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: i < 2 ? 8 : 0 }}>
              <Pip T={T} />
              <div style={{ fontFamily: f.sora, fontSize: 14, color: T.text, lineHeight: 1.5 }}>{s}</div>
            </div>
          ))}
        </div>
        <div style={{ height: 1, background: T.border, marginBottom: 24 }} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <BrandMark T={T} size={22} />
            <div>
              <div style={{ fontFamily: f.sora, fontWeight: 600, fontSize: 13, color: T.text }}>{DECK.presenter}</div>
              <div style={{ fontFamily: f.mono, fontSize: 10, color: T.textDim }}>{DECK.contact}</div>
            </div>
          </div>
          <div style={{ fontFamily: f.mono, fontSize: 10, color: T.textDim }}>ProphetX Marketing · {DECK.date}</div>
        </div>
      </div>
    );
  }},
];

// ╔══════════════════════════════════════════════════════════════╗
// ║  NAV ENGINE — DO NOT MODIFY                                ║
// ╚══════════════════════════════════════════════════════════════╝

export default function MasterTemplate() {
  const [theme, setTheme] = useState("lightB");
  const [format, setFormat] = useState("proposal");
  const [slideIdx, setSlideIdx] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [exiting, setExiting] = useState(false);
  const [dir, setDir] = useState(1);
  const [touch, setTouch] = useState(null);
  const scrollRef = useRef(null);
  const T = THEMES[theme];

  const slides = format === "proposal" ? PROPOSAL_SLIDES : format === "reporting" ? REPORTING_SLIDES : null;
  const labels = format === "proposal" ? PROPOSAL_LABELS : format === "reporting" ? REPORTING_LABELS : SCROLL_SECTIONS.map(s => s.label);
  const isScroll = format === "scroll";

  const go = useCallback((delta) => {
    if (animating || isScroll) return;
    const max = slides.length;
    const next = slideIdx + delta;
    if (next < 0 || next >= max) return;
    setDir(delta); setAnimating(true); setExiting(true);
    setTimeout(() => { setExiting(false); setSlideIdx(next); setAnimating(false); }, 270);
  }, [slideIdx, animating, isScroll, slides]);

  useEffect(() => {
    if (isScroll) return;
    const h = (e) => {
      if (e.key === "ArrowRight" || e.key === " ") { e.preventDefault(); go(1); }
      if (e.key === "ArrowLeft") { e.preventDefault(); go(-1); }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [go, isScroll]);

  const switchFormat = (f) => { setFormat(f); setSlideIdx(0); };
  const switchTheme = (t) => setTheme(t);

  const onTouchStart = (e) => setTouch(e.targetTouches[0].clientX);
  const onTouchEnd = (e) => {
    if (!touch || isScroll) return;
    const dist = touch - e.changedTouches[0].clientX;
    if (Math.abs(dist) > 50) go(dist > 0 ? 1 : -1);
    setTouch(null);
  };

  const SlideComp = !isScroll && slides ? slides[slideIdx] : null;

  const controlBar = (
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: 44, background: isScroll ? T.bg : T.bg, borderBottom: `1px solid ${T.border}`, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 18px", zIndex: 100, backdropFilter: "blur(8px)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <BrandMark T={T} size={20} />
        <span style={{ fontFamily: f.sora, fontWeight: 700, fontSize: 12, color: T.text }}>ProphetX</span>
        <span style={{ fontFamily: f.mono, fontSize: 8, color: T.textDim, letterSpacing: "0.1em", textTransform: "uppercase" }}>Templates</span>
      </div>
      <div style={{ display: "flex", gap: 4 }}>
        {Object.values(FORMATS).map(fm => (
          <button key={fm.id} onClick={() => switchFormat(fm.id)} style={{ fontFamily: f.mono, fontSize: 9, padding: "4px 9px", borderRadius: 5, border: `1px solid ${format === fm.id ? T.accent : T.border}`, background: format === fm.id ? T.accentDim : "transparent", color: format === fm.id ? T.accent : T.textDim, cursor: "pointer", letterSpacing: "0.06em", fontWeight: format === fm.id ? 700 : 400 }}>{fm.icon} {fm.label}</button>
        ))}
      </div>
      <div style={{ display: "flex", gap: 4 }}>
        {Object.values(THEMES).map(th => (
          <button key={th.id} onClick={() => switchTheme(th.id)} style={{ fontFamily: f.mono, fontSize: 9, padding: "4px 9px", borderRadius: 5, border: `1px solid ${theme === th.id ? T.accent : T.border}`, background: theme === th.id ? T.accent : "transparent", color: theme === th.id ? T.onAccent : T.textDim, cursor: "pointer", letterSpacing: "0.06em", fontWeight: theme === th.id ? 700 : 400 }}>{th.label}</button>
        ))}
      </div>
    </div>
  );

  return (
    <>
      <style>{fonts}</style>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { overflow: ${isScroll ? "auto" : "hidden"}; background: ${T.bg}; transition: background 0.3s; }
        @keyframes sIn  { from { opacity:0; transform:translateX(48px);  } to { opacity:1; transform:translateX(0); } }
        @keyframes sOut { from { opacity:1; transform:translateX(0);     } to { opacity:0; transform:translateX(-48px); } }
        @keyframes sInR { from { opacity:0; transform:translateX(-48px); } to { opacity:1; transform:translateX(0); } }
        @keyframes sOutR{ from { opacity:1; transform:translateX(0);     } to { opacity:0; transform:translateX(48px); } }
        button { transition: all 0.15s ease; }
        button:hover { opacity: 0.85; transform: translateY(-1px); }
        ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: ${T.surface}; } ::-webkit-scrollbar-thumb { background: ${T.border}; border-radius: 2px; }
      `}</style>

      <div style={{ width: "100vw", minHeight: "100vh", background: T.bg, transition: "background 0.3s ease" }} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        {controlBar}

        {/* Background glow */}
        <div style={{ position: "fixed", inset: 0, pointerEvents: "none", background: `radial-gradient(ellipse at 12% 45%, ${T.accentGlow} 0%, transparent 50%), radial-gradient(ellipse at 88% 75%, ${T.second}08 0%, transparent 45%)`, zIndex: 0 }} />

        {isScroll ? (
          <div style={{ position: "relative", zIndex: 1, paddingTop: 44, paddingLeft: "clamp(20px, 5vw, 60px)", paddingRight: "clamp(20px, 5vw, 60px)" }}>
            {SCROLL_SECTIONS.map((sec, i) => {
              const Comp = sec.content;
              return (
                <div key={i} style={{ borderBottom: i < SCROLL_SECTIONS.length - 1 ? `1px solid ${T.border}` : "none" }}>
                  <Comp T={T} />
                </div>
              );
            })}
          </div>
        ) : (
          <>
            <div key={`${format}-${theme}-${slideIdx}`} style={{ position: "fixed", inset: 0, paddingTop: 44, paddingBottom: 38, zIndex: 1, animation: exiting ? `${dir >= 0 ? "sOut" : "sOutR"} 0.27s ease forwards` : `${dir >= 0 ? "sIn" : "sInR"} 0.3s ease` }}>
              {SlideComp && <SlideComp T={T} />}
            </div>
            {slideIdx > 0 && <button onClick={() => go(-1)} style={{ position: "fixed", left: 12, top: "50%", transform: "translateY(-50%)", background: `${T.card}ee`, border: `1px solid ${T.border}`, color: T.textMid, borderRadius: 7, width: 30, height: 30, fontSize: 16, cursor: "pointer", zIndex: 20, display: "flex", alignItems: "center", justifyContent: "center" }}>‹</button>}
            {slideIdx < slides.length - 1 && <button onClick={() => go(1)} style={{ position: "fixed", right: 12, top: "50%", transform: "translateY(-50%)", background: `${T.card}ee`, border: `1px solid ${T.border}`, color: T.textMid, borderRadius: 7, width: 30, height: 30, fontSize: 16, cursor: "pointer", zIndex: 20, display: "flex", alignItems: "center", justifyContent: "center" }}>›</button>}
            <div style={{ position: "fixed", bottom: 8, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 8, zIndex: 20, alignItems: "center" }}>
              {labels.map((lbl, i) => (
                <div key={i} onClick={() => { setDir(i > slideIdx ? 1 : -1); setSlideIdx(i); }} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, cursor: "pointer" }}>
                  <div style={{ fontFamily: f.mono, fontSize: 8, color: i === slideIdx ? T.accent : `${T.textDim}55`, textTransform: "uppercase", letterSpacing: "0.04em" }}>{lbl}</div>
                  <div style={{ width: i === slideIdx ? 16 : 5, height: 4, borderRadius: 2, background: i === slideIdx ? T.accent : `${T.textDim}28`, transition: "all 0.3s ease" }} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}
