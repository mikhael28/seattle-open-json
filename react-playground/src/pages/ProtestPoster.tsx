import React, { useState, useRef } from "react";
import { Printer, RotateCcw, Eye, EyeOff, ChevronDown, ChevronUp } from "lucide-react";
import QRCode from "react-qr-code";

// ─── Types ───────────────────────────────────────────────────────────────────

interface PosterConfig {
  leftText: string;
  rightText: string;
  subtext: string;
  colorScheme: ColorScheme;
  fontStyle: FontStyle;
}

type ColorScheme =
  | "black-yellow"
  | "white-black"
  | "black-white"
  | "red-white"
  | "white-red"
  | "green-white";

type FontStyle = "bold-impact" | "condensed" | "serif-bold";

interface ColorConfig {
  label: string;
  bg: string;
  text: string;
  accent: string;
  border: string;
}

// ─── Color Schemes ───────────────────────────────────────────────────────────

const COLOR_SCHEMES: Record<ColorScheme, ColorConfig> = {
  "black-yellow": {
    label: "Black on Yellow",
    bg: "#FFD700",
    text: "#000000",
    accent: "#000000",
    border: "#000000",
  },
  "white-black": {
    label: "White on Black",
    bg: "#000000",
    text: "#FFFFFF",
    accent: "#FFFFFF",
    border: "#FFFFFF",
  },
  "black-white": {
    label: "Black on White",
    bg: "#FFFFFF",
    text: "#000000",
    accent: "#000000",
    border: "#000000",
  },
  "red-white": {
    label: "Red on White",
    bg: "#FFFFFF",
    text: "#CC0000",
    accent: "#000000",
    border: "#CC0000",
  },
  "white-red": {
    label: "White on Red",
    bg: "#CC0000",
    text: "#FFFFFF",
    accent: "#FFFF00",
    border: "#FFFFFF",
  },
  "green-white": {
    label: "Green on White",
    bg: "#FFFFFF",
    text: "#1a5c2a",
    accent: "#000000",
    border: "#1a5c2a",
  },
};

const FONT_STYLES: Record<FontStyle, { label: string; family: string; weight: string }> = {
  "bold-impact": { label: "Impact (Classic)", family: "'Impact', 'Arial Narrow', sans-serif", weight: "900" },
  "condensed": { label: "Condensed Sans", family: "'Arial Narrow', 'Helvetica Neue Condensed', sans-serif", weight: "700" },
  "serif-bold": { label: "Bold Serif", family: "'Georgia', 'Times New Roman', serif", weight: "700" },
};

// ─── Bloomquist Info Content ──────────────────────────────────────────────────

const BLOOMQUIST_BIO =
  "Chris Bloomquist is a 20-year technology industry veteran, two-time startup founder, coach, musician, and the son of a Chilean immigrant. He studied at Iowa State University (Class of 2001), where he later served as Alumni Association President (2004–2014). Recognized on the Inc. 500 Fastest Growing Companies list in 2014, Chris built a career in talent acquisition and clean-energy recruiting before founding PNW Climate Week's inaugural career fair — connecting workers to the green economy. He serves on the KD Hall Foundation advisory board and has spent decades building community in LD32. Now he's running for WA State House to fight for schools, civil rights, and economic opportunity for every family.";

const ENDORSEMENTS = [
  { name: "Jesse Salomon", title: "WA State Senator, LD32" },
  { name: "Javier Valdez", title: "WA State Senator, LD46" },
  { name: "Lauren Davis", title: "WA State Rep., LD32" },
  { name: "Alicia Rule", title: "WA State Rep., LD42" },
  { name: "Jack Malek", title: "Shoreline Community Member" },
  { name: "KD Hall", title: "President & Founder, KD Hall Foundation*" },
  { name: "George Hurst", title: "Lynnwood Mayor-Elect" },
  { name: "Jason Huff", title: "Seattle Director, PNW Climate Week*" },
  { name: "David Parshall", title: "Lynnwood Councilmember" },
  { name: "Susan Chang", title: "Former Shoreline City Councilmember" },
];

const ENDORSEMENT_DISCLAIMER =
  "* Titles and organizations are included for identification purposes only and do not imply organizational endorsement.";

