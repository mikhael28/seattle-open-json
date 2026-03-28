import React, { useState, useRef, useEffect } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import {
  Printer, RotateCcw, Eye, EyeOff, ChevronDown, ChevronUp,
  Plus, Trash2, AlignLeft, AlignCenter, AlignRight, Image, Move, ZoomIn,
} from "lucide-react";
import QRCode from "react-qr-code";

// ─── Types ───────────────────────────────────────────────────────────────────

interface TextLine {
  id: string;
  text: string;
  size: "auto" | "huge" | "large" | "medium" | "small" | "custom";
  customSize: number; // in pt, used when size === "custom"
  align: "left" | "center" | "right";
  bold: boolean;
  uppercase: boolean;
  // Canvas edit position (percentages 0–100 of poster dimensions)
  posX: number;
  posY: number;
  posW: number;
}

interface SheetImage {
  src: string;
  fit: "contain" | "cover";
  position: "top" | "bottom" | "background";
  opacity: number;
}

type ImageMode = "normal" | "full-image" | "half-left" | "half-right";

interface SheetConfig {
  lines: TextLine[];
  image: SheetImage | null;
  imageMode: ImageMode;
}

interface PosterConfig {
  left: SheetConfig;
  right: SheetConfig;
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

// ─── Color Schemes ────────────────────────────────────────────────────────────

const COLOR_SCHEMES: Record<ColorScheme, ColorConfig> = {
  "black-yellow": { label: "Black on Yellow", bg: "#FFD700", text: "#000000", accent: "#000000", border: "#000000" },
  "white-black":  { label: "White on Black",  bg: "#000000", text: "#FFFFFF", accent: "#FFFFFF", border: "#FFFFFF" },
  "black-white":  { label: "Black on White",  bg: "#FFFFFF", text: "#000000", accent: "#000000", border: "#000000" },
  "red-white":    { label: "Red on White",    bg: "#FFFFFF", text: "#CC0000", accent: "#000000", border: "#CC0000" },
  "white-red":    { label: "White on Red",    bg: "#CC0000", text: "#FFFFFF", accent: "#FFFF00", border: "#FFFFFF" },
  "green-white":  { label: "Green on White",  bg: "#FFFFFF", text: "#1a5c2a", accent: "#000000", border: "#1a5c2a" },
};

const FONT_STYLES: Record<FontStyle, { label: string; family: string; weight: string }> = {
  "bold-impact": { label: "Impact (Classic)", family: "'Impact', 'Arial Narrow', sans-serif", weight: "900" },
  "condensed":   { label: "Condensed Sans",   family: "'Arial Narrow', 'Helvetica Neue Condensed', sans-serif", weight: "700" },
  "serif-bold":  { label: "Bold Serif",        family: "'Georgia', 'Times New Roman', serif", weight: "700" },
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

const QR_CODES = [
  { label: "Donate", url: DONATION_URL },
  { label: "Get Involved", url: DONATION_URL },
  { label: "Learn More", url: DONATION_URL },
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

// ─── Protest Info Content ─────────────────────────────────────────────────────

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

// ─── Helpers ──────────────────────────────────────────────────────────────────

const genId = () => Math.random().toString(36).slice(2, 9);

const makeLine = (text: string, size: TextLine["size"] = "auto", index = 0): TextLine => ({
  id: genId(),
  text,
  size,
  customSize: 72,
  align: "center",
  bold: true,
  uppercase: true,
  posX: 5,
  posY: 30 + index * 18,
  posW: 90,
});

const makeSheet = (line1: string, subtext?: string): SheetConfig => ({
  lines: subtext
    ? [makeLine(line1, "auto", 0), makeLine(subtext, "small", 1)]
    : [makeLine(line1, "auto", 0)],
  image: null,
  imageMode: "normal",
});

function createDefaultConfig(): PosterConfig {
  return {
    left: makeSheet("BUILD", "LD32 · District 32 for All"),
    right: makeSheet("TOGETHER", "LD32 · District 32 for All"),
    colorScheme: "black-white",
    fontStyle: "bold-impact",
  };
}

// ─── FrontSheet ───────────────────────────────────────────────────────────────

const LINE_FONT_SIZES: Record<string, string> = {
  huge:   "9rem",
  large:  "6rem",
  medium: "3rem",
  small:  "1.6rem",
};

function autoFontSize(text: string): string {
  if (text.length > 20) return "4rem";
  if (text.length > 10) return "5.5rem";
  return "7.5rem";
}

function getLineFontSize(line: TextLine): string {
  if (line.size === "custom") return `${line.customSize || 72}pt`;
  if (line.size === "auto") return autoFontSize(line.text);
  return LINE_FONT_SIZES[line.size];
}

interface FrontSheetProps {
  sheet: SheetConfig;
  colors: ColorConfig;
  fontFamily: string;
  side: "left" | "right";
  editMode?: boolean;
  onLinesChange?: (lines: TextLine[]) => void;
}

const FrontSheet: React.FC<FrontSheetProps> = ({ sheet, colors, fontFamily, side, editMode, onLinesChange }) => {
  const { lines, image, imageMode } = sheet;
  const posterRef = useRef<HTMLDivElement>(null);

  const [dragging, setDragging] = useState<{
    id: string;
    type: "move" | "resize";
    startX: number;
    startY: number;
    origX: number;
    origY: number;
    origW: number;
  } | null>(null);

  useEffect(() => {
    if (!dragging || !editMode || !onLinesChange) return;
    const onMove = (e: MouseEvent) => {
      const rect = posterRef.current?.getBoundingClientRect();
      if (!rect) return;
      const dx = (e.clientX - dragging.startX) / rect.width * 100;
      const dy = (e.clientY - dragging.startY) / rect.height * 100;
      onLinesChange(lines.map(l => {
        if (l.id !== dragging.id) return l;
        if (dragging.type === "move") {
          return { ...l, posX: Math.max(0, Math.min(85, dragging.origX + dx)), posY: Math.max(0, Math.min(90, dragging.origY + dy)) };
        }
        return { ...l, posW: Math.max(10, Math.min(100, dragging.origW + dx)) };
      }));
    };
    const onUp = () => setDragging(null);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [dragging, editMode, lines, onLinesChange]);

  const startDrag = (e: React.MouseEvent, id: string, type: "move" | "resize") => {
    if (!editMode) return;
    e.preventDefault();
    e.stopPropagation();
    const line = lines.find(l => l.id === id)!;
    setDragging({ id, type, startX: e.clientX, startY: e.clientY, origX: line.posX, origY: line.posY, origW: line.posW });
  };

  const corners = ["top-left", "top-right", "bottom-left", "bottom-right"].map((corner) => (
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
      }}
    />
  ));

  const sheetBase: React.CSSProperties = {
    width: "8.5in",
    height: "11in",
    backgroundColor: colors.bg,
    color: colors.text,
    boxSizing: "border-box",
    fontFamily,
    border: `4px solid ${colors.border}`,
    position: "relative",
    overflow: "hidden",
    flexShrink: 0,
  };

  const sideLabel = (
    <div className="no-print" style={{ position: "absolute", bottom: 4, right: 8, fontSize: "0.65rem", opacity: 0.3, color: colors.text }}>
      {side === "left" ? "← LEFT SHEET" : "RIGHT SHEET →"}
    </div>
  );

  // ── Full image mode ────────────────────────────────────────────────────────
  if (imageMode === "full-image" && image) {
    return (
      <div ref={posterRef} className="poster-sheet front-sheet" style={sheetBase}>
        {corners}
        <img src={image.src} alt="poster" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: image.fit, opacity: image.opacity }} />
        {sideLabel}
      </div>
    );
  }

