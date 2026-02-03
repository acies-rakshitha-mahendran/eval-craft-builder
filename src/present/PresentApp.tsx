// src/present/PresentApp.tsx
import React, { useEffect, useMemo, useState } from "react";
import { loadBuildConfig } from "../api";
import type { ProjectBuildConfig, ThemeConfig, VADId } from "../types";
import { VAD_INPUT_CONFIGS } from "../vadInputs";
import { HomePage } from "./HomePage";
import { InputPage } from "./InputPage";
import { ResultsPage } from "./ResultsPage";
import type { VADInputValue } from "./InputsRenderer";

type PresentTab = "home" | "vads" | "results";

// Apply theme to document
const applyTheme = (theme: ThemeConfig | null) => {
  if (!theme) return;
  const body = document.body;
  
  if (theme.mode === "light") {
    body.removeAttribute("data-theme");
    body.style.backgroundColor = "#f5f5f5";
    body.style.color = "#000000";
  } else {
    body.setAttribute("data-theme", "dark");
    body.style.backgroundColor = "#1a1a1a";
    body.style.color = "#ffffff";
  }
  
  // Remove old style if it exists
  const existingStyle = document.getElementById("theme-style");
  if (existingStyle) {
    existingStyle.remove();
  }
  
  // Create and inject CSS rule for canvas frames
  const styleEl = document.createElement("style");
  styleEl.id = "theme-style";
  
  if (theme.mode === "light") {
    styleEl.textContent = `
      .canvas-frame {
        background-color: #ffffff !important;
      }
      .canvas-frame input,
      .canvas-frame textarea,
      .canvas-frame select {
        background-color: #f5f5f5 !important;
        color: #000000 !important;
        border-color: rgba(85, 136, 59, 0.2) !important;
      }
    `;
  } else {
    styleEl.textContent = `
      .canvas-frame {
        background-color: #2a2a2a !important;
      }
      .canvas-frame input,
      .canvas-frame textarea,
      .canvas-frame select {
        background-color: #1a1a1a !important;
        color: #ffffff !important;
        border-color: rgba(85, 136, 59, 0.3) !important;
      }
    `;
  }
  
  document.head.appendChild(styleEl);
};

export const PresentApp: React.FC = () => {
  const [active, setActive] = useState<PresentTab>("home");
  const [config, setConfig] = useState<ProjectBuildConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState<Record<string, number> | null>(null);
  // Raw inputs coming from the InputsRenderer (keyed by VAD name and field index)
  const [inputValues, setInputValues] = useState<VADInputValue>({});

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const pid = params.get("projectId") ?? "demo-project";
    loadBuildConfig(pid).then((c) => {
      setConfig(c);
      if (c?.theme) {
        applyTheme(c.theme);
      }
      setLoading(false);
    });
  }, []);

  const theme: ThemeConfig | null = config?.theme ?? null;
  const homeLayout = config?.homeLayout ?? null;
  const vadLayout = config?.vadLayout ?? null;
  const resultsLayout = config?.resultsLayout ?? null;

  const KNOWN_VADS = Object.keys(VAD_INPUT_CONFIGS) as VADId[];

  const selectedVADs: VADId[] = useMemo(() => {
    if (!vadLayout || typeof vadLayout !== "string") {
      return [];
    }

    // Simple, robust detection: look for known VAD titles inside the serialized layout string.
    const vadNames: VADId[] = [];

    KNOWN_VADS.forEach((name) => {
      if (vadLayout.includes(`"title":"${name}"`)) {
        vadNames.push(name);
      }
    });

    return vadNames;
  }, [vadLayout, KNOWN_VADS]);

  // Simple helper to safely extract a number from InputsRenderer's structure
  const getFieldNumber = (
    fields: { [fieldIndex: number]: { value: string | number; uom: string } },
    index: number
  ): number => {
    const entry = fields[index];
    if (!entry) return 0;
    const raw = entry.value;
    const n = typeof raw === "number" ? raw : parseFloat(String(raw ?? ""));
    return isNaN(n) ? 0 : n;
  };

  const handleCalculate = () => {
    if (!inputValues || Object.keys(inputValues).length === 0) {
      return;
    }

    const res: Record<string, number> = {};

    Object.entries(inputValues).forEach(([vadName, fields]) => {
      const f = fields as { [fieldIndex: number]: { value: string | number; uom: string } };
      let total = 0;

      // Per‑VAD demo formulas based on your descriptions
      switch (vadName) {
        case "Reduced Electricity Consumption": {
          // 10% reduction on current annual electricity consumption
          const current = getFieldNumber(f, 0);
          total = current * 0.1;
          break;
        }

        case "Reduced Maintenance Cost": {
          // 15% cost reduction on current maintenance contract
          const maintenance = getFieldNumber(f, 0);
          total = maintenance * 0.15;
          break;
        }

        case "Increased Ticket Sales": {
          // Assume each additional patron is worth $20 this year
          const patrons = getFieldNumber(f, 0);
          total = patrons * 20;
          break;
        }

        case "Avoided Revenue Loss": {
          // Revenue per show * number of at‑risk shows annually
          const revenuePerShow = getFieldNumber(f, 0);
          const atRiskShows = getFieldNumber(f, 1);
          total = revenuePerShow * atRiskShows;
          break;
        }

        case "Increase in Recyclability": {
          // Assume each HVAC unit recycled avoids "100" impact units
          const hvacUnits = getFieldNumber(f, 0);
          total = hvacUnits * 100;
          break;
        }

        case "Lower Material Input Emissions": {
          // Assume each HVAC unit avoids "250" kg of embodied carbon
          const hvacUnits = getFieldNumber(f, 0);
          total = hvacUnits * 250;
          break;
        }

        default: {
          // Fallback: sum all numeric fields
          total = Object.values(f).reduce((acc, field) => {
            const raw = field.value;
            const n =
              typeof raw === "number" ? raw : parseFloat(String(raw ?? ""));
            return acc + (isNaN(n) ? 0 : n);
          }, 0);
          break;
        }
      }

      res[vadName] = total;
    });

    setResults(res);
    setActive("results");
  };

  if (loading) {
    return (
      <div className="present-shell">
        <div style={{ padding: 24 }}>Loading build config…</div>
      </div>
    );
  }

  if (!config) {
    return (
      <div className="present-shell">
        <div style={{ padding: 24 }}>
          No build configuration found. Publish from the Build app.
        </div>
      </div>
    );
  }

  const bg = theme?.background ?? "#020617";
  const text = theme?.text ?? "#e5e7eb";

  const tab = (id: PresentTab, label: string) => {
    const activeTab = active === id;
    return (
      <button
        key={id}
        className={`nav-tab ${activeTab ? "active" : ""}`}
        onClick={() => setActive(id)}
      >
        {label}
      </button>
    );
  };

  return (
    <div
      className="present-shell"
      style={{
        background: bg,
        color: text,
      }}
    >
      <div
        style={{
          padding: "0.5rem 0.75rem",
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <div className="nav-tabs">
          {tab("home", "Home")}
          {tab("vads", "Inputs")}
          {tab("results", "Results")}
        </div>
      </div>

      {active === "home" && <HomePage layout={homeLayout} />}
      {active === "vads" && (
        <InputPage
          vadNames={selectedVADs}
          onCalculate={handleCalculate}
          // Capture live input changes from the InputsRenderer so we can calculate later
          onInputsChange={setInputValues}
        />
      )}
      {active === "results" && <ResultsPage results={results} layout={resultsLayout} />}
    </div>
  );
};