const DONATION_URL = "https://secure.actblue.com/donate/chris-bloomquist-1?amount=10";
const LINKEDIN_URL = "https://www.linkedin.com/in/cbloomquist/";
const FACEBOOK_URL = "https://www.facebook.com/chris.bloomquist/";

const QR_CODES = [
  { label: "Donate", url: DONATION_URL },
  { label: "Get Involved", url: DONATION_URL },   // placeholder — update URL later
  { label: "Learn More", url: DONATION_URL },      // placeholder — update URL later
];

const GET_INVOLVED = [
  {
    icon: "🚪",
    action: "Canvass Your Neighborhood",
    detail: "Door-knocking is the single most effective form of political persuasion. Sign up for a canvass shift at buildwithbloomquist.com — no experience needed, just a pair of comfortable shoes.",
  },
  {
    icon: "💛",
    action: "Make a Humble Donation",
    detail: "Even $5 or $10 makes a real difference — it funds yard signs, mailers, and field organizers. Every dollar stays local. Donate securely at the ActBlue link below.",
  },
  {
    icon: "🌟",
    action: "Be Involved as a Community Leader",
    detail: "Run for a local committee seat, attend city council or school board meetings, or organize your block. Real change starts at the neighborhood level — and it starts with you.",
  },
  {
    icon: "🤲",
    action: "Volunteer at Local Nonprofits",
    detail: "Organizations like the KD Hall Foundation, Hopelink, and local food banks need your time year-round — not just during election season. Civic strength is built between elections.",
  },
];

const BLOOMQUIST_PRIORITIES = [
  {
    icon: "🛡️",
    title: "Protect Civil Rights & Defend Against ICE",
    body: "Chris will defend civil liberties and stand with immigrant, BIPOC, and LGBTQ+ communities. He supports bills like SB 5855 that prohibit face masks on ICE agents and demand transparency and accountability. No one is above the law.",
  },
  {
    icon: "🏠",
    title: "Tackle Homelessness & Public Health",
    body: "Chris supports sustainable, long-term solutions to homelessness — listening to social workers and first responders. He will promote zoning for community-led tiny homes and remove barriers to homeownership for our emerging workforce.",
  },
  {
    icon: "📚",
    title: "Fully Fund Our Public Schools",
    body: "WA has a $500M+ school funding gap due to flawed population models. Chris will make public school funding his #1 commitment, including SB 5849 requiring financial literacy education to graduate.",
  },
  {
    icon: "⚖️",
    title: "Progressive Tax Reform",
    body: "Washington has the 2nd most regressive tax system in the country — hurting school funding, public safety, and infrastructure. Chris will vote to increase taxes on the top 5% to balance the budget and invest in our communities.",
  },
  {
    icon: "⚡",
    title: "Affordability Through Clean Energy",
    body: "As an environmental recruiter, Chris knows how to power our green economy while lowering energy costs. He will support bills like SB 5116 focused on clean energy, environmental justice, and job creation for Washingtonians.",
  },
  {
    icon: "🤖",
    title: "Responsible Guardrails for AI",
    body: "As a former software engineer and concerned parent, Chris will bring common-sense oversight to AI — protecting children, citizens, and the environment from AI overreach while still encouraging innovation.",
  },
];

// ─── Protest Info Content (Right Back Sheet) ─────────────────────────────────

const YOUR_RIGHTS = [
  "The 1st Amendment guarantees your right to peacefully assemble and petition the government — in public spaces like sidewalks, parks, and plazas.",
  "You may NOT be arrested solely for chanting, sign-holding, or peaceful marching.",
  "You have the right to film police officers performing their duties in public.",
  "If police say disperse, ask clearly: \"Am I free to go?\" If yes, leave calmly. If detained, say: \"I am invoking my right to remain silent. I want a lawyer.\"",
  "In Washington State, you must identify yourself (name only) if police have reasonable suspicion of a crime.",
  "Wear comfortable shoes, bring water, and know your emergency contact by memory.",
];