  // ── Half image mode ────────────────────────────────────────────────────────
  if ((imageMode === "half-left" || imageMode === "half-right") && image) {
    const imgOnLeft = imageMode === "half-left";
    const imgSide = (
      <div style={{ flex: "0 0 50%", overflow: "hidden" }}>
        <img src={image.src} alt="poster" style={{ width: "100%", height: "100%", objectFit: image.fit, opacity: image.opacity }} />
      </div>
    );
    const textSide = (
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "stretch", gap: "0.12in", padding: "0.35in" }}>
        {lines.map(line => (
          <div key={line.id} style={{ fontSize: getLineFontSize(line), fontWeight: line.bold ? "900" : "400", textAlign: line.align, textTransform: line.uppercase ? "uppercase" : "none", lineHeight: 1.05, letterSpacing: "-0.02em", wordBreak: "break-word" }}>
            {line.text || (side === "left" ? "YOUR" : "MESSAGE")}
          </div>
        ))}
      </div>
    );
    return (
      <div ref={posterRef} className="poster-sheet front-sheet" style={{ ...sheetBase, display: "flex", flexDirection: "row" }}>
        {corners}
        {imgOnLeft ? imgSide : textSide}
        {imgOnLeft ? textSide : imgSide}
        {sideLabel}
      </div>
    );
  }

  // ── Normal mode ────────────────────────────────────────────────────────────
  const imgEl = image ? (
    <img src={image.src} alt="poster image" style={{ width: "100%", height: "100%", objectFit: image.fit, opacity: image.opacity, display: "block" }} />
  ) : null;

  const linesEl = editMode ? (
    // Absolutely-positioned draggable elements
    <div style={{ position: "absolute", inset: 0 }}>
      {lines.map((line) => (
        <div
          key={line.id}
          style={{
            position: "absolute",
            left: `${line.posX}%`,
            top: `${line.posY}%`,
            width: `${line.posW}%`,
            fontSize: getLineFontSize(line),
            fontWeight: line.bold ? "900" : "400",
            textAlign: line.align,
            textTransform: line.uppercase ? "uppercase" : "none",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            wordBreak: "break-word",
            cursor: "move",
            outline: dragging?.id === line.id ? "2px solid rgba(59,130,246,0.9)" : "1px dashed rgba(59,130,246,0.5)",
            userSelect: "none",
          }}
          onMouseDown={(e) => startDrag(e, line.id, "move")}
        >
          {line.text || (side === "left" ? "YOUR" : "MESSAGE")}
          {/* Resize handle */}
          <div
            style={{ position: "absolute", bottom: -5, right: -5, width: 10, height: 10, backgroundColor: "rgba(59,130,246,0.85)", cursor: "se-resize", borderRadius: 2, zIndex: 2 }}
            onMouseDown={(e) => startDrag(e, line.id, "resize")}
          />
        </div>
      ))}
    </div>
  ) : (
    // Normal flex layout
    <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "stretch", justifyContent: "center", gap: "0.12in", width: "100%", position: "relative", zIndex: 1 }}>
      {lines.map((line) => (
        <div
          key={line.id}
          style={{ fontSize: getLineFontSize(line), fontWeight: line.bold ? "900" : "400", textAlign: line.align, textTransform: line.uppercase ? "uppercase" : "none", lineHeight: 1.05, letterSpacing: "-0.02em", wordBreak: "break-word" }}
        >
          {line.text || (side === "left" ? "YOUR" : "MESSAGE")}
        </div>
      ))}
    </div>
  );

  return (
    <div
      ref={posterRef}
      className="poster-sheet front-sheet"
      style={{ ...sheetBase, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0.5in" }}
    >
      {corners}

      {/* Background image */}
      {image?.position === "background" && (
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          <img src={image.src} alt="" style={{ width: "100%", height: "100%", objectFit: image.fit, opacity: image.opacity }} />
        </div>
      )}

      {/* Top image */}
      {image?.position === "top" && (
        <div style={{ flex: "0 0 38%", width: "100%", overflow: "hidden", marginBottom: "0.2in" }}>
          {imgEl}
        </div>
      )}

      {linesEl}

      {/* Bottom image */}
      {image?.position === "bottom" && (
        <div style={{ flex: "0 0 38%", width: "100%", overflow: "hidden", marginTop: "0.2in" }}>
          {imgEl}
        </div>
      )}

      {sideLabel}
    </div>
  );
};

// ─── Back Sheet: Left (Bloomquist Campaign Info) ──────────────────────────────

const BackSheetLeft: React.FC = () => {
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

      <div style={{ fontSize: "0.59rem", lineHeight: 1.48, color: bodyColor }}>
        {BLOOMQUIST_BIO}
      </div>

      <div style={{ display: "flex", gap: "0.18in", flex: 1, marginTop: "0.01in", minHeight: 0 }}>
        <div style={{ flex: "0 0 55%", display: "flex", flexDirection: "column" }}>
          <span style={sectionLabel}>His Top Priorities</span>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.065in" }}>
            {BLOOMQUIST_PRIORITIES.map((p) => (
              <div key={p.title} style={{ borderLeft: `3px solid ${gold}`, paddingLeft: "0.09in", paddingTop: "0.03in", paddingBottom: "0.03in" }}>
                <div style={{ fontSize: "0.61rem", fontWeight: 700, color: "#1a1a2e", marginBottom: "0.02in", lineHeight: 1.25 }}>
                  {p.icon} {p.title}
                </div>
                <div style={{ fontSize: "0.55rem", lineHeight: 1.42, color: bodyColor }}>{p.body}</div>
              </div>
            ))}
          </div>
          {/* Campaign image filling remaining left-column space */}
          <div style={{ flex: 1, marginTop: "0.1in", display: "flex", alignItems: "flex-end", overflow: "hidden", minHeight: 0 }}>
            <img
              src="/build-with-bloomquist.jpeg"
              alt="Build with Bloomquist"
              style={{ width: "100%", objectFit: "contain", objectPosition: "bottom left", maxHeight: "100%", display: "block" }}
            />
          </div>
        </div>

        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
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

          <span style={{ ...sectionLabel, marginTop: "0.1in" }}>How to Get Involved</span>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.055in" }}>
            {GET_INVOLVED.map((g) => (
              <div key={g.action} style={{ borderLeft: `2px solid ${navy}`, paddingLeft: "0.07in", paddingTop: "0.02in", paddingBottom: "0.02in" }}>
                <div style={{ fontSize: "0.59rem", fontWeight: 700, color: "#1a1a2e", lineHeight: 1.2 }}>
                  {g.icon} {g.action}
                </div>
                <div style={{ fontSize: "0.52rem", lineHeight: 1.38, color: bodyColor }}>{g.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

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

// ─── Back Sheet: Right (Civic Education / Protest Info) ───────────────────────

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
    header: { backgroundColor: "#1a3a6e", color: "#FFFFFF", padding: "0.14in 0.2in", marginBottom: "0.14in", borderRadius: "4px" },
    headerTitle: { fontSize: "1.2rem", fontWeight: "900" as const, textTransform: "uppercase" as const, letterSpacing: "0.02em" },
    headerSub: { fontSize: "0.63rem", opacity: 0.85, marginTop: "0.03in" },
    sectionLabel: {
      fontSize: "0.58rem", fontWeight: "700" as const,
      textTransform: "uppercase" as const, letterSpacing: "0.13em",
      color: "#1a3a6e", marginBottom: "0.06in", marginTop: "0.12in",
      borderBottom: "2px solid #c8a400", paddingBottom: "0.04in", display: "block" as const,
    },
    rightsWrap: { display: "flex", flexDirection: "column" as const, gap: "0.045in" },
    rightItem: { display: "flex", gap: "0.07in", fontSize: "0.6rem", lineHeight: 1.42, color: "#222" },
    bullet: { color: "#1a3a6e", fontWeight: "700" as const, flexShrink: 0 },
    timelineWrap: { display: "flex", flexDirection: "column" as const, gap: "0.06in" },
    timelineItem: { display: "flex", gap: "0.09in" },
    timelineYear: { fontSize: "0.57rem", fontWeight: "700" as const, color: "#1a3a6e", minWidth: "0.9in", paddingTop: "0.01in", flexShrink: 0 },
    timelineText: { fontSize: "0.59rem", lineHeight: 1.42, color: "#333" },
    factsGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.06in" },
    factCard: { backgroundColor: "#f5f7fa", border: "1px solid #dde3ef", borderRadius: "3px", padding: "0.07in 0.09in" },
    factStat: { fontSize: "0.95rem", fontWeight: "900" as const, color: "#1a3a6e" },
    factDesc: { fontSize: "0.57rem", lineHeight: 1.38, color: "#444", marginTop: "0.02in" },
    tipsWrap: { display: "flex", flexDirection: "column" as const, gap: "0.065in" },
    tipItem: { borderLeft: "3px solid #c8a400", paddingLeft: "0.1in", paddingTop: "0.03in", paddingBottom: "0.03in" },
    tipTitle: { fontSize: "0.65rem", fontWeight: "700" as const, color: "#1a1a2e", marginBottom: "0.02in" },
    tipBody: { fontSize: "0.58rem", lineHeight: 1.42, color: "#444" },
    footer: { marginTop: "auto", paddingTop: "0.09in", borderTop: "1px solid #dde3ef", fontSize: "0.55rem", color: "#888", textAlign: "center" as const },
  };

  return (
    <div className="poster-sheet back-sheet" style={S.sheet}>
      <div style={S.header}>
        <div style={S.headerTitle}>Know Before You Go</div>
        <div style={S.headerSub}>Your rights · The "No Kings" movement · Why protest works · What to do next</div>
      </div>

      <span style={S.sectionLabel}>Your Constitutional Rights as a Protester</span>
      <div style={S.rightsWrap}>
        {YOUR_RIGHTS.map((r, i) => (
          <div key={i} style={S.rightItem}>
            <span style={S.bullet}>▸</span>
            <span>{r}</span>
          </div>
        ))}
      </div>

      <span style={S.sectionLabel}>The "No Kings" Movement</span>
      <div style={S.timelineWrap}>
        {NO_KINGS_HISTORY.map((item) => (
          <div key={item.year} style={S.timelineItem}>
            <span style={S.timelineYear}>{item.year}</span>
            <span style={S.timelineText}>{item.event}</span>
          </div>
        ))}
      </div>

      <span style={S.sectionLabel}>Protest Works — The Numbers</span>
      <div style={S.factsGrid}>
        {PROTEST_FACTS.map((f) => (
          <div key={f.stat} style={S.factCard}>
            <div style={S.factStat}>{f.stat}</div>
            <div style={S.factDesc}>{f.desc}</div>
          </div>
        ))}
      </div>

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

// ─── SheetControls ────────────────────────────────────────────────────────────

interface SheetControlsProps {
  label: string;
  sheet: SheetConfig;
  onChange: (s: SheetConfig) => void;
}

const SheetControls: React.FC<SheetControlsProps> = ({ label, sheet, onChange }) => {
  const fileRef = useRef<HTMLInputElement>(null);

  const updateLine = (id: string, updates: Partial<TextLine>) =>
    onChange({ ...sheet, lines: sheet.lines.map((l) => (l.id === id ? { ...l, ...updates } : l)) });

  const addLine = () =>
    onChange({ ...sheet, lines: [...sheet.lines, makeLine("", "auto", sheet.lines.length)] });

  const removeLine = (id: string) =>
    onChange({ ...sheet, lines: sheet.lines.filter((l) => l.id !== id) });

  const updateImage = (updates: Partial<SheetImage>) => {
    if (!sheet.image) return;
    onChange({ ...sheet, image: { ...sheet.image, ...updates } });
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const src = ev.target?.result as string;
      onChange({ ...sheet, image: { src, fit: "contain", position: "top", opacity: 1 } });
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const alignIcons = {
    left: AlignLeft,
    center: AlignCenter,
    right: AlignRight,
  } as const;

  return (
    <div className="space-y-2">
      <div className="text-xs font-bold text-gray-800 uppercase tracking-wide border-b border-gray-200 pb-1.5 mb-2">
        {label}
      </div>

      {/* Text lines */}
      <div className="space-y-2">
        {sheet.lines.map((line, i) => (
          <div key={line.id} className="space-y-1 bg-gray-50 rounded p-1.5 border border-gray-100">
            <div className="flex gap-1.5 items-center">
              <input
                type="text"
                value={line.text}
                onChange={(e) => updateLine(line.id, { text: e.target.value })}
                className="flex-1 min-w-0 border border-gray-300 rounded px-2 py-1 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder={`Line ${i + 1}`}
              />
              <select
                value={line.size}
                onChange={(e) => updateLine(line.id, { size: e.target.value as TextLine["size"] })}
                className="border border-gray-300 rounded px-1 py-1 text-xs bg-white"
              >
                <option value="auto">Auto</option>
                <option value="huge">Huge</option>
                <option value="large">Large</option>
                <option value="medium">Medium</option>
                <option value="small">Small</option>
                <option value="custom">Custom…</option>
              </select>
              {line.size === "custom" && (
                <div className="flex items-center gap-0.5">
                  <input
                    type="number"
                    min={6}
                    max={999}
                    value={line.customSize}
                    onChange={(e) =>
                      updateLine(line.id, { customSize: Math.max(6, parseInt(e.target.value) || 72) })
                    }
                    className="w-14 border border-blue-400 rounded px-1 py-1 text-xs bg-white text-center focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  <span className="text-xs text-gray-400">pt</span>
                </div>
              )}
              {sheet.lines.length > 1 && (
                <button
                  onClick={() => removeLine(line.id)}
                  className="p-1 text-red-400 hover:text-red-600 flex-shrink-0"
                  title="Remove line"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
            <div className="flex gap-1 flex-wrap">
              {(["left", "center", "right"] as const).map((a) => {
                const Icon = alignIcons[a];
                return (
                  <button
                    key={a}
                    onClick={() => updateLine(line.id, { align: a })}
                    className={`p-1 rounded border ${
                      line.align === a
                        ? "bg-gray-800 text-white border-gray-800"
                        : "border-gray-300 text-gray-500 hover:border-gray-400"
                    }`}
                    title={`Align ${a}`}
                  >
                    <Icon className="w-3 h-3" />
                  </button>
                );
              })}
              <button
                onClick={() => updateLine(line.id, { bold: !line.bold })}
                className={`px-1.5 py-1 rounded border text-xs font-bold ${
                  line.bold
                    ? "bg-gray-800 text-white border-gray-800"
                    : "border-gray-300 text-gray-500 hover:border-gray-400"
                }`}
                title="Bold"
              >
                B
              </button>
              <button
                onClick={() => updateLine(line.id, { uppercase: !line.uppercase })}
                className={`px-1.5 py-1 rounded border text-xs ${
                  line.uppercase
                    ? "bg-gray-800 text-white border-gray-800"
                    : "border-gray-300 text-gray-500 hover:border-gray-400"
                }`}
                title="Toggle UPPERCASE"
              >
                AA
              </button>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={addLine}
        className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 border border-blue-200 hover:border-blue-300 rounded px-2 py-1"
      >
        <Plus className="w-3 h-3" />
        Add Line
      </button>

      {/* Image mode */}
      <div className="border-t border-gray-100 pt-2 mt-1">
        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Image Mode</div>
        <select
          value={sheet.imageMode}
          onChange={(e) => onChange({ ...sheet, imageMode: e.target.value as ImageMode })}
          className="w-full border border-gray-300 rounded px-2 py-1.5 text-xs bg-white"
        >
          <option value="normal">Normal (text + optional image)</option>
          <option value="full-image">Full Image (jpeg/png fills sheet)</option>
          <option value="half-left">Half — Image Left, Text Right</option>
          <option value="half-right">Half — Text Left, Image Right</option>
        </select>
      </div>

      {/* Image section */}
      <div className="border-t border-gray-100 pt-2 mt-1">
        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Image</div>
        {sheet.image ? (
          <div className="space-y-1.5">
            <div className="flex gap-2 items-start">
              <img
                src={sheet.image.src}
                className="w-12 h-12 object-contain border border-gray-200 rounded bg-gray-50 flex-shrink-0"
                alt="preview"
              />
              <div className="flex-1 space-y-1">
                <div className="flex gap-1">
                  <select
                    value={sheet.image.position}
                    onChange={(e) => updateImage({ position: e.target.value as SheetImage["position"] })}
                    className="flex-1 border border-gray-300 rounded px-1 py-1 text-xs bg-white"
                  >
                    <option value="top">Top</option>
                    <option value="bottom">Bottom</option>
                    <option value="background">Background</option>
                  </select>
                  <select
                    value={sheet.image.fit}
                    onChange={(e) => updateImage({ fit: e.target.value as SheetImage["fit"] })}
                    className="flex-1 border border-gray-300 rounded px-1 py-1 text-xs bg-white"
                  >
                    <option value="contain">Contain</option>
                    <option value="cover">Cover</option>
                  </select>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-gray-500 flex-shrink-0">Opacity</span>
                  <input
                    type="range"
                    min="0.1"
                    max="1"
                    step="0.05"
                    value={sheet.image.opacity}
                    onChange={(e) => updateImage({ opacity: parseFloat(e.target.value) })}
                    className="flex-1"
                  />
                  <span className="text-xs text-gray-400 w-7 text-right flex-shrink-0">
                    {Math.round(sheet.image.opacity * 100)}%
                  </span>
                </div>
              </div>
              <button
                onClick={() => onChange({ ...sheet, image: null })}
                className="p-1 text-red-400 hover:text-red-600 flex-shrink-0"
                title="Remove image"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ) : (
          <>
            <input type="file" accept="image/*" ref={fileRef} className="hidden" onChange={handleFile} />
            <button
              onClick={() => fileRef.current?.click()}
              className="flex items-center gap-1.5 text-xs text-gray-600 hover:text-gray-800 border border-dashed border-gray-300 hover:border-gray-400 rounded px-3 py-2 w-full justify-center"
            >
              <Image className="w-3.5 h-3.5" />
              Upload Image
            </button>
          </>
        )}
      </div>
    </div>
  );
};

// ─── Print window helper ──────────────────────────────────────────────────────

function openPrintWindow(sheets: React.ReactElement) {
  const body = renderToStaticMarkup(sheets);

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Protest Poster — Print</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html, body { background: #fff; }
    /* Hide screen-only labels embedded in each sheet */
    .no-print { display: none !important; }
    @page {
      size: 8.5in 11in portrait;
      margin: 0;
    }
    /* Each sheet fills exactly one page */
    .poster-sheet {
      break-after: page;
      page-break-after: always;
    }
    /* Prevent trailing blank page after the last sheet */
    .poster-sheet:last-child {
      break-after: avoid;
      page-break-after: avoid;
    }
  </style>
</head>
<body>
${body}
<script>
  // Auto-open the print dialog once the page (including images) is ready.
  window.addEventListener('load', function () {
    setTimeout(function () { window.print(); }, 150);
  });
<\/script>
</body>
</html>`;

  const win = window.open("", "_blank");
  if (!win) {
    alert("Allow popups for this site to use the print feature.");
    return;
  }
  win.document.write(html);
  win.document.close();
}

// ─── Main Page ────────────────────────────────────────────────────────────────

// Canvas dimensions at 96px/in (CSS standard)
const SHEET_W = 816;  // 8.5 * 96
const SHEET_H = 1056; // 11 * 96
const CANVAS_PAD = 32;
const CANVAS_GAP = 24;
const CANVAS_W = SHEET_W * 2 + CANVAS_GAP + CANVAS_PAD * 2;
const CANVAS_H = SHEET_H + CANVAS_PAD * 2;

const ProtestPoster: React.FC = () => {
  const [side, setSide] = useState<"front" | "back">("front");
  const [config, setConfig] = useState<PosterConfig>(createDefaultConfig);
  const [controlsOpen, setControlsOpen] = useState(true);
  const [zoom, setZoom] = useState(0.6);
  const [canvasEdit, setCanvasEdit] = useState(false);

  const colors = COLOR_SCHEMES[config.colorScheme];
  const font = FONT_STYLES[config.fontStyle];

  const updateSheet = (which: "left" | "right") => (s: SheetConfig) =>
    setConfig((c) => ({ ...c, [which]: s }));

  const handlePrint = (mode: "front" | "back" | "all") => {
    const frontEl = (
      <>
        <FrontSheet sheet={config.left}  colors={colors} fontFamily={font.family} side="left" />
        <FrontSheet sheet={config.right} colors={colors} fontFamily={font.family} side="right" />
      </>
    );
    const backEl = (
      <>
        <BackSheetLeft />
        <BackSheetRight />
      </>
    );
    const sheets =
      mode === "front" ? frontEl :
      mode === "back"  ? backEl  :
      <>{frontEl}{backEl}</>;

    openPrintWindow(sheets);
  };

  const scaledCanvasW = CANVAS_W * zoom;
  const scaledCanvasH = CANVAS_H * zoom;

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {/* ── Controls Bar ── */}
      <div className="bg-white border-b border-gray-200 shadow-sm" style={{ flexShrink: 0, zIndex: 10 }}>
        <div className="max-w-7xl mx-auto px-4 py-3">
          {/* Top row */}
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-3">
              <h1 className="text-lg font-bold text-gray-900">Protest Poster Studio</h1>
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">2 × 8.5" × 11"</span>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              {/* Front/Back preview toggle */}
              <div className="flex rounded-lg border border-gray-300 overflow-hidden">
                <button
                  onClick={() => setSide("front")}
                  className={`px-4 py-2 text-sm font-medium transition-colors ${
                    side === "front" ? "bg-gray-900 text-white" : "bg-white text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <Eye className="w-4 h-4 inline mr-1.5" />
                  Front
                </button>
                <button
                  onClick={() => setSide("back")}
                  className={`px-4 py-2 text-sm font-medium transition-colors border-l border-gray-300 ${
                    side === "back" ? "bg-gray-900 text-white" : "bg-white text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <EyeOff className="w-4 h-4 inline mr-1.5" />
                  Back
                </button>
              </div>

              {/* Canvas edit toggle (front only) */}
              {side === "front" && (
                <button
                  onClick={() => setCanvasEdit((e) => !e)}
                  className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg border transition-colors ${
                    canvasEdit
                      ? "bg-orange-500 text-white border-orange-500"
                      : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50"
                  }`}
                  title="Drag & resize text elements directly on the canvas"
                >
                  <Move className="w-4 h-4" />
                  {canvasEdit ? "Editing Canvas" : "Edit Canvas"}
                </button>
              )}

              {/* Zoom control */}
              <div className="flex items-center gap-1.5 border border-gray-200 rounded-lg px-2 py-1.5">
                <ZoomIn className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                <input
                  type="range"
                  min="0.25"
                  max="1"
                  step="0.05"
                  value={zoom}
                  onChange={(e) => setZoom(parseFloat(e.target.value))}
                  className="w-20"
                />
                <span className="text-xs text-gray-500 w-8 text-right flex-shrink-0">{Math.round(zoom * 100)}%</span>
              </div>

              {/* Print Front */}
              <button
                onClick={() => handlePrint("front")}
                className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Printer className="w-4 h-4" />
                Print Front
              </button>

              {/* Print Back */}
              <button
                onClick={() => handlePrint("back")}
                className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Printer className="w-4 h-4" />
                Print Back
              </button>

              {/* Print All */}
              <button
                onClick={() => handlePrint("all")}
                className="flex items-center gap-2 px-3 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors"
              >
                <Printer className="w-4 h-4" />
                Print All
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

          {/* Design panel (front only) */}
          {controlsOpen && side === "front" && (
            <div className="mt-3 pt-3 border-t border-gray-100">
              {/* Global options row */}
              <div className="flex flex-wrap gap-4 items-end mb-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                    Color Scheme
                  </label>
                  <select
                    value={config.colorScheme}
                    onChange={(e) => setConfig((c) => ({ ...c, colorScheme: e.target.value as ColorScheme }))}
                    className="border border-gray-300 rounded px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {Object.entries(COLOR_SCHEMES).map(([key, val]) => (
                      <option key={key} value={key}>{val.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                    Font Style
                  </label>
                  <select
                    value={config.fontStyle}
                    onChange={(e) => setConfig((c) => ({ ...c, fontStyle: e.target.value as FontStyle }))}
                    className="border border-gray-300 rounded px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {Object.entries(FONT_STYLES).map(([key, val]) => (
                      <option key={key} value={key}>{val.label}</option>
                    ))}
                  </select>
                </div>
                <button
                  onClick={() => setConfig(createDefaultConfig())}
                  className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 border border-gray-300 rounded px-3 py-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Reset
                </button>
              </div>

              {/* Per-sheet controls */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <SheetControls
                  label="Left Sheet"
                  sheet={config.left}
                  onChange={updateSheet("left")}
                />
                <div className="md:border-l md:border-gray-200 md:pl-6">
                  <SheetControls
                    label="Right Sheet"
                    sheet={config.right}
                    onChange={updateSheet("right")}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Instructions banner */}
          <div className="mt-2 text-xs text-gray-500">
            {side === "front" ? (
              <span>
                {canvasEdit
                  ? <><strong>Canvas Edit:</strong> Drag text to reposition · drag blue handle to resize · use Design panel to add/remove lines.</>
                  : <><strong>Design:</strong> Customize lines, images, colors, and fonts. <strong>Print Front</strong> → flip → <strong>Print Back</strong> → laminate.</>
                }
              </span>
            ) : (
              <span>
                <strong>Back view</strong> — faces the sign holder only.{" "}
                Left: Bloomquist campaign info. Right: protest rights &amp; civic resources.
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ── Scrollable Canvas ── */}
      <div style={{ flex: 1, overflow: "auto", backgroundColor: "#d1d5db" }}>
        {/* Outer div sized to scaled canvas so scrollbars reflect real content size */}
        <div style={{ position: "relative", width: scaledCanvasW, height: scaledCanvasH, minWidth: "100%", margin: "0 auto" }}>
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              transform: `scale(${zoom})`,
              transformOrigin: "top left",
              width: CANVAS_W,
              height: CANVAS_H,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: CANVAS_GAP,
              padding: CANVAS_PAD,
              boxSizing: "border-box",
            }}
          >
            {side === "front" ? (
              <>
                <FrontSheet
                  sheet={config.left}
                  colors={colors}
                  fontFamily={font.family}
                  side="left"
                  editMode={canvasEdit}
                  onLinesChange={(lines) => updateSheet("left")({ ...config.left, lines })}
                />
                <FrontSheet
                  sheet={config.right}
                  colors={colors}
                  fontFamily={font.family}
                  side="right"
                  editMode={canvasEdit}
                  onLinesChange={(lines) => updateSheet("right")({ ...config.right, lines })}
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

        {/* ── Print Instructions ── */}
        <div className="max-w-3xl mx-auto px-4 py-8">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
            <h2 className="font-bold text-blue-900 mb-3">Portable Protest Printing Guide</h2>
            <ol className="text-sm text-blue-800 space-y-2 list-decimal list-inside">
              <li><strong>Design the front</strong> — Add text lines, upload images, pick colors, font, and image mode. Use Edit Canvas to drag &amp; resize elements.</li>
              <li><strong>Print Front</strong> — Opens a clean print window with the left and right front sheets, one per page.</li>
              <li><strong>Print Back</strong> — Reinsert the sheets face-down and click "Print Back".</li>
              <li><strong>Print All</strong> — All four pages in one job: Front-Left, Front-Right, Back-Left, Back-Right.</li>
              <li><strong>Laminate &amp; Assemble</strong> — Cold laminate pouches, tape or clip the two sheets together and attach a handle.</li>
            </ol>
            <p className="text-xs text-blue-600 mt-3">
              Tip: In Chrome's print dialog set <em>Margins → None</em> and confirm <em>Portrait</em>. Use 65 lb+ card stock for durability.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ProtestPoster;
