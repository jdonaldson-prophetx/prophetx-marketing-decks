import { useState, useEffect, useCallback } from "react";

const T = {
  bg: "#0C1022", surface: "#181D32", card: "#1E2440",
  accent: "#52CEA6", accentDim: "#52CEA640", accentGlow: "#52CEA620",
  blue: "#3b82f6", red: "#ef4444", yellow: "#FECE07",
  text: "#FFFFFF", textDim: "#8888a0", textMid: "#b0b0c0", border: "#2a3352",
};

const fonts = `@import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');`;

function BrandMark({ size = 26 }) {
  const w = size * (169 / 105), h = size;
  const id = "bm" + size;
  return (
    <svg width={w} height={h} viewBox="0 0 169 105" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
      <defs>
        <linearGradient id={`g0${id}`} x1="132.891" y1="109.971" x2="31.7446" y2="8.8241" gradientUnits="userSpaceOnUse"><stop stopColor="#1DC29A"/><stop offset="0.6255" stopColor="#06ADAA"/><stop offset="1" stopColor="#00A7AF"/></linearGradient>
        <linearGradient id={`g1${id}`} x1="79.5233" y1="52.5572" x2="-65.2089" y2="52.5572" gradientUnits="userSpaceOnUse"><stop stopColor="#1DC29A"/><stop offset="1" stopColor="#00A7AF"/></linearGradient>
        <linearGradient id={`g2${id}`} x1="26.0754" y1="2.10817" x2="98.5236" y2="43.9991" gradientUnits="userSpaceOnUse"><stop stopColor="#1DC29A"/><stop offset="1" stopColor="#00A7AF"/></linearGradient>
      </defs>
      <path d="M79.5234 73.6005L100.056 104.656H138.201L104.959 54.5195L79.5234 73.6005Z" fill={`url(#g0${id})`}/>
      <path d="M119.241 0.464844L123.153 6.2216L92.2171 29.4536L89.5351 31.4011L64.0995 50.4821L61.4004 52.5661L30.4643 75.6615L26.6891 69.9218L0.0234375 104.65H49.6648L45.8725 98.7739L76.8088 75.6615L79.5078 73.5945L104.943 54.5135L107.625 52.549L138.562 29.4536L142.354 35.1933L169.002 0.464844H119.241Z" fill={`url(#g1${id})`}/>
      <path d="M30.8438 0.464844L64.1031 50.4821L89.5388 31.4011L68.8691 0.464844H30.8438Z" fill={`url(#g2${id})`}/>
    </svg>
  );
}

function GlitchText({ text }) {
  return (
    <span style={{ display: "inline-block" }}>
      {text.split("").map((char, i) => (
        <span key={i} className="gc" data-char={char} style={{ display: "inline-block", color: "transparent", position: "relative" }}>{char}</span>
      ))}
    </span>
  );
}

const SL = ({ c, children }) => <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: c || T.accent, textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 10 }}>{children}</div>;
const ST = ({ children }) => <h1 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: "clamp(22px,3.2vw,44px)", lineHeight: 1.1, color: T.text, margin: 0, letterSpacing: "-0.03em" }}>{children}</h1>;
const SS = ({ children }) => <p style={{ fontFamily: "'Sora',sans-serif", fontWeight: 300, fontSize: "clamp(12px,1.5vw,17px)", color: T.textMid, margin: "8px 0 0 0", lineHeight: 1.5 }}>{children}</p>;
const Banner = ({ children, solid }) => solid
  ? <div style={{ padding: "12px 22px", background: `linear-gradient(135deg,${T.accent},${T.accent}cc)`, borderRadius: 10, fontFamily: "'Sora',sans-serif", fontWeight: 600, fontSize: 13, color: T.bg, textAlign: "center" }}>{children}</div>
  : <div style={{ padding: "13px 16px", background: `linear-gradient(90deg,${T.accentGlow},transparent)`, borderLeft: `3px solid ${T.accent}`, borderRadius: "0 10px 10px 0", fontFamily: "'Sora',sans-serif", fontSize: 13, color: T.text, lineHeight: 1.5 }}>{children}</div>;
const Dot = ({ c }) => <div style={{ width: 6, height: 6, borderRadius: "50%", background: c || T.accent, flexShrink: 0, marginTop: 6 }} />;
const PAD = "0 clamp(22px,4.5vw,68px)";