const NO_KINGS_HISTORY = [
  { year: "2025 — Spring", event: "\"No Kings\" emerges as a rallying cry at \"Hands Off!\" protests nationwide, echoing the Declaration of Independence's rejection of monarchy and tyranny." },
  { year: "2025 — April 5", event: "Tens of thousands rally across all 50 states under the Hands Off banner. Seattle's protest draws thousands to Cal Anderson Park and downtown streets." },
  { year: "Historical roots", event: "The phrase echoes Thomas Paine's \"Common Sense\" (1776): \"In America, the law is king.\" Americans have always resisted the concentration of unchecked power." },
  { year: "Why it resonates", event: "\"No Kings\" speaks to fears of democratic backsliding, executive overreach, and erosion of checks and balances — concerns shared across the political spectrum." },
];

const PROTEST_FACTS = [
  { stat: "3.5%", desc: "No government has ever fallen when 3.5% of its population engaged in sustained nonviolent resistance. (Chenoweth, Harvard)" },
  { stat: "2×", desc: "Nonviolent campaigns succeed roughly twice as often as violent ones. Peaceful protest is not weakness — it is the most effective strategy." },
  { stat: "1,000+", desc: "Over 1,000 successful nonviolent campaigns documented in the past century — suffrage, civil rights, labor, environment." },
  { stat: "Jan 2017", desc: "The Women's March — 3–5 million participants — was the largest single-day protest in U.S. history and sparked years of civic engagement." },
];

const FOLLOWUP_TIPS = [
  {
    action: "Call Your Representatives",
    detail: "Look up your WA State legislators at app.leg.wa.gov. Call the office directly — calls outweigh emails 10:1. Say your name, city, and one specific ask. Staffers tally every call.",
  },
  {
    action: "Write or Email",
    detail: "Send a brief personal message to your State Rep and Senator at leg.wa.gov/legislature/pages/contactleg.aspx. Personalized letters beat form emails. Mention how the issue affects you specifically.",
  },
  {
    action: "Attend a Town Hall",
    detail: "Find your rep's upcoming town halls at their legislative website. Show up with neighbors. Public testimony at committee hearings (in-person or remote) is one of the most direct ways to shape a bill.",
  },
  {
    action: "Canvass Your Neighborhood",
    detail: "Door-knocking is the highest-ROI form of political persuasion. Join a campaign's phonebank or canvass day — buildwithbloomquist.com has upcoming volunteer events.",
  },
  {
    action: "Register & Vote",
    detail: "WA offers same-day voter registration. Check or update your registration at myvote.wa.gov. Bring a neighbor who isn't registered. Every local election turns on a few hundred votes.",
  },
  {
    action: "Stay Organized",
    detail: "Join a local group: Indivisible Seattle, WA Dems LD32, or a local mutual aid network. Sustained pressure over months beats one big rally. Follow up with the people you met today.",
  },
];

// ─── Sheet Components ─────────────────────────────────────────────────────────

interface FrontSheetProps {
  text: string;
  subtext?: string;
  colors: ColorConfig;
  fontFamily: string;
  side: "left" | "right";
}

