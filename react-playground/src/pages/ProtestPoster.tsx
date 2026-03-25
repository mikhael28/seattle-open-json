import React, { useState, useRef } from "react";
import { Printer, RotateCcw, Eye, EyeOff, ChevronDown, ChevronUp } from "lucide-react";

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

const BLOOMQUIST_PRIORITIES = [
  {
    icon: "🏠",
    title: "Housing Affordability",
    body: "Fighting for more affordable housing options across LD32 — from zoning reform to tenant protections — so every family can afford to live in the community they love.",
  },
  {
    icon: "🌱",
    title: "Climate & Clean Energy",
    body: "Growing Washington's green economy with clean energy jobs. Chris founded PNW Climate Week's inaugural career fair, connecting workers to the jobs of tomorrow.",
  },
  {
    icon: "📚",
    title: "Education & Schools",
    body: "As a parent, Chris understands the urgency of fully funding our public schools — from class sizes to teacher pay — so every child gets the education they deserve.",
  },
  {
    icon: "🤝",
    title: "Immigration & Equity",
    body: "As the son of a Chilean immigrant, Chris is committed to humane, family-first immigration policies and equity across all communities in District 32.",
  },
  {
    icon: "💼",
    title: "Small Business & Workforce",
    body: "Supporting local small businesses and investing in workforce development so working people in LD32 have real opportunity — not just the lucky few.",
  },
  {
    icon: "🚌",
    title: "Transportation",
    body: "Investing in safe streets, reliable transit, and accessible infrastructure so everyone in District 32 can get where they need to go.",
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

interface BackSheetProps {
  side: "left" | "right";
}

const BackSheet: React.FC<BackSheetProps> = ({ side }) => {
  const leftPriorities = BLOOMQUIST_PRIORITIES.slice(0, 3);
  const rightPriorities = BLOOMQUIST_PRIORITIES.slice(3, 6);
  const priorities = side === "left" ? leftPriorities : rightPriorities;

  return (
    <div
      className="poster-sheet back-sheet"
      style={{
        width: "8.5in",
        height: "11in",
        backgroundColor: "#FFFFFF",
        color: "#1a1a2e",
        display: "flex",
        flexDirection: "column",
        padding: "0.45in",
        boxSizing: "border-box",
        fontFamily: "'Georgia', serif",
        border: "2px solid #1a3a6e",
        position: "relative",
      }}
    >
      {/* Header */}
      <div
        style={{
          backgroundColor: "#1a3a6e",
          color: "#FFFFFF",
          padding: "0.18in 0.25in",
          marginBottom: "0.2in",
          borderRadius: "4px",
        }}
      >
        <div style={{ fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", opacity: 0.8, marginBottom: "0.05in" }}>
          {side === "left" ? "Meet Your Candidate →" : "← Elect Chris"}
        </div>
        <div style={{ fontSize: "1.6rem", fontWeight: "700", lineHeight: 1.1 }}>
          Chris Bloomquist
        </div>
        <div style={{ fontSize: "0.85rem", marginTop: "0.04in", opacity: 0.9 }}>
          WA State House · Legislative District 32
        </div>
      </div>

      {/* Left sheet: bio + first 3 priorities */}
      {side === "left" && (
        <>
          <div style={{ fontSize: "0.78rem", lineHeight: 1.55, marginBottom: "0.2in", color: "#333" }}>
            <strong>Chris Bloomquist</strong> is a community leader, engineer, coach, and musician
            — and the son of a Chilean immigrant. He founded PNW Climate Week's inaugural career
            fair and has spent years building connections between workers and the clean energy
            economy. Chris is running for Washington State House District 32 to fight for
            housing, climate action, and opportunity for every family in our community.
          </div>

          <div style={{ fontSize: "0.72rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.1em", color: "#1a3a6e", marginBottom: "0.1in" }}>
            His Priorities
          </div>
        </>
      )}

      {/* Right sheet: remaining priorities + CTA */}
      {side === "right" && (
        <div style={{ fontSize: "0.72rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.1em", color: "#1a3a6e", marginBottom: "0.1in" }}>
          More Priorities
        </div>
      )}

      {/* Priority cards */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "0.12in" }}>
        {priorities.map((p) => (
          <div
            key={p.title}
            style={{
              borderLeft: "4px solid #c8a400",
              paddingLeft: "0.15in",
              paddingTop: "0.05in",
              paddingBottom: "0.05in",
            }}
          >
            <div style={{ fontSize: "0.82rem", fontWeight: "700", marginBottom: "0.03in", color: "#1a1a2e" }}>
              {p.icon} {p.title}
            </div>
            <div style={{ fontSize: "0.7rem", lineHeight: 1.5, color: "#444" }}>
              {p.body}
            </div>
          </div>
        ))}
      </div>

      {/* Footer CTA */}
      <div
        style={{
          marginTop: "0.2in",
          backgroundColor: "#c8a400",
          color: "#1a1a2e",
          padding: "0.15in 0.2in",
          borderRadius: "4px",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: "0.95rem", fontWeight: "700" }}>
          {side === "left" ? "Learn More & Get Involved" : "Vote Chris Bloomquist · LD32"}
        </div>
        <div style={{ fontSize: "0.75rem", marginTop: "0.04in" }}>
          buildwithbloomquist.com
          {side === "right" && (
            <span style={{ marginLeft: "0.15in" }}>
              · Paid for by Chris Bloomquist for WA State House
            </span>
          )}
        </div>
      </div>

      {/* Sheet label (no-print) */}
      <div
        className="no-print"
        style={{
          position: "absolute",
          bottom: 4,
          right: 8,
          fontSize: "0.65rem",
          opacity: 0.3,
        }}
      >
        {side === "left" ? "BACK LEFT" : "BACK RIGHT"}
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
    colorScheme: "black-yellow",
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
                        colorScheme: "black-yellow",
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
                  <strong>Step 2:</strong> This side faces the sign holder — visible only from behind.
                  It contains info about Chris Bloomquist running for WA State House LD32.
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
                  <BackSheet side="left" />
                  <BackSheet side="right" />
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