function Slide0() {
  return (
    <div style={{ display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", height:"100%", textAlign:"center", padding:"0 40px", position:"relative", overflow:"hidden" }}>
      <div style={{ position:"absolute", top:"40%", left:"50%", width:700, height:500, background:`radial-gradient(ellipse at center,${T.accent}18 0%,transparent 65%)`, pointerEvents:"none", animation:"gd 8s ease-in-out infinite" }} />
      <div style={{ marginBottom:26, position:"relative" }}><BrandMark size={38} /></div>
      <h1 style={{ fontFamily:"'Sora',sans-serif", fontWeight:800, fontSize:"clamp(30px,5vw,60px)", color:T.text, margin:0, lineHeight:1.05, letterSpacing:"-0.04em", position:"relative" }}>
        AI <GlitchText text="Enablement" />
      </h1>
      <p style={{ fontFamily:"'Sora',sans-serif", fontWeight:300, fontSize:"clamp(13px,1.7vw,19px)", color:T.textMid, marginTop:20, maxWidth:500, lineHeight:1.6, position:"relative" }}>
        What we're building, why it matters,<br/>and what it means for marketing.
      </p>
      <div style={{ marginTop:28, display:"flex", flexDirection:"column", alignItems:"center", gap:18, position:"relative" }}>
        <div style={{ width:130, height:1, background:`linear-gradient(90deg,transparent,${T.textDim},transparent)` }} />
        <div style={{ fontFamily:"'Sora',sans-serif", fontSize:13, color:T.textDim, letterSpacing:"0.05em" }}>Performance Marketing · March 2026</div>
      </div>
    </div>
  );
}

function Slide1() {
  const items = [
    { num:"01", title:"Why we're doing this", sub:"The company-wide mandate and what it means for us" },
    { num:"02", title:"The problem we're solving", sub:"Moving from exploration to production" },
    { num:"03", title:"Output → Outcome → Impact", sub:"How we evaluate every AI project on this team" },
    { num:"04", title:"What's being built", sub:"The Brain, templates, and what benefits marketing first" },
    { num:"05", title:"What this means for your role", sub:"Practical applications across the team" },
    { num:"06", title:"Rules of engagement", sub:"Compliance, documentation, consistency" },
    { num:"07", title:"Next steps", sub:"What we need from you and where we go from here" },
  ];
  return (
    <div style={{ display:"flex", flexDirection:"column", justifyContent:"center", height:"100%", padding:PAD, gap:18 }}>
      <div><SL>Today's Agenda</SL><ST>What we're <span style={{ color:T.accent }}>covering</span> today.</ST></div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:9 }}>
        {items.map(item => (
          <div key={item.num} style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:10, padding:"12px 15px", display:"flex", gap:13, alignItems:"flex-start" }}>
            <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:12, color:T.accent, fontWeight:500, minWidth:24 }}>{item.num}</div>
            <div>
              <div style={{ fontFamily:"'Sora',sans-serif", fontWeight:600, fontSize:12.5, color:T.text, lineHeight:1.3 }}>{item.title}</div>
              <div style={{ fontFamily:"'Sora',sans-serif", fontSize:11, color:T.textDim, marginTop:3, lineHeight:1.4 }}>{item.sub}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Slide2() {
  return (
    <div style={{ display:"flex", flexDirection:"column", justifyContent:"center", height:"100%", padding:PAD, gap:20 }}>
      <div><SL>Context</SL><ST>This isn't optional —<br/>and that's a <span style={{ color:T.accent }}>good thing</span>.</ST><SS>A company-wide push to adopt AI in a structured, deliberate way. Not a free-for-all.</SS></div>
      <div style={{ display:"flex", gap:12 }}>
        {[
          { icon:"⏱", label:"30%+", desc:"Target time recaptured across the org", color:T.accent },
          { icon:"👥", label:"Bottom-up", desc:"Driven by people doing the work, not top-down mandates", color:T.blue },
          { icon:"🚀", label:"Production", desc:"Goal is shipped output — not exploration", color:T.yellow },
        ].map(s => (
          <div key={s.label} style={{ flex:1, background:T.card, border:`1px solid ${T.border}`, borderRadius:12, padding:"16px 14px", textAlign:"center" }}>
            <div style={{ fontSize:24, marginBottom:7 }}>{s.icon}</div>
            <div style={{ fontFamily:"'Sora',sans-serif", fontWeight:800, fontSize:"clamp(16px,2.2vw,26px)", color:s.color, lineHeight:1 }}>{s.label}</div>
            <div style={{ fontFamily:"'Sora',sans-serif", fontSize:11, color:T.textDim, marginTop:7, lineHeight:1.4 }}>{s.desc}</div>
          </div>
        ))}
      </div>
      <div style={{ display:"flex", flexDirection:"column", gap:7 }}>
        {["Moving out of exploration phase — lots of artifacts, not enough finished products",
          "Our job: take what's being built company-wide and make it work specifically for marketing",
          "This team feeds learnings back up to the broader AI Enablement group — contributors, not just recipients",
        ].map((pt, i) => (
          <div key={i} style={{ display:"flex", gap:11, alignItems:"flex-start" }}><Dot /><div style={{ fontFamily:"'Sora',sans-serif", fontSize:13, color:T.textMid, lineHeight:1.5 }}>{pt}</div></div>
        ))}
      </div>
      <Banner>Next 2–4 weeks: move from exploration into real, production-ready output.</Banner>
    </div>
  );
}

function Slide3() {
  return (
    <div style={{ display:"flex", flexDirection:"column", justifyContent:"center", height:"100%", padding:PAD, gap:16 }}>
      <div><SL>The Framework</SL><ST>Output → Outcome → <span style={{ color:T.accent }}>Impact</span>.</ST><SS>Before building anything, ask: does this connect to a real business result?</SS></div>
      <div style={{ display:"flex", gap:11 }}>
        {[
          { label:"Output", def:"What you made", ex:"A deck, a brief, an asset, an automation", color:T.blue },
          { label:"Outcome", def:"What changed", ex:"Time saved, faster launch, better decision", color:T.accent },
          { label:"Impact", def:"Business result", ex:"Lower CPA, more conversions, faster cycles", color:T.yellow },
        ].map((item, i) => (
          <div key={item.label} style={{ flex:1, background:T.card, border:`1px solid ${item.color}40`, borderRadius:11, padding:"14px 13px", position:"relative", overflow:"hidden" }}>
            <div style={{ position:"absolute", top:0, left:0, right:0, height:3, background:item.color }} />
            <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:9.5, color:item.color, letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:5 }}>Step {i+1}</div>
            <div style={{ fontFamily:"'Sora',sans-serif", fontWeight:800, fontSize:17, color:T.text, marginBottom:4 }}>{item.label}</div>
            <div style={{ fontFamily:"'Sora',sans-serif", fontSize:12, color:T.textMid, marginBottom:8, fontStyle:"italic" }}>{item.def}</div>
            <div style={{ fontFamily:"'Sora',sans-serif", fontSize:11, color:T.textDim, lineHeight:1.5, padding:"6px 9px", background:`${item.color}10`, borderRadius:7 }}>{item.ex}</div>
          </div>
        ))}
      </div>
      <div style={{ display:"flex", gap:11 }}>
        <div style={{ flex:1, background:`linear-gradient(135deg,${T.red}12,${T.red}05)`, border:`1px solid ${T.red}30`, borderRadius:11, padding:"13px 15px" }}>
          <div style={{ fontFamily:"'Sora',sans-serif", fontWeight:700, fontSize:12, color:T.red, marginBottom:8 }}>❌ Bad example</div>
          {[{ l:"Output", t:"4 hrs building an app to auto-format affiliate monthly recap emails" },
            { l:"Outcome", t:"Saves ~20 min/month, breaks when template changes" },
            { l:"Impact", t:"Near zero — doesn't influence a decision or drive a conversion" }
          ].map(r => (
            <div key={r.l} style={{ display:"flex", gap:8, marginBottom:5 }}>
              <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:9, color:T.red, minWidth:48, paddingTop:1 }}>{r.l}</div>
              <div style={{ fontFamily:"'Sora',sans-serif", fontSize:11, color:T.textMid, lineHeight:1.4 }}>{r.t}</div>
            </div>
          ))}
        </div>
        <div style={{ flex:1, background:`linear-gradient(135deg,${T.accent}12,${T.accent}05)`, border:`1px solid ${T.accent}30`, borderRadius:11, padding:"13px 15px" }}>
          <div style={{ fontFamily:"'Sora',sans-serif", fontWeight:700, fontSize:12, color:T.accent, marginBottom:8 }}>✅ Good example</div>
          {[{ l:"Output", t:"AI-assisted weekly channel report, ready in 10 min" },
            { l:"Outcome", t:"Reporting time cut from 2hrs to 20 min, CMO-ready format" },
            { l:"Impact", t:"Faster budget decisions, more time on actual optimization" }
          ].map(r => (
            <div key={r.l} style={{ display:"flex", gap:8, marginBottom:5 }}>
              <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:9, color:T.accent, minWidth:48, paddingTop:1 }}>{r.l}</div>
              <div style={{ fontFamily:"'Sora',sans-serif", fontSize:11, color:T.textMid, lineHeight:1.4 }}>{r.t}</div>
            </div>
          ))}
        </div>
      </div>
      <Banner>The difference isn't the tool — it's whether there was a clear problem being solved first.</Banner>
    </div>
  );
}