const FrontSheet: React.FC<FrontSheetProps> = ({ text, subtext, colors, fontFamily, side }) => {
  return (
    <div
      className="poster-sheet front-sheet"
      style={{
        width: "8.5in",
        height: "11in",
        backgroundColor: colors.bg,
        color: colors.text,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "0.5in",
        boxSizing: "border-box",
        fontFamily,
        border: `4px solid ${colors.border}`,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Corner markers for cutting guide */}
      {["top-left", "top-right", "bottom-left", "bottom-right"].map((corner) => (
        <div
          key={corner}
          style={{
            position: "absolute",
            width: "20px",
            height: "20px",
            borderColor: colors.border,
            borderStyle: "solid",
            opacity: 0.3,
            ...(corner.includes("top") ? { top: 6, borderTopWidth: 2 } : { bottom: 6, borderBottomWidth: 2 }),
            ...(corner.includes("left") ? { left: 6, borderLeftWidth: 2 } : { right: 6, borderRightWidth: 2 }),
            ...(!corner.includes("top") || corner.includes("left") ? {} : {}),
          }}
        />
      ))}

      {/* Main protest text */}
      <div
        style={{
          fontSize: text.length > 20 ? "4.5rem" : text.length > 10 ? "6rem" : "8rem",
          fontWeight: "900",
          textAlign: "center",
          lineHeight: 1.05,
          textTransform: "uppercase",
          letterSpacing: "-0.02em",
          wordBreak: "break-word",
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {text || (side === "left" ? "YOUR" : "MESSAGE")}
      </div>

      {/* Subtext */}
      {subtext && (
        <div
          style={{
            fontSize: "1.4rem",
            fontWeight: "700",
            textAlign: "center",
            marginTop: "0.25in",
            opacity: 0.85,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          }}
        >
          {subtext}
        </div>
      )}

      {/* Sheet identifier (hidden in print) */}
      <div
        className="no-print"
        style={{
          position: "absolute",
          bottom: 4,
          right: 8,
          fontSize: "0.65rem",
          opacity: 0.3,
          color: colors.text,
        }}
      >
        {side === "left" ? "← LEFT SHEET" : "RIGHT SHEET →"}
      </div>
    </div>
  );
};

// ─── Back Sheet: Left (Bloomquist Campaign Info) ─────────────────────────────

const BackSheetLeft: React.FC = () => {
  // Shared style tokens
  const navy = "#1a3a6e";
  const gold = "#c8a400";
  const bodyColor = "#333";

  const sectionLabel: React.CSSProperties = {
    fontSize: "0.54rem", fontWeight: 700, textTransform: "uppercase",
    letterSpacing: "0.13em", color: navy, marginBottom: "0.05in", marginTop: "0.09in",
    borderBottom: `2px solid ${gold}`, paddingBottom: "0.03in", display: "block",
  };

  return (
    <div
      className="poster-sheet back-sheet"
      style={{
        width: "8.5in", height: "11in",
        backgroundColor: "#FFFFFF", color: "#1a1a2e",
        display: "flex", flexDirection: "column",
        padding: "0.28in", boxSizing: "border-box",
        fontFamily: "'Arial', 'Helvetica', sans-serif",
        border: `2px solid ${navy}`, position: "relative",
      }}
    >
      {/* ── Header ── */}
      <div style={{
        backgroundColor: navy, color: "#FFFFFF",
        padding: "0.1in 0.18in", marginBottom: "0.09in", borderRadius: "4px",
      }}>
        <div style={{ fontSize: "0.54rem", letterSpacing: "0.13em", textTransform: "uppercase", opacity: 0.75 }}>
          WA State House · Legislative District 32
        </div>
        <div style={{ fontSize: "1.25rem", fontWeight: 700, lineHeight: 1.1 }}>Chris Bloomquist</div>
        <div style={{ fontSize: "0.57rem", marginTop: "0.025in", opacity: 0.9, display: "flex", gap: "0.15in", flexWrap: "wrap" }}>
          <span>🌐 buildwithbloomquist.com</span>
          <span>💼 linkedin.com/in/cbloomquist</span>
          <span>📘 facebook.com/chris.bloomquist</span>
        </div>
      </div>

      {/* ── Bio ── */}
      <div style={{ fontSize: "0.59rem", lineHeight: 1.48, color: bodyColor }}>
        {BLOOMQUIST_BIO}
      </div>

      {/* ── Two-column body: Priorities left, Endorsements + Get Involved right ── */}
      <div style={{ display: "flex", gap: "0.18in", flex: 1, marginTop: "0.01in", minHeight: 0 }}>

        {/* LEFT COLUMN — Priorities */}
        <div style={{ flex: "0 0 55%", display: "flex", flexDirection: "column" }}>
          <span style={sectionLabel}>His Top Priorities</span>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.065in" }}>
            {BLOOMQUIST_PRIORITIES.map((p) => (
              <div key={p.title} style={{ borderLeft: `3px solid ${gold}`, paddingLeft: "0.09in", paddingTop: "0.03in", paddingBottom: "0.03in" }}>
                <div style={{ fontSize: "0.61rem", fontWeight: 700, color: "#1a1a2e", marginBottom: "0.02in", lineHeight: 1.25 }}>
                  {p.icon} {p.title}
                </div>
                <div style={{ fontSize: "0.55rem", lineHeight: 1.42, color: bodyColor }}>
                  {p.body}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN — Endorsements + Get Involved */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>

          {/* Endorsements */}
          <span style={sectionLabel}>Endorsements</span>
          <div style={{ fontSize: "0.52rem", fontStyle: "italic", color: "#888", marginBottom: "0.05in", lineHeight: 1.3 }}>
            We are strongly supporting Chris Bloomquist for WA State House LD32.
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.042in" }}>
            {ENDORSEMENTS.map((e) => (
              <div key={e.name} style={{ borderLeft: `2px solid ${gold}`, paddingLeft: "0.07in" }}>
                <div style={{ fontSize: "0.6rem", fontWeight: 700, color: "#1a1a2e", lineHeight: 1.2 }}>{e.name}</div>
                <div style={{ fontSize: "0.52rem", color: "#555", lineHeight: 1.25 }}>{e.title}</div>
              </div>
            ))}
          </div>
          <div style={{ fontSize: "0.46rem", color: "#999", marginTop: "0.05in", lineHeight: 1.3, fontStyle: "italic" }}>
            {ENDORSEMENT_DISCLAIMER}
          </div>

          {/* Get Involved */}
          <span style={{ ...sectionLabel, marginTop: "0.1in" }}>How to Get Involved</span>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.055in" }}>
            {GET_INVOLVED.map((g) => (
              <div key={g.action} style={{ borderLeft: `2px solid ${navy}`, paddingLeft: "0.07in", paddingTop: "0.02in", paddingBottom: "0.02in" }}>
                <div style={{ fontSize: "0.59rem", fontWeight: 700, color: "#1a1a2e", lineHeight: 1.2 }}>
                  {g.icon} {g.action}
                </div>
                <div style={{ fontSize: "0.52rem", lineHeight: 1.38, color: bodyColor }}>
                  {g.detail}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── QR Codes ── */}
      <div style={{
        display: "flex", flexDirection: "row", justifyContent: "space-around", alignItems: "center",
        marginTop: "0.09in", paddingTop: "0.08in", borderTop: "1px solid #dde3ef", gap: "0.08in",
      }}>
        {QR_CODES.map((qr) => (
          <div key={qr.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.04in" }}>
            <div style={{ fontSize: "0.57rem", fontWeight: 700, color: navy, textAlign: "center" }}>{qr.label}</div>
            <QRCode value={qr.url} size={72} style={{ height: "auto", maxWidth: "100%", width: "0.88in" }} viewBox="0 0 256 256" />
            <div style={{ fontSize: "0.46rem", color: "#888", textAlign: "center", maxWidth: "1.3in" }}>
              {qr.url.replace("https://", "")}
            </div>
          </div>
        ))}
      </div>

      {/* ── Footer ── */}
      <div style={{
        marginTop: "0.08in", backgroundColor: gold, color: "#1a1a2e",
        padding: "0.08in 0.15in", borderRadius: "4px",
        display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        <div style={{ fontSize: "0.72rem", fontWeight: 700 }}>Vote Chris Bloomquist · WA State House LD32</div>
        <div style={{ fontSize: "0.53rem", textAlign: "right", lineHeight: 1.35 }}>
          Paid for by Chris Bloomquist for WA State House
        </div>
      </div>

      <div className="no-print" style={{ position: "absolute", bottom: 4, right: 8, fontSize: "0.6rem", opacity: 0.25 }}>
        BACK LEFT
      </div>
    </div>
  );
};

// ─── Back Sheet: Right (Civic Education / Protest Info) ──────────────────────

const BackSheetRight: React.FC = () => {
  const S = {
    sheet: {
      width: "8.5in", height: "11in",
      backgroundColor: "#FFFFFF", color: "#1a1a2e",
      display: "flex", flexDirection: "column" as const,
      padding: "0.35in", boxSizing: "border-box" as const,
      fontFamily: "'Arial', 'Helvetica', sans-serif",
      border: "2px solid #1a3a6e", position: "relative" as const,
    },
    header: {
      backgroundColor: "#1a3a6e", color: "#FFFFFF",
      padding: "0.14in 0.2in", marginBottom: "0.14in", borderRadius: "4px",
    },
    headerTitle: { fontSize: "1.2rem", fontWeight: "900" as const, textTransform: "uppercase" as const, letterSpacing: "0.02em" },
    headerSub: { fontSize: "0.63rem", opacity: 0.85, marginTop: "0.03in" },
    sectionLabel: {
      fontSize: "0.58rem", fontWeight: "700" as const,
      textTransform: "uppercase" as const, letterSpacing: "0.13em",
      color: "#1a3a6e", marginBottom: "0.06in", marginTop: "0.12in",
      borderBottom: "2px solid #c8a400", paddingBottom: "0.04in",
      display: "block" as const,
    },
    // Rights
    rightsWrap: { display: "flex", flexDirection: "column" as const, gap: "0.045in" },
    rightItem: { display: "flex", gap: "0.07in", fontSize: "0.6rem", lineHeight: 1.42, color: "#222" },
    bullet: { color: "#1a3a6e", fontWeight: "700" as const, flexShrink: 0 },
    // No Kings timeline
    timelineWrap: { display: "flex", flexDirection: "column" as const, gap: "0.06in" },
    timelineItem: { display: "flex", gap: "0.09in" },
    timelineYear: { fontSize: "0.57rem", fontWeight: "700" as const, color: "#1a3a6e", minWidth: "0.9in", paddingTop: "0.01in", flexShrink: 0 },
    timelineText: { fontSize: "0.59rem", lineHeight: 1.42, color: "#333" },
    // Facts
    factsGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.06in" },
    factCard: { backgroundColor: "#f5f7fa", border: "1px solid #dde3ef", borderRadius: "3px", padding: "0.07in 0.09in" },
    factStat: { fontSize: "0.95rem", fontWeight: "900" as const, color: "#1a3a6e" },
    factDesc: { fontSize: "0.57rem", lineHeight: 1.38, color: "#444", marginTop: "0.02in" },
    // Follow-up tips
    tipsWrap: { display: "flex", flexDirection: "column" as const, gap: "0.065in" },
    tipItem: { borderLeft: "3px solid #c8a400", paddingLeft: "0.1in", paddingTop: "0.03in", paddingBottom: "0.03in" },
    tipTitle: { fontSize: "0.65rem", fontWeight: "700" as const, color: "#1a1a2e", marginBottom: "0.02in" },
    tipBody: { fontSize: "0.58rem", lineHeight: 1.42, color: "#444" },
    // Footer
    footer: {
      marginTop: "auto", paddingTop: "0.09in",
      borderTop: "1px solid #dde3ef", fontSize: "0.55rem", color: "#888", textAlign: "center" as const,
    },
  };

  return (
    <div className="poster-sheet back-sheet" style={S.sheet}>
      <div style={S.header}>
        <div style={S.headerTitle}>Know Before You Go</div>
        <div style={S.headerSub}>Your rights · The "No Kings" movement · Why protest works · What to do next</div>
      </div>

      {/* Rights */}
      <span style={S.sectionLabel}>Your Constitutional Rights as a Protester</span>
      <div style={S.rightsWrap}>
        {YOUR_RIGHTS.map((r, i) => (
          <div key={i} style={S.rightItem}>
            <span style={S.bullet}>▸</span>
            <span>{r}</span>
          </div>
        ))}
      </div>

      {/* No Kings */}
      <span style={S.sectionLabel}>The "No Kings" Movement</span>
      <div style={S.timelineWrap}>
        {NO_KINGS_HISTORY.map((item) => (
          <div key={item.year} style={S.timelineItem}>
            <span style={S.timelineYear}>{item.year}</span>
            <span style={S.timelineText}>{item.event}</span>
          </div>
        ))}
      </div>

      {/* Facts */}
      <span style={S.sectionLabel}>Protest Works — The Numbers</span>
      <div style={S.factsGrid}>
        {PROTEST_FACTS.map((f) => (
          <div key={f.stat} style={S.factCard}>
            <div style={S.factStat}>{f.stat}</div>
            <div style={S.factDesc}>{f.desc}</div>
          </div>
        ))}
      </div>

      {/* Follow-up tips */}
      <span style={S.sectionLabel}>After the March — Keep the Pressure On</span>
      <div style={S.tipsWrap}>
        {FOLLOWUP_TIPS.map((t) => (
          <div key={t.action} style={S.tipItem}>
            <div style={S.tipTitle}>{t.action}</div>
            <div style={S.tipBody}>{t.detail}</div>
          </div>
        ))}
      </div>

      <div style={S.footer}>
        Sources: ACLU · Erica Chenoweth, Harvard · aclu-wa.org · app.leg.wa.gov · myvote.wa.gov · buildwithbloomquist.com
      </div>

      <div className="no-print" style={{ position: "absolute", bottom: 4, right: 8, fontSize: "0.6rem", opacity: 0.25 }}>
        BACK RIGHT
      </div>
    </div>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────────

const ProtestPoster: React.FC = () => {
  const [side, setSide] = useState<"front" | "back">("front");
  const [config, setConfig] = useState<PosterConfig>({
    leftText: "BUILD",
    rightText: "TOGETHER",
    subtext: "LD32 · District 32 for All",
    colorScheme: "black-white",
    fontStyle: "bold-impact",
  });
  const [controlsOpen, setControlsOpen] = useState(true);
  const printRef = useRef<HTMLDivElement>(null);

  const colors = COLOR_SCHEMES[config.colorScheme];
  const font = FONT_STYLES[config.fontStyle];

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      {/* ── Print Styles ── */}
      <style>{`
        @media print {
          body * { visibility: hidden; }
          #print-area, #print-area * { visibility: visible; }
          #print-area {
            position: fixed;
            top: 0; left: 0;
            display: flex;
            flex-direction: row;
            gap: 0;
          }
          .no-print { display: none !important; }
          .poster-sheet {
            page-break-after: always;
            break-after: page;
          }
          @page {
            size: 8.5in 11in;
            margin: 0;
          }
        }
      `}</style>

      <div className="min-h-screen bg-gray-100">
        {/* ── Controls Bar (no-print) ── */}
        <div className="no-print bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 py-3">
            {/* Top row */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <h1 className="text-lg font-bold text-gray-900">Protest Poster Studio</h1>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">2 × 8.5" × 11"</span>
              </div>

              <div className="flex items-center gap-2">
                {/* Front/Back toggle */}
                <div className="flex rounded-lg border border-gray-300 overflow-hidden">
                  <button
                    onClick={() => setSide("front")}
                    className={`px-4 py-2 text-sm font-medium transition-colors ${
                      side === "front"
                        ? "bg-gray-900 text-white"
                        : "bg-white text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <Eye className="w-4 h-4 inline mr-1.5" />
                    Front
                  </button>
                  <button
                    onClick={() => setSide("back")}
                    className={`px-4 py-2 text-sm font-medium transition-colors border-l border-gray-300 ${
                      side === "back"
                        ? "bg-gray-900 text-white"
                        : "bg-white text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <EyeOff className="w-4 h-4 inline mr-1.5" />
                    Back (Holder's View)
                  </button>
                </div>

                {/* Print */}
                <button
                  onClick={handlePrint}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Printer className="w-4 h-4" />
                  Print {side === "front" ? "Front" : "Back"}
                </button>

                {/* Toggle design panel */}
                <button
                  onClick={() => setControlsOpen((o) => !o)}
                  className="flex items-center gap-1 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg"
                >
                  Design
                  {controlsOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Design options (collapsible, front only) */}
            {controlsOpen && side === "front" && (
              <div className="mt-3 pt-3 border-t border-gray-100 grid grid-cols-2 md:grid-cols-4 gap-4">
                {/* Left text */}
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                    Left Sheet Text
                  </label>
                  <input
                    type="text"
                    value={config.leftText}
                    onChange={(e) => setConfig((c) => ({ ...c, leftText: e.target.value }))}
                    className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="BUILD"
                    maxLength={30}
                  />
                </div>

                {/* Right text */}
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                    Right Sheet Text
                  </label>
                  <input
                    type="text"
                    value={config.rightText}
                    onChange={(e) => setConfig((c) => ({ ...c, rightText: e.target.value }))}
                    className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="TOGETHER"
                    maxLength={30}
                  />
                </div>

                {/* Subtext */}
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                    Subtext (optional)
                  </label>
                  <input
                    type="text"
                    value={config.subtext}
                    onChange={(e) => setConfig((c) => ({ ...c, subtext: e.target.value }))}
                    className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="LD32 · District 32 for All"
                    maxLength={60}
                  />
                </div>

                {/* Color scheme */}
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                    Color Scheme
                  </label>
                  <select
                    value={config.colorScheme}
                    onChange={(e) =>
                      setConfig((c) => ({ ...c, colorScheme: e.target.value as ColorScheme }))
                    }
                    className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {Object.entries(COLOR_SCHEMES).map(([key, val]) => (
                      <option key={key} value={key}>
                        {val.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Font */}
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                    Font Style
                  </label>
                  <select
                    value={config.fontStyle}
                    onChange={(e) =>
                      setConfig((c) => ({ ...c, fontStyle: e.target.value as FontStyle }))
                    }
                    className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {Object.entries(FONT_STYLES).map(([key, val]) => (
                      <option key={key} value={key}>
                        {val.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Reset */}
                <div className="flex items-end">
                  <button
                    onClick={() =>
                      setConfig({
                        leftText: "BUILD",
                        rightText: "TOGETHER",
                        subtext: "LD32 · District 32 for All",
                        colorScheme: "black-white",
                        fontStyle: "bold-impact",
                      })
                    }
                    className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 border border-gray-300 rounded px-3 py-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Reset
                  </button>
                </div>
              </div>
            )}

            {/* Instructions banner */}
            <div className="mt-2 text-xs text-gray-500">
              {side === "front" ? (
                <span>
                  <strong>Step 1:</strong> Customize your message → Print Front → Flip paper over →
                  Switch to <em>Back (Holder's View)</em> → Print Back → Laminate!
                </span>
              ) : (
                <span>
                  <strong>Step 2:</strong> This side faces the sign holder only.{" "}
                  <strong>Left sheet:</strong> Chris Bloomquist's campaign priorities.{" "}
                  <strong>Right sheet:</strong> Your protest rights, the No Kings movement, and why protest works.
                </span>
              )}
            </div>
          </div>
        </div>

        {/* ── Poster Preview ── */}
        <div className="py-8 px-4">
          <div id="print-area" ref={printRef}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: side === "front" ? "0" : "0",
                alignItems: "flex-start",
                justifyContent: "center",
              }}
            >
              {side === "front" ? (
                <>
                  <FrontSheet
                    text={config.leftText}
                    subtext={config.subtext}
                    colors={colors}
                    fontFamily={font.family}
                    side="left"
                  />
                  <FrontSheet
                    text={config.rightText}
                    subtext={config.subtext}
                    colors={colors}
                    fontFamily={font.family}
                    side="right"
                  />
                </>
              ) : (
                <>
                  <BackSheetLeft />
                  <BackSheetRight />
                </>
              )}
            </div>
          </div>
        </div>

        {/* ── Print Instructions (no-print) ── */}
        <div className="no-print max-w-3xl mx-auto px-4 pb-12">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
            <h2 className="font-bold text-blue-900 mb-3">Portable Protest Printing Guide</h2>
            <ol className="text-sm text-blue-800 space-y-2 list-decimal list-inside">
              <li>
                <strong>Design the front</strong> — Use the controls above to customize your protest
                message across the two sheets.
              </li>
              <li>
                <strong>Print the front</strong> — Click "Print Front". Both sheets will print
                side-by-side. Your printer may print one sheet at a time — that's fine.
              </li>
              <li>
                <strong>Print the back</strong> — Switch to "Back (Holder's View)" and reinsert
                the sheets face-down. Click "Print Back". The Bloomquist campaign info will land
                on the reverse side.
              </li>
              <li>
                <strong>Laminate</strong> — Laminate each sheet separately, or together as a pair.
                Cold laminate pouches work best for speed.
              </li>
              <li>
                <strong>Assemble</strong> — Place sheets side by side and tape or clip them
                together. Attach a handle if desired.
              </li>
            </ol>
            <p className="text-xs text-blue-600 mt-3">
              Tip: Set your printer to "Fit to Page" and "Portrait" orientation.
              For best results, use card stock (65 lb+) before laminating.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProtestPoster;