function Slide4() {
  return (
    <div style={{ display:"flex", flexDirection:"column", justifyContent:"center", height:"100%", padding:PAD, gap:16 }}>
      <div><SL>What's Coming</SL><ST>The <span style={{ color:T.accent }}>Brain</span> — and what it means for us.</ST></div>
      <div style={{ display:"flex", gap:14 }}>
        <div style={{ flex:1, display:"flex", flexDirection:"column", gap:8 }}>
          <div style={{ fontFamily:"'Sora',sans-serif", fontWeight:700, fontSize:11, color:T.textMid, textTransform:"uppercase", letterSpacing:"0.05em", marginBottom:2 }}>Being built company-wide</div>
          {[{ icon:"🧠", text:"Centralized knowledge layer — brand, tone, legal guardrails, business context at enterprise level" },
            { icon:"📄", text:"Documentation + communication templates — standard formats for docs, notes, presentations" },
            { icon:"🌐", text:"Landing page workflow — one creation method, one deployment path, fully documented" },
            { icon:"🔒", text:"Compliance guardrails — defines what AI cannot touch before anything customer-facing is built" },
          ].map((item, i) => (
            <div key={i} style={{ display:"flex", gap:10, alignItems:"flex-start", background:T.card, border:`1px solid ${T.border}`, borderRadius:9, padding:"9px 12px" }}>
              <span style={{ fontSize:15, flexShrink:0 }}>{item.icon}</span>
              <div style={{ fontFamily:"'Sora',sans-serif", fontSize:11.5, color:T.textMid, lineHeight:1.5 }}>{item.text}</div>
            </div>
          ))}
        </div>
        <div style={{ flex:1, display:"flex", flexDirection:"column", gap:8 }}>
          <div style={{ fontFamily:"'Sora',sans-serif", fontWeight:700, fontSize:11, color:T.textMid, textTransform:"uppercase", letterSpacing:"0.05em", marginBottom:2 }}>What's in it for each role</div>
          {[{ role:"CMO / VP Growth", value:"Exec-ready decks, synthesized reporting, faster insights" },
            { role:"Performance Mktg", value:"Campaign analysis, budget frameworks, channel reporting" },
            { role:"CRM", value:"Email briefs, segmentation docs, lifecycle documentation" },
            { role:"Social", value:"Copy variations, content calendars, creative briefs at scale" },
            { role:"Affiliates & Activation", value:"Partner comms, reporting summaries, activation briefs" },
          ].map(r => (
            <div key={r.role} style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:9, padding:"9px 12px", display:"flex", gap:10, alignItems:"flex-start" }}>
              <Dot />
              <div>
                <div style={{ fontFamily:"'Sora',sans-serif", fontWeight:600, fontSize:12, color:T.text }}>{r.role}</div>
                <div style={{ fontFamily:"'Sora',sans-serif", fontSize:11, color:T.textDim, marginTop:2, lineHeight:1.4 }}>{r.value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Slide5() {
  return (
    <div style={{ display:"flex", flexDirection:"column", justifyContent:"center", height:"100%", padding:PAD, gap:20 }}>
      <div><SL>Rules of Engagement</SL><ST>How we work with <span style={{ color:T.accent }}>AI on this team</span>.</ST><SS>Three non-negotiables that apply to everyone, starting now.</SS></div>
      <div style={{ display:"flex", flexDirection:"column", gap:11 }}>
        {[{ num:"01", title:"Document what you build", desc:"Enabling a tool requires contributing to the knowledge base. No exceptions. This is how the whole team benefits, not just the person who figured it out.", color:T.accent },
          { num:"02", title:"Consistent outputs", desc:"Agree on where things live and how they're published before you build. Everyone working in different tools with no shared standard creates a maintenance nightmare.", color:T.blue },
          { num:"03", title:"Compliance first", desc:"Nothing customer-facing or data-adjacent gets built with AI until legal guardrails are defined. This is being worked on now — watch for updates.", color:T.yellow },
        ].map(rule => (
          <div key={rule.num} style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:13, padding:"16px 18px", display:"flex", gap:16, alignItems:"flex-start" }}>
            <div style={{ fontFamily:"'Sora',sans-serif", fontWeight:800, fontSize:26, color:rule.color, lineHeight:1, minWidth:38 }}>{rule.num}</div>
            <div>
              <div style={{ fontFamily:"'Sora',sans-serif", fontWeight:700, fontSize:14, color:T.text, marginBottom:4 }}>{rule.title}</div>
              <div style={{ fontFamily:"'Sora',sans-serif", fontSize:12.5, color:T.textDim, lineHeight:1.6 }}>{rule.desc}</div>
            </div>
          </div>
        ))}
      </div>
      <Banner>Exploration is allowed — but tie it to an outcome, otherwise it's just time spent.</Banner>
    </div>
  );
}

function Slide6() {
  return (
    <div style={{ display:"flex", flexDirection:"column", justifyContent:"center", height:"100%", padding:PAD, gap:20 }}>
      <div style={{ textAlign:"center" }}><SL>Next Steps</SL><ST>Let's make this <span style={{ color:T.accent }}>work</span>.</ST><SS>Company playbook ships in 4–6 weeks. In parallel, we identify our first 2–3 use cases.</SS></div>
      <div style={{ display:"flex", gap:11 }}>
        {[{ icon:"🕐", title:"Flag your time sinks", desc:"Your most repetitive, high-effort, low-creativity tasks. That's where we start." },
          { icon:"🔌", title:"Submit connector requests", desc:"Google Drive, Canva, databases — wishlist is being compiled. Say so now." },
          { icon:"🎯", title:"Tie exploration to outcomes", desc:"Know what problem you're solving before you open the tool." },
        ].map(a => (
          <div key={a.title} style={{ flex:1, background:T.card, border:`1px solid ${T.border}`, borderRadius:12, padding:"18px 14px", textAlign:"center", display:"flex", flexDirection:"column", gap:8 }}>
            <div style={{ fontSize:26 }}>{a.icon}</div>
            <div style={{ fontFamily:"'Sora',sans-serif", fontWeight:700, fontSize:13, color:T.text }}>{a.title}</div>
            <div style={{ fontFamily:"'Sora',sans-serif", fontSize:11.5, color:T.textDim, lineHeight:1.5 }}>{a.desc}</div>
          </div>
        ))}
      </div>
      <div style={{ display:"flex", gap:11 }}>
        <div style={{ flex:1, background:`linear-gradient(90deg,${T.accentGlow},transparent)`, borderLeft:`3px solid ${T.accent}`, borderRadius:"0 10px 10px 0", padding:"12px 15px" }}>
          <div style={{ fontFamily:"'Sora',sans-serif", fontWeight:700, fontSize:12, color:T.accent, marginBottom:4 }}>Our goal</div>
          <div style={{ fontFamily:"'Sora',sans-serif", fontSize:12, color:T.textMid, lineHeight:1.5 }}>2–3 use cases with a clear output → outcome → impact path built first. Learnings flow both ways — up to the enablement group and back to us.</div>
        </div>
        <div style={{ flex:1, background:`linear-gradient(90deg,${T.blue}15,transparent)`, borderLeft:`3px solid ${T.blue}`, borderRadius:"0 10px 10px 0", padding:"12px 15px" }}>
          <div style={{ fontFamily:"'Sora',sans-serif", fontWeight:700, fontSize:12, color:T.blue, marginBottom:4 }}>How we track it</div>
          <div style={{ fontFamily:"'Sora',sans-serif", fontSize:12, color:T.textMid, lineHeight:1.5 }}>Weekly Thursday check-ins. Every project logged in Confluence with output, outcome, and impact noted. No impact, no log entry.</div>
        </div>
      </div>
      <Banner solid>Questions? Let's discuss. · Performance Marketing · March 2026</Banner>
    </div>
  );
}

const slides = [Slide0, Slide1, Slide2, Slide3, Slide4, Slide5, Slide6];

function getSlideFromHash() {
  const match = window.location.hash.match(/^#\/(\d+)$/);
  if (match) { const n = parseInt(match[1], 10); if (n >= 0 && n < slides.length) return n; }
  return 0;
}

export default function Presentation() {
  const [cur, setCur] = useState(getSlideFromHash);
  const [dir, setDir] = useState(0);
  const [anim, setAnim] = useState(false);
  const [exit, setExit] = useState(false);
  const [ts, setTs] = useState(null);
  const [te, setTe] = useState(null);

  useEffect(() => { window.location.hash = `#/${cur}`; }, [cur]);
  useEffect(() => {
    const fn = () => { const i = getSlideFromHash(); if (i !== cur) { setDir(i > cur ? 1:-1); setCur(i); } };
    window.addEventListener("hashchange", fn);
    return () => window.removeEventListener("hashchange", fn);
  });

  const go = useCallback((d) => {
    if (anim) return;
    const n = cur + d;
    if (n < 0 || n >= slides.length) return;
    setDir(d); setAnim(true); setExit(true);
    setTimeout(() => { setExit(false); setCur(n); setAnim(false); }, 300);
  }, [cur, anim]);

  useEffect(() => {
    const fn = (e) => {
      if (e.key==="ArrowRight"||e.key===" "){e.preventDefault();go(1);}
      if (e.key==="ArrowLeft"){e.preventDefault();go(-1);}
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [go]);

  const Slide = slides[cur];
  return (
    <>
      <style>{fonts}</style>
      <style>{`
        *{box-sizing:border-box;margin:0;padding:0}body{background:${T.bg};overflow:hidden}
        @keyframes gd{0%,100%{transform:translate(-50%,-50%) scale(1);opacity:.6}50%{transform:translate(-52%,-48%) scale(1.05);opacity:.9}}
        @keyframes sI{from{opacity:0;transform:translateX(60px)}to{opacity:1;transform:translateX(0)}}
        @keyframes sO{from{opacity:1;transform:translateX(0)}to{opacity:0;transform:translateX(-60px)}}
        @keyframes sIR{from{opacity:0;transform:translateX(-60px)}to{opacity:1;transform:translateX(0)}}
        @keyframes sOR{from{opacity:1;transform:translateX(0)}to{opacity:0;transform:translateX(60px)}}
        .gc{color:transparent;position:relative}
        .gc::after,.gc::before{content:attr(data-char);position:absolute;top:0;left:0;height:100%;width:100%;color:${T.accent};clip-path:var(--clip);-webkit-clip-path:var(--clip)}
        .gc::after{--clip:inset(0 0 50% 0);animation:gs 3s infinite steps(1)}
        .gc::before{--clip:inset(50% 0 0 0);animation:gs 4s infinite steps(1)}
        @keyframes gs{0%,68%,72%,100%{transform:translate(0,0)}70%{transform:translate(3%,0)}}
      `}</style>
      <div
        onTouchStart={e=>{setTe(null);setTs(e.targetTouches[0].clientX)}}
        onTouchMove={e=>setTe(e.targetTouches[0].clientX)}
        onTouchEnd={()=>{if(ts&&te&&Math.abs(ts-te)>=50){ts-te>0?go(1):go(-1);}}}
        style={{ width:"100vw", height:"100vh", background:T.bg, position:"relative", overflow:"hidden", touchAction:"pan-y" }}>
        <div style={{ position:"absolute", inset:0, background:`radial-gradient(ellipse at 20% 50%,${T.accent}08 0%,transparent 60%),radial-gradient(ellipse at 80% 80%,${T.blue}06 0%,transparent 50%)`, pointerEvents:"none" }} />
        <div key={cur} style={{ position:"absolute", inset:0, overflowY:"auto", animation:exit?`${dir>=0?"sO":"sOR"} .3s ease-in forwards`:`${dir>=0?"sI":"sIR"} .35s ease-out` }}>
          <Slide />
        </div>
        <div style={{ position:"absolute", top:15, left:18, zIndex:10 }}><BrandMark size={17} /></div>
        <div style={{ position:"absolute", top:18, right:22, fontFamily:"'JetBrains Mono',monospace", fontSize:11, color:`${T.textDim}80`, zIndex:10 }}>
          {String(cur+1).padStart(2,"0")} / {String(slides.length).padStart(2,"0")}
        </div>
        <div style={{ position:"absolute", bottom:14, left:"50%", transform:"translateX(-50%)", display:"flex", gap:6, zIndex:10 }}>
          {slides.map((_,i) => (
            <div key={i} onClick={()=>{if(i!==cur){setDir(i>cur?1:-1);setCur(i);}}}
              style={{ width:i===cur?20:6, height:6, borderRadius:3, background:i===cur?T.accent:`${T.textDim}40`, transition:"all .3s", cursor:"pointer" }} />
          ))}
        </div>
      </div>
    </>
  );
}
